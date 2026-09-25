const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { setAuthCookie } = require('../utils/authCookie');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'clinicos-jwt-super-secret-key-2026';

// 1. Multi-Tenant Login
const login = async (req, res) => {
  const { tenant_slug, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query("SET LOCAL app.bypass_rls = 'true'");

    const emailLower = email.toLowerCase().trim();

    // Query user by email, joining tenants to retrieve tenant information and slug
    let userQuery = `
      SELECT u.id, u.tenant_id, u.email, u.password_hash, u.first_name, u.last_name, u.role, u.is_active,
             t.id as t_id, t.name as tenant_name, t.slug as tenant_slug, t.is_active as tenant_active
      FROM users u
      LEFT JOIN tenants t ON u.tenant_id = t.id
      WHERE u.email = $1
    `;
    let userParams = [emailLower];

    if (tenant_slug && !['saas', 'admin', 'global', 'master', 'superadmin'].includes(tenant_slug.toLowerCase().trim())) {
      userQuery += ` AND (t.slug = $2 OR u.role = 'SUPER_ADMIN_SAAS' OR u.email = 'mbndiaye@gmail.com')`;
      userParams.push(tenant_slug.toLowerCase().trim());
    }

    userQuery += ` ORDER BY (u.role = 'SUPER_ADMIN_SAAS' OR u.email = 'mbndiaye@gmail.com') DESC, u.created_at ASC`;

    const userRes = await client.query(userQuery, userParams);

    if (userRes.rowCount === 0) {
      await client.query('COMMIT');
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const user = userRes.rows[0];

    if (!user.is_active) {
      await client.query('COMMIT');
      return res.status(403).json({ error: 'Votre compte utilisateur a été désactivé' });
    }

    if (user.tenant_active === false) {
      await client.query('COMMIT');
      return res.status(403).json({ error: 'Le compte de cette clinique a été désactivé' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      await client.query('COMMIT');
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    await client.query('COMMIT');

    const tenantSlug = user.tenant_slug || (tenant_slug ? tenant_slug.toLowerCase().trim() : 'paix');
    const tenantName = user.tenant_name || (user.role === 'SUPER_ADMIN_SAAS' ? 'Plateforme SaaS' : 'Clinique');

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        tenant_id: user.tenant_id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    setAuthCookie(res, token);

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name
      },
      tenant: {
        id: user.tenant_id,
        name: tenantName,
        slug: tenantSlug
      }
    });
  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({ error: 'Internal server error during login' });
  } finally {
    client.release();
  }
};

const registerTenant = async (req, res) => {
  const { tenant_name, tenant_slug, phone_number, ninea_rc, email, password, first_name, last_name, logo_url, stamp_url, address, gps_coordinates, payment_methods } = req.body;

  if (!tenant_name || !tenant_slug || !phone_number || !email || !password || !first_name || !last_name) {
    return res.status(400).json({ error: 'All primary fields are required' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // Provisionnement initial d'un tenant : aucun contexte tenant n'existe encore
    // pour set_config('app.current_tenant_id', ...). Sans ce bypass, chaque INSERT
    // dans une table sous FORCE ROW LEVEL SECURITY (users, practitioners,
    // medical_services, tenant_payment_methods, cash_registers...) est rejeté par
    // Postgres avec "new row violates row-level security policy" — invisible en
    // développement local où le rôle DB est superuser (RLS toujours contournée par
    // un superuser), mais systématique en production où le rôle applicatif ne l'est pas.
    await client.query("SET LOCAL app.bypass_rls = 'true'");

    // A. Check if tenant slug is already taken
    const slugCheck = await client.query(`SELECT 1 FROM tenants WHERE slug = $1`, [tenant_slug.toLowerCase().trim()]);
    if (slugCheck.rowCount > 0) {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: 'Clinic slug is already registered' });
    }

    const tenantId = crypto.randomUUID();
    const userId = crypto.randomUUID();

    // B. Insert Tenant
    await client.query(
      `INSERT INTO tenants (id, name, slug, phone_number, ninea_rc, logo_url, stamp_url, address, email, gps_coordinates, settings) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        tenantId,
        tenant_name,
        tenant_slug.toLowerCase().trim(),
        phone_number,
        ninea_rc || null,
        logo_url || '/logo-espoir.png',
        stamp_url || null,
        address || null,
        email.toLowerCase().trim(), // tenant contact email defaults to superadmin email
        gps_coordinates ? JSON.stringify(gps_coordinates) : null,
        JSON.stringify({ currency: 'XOF', deposit_rate: 0.20, grace_period_days: 30 })
      ]
    );

    // C. Initialize Dynamic Payment configurations
    if (Array.isArray(payment_methods) && payment_methods.length > 0) {
      for (const pm of payment_methods) {
        if (typeof pm === 'object' && pm.name) {
          const provider = (pm.name || 'CUSTOM').toUpperCase().replace(/\s+/g, '_');
          const creds = JSON.stringify({
            phone_number: pm.number || pm.phone_number || '',
            qr_code_url: pm.qr_code_url || ''
          });
          await client.query(
            `INSERT INTO tenant_payment_methods (id, tenant_id, provider, name, credentials, qr_code_template, is_active) 
             VALUES ($1, $2, $3, $4, $5, $6, true)`,
            [crypto.randomUUID(), tenantId, provider, pm.name, creds, pm.qr_code_url || null]
          );
        } else if (typeof pm === 'string') {
          await client.query(
            `INSERT INTO tenant_payment_methods (id, tenant_id, provider, name, credentials, is_active) 
             VALUES ($1, $2, $3, $4, $5, true)`,
            [crypto.randomUUID(), tenantId, pm, pm, JSON.stringify({})]
          );
        }
      }
    }

    // D. Hash Admin password and Insert User
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const isSaasSuperAdmin = email.toLowerCase().trim() === 'mbndiaye@gmail.com';
    const assignedRole = isSaasSuperAdmin ? 'SUPER_ADMIN_SAAS' : 'TENANT_ADMIN';
    const assignedPreset = isSaasSuperAdmin ? 'SUPER_ADMIN_SAAS' : 'ADMIN';

    await client.query(
      `INSERT INTO users (id, tenant_id, email, password_hash, first_name, last_name, role, preset_name) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        userId,
        tenantId,
        email.toLowerCase().trim(),
        passwordHash,
        first_name,
        last_name,
        assignedRole,
        assignedPreset
      ]
    );

    // E. Aucun praticien n'est cree automatiquement. L'inscription en creait un
    // a partir de l'administrateur, avec la specialite « Médecine Générale » et
    // la licence « LIC-001 » : un responsable administratif se retrouvait donc
    // inscrit comme medecin, visible dans l'agenda et selectionnable pour une
    // consultation. La structure declare ses praticiens depuis l'ecran
    // « Structure & Équipe Médicale ».

    // F. Create default Consultation medical service
    // Sans praticien rattache (la colonne l'autorise) : il sera choisi lors de
    // la prise de rendez-vous, ou affecte a la prestation plus tard.
    await client.query(
      `INSERT INTO medical_services (id, tenant_id, code, name, duration_minutes, price, deposit_amount, is_active)
       VALUES ($1, $2, 'CS-GEN', 'Consultation Générale', 30, 15000.00, 3000.00, true)`,
      [crypto.randomUUID(), tenantId]
    );

    // G. Seed Default Patient Statuses
    const defaultStatuses = [
      { code: 'EXTERNE', name: 'Externe (Ambulatoire)', color: '#3498db', is_default: true },
      { code: 'HOSPITALISE', name: 'Hospitalisé', color: '#e74c3c', is_default: false },
      { code: 'OBSERVATION', name: 'En observation', color: '#f39c12', is_default: false },
      { code: 'URGENCE', name: 'Urgence', color: '#c0392b', is_default: false },
      { code: 'POST_OP', name: 'Post-opératoire', color: '#9b59b6', is_default: false }
    ];

    for (const st of defaultStatuses) {
      await client.query(
        `INSERT INTO patient_statuses (id, tenant_id, code, name, color_code, is_default, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, true)
         ON CONFLICT (tenant_id, code) DO NOTHING`,
        [crypto.randomUUID(), tenantId, st.code, st.name, st.color, st.is_default]
      );
    }

    // H. Seed Default Cash Register
    await client.query(
      `INSERT INTO cash_registers (id, tenant_id, name, is_active)
       VALUES ($1, $2, 'Caisse Principale Guichet 1', true)`,
      [crypto.randomUUID(), tenantId]
    );

    // I. Seed Default Insurance Companies
    const defaultInsurances = [
      { name: 'IPM SONATEL', code: 'IPM-SONATEL', phone: '+221338391200' },
      { name: 'AXA Assurances', code: 'AXA-SN', phone: '+221338493434' },
      { name: 'GMC Assurances / IPM', code: 'GMC-SN', phone: '+221338234567' },
      { name: 'Allianz Sénégal', code: 'ALLIANZ-SN', phone: '+221338898989' }
    ];

    for (const ins of defaultInsurances) {
      await client.query(
        `INSERT INTO insurance_companies (id, tenant_id, name, code, contact_phone, is_active)
         VALUES ($1, $2, $3, $4, $5, true)`,
        [crypto.randomUUID(), tenantId, ins.name, ins.code, ins.phone]
      );
    }

    await client.query('COMMIT');

    // J. Generate JWT for the newly registered user
    const token = jwt.sign(
      {
        id: userId,
        tenant_id: tenantId,
        email: email.toLowerCase().trim(),
        role: assignedRole,
        preset_name: assignedPreset,
        first_name,
        last_name
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      token,
      user: {
        id: userId,
        email: email.toLowerCase().trim(),
        role: assignedRole,
        preset_name: assignedPreset,
        first_name,
        last_name
      },
      tenant: {
        id: tenantId,
        name: tenant_name,
        slug: tenant_slug.toLowerCase().trim()
      }
    });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Tenant registration error:', err.message);
    return res.status(500).json({ error: 'Failed to register clinic tenant' });
  } finally {
    client.release();
  }
};

// 3. Forgot Password — Request reset link via email
const forgotPassword = async (req, res) => {
  const { email, tenant_slug } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Veuillez renseigner votre adresse email.' });
  }

  const cleanEmail = email.toLowerCase().trim();
  const cleanSlug = tenant_slug ? tenant_slug.toLowerCase().trim() : null;

  // `users` et `tenant_smtp_accounts` sont sous FORCE ROW LEVEL SECURITY. Ce endpoint
  // est appelé avant toute authentification : aucun app.current_tenant_id n'existe.
  // Sans bypass, chaque lecture y renvoie silencieusement 0 ligne (RLS filtre sans
  // erreur) — le flux paraît fonctionner (message générique "si ce compte existe...")
  // alors qu'aucun email n'est jamais réellement préparé ni envoyé.
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query("SET LOCAL app.bypass_rls = 'true'");

    let query = `
      SELECT u.id, u.email, u.first_name, u.last_name, u.tenant_id,
             t.name as tenant_name, t.slug as tenant_slug
      FROM users u
      LEFT JOIN tenants t ON u.tenant_id = t.id
      WHERE u.email = $1 AND u.is_active = true
    `;
    const params = [cleanEmail];

    if (cleanSlug && !['saas', 'admin', 'global'].includes(cleanSlug)) {
      query += ` AND t.slug = $2`;
      params.push(cleanSlug);
    }

    const userRes = await client.query(query, params);

    // Generic response for security if user not found
    if (userRes.rowCount === 0) {
      await client.query('COMMIT');
      return res.status(200).json({
        message: 'Si cette adresse email correspond à un compte actif, un lien de réinitialisation vous a été envoyé.'
      });
    }

    const user = userRes.rows[0];
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour validity

    // Invalidate any existing unused reset tokens for this user
    await client.query(
      `UPDATE password_reset_tokens SET used_at = NOW() WHERE user_id = $1 AND used_at IS NULL`,
      [user.id]
    );

    // Insert new reset token
    await client.query(
      `INSERT INTO password_reset_tokens (user_id, tenant_id, token, expires_at)
       VALUES ($1, $2, $3, $4)`,
      [user.id, user.tenant_id, resetToken, expiresAt]
    );

    // Find active SMTP account for this tenant if available
    let smtpConfig = null;
    try {
      const smtpRes = await client.query(
        `SELECT * FROM tenant_smtp_accounts WHERE tenant_id = $1 AND is_active = true ORDER BY is_default DESC, created_at DESC LIMIT 1`,
        [user.tenant_id]
      );
      if (smtpRes.rowCount > 0) {
        smtpConfig = smtpRes.rows[0];
      }
    } catch (e) {
      // Table might not be present in old setup, fallback to environment
    }

    await client.query('COMMIT');

    // Build reset URL
    const protocol = req.protocol || 'http';
    const host = req.get('host') || 'localhost:5000';
    const resetUrl = `${protocol}://${host}/?reset_token=${resetToken}`;

    const { sendPasswordResetEmail } = require('../utils/mailer');
    const emailResult = await sendPasswordResetEmail({
      recipientEmail: user.email,
      userName: `${user.first_name || ''} ${user.last_name || ''}`.trim(),
      resetUrl,
      tenantName: user.tenant_name || 'SoftMed',
      customConfig: smtpConfig
    });

    return res.status(200).json({
      // Ne pas annoncer un envoi qui n'a pas eu lieu : sans transport SMTP utilisable,
      // le mailer se contente de journaliser le message.
      message: emailResult.simulated
        ? "Aucun serveur de messagerie utilisable n'est configuré pour cette clinique : l'email n'a pas pu être envoyé. Utilisez le lien de réinitialisation ci-dessous, ou configurez un compte SMTP dans Paramètres → Comptes de messagerie."
        : 'Un email contenant votre lien de réinitialisation sécurisé vient de vous être envoyé.',
      simulated: emailResult.simulated || false,
      resetUrl: emailResult.simulated ? resetUrl : undefined
    });
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('Forgot password error:', err);
    return res.status(500).json({ error: 'Échec du traitement de la demande de réinitialisation.' });
  } finally {
    client.release();
  }
};

// 4. Verify Reset Token validity
const verifyResetToken = async (req, res) => {
  const token = req.query.token || req.body.token;

  if (!token) {
    return res.status(400).json({ error: 'Jeton de réinitialisation manquant' });
  }

  // Même cause que forgotPassword/resetPassword : sans app.current_tenant_id ni
  // bypass, la jointure sur `users` (FORCE RLS) renvoie silencieusement 0 ligne —
  // un jeton pourtant valide serait toujours déclaré "invalide ou expiré".
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query("SET LOCAL app.bypass_rls = 'true'");

    const tokenRes = await client.query(
      `SELECT prt.*, u.email, u.first_name, u.last_name, t.name as tenant_name
       FROM password_reset_tokens prt
       JOIN users u ON prt.user_id = u.id
       JOIN tenants t ON prt.tenant_id = t.id
       WHERE prt.token = $1 AND prt.used_at IS NULL AND prt.expires_at > NOW()`,
      [token.trim()]
    );

    await client.query('COMMIT');

    if (tokenRes.rowCount === 0) {
      return res.status(400).json({
        valid: false,
        error: 'Ce lien de réinitialisation est invalide ou a expiré. Veuillez refaire une demande.'
      });
    }

    const row = tokenRes.rows[0];
    return res.status(200).json({
      valid: true,
      email: row.email,
      user_name: `${row.first_name} ${row.last_name}`,
      tenant_name: row.tenant_name
    });
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('Verify reset token error:', err);
    return res.status(500).json({ error: 'Erreur lors de la vérification du lien' });
  } finally {
    client.release();
  }
};

// 5. Reset Password with new password
const resetPassword = async (req, res) => {
  const { token, new_password } = req.body;

  if (!token || !new_password) {
    return res.status(400).json({ error: 'Jeton et nouveau mot de passe requis.' });
  }

  if (new_password.length < 6) {
    return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // Même cause que register-tenant : à ce stade le mot de passe est réinitialisé
    // via un jeton, avant toute authentification — aucun app.current_tenant_id n'est
    // disponible. Sans bypass, la jointure sur `users` (sous FORCE RLS) ne renvoie
    // silencieusement AUCUNE ligne — pas d'erreur, juste "lien invalide" à tort — et
    // l'UPDATE users qui suit serait de toute façon rejeté par la politique RLS.
    await client.query("SET LOCAL app.bypass_rls = 'true'");

    const tokenRes = await client.query(
      `SELECT prt.*, u.email, u.tenant_id
       FROM password_reset_tokens prt
       JOIN users u ON prt.user_id = u.id
       WHERE prt.token = $1 AND prt.used_at IS NULL AND prt.expires_at > NOW()
       FOR UPDATE`,
      [token.trim()]
    );

    if (tokenRes.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({
        error: 'Ce lien de réinitialisation est invalide ou a expiré. Veuillez renouveler votre demande.'
      });
    }

    const record = tokenRes.rows[0];
    const passwordHash = await bcrypt.hash(new_password, 10);

    // Update user password
    await client.query(
      `UPDATE users SET password_hash = $1 WHERE id = $2`,
      [passwordHash, record.user_id]
    );

    // Mark token as used
    await client.query(
      `UPDATE password_reset_tokens SET used_at = NOW() WHERE id = $1`,
      [record.id]
    );

    await client.query('COMMIT');

    return res.status(200).json({
      message: 'Votre mot de passe a été modifié avec succès ! Vous pouvez maintenant vous connecter.'
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Reset password error:', err);
    return res.status(500).json({ error: 'Échec de la réinitialisation du mot de passe.' });
  } finally {
    client.release();
  }
};

module.exports = {
  login,
  registerTenant,
  forgotPassword,
  verifyResetToken,
  resetPassword
};
