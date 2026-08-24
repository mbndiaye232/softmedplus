const { logAudit } = require('../middleware/audit');
const { testSmtpConnection } = require('../utils/mailer');

/**
 * 1. Get all SMTP Accounts for current tenant
 */
const getSmtpAccounts = async (req, res) => {
  const tenantId = req.user.tenant_id;
  try {
    const result = await req.dbClient.query(
      `SELECT id, tenant_id, account_name, from_name, from_email, reply_to_email, smtp_host, smtp_port, smtp_secure, smtp_user, 
              is_default, is_active, last_tested_at, last_test_status, created_at, updated_at,
              (CASE WHEN smtp_password IS NOT NULL AND LENGTH(smtp_password) > 0 THEN true ELSE false END) AS has_password
       FROM tenant_smtp_accounts
       WHERE tenant_id = $1
       ORDER BY is_default DESC, created_at ASC`,
      [tenantId]
    );

    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get SMTP accounts error:', err.message);
    return res.status(500).json({ error: 'Échec de la récupération des comptes SMTP' });
  }
};

/**
 * 2. Create a new SMTP Account for current tenant
 */
const createSmtpAccount = async (req, res) => {
  const tenantId = req.user.tenant_id;
  const {
    account_name,
    from_name,
    from_email,
    reply_to_email,
    smtp_host,
    smtp_port,
    smtp_secure,
    smtp_user,
    smtp_password,
    is_default,
    is_active
  } = req.body;

  if (!account_name || !from_name || !from_email || !smtp_host || !smtp_user || !smtp_password) {
    return res.status(400).json({ error: 'Tous les champs obligatoires doivent être renseignés (Nom, Expéditeur, Email, Hôte SMTP, Utilisateur, Mot de passe)' });
  }

  try {
    // If setting as default, unset others first
    if (is_default) {
      await req.dbClient.query(
        `UPDATE tenant_smtp_accounts SET is_default = false WHERE tenant_id = $1`,
        [tenantId]
      );
    } else {
      // If this is the first account, make it default automatically
      const countRes = await req.dbClient.query(
        `SELECT COUNT(*) FROM tenant_smtp_accounts WHERE tenant_id = $1`,
        [tenantId]
      );
      if (parseInt(countRes.rows[0].count, 10) === 0) {
        req.body.is_default = true;
      }
    }

    const portNum = parseInt(smtp_port, 10) || 465;
    const secureVal = smtp_secure !== undefined ? !!smtp_secure : (portNum === 465);

    const insertRes = await req.dbClient.query(
      `INSERT INTO tenant_smtp_accounts (
        tenant_id, account_name, from_name, from_email, reply_to_email, smtp_host, smtp_port, smtp_secure, smtp_user, smtp_password, is_default, is_active
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id, tenant_id, account_name, from_name, from_email, reply_to_email, smtp_host, smtp_port, smtp_secure, smtp_user, is_default, is_active, created_at`,
      [
        tenantId,
        account_name.trim(),
        from_name.trim(),
        from_email.trim(),
        reply_to_email ? reply_to_email.trim() : null,
        smtp_host.trim(),
        portNum,
        secureVal,
        smtp_user.trim(),
        smtp_password,
        !!req.body.is_default,
        is_active !== undefined ? !!is_active : true
      ]
    );

    const newAcc = insertRes.rows[0];
    await logAudit(req, 'CREATE_SMTP_ACCOUNT', 'tenant_smtp_accounts', newAcc.id);

    return res.status(201).json(newAcc);
  } catch (err) {
    console.error('Create SMTP account error:', err.message);
    return res.status(500).json({ error: 'Échec de la création du compte SMTP: ' + err.message });
  }
};

/**
 * 3. Update an existing SMTP Account
 */
const updateSmtpAccount = async (req, res) => {
  const tenantId = req.user.tenant_id;
  const { id } = req.params;
  const {
    account_name,
    from_name,
    from_email,
    reply_to_email,
    smtp_host,
    smtp_port,
    smtp_secure,
    smtp_user,
    smtp_password,
    is_default,
    is_active
  } = req.body;

  try {
    // Check if account exists
    const checkRes = await req.dbClient.query(
      `SELECT * FROM tenant_smtp_accounts WHERE id = $1 AND tenant_id = $2`,
      [id, tenantId]
    );

    if (checkRes.rowCount === 0) {
      return res.status(404).json({ error: 'Compte SMTP introuvable' });
    }

    const existing = checkRes.rows[0];

    if (is_default) {
      await req.dbClient.query(
        `UPDATE tenant_smtp_accounts SET is_default = false WHERE tenant_id = $1`,
        [tenantId]
      );
    }

    const portNum = smtp_port ? parseInt(smtp_port, 10) : existing.smtp_port;
    const secureVal = smtp_secure !== undefined ? !!smtp_secure : existing.smtp_secure;
    const passwordToUse = (smtp_password && smtp_password.trim().length > 0) ? smtp_password : existing.smtp_password;

    const updateRes = await req.dbClient.query(
      `UPDATE tenant_smtp_accounts
       SET account_name = COALESCE($1, account_name),
           from_name = COALESCE($2, from_name),
           from_email = COALESCE($3, from_email),
           reply_to_email = $4,
           smtp_host = COALESCE($5, smtp_host),
           smtp_port = $6,
           smtp_secure = $7,
           smtp_user = COALESCE($8, smtp_user),
           smtp_password = $9,
           is_default = COALESCE($10, is_default),
           is_active = COALESCE($11, is_active),
           updated_at = NOW()
       WHERE id = $12 AND tenant_id = $13
       RETURNING id, tenant_id, account_name, from_name, from_email, reply_to_email, smtp_host, smtp_port, smtp_secure, smtp_user, is_default, is_active, updated_at`,
      [
        account_name ? account_name.trim() : null,
        from_name ? from_name.trim() : null,
        from_email ? from_email.trim() : null,
        reply_to_email !== undefined ? (reply_to_email ? reply_to_email.trim() : null) : existing.reply_to_email,
        smtp_host ? smtp_host.trim() : null,
        portNum,
        secureVal,
        smtp_user ? smtp_user.trim() : null,
        passwordToUse,
        is_default !== undefined ? !!is_default : null,
        is_active !== undefined ? !!is_active : null,
        id,
        tenantId
      ]
    );

    await logAudit(req, 'UPDATE_SMTP_ACCOUNT', 'tenant_smtp_accounts', id);
    return res.status(200).json(updateRes.rows[0]);
  } catch (err) {
    console.error('Update SMTP account error:', err.message);
    return res.status(500).json({ error: 'Échec de la modification du compte SMTP: ' + err.message });
  }
};

/**
 * 4. Delete an SMTP Account
 */
const deleteSmtpAccount = async (req, res) => {
  const tenantId = req.user.tenant_id;
  const { id } = req.params;

  try {
    const deleteRes = await req.dbClient.query(
      `DELETE FROM tenant_smtp_accounts WHERE id = $1 AND tenant_id = $2 RETURNING id`,
      [id, tenantId]
    );

    if (deleteRes.rowCount === 0) {
      return res.status(404).json({ error: 'Compte SMTP introuvable' });
    }

    await logAudit(req, 'DELETE_SMTP_ACCOUNT', 'tenant_smtp_accounts', id);
    return res.status(200).json({ success: true, message: 'Compte SMTP supprimé avec succès' });
  } catch (err) {
    console.error('Delete SMTP account error:', err.message);
    return res.status(500).json({ error: 'Échec de la suppression du compte SMTP' });
  }
};

/**
 * 5. Test an SMTP Account (Live handshake & test email)
 */
const testSmtpAccount = async (req, res) => {
  const tenantId = req.user.tenant_id;
  const { id } = req.params;
  const { test_recipient_email } = req.body;

  try {
    let config;
    if (id && id !== 'new') {
      const accRes = await req.dbClient.query(
        `SELECT * FROM tenant_smtp_accounts WHERE id = $1 AND tenant_id = $2`,
        [id, tenantId]
      );
      if (accRes.rowCount === 0) {
        return res.status(404).json({ error: 'Compte SMTP introuvable' });
      }
      config = accRes.rows[0];
    } else {
      // Direct config test from form
      config = req.body;
    }

    const testResult = await testSmtpConnection(config, test_recipient_email || req.user.email);

    if (id && id !== 'new') {
      await req.dbClient.query(
        `UPDATE tenant_smtp_accounts SET last_tested_at = NOW(), last_test_status = 'SUCCESS' WHERE id = $1`,
        [id]
      );
    }

    return res.status(200).json(testResult);
  } catch (err) {
    console.error('Test SMTP account error:', err.message);
    if (id && id !== 'new') {
      await req.dbClient.query(
        `UPDATE tenant_smtp_accounts SET last_tested_at = NOW(), last_test_status = 'FAILED' WHERE id = $1`,
        [id]
      ).catch(() => {});
    }
    return res.status(400).json({ error: 'Échec du test SMTP : ' + err.message });
  }
};

/**
 * 6. Set Account as Default
 */
const setDefaultSmtpAccount = async (req, res) => {
  const tenantId = req.user.tenant_id;
  const { id } = req.params;

  try {
    await req.dbClient.query(
      `UPDATE tenant_smtp_accounts SET is_default = false WHERE tenant_id = $1`,
      [tenantId]
    );

    const updateRes = await req.dbClient.query(
      `UPDATE tenant_smtp_accounts SET is_default = true, is_active = true WHERE id = $1 AND tenant_id = $2 RETURNING *`,
      [id, tenantId]
    );

    if (updateRes.rowCount === 0) {
      return res.status(404).json({ error: 'Compte SMTP introuvable' });
    }

    await logAudit(req, 'SET_DEFAULT_SMTP_ACCOUNT', 'tenant_smtp_accounts', id);
    return res.status(200).json({ success: true, account: updateRes.rows[0] });
  } catch (err) {
    console.error('Set default SMTP account error:', err.message);
    return res.status(500).json({ error: 'Échec de la configuration par défaut' });
  }
};

module.exports = {
  getSmtpAccounts,
  createSmtpAccount,
  updateSmtpAccount,
  deleteSmtpAccount,
  testSmtpAccount,
  setDefaultSmtpAccount
};
