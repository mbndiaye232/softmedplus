const crypto = require('crypto');
const { logAudit } = require('../middleware/audit');

// 1. Buildings CRUD
const getBuildings = async (req, res) => {
  const tenantId = req.user.tenant_id;
  try {
    const result = await req.dbClient.query(
      `SELECT * FROM hospital_buildings WHERE tenant_id = $1 ORDER BY name`,
      [tenantId]
    );
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get buildings error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve buildings' });
  }
};

const createBuilding = async (req, res) => {
  const { name, code } = req.body;
  const tenantId = req.user.tenant_id;

  if (!name) {
    return res.status(400).json({ error: 'Building name is required' });
  }

  try {
    const result = await req.dbClient.query(
      `INSERT INTO hospital_buildings (tenant_id, name, code)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [tenantId, name, code || null]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create building error:', err.message);
    return res.status(500).json({ error: 'Failed to create building' });
  }
};

// 2. Rooms CRUD
const getRooms = async (req, res) => {
  const { building_id } = req.query;
  const tenantId = req.user.tenant_id;
  try {
    let query = `
      SELECT r.*, b.name as building_name 
      FROM hospital_rooms r
      JOIN hospital_buildings b ON r.building_id = b.id
      WHERE r.tenant_id = $1
    `;
    const params = [tenantId];
    if (building_id) {
      params.push(building_id);
      query += ` AND r.building_id = $${params.length}`;
    }
    query += ` ORDER BY r.number_or_name`;

    const result = await req.dbClient.query(query, params);
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get rooms error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve rooms' });
  }
};

const createRoom = async (req, res) => {
  const { building_id, number_or_name, room_type } = req.body;
  const tenantId = req.user.tenant_id;

  if (!building_id || !number_or_name) {
    return res.status(400).json({ error: 'Required fields missing: building_id, number_or_name' });
  }

  try {
    const result = await req.dbClient.query(
      `INSERT INTO hospital_rooms (tenant_id, building_id, number_or_name, room_type)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [tenantId, building_id, number_or_name, room_type || 'STANDARD']
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create room error:', err.message);
    return res.status(500).json({ error: 'Failed to create room' });
  }
};

// 3. Beds CRUD
const getBeds = async (req, res) => {
  const { room_id, status } = req.query;
  const tenantId = req.user.tenant_id;
  try {
    let query = `
      SELECT b.*, r.number_or_name as room_name, bl.name as building_name 
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

    query += ` ORDER BY b.name`;

    const result = await req.dbClient.query(query, params);
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get beds error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve beds' });
  }
};

const createBed = async (req, res) => {
  const { room_id, name, luxury_level, daily_rate } = req.body;
  const tenantId = req.user.tenant_id;

  if (!room_id || !name || daily_rate === undefined) {
    return res.status(400).json({ error: 'Required fields missing: room_id, name, daily_rate' });
  }

  try {
    const result = await req.dbClient.query(
      `INSERT INTO hospital_beds (tenant_id, room_id, name, luxury_level, daily_rate, status)
       VALUES ($1, $2, $3, $4, $5, 'AVAILABLE')
       RETURNING *`,
      [tenantId, room_id, name, luxury_level || 'STANDARD', parseFloat(daily_rate)]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create bed error:', err.message);
    return res.status(500).json({ error: 'Failed to create bed' });
  }
};

// 4. Stays (Hospitalizations)
const getHospitalizations = async (req, res) => {
  const { status } = req.query;
  const tenantId = req.user.tenant_id;
  try {
    let query = `
      SELECT h.*, 
             p.first_name as patient_first_name, p.last_name as patient_last_name, p.patient_code,
             b.name as bed_name, r.number_or_name as room_name, bl.name as building_name,
             b.daily_rate, b.luxury_level
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
    query += ` ORDER BY h.admitted_at DESC`;

    const result = await req.dbClient.query(query, params);
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get hospitalizations error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve hospitalization stays' });
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
      return res.status(400).json({ error: 'Le patient est déjà actuellement admis dans un séjour hospitalier' });
    }

    // Check if bed is available
    const bedCheck = await req.dbClient.query(
      `SELECT status FROM hospital_beds WHERE id = $1 AND tenant_id = $2`,
      [bed_id, tenantId]
    );
    if (bedCheck.rowCount === 0) {
      return res.status(404).json({ error: 'Lit introuvable' });
    }
    if (bedCheck.rows[0].status !== 'AVAILABLE') {
      return res.status(400).json({ error: 'Ce lit n\'est pas disponible' });
    }

    const hospId = crypto.randomUUID();
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
      `SELECT h.*, b.daily_rate, b.name as bed_name, b.luxury_level,
              r.number_or_name as room_name, bl.name as building_name,
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
  getRooms,
  createRoom,
  getBeds,
  createBed,
  getHospitalizations,
  admitPatient,
  dischargePatient
};
