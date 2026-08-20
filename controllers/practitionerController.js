const crypto = require('crypto');
const { logAudit } = require('../middleware/audit');

// ============================================================================
// 1. MEDICAL SPECIALTIES CRUD
// ============================================================================

const getSpecialties = async (req, res) => {
  const tenantId = req.user.tenant_id;
  try {
    const result = await req.dbClient.query(
      `SELECT s.*, 
              COUNT(DISTINCT ps.practitioner_id)::INT AS practitioners_count
       FROM medical_specialties s
       LEFT JOIN practitioner_specialties ps ON s.id = ps.specialty_id
       WHERE s.tenant_id = $1
       GROUP BY s.id
       ORDER BY s.is_active DESC, s.name ASC`,
      [tenantId]
    );
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get specialties error:', err.message);
    return res.status(500).json({ error: 'Échec de récupération des spécialités' });
  }
};

const createSpecialty = async (req, res) => {
  const tenantId = req.user.tenant_id;
  const { code, name, description, color_code } = req.body;

  if (!code || !name) {
    return res.status(400).json({ error: 'Le code et le nom de la spécialité sont obligatoires' });
  }

  try {
    const result = await req.dbClient.query(
      `INSERT INTO medical_specialties (tenant_id, code, name, description, color_code, is_active)
       VALUES ($1, $2, $3, $4, $5, true)
       RETURNING *`,
      [
        tenantId,
        code.trim().toUpperCase(),
        name.trim(),
        description ? description.trim() : null,
        color_code || '#4a90e2'
      ]
    );

    await logAudit(req, 'CREATE_SPECIALTY', 'medical_specialties', result.rows[0].id);
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create specialty error:', err.message);
    if (err.message.includes('unique_tenant_specialty_code')) {
      return res.status(409).json({ error: 'Une spécialité avec ce code existe déjà' });
    }
    return res.status(500).json({ error: 'Échec de création de la spécialité: ' + err.message });
  }
};

const updateSpecialty = async (req, res) => {
  const tenantId = req.user.tenant_id;
  const { id } = req.params;
  const { code, name, description, color_code, is_active } = req.body;

  if (!code || !name) {
    return res.status(400).json({ error: 'Le code et le nom sont obligatoires' });
  }

  try {
    const result = await req.dbClient.query(
      `UPDATE medical_specialties
       SET code = $1,
           name = $2,
           description = $3,
           color_code = $4,
           is_active = $5
       WHERE id = $6 AND tenant_id = $7
       RETURNING *`,
      [
        code.trim().toUpperCase(),
        name.trim(),
        description ? description.trim() : null,
        color_code || '#4a90e2',
        is_active !== undefined ? is_active : true,
        id,
        tenantId
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Spécialité introuvable' });
    }

    await logAudit(req, 'UPDATE_SPECIALTY', 'medical_specialties', id);
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Update specialty error:', err.message);
    if (err.message.includes('unique_tenant_specialty_code')) {
      return res.status(409).json({ error: 'Une spécialité avec ce code existe déjà' });
    }
    return res.status(500).json({ error: 'Échec de modification de la spécialité: ' + err.message });
  }
};

const deleteSpecialty = async (req, res) => {
  const tenantId = req.user.tenant_id;
  const { id } = req.params;

  try {
    // Check if used by practitioners
    const linked = await req.dbClient.query(
      `SELECT 1 FROM practitioner_specialties WHERE specialty_id = $1 LIMIT 1`,
      [id]
    );

    if (linked.rowCount > 0) {
      // Soft-delete / deactivate
      await req.dbClient.query(
        `UPDATE medical_specialties SET is_active = false WHERE id = $1 AND tenant_id = $2`,
        [id, tenantId]
      );
      return res.status(200).json({ message: 'Spécialité désactivée car elle est liée à un ou plusieurs praticiens' });
    }

    await req.dbClient.query(
      `DELETE FROM medical_specialties WHERE id = $1 AND tenant_id = $2`,
      [id, tenantId]
    );

    await logAudit(req, 'DELETE_SPECIALTY', 'medical_specialties', id);
    return res.status(200).json({ message: 'Spécialité supprimée avec succès' });
  } catch (err) {
    console.error('Delete specialty error:', err.message);
    return res.status(500).json({ error: 'Échec de suppression de la spécialité' });
  }
};

// ============================================================================
// 2. PRACTITIONERS & DOCTORS CRUD (With Grades & Multi-Specialties)
// ============================================================================

const getPractitioners = async (req, res) => {
  const tenantId = req.user.tenant_id;
  const { is_active } = req.query;

  try {
    let queryStr = `
      SELECT p.*,
             COALESCE(
               JSON_AGG(
                 JSON_BUILD_OBJECT(
                   'id', s.id,
                   'code', s.code,
                   'name', s.name,
                   'color_code', s.color_code,
                   'is_primary', ps.is_primary
                 )
               ) FILTER (WHERE s.id IS NOT NULL),
               '[]'::json
             ) AS specialties,
             ARRAY_AGG(s.id) FILTER (WHERE s.id IS NOT NULL) AS specialty_ids,
             ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL) AS specialty_names
      FROM practitioners p
      LEFT JOIN practitioner_specialties ps ON p.id = ps.practitioner_id
      LEFT JOIN medical_specialties s ON ps.specialty_id = s.id
      WHERE p.tenant_id = $1
    `;
    const params = [tenantId];

    if (is_active !== undefined) {
      params.push(is_active === 'true');
      queryStr += ` AND p.is_active = $${params.length}`;
    }

    queryStr += ` GROUP BY p.id ORDER BY p.is_active DESC, p.last_name ASC, p.first_name ASC`;

    const result = await req.dbClient.query(queryStr, params);
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get practitioners error:', err.message);
    return res.status(500).json({ error: 'Échec de récupération des praticiens' });
  }
};

const createPractitioner = async (req, res) => {
  const tenantId = req.user.tenant_id;
  const {
    first_name,
    last_name,
    title,
    grade,
    is_general_practitioner,
    specialty_ids,
    phone_number,
    email,
    license_number,
    color_code,
    consultation_fee,
    status
  } = req.body;

  if (!first_name || !last_name) {
    return res.status(400).json({ error: 'Le prénom et le nom du praticien sont obligatoires' });
  }

  const isGP = Boolean(is_general_practitioner);
  const rawSpecialtyIds = Array.isArray(specialty_ids) ? specialty_ids.filter(Boolean) : [];

  // Determine primary specialty label for legacy compatibility
  let primarySpecialtyName = isGP ? 'Médecine Générale' : 'Praticien';

  try {
    if (!isGP && rawSpecialtyIds.length > 0) {
      const specNameRes = await req.dbClient.query(
        `SELECT name FROM medical_specialties WHERE id = $1 AND tenant_id = $2`,
        [rawSpecialtyIds[0], tenantId]
      );
      if (specNameRes.rowCount > 0) {
        primarySpecialtyName = specNameRes.rows[0].name;
      }
    }

    const pracRes = await req.dbClient.query(
      `INSERT INTO practitioners (
         tenant_id, first_name, last_name, title, grade,
         specialty_name, is_general_practitioner, phone_number, email,
         license_number, color_code, consultation_fee, status, is_active
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, true)
       RETURNING *`,
      [
        tenantId,
        first_name.trim(),
        last_name.trim(),
        title || 'Dr.',
        grade || 'Docteur en Médecine',
        primarySpecialtyName,
        isGP,
        phone_number ? phone_number.trim() : null,
        email ? email.trim().toLowerCase() : null,
        license_number ? license_number.trim() : null,
        color_code || '#0d3b66',
        parseFloat(consultation_fee) || 15000,
        status || 'Interne'
      ]
    );

    const practitioner = pracRes.rows[0];

    // Associate specialties (if not general practitioner, or if GP also has specific specialties)
    if (rawSpecialtyIds.length > 0) {
      for (let i = 0; i < rawSpecialtyIds.length; i++) {
        const specId = rawSpecialtyIds[i];
        await req.dbClient.query(
          `INSERT INTO practitioner_specialties (tenant_id, practitioner_id, specialty_id, is_primary)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (practitioner_id, specialty_id) DO NOTHING`,
          [tenantId, practitioner.id, specId, i === 0]
        );
      }
    }

    await logAudit(req, 'CREATE_PRACTITIONER', 'practitioners', practitioner.id);
    return res.status(201).json(practitioner);
  } catch (err) {
    console.error('Create practitioner error:', err.message);
    return res.status(500).json({ error: 'Échec de création du praticien: ' + err.message });
  }
};

const updatePractitioner = async (req, res) => {
  const tenantId = req.user.tenant_id;
  const { id } = req.params;
  const {
    first_name,
    last_name,
    title,
    grade,
    is_general_practitioner,
    specialty_ids,
    phone_number,
    email,
    license_number,
    color_code,
    consultation_fee,
    status,
    is_active
  } = req.body;

  if (!first_name || !last_name) {
    return res.status(400).json({ error: 'Le prénom et le nom sont obligatoires' });
  }

  const isGP = Boolean(is_general_practitioner);
  const rawSpecialtyIds = Array.isArray(specialty_ids) ? specialty_ids.filter(Boolean) : [];

  let primarySpecialtyName = isGP ? 'Médecine Générale' : 'Praticien';

  try {
    if (!isGP && rawSpecialtyIds.length > 0) {
      const specNameRes = await req.dbClient.query(
        `SELECT name FROM medical_specialties WHERE id = $1 AND tenant_id = $2`,
        [rawSpecialtyIds[0], tenantId]
      );
      if (specNameRes.rowCount > 0) {
        primarySpecialtyName = specNameRes.rows[0].name;
      }
    }

    const pracRes = await req.dbClient.query(
      `UPDATE practitioners
       SET first_name = $1,
           last_name = $2,
           title = $3,
           grade = $4,
           specialty_name = $5,
           is_general_practitioner = $6,
           phone_number = $7,
           email = $8,
           license_number = $9,
           color_code = $10,
           consultation_fee = $11,
           status = $12,
           is_active = $13
       WHERE id = $14 AND tenant_id = $15
       RETURNING *`,
      [
        first_name.trim(),
        last_name.trim(),
        title || 'Dr.',
        grade || 'Docteur en Médecine',
        primarySpecialtyName,
        isGP,
        phone_number ? phone_number.trim() : null,
        email ? email.trim().toLowerCase() : null,
        license_number ? license_number.trim() : null,
        color_code || '#0d3b66',
        parseFloat(consultation_fee) || 15000,
        status || 'Interne',
        is_active !== undefined ? is_active : true,
        id,
        tenantId
      ]
    );

    if (pracRes.rowCount === 0) {
      return res.status(404).json({ error: 'Praticien introuvable' });
    }

    // Refresh specialties junction
    await req.dbClient.query(
      `DELETE FROM practitioner_specialties WHERE practitioner_id = $1`,
      [id]
    );

    if (rawSpecialtyIds.length > 0) {
      for (let i = 0; i < rawSpecialtyIds.length; i++) {
        const specId = rawSpecialtyIds[i];
        await req.dbClient.query(
          `INSERT INTO practitioner_specialties (tenant_id, practitioner_id, specialty_id, is_primary)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (practitioner_id, specialty_id) DO NOTHING`,
          [tenantId, id, specId, i === 0]
        );
      }
    }

    await logAudit(req, 'UPDATE_PRACTITIONER', 'practitioners', id);
    return res.status(200).json(pracRes.rows[0]);
  } catch (err) {
    console.error('Update practitioner error:', err.message);
    return res.status(500).json({ error: 'Échec de modification du praticien: ' + err.message });
  }
};

const deletePractitioner = async (req, res) => {
  const tenantId = req.user.tenant_id;
  const { id } = req.params;

  try {
    const linkedAppts = await req.dbClient.query(
      `SELECT 1 FROM appointments WHERE practitioner_id = $1 LIMIT 1`,
      [id]
    );
    const linkedConsults = await req.dbClient.query(
      `SELECT 1 FROM consultation_notes WHERE practitioner_id = $1 LIMIT 1`,
      [id]
    );

    if (linkedAppts.rowCount > 0 || linkedConsults.rowCount > 0) {
      await req.dbClient.query(
        `UPDATE practitioners SET is_active = false WHERE id = $1 AND tenant_id = $2`,
        [id, tenantId]
      );
      return res.status(200).json({ message: 'Praticien désactivé (conservé dans l\'historique médical)' });
    }

    await req.dbClient.query(
      `DELETE FROM practitioners WHERE id = $1 AND tenant_id = $2`,
      [id, tenantId]
    );

    await logAudit(req, 'DELETE_PRACTITIONER', 'practitioners', id);
    return res.status(200).json({ message: 'Praticien supprimé avec succès' });
  } catch (err) {
    console.error('Delete practitioner error:', err.message);
    return res.status(500).json({ error: 'Échec de suppression du praticien' });
  }
};

module.exports = {
  getSpecialties,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
  getPractitioners,
  createPractitioner,
  updatePractitioner,
  deletePractitioner
};
