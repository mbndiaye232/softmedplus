const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Support both connectionString (Render PostgreSQL) or separate config variables
const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new Pool({
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

async function createAdmin() {
  const tenantSlug = 'paix';
  const tenantName = 'Clinique de la Paix';
  const email = 'mbndiaye@gmail.com';
  const password = 'Soft2026';
  const firstName = 'Mame Mbaye';
  const lastName = 'NDIAYE';

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query("SET LOCAL app.bypass_rls = 'true'");

    // 1. Get or Create Tenant
    let tenantId;
    const tenantRes = await client.query('SELECT id FROM tenants WHERE slug = $1', [tenantSlug]);
    if (tenantRes.rowCount > 0) {
      tenantId = tenantRes.rows[0].id;
      console.log(`[Info] Tenant "${tenantSlug}" already exists with ID: ${tenantId}`);
    } else {
      tenantId = crypto.randomUUID();
      await client.query(
        `INSERT INTO tenants (id, name, slug, phone_number, settings, is_active) 
         VALUES ($1, $2, $3, $4, $5, true)`,
        [
          tenantId,
          tenantName,
          tenantSlug,
          '+221330000000',
          JSON.stringify({ currency: 'XOF', deposit_rate: 0.20, grace_period_days: 30 })
        ]
      );
      console.log(`[Success] Tenant "${tenantName}" (slug: "${tenantSlug}") created.`);

      // Initialize default payment methods
      const paymentMethodsList = [
        [crypto.randomUUID(), tenantId, 'WAVE', 'Wave Caisse', JSON.stringify({ phone_number: '', merchant_id: '' })],
        [crypto.randomUUID(), tenantId, 'ORANGE_MONEY', 'Orange Money Caisse', JSON.stringify({ phone_number: '', merchant_code: '' })],
        [crypto.randomUUID(), tenantId, 'SPI', 'Virement SPI', JSON.stringify({ bank_name: '', account_number: '' })],
        [crypto.randomUUID(), tenantId, 'YAS', 'Yas Pay', JSON.stringify({ api_key: '' })],
        [crypto.randomUUID(), tenantId, 'CARTE_BANCAIRE', 'Paiement Carte', JSON.stringify({ provider: 'Stripe', public_key: '' })]
      ];
      for (const pm of paymentMethodsList) {
        await client.query(
          `INSERT INTO tenant_payment_methods (id, tenant_id, provider, name, credentials, is_active) 
           VALUES ($1, $2, $3, $4, $5, true)`,
          pm
        );
      }
      console.log(`[Success] Seeded default payment methods for tenant "${tenantSlug}".`);
    }

    // 2. Get or Create User
    const userRes = await client.query('SELECT id FROM users WHERE tenant_id = $1 AND email = $2', [tenantId, email]);
    if (userRes.rowCount > 0) {
      const userId = userRes.rows[0].id;
      const hash = await bcrypt.hash(password, 10);
      await client.query('UPDATE users SET password_hash = $1, first_name = $2, last_name = $3, role = $4 WHERE id = $5', [
        hash,
        firstName,
        lastName,
        'SUPER_ADMIN',
        userId
      ]);
      console.log(`[Success] User "${email}" already existed and has been updated to SUPER_ADMIN with new password.`);
    } else {
      const userId = crypto.randomUUID();
      const hash = await bcrypt.hash(password, 10);
      await client.query(
        `INSERT INTO users (id, tenant_id, email, password_hash, first_name, last_name, role, is_active) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, true)`,
        [
          userId,
          tenantId,
          email,
          hash,
          firstName,
          lastName,
          'SUPER_ADMIN'
        ]
      );
      console.log(`[Success] User "${email}" created as SUPER_ADMIN for tenant "${tenantSlug}".`);
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[Error] Failed to create admin user:', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

createAdmin();
