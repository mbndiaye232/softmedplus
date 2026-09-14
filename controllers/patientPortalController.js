const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'clinicos-jwt-super-secret-key-2026';

const cleanStr = (s) => (s || '').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

// 1. Connexion patient : code patient + tenant (slug) + prenom/nom pour verification
// croisee - meme logique que verifyPatientCode (deja utilisee pour la reservation
// publique), reprise ici pour ouvrir une session de consultation du dossier.
const patientPortalLogin = async (req, res) => {
  const { tenant_slug, patient_code, first_name, last_name } = req.body;

  if (!tenant_slug || !patient_code || !first_name || !last_name) {
    return res.status(400).json({ error: 'Structure, code patient, prénom et nom sont requis' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`SELECT set_config('app.bypass_rls', 'true', true)`);

    const tenantRes = await client.query(
      `SELECT id, name, slug FROM tenants WHERE slug = $1 AND is_active = true`,
      [tenant_slug.toLowerCase().trim()]
    );

    if (tenantRes.rowCount === 0) {
      await client.query('COMMIT');
      return res.status(404).json({ error: 'Structure sanitaire introuvable' });
    }

    const tenant = tenantRes.rows[0];

    const patientRes = await client.query(
      `SELECT id, patient_code, first_name, last_name
       FROM patients
       WHERE tenant_id = $1 AND UPPER(TRIM(patient_code)) = UPPER(TRIM($2))
       LIMIT 1`,
      [tenant.id, patient_code.trim()]
    );

    await client.query('COMMIT');

    // Message volontairement générique (code introuvable vs nom incorrect) pour ne
    // pas laisser un tiers déduire qu'un code patient existe par essais successifs.
    const genericError = () => res.status(401).json({ error: 'Code patient, prénom ou nom incorrect' });

    if (patientRes.rowCount === 0) {
      return genericError();
    }

    const patient = patientRes.rows[0];
    const matchFirst = cleanStr(patient.first_name).includes(cleanStr(first_name)) || cleanStr(first_name).includes(cleanStr(patient.first_name));
    const matchLast = cleanStr(patient.last_name).includes(cleanStr(last_name)) || cleanStr(last_name).includes(cleanStr(patient.last_name));

    if (!matchFirst || !matchLast) {
      return genericError();
    }

    const token = jwt.sign(
      {
        patient_id: patient.id,
        tenant_id: tenant.id,
        patient_code: patient.patient_code,
        scope: 'patient_portal'
      },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.status(200).json({
      token,
      patient: {
        id: patient.id,
        patient_code: patient.patient_code,
        first_name: patient.first_name,
        last_name: patient.last_name
      },
      tenant: { id: tenant.id, name: tenant.name, slug: tenant.slug }
    });
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('Patient portal login error:', err.message);
    return res.status(500).json({ error: 'Échec de la connexion' });
  } finally {
    client.release();
  }
};

// 2. Dossier du patient connecté - tenant_id et patient_id viennent EXCLUSIVEMENT du
// jeton verifie (req.patientAuth), jamais d'un parametre fourni par l'appelant.
// Les confidential_notes (reservees au corps medical) sont volontairement exclues.
const getMyDossier = async (req, res) => {
  const { tenantId, patientId } = req.patientAuth;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`SELECT set_config('app.bypass_rls', 'true', true)`);

    const patientRes = await client.query(
      `SELECT p.id, p.patient_code, p.first_name, p.last_name, p.gender, p.date_of_birth,
              p.blood_group, p.allergies, p.chronic_conditions, p.status,
              ps.name AS status_name,
              doc.first_name AS doc_first, doc.last_name AS doc_last, doc.title AS doc_title
       FROM patients p
       LEFT JOIN patient_statuses ps ON p.status_id = ps.id
       LEFT JOIN practitioners doc ON p.attending_practitioner_id = doc.id
       WHERE p.id = $1 AND p.tenant_id = $2`,
      [patientId, tenantId]
    );

    if (patientRes.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Dossier introuvable' });
    }

    const appointmentsRes = await client.query(
      `SELECT a.id, a.status, a.consultation_mode,
              lower(a.time_slot) AS start_time, upper(a.time_slot) AS end_time,
              ms.name AS service_name,
              pr.first_name AS doc_first, pr.last_name AS doc_last, pr.title AS doc_title
       FROM appointments a
       LEFT JOIN medical_services ms ON a.medical_service_id = ms.id
       LEFT JOIN practitioners pr ON a.practitioner_id = pr.id
       WHERE a.patient_id = $1 AND a.tenant_id = $2 AND a.status != 'CANCELED'
       ORDER BY lower(a.time_slot) DESC`,
      [patientId, tenantId]
    ).catch(() => ({ rows: [] }));

    // Volontairement sans confidential_notes : reservees au corps medical.
    const consultationsRes = await client.query(
      `SELECT cn.id, cn.reason_for_visit, cn.diagnosis_text, cn.created_at,
              prac.first_name AS doc_first, prac.last_name AS doc_last, prac.title AS doc_title
       FROM consultation_notes cn
       LEFT JOIN practitioners prac ON cn.practitioner_id = prac.id
       WHERE cn.patient_id = $1 AND cn.tenant_id = $2
       ORDER BY cn.created_at DESC`,
      [patientId, tenantId]
    ).catch(() => ({ rows: [] }));

    const prescriptionsRes = await client.query(
      `SELECT rx.id, rx.prescription_code, rx.issued_at, rx.valid_until, rx.is_dispensed,
              prac.first_name AS doc_first, prac.last_name AS doc_last,
              COALESCE((SELECT json_agg(json_build_object('drug_name', pi.drug_name, 'dosage', pi.dosage, 'frequency', pi.frequency, 'duration_days', pi.duration_days, 'instructions', pi.instructions))
                        FROM prescription_items pi WHERE pi.prescription_id = rx.id), '[]'::json) AS items
       FROM prescriptions rx
       LEFT JOIN practitioners prac ON rx.practitioner_id = prac.id
       WHERE rx.patient_id = $1 AND rx.tenant_id = $2
       ORDER BY rx.issued_at DESC`,
      [patientId, tenantId]
    ).catch(() => ({ rows: [] }));

    const labOrdersRes = await client.query(
      `SELECT lo.id, lo.test_name, lo.status, lo.results_text, lo.document_url, lo.created_at, lo.results_date
       FROM patient_lab_orders lo
       WHERE lo.patient_id = $1 AND lo.tenant_id = $2
       ORDER BY lo.created_at DESC`,
      [patientId, tenantId]
    ).catch(() => ({ rows: [] }));

    await client.query('COMMIT');

    return res.status(200).json({
      patient: patientRes.rows[0],
      appointments: appointmentsRes.rows,
      consultations: consultationsRes.rows,
      prescriptions: prescriptionsRes.rows,
      lab_orders: labOrdersRes.rows
    });
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('Get my dossier error:', err.message);
    return res.status(500).json({ error: 'Échec du chargement du dossier' });
  } finally {
    client.release();
  }
};

module.exports = { patientPortalLogin, getMyDossier };
