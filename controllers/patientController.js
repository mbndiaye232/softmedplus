const crypto = require('crypto');
const { logAudit } = require('../middleware/audit');
const pool = require('../config/db');

const HMAC_SECRET = process.env.HMAC_SECRET || 'clinicos-hmac-prescription-security-key-2026';

// Helper to generate a patient code: PAT-YYYY-5RandomDigits
const generatePatientCode = () => {
  const year = new Date().getFullYear();
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `PAT-${year}-${rand}`;
};

// 1. Register Patient
const registerPatient = async (req, res) => {
  const { 
    phone_number, 
    first_name, 
    last_name, 
    gender, 
    date_of_birth, 
    blood_group, 
    height_cm,
    weight_kg,
    observations,
    allergies, 
    chronic_conditions, 
    address, 
    trusted_payer_phone, 
    status,
    status_id
  } = req.body;

  if (!phone_number || !first_name || !last_name || !gender || !date_of_birth) {
    return res.status(400).json({ error: 'Required fields missing: phone_number, first_name, last_name, gender, date_of_birth' });
  }

  const tenantId = req.user.tenant_id;
  const patientCode = generatePatientCode();

  // Normalize array fields for PostgreSQL TEXT[]
  const parsedAllergies = Array.isArray(allergies) 
    ? allergies 
    : (allergies && typeof allergies === 'string' ? allergies.split(',').map(s => s.trim()).filter(Boolean) : null);

  const parsedConditions = Array.isArray(chronic_conditions) 
    ? chronic_conditions 
    : (chronic_conditions && typeof chronic_conditions === 'string' ? chronic_conditions.split(',').map(s => s.trim()).filter(Boolean) : null);

  try {
    const result = await req.dbClient.query(
      `INSERT INTO patients (
        tenant_id, patient_code, phone_number, first_name, last_name, gender, date_of_birth, 
        blood_group, height_cm, weight_kg, observations, status_id, allergies, chronic_conditions, 
        address, trusted_payer_phone, status
      )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
       RETURNING *`,
      [
        tenantId,
        patientCode,
        phone_number,
        first_name,
        last_name,
        gender,
        date_of_birth,
        blood_group || null,
        height_cm ? parseFloat(height_cm) : null,
        weight_kg ? parseFloat(weight_kg) : null,
        observations || null,
        status_id || null,
        parsedAllergies,
        parsedConditions,
        address || null,
        trusted_payer_phone || null,
        status || 'Externe'
      ]
    );

    const patient = result.rows[0];

    // Create medical record entry
    await req.dbClient.query(
      `INSERT INTO medical_records (tenant_id, patient_id, summary_notes) VALUES ($1, $2, '')`,
      [tenantId, patient.id]
    );

    await logAudit(req, 'CREATE_PATIENT', 'patients', patient.id);

    return res.status(201).json(patient);
  } catch (err) {
    console.error('Register patient error:', err.message);
    if (err.message.includes('unique_tenant_phone')) {
      return res.status(409).json({ error: 'A patient with this phone number is already registered' });
    }
    return res.status(500).json({ error: 'Failed to register patient' });
  }
};

// 2. Get Patients (isolated by RLS with joined Status and Primary Insurance Policy)
const getPatients = async (req, res) => {
  const { status, search, status_id } = req.query;
  const tenantId = req.user.tenant_id;

  let queryStr = `
    SELECT p.*, 
           ps.name AS status_name, ps.color_code AS status_color, ps.code AS status_code,
           pip.insurance_company_id, pip.policy_number, pip.coverage_rate_percent,
           ic.name AS insurance_name, ic.code AS insurance_code
    FROM patients p
    LEFT JOIN patient_statuses ps ON p.status_id = ps.id
    LEFT JOIN patient_insurance_policies pip ON p.id = pip.patient_id AND pip.is_primary = true
    LEFT JOIN insurance_companies ic ON pip.insurance_company_id = ic.id
    WHERE p.tenant_id = $1
  `;
  const params = [tenantId];

  if (status_id) {
    params.push(status_id);
    queryStr += ` AND p.status_id = $${params.length}`;
  } else if (status) {
    params.push(status);
    queryStr += ` AND (p.status = $${params.length} OR ps.code = $${params.length})`;
  }

  if (search) {
    params.push(`%${search}%`);
    queryStr += ` AND (p.first_name ILIKE $${params.length} OR p.last_name ILIKE $${params.length} OR p.patient_code ILIKE $${params.length} OR p.phone_number ILIKE $${params.length})`;
  }

  queryStr += ` ORDER BY p.created_at DESC`;

  try {
    const result = await req.dbClient.query(queryStr, params);
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get patients error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve patients' });
  }
};

// 2b. Update Patient
const updatePatient = async (req, res) => {
  const { id } = req.params;
  const { phone_number, first_name, last_name, gender, date_of_birth, blood_group, height_cm, weight_kg, observations, status_id, status, address, allergies, chronic_conditions } = req.body;

  const parsedAllergies = Array.isArray(allergies) 
    ? allergies 
    : (allergies && typeof allergies === 'string' ? allergies.split(',').map(s => s.trim()).filter(Boolean) : null);

  try {
    const result = await req.dbClient.query(
      `UPDATE patients
       SET phone_number = COALESCE($1, phone_number),
           first_name = COALESCE($2, first_name),
           last_name = COALESCE($3, last_name),
           gender = COALESCE($4, gender),
           date_of_birth = COALESCE($5, date_of_birth),
           blood_group = COALESCE($6, blood_group),
           height_cm = COALESCE($7, height_cm),
           weight_kg = COALESCE($8, weight_kg),
           observations = COALESCE($9, observations),
           status_id = COALESCE($10, status_id),
           status = COALESCE($11, status),
           address = COALESCE($12, address),
           allergies = COALESCE($13, allergies)
       WHERE id = $14
       RETURNING *`,
      [
        phone_number, first_name, last_name, gender, date_of_birth, blood_group,
        height_cm ? parseFloat(height_cm) : null,
        weight_kg ? parseFloat(weight_kg) : null,
        observations, status_id, status, address, parsedAllergies, id
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Update patient error:', err.message);
    return res.status(500).json({ error: 'Failed to update patient' });
  }
};

// 3. Create Consultation Note & Prescription
const createConsultation = async (req, res) => {
  const { patient_id, practitioner_id, reason_for_visit, vital_signs, clinical_examination, icd10_diagnosis_codes, diagnosis_text, confidential_notes, prescription } = req.body;

  if (!patient_id || !practitioner_id || !reason_for_visit || !diagnosis_text) {
    return res.status(400).json({ error: 'Required fields missing: patient_id, practitioner_id, reason_for_visit, diagnosis_text' });
  }

  const tenantId = req.user.tenant_id;

  try {
    // A. Insert Consultation note
    const consultRes = await req.dbClient.query(
      `INSERT INTO consultation_notes (tenant_id, patient_id, practitioner_id, reason_for_visit, vital_signs, clinical_examination, icd10_diagnosis_codes, diagnosis_text, confidential_notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        tenantId,
        patient_id,
        practitioner_id,
        reason_for_visit,
        JSON.stringify(vital_signs || {}),
        clinical_examination || null,
        icd10_diagnosis_codes || null,
        diagnosis_text,
        confidential_notes || null // in production, encrypt this using doctor keys
      ]
    );

    const consultation = consultRes.rows[0];
    let createdPrescription = null;

    // B. Handle Prescription creation if supplied
    if (prescription && prescription.items && prescription.items.length > 0) {
      const prescriptionId = crypto.randomUUID();
      const prescriptionCode = `RX-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

      // Retrieve patient code and practitioner license for HMAC validation
      const patientRes = await req.dbClient.query(`SELECT patient_code FROM patients WHERE id = $1`, [patient_id]);
      const practitionerRes = await req.dbClient.query(`SELECT license_number FROM practitioners WHERE id = $1`, [practitioner_id]);

      const patientCode = patientRes.rows[0].patient_code;
      const licenseNumber = practitionerRes.rows[0].license_number || 'NOLICENSE';
      const validUntil = prescription.valid_until || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      // Generate Cryptographic HMAC-SHA256 signature
      const hashData = `${prescriptionId}|${patientCode}|${licenseNumber}|${validUntil}`;
      const qrHash = crypto.createHmac('sha256', HMAC_SECRET).update(hashData).digest('hex');

      const prescrRes = await req.dbClient.query(
        `INSERT INTO prescriptions (id, tenant_id, consultation_id, patient_id, practitioner_id, prescription_code, qr_cryptographic_hash, valid_until)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`,
        [
          prescriptionId,
          tenantId,
          consultation.id,
          patient_id,
          practitioner_id,
          prescriptionCode,
          qrHash,
          validUntil
        ]
      );

      createdPrescription = prescrRes.rows[0];
      createdPrescription.items = [];

      // Insert prescription items
      for (const item of prescription.items) {
        const itemRes = await req.dbClient.query(
          `INSERT INTO prescription_items (prescription_id, drug_name, dosage, frequency, duration_days, instructions)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING *`,
          [
            prescriptionId,
            item.drug_name,
            item.dosage,
            item.frequency,
            item.duration_days,
            item.instructions || null
          ]
        );
        createdPrescription.items.push(itemRes.rows[0]);
      }
    }

    await logAudit(req, 'CREATE_CONSULTATION', 'consultation_notes', consultation.id);

    return res.status(201).json({
      consultation,
      prescription: createdPrescription
    });

  } catch (err) {
    console.error('Create consultation error:', err.message);
    return res.status(500).json({ error: 'Failed to create consultation record' });
  }
};

// 4. Public QR Code Verification Endpoint (Bypasses regular tenant context check, using secure bypass config)
const verifyPrescription = async (req, res) => {
  const { code } = req.params;
  const { h: clientHash } = req.query;

  if (!code || !clientHash) {
    return res.status(400).json({ error: 'Prescription code and hash query parameter (h) are required' });
  }

  // Check out a client from the pool to run RLS-bypassed queries
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`SELECT set_config('app.bypass_rls', 'true', true)`);

    // Fetch prescription and relative details
    const prescrRes = await client.query(
      `SELECT p.id, p.tenant_id, p.valid_until, p.is_dispensed, p.qr_cryptographic_hash,
              pat.first_name AS patient_first, pat.last_name AS patient_last, pat.patient_code,
              prac.first_name AS doc_first, prac.last_name AS doc_last, prac.license_number,
              t.name AS tenant_name
       FROM prescriptions p
       JOIN patients pat ON p.patient_id = pat.id
       JOIN practitioners prac ON p.practitioner_id = prac.id
       JOIN tenants t ON p.tenant_id = t.id
       WHERE p.prescription_code = $1`,
      [code]
    );

    if (prescrRes.rowCount === 0) {
      return res.status(404).json({ error: 'Prescription not found' });
    }

    const prescr = prescrRes.rows[0];

    // Compute expected HMAC locally
    const licenseNumber = prescr.license_number || 'NOLICENSE';
    const validUntilDate = new Date(prescr.valid_until).toISOString().split('T')[0];
    const hashData = `${prescr.id}|${prescr.patient_code}|${licenseNumber}|${validUntilDate}`;
    const expectedHash = crypto.createHmac('sha256', HMAC_SECRET).update(hashData).digest('hex');

    // Secure comparison (against timing attacks)
    const clientHashBuf = Buffer.from(clientHash, 'utf-8');
    const expectedHashBuf = Buffer.from(expectedHash, 'utf-8');

    if (clientHashBuf.length !== expectedHashBuf.length || !crypto.timingSafeEqual(clientHashBuf, expectedHashBuf)) {
      return res.status(403).json({ error: 'Forbidden - Invalid Prescription Signature (Tampered QR Code)' });
    }

    // Verify validity date
    const today = new Date().toISOString().split('T')[0];
    const isExpired = today > validUntilDate;

    // Fetch items
    const itemsRes = await client.query(
      `SELECT drug_name, dosage, frequency, duration_days, instructions FROM prescription_items WHERE prescription_id = $1`,
      [prescr.id]
    );

    return res.status(200).json({
      valid: !isExpired,
      expired: isExpired,
      dispensed: prescr.is_dispensed,
      prescription_code: code,
      clinic_name: prescr.tenant_name,
      patient: `${prescr.patient_first} ${prescr.patient_last}`,
      doctor: `Dr. ${prescr.doc_first} ${prescr.doc_last}`,
      license_number: licenseNumber,
      valid_until: validUntilDate,
      items: itemsRes.rows
    });

  } catch (err) {
    console.error('Prescription verification error:', err.message);
    return res.status(500).json({ error: 'Failed to verify prescription signature' });
  } finally {
    client.release();
  }
};

module.exports = {
  registerPatient,
  getPatients,
  updatePatient,
  createConsultation,
  verifyPrescription
};
