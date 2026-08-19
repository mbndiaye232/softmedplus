const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'clinicos-jwt-super-secret-key-2026';

// 1. Multi-Tenant Login
const login = async (req, res) => {
  const { tenant_slug, email, password } = req.body;

  if (!tenant_slug || !email || !password) {
    return res.status(400).json({ error: 'Tenant slug, email, and password are required' });
  }

  try {
    // A. Fetch tenant by slug (un-isolated query to pool directly)
    const tenantRes = await pool.query(
      `SELECT id, name, is_active FROM tenants WHERE slug = $1`,
      [tenant_slug.toLowerCase().trim()]
    );

    if (tenantRes.rowCount === 0) {
      return res.status(404).json({ error: 'Clinic/Tenant not found' });
    }

    const tenant = tenantRes.rows[0];
    if (!tenant.is_active) {
      return res.status(403).json({ error: 'This tenant account has been deactivated' });
    }

    // B. Fetch user within the tenant (un-isolated query to pool directly)
    const userRes = await pool.query(
      `SELECT id, tenant_id, email, password_hash, first_name, last_name, role, is_active 
       FROM users WHERE tenant_id = $1 AND email = $2`,
      [tenant.id, email.toLowerCase().trim()]
    );

    if (userRes.rowCount === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = userRes.rows[0];
    if (!user.is_active) {
      return res.status(403).json({ error: 'User account is deactivated' });
    }

    // C. Verify password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // D. Generate JWT
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
      { expiresIn: '24h' }
    );

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
        id: tenant.id,
        name: tenant.name,
        slug: tenant_slug
      }
    });
  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({ error: 'Internal server error during login' });
  }
};

const registerTenant = async (req, res) => {
  const { tenant_name, tenant_slug, phone_number, ninea_rc, email, password, first_name, last_name, logo_url, address, gps_coordinates, payment_methods } = req.body;

  if (!tenant_name || !tenant_slug || !phone_number || !email || !password || !first_name || !last_name) {
    return res.status(400).json({ error: 'All primary fields are required' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

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
      `INSERT INTO tenants (id, name, slug, phone_number, ninea_rc, logo_url, address, email, gps_coordinates, settings) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        tenantId,
        tenant_name,
        tenant_slug.toLowerCase().trim(),
        phone_number,
        ninea_rc || null,
        logo_url || '/logo-espoir.png',
        address || null,
        email.toLowerCase().trim(), // tenant contact email defaults to superadmin email
        gps_coordinates ? JSON.stringify(gps_coordinates) : null,
        JSON.stringify({ currency: 'XOF', deposit_rate: 0.20, grace_period_days: 30 })
      ]
    );

    // C. Initialize Default Online Payment configurations
    const activeProviders = Array.isArray(payment_methods) ? payment_methods : [];
    const paymentMethodsList = [
      [crypto.randomUUID(), tenantId, 'WAVE', 'Wave Caisse', JSON.stringify({ phone_number: '', merchant_id: '' }), activeProviders.includes('WAVE')],
      [crypto.randomUUID(), tenantId, 'ORANGE_MONEY', 'Orange Money Caisse', JSON.stringify({ phone_number: '', merchant_code: '' }), activeProviders.includes('ORANGE_MONEY')],
      [crypto.randomUUID(), tenantId, 'SPI', 'Virement SPI', JSON.stringify({ bank_name: '', account_number: '' }), activeProviders.includes('SPI')],
      [crypto.randomUUID(), tenantId, 'YAS', 'Yas Pay', JSON.stringify({ api_key: '' }), activeProviders.includes('YAS')],
      [crypto.randomUUID(), tenantId, 'CARTE_BANCAIRE', 'Paiement Carte', JSON.stringify({ provider: 'Stripe', public_key: '' }), activeProviders.includes('CARTE_BANCAIRE')]
    ];
    for (const pm of paymentMethodsList) {
      await client.query(
        `INSERT INTO tenant_payment_methods (id, tenant_id, provider, name, credentials, is_active) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        pm
      );
    }

    // D. Hash Super Admin password and Insert User
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await client.query(
      `INSERT INTO users (id, tenant_id, email, password_hash, first_name, last_name, role) 
       VALUES ($1, $2, $3, $4, $5, $6, 'SUPER_ADMIN')`,
      [
        userId,
        tenantId,
        email.toLowerCase().trim(),
        passwordHash,
        first_name,
        last_name
      ]
    );

    await client.query('COMMIT');

    // E. Generate JWT for the newly registered super-admin
    const token = jwt.sign(
      {
        id: userId,
        tenant_id: tenantId,
        email: email.toLowerCase().trim(),
        role: 'SUPER_ADMIN',
        first_name,
        last_name
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(201).json({
      token,
      user: {
        id: userId,
        email: email.toLowerCase().trim(),
        role: 'SUPER_ADMIN',
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

module.exports = {
  login,
  registerTenant
};
