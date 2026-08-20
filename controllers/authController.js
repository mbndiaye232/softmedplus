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

    // E. Create default practitioner for the clinic
    const practitionerId = crypto.randomUUID();
    await client.query(
      `INSERT INTO practitioners (id, tenant_id, user_id, first_name, last_name, specialty_name, license_number, color_code, status, is_active)
       VALUES ($1, $2, $3, $4, $5, 'Médecine Générale', 'LIC-001', '#4A90E2', 'Interne', true)`,
      [practitionerId, tenantId, userId, first_name, last_name]
    );

    // F. Create default Consultation medical service
    await client.query(
      `INSERT INTO medical_services (id, tenant_id, code, name, duration_minutes, price, deposit_amount, practitioner_id, is_active)
       VALUES ($1, $2, 'CS-GEN', 'Consultation Générale', 30, 15000.00, 3000.00, $3, true)`,
      [crypto.randomUUID(), tenantId, practitionerId]
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
