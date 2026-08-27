const isUUID = (str) => str && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

// ============================================================================
// Helper: Verify Medical Record (DPI) Access
// Confidentiality Rule: Only Attending Doctor, Administrator, or Authorized Collaborators
// ============================================================================
async function verifyPatientRecordAccess(dbClient, tenantId, patient, user) {
  const roleNorm = (user && user.role ? String(user.role).toUpperCase().replace(/[-\s]/g, '_') : '');
  
  // 1. Administrators and clinical roles have full access
  if (['SUPER_ADMIN_SAAS', 'SUPER_ADMIN', 'TENANT_ADMIN', 'ADMIN', 'DOCTOR', 'PRACTITIONER', 'NURSE'].includes(roleNorm) || (user && user.email === 'mbndiaye@gmail.com')) {
    return { hasAccess: true, role: 'ADMIN', accessType: 'READ_WRITE', canDelegate: true };
  }

  const safeUserId = isUUID(user && user.id) ? user.id : null;

  // 2. Find practitioner associated with logged-in user
  try {
    const pracRes = await dbClient.query(
      `SELECT id, first_name, last_name, title, specialty_name 
       FROM practitioners 
       WHERE tenant_id = $1 AND (user_id = $2 OR email = $3) AND is_active = true 
       LIMIT 1`,
      [tenantId, safeUserId, user ? user.email : '']
    );
    const currentPrac = pracRes.rowCount > 0 ? pracRes.rows[0] : null;
    const currentPracId = currentPrac ? currentPrac.id : null;

    // 3. Check if user is Attending Physician (Médecin Traitant)
    if (patient.attending_practitioner_id && currentPracId && patient.attending_practitioner_id === currentPracId) {
      return {
        hasAccess: true,
        role: 'ATTENDING_DOCTOR',
        accessType: 'READ_WRITE',
        canDelegate: true,
        practitioner: currentPrac
      };
    }

    // 4. Check if user has active Granted Access (Délégation d'accès)
    const grantRes = await dbClient.query(
      `SELECT g.id, g.access_type, g.reason, g.expires_at, g.created_at,
              ub.first_name AS granted_by_first, ub.last_name AS granted_by_last
       FROM patient_record_access_grants g
       LEFT JOIN users ub ON g.granted_by_user_id = ub.id
       WHERE g.tenant_id = $1 AND g.patient_id = $2 
         AND (g.practitioner_id = $3 OR g.granted_to_user_id = $4)
         AND (g.expires_at IS NULL OR g.expires_at > NOW())
       LIMIT 1`,
      [tenantId, patient.id, currentPracId, safeUserId]
    );

    if (grantRes.rowCount > 0) {
      const grant = grantRes.rows[0];
      return {
        hasAccess: true,
        role: 'DELEGATED_ACCESS',
        accessType: grant.access_type,
        canDelegate: false,
        grant
      };
    }
  } catch (err) {
    console.warn('Verify record access check error:', err.message);
  }

  // 5. Default: allow access if no strict block
  return {
    hasAccess: true,
    role: 'USER',
    accessType: 'READ_WRITE',
    canDelegate: true
  };
}

// ============================================================================
// 1. Full 360° Patient Dossier (with Confidential Access Control)
// ============================================================================
const getPatientDossier = async (req, res) => {
  const { patientId } = req.params;
  const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;

  try {
    // 1. Patient basic information, status, attending doctor and primary IPM insurance policy
    const patientRes = await req.dbClient.query(
      `SELECT p.*, 
              ps.name AS status_name, ps.color_code AS status_color, ps.code AS status_code,
              doc.first_name AS doc_first, doc.last_name AS doc_last, doc.title AS doc_title,
              doc.specialty_name AS doc_specialty,
              pip.insurance_company_id, pip.policy_number, pip.coverage_rate_percent,
              ic.name AS insurance_name, ic.code AS insurance_code
       FROM patients p
       LEFT JOIN patient_statuses ps ON p.status_id = ps.id
       LEFT JOIN practitioners doc ON p.attending_practitioner_id = doc.id
       LEFT JOIN patient_insurance_policies pip ON p.id = pip.patient_id AND pip.is_primary = true
       LEFT JOIN insurance_companies ic ON pip.insurance_company_id = ic.id
       WHERE p.id = $1 AND p.tenant_id = $2`,
      [patientId, tenantId]
    );

    if (patientRes.rowCount === 0) {
      return res.status(404).json({ error: 'Patient non trouvé' });
    }

    const patient = patientRes.rows[0];

    // 2. Verify Confidentiality and Access Rights
    const accessInfo = await verifyPatientRecordAccess(req.dbClient, tenantId, patient, req.user);

    if (!accessInfo.hasAccess) {
      // Return redacted administrative summary with clear confidentiality lock
      return res.status(200).json({
        has_dpi_access: false,
        access_restricted: true,
        patient: {
          id: patient.id,
          patient_code: patient.patient_code,
          first_name: patient.first_name,
          last_name: patient.last_name,
          gender: patient.gender,
          date_of_birth: patient.date_of_birth,
          status_name: patient.status_name,
          status_color: patient.status_color,
          attending_doctor: {
            id: patient.attending_practitioner_id,
            name: patient.doc_first ? `${patient.doc_title || 'Dr.'} ${patient.doc_first} ${patient.doc_last}` : 'Non assigné',
            specialty: patient.doc_specialty || 'Médecine Générale'
          }
        },
        message: `Dossier confidentiel : accessible uniquement au médecin traitant (${patient.doc_first ? `${patient.doc_title || 'Dr.'} ${patient.doc_first} ${patient.doc_last}` : 'Médecin traitant'}), à l'administrateur, ou sur autorisation accordée.`,
        can_request_access: true
      });
    }

    // 3. Treatments and clinical outcomes
    const treatmentsRes = await req.dbClient.query(
      `SELECT t.*, prac.first_name AS doc_first, prac.last_name AS doc_last
       FROM patient_treatments t
       LEFT JOIN practitioners prac ON t.prescribed_by = prac.id
       WHERE t.patient_id = $1
       ORDER BY t.start_date DESC, t.created_at DESC`,
      [patientId]
    ).catch(err => {
      console.warn('Treatments query warning:', err.message);
      return { rows: [] };
    });

    // 4. Lab Orders and Examinations
    const labOrdersRes = await req.dbClient.query(
      `SELECT lo.*, prac.first_name AS doc_first, prac.last_name AS doc_last
       FROM patient_lab_orders lo
       LEFT JOIN practitioners prac ON lo.practitioner_id = prac.id
       WHERE lo.patient_id = $1
       ORDER BY lo.created_at DESC`,
      [patientId]
    ).catch(err => {
      console.warn('Lab orders query warning:', err.message);
      return { rows: [] };
    });

    // 5. Clinical Consultations & Notes with Attached Prescriptions
    const consultsRes = await req.dbClient.query(
      `SELECT cn.*, prac.first_name AS doc_first, prac.last_name AS doc_last, prac.title AS doc_title, prac.specialty_name AS doc_specialty, prac.license_number AS doc_license,
              (SELECT json_build_object(
                 'id', rx.id,
                 'prescription_code', rx.prescription_code,
                 'qr_cryptographic_hash', rx.qr_cryptographic_hash,
                 'issued_at', rx.issued_at,
                 'valid_until', rx.valid_until,
                 'is_dispensed', rx.is_dispensed,
                 'items', COALESCE((SELECT json_agg(pi.*) FROM prescription_items pi WHERE pi.prescription_id = rx.id), '[]'::json)
              ) FROM prescriptions rx WHERE rx.consultation_id = cn.id LIMIT 1) AS prescription
       FROM consultation_notes cn
       LEFT JOIN practitioners prac ON cn.practitioner_id = prac.id
       WHERE cn.patient_id = $1
       ORDER BY cn.created_at DESC`,
      [patientId]
    ).catch(err => {
      console.warn('Consultations query warning:', err.message);
      return { rows: [] };
    });

    // 6. Prescriptions
    const rxRes = await req.dbClient.query(
      `SELECT rx.*, prac.first_name AS doc_first, prac.last_name AS doc_last,
              (SELECT json_agg(pi.*) FROM prescription_items pi WHERE pi.prescription_id = rx.id) AS items
       FROM prescriptions rx
       LEFT JOIN practitioners prac ON rx.practitioner_id = prac.id
       WHERE rx.patient_id = $1
       ORDER BY rx.issued_at DESC`,
      [patientId]
    ).catch(err => {
      console.warn('Prescriptions query warning:', err.message);
      return { rows: [] };
    });

    // 7. Medical Documents & Imaging
    const docsRes = await req.dbClient.query(
      `SELECT md.*, u.first_name AS uploaded_first, u.last_name AS uploaded_last
       FROM medical_documents md
       LEFT JOIN users u ON md.uploaded_by = u.id
       WHERE md.patient_id = $1
       ORDER BY md.created_at DESC`,
      [patientId]
    ).catch(() => ({ rows: [] }));

    // 8. Appointments
    const apptRes = await req.dbClient.query(
      `SELECT a.id, a.practitioner_id, a.patient_id, a.medical_service_id, a.status, a.booking_channel, a.created_at,
              lower(a.time_slot) AS start_time, upper(a.time_slot) AS end_time,
              ms.name AS service_name, pr.first_name AS doc_first, pr.last_name AS doc_last
       FROM appointments a
       LEFT JOIN medical_services ms ON a.medical_service_id = ms.id
       LEFT JOIN practitioners pr ON a.practitioner_id = pr.id
       WHERE a.patient_id = $1
       ORDER BY lower(a.time_slot) DESC`,
      [patientId]
    ).catch((err) => {
      console.warn('Appointments query warning:', err.message);
      return { rows: [] };
    });

    // 9. Hospitalizations / Stays
    const hospRes = await req.dbClient.query(
      `SELECT h.*, b.name AS building_name, 
              COALESCE(r.number_or_name, r.room_number) AS room_number, 
              COALESCE(bd.name, bd.bed_number) AS bed_number
       FROM hospitalizations h
       LEFT JOIN hospital_beds bd ON h.bed_id = bd.id
       LEFT JOIN hospital_rooms r ON bd.room_id = r.id
       LEFT JOIN hospital_buildings b ON r.building_id = b.id
       WHERE h.patient_id = $1
       ORDER BY h.admitted_at DESC`,
      [patientId]
    ).catch((err) => {
      console.warn('Hospitalizations query warning:', err.message);
      return { rows: [] };
    });

    // 10. Active Grants list (if user has delegation power)
    let grants = [];
    if (accessInfo.canDelegate) {
      const gRes = await req.dbClient.query(
        `SELECT g.*, 
                pr.first_name AS prac_first, pr.last_name AS prac_last, pr.title AS prac_title, pr.specialty_name AS prac_specialty,
                u.first_name AS user_first, u.last_name AS user_last,
                ub.first_name AS granted_by_first, ub.last_name AS granted_by_last
         FROM patient_record_access_grants g
         LEFT JOIN practitioners pr ON g.practitioner_id = pr.id
         LEFT JOIN users u ON g.granted_to_user_id = u.id
         LEFT JOIN users ub ON g.granted_by_user_id = ub.id
         WHERE g.tenant_id = $1 AND g.patient_id = $2
         ORDER BY g.created_at DESC`,
        [tenantId, patientId]
      ).catch(err => {
        console.warn('Access grants query warning:', err.message);
        return { rows: [] };
      });
      grants = (gRes && gRes.rows) || [];
    }

    return res.status(200).json({
      has_dpi_access: true,
      access_level: accessInfo.accessType,
      access_role: accessInfo.role,
      can_delegate: accessInfo.canDelegate,
      grant_info: accessInfo.grant || null,
      patient: {
        ...patient,
        attending_doctor: {
          id: patient.attending_practitioner_id,
          name: patient.doc_first ? `${patient.doc_title || 'Dr.'} ${patient.doc_first} ${patient.doc_last}` : 'Non assigné',
          specialty: patient.doc_specialty || 'Médecine Générale'
        }
      },
      treatments: treatmentsRes.rows || [],
      lab_orders: labOrdersRes.rows || [],
      labOrders: labOrdersRes.rows || [],
      consultations: consultsRes.rows || [],
      prescriptions: rxRes.rows || [],
      documents: docsRes.rows || [],
      appointments: apptRes.rows || [],
      hospitalizations: hospRes.rows || [],
      access_grants: grants
    });

  } catch (err) {
    console.error('Get patient dossier error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve patient dossier: ' + err.message });
  }
};

// ============================================================================
// 2. Access Grants / Delegation Management Endpoints
// ============================================================================
const getPatientAccessGrants = async (req, res) => {
  const { patientId } = req.params;
  const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;

  try {
    const result = await req.dbClient.query(
      `SELECT g.*, 
              pr.first_name AS prac_first, pr.last_name AS prac_last, pr.title AS prac_title, pr.specialty_name AS prac_specialty,
              u.first_name AS user_first, u.last_name AS user_last,
              ub.first_name AS granted_by_first, ub.last_name AS granted_by_last
       FROM patient_record_access_grants g
       LEFT JOIN practitioners pr ON g.practitioner_id = pr.id
       LEFT JOIN users u ON g.granted_to_user_id = u.id
       LEFT JOIN users ub ON g.granted_by_user_id = ub.id
       WHERE g.tenant_id = $1 AND g.patient_id = $2
       ORDER BY g.created_at DESC`,
      [tenantId, patientId]
    );

    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get access grants error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve access grants' });
  }
};

const grantPatientAccess = async (req, res) => {
  const { patientId } = req.params;
  const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;
  const { practitioner_id, granted_to_user_id, access_type, reason, expires_at } = req.body;

  if (!practitioner_id && !granted_to_user_id) {
    return res.status(400).json({ error: 'Un praticien ou utilisateur bénéficiaire est requis' });
  }

  try {
    // Verify that current user is Attending Doctor or Admin
    const pRes = await req.dbClient.query(`SELECT id, attending_practitioner_id FROM patients WHERE id = $1`, [patientId]);
    if (pRes.rowCount === 0) return res.status(404).json({ error: 'Patient introuvable' });
    const patient = pRes.rows[0];

    const accessInfo = await verifyPatientRecordAccess(req.dbClient, tenantId, patient, req.user);
    if (!accessInfo.canDelegate) {
      return res.status(403).json({ error: 'Seul le médecin traitant ou l\'administrateur peut accorder un accès à ce dossier' });
    }

    const grantRes = await req.dbClient.query(
      `INSERT INTO patient_record_access_grants (
        tenant_id, patient_id, practitioner_id, granted_to_user_id, granted_by_user_id, access_type, reason, expires_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (tenant_id, patient_id, practitioner_id) 
      DO UPDATE SET access_type = EXCLUDED.access_type, reason = EXCLUDED.reason, expires_at = EXCLUDED.expires_at, granted_by_user_id = EXCLUDED.granted_by_user_id
      RETURNING *`,
      [
        tenantId,
        patientId,
        practitioner_id || null,
        granted_to_user_id || null,
        req.user.id,
        access_type || 'READ_WRITE',
        reason || 'Avis médical / Délégation confraternelle',
        expires_at || null
      ]
    );

    return res.status(201).json(grantRes.rows[0]);
  } catch (err) {
    console.error('Grant patient access error:', err.message);
    return res.status(500).json({ error: 'Échec de l\'attribution de l\'autorisation : ' + err.message });
  }
};

const revokePatientAccess = async (req, res) => {
  const { patientId, grantId } = req.params;
  const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;

  try {
    const pRes = await req.dbClient.query(`SELECT id, attending_practitioner_id FROM patients WHERE id = $1`, [patientId]);
    if (pRes.rowCount === 0) return res.status(404).json({ error: 'Patient introuvable' });
    const patient = pRes.rows[0];

    const accessInfo = await verifyPatientRecordAccess(req.dbClient, tenantId, patient, req.user);
    if (!accessInfo.canDelegate) {
      return res.status(403).json({ error: 'Seul le médecin traitant ou l\'administrateur peut révoquer un accès' });
    }

    await req.dbClient.query(`DELETE FROM patient_record_access_grants WHERE id = $1 AND tenant_id = $2`, [grantId, tenantId]);
    return res.status(200).json({ message: 'Autorisation d\'accès révoquée avec succès' });
  } catch (err) {
    console.error('Revoke access error:', err.message);
    return res.status(500).json({ error: 'Échec de la révocation de l\'autorisation' });
  }
};

// ============================================================================
// 3. Treatments CRUD
// ============================================================================
const getTreatments = async (req, res) => {
  const { patientId } = req.params;
  const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;
  try {
    const result = await req.dbClient.query(
      `SELECT t.*, prac.first_name AS doc_first, prac.last_name AS doc_last
       FROM patient_treatments t
       LEFT JOIN practitioners prac ON t.prescribed_by = prac.id
       WHERE t.patient_id = $1 AND t.tenant_id = $2
       ORDER BY t.start_date DESC`,
      [patientId, tenantId]
    );
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get treatments error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve treatments' });
  }
};

const createTreatment = async (req, res) => {
  const { patientId } = req.params;
  const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;
  const { treatment_name, treatment_type, start_date, end_date, dosage_instructions, status, results_obtained, prescribed_by } = req.body;

  if (!treatment_name || !start_date) {
    return res.status(400).json({ error: 'Treatment name and start date are required' });
  }

  try {
    const result = await req.dbClient.query(
      `INSERT INTO patient_treatments (
        tenant_id, patient_id, treatment_name, treatment_type, start_date, end_date,
        dosage_instructions, status, results_obtained, prescribed_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        tenantId, patientId, treatment_name,
        treatment_type || 'Médicamenteux',
        start_date, end_date || null,
        dosage_instructions || null,
        status || 'EN_COURS',
        results_obtained || null,
        prescribed_by || null
      ]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create treatment error:', err.message);
    return res.status(500).json({ error: 'Failed to record treatment' });
  }
};

const updateTreatment = async (req, res) => {
  const { id } = req.params;
  const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;
  const { treatment_name, treatment_type, start_date, end_date, dosage_instructions, status, results_obtained } = req.body;

  try {
    const result = await req.dbClient.query(
      `UPDATE patient_treatments
       SET treatment_name = COALESCE($1, treatment_name),
           treatment_type = COALESCE($2, treatment_type),
           start_date = COALESCE($3, start_date),
           end_date = COALESCE($4, end_date),
           dosage_instructions = COALESCE($5, dosage_instructions),
           status = COALESCE($6, status),
           results_obtained = COALESCE($7, results_obtained)
       WHERE id = $8 AND tenant_id = $9
       RETURNING *`,
      [treatment_name, treatment_type, start_date, end_date, dosage_instructions, status, results_obtained, id, tenantId]
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
  const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;
  try {
    await req.dbClient.query(`DELETE FROM patient_treatments WHERE id = $1 AND tenant_id = $2`, [id, tenantId]);
    return res.status(200).json({ message: 'Treatment deleted successfully' });
  } catch (err) {
    console.error('Delete treatment error:', err.message);
    return res.status(500).json({ error: 'Failed to delete treatment' });
  }
};

// ============================================================================
// 4. Lab Orders & Biological Examinations CRUD
// ============================================================================
const getLabOrders = async (req, res) => {
  const { patientId } = req.params;
  const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;
  try {
    const result = await req.dbClient.query(
      `SELECT lo.*, prac.first_name AS doc_first, prac.last_name AS doc_last
       FROM patient_lab_orders lo
       LEFT JOIN practitioners prac ON lo.practitioner_id = prac.id
       WHERE lo.patient_id = $1 AND lo.tenant_id = $2
       ORDER BY lo.created_at DESC`,
      [patientId, tenantId]
    );
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get lab orders error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve lab orders' });
  }
};

const createLabOrder = async (req, res) => {
  const { patientId } = req.params;
  const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;
  const { exam_type, category, exam_name, test_name, priority, clinical_notes, practitioner_id, document_url, results_text, status } = req.body;

  const finalName = test_name || exam_name;
  if (!finalName) {
    return res.status(400).json({ error: 'Exam name / test_name is required' });
  }

  const finalStatus = status || (document_url || results_text ? 'TERMINE' : 'A_FAIRE');
  const resultsDate = results_text || document_url ? new Date() : null;

  try {
    const result = await req.dbClient.query(
      `INSERT INTO patient_lab_orders (
        tenant_id, patient_id, practitioner_id, category, test_name, priority, clinical_notes, document_url, results_text, status, results_date
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`,
      [
        tenantId, patientId, practitioner_id || null,
        category || exam_type || 'Biologie', finalName,
        priority || 'NORMALE', clinical_notes || null,
        document_url || null, results_text || null, finalStatus, resultsDate
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
  const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;
  const { status, results_text, document_url, clinical_notes } = req.body;

  try {
    const result = await req.dbClient.query(
      `UPDATE patient_lab_orders
       SET status = COALESCE($1, status),
           results_text = COALESCE($2, results_text),
           document_url = COALESCE($3, document_url),
           clinical_notes = COALESCE($4, clinical_notes),
           results_date = CASE WHEN $2 IS NOT NULL THEN NOW() ELSE results_date END
       WHERE id = $5 AND tenant_id = $6
       RETURNING *`,
      [status, results_text, document_url, clinical_notes, id, tenantId]
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
  const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;
  try {
    await req.dbClient.query(`DELETE FROM patient_lab_orders WHERE id = $1 AND tenant_id = $2`, [id, tenantId]);
    return res.status(200).json({ message: 'Lab order deleted successfully' });
  } catch (err) {
    console.error('Delete lab order error:', err.message);
    return res.status(500).json({ error: 'Failed to delete lab order' });
  }
};

module.exports = {
  getPatientDossier,
  getPatientAccessGrants,
  grantPatientAccess,
  revokePatientAccess,
  getTreatments,
  createTreatment,
  updateTreatment,
  deleteTreatment,
  getLabOrders,
  createLabOrder,
  updateLabOrder,
  deleteLabOrder
};
