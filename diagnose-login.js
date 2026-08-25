const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new Pool({
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

async function diagnose() {
  const client = await pool.connect();
  try {
    await client.query("SET LOCAL app.bypass_rls = 'true'");

    // 1. Check tenant
    const t = await client.query("SELECT id, name, slug, is_active FROM tenants WHERE slug = 'paix'");
    console.log('[Tenant]', t.rows.length ? t.rows[0] : 'NOT FOUND');

    if (t.rows.length === 0) { return; }
    const tenantId = t.rows[0].id;

    // 2. Check user
    const u = await client.query("SELECT id, tenant_id, email, password_hash, role, is_active FROM users WHERE email = 'mbndiaye@gmail.com'");
    console.log('[User]', u.rows.length ? { ...u.rows[0], password_hash: u.rows[0].password_hash.substring(0, 20) + '...' } : 'NOT FOUND');

    if (u.rows.length === 0) { return; }
    
    // 3. Check tenant_id match
    const user = u.rows[0];
    console.log('[Tenant ID match]', user.tenant_id === tenantId ? 'YES' : `NO (user tenant: ${user.tenant_id}, slug tenant: ${tenantId})`);

    // 4. Verify password
    const isMatch = await bcrypt.compare('Soft2026', user.password_hash);
    console.log('[Password "Soft2026" valid]', isMatch);

  } catch (err) {
    console.error('[Error]', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

diagnose();
