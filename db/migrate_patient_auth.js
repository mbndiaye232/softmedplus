const pool = require('../config/db');

async function migratePatientAuth() {
  const client = await pool.connect();
  try {
    console.log('Adding patient password + optional SMS 2FA support...');

    await client.query(`ALTER TABLE patients ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);`);
    await client.query(`ALTER TABLE patients ADD COLUMN IF NOT EXISTS two_factor_enabled BOOLEAN NOT NULL DEFAULT false;`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS patient_otp_codes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        code_hash VARCHAR(255) NOT NULL,
        attempts INT NOT NULL DEFAULT 0,
        expires_at TIMESTAMPTZ NOT NULL,
        used_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_patient_otp_patient ON patient_otp_codes(patient_id);`);

    console.log('Patient auth columns/table added successfully!');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

migratePatientAuth();
