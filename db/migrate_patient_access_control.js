const pool = require('../config/db');

async function migratePatientAccessControl() {
  console.log('--- Starting Patient Access Control & Medical Confidentiality Migration ---');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Add attending_practitioner_id to patients table
    console.log('Adding attending_practitioner_id to patients table...');
    await client.query(`
      ALTER TABLE patients 
      ADD COLUMN IF NOT EXISTS attending_practitioner_id UUID REFERENCES practitioners(id) ON DELETE SET NULL;
    `);

    // 2. Create patient_record_access_grants table
    console.log('Creating patient_record_access_grants table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS patient_record_access_grants (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
        practitioner_id UUID REFERENCES practitioners(id) ON DELETE CASCADE,
        granted_to_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        granted_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        access_type VARCHAR(20) NOT NULL DEFAULT 'READ_WRITE',
        reason VARCHAR(255) NOT NULL DEFAULT 'Délégation confraternelle / Avis médical',
        expires_at TIMESTAMPTZ NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        CONSTRAINT unique_patient_practitioner_grant UNIQUE(tenant_id, patient_id, practitioner_id)
      );
    `);

    // 3. For any patients without attending_practitioner_id, assign the first available practitioner in their tenant
    console.log('Assigning default attending practitioner to existing patients without one...');
    await client.query(`
      UPDATE patients p
      SET attending_practitioner_id = (
        SELECT pr.id FROM practitioners pr 
        WHERE pr.tenant_id = p.tenant_id AND pr.is_active = true 
        ORDER BY pr.id ASC LIMIT 1
      )
      WHERE p.attending_practitioner_id IS NULL;
    `);

    await client.query('COMMIT');
    console.log('✅ Patient Access Control & Confidentiality migration completed successfully.');
    process.exit(0);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Migration error:', err);
    process.exit(1);
  } finally {
    client.release();
  }
}

migratePatientAccessControl();
