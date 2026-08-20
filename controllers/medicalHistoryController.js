const crypto = require('crypto');

// ============================================================================
// 1. Full 360° Patient Dossier
// ============================================================================
const getPatientDossier = async (req, res) => {
  const { patientId } = req.params;
  const tenantId = req.user.tenant_id;

  try {
    // 1. Patient basic information and status
    const patientRes = await req.dbClient.query(
      `SELECT p.*, ps.name AS status_name, ps.color_code AS status_color, ps.code AS status_code
       FROM patients p
       LEFT JOIN patient_statuses ps ON p.status_id = ps.id
       WHERE p.id = $1`,
      [patientId]
    );

    if (patientRes.rowCount === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const patient = patientRes.rows[0];

    // 2. Treatments and clinical outcomes
    const treatmentsRes = await req.dbClient.query(
      `SELECT t.*, prac.first_name AS doc_first, prac.last_name AS doc_last
       FROM patient_treatments t
       LEFT JOIN practitioners prac ON t.prescribed_by = prac.id
       WHERE t.patient_id = $1
       ORDER BY t.start_date DESC, t.created_at DESC`,
      [patientId]
    );

    // 3. Lab Orders and Examinations
    const labOrdersRes = await req.dbClient.query(
      `SELECT lo.*, prac.first_name AS doc_first, prac.last_name AS doc_last
       FROM patient_lab_orders lo
       LEFT JOIN practitioners prac ON lo.practitioner_id = prac.id
       WHERE lo.patient_id = $1
       ORDER BY lo.created_at DESC`,
      [patientId]
    );

    // 4. Clinical Consultations & Notes
    const consultsRes = await req.dbClient.query(
      `SELECT cn.*, prac.first_name AS doc_first, prac.last_name AS doc_last, prac.specialty_name
       FROM consultation_notes cn
       LEFT JOIN practitioners prac ON cn.practitioner_id = prac.id
       WHERE cn.patient_id = $1
       ORDER BY cn.created_at DESC`,
      [patientId]
    );

    // 5. Prescriptions
    const rxRes = await req.dbClient.query(
      `SELECT rx.*, prac.first_name AS doc_first, prac.last_name AS doc_last,
              (SELECT json_agg(pi.*) FROM prescription_items pi WHERE pi.prescription_id = rx.id) AS items
       FROM prescriptions rx
       LEFT JOIN practitioners prac ON rx.practitioner_id = prac.id
       WHERE rx.patient_id = $1
       ORDER BY rx.issued_at DESC`,
      [patientId]
    );

    // 6. Appointments
    const apptsRes = await req.dbClient.query(
      `SELECT a.*, lower(a.time_slot) AS start_time, upper(a.time_slot) AS end_time,
              prac.first_name AS doc_first, prac.last_name AS doc_last,
              ms.name AS service_name
       FROM appointments a
       LEFT JOIN practitioners prac ON a.practitioner_id = prac.id
       LEFT JOIN medical_services ms ON a.medical_service_id = ms.id
       WHERE a.patient_id = $1
       ORDER BY lower(a.time_slot) DESC`,
      [patientId]
    );

    // 7. Hospitalizations (Stays)
    let hospitalizations = [];
    try {
      const hospRes = await req.dbClient.query(
        `SELECT h.*, b.bed_number, r.room_number, bg.name AS building_name
         FROM hospitalizations h
         LEFT JOIN hospital_beds b ON h.bed_id = b.id
         LEFT JOIN hospital_rooms r ON b.room_id = r.id
         LEFT JOIN hospital_buildings bg ON r.building_id = bg.id
         WHERE h.patient_id = $1
         ORDER BY h.admission_date DESC`,
        [patientId]
      );
      hospitalizations = hospRes.rows;
    } catch (e) {
      hospitalizations = [];
    }

    return res.status(200).json({
      patient,
      treatments: treatmentsRes.rows,
      labOrders: labOrdersRes.rows,
      consultations: consultsRes.rows,
      prescriptions: rxRes.rows,
      appointments: apptsRes.rows,
      hospitalizations
    });
  } catch (err) {
    console.error('Get patient dossier error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve patient medical dossier' });
  }
};

// ============================================================================
// 2. Patient Treatments CRUD
// ============================================================================
const getTreatments = async (req, res) => {
  const { patientId } = req.params;
  try {
    const result = await req.dbClient.query(
      `SELECT t.*, prac.first_name AS doc_first, prac.last_name AS doc_last
       FROM patient_treatments t
       LEFT JOIN practitioners prac ON t.prescribed_by = prac.id
       WHERE t.patient_id = $1
       ORDER BY t.start_date DESC`,
      [patientId]
    );
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get treatments error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve treatments' });
  }
};

const createTreatment = async (req, res) => {
  const { patientId } = req.params;
  const { treatment_name, treatment_type, start_date, end_date, dosage_instructions, status, results_obtained, prescribed_by } = req.body;

  if (!treatment_name || !start_date) {
    return res.status(400).json({ error: 'Treatment name and start date are required' });
  }

  const tenantId = req.user.tenant_id;
  const id = crypto.randomUUID();

  try {
    const result = await req.dbClient.query(
      `INSERT INTO patient_treatments (
        id, tenant_id, patient_id, treatment_name, treatment_type, start_date, end_date, 
        dosage_instructions, status, results_obtained, prescribed_by
      )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        id,
        tenantId,
        patientId,
        treatment_name,
        treatment_type || 'Médicamenteux',
        start_date,
        end_date || null,
        dosage_instructions || null,
        status || 'EN_COURS',
        results_obtained || null,
        prescribed_by || null
      ]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create treatment error:', err.message);
    return res.status(500).json({ error: 'Failed to create treatment' });
  }
};

const updateTreatment = async (req, res) => {
  const { id } = req.params;
  const { treatment_name, treatment_type, start_date, end_date, dosage_instructions, status, results_obtained, prescribed_by } = req.body;

  try {
    const result = await req.dbClient.query(
      `UPDATE patient_treatments
       SET treatment_name = COALESCE($1, treatment_name),
           treatment_type = COALESCE($2, treatment_type),
           start_date = COALESCE($3, start_date),
           end_date = COALESCE($4, end_date),
           dosage_instructions = COALESCE($5, dosage_instructions),
           status = COALESCE($6, status),
           results_obtained = COALESCE($7, results_obtained),
           prescribed_by = COALESCE($8, prescribed_by)
       WHERE id = $9
       RETURNING *`,
      [treatment_name, treatment_type, start_date, end_date, dosage_instructions, status, results_obtained, prescribed_by, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Treatment not found' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Update treatment error:', err.message);
    return res.status(500).json({ error: 'Failed to update treatment' });
  }
};

const deleteTreatment = async (req, res) => {
  const { id } = req.params;
  try {
    await req.dbClient.query(`DELETE FROM patient_treatments WHERE id = $1`, [id]);
    return res.status(200).json({ message: 'Treatment deleted successfully' });
  } catch (err) {
    console.error('Delete treatment error:', err.message);
    return res.status(500).json({ error: 'Failed to delete treatment' });
  }
};

// ============================================================================
// 3. Patient Lab Orders & Examinations CRUD
// ============================================================================
const getLabOrders = async (req, res) => {
  const { patientId } = req.params;
  try {
    const result = await req.dbClient.query(
      `SELECT lo.*, prac.first_name AS doc_first, prac.last_name AS doc_last
       FROM patient_lab_orders lo
       LEFT JOIN practitioners prac ON lo.practitioner_id = prac.id
       WHERE lo.patient_id = $1
       ORDER BY lo.created_at DESC`,
      [patientId]
    );
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get lab orders error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve lab orders' });
  }
};

const createLabOrder = async (req, res) => {
  const { patientId } = req.params;
  const { test_name, category, priority, clinical_notes, practitioner_id } = req.body;

  if (!test_name) {
    return res.status(400).json({ error: 'Test name is required' });
  }

  const tenantId = req.user.tenant_id;
  const id = crypto.randomUUID();

  try {
    const result = await req.dbClient.query(
      `INSERT INTO patient_lab_orders (
        id, tenant_id, patient_id, practitioner_id, test_name, category, priority, status, clinical_notes
      )
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'A_FAIRE', $8)
       RETURNING *`,
      [
        id,
        tenantId,
        patientId,
        practitioner_id || null,
        test_name,
        category || 'Biologie',
        priority || 'NORMALE',
        clinical_notes || null
      ]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create lab order error:', err.message);
    return res.status(500).json({ error: 'Failed to create lab order' });
  }
};

const updateLabOrder = async (req, res) => {
  const { id } = req.params;
  const { status, results_text, document_url, clinical_notes } = req.body;

  try {
    const resultsDate = results_text ? new Date() : null;
    const result = await req.dbClient.query(
      `UPDATE patient_lab_orders
       SET status = COALESCE($1, status),
           results_text = COALESCE($2, results_text),
           document_url = COALESCE($3, document_url),
           clinical_notes = COALESCE($4, clinical_notes),
           results_date = CASE WHEN $2 IS NOT NULL THEN NOW() ELSE results_date END
       WHERE id = $5
       RETURNING *`,
      [status, results_text, document_url, clinical_notes, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Lab order not found' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Update lab order error:', err.message);
    return res.status(500).json({ error: 'Failed to update lab order' });
  }
};

const deleteLabOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await req.dbClient.query(`DELETE FROM patient_lab_orders WHERE id = $1`, [id]);
    return res.status(200).json({ message: 'Lab order deleted successfully' });
  } catch (err) {
    console.error('Delete lab order error:', err.message);
    return res.status(500).json({ error: 'Failed to delete lab order' });
  }
};

module.exports = {
  getPatientDossier,
  getTreatments,
  createTreatment,
  updateTreatment,
  deleteTreatment,
  getLabOrders,
  createLabOrder,
  updateLabOrder,
  deleteLabOrder
};
