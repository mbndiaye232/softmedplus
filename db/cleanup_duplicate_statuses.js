const pool = require('../config/db');

async function cleanupDuplicates() {
  const client = await pool.connect();
  try {
    console.log('Cleaning up duplicate patient_statuses...');

    // Deduplicate: Keep only the first status per (tenant_id, code) or (tenant_id, name)
    await client.query(`
      DELETE FROM patient_statuses a
      USING patient_statuses b
      WHERE a.id > b.id 
        AND a.tenant_id = b.tenant_id 
        AND (a.code = b.code OR LOWER(a.name) = LOWER(b.name));
    `);

    // Add UNIQUE constraint on (tenant_id, code) if not exists
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'unique_tenant_status_code'
        ) THEN
          ALTER TABLE patient_statuses ADD CONSTRAINT unique_tenant_status_code UNIQUE (tenant_id, code);
        END IF;
      END $$;
    `);

    const countRes = await client.query(`SELECT COUNT(*) FROM patient_statuses`);
    console.log(`Deduplication complete. Total distinct statuses in DB: ${countRes.rows[0].count}`);
  } catch (err) {
    console.error('Cleanup error:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

cleanupDuplicates();
