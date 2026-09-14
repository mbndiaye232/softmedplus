const pool = require('../config/db');

async function migratePatientPasswordReset() {
  const client = await pool.connect();
  try {
    console.log('Adding patient email + password reset support...');

    await client.query(`ALTER TABLE patients ADD COLUMN IF NOT EXISTS email VARCHAR(255);`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS patient_password_reset_tokens (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        token VARCHAR(255) NOT NULL UNIQUE,
        expires_at TIMESTAMPTZ NOT NULL,
        used_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_patient_reset_patient ON patient_password_reset_tokens(patient_id);`);

    console.log('Patient email + password reset table added successfully!');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

migratePatientPasswordReset();
