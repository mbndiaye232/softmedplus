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
    await client.query('BEGIN');
    await client.query("SET LOCAL app.bypass_rls = 'true'");

    // 1. Check tenant
    const t = await client.query("SELECT id, name, slug, is_active FROM tenants WHERE slug = 'paix'");
    console.log('[Tenant]', t.rows.length ? t.rows[0] : 'NOT FOUND');

    // 2. Search user across ALL tenants
    const u = await client.query("SELECT id, tenant_id, email, password_hash, role, is_active FROM users WHERE email = 'mbndiaye@gmail.com'");
    console.log('[User count]', u.rows.length);
    
    if (u.rows.length > 0) {
      for (const user of u.rows) {
        console.log('[User]', { id: user.id, tenant_id: user.tenant_id, role: user.role, is_active: user.is_active });
        
        // Check tenant_id match
        if (t.rows.length > 0) {
          console.log('[Tenant ID match]', user.tenant_id === t.rows[0].id ? 'YES' : `NO (user: ${user.tenant_id}, paix: ${t.rows[0].id})`);
        }

        // Verify password
        const isMatch = await bcrypt.compare('Soft2026', user.password_hash);
        console.log('[Password "Soft2026" valid]', isMatch);
      }
    } else {
      console.log('[User] NOT FOUND even with RLS bypassed');
      
      // Count all users
      const allUsers = await client.query("SELECT email, tenant_id, role FROM users LIMIT 10");
      console.log('[All users in DB]', allUsers.rows);
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[Error]', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

diagnose();
