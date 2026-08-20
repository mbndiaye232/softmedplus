const { logAudit } = require('../middleware/audit');

// 1. Create Medical Service (Price catalog for Consultations, Treatments, Acts)
const createMedicalService = async (req, res) => {
  const { code, name, category, duration_minutes, price, deposit_amount, description, practitioner_id } = req.body;

  if (!code || !name || price === undefined || price === null) {
    return res.status(400).json({ error: 'Champs requis manquants: code, nom, tarif' });
  }

  const tenantId = req.user.tenant_id;

  try {
    const result = await req.dbClient.query(
      `INSERT INTO medical_services (tenant_id, code, name, category, duration_minutes, price, deposit_amount, description, practitioner_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        tenantId,
        code.trim().toUpperCase(),
        name.trim(),
        (category || 'CONSULTATION').trim().toUpperCase(),
        parseInt(duration_minutes, 10) || 30,
        parseFloat(price) || 0,
        parseFloat(deposit_amount || 0),
        description ? description.trim() : null,
        practitioner_id || null
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create medical service error:', err.message);
    return res.status(500).json({ error: 'Échec de la création de la prestation: ' + err.message });
  }
};

// 2. Get Medical Services
const getMedicalServices = async (req, res) => {
  const tenantId = req.user.tenant_id;
  try {
    const result = await req.dbClient.query(
      `SELECT ms.*, p.first_name AS practitioner_first, p.last_name AS practitioner_last
       FROM medical_services ms
       LEFT JOIN practitioners p ON ms.practitioner_id = p.id
       WHERE ms.tenant_id = $1
       ORDER BY ms.is_active DESC, ms.category ASC, ms.name ASC`,
      [tenantId]
    );
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get medical services error:', err.message);
    return res.status(500).json({ error: 'Échec de récupération des prestations' });
  }
};

// 2b. Update Medical Service
const updateMedicalService = async (req, res) => {
  const tenantId = req.user.tenant_id;
  const { id } = req.params;
  const { code, name, category, duration_minutes, price, deposit_amount, description, practitioner_id, is_active } = req.body;

  if (!code || !name || price === undefined || price === null) {
    return res.status(400).json({ error: 'Champs requis manquants: code, nom, tarif' });
  }

  try {
    const result = await req.dbClient.query(
      `UPDATE medical_services
       SET code = $1,
           name = $2,
           category = $3,
           duration_minutes = $4,
           price = $5,
           deposit_amount = $6,
           description = $7,
           practitioner_id = $8,
           is_active = $9
       WHERE id = $10 AND tenant_id = $11
       RETURNING *`,
      [
        code.trim().toUpperCase(),
        name.trim(),
        (category || 'CONSULTATION').trim().toUpperCase(),
        parseInt(duration_minutes, 10) || 30,
        parseFloat(price) || 0,
        parseFloat(deposit_amount || 0),
        description ? description.trim() : null,
        practitioner_id || null,
        is_active !== undefined ? is_active : true,
        id,
        tenantId
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Prestation introuvable' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Update medical service error:', err.message);
    return res.status(500).json({ error: 'Échec de modification de la prestation: ' + err.message });
  }
};

// 2c. Delete Medical Service
const deleteMedicalService = async (req, res) => {
  const tenantId = req.user.tenant_id;
  const { id } = req.params;

  try {
    const linkedAppointments = await req.dbClient.query(
      `SELECT 1 FROM appointments WHERE medical_service_id = $1 LIMIT 1`,
      [id]
    );
    const linkedInvoiceLines = await req.dbClient.query(
      `SELECT 1 FROM invoice_lines WHERE service_id = $1 LIMIT 1`,
      [id]
    );

    if (linkedAppointments.rowCount > 0 || linkedInvoiceLines.rowCount > 0) {
      await req.dbClient.query(
        `UPDATE medical_services SET is_active = false WHERE id = $1 AND tenant_id = $2`,
        [id, tenantId]
      );
      return res.status(200).json({ message: 'Prestation désactivée (car déjà utilisée dans des factures ou RDV)' });
    }

    await req.dbClient.query(
      `DELETE FROM medical_services WHERE id = $1 AND tenant_id = $2`,
      [id, tenantId]
    );
    return res.status(200).json({ message: 'Prestation supprimée avec succès' });
  } catch (err) {
    console.error('Delete medical service error:', err.message);
    return res.status(500).json({ error: 'Échec de suppression de la prestation: ' + err.message });
  }
};

// 3. Create Appointment (Booking)
const createAppointment = async (req, res) => {
  const { practitioner_id, patient_id, medical_service_id, start_time, booking_channel } = req.body;

  if (!practitioner_id || !patient_id || !medical_service_id || !start_time) {
    return res.status(400).json({ error: 'Required fields missing: practitioner_id, patient_id, medical_service_id, start_time' });
  }

  const tenantId = req.user.tenant_id;

  try {
    // A. Fetch service duration to calculate end time
    const serviceRes = await req.dbClient.query(
      `SELECT duration_minutes, deposit_amount FROM medical_services WHERE id = $1`,
      [medical_service_id]
    );

    if (serviceRes.rowCount === 0) {
      return res.status(404).json({ error: 'Medical service not found' });
    }

    const { duration_minutes, deposit_amount } = serviceRes.rows[0];

    const startDate = new Date(start_time);
    const endDate = new Date(startDate.getTime() + duration_minutes * 60 * 1000);

    const startISO = startDate.toISOString();
    const endISO = endDate.toISOString();

    // B. Determine initial status based on whether a deposit is required
    const status = parseFloat(deposit_amount) > 0 ? 'PENDING_PAYMENT' : 'CONFIRMED';

    // C. Insert using PostgreSQL tstzrange function
    // Exclusive upper bound (Default) avoids overlap on the exact millisecond border
    const result = await req.dbClient.query(
      `INSERT INTO appointments (tenant_id, practitioner_id, patient_id, medical_service_id, time_slot, status, booking_channel)
       VALUES ($1, $2, $3, $4, tstzrange($5, $6, '[)'), $7, $8)
       RETURNING *, lower(time_slot) AS start_time, upper(time_slot) AS end_time`,
      [
        tenantId,
        practitioner_id,
        patient_id,
        medical_service_id,
        startISO,
        endISO,
        status,
        booking_channel || 'DESK'
      ]
    );

    const appointment = result.rows[0];
    await logAudit(req, 'CREATE_APPOINTMENT', 'appointments', appointment.id);

    return res.status(201).json(appointment);

  } catch (err) {
    console.error('Create appointment error:', err.message);
    // 23P01 is the PostgreSQL error code for exclusion_violation
    if (err.code === '23P01') {
      return res.status(409).json({
        error: 'Double-booking conflict: This practitioner is already booked during this time slot'
      });
    }
    return res.status(500).json({ error: 'Failed to schedule appointment' });
  }
};

// 4. Get Appointments (with start/end times extracted from time_slot range)
const getAppointments = async (req, res) => {
  const { practitioner_id, start_date, end_date } = req.query;

  let queryStr = `
    SELECT a.id, a.practitioner_id, a.patient_id, a.medical_service_id, a.status, a.booking_channel, a.created_at,
           lower(a.time_slot) AS start_time, upper(a.time_slot) AS end_time,
           p.first_name AS patient_first, p.last_name AS patient_last, p.patient_code,
           prac.first_name AS doc_first, prac.last_name AS doc_last,
           ms.name AS service_name, ms.price, ms.deposit_amount
    FROM appointments a
    JOIN patients p ON a.patient_id = p.id
    JOIN practitioners prac ON a.practitioner_id = prac.id
    JOIN medical_services ms ON a.medical_service_id = ms.id
    WHERE a.status != 'CANCELED'
  `;
  const params = [];

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (practitioner_id && uuidRegex.test(practitioner_id)) {
    params.push(practitioner_id);
    queryStr += ` AND a.practitioner_id = $${params.length}`;
  }

  if (start_date && end_date) {
    params.push(start_date);
    params.push(end_date);
    queryStr += ` AND a.time_slot && tstzrange($${params.length - 1}, $${params.length})`;
  }

  queryStr += ` ORDER BY start_time ASC`;

  try {
    const result = await req.dbClient.query(queryStr, params);
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get appointments error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve appointments' });
  }
};

// 5. Get Practitioners (Doctors catalog)
const getPractitioners = async (req, res) => {
  try {
    const result = await req.dbClient.query(
      `SELECT * FROM practitioners WHERE is_active = true ORDER BY first_name ASC`
    );
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get practitioners error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve practitioners' });
  }
};

module.exports = {
  createMedicalService,
  getMedicalServices,
  updateMedicalService,
  deleteMedicalService,
  createAppointment,
  getAppointments,
  getPractitioners
};
