const { logAudit } = require('../middleware/audit');
const { seedTenantMedications } = require('../db/seed_senegal_medications');

// Helper to check if user is the SaaS Super Administrator
const isSaasAdmin = (user) => {
  return user && (user.role === 'SUPER_ADMIN_SAAS' || user.email === 'mbndiaye@gmail.com');
};

// 1. Get current tenant profile
const getTenantProfile = async (req, res) => {
  const tenantId = req.user.tenant_id;
  try {
    let result;
    if (tenantId) {
      result = await req.dbClient.query(
        `SELECT id, name, slug, phone_number, ninea_rc, logo_url, stamp_url, address, email, gps_coordinates, settings 
         FROM tenants WHERE id = $1`,
        [tenantId]
      );
    }
    if (!result || result.rowCount === 0) {
      result = await req.dbClient.query(
        `SELECT id, name, slug, phone_number, ninea_rc, logo_url, stamp_url, address, email, gps_coordinates, settings 
         FROM tenants WHERE is_active = true ORDER BY name ASC LIMIT 1`
      );
    }
    if (!result || result.rowCount === 0) {
      return res.status(404).json({ error: 'Clinic profile not found' });
    }
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Get tenant profile error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve clinic profile' });
  }
};

// 2. Update tenant profile (allowed for Clinic Admins and SaaS Super Admin)
const updateTenantProfile = async (req, res) => {
  if (!isSaasAdmin(req.user) && !['SUPER_ADMIN', 'TENANT_ADMIN', 'ADMIN'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Accès refusé : Seuls les administrateurs de la clinique peuvent modifier les paramètres' });
  }

  const tenantId = req.user.tenant_id;
  const { name, phone_number, ninea_rc, logo_url, stamp_url, address, email, gps_coordinates, settings } = req.body;

  try {
    const result = await req.dbClient.query(
      `UPDATE tenants 
       SET name = COALESCE($1, name), 
           phone_number = COALESCE($2, phone_number), 
           ninea_rc = COALESCE($3, ninea_rc), 
           logo_url = COALESCE($4, logo_url), 
           stamp_url = COALESCE($5, stamp_url), 
           address = COALESCE($6, address), 
           email = COALESCE($7, email), 
           gps_coordinates = COALESCE($8, gps_coordinates), 
           settings = COALESCE($9, settings)
       WHERE id = $10
       RETURNING *`,
      [
        name || null,
        phone_number || null,
        ninea_rc || null,
        logo_url || null,
        stamp_url || null,
        address || null,
        email || null,
        gps_coordinates ? JSON.stringify(gps_coordinates) : null,
        settings ? JSON.stringify(settings) : null,
        tenantId
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Clinic profile not found' });
    }

    await logAudit(req, 'UPDATE_TENANT_PROFILE', 'tenants', tenantId);

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Update tenant profile error:', err.message);
    return res.status(500).json({ error: 'Failed to update clinic profile' });
  }
};

// 3. Get all tenants (STRICTLY restricted to SaaS Super Administrator)
const getAllTenants = async (req, res) => {
  if (!isSaasAdmin(req.user)) {
    return res.status(403).json({ error: 'Accès refusé : Seul le Super-Administrateur SaaS peut voir toutes les cliniques' });
  }

  try {
    // Bypass RLS since we want to view all tenants globally
    await req.dbClient.query(`SELECT set_config('app.bypass_rls', 'true', true)`);

    const result = await req.dbClient.query(
      `SELECT id, name, slug, phone_number, ninea_rc, logo_url, stamp_url, address, email, gps_coordinates, settings, is_active, created_at 
       FROM tenants ORDER BY created_at DESC`
    );
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get all tenants error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve tenants' });
  }
};

// 4. Create new tenant (STRICTLY restricted to SaaS Super Administrator)
const createTenant = async (req, res) => {
  if (!isSaasAdmin(req.user)) {
    return res.status(403).json({ error: 'Accès refusé : Seul le Super-Administrateur SaaS peut créer de nouvelles cliniques depuis ce panneau' });
  }

  const { name, slug, phone_number, ninea_rc, logo_url, stamp_url, address, email, gps_coordinates, settings, admin_email, admin_password, admin_first_name, admin_last_name } = req.body;

  if (!name || !slug || !phone_number) {
    return res.status(400).json({ error: 'Tenant name, slug, and phone number are required' });
  }

  const crypto = require('crypto');
  const bcrypt = require('bcryptjs');

  try {
    // Bypass RLS for initial insertions
    await req.dbClient.query(`SELECT set_config('app.bypass_rls', 'true', true)`);

    // Check slug uniqueness
    const slugCheck = await req.dbClient.query(`SELECT 1 FROM tenants WHERE slug = $1`, [slug.toLowerCase().trim()]);
    if (slugCheck.rowCount > 0) {
      return res.status(409).json({ error: 'Tenant slug is already registered' });
    }

    const tenantId = crypto.randomUUID();

    // Insert Tenant
    const tenantResult = await req.dbClient.query(
      `INSERT INTO tenants (id, name, slug, phone_number, ninea_rc, logo_url, stamp_url, address, email, gps_coordinates, settings, is_active) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, true)
       RETURNING *`,
      [
        tenantId,
        name,
        slug.toLowerCase().trim(),
        phone_number,
        ninea_rc || null,
        logo_url || '/logo-espoir.png',
        stamp_url || null,
        address || null,
        email || null,
        gps_coordinates ? JSON.stringify(gps_coordinates) : null,
        settings ? JSON.stringify(settings) : JSON.stringify({ currency: 'XOF', deposit_rate: 0.20, grace_period_days: 30 })
      ]
    );

    const newTenant = tenantResult.rows[0];

    // Seed default payment methods
    const paymentMethods = [
      { provider: 'WAVE', name: 'Wave Caisse Pro', number: '+221770000000' },
      { provider: 'ORANGE_MONEY', name: 'Orange Money Marchand', number: '+221770000001' },
      { provider: 'FREE_MONEY', name: 'Free Money Pro', number: '+221760000000' },
      { provider: 'EXP_ORANGE_MONEY', name: 'Orange Money Exp', number: '+221770000002' }
    ];

    for (const pm of paymentMethods) {
      await req.dbClient.query(
        `INSERT INTO tenant_payment_methods (id, tenant_id, provider, name, credentials, is_active) 
         VALUES ($1, $2, $3, $4, $5, false)`,
        pm
      );
    }

    // Insert tenant admin user if credentials provided
    if (admin_email && admin_password) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(admin_password, salt);

      const isSaasSuper = admin_email.toLowerCase().trim() === 'mbndiaye@gmail.com';
      const roleToAssign = isSaasSuper ? 'SUPER_ADMIN_SAAS' : 'TENANT_ADMIN';

      await req.dbClient.query(
        `INSERT INTO users (id, tenant_id, email, password_hash, first_name, last_name, role, preset_name) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          crypto.randomUUID(),
          tenantId,
          admin_email.toLowerCase().trim(),
          passwordHash,
          admin_first_name || 'Admin',
          admin_last_name || name,
          roleToAssign,
          isSaasSuper ? 'SUPER_ADMIN_SAAS' : 'ADMIN'
        ]
      );
    }

    // Automatically seed official Senegalese medications inventory for the new clinic
    try {
      await seedTenantMedications(req.dbClient, tenantId, name);
    } catch (seedErr) {
      console.warn('Could not auto-seed medications for new tenant:', seedErr.message);
    }

    await logAudit(req, 'CREATE_TENANT', 'tenants', tenantId);

    return res.status(201).json(newTenant);
  } catch (err) {
    console.error('Create tenant error:', err.message);
    return res.status(500).json({ error: 'Failed to create tenant: ' + err.message });
  }
};

// 5. Update tenant by ID (STRICTLY restricted to SaaS Super Administrator)
const updateTenant = async (req, res) => {
  if (!isSaasAdmin(req.user)) {
    return res.status(403).json({ error: 'Accès refusé : Seul le Super-Administrateur SaaS peut modifier les cliniques' });
  }

  const { id } = req.params;
  const { name, phone_number, ninea_rc, logo_url, address, email, gps_coordinates, settings, is_active } = req.body;

  try {
    await req.dbClient.query(`SELECT set_config('app.bypass_rls', 'true', true)`);

    const result = await req.dbClient.query(
      `UPDATE tenants 
       SET name = COALESCE($1, name), 
           phone_number = COALESCE($2, phone_number), 
           ninea_rc = COALESCE($3, ninea_rc), 
           logo_url = COALESCE($4, logo_url), 
           address = COALESCE($5, address), 
           email = COALESCE($6, email), 
           gps_coordinates = COALESCE($7, gps_coordinates), 
           settings = COALESCE($8, settings),
           is_active = COALESCE($9, is_active)
       WHERE id = $10
       RETURNING *`,
      [
        name !== undefined ? name : null,
        phone_number !== undefined ? phone_number : null,
        ninea_rc !== undefined ? ninea_rc : null,
        logo_url !== undefined ? logo_url : null,
        address !== undefined ? address : null,
        email !== undefined ? email : null,
        gps_coordinates !== undefined ? (gps_coordinates ? JSON.stringify(gps_coordinates) : null) : null,
        settings !== undefined ? (settings ? JSON.stringify(settings) : null) : null,
        is_active !== undefined ? is_active : null,
        id
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    await logAudit(req, 'UPDATE_TENANT', 'tenants', id);

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Update tenant error:', err.message);
    return res.status(500).json({ error: 'Failed to update tenant: ' + err.message });
  }
};

// 6. Delete tenant (STRICTLY restricted to SaaS Super Administrator)
const deleteTenant = async (req, res) => {
  if (!isSaasAdmin(req.user)) {
    return res.status(403).json({ error: 'Accès refusé : Seul le Super-Administrateur SaaS peut supprimer des cliniques' });
  }

  const { id } = req.params;

  try {
    await req.dbClient.query(`SELECT set_config('app.bypass_rls', 'true', true)`);

    const result = await req.dbClient.query(
      `DELETE FROM tenants WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    await logAudit(req, 'DELETE_TENANT', 'tenants', id);

    return res.status(200).json({ message: 'Tenant and all associated data deleted successfully', tenant: result.rows[0] });
  } catch (err) {
    console.error('Delete tenant error:', err.message);
    return res.status(500).json({ error: 'Failed to delete tenant: ' + err.message });
  }
};

module.exports = {
  getTenantProfile,
  updateTenantProfile,
  getAllTenants,
  createTenant,
  updateTenant,
  deleteTenant
};

module.exports = {
  getTenantProfile,
  updateTenantProfile,
  getAllTenants,
  createTenant,
  updateTenant,
  deleteTenant
};
