const crypto = require('crypto');
const { logAudit } = require('../middleware/audit');
const pool = require('../config/db');

const HMAC_SECRET = process.env.HMAC_SECRET || 'clinicos-hmac-prescription-security-key-2026';

// Helper to automatically register any prescribed medication into stock_items if not already present
const autoRegisterPrescriptionMedications = async (dbClient, tenantId, practitionerId, items) => {
  if (!items || !Array.isArray(items) || items.length === 0 || !tenantId) return;

  try {
    // 1. Determine practitioner specialty code
    let targetSpec = 'GENERAL';
    if (practitionerId) {
      const pracSpecRes = await dbClient.query(
        `SELECT ps.code, pr.specialty_name 
         FROM practitioners pr
         LEFT JOIN practitioner_specialties ps ON ps.practitioner_id = pr.id
         WHERE pr.id = $1 LIMIT 1`,
        [practitionerId]
      );
      if (pracSpecRes.rowCount > 0 && pracSpecRes.rows[0].code) {
        targetSpec = pracSpecRes.rows[0].code;
      }
    }

    for (const item of items) {
      const drugName = (item.drug_name || '').trim();
      if (!drugName) continue;

      // Check if item exists in stock_items for this tenant
      const existing = await dbClient.query(
        `SELECT id, default_dosage FROM stock_items WHERE tenant_id = $1 AND LOWER(TRIM(name)) = LOWER($2)`,
        [tenantId, drugName]
      );

      if (existing.rowCount === 0) {
        // Generate a clean SKU
        const baseSku = drugName
          .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-zA-Z0-9]/g, "-")
          .toUpperCase()
          .replace(/-+/g, "-")
          .substring(0, 20);
        const randomSuffix = crypto.randomBytes(2).toString('hex').toUpperCase();
        const sku = `${baseSku || 'MED'}-${randomSuffix}`;

        const defaultDosage = (item.dosage || '').trim() || null;

        await dbClient.query(
          `INSERT INTO stock_items (tenant_id, sku, name, category, target_specialty, default_dosage, unit, minimum_threshold_alert, unit_cost_price, selling_price, current_stock_quantity, is_active)
           VALUES ($1, $2, $3, 'MEDICATION', $4, $5, 'BOITE', 10, 1000, 2000, 0, true)
           ON CONFLICT DO NOTHING`,
          [tenantId, sku, drugName, targetSpec, defaultDosage]
        );
      } else if (!existing.rows[0].default_dosage && item.dosage) {
        // Enrich default dosage if it was empty
        await dbClient.query(
          `UPDATE stock_items SET default_dosage = $1 WHERE id = $2`,
          [item.dosage.trim(), existing.rows[0].id]
        );
      }
    }
  } catch (err) {
    console.error('Error auto-registering prescribed medication in stock:', err.message);
  }
};

// Helper to generate a patient code: SM-4Digits (e.g., SM-4821)
const generatePatientCode = async (dbClient, tenantId) => {
  if (dbClient && tenantId) {
    for (let i = 0; i < 10; i++) {
      const rand = Math.floor(1000 + Math.random() * 9000);
      const candidate = `SM-${rand}`;
      const check = await dbClient.query(
        `SELECT 1 FROM patients WHERE tenant_id = $1 AND patient_code = $2 LIMIT 1`,
        [tenantId, candidate]
      );
      if (check.rowCount === 0) {
        return candidate;
      }
    }
  }
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `SM-${rand}`;
};

// 1b. Verify Patient Code & Cross-Check Identity (First name & Last name)
const verifyPatientCode = async (req, res) => {
  const { patient_code, first_name, last_name } = req.method === 'POST' ? req.body : req.query;
  const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;

  if (!patient_code) {
    return res.status(400).json({ error: 'Code patient requis' });
  }

  try {
    const result = await req.dbClient.query(
      `SELECT id, patient_code, first_name, last_name, phone_number, gender, date_of_birth, status
       FROM patients
       WHERE tenant_id = $1 AND UPPER(TRIM(patient_code)) = UPPER(TRIM($2))
       LIMIT 1`,
      [tenantId, patient_code.trim()]
    );

    if (result.rowCount === 0) {
      return res.status(200).json({
        exists: false,
        verified: false,
        requires_deposit: true,
        deposit_amount: 2000,
        message: `Code patient "${patient_code}" non trouvé. Versement d'un acompte de 2 000 FCFA requis pour les nouvelles demandes.`
      });
    }

    const patient = result.rows[0];

    // Helper for normalized string comparison
    const cleanStr = (s) => (s || '').trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // If first_name and/or last_name are provided, verify cross-match
    if (first_name || last_name) {
      const pFirst = cleanStr(patient.first_name);
      const pLast = cleanStr(patient.last_name);
      const inputFirst = cleanStr(first_name);
      const inputLast = cleanStr(last_name);

      const matchFirst = !first_name || pFirst.includes(inputFirst) || inputFirst.includes(pFirst);
      const matchLast = !last_name || pLast.includes(inputLast) || inputLast.includes(pLast);

      if (matchFirst && matchLast) {
        return res.status(200).json({
          exists: true,
          verified: true,
          requires_deposit: false,
          deposit_amount: 0,
          patient: {
            id: patient.id,
            patient_code: patient.patient_code,
            first_name: patient.first_name,
            last_name: patient.last_name,
            phone_number: patient.phone_number,
            gender: patient.gender,
            date_of_birth: patient.date_of_birth
          },
          message: `Identité vérifiée : ${patient.first_name} ${patient.last_name} (${patient.patient_code}). Réservation directe sans acompte.`
        });
      } else {
        return res.status(200).json({
          exists: true,
          verified: false,
          identity_mismatch: true,
          requires_deposit: true,
          deposit_amount: 2000,
          error: `Le nom ou prénom renseigné ne correspond pas au titulaire enregistré pour le code ${patient.patient_code}.`
        });
      }
    }

    // Only code provided
    return res.status(200).json({
      exists: true,
      verified: false,
      requires_confirmation: true,
      patient_code: patient.patient_code,
      message: 'Code patient valide. Veuillez confirmer le prénom et le nom pour valider.'
    });

  } catch (err) {
    console.error('Verify patient code error:', err.message);
    return res.status(500).json({ error: 'Échec de vérification du code patient: ' + err.message });
  }
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
    status_id,
    attending_practitioner_id
  } = req.body;

  if (!phone_number || !first_name || !last_name || !gender || !date_of_birth) {
    return res.status(400).json({ error: 'Required fields missing: phone_number, first_name, last_name, gender, date_of_birth' });
  }

  const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;
  const patientCode = await generatePatientCode(req.dbClient, tenantId);

  // Default attending doctor to first available practitioner if not provided
  let doctorId = attending_practitioner_id;
  if (!doctorId) {
    const docRes = await req.dbClient.query(
      `SELECT id FROM practitioners WHERE tenant_id = $1 AND is_active = true ORDER BY id ASC LIMIT 1`,
      [tenantId]
    );
    if (docRes.rowCount > 0) doctorId = docRes.rows[0].id;
  }

  // Normalize array fields for PostgreSQL TEXT[]
  const parsedAllergies = Array.isArray(allergies) 
    ? allergies 
    : (allergies && typeof allergies === 'string' ? allergies.split(',').map(s => s.trim()).filter(Boolean) : null);

  const parsedConditions = Array.isArray(chronic_conditions) 
    ? chronic_conditions 
    : (chronic_conditions && typeof chronic_conditions === 'string' ? chronic_conditions.split(',').map(s => s.trim()).filter(Boolean) : null);

  const parsedHeight = height_cm ? parseFloat(String(height_cm).replace(',', '.')) : null;
  const parsedWeight = weight_kg ? parseFloat(String(weight_kg).replace(',', '.')) : null;
  const cleanStatusId = status_id && status_id !== 'null' && status_id !== 'undefined' ? status_id : null;
  const cleanDocId = doctorId && doctorId !== 'null' && doctorId !== 'undefined' ? doctorId : null;

  try {
    const result = await req.dbClient.query(
      `INSERT INTO patients (
        tenant_id, patient_code, phone_number, first_name, last_name, gender, date_of_birth, 
        blood_group, height_cm, weight_kg, observations, status_id, allergies, chronic_conditions, 
        address, trusted_payer_phone, status, attending_practitioner_id
      )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
       RETURNING *`,
      [
        tenantId,
        patientCode,
        phone_number.trim(),
        first_name.trim(),
        last_name.trim(),
        gender,
        date_of_birth,
        blood_group ? blood_group.trim() : null,
        isNaN(parsedHeight) ? null : parsedHeight,
        isNaN(parsedWeight) ? null : parsedWeight,
        observations ? observations.trim() : null,
        cleanStatusId,
        parsedAllergies,
        parsedConditions,
        address ? address.trim() : null,
        trusted_payer_phone ? trusted_payer_phone.trim() : null,
        status || 'Externe',
        cleanDocId
      ]
    );

    const patient = result.rows[0];

    // Create medical record entry
    await req.dbClient.query(
      `INSERT INTO medical_records (tenant_id, patient_id, summary_notes) VALUES ($1, $2, '')`,
      [tenantId, patient.id]
    );

    // Create primary insurance policy if provided
    const insurance_company_id = req.body.insurance_company_id;
    const policy_number = req.body.policy_number;
    const coverage_rate_percent = req.body.coverage_rate_percent;

    if (insurance_company_id && insurance_company_id !== 'null' && insurance_company_id !== '') {
      await req.dbClient.query(
        `INSERT INTO patient_insurance_policies (
          tenant_id, patient_id, insurance_company_id, policy_number, coverage_rate_percent, is_primary
        ) VALUES ($1, $2, $3, $4, $5, true)`,
        [
          tenantId,
          patient.id,
          insurance_company_id,
          policy_number ? policy_number.trim() : 'MAT-0000',
          coverage_rate_percent ? parseFloat(String(coverage_rate_percent).replace(',', '.')) : 80
        ]
      );
    }

    await logAudit(req, 'CREATE_PATIENT', 'patients', patient.id);

    return res.status(201).json(patient);
  } catch (err) {
    console.error('Register patient error:', err);
    if (err.message && err.message.includes('unique_tenant_phone')) {
      return res.status(409).json({ error: 'Un patient avec ce numéro de téléphone est déjà enregistré dans votre clinique.' });
    }
    if (err.message && err.message.includes('unique_tenant_patient_code')) {
      return res.status(409).json({ error: 'Un patient avec ce code existe déjà. Veuillez réessayer.' });
    }
    return res.status(500).json({ error: 'Échec de l\'enregistrement du patient : ' + err.message });
  }
};

// 2. Get Patients (isolated by RLS with joined Status, Attending Doctor and Primary Insurance Policy)
const getPatients = async (req, res) => {
  const { status, search, status_id } = req.query;
  let tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id;
  if (!tenantId) {
    const t = await req.dbClient.query('SELECT id FROM tenants WHERE is_active = true ORDER BY name ASC LIMIT 1');
    if (t.rows.length > 0) tenantId = t.rows[0].id;
  }

  let queryStr = `
    SELECT p.*, 
           ps.name AS status_name, ps.color_code AS status_color, ps.code AS status_code,
           pip.insurance_company_id, pip.policy_number, pip.coverage_rate_percent,
           ic.name AS insurance_name, ic.code AS insurance_code,
           doc.first_name AS doc_first, doc.last_name AS doc_last, doc.title AS doc_title,
           doc.specialty_name AS doc_specialty
    FROM patients p
    LEFT JOIN patient_statuses ps ON p.status_id = ps.id
    LEFT JOIN patient_insurance_policies pip ON p.id = pip.patient_id AND pip.is_primary = true
    LEFT JOIN insurance_companies ic ON pip.insurance_company_id = ic.id
    LEFT JOIN practitioners doc ON p.attending_practitioner_id = doc.id
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
  const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;
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
    status_id, 
    status, 
    address, 
    allergies, 
    chronic_conditions, 
    attending_practitioner_id,
    email
  } = req.body;

  const parsedAllergies = Array.isArray(allergies) 
    ? allergies 
    : (allergies && typeof allergies === 'string' ? allergies.split(',').map(s => s.trim()).filter(Boolean) : []);

  const parsedHeight = height_cm !== undefined && height_cm !== null && height_cm !== '' 
    ? parseFloat(String(height_cm).replace(',', '.')) 
    : null;
  const parsedWeight = weight_kg !== undefined && weight_kg !== null && weight_kg !== '' 
    ? parseFloat(String(weight_kg).replace(',', '.')) 
    : null;

  const cleanDocId = attending_practitioner_id && attending_practitioner_id !== 'null' && attending_practitioner_id !== 'undefined' && attending_practitioner_id !== '' 
    ? attending_practitioner_id 
    : null;
  const cleanStatusId = status_id && status_id !== 'null' && status_id !== 'undefined' && status_id !== '' 
    ? status_id 
    : null;

  try {
    const result = await req.dbClient.query(
      `UPDATE patients
       SET phone_number = COALESCE(NULLIF($1, ''), phone_number),
           first_name = COALESCE(NULLIF($2, ''), first_name),
           last_name = COALESCE(NULLIF($3, ''), last_name),
           gender = COALESCE(NULLIF($4, ''), gender),
           date_of_birth = COALESCE(NULLIF($5, '')::date, date_of_birth),
           blood_group = $6,
           height_cm = $7,
           weight_kg = $8,
           observations = $9,
           status_id = $10,
           status = COALESCE($11, status),
           address = $12,
           allergies = $13,
           attending_practitioner_id = $14
       WHERE id = $15 AND tenant_id = $16
       RETURNING *`,
      [
        phone_number ? phone_number.trim() : null,
        first_name ? first_name.trim() : null,
        last_name ? last_name.trim() : null,
        gender || null,
        date_of_birth || null,
        blood_group ? blood_group.trim() : null,
        isNaN(parsedHeight) ? null : parsedHeight,
        isNaN(parsedWeight) ? null : parsedWeight,
        observations !== undefined ? observations : null,
        cleanStatusId,
        status || null,
        address !== undefined ? address : null,
        parsedAllergies,
        cleanDocId,
        id,
        tenantId
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Patient non trouvé' });
    }

    // Sync primary IPM Insurance Policy
    const insurance_company_id = req.body.insurance_company_id;
    const policy_number = req.body.policy_number;
    const coverage_rate_percent = req.body.coverage_rate_percent;

    if (insurance_company_id !== undefined) {
      await req.dbClient.query(
        `DELETE FROM patient_insurance_policies WHERE patient_id = $1 AND tenant_id = $2`,
        [id, tenantId]
      );
      if (insurance_company_id && insurance_company_id !== 'null' && insurance_company_id !== '') {
        await req.dbClient.query(
          `INSERT INTO patient_insurance_policies (
            tenant_id, patient_id, insurance_company_id, policy_number, coverage_rate_percent, is_primary
          ) VALUES ($1, $2, $3, $4, $5, true)`,
          [
            tenantId,
            id,
            insurance_company_id,
            policy_number ? policy_number.trim() : 'MAT-0000',
            coverage_rate_percent ? parseFloat(String(coverage_rate_percent).replace(',', '.')) : 80
          ]
        );
      }
    }

    await logAudit(req, 'UPDATE_PATIENT', 'patients', id);

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Update patient error:', err.message);
    if (err.message && err.message.includes('unique_tenant_phone')) {
      return res.status(409).json({ error: 'Un autre patient avec ce numéro de téléphone existe déjà.' });
    }
    return res.status(500).json({ error: 'Échec de la modification du patient : ' + err.message });
  }
};

// 3. Create Consultation Note & Prescription
const createConsultation = async (req, res) => {
  const { patient_id, practitioner_id, reason_for_visit, vital_signs, clinical_examination, icd10_diagnosis_codes, diagnosis_text, confidential_notes, prescription } = req.body;

  if (!patient_id || !practitioner_id || !reason_for_visit || !diagnosis_text) {
    return res.status(400).json({ error: 'Required fields missing: patient_id, practitioner_id, reason_for_visit, diagnosis_text' });
  }

  const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;

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

      // Automatically register any newly prescribed medication into stock_items
      await autoRegisterPrescriptionMedications(req.dbClient, tenantId, practitioner_id, prescription.items);
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

// 5. Update Consultation Note & Prescription
const updateConsultation = async (req, res) => {
  const { id } = req.params;
  const { reason_for_visit, vital_signs, clinical_examination, icd10_diagnosis_codes, diagnosis_text, confidential_notes, prescription } = req.body;

  try {
    const existing = await req.dbClient.query(`SELECT * FROM consultation_notes WHERE id = $1`, [id]);
    if (existing.rowCount === 0) {
      return res.status(404).json({ error: 'Consultation note not found' });
    }

    const consultRes = await req.dbClient.query(
      `UPDATE consultation_notes
       SET reason_for_visit = COALESCE($1, reason_for_visit),
           vital_signs = COALESCE($2, vital_signs),
           clinical_examination = COALESCE($3, clinical_examination),
           icd10_diagnosis_codes = COALESCE($4, icd10_diagnosis_codes),
           diagnosis_text = COALESCE($5, diagnosis_text),
           confidential_notes = COALESCE($6, confidential_notes)
       WHERE id = $7
       RETURNING *`,
      [
        reason_for_visit,
        vital_signs ? JSON.stringify(vital_signs) : null,
        clinical_examination,
        icd10_diagnosis_codes,
        diagnosis_text,
        confidential_notes,
        id
      ]
    );

    const updatedConsultation = consultRes.rows[0];
    let updatedPrescription = null;

    if (prescription && prescription.items) {
      const exRx = await req.dbClient.query(`SELECT * FROM prescriptions WHERE consultation_id = $1`, [id]);
      if (exRx.rowCount > 0) {
        const rxId = exRx.rows[0].id;
        const validUntil = prescription.valid_until || exRx.rows[0].valid_until;
        
        await req.dbClient.query(`UPDATE prescriptions SET valid_until = $1 WHERE id = $2`, [validUntil, rxId]);
        await req.dbClient.query(`DELETE FROM prescription_items WHERE prescription_id = $1`, [rxId]);

        for (const item of prescription.items) {
          await req.dbClient.query(
            `INSERT INTO prescription_items (prescription_id, drug_name, dosage, frequency, duration_days, instructions)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [rxId, item.drug_name, item.dosage, item.frequency, item.duration_days, item.instructions || null]
          );
        }

        const freshRx = await req.dbClient.query(
          `SELECT rx.*, COALESCE((SELECT json_agg(pi.*) FROM prescription_items pi WHERE pi.prescription_id = rx.id), '[]'::json) AS items
           FROM prescriptions rx WHERE rx.id = $1`,
          [rxId]
        );
        updatedPrescription = freshRx.rows[0];
      } else if (prescription.items.length > 0) {
        const prescriptionId = crypto.randomUUID();
        const prescriptionCode = `RX-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
        const patientRes = await req.dbClient.query(`SELECT patient_code FROM patients WHERE id = $1`, [updatedConsultation.patient_id]);
        const practitionerRes = await req.dbClient.query(`SELECT license_number FROM practitioners WHERE id = $1`, [updatedConsultation.practitioner_id]);

        const patientCode = patientRes.rows[0]?.patient_code || 'SM-0000';
        const licenseNumber = practitionerRes.rows[0]?.license_number || 'NOLICENSE';
        const validUntil = prescription.valid_until || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        const hashData = `${prescriptionId}|${patientCode}|${licenseNumber}|${validUntil}`;
        const qrHash = crypto.createHmac('sha256', HMAC_SECRET).update(hashData).digest('hex');

        const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;
        const prescrRes = await req.dbClient.query(
          `INSERT INTO prescriptions (id, tenant_id, consultation_id, patient_id, practitioner_id, prescription_code, qr_cryptographic_hash, valid_until)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           RETURNING *`,
          [prescriptionId, tenantId, id, updatedConsultation.patient_id, updatedConsultation.practitioner_id, prescriptionCode, qrHash, validUntil]
        );
        updatedPrescription = prescrRes.rows[0];
        updatedPrescription.items = [];

        for (const item of prescription.items) {
          const itemRes = await req.dbClient.query(
            `INSERT INTO prescription_items (prescription_id, drug_name, dosage, frequency, duration_days, instructions)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [prescriptionId, item.drug_name, item.dosage, item.frequency, item.duration_days, item.instructions || null]
          );
          updatedPrescription.items.push(itemRes.rows[0]);
        }
      }

      // Automatically register any newly prescribed medication into stock_items
      const activeTenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;
      await autoRegisterPrescriptionMedications(req.dbClient, activeTenantId, updatedConsultation.practitioner_id, prescription.items);
    }

    await logAudit(req, 'UPDATE_CONSULTATION', 'consultation_notes', id);

    return res.status(200).json({
      consultation: updatedConsultation,
      prescription: updatedPrescription
    });
  } catch (err) {
    console.error('Update consultation error:', err.message);
    return res.status(500).json({ error: 'Failed to update consultation record' });
  }
};

// 6. Delete Consultation Note
const deleteConsultation = async (req, res) => {
  const { id } = req.params;
  try {
    await req.dbClient.query(`DELETE FROM consultation_notes WHERE id = $1`, [id]);
    await logAudit(req, 'DELETE_CONSULTATION', 'consultation_notes', id);
    return res.status(200).json({ message: 'Consultation supprimée avec succès' });
  } catch (err) {
    console.error('Delete consultation error:', err.message);
    return res.status(500).json({ error: 'Failed to delete consultation record' });
  }
};

// 7. Get Full Prescription Details for Print / Inspection
const getPrescriptionDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const prescrRes = await req.dbClient.query(
      `SELECT rx.*, 
              p.first_name AS patient_first, p.last_name AS patient_last, p.patient_code, p.date_of_birth, p.gender, p.blood_group, p.phone_number AS patient_phone,
              pr.first_name AS doc_first, pr.last_name AS doc_last, pr.title AS doc_title, pr.grade AS doc_grade, pr.license_number, pr.specialty_name AS doc_specialty,
              cn.reason_for_visit, cn.diagnosis_text, cn.icd10_diagnosis_codes,
              t.name AS clinic_name, t.address AS clinic_address, t.phone_number AS clinic_phone, t.email AS clinic_email, t.ninea_rc, t.logo_url AS clinic_logo, t.stamp_url AS clinic_stamp,
              COALESCE((SELECT json_agg(pi.*) FROM prescription_items pi WHERE pi.prescription_id = rx.id), '[]'::json) AS items
       FROM prescriptions rx
       JOIN patients p ON rx.patient_id = p.id
       LEFT JOIN practitioners pr ON rx.practitioner_id = pr.id
       LEFT JOIN consultation_notes cn ON rx.consultation_id = cn.id
       JOIN tenants t ON rx.tenant_id = t.id
       WHERE rx.id = $1`,
      [id]
    );

    if (prescrRes.rowCount === 0) {
      return res.status(404).json({ error: 'Ordonnance introuvable' });
    }

    return res.status(200).json(prescrRes.rows[0]);
  } catch (err) {
    console.error('Get prescription details error:', err.message);
    return res.status(500).json({ error: 'Failed to get prescription details' });
  }
};

module.exports = {
  registerPatient,
  verifyPatientCode,
  generatePatientCode,
  getPatients,
  updatePatient,
  createConsultation,
  updateConsultation,
  deleteConsultation,
  getPrescriptionDetails,
  verifyPrescription
};
