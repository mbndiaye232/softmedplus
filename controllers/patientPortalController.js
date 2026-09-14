const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const pool = require('../config/db');
const { sendSms } = require('../utils/sms');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'clinicos-jwt-super-secret-key-2026';
const OTP_TTL_MS = 5 * 60 * 1000;
const OTP_MAX_ATTEMPTS = 5;

const cleanStr = (s) => (s || '').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

const genericAuthError = (res) => res.status(401).json({ error: 'Code patient, prénom, nom ou mot de passe incorrect' });

const signPatientToken = (patient, tenant) => jwt.sign(
  { patient_id: patient.id, tenant_id: tenant.id, patient_code: patient.patient_code, scope: 'patient_portal' },
  JWT_SECRET,
  { expiresIn: '2h' }
);

const maskPhone = (phone) => {
  const digits = (phone || '').replace(/\D/g, '');
  if (digits.length < 4) return '••••';
  return `•••••${digits.slice(-2)}`;
};

// 0. Résout un tenant actif par slug + verrouille/lit un patient par code, sous
// bypass RLS (appelé avant toute authentification patient, donc sans contexte
// app.current_tenant_id disponible) - même schéma que authController.js.
async function findTenantAndPatient(client, tenantSlug, patientCode) {
  const tenantRes = await client.query(
    `SELECT id, name, slug FROM tenants WHERE slug = $1 AND is_active = true`,
    [(tenantSlug || '').toLowerCase().trim()]
  );
  if (tenantRes.rowCount === 0) return { tenant: null, patient: null };
  const tenant = tenantRes.rows[0];

  const patientRes = await client.query(
    `SELECT id, patient_code, first_name, last_name, phone_number, email, password_hash, two_factor_enabled
     FROM patients
     WHERE tenant_id = $1 AND UPPER(TRIM(patient_code)) = UPPER(TRIM($2))
     LIMIT 1`,
    [tenant.id, (patientCode || '').trim()]
  );
  return { tenant, patient: patientRes.rowCount > 0 ? patientRes.rows[0] : null };
}

// 1. Première connexion : définit le mot de passe du patient. L'identité est
// vérifiée par code patient + prénom/nom EXACTS (même contrôle durci que
// précédemment), mais seulement une fois : si un mot de passe est déjà défini,
// cette route refuse plutôt que de laisser un correspondance de nom l'écraser.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const enrollPatientPassword = async (req, res) => {
  const { tenant_slug, patient_code, first_name, last_name, password, email } = req.body;

  if (!tenant_slug || !patient_code || !first_name || !last_name || !password) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères' });
  }
  // Email facultatif à l'inscription, mais requis plus tard pour "mot de passe
  // oublié" - on le valide dès maintenant plutôt que de stocker une valeur invalide
  // qui ne sera jamais utilisable au moment où le patient en aura besoin.
  const cleanEmail = email ? email.trim().toLowerCase() : null;
  if (cleanEmail && !EMAIL_RE.test(cleanEmail)) {
    return res.status(400).json({ error: 'Adresse email invalide' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`SELECT set_config('app.bypass_rls', 'true', true)`);

    const { tenant, patient } = await findTenantAndPatient(client, tenant_slug, patient_code);
    if (!tenant) {
      await client.query('COMMIT');
      return res.status(404).json({ error: 'Structure sanitaire introuvable' });
    }
    if (!patient) {
      await client.query('COMMIT');
      return genericAuthError(res);
    }

    const nfn = cleanStr(first_name);
    const nln = cleanStr(last_name);
    if (!nfn || !nln || nfn !== cleanStr(patient.first_name) || nln !== cleanStr(patient.last_name)) {
      await client.query('COMMIT');
      return genericAuthError(res);
    }

    if (patient.password_hash) {
      await client.query('COMMIT');
      return res.status(409).json({ error: 'Un mot de passe existe déjà pour ce dossier. Utilisez la connexion habituelle.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    // COALESCE : ne jamais effacer un email déjà renseigné (ex: par le personnel
    // d'accueil) si le patient laisse le champ vide à l'inscription.
    await client.query(
      `UPDATE patients SET password_hash = $1, email = COALESCE($2, email) WHERE id = $3`,
      [passwordHash, cleanEmail, patient.id]
    );

    await client.query('COMMIT');

    const token = signPatientToken(patient, tenant);
    return res.status(201).json({
      token,
      patient: { id: patient.id, patient_code: patient.patient_code, first_name: patient.first_name, last_name: patient.last_name },
      tenant: { id: tenant.id, name: tenant.name, slug: tenant.slug }
    });
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('Patient enroll error:', err.message);
    return res.status(500).json({ error: "Échec de la création de l'accès" });
  } finally {
    client.release();
  }
};

// 2. Connexion par code patient + mot de passe. Si la double authentification SMS
// est activée pour ce patient, la connexion s'arrête ici sur un jeton intermédiaire
// (scope distinct, non valide pour consulter le dossier) et exige verifyLoginOtp.
const patientPortalLogin = async (req, res) => {
  const { tenant_slug, patient_code, password } = req.body;

  if (!tenant_slug || !patient_code || !password) {
    return res.status(400).json({ error: 'Code patient et mot de passe sont requis' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`SELECT set_config('app.bypass_rls', 'true', true)`);

    const { tenant, patient } = await findTenantAndPatient(client, tenant_slug, patient_code);
    await client.query('COMMIT');

    if (!tenant) {
      return res.status(404).json({ error: 'Structure sanitaire introuvable' });
    }
    if (!patient) {
      return genericAuthError(res);
    }
    if (!patient.password_hash) {
      return res.status(409).json({ error: 'Aucun accès configuré pour ce dossier. Créez votre mot de passe.', needs_enrollment: true });
    }

    const isMatch = await bcrypt.compare(password, patient.password_hash);
    if (!isMatch) {
      return genericAuthError(res);
    }

    if (!patient.two_factor_enabled) {
      const token = signPatientToken(patient, tenant);
      return res.status(200).json({
        token,
        patient: { id: patient.id, patient_code: patient.patient_code, first_name: patient.first_name, last_name: patient.last_name },
        tenant: { id: tenant.id, name: tenant.name, slug: tenant.slug }
      });
    }

    // Double authentification activée : émission d'un code à usage unique.
    const code = String(crypto.randomInt(100000, 1000000));
    const codeHash = await bcrypt.hash(code, 10);
    const expiresAt = new Date(Date.now() + OTP_TTL_MS);

    const otpInsertRes = await client.query(
      `INSERT INTO patient_otp_codes (patient_id, tenant_id, code_hash, expires_at) VALUES ($1, $2, $3, $4) RETURNING id`,
      [patient.id, tenant.id, codeHash, expiresAt]
    );
    const otpId = otpInsertRes.rows[0].id;

    const smsResult = await sendSms(
      patient.phone_number,
      `SoftMed - Votre code de connexion à votre dossier patient : ${code} (valable 5 minutes).`
    );

    const otpToken = jwt.sign(
      { patient_id: patient.id, tenant_id: tenant.id, otp_id: otpId, scope: 'patient_portal_otp_pending' },
      JWT_SECRET,
      { expiresIn: '5m' }
    );

    return res.status(200).json({
      requires_otp: true,
      otp_token: otpToken,
      phone_hint: maskPhone(patient.phone_number),
      // Uniquement présent quand aucun fournisseur SMS réel n'est configuré (voir
      // utils/sms.js) : permet de tester le flux 2FA en local sans SMS réel.
      simulated_code: smsResult.simulated ? code : undefined
    });
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('Patient portal login error:', err.message);
    return res.status(500).json({ error: 'Échec de la connexion' });
  } finally {
    client.release();
  }
};

// 3. Vérification du code SMS reçu pendant la connexion. Patient_id/tenant_id
// proviennent exclusivement de l'otp_token signé par le serveur à l'étape login,
// jamais d'un paramètre fourni ici.
const verifyLoginOtp = async (req, res) => {
  const { otp_token, code } = req.body;
  if (!otp_token || !code) {
    return res.status(400).json({ error: 'Jeton et code requis' });
  }

  let decoded;
  try {
    decoded = jwt.verify(otp_token, JWT_SECRET);
    if (decoded.scope !== 'patient_portal_otp_pending') throw new Error('bad scope');
  } catch (err) {
    return res.status(401).json({ error: 'Session de connexion expirée, veuillez recommencer' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`SELECT set_config('app.bypass_rls', 'true', true)`);

    const otpRes = await client.query(
      `SELECT * FROM patient_otp_codes WHERE id = $1 AND patient_id = $2 AND tenant_id = $3 FOR UPDATE`,
      [decoded.otp_id, decoded.patient_id, decoded.tenant_id]
    );

    if (otpRes.rowCount === 0) { await client.query('COMMIT'); return res.status(401).json({ error: 'Code incorrect ou expiré' }); }
    const otp = otpRes.rows[0];

    if (otp.used_at || new Date(otp.expires_at) < new Date() || otp.attempts >= OTP_MAX_ATTEMPTS) {
      await client.query('COMMIT');
      return res.status(401).json({ error: 'Code incorrect ou expiré' });
    }

    const isMatch = await bcrypt.compare(String(code).trim(), otp.code_hash);
    if (!isMatch) {
      await client.query(`UPDATE patient_otp_codes SET attempts = attempts + 1 WHERE id = $1`, [otp.id]);
      await client.query('COMMIT');
      return res.status(401).json({ error: 'Code incorrect ou expiré' });
    }

    await client.query(`UPDATE patient_otp_codes SET used_at = NOW() WHERE id = $1`, [otp.id]);

    const patientRes = await client.query(
      `SELECT p.id, p.patient_code, p.first_name, p.last_name, t.id AS tenant_id, t.name AS tenant_name, t.slug AS tenant_slug
       FROM patients p JOIN tenants t ON p.tenant_id = t.id
       WHERE p.id = $1`,
      [decoded.patient_id]
    );

    await client.query('COMMIT');

    if (patientRes.rowCount === 0) {
      return res.status(404).json({ error: 'Dossier introuvable' });
    }
    const row = patientRes.rows[0];
    const token = signPatientToken(
      { id: row.id, patient_code: row.patient_code },
      { id: row.tenant_id }
    );

    return res.status(200).json({
      token,
      patient: { id: row.id, patient_code: row.patient_code, first_name: row.first_name, last_name: row.last_name },
      tenant: { id: row.tenant_id, name: row.tenant_name, slug: row.tenant_slug }
    });
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('Verify OTP error:', err.message);
    return res.status(500).json({ error: 'Échec de la vérification du code' });
  } finally {
    client.release();
  }
};

// 4. Mot de passe oublié : envoie un lien de réinitialisation par email. Réponse
// volontairement identique que le patient/email corresponde ou non, pour ne pas
// laisser deviner qu'un code patient ou un email existe (même posture que
// forgotPassword côté staff dans authController.js).
const forgotPatientPassword = async (req, res) => {
  const { tenant_slug, patient_code, email } = req.body;

  if (!tenant_slug || !patient_code || !email) {
    return res.status(400).json({ error: 'Structure, code patient et email sont requis' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const genericResponse = () => res.status(200).json({
    message: 'Si ces informations correspondent à un dossier avec un email enregistré, un lien de réinitialisation vous a été envoyé.'
  });

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`SELECT set_config('app.bypass_rls', 'true', true)`);

    const { tenant, patient } = await findTenantAndPatient(client, tenant_slug, patient_code);

    if (!tenant || !patient || !patient.email || patient.email.toLowerCase() !== cleanEmail) {
      await client.query('COMMIT');
      return genericResponse();
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 heure

    await client.query(
      `UPDATE patient_password_reset_tokens SET used_at = NOW() WHERE patient_id = $1 AND used_at IS NULL`,
      [patient.id]
    );
    await client.query(
      `INSERT INTO patient_password_reset_tokens (patient_id, tenant_id, token, expires_at) VALUES ($1, $2, $3, $4)`,
      [patient.id, tenant.id, resetToken, expiresAt]
    );

    let smtpConfig = null;
    try {
      const smtpRes = await client.query(
        `SELECT * FROM tenant_smtp_accounts WHERE tenant_id = $1 AND is_active = true ORDER BY is_default DESC, created_at DESC LIMIT 1`,
        [tenant.id]
      );
      if (smtpRes.rowCount > 0) smtpConfig = smtpRes.rows[0];
    } catch (e) {
      // Table potentiellement absente sur une ancienne installation.
    }

    await client.query('COMMIT');

    // Ne jamais construire ce lien à partir de req.protocol/req.get('host') : l'en-tête
    // Host est fourni par le client et peut être falsifié, ce qui permettrait
    // d'empoisonner le lien envoyé par email vers un domaine contrôlé par l'attaquant
    // (le jeton, valide, part alors vers ce domaine). Base URL fixée côté serveur.
    const baseUrl = (process.env.PUBLIC_BASE_URL || 'http://127.0.0.1:5050').replace(/\/$/, '');
    const resetUrl = `${baseUrl}/?patient_reset_token=${resetToken}&slug=${encodeURIComponent(tenant.slug)}`;

    const { sendPasswordResetEmail } = require('../utils/mailer');
    const emailResult = await sendPasswordResetEmail({
      recipientEmail: patient.email,
      userName: `${patient.first_name || ''} ${patient.last_name || ''}`.trim(),
      resetUrl,
      tenantName: tenant.name || 'SoftMed',
      customConfig: smtpConfig
    });

    return res.status(200).json({
      message: 'Si ces informations correspondent à un dossier avec un email enregistré, un lien de réinitialisation vous a été envoyé.',
      simulated: emailResult.simulated || false,
      // Uniquement en mode simulation locale (aucun SMTP configuré) : permet de
      // tester le flux sans serveur mail réel, comme pour le staff.
      resetUrl: emailResult.simulated ? resetUrl : undefined
    });
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('Forgot patient password error:', err.message);
    return res.status(500).json({ error: 'Échec du traitement de la demande' });
  } finally {
    client.release();
  }
};

// 5. Vérifie la validité d'un jeton de réinitialisation (avant d'afficher le
// formulaire de nouveau mot de passe).
const verifyPatientResetToken = async (req, res) => {
  const token = req.query.token || req.body.token;
  if (!token) {
    return res.status(400).json({ error: 'Jeton de réinitialisation manquant' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`SELECT set_config('app.bypass_rls', 'true', true)`);

    const tokenRes = await client.query(
      `SELECT prt.id, p.first_name, p.last_name, t.name AS tenant_name
       FROM patient_password_reset_tokens prt
       JOIN patients p ON prt.patient_id = p.id
       JOIN tenants t ON prt.tenant_id = t.id
       WHERE prt.token = $1 AND prt.used_at IS NULL AND prt.expires_at > NOW()`,
      [token.trim()]
    );

    await client.query('COMMIT');

    if (tokenRes.rowCount === 0) {
      return res.status(400).json({ valid: false, error: 'Ce lien de réinitialisation est invalide ou a expiré.' });
    }

    const row = tokenRes.rows[0];
    return res.status(200).json({ valid: true, patient_name: `${row.first_name} ${row.last_name}`, tenant_name: row.tenant_name });
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('Verify patient reset token error:', err.message);
    return res.status(500).json({ error: 'Erreur lors de la vérification du lien' });
  } finally {
    client.release();
  }
};

// 6. Réinitialise le mot de passe à partir d'un jeton valide à usage unique.
const resetPatientPassword = async (req, res) => {
  const { token, new_password } = req.body;

  if (!token || !new_password) {
    return res.status(400).json({ error: 'Jeton et nouveau mot de passe requis' });
  }
  if (new_password.length < 6) {
    return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`SELECT set_config('app.bypass_rls', 'true', true)`);

    const tokenRes = await client.query(
      `SELECT * FROM patient_password_reset_tokens
       WHERE token = $1 AND used_at IS NULL AND expires_at > NOW()
       FOR UPDATE`,
      [token.trim()]
    );

    if (tokenRes.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Ce lien de réinitialisation est invalide ou a expiré.' });
    }

    const record = tokenRes.rows[0];
    const passwordHash = await bcrypt.hash(new_password, 10);

    await client.query(`UPDATE patients SET password_hash = $1 WHERE id = $2`, [passwordHash, record.patient_id]);
    await client.query(`UPDATE patient_password_reset_tokens SET used_at = NOW() WHERE id = $1`, [record.id]);

    await client.query('COMMIT');

    return res.status(200).json({ message: 'Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter.' });
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('Reset patient password error:', err.message);
    return res.status(500).json({ error: 'Échec de la réinitialisation du mot de passe' });
  } finally {
    client.release();
  }
};

// 7. Active/désactive la double authentification SMS - patient déjà authentifié
// (req.patientAuth), jamais d'id fourni en paramètre.
const toggleTwoFactor = async (req, res) => {
  const { patientId, tenantId } = req.patientAuth;
  const { enable } = req.body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`SELECT set_config('app.bypass_rls', 'true', true)`);
    const result = await client.query(
      `UPDATE patients SET two_factor_enabled = $1 WHERE id = $2 AND tenant_id = $3 RETURNING two_factor_enabled`,
      [!!enable, patientId, tenantId]
    );
    await client.query('COMMIT');

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Dossier introuvable' });
    }
    return res.status(200).json({ two_factor_enabled: result.rows[0].two_factor_enabled });
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('Toggle 2FA error:', err.message);
    return res.status(500).json({ error: 'Échec de la mise à jour' });
  } finally {
    client.release();
  }
};

// 8. Dossier du patient connecté - tenant_id et patient_id viennent EXCLUSIVEMENT du
// jeton vérifié (req.patientAuth), jamais d'un paramètre fourni par l'appelant.
// Les confidential_notes (réservées au corps médical) sont volontairement exclues.
const getMyDossier = async (req, res) => {
  const { tenantId, patientId } = req.patientAuth;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`SELECT set_config('app.bypass_rls', 'true', true)`);

    const patientRes = await client.query(
      `SELECT p.id, p.patient_code, p.first_name, p.last_name, p.gender, p.date_of_birth,
              p.blood_group, p.allergies, p.chronic_conditions, p.status, p.two_factor_enabled, p.email,
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

    // Volontairement sans confidential_notes : réservées au corps médical.
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

module.exports = {
  enrollPatientPassword,
  patientPortalLogin,
  verifyLoginOtp,
  forgotPatientPassword,
  verifyPatientResetToken,
  resetPatientPassword,
  toggleTwoFactor,
  getMyDossier
};
