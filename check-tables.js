const { Pool } = require('pg');

const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new Pool({
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

async function checkTables() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query("SET LOCAL app.bypass_rls = 'true'");

    // List all tables
    const tables = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);
    console.log('[Tables in DB]');
    tables.rows.forEach(r => console.log('  -', r.table_name));

    // Test the exact getPatients query
    const tenantRes = await client.query("SELECT id FROM tenants WHERE slug = 'paix'");
    if (tenantRes.rows.length > 0) {
      const tenantId = tenantRes.rows[0].id;
      try {
        const result = await client.query(`
          SELECT p.*, 
                 ps.name AS status_name, ps.color_code AS status_color, ps.code AS status_code,
                 pip.insurance_company_id, pip.policy_number, pip.coverage_rate_percent,
                 ic.name AS insurance_name, ic.code AS insurance_code,
                 doc.first_name AS doc_first, doc.last_name AS doc_last, doc.title AS doc_title,
                 doc.specialty_name AS doc_specialty
          FROM patients p
          LEFT JOIN patient_statuses ps ON p.status_id = ps.id
          LEFT JOIN patient_insurance_policies pip ON p.id = pip.patient_id AND pip.is_primary = true
          LEFT JOIN insurance_companies ic ON pip.insurance_company_id = ic.id
          LEFT JOIN practitioners doc ON p.attending_practitioner_id = doc.id
          WHERE p.tenant_id = $1
          ORDER BY p.created_at DESC
        `, [tenantId]);
        console.log('\n[getPatients query OK] Rows:', result.rowCount);
      } catch (queryErr) {
        console.log('\n[getPatients query FAILED]', queryErr.message);
      }
    }

    await client.query('COMMIT');
  } catch (err) {
    console.error('[Error]', err.message);
    await client.query('ROLLBACK');
  } finally {
    client.release();
    await pool.end();
  }
}

checkTables();
