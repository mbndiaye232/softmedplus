const crypto = require('crypto');
const { logAudit } = require('../middleware/audit');

// 1. Buildings CRUD
const getBuildings = async (req, res) => {
  const tenantId = req.user.tenant_id;
  try {
    const result = await req.dbClient.query(
      `SELECT b.*,
              COUNT(DISTINCT r.id)::INT AS rooms_count,
              COUNT(DISTINCT bd.id)::INT AS beds_count
       FROM hospital_buildings b
       LEFT JOIN hospital_rooms r ON b.id = r.building_id
       LEFT JOIN hospital_beds bd ON r.id = bd.room_id
       WHERE b.tenant_id = $1
       GROUP BY b.id
       ORDER BY b.name ASC`,
      [tenantId]
    );
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get buildings error:', err.message);
    return res.status(500).json({ error: 'Échec de récupération des bâtiments' });
  }
};

const createBuilding = async (req, res) => {
  const { name, code } = req.body;
  const tenantId = req.user.tenant_id;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Le nom du bâtiment est obligatoire' });
  }

  const cleanName = name.trim();
  const cleanCode = code && code.trim() ? code.trim() : null;

  try {
    // Check duplicate building name
    const existing = await req.dbClient.query(
      `SELECT id FROM hospital_buildings WHERE tenant_id = $1 AND LOWER(TRIM(name)) = LOWER($2)`,
      [tenantId, cleanName]
    );
    if (existing.rowCount > 0) {
      return res.status(400).json({ error: `Un bâtiment nommé "${cleanName}" existe déjà dans cet établissement.` });
    }

    if (cleanCode) {
      const existingCode = await req.dbClient.query(
        `SELECT id FROM hospital_buildings WHERE tenant_id = $1 AND LOWER(TRIM(code)) = LOWER($2)`,
        [tenantId, cleanCode]
      );
      if (existingCode.rowCount > 0) {
        return res.status(400).json({ error: `Un bâtiment avec le code "${cleanCode}" existe déjà.` });
      }
    }

    const result = await req.dbClient.query(
      `INSERT INTO hospital_buildings (tenant_id, name, code)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [tenantId, cleanName, cleanCode]
    );
    await logAudit(req, 'CREATE_BUILDING', 'hospital_buildings', result.rows[0].id);
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create building error:', err.message);
    if (err.code === '23505' || err.message.includes('unique')) {
      return res.status(400).json({ error: `Un bâtiment avec ce nom ou ce code existe déjà.` });
    }
    return res.status(500).json({ error: 'Échec de création du bâtiment' });
  }
};

const updateBuilding = async (req, res) => {
  const { id } = req.params;
  const { name, code } = req.body;
  const tenantId = req.user.tenant_id;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Le nom du bâtiment est obligatoire' });
  }

  const cleanName = name.trim();
  const cleanCode = code && code.trim() ? code.trim() : null;

  try {
    const existing = await req.dbClient.query(
      `SELECT id FROM hospital_buildings WHERE tenant_id = $1 AND LOWER(TRIM(name)) = LOWER($2) AND id != $3`,
      [tenantId, cleanName, id]
    );
    if (existing.rowCount > 0) {
      return res.status(400).json({ error: `Un bâtiment nommé "${cleanName}" existe déjà.` });
    }

    if (cleanCode) {
      const existingCode = await req.dbClient.query(
        `SELECT id FROM hospital_buildings WHERE tenant_id = $1 AND LOWER(TRIM(code)) = LOWER($2) AND id != $3`,
        [tenantId, cleanCode, id]
      );
      if (existingCode.rowCount > 0) {
        return res.status(400).json({ error: `Un bâtiment avec le code "${cleanCode}" existe déjà.` });
      }
    }

    const result = await req.dbClient.query(
      `UPDATE hospital_buildings
       SET name = $1, code = $2
       WHERE id = $3 AND tenant_id = $4
       RETURNING *`,
      [cleanName, cleanCode, id, tenantId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Bâtiment introuvable' });
    }
    await logAudit(req, 'UPDATE_BUILDING', 'hospital_buildings', id);
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Update building error:', err.message);
    if (err.code === '23505' || err.message.includes('unique')) {
      return res.status(400).json({ error: `Un bâtiment avec ce nom ou ce code existe déjà.` });
    }
    return res.status(500).json({ error: 'Échec de modification du bâtiment' });
  }
};

const deleteBuilding = async (req, res) => {
  const { id } = req.params;
  const tenantId = req.user.tenant_id;

  try {
    const activeStays = await req.dbClient.query(
      `SELECT h.id FROM hospitalizations h
       JOIN hospital_beds b ON h.bed_id = b.id
       JOIN hospital_rooms r ON b.room_id = r.id
       WHERE r.building_id = $1 AND h.tenant_id = $2 AND h.status = 'ADMITTED'`,
      [id, tenantId]
    );
    if (activeStays.rowCount > 0) {
      return res.status(400).json({ error: 'Impossible de supprimer ce bâtiment car des patients y sont actuellement hospitalisés.' });
    }

    const result = await req.dbClient.query(
      `DELETE FROM hospital_buildings WHERE id = $1 AND tenant_id = $2 RETURNING id`,
      [id, tenantId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Bâtiment introuvable' });
    }
    await logAudit(req, 'DELETE_BUILDING', 'hospital_buildings', id);
    return res.status(200).json({ message: 'Bâtiment supprimé avec succès' });
  } catch (err) {
    console.error('Delete building error:', err.message);
    if (err.code === '23503') {
      return res.status(400).json({ error: 'Impossible de supprimer ce bâtiment : des séjours d\'hospitalisation passés y sont rattachés et doivent être conservés dans l\'historique des patients.' });
    }
    return res.status(500).json({ error: 'Échec de suppression du bâtiment' });
  }
};

// 2. Rooms CRUD
const getRooms = async (req, res) => {
  const { building_id } = req.query;
  const tenantId = req.user.tenant_id;
  try {
    let query = `
      SELECT r.*, 
             COALESCE(r.number_or_name, r.room_number) as number_or_name,
             b.name as building_name,
             COUNT(DISTINCT bd.id)::INT AS beds_count
      FROM hospital_rooms r
      JOIN hospital_buildings b ON r.building_id = b.id
      LEFT JOIN hospital_beds bd ON r.id = bd.room_id
      WHERE r.tenant_id = $1
    `;
    const params = [tenantId];
    if (building_id) {
      params.push(building_id);
      query += ` AND r.building_id = $${params.length}`;
    }
    query += ` GROUP BY r.id, b.name ORDER BY COALESCE(r.number_or_name, r.room_number)`;

    const result = await req.dbClient.query(query, params);
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get rooms error:', err.message);
    return res.status(500).json({ error: 'Échec de récupération des chambres' });
  }
};

const createRoom = async (req, res) => {
  const { building_id, number_or_name, room_type } = req.body;
  const tenantId = req.user.tenant_id;

  if (!building_id || !number_or_name || !number_or_name.trim()) {
    return res.status(400).json({ error: 'Le bâtiment et le nom/numéro de chambre sont obligatoires' });
  }

  const cleanName = number_or_name.trim();

  try {
    // Check duplicate room name in the same building
    const existing = await req.dbClient.query(
      `SELECT id FROM hospital_rooms 
       WHERE tenant_id = $1 AND building_id = $2 
         AND (LOWER(TRIM(COALESCE(number_or_name, ''))) = LOWER($3) OR LOWER(TRIM(COALESCE(room_number, ''))) = LOWER($3))`,
      [tenantId, building_id, cleanName]
    );
    if (existing.rowCount > 0) {
      return res.status(400).json({ error: `Une chambre ou salle nommée "${cleanName}" existe déjà dans ce bâtiment.` });
    }

    const result = await req.dbClient.query(
      `INSERT INTO hospital_rooms (tenant_id, building_id, room_number, number_or_name, room_type)
       VALUES ($1, $2, $3, $3, $4)
       RETURNING *, COALESCE(number_or_name, room_number) as number_or_name`,
      [tenantId, building_id, cleanName, room_type || 'STANDARD']
    );
    await logAudit(req, 'CREATE_ROOM', 'hospital_rooms', result.rows[0].id);
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create room error:', err.message);
    if (err.code === '23505' || err.message.includes('unique')) {
      return res.status(400).json({ error: `Une chambre avec ce nom existe déjà dans ce bâtiment.` });
    }
    return res.status(500).json({ error: 'Échec de création de la chambre: ' + err.message });
  }
};

const updateRoom = async (req, res) => {
  const { id } = req.params;
  const { building_id, number_or_name, room_type } = req.body;
  const tenantId = req.user.tenant_id;

  if (!building_id || !number_or_name || !number_or_name.trim()) {
    return res.status(400).json({ error: 'Le bâtiment et le nom/numéro de chambre sont obligatoires' });
  }

  const cleanName = number_or_name.trim();

  try {
    const existing = await req.dbClient.query(
      `SELECT id FROM hospital_rooms 
       WHERE tenant_id = $1 AND building_id = $2 
         AND (LOWER(TRIM(COALESCE(number_or_name, ''))) = LOWER($3) OR LOWER(TRIM(COALESCE(room_number, ''))) = LOWER($3))
         AND id != $4`,
      [tenantId, building_id, cleanName, id]
    );
    if (existing.rowCount > 0) {
      return res.status(400).json({ error: `Une chambre nommée "${cleanName}" existe déjà dans ce bâtiment.` });
    }

    const result = await req.dbClient.query(
      `UPDATE hospital_rooms 
       SET building_id = $1, room_number = $2, number_or_name = $2, room_type = $3
       WHERE id = $4 AND tenant_id = $5
       RETURNING *, COALESCE(number_or_name, room_number) as number_or_name`,
      [building_id, cleanName, room_type || 'STANDARD', id, tenantId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Chambre introuvable' });
    }
    await logAudit(req, 'UPDATE_ROOM', 'hospital_rooms', id);
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Update room error:', err.message);
    if (err.code === '23505' || err.message.includes('unique')) {
      return res.status(400).json({ error: `Une chambre avec ce nom existe déjà dans ce bâtiment.` });
    }
    return res.status(500).json({ error: 'Échec de modification de la chambre' });
  }
};

const deleteRoom = async (req, res) => {
  const { id } = req.params;
  const tenantId = req.user.tenant_id;

  try {
    const activeStays = await req.dbClient.query(
      `SELECT h.id FROM hospitalizations h
       JOIN hospital_beds b ON h.bed_id = b.id
       WHERE b.room_id = $1 AND h.tenant_id = $2 AND h.status = 'ADMITTED'`,
      [id, tenantId]
    );
    if (activeStays.rowCount > 0) {
      return res.status(400).json({ error: 'Impossible de supprimer cette chambre car des patients y sont actuellement hospitalisés.' });
    }

    const result = await req.dbClient.query(
      `DELETE FROM hospital_rooms WHERE id = $1 AND tenant_id = $2 RETURNING id`,
      [id, tenantId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Chambre introuvable' });
    }
    await logAudit(req, 'DELETE_ROOM', 'hospital_rooms', id);
    return res.status(200).json({ message: 'Chambre supprimée avec succès' });
  } catch (err) {
    console.error('Delete room error:', err.message);
    if (err.code === '23503') {
      return res.status(400).json({ error: 'Impossible de supprimer cette chambre : des séjours d\'hospitalisation passés y sont rattachés et doivent être conservés dans l\'historique des patients.' });
    }
    return res.status(500).json({ error: 'Échec de suppression de la chambre' });
  }
};

// 3. Beds CRUD
const getBeds = async (req, res) => {
  const { room_id, status } = req.query;
  const tenantId = req.user.tenant_id;
  try {
    let query = `
      SELECT b.*, 
             COALESCE(b.name, b.bed_number) as name,
             COALESCE(r.number_or_name, r.room_number) as room_name, 
             bl.name as building_name 
      FROM hospital_beds b
      JOIN hospital_rooms r ON b.room_id = r.id
      JOIN hospital_buildings bl ON r.building_id = bl.id
      WHERE b.tenant_id = $1
    `;
    const params = [tenantId];

    if (room_id) {
      params.push(room_id);
      query += ` AND b.room_id = $${params.length}`;
    }
    if (status) {
      params.push(status);
      query += ` AND b.status = $${params.length}`;
    }

    query += ` ORDER BY COALESCE(b.name, b.bed_number)`;

    const result = await req.dbClient.query(query, params);
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get beds error:', err.message);
    return res.status(500).json({ error: 'Échec de récupération des lits' });
  }
};

const createBed = async (req, res) => {
  const { room_id, name, luxury_level, daily_rate } = req.body;
  const tenantId = req.user.tenant_id;

  if (!room_id || !name || !name.trim() || daily_rate === undefined) {
    return res.status(400).json({ error: 'La chambre, le nom du lit et le tarif journalier sont obligatoires' });
  }

  const cleanName = name.trim();

  try {
    // Check duplicate bed in the same room
    const existing = await req.dbClient.query(
      `SELECT id FROM hospital_beds 
       WHERE tenant_id = $1 AND room_id = $2 
         AND (LOWER(TRIM(COALESCE(name, ''))) = LOWER($3) OR LOWER(TRIM(COALESCE(bed_number, ''))) = LOWER($3))`,
      [tenantId, room_id, cleanName]
    );
    if (existing.rowCount > 0) {
      return res.status(400).json({ error: `Un lit nommé "${cleanName}" existe déjà dans cette chambre.` });
    }

    const result = await req.dbClient.query(
      `INSERT INTO hospital_beds (tenant_id, room_id, name, bed_number, luxury_level, daily_rate, status)
       VALUES ($1, $2, $3, $3, $4, $5, 'AVAILABLE')
       RETURNING *, COALESCE(name, bed_number) as name`,
      [tenantId, room_id, cleanName, luxury_level || 'STANDARD', parseFloat(daily_rate)]
    );
    await logAudit(req, 'CREATE_BED', 'hospital_beds', result.rows[0].id);
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create bed error:', err.message);
    if (err.code === '23505' || err.message.includes('unique')) {
      return res.status(400).json({ error: `Un lit avec ce nom existe déjà dans cette chambre.` });
    }
    return res.status(500).json({ error: 'Échec de création du lit: ' + err.message });
  }
};

const updateBed = async (req, res) => {
  const { id } = req.params;
  const { room_id, name, luxury_level, daily_rate, status } = req.body;
  const tenantId = req.user.tenant_id;

  if (!room_id || !name || !name.trim() || daily_rate === undefined) {
    return res.status(400).json({ error: 'La chambre, le nom du lit et le tarif journalier sont obligatoires' });
  }

  const cleanName = name.trim();

  try {
    const existing = await req.dbClient.query(
      `SELECT id FROM hospital_beds 
       WHERE tenant_id = $1 AND room_id = $2 
         AND (LOWER(TRIM(COALESCE(name, ''))) = LOWER($3) OR LOWER(TRIM(COALESCE(bed_number, ''))) = LOWER($3))
         AND id != $4`,
      [tenantId, room_id, cleanName, id]
    );
    if (existing.rowCount > 0) {
      return res.status(400).json({ error: `Un lit nommé "${cleanName}" existe déjà dans cette chambre.` });
    }

    // Check if updating status while occupied
    const currentBed = await req.dbClient.query(
      `SELECT status FROM hospital_beds WHERE id = $1 AND tenant_id = $2`,
      [id, tenantId]
    );
    if (currentBed.rowCount === 0) {
      return res.status(404).json({ error: 'Lit introuvable' });
    }

    let newStatus = currentBed.rows[0].status;
    if (status && status !== currentBed.rows[0].status) {
      if (currentBed.rows[0].status === 'OCCUPIED' && status !== 'OCCUPIED') {
        const activeStays = await req.dbClient.query(
          `SELECT id FROM hospitalizations WHERE bed_id = $1 AND tenant_id = $2 AND status = 'ADMITTED'`,
          [id, tenantId]
        );
        if (activeStays.rowCount > 0) {
          return res.status(400).json({ error: 'Impossible de modifier le statut d\'un lit actuellement occupé.' });
        }
      }
      newStatus = status;
    }

    const result = await req.dbClient.query(
      `UPDATE hospital_beds
       SET room_id = $1, name = $2, bed_number = $2, luxury_level = $3, daily_rate = $4, status = $5
       WHERE id = $6 AND tenant_id = $7
       RETURNING *, COALESCE(name, bed_number) as name`,
      [room_id, cleanName, luxury_level || 'STANDARD', parseFloat(daily_rate), newStatus, id, tenantId]
    );
    await logAudit(req, 'UPDATE_BED', 'hospital_beds', id);
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Update bed error:', err.message);
    if (err.code === '23505' || err.message.includes('unique')) {
      return res.status(400).json({ error: `Un lit avec ce nom existe déjà dans cette chambre.` });
    }
    return res.status(500).json({ error: 'Échec de modification du lit' });
  }
};

const deleteBed = async (req, res) => {
  const { id } = req.params;
  const tenantId = req.user.tenant_id;

  try {
    const bedCheck = await req.dbClient.query(
      `SELECT status FROM hospital_beds WHERE id = $1 AND tenant_id = $2`,
      [id, tenantId]
    );
    if (bedCheck.rowCount === 0) {
      return res.status(404).json({ error: 'Lit introuvable' });
    }
    if (bedCheck.rows[0].status === 'OCCUPIED') {
      return res.status(400).json({ error: 'Impossible de supprimer ce lit car il est actuellement occupé par un patient.' });
    }

    const activeStays = await req.dbClient.query(
      `SELECT id FROM hospitalizations WHERE bed_id = $1 AND tenant_id = $2 AND status = 'ADMITTED'`,
      [id, tenantId]
    );
    if (activeStays.rowCount > 0) {
      return res.status(400).json({ error: 'Impossible de supprimer ce lit avec un séjour actif.' });
    }

    const result = await req.dbClient.query(
      `DELETE FROM hospital_beds WHERE id = $1 AND tenant_id = $2 RETURNING id`,
      [id, tenantId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Lit introuvable' });
    }
    await logAudit(req, 'DELETE_BED', 'hospital_beds', id);
    return res.status(200).json({ message: 'Lit supprimé avec succès' });
  } catch (err) {
    console.error('Delete bed error:', err.message);
    if (err.code === '23503') {
      return res.status(400).json({ error: 'Impossible de supprimer ce lit : des séjours d\'hospitalisation passés y sont rattachés et doivent être conservés dans l\'historique des patients. Désactivez-le plutôt.' });
    }
    return res.status(500).json({ error: 'Échec de suppression du lit' });
  }
};

// 4. Stays (Hospitalizations & Occupancy History)
const getHospitalizations = async (req, res) => {
  const { status, start_date, end_date, building_id, room_id, search } = req.query;
  const tenantId = req.user.tenant_id;
  try {
    let query = `
      SELECT h.*, 
             p.first_name as patient_first_name, p.last_name as patient_last_name, p.patient_code, 
             p.phone_number as patient_phone,
             COALESCE(b.name, b.bed_number) as bed_name, 
             COALESCE(r.number_or_name, r.room_number) as room_name, 
             r.id as room_id,
             bl.name as building_name, bl.id as building_id,
             b.daily_rate, b.luxury_level,
             GREATEST(1, CEIL(EXTRACT(EPOCH FROM (COALESCE(h.discharged_at, NOW()) - h.admitted_at)) / 86400))::INT as duration_days,
             (GREATEST(1, CEIL(EXTRACT(EPOCH FROM (COALESCE(h.discharged_at, NOW()) - h.admitted_at)) / 86400)) * b.daily_rate)::NUMERIC as calculated_cost
      FROM hospitalizations h
      JOIN patients p ON h.patient_id = p.id
      JOIN hospital_beds b ON h.bed_id = b.id
      JOIN hospital_rooms r ON b.room_id = r.id
      JOIN hospital_buildings bl ON r.building_id = bl.id
      WHERE h.tenant_id = $1
    `;
    const params = [tenantId];

    if (status) {
      params.push(status);
      query += ` AND h.status = $${params.length}`;
    }

    if (start_date) {
      params.push(`${start_date} 00:00:00`);
      query += ` AND (h.discharged_at IS NULL OR h.discharged_at >= $${params.length}::timestamptz)`;
    }

    if (end_date) {
      params.push(`${end_date} 23:59:59`);
      query += ` AND h.admitted_at <= $${params.length}::timestamptz`;
    }

    if (building_id) {
      params.push(building_id);
      query += ` AND bl.id = $${params.length}`;
    }

    if (room_id) {
      params.push(room_id);
      query += ` AND r.id = $${params.length}`;
    }

    if (search && search.trim()) {
      params.push(`%${search.trim().toLowerCase()}%`);
      query += ` AND (
        LOWER(p.first_name) LIKE $${params.length} OR 
        LOWER(p.last_name) LIKE $${params.length} OR 
        LOWER(COALESCE(p.patient_code, '')) LIKE $${params.length} OR 
        LOWER(COALESCE(b.name, b.bed_number, '')) LIKE $${params.length} OR 
        LOWER(COALESCE(r.number_or_name, r.room_number, '')) LIKE $${params.length} OR 
        LOWER(bl.name) LIKE $${params.length}
      )`;
    }

    query += ` ORDER BY h.admitted_at DESC`;

    const result = await req.dbClient.query(query, params);
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get hospitalizations error:', err.message);
    return res.status(500).json({ error: 'Échec de récupération de l\'historique des hospitalisations' });
  }
};

const admitPatient = async (req, res) => {
  const { patient_id, bed_id, notes, admitted_at } = req.body;
  const tenantId = req.user.tenant_id;

  if (!patient_id || !bed_id) {
    return res.status(400).json({ error: 'Required fields: patient_id, bed_id' });
  }

  try {
    // Check if patient is already admitted
    const activeStay = await req.dbClient.query(
      `SELECT id FROM hospitalizations WHERE patient_id = $1 AND tenant_id = $2 AND status = 'ADMITTED'`,
      [patient_id, tenantId]
    );
    if (activeStay.rowCount > 0) {
      return res.status(400).json({ error: 'Ce patient est déjà actuellement hospitalisé.' });
    }

    // Check if bed is available
    const bed = await req.dbClient.query(
      `SELECT status FROM hospital_beds WHERE id = $1 AND tenant_id = $2`,
      [bed_id, tenantId]
    );
    if (bed.rowCount === 0) {
      return res.status(404).json({ error: 'Lit introuvable' });
    }
    if (bed.rows[0].status === 'OCCUPIED') {
      return res.status(400).json({ error: 'Ce lit est déjà occupé.' });
    }
    if (bed.rows[0].status === 'MAINTENANCE') {
      return res.status(400).json({ error: 'Ce lit est en maintenance.' });
    }

    const hospId = require('crypto').randomUUID();
    const admissionDate = admitted_at ? new Date(admitted_at) : new Date();
    
    // A. Insert hospitalization stay record
    const hospRes = await req.dbClient.query(
      `INSERT INTO hospitalizations (id, tenant_id, patient_id, bed_id, admitted_at, status, notes)
       VALUES ($1, $2, $3, $4, $5, 'ADMITTED', $6)
       RETURNING *`,
      [hospId, tenantId, patient_id, bed_id, admissionDate, notes || null]
    );

    // B. Mark bed as OCCUPIED
    await req.dbClient.query(
      `UPDATE hospital_beds SET status = 'OCCUPIED' WHERE id = $1 AND tenant_id = $2`,
      [bed_id, tenantId]
    );

    // C. Mark patient status as Interne (Inpatient)
    await req.dbClient.query(
      `UPDATE patients SET status = 'Interne' WHERE id = $1 AND tenant_id = $2`,
      [patient_id, tenantId]
    );

    await logAudit(req, 'ADMIT_PATIENT', 'hospitalizations', hospId);

    return res.status(201).json(hospRes.rows[0]);
  } catch (err) {
    console.error('Admit patient error:', err.message);
    return res.status(500).json({ error: 'Failed to admit patient' });
  }
};

const dischargePatient = async (req, res) => {
  const { id } = req.params;
  const { notes } = req.body;
  const tenantId = req.user.tenant_id;

  try {
    // Fetch active stay with full room, building and patient insurance info
    const stayRes = await req.dbClient.query(
      `SELECT h.*, b.daily_rate, 
              COALESCE(b.name, b.bed_number) as bed_name, 
              b.luxury_level,
              COALESCE(r.number_or_name, r.room_number) as room_name, 
              bl.name as building_name,
              p.first_name as patient_first_name, p.last_name as patient_last_name, p.patient_code,
              pip.insurance_company_id, pip.coverage_rate_percent,
              ic.name as insurance_name
       FROM hospitalizations h
       JOIN hospital_beds b ON h.bed_id = b.id
       JOIN hospital_rooms r ON b.room_id = r.id
       JOIN hospital_buildings bl ON r.building_id = bl.id
       JOIN patients p ON h.patient_id = p.id
       LEFT JOIN patient_insurance_policies pip ON p.id = pip.patient_id AND pip.is_primary = true
       LEFT JOIN insurance_companies ic ON pip.insurance_company_id = ic.id
       WHERE h.id = $1 AND h.tenant_id = $2 AND h.status = 'ADMITTED'`,
      [id, tenantId]
    );

    if (stayRes.rowCount === 0) {
      return res.status(404).json({ error: 'Séjour d\'hospitalisation actif introuvable' });
    }

    const stay = stayRes.rows[0];
    const admittedAt = new Date(stay.admitted_at);
    const dischargedAt = new Date();

    // Calculate stay duration (duration in days, minimum 1 day)
    const diffTime = Math.abs(dischargedAt - admittedAt);
    const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    const dailyRate = parseFloat(stay.daily_rate);
    const totalAccommodationCost = diffDays * dailyRate;

    // A. Update hospitalization record
    const updatedHosp = await req.dbClient.query(
      `UPDATE hospitalizations 
       SET discharged_at = $1, status = 'DISCHARGED', notes = COALESCE($2, notes)
       WHERE id = $3 AND tenant_id = $4
       RETURNING *`,
      [dischargedAt.toISOString(), notes || null, id, tenantId]
    );

    // B. Mark bed as AVAILABLE
    await req.dbClient.query(
      `UPDATE hospital_beds SET status = 'AVAILABLE' WHERE id = $1`,
      [stay.bed_id]
    );

    // C. Mark patient status as Externe (Outpatient)
    await req.dbClient.query(
      `UPDATE patients SET status = 'Externe' WHERE id = $1`,
      [stay.patient_id]
    );

    await logAudit(req, 'DISCHARGE_PATIENT', 'hospitalizations', id);

    return res.status(200).json({
      hospitalization: updatedHosp.rows[0],
      duration_days: diffDays,
      daily_rate: dailyRate,
      total_cost: totalAccommodationCost,
      bed_name: stay.bed_name,
      room_name: stay.room_name,
      building_name: stay.building_name,
      luxury_level: stay.luxury_level,
      patient_id: stay.patient_id,
      patient_name: `${stay.patient_first_name} ${stay.patient_last_name}`,
      insurance_company_id: stay.insurance_company_id,
      insurance_name: stay.insurance_name,
      coverage_rate_percent: stay.coverage_rate_percent
    });

  } catch (err) {
    console.error('Discharge patient error:', err.message);
    return res.status(500).json({ error: 'Failed to discharge patient' });
  }
};

module.exports = {
  getBuildings,
  createBuilding,
  updateBuilding,
  deleteBuilding,
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  getBeds,
  createBed,
  updateBed,
  deleteBed,
  getHospitalizations,
  admitPatient,
  dischargePatient
};
