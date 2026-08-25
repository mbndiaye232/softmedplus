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

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Add missing columns to patients table
    const migrations = [
      {
        check: `SELECT 1 FROM information_schema.columns WHERE table_name='patients' AND column_name='attending_practitioner_id'`,
        sql: `ALTER TABLE patients ADD COLUMN attending_practitioner_id UUID REFERENCES practitioners(id) ON DELETE SET NULL`,
        desc: 'patients.attending_practitioner_id'
      },
      {
        check: `SELECT 1 FROM information_schema.columns WHERE table_name='patients' AND column_name='status_id'`,
        sql: `ALTER TABLE patients ADD COLUMN status_id UUID NULL`,
        desc: 'patients.status_id'
      },
      {
        check: `SELECT 1 FROM information_schema.columns WHERE table_name='patients' AND column_name='trusted_payer_phone'`,
        sql: `ALTER TABLE patients ADD COLUMN trusted_payer_phone VARCHAR(30) NULL`,
        desc: 'patients.trusted_payer_phone'
      },
      {
        check: `SELECT 1 FROM information_schema.columns WHERE table_name='practitioners' AND column_name='specialty_name'`,
        sql: `ALTER TABLE practitioners ADD COLUMN specialty_name VARCHAR(255) NULL`,
        desc: 'practitioners.specialty_name'
      },
      {
        check: `SELECT 1 FROM information_schema.columns WHERE table_name='practitioners' AND column_name='title'`,
        sql: `ALTER TABLE practitioners ADD COLUMN title VARCHAR(50) NULL DEFAULT 'Dr'`,
        desc: 'practitioners.title'
      },
      {
        check: `SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='preset_name'`,
        sql: `ALTER TABLE users ADD COLUMN preset_name VARCHAR(100) NULL DEFAULT 'DOCTOR'`,
        desc: 'users.preset_name'
      },
      {
        check: `SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='permissions'`,
        sql: `ALTER TABLE users ADD COLUMN permissions JSONB NULL DEFAULT '{}'::jsonb`,
        desc: 'users.permissions'
      }
    ];

    for (const m of migrations) {
      const exists = await client.query(m.check);
      if (exists.rowCount === 0) {
        await client.query(m.sql);
        console.log(`[Added] ${m.desc}`);
      } else {
        console.log(`[Exists] ${m.desc}`);
      }
    }

    // Create patient_statuses table if missing
    const psCheck = await client.query(`SELECT 1 FROM information_schema.tables WHERE table_name='patient_statuses'`);
    if (psCheck.rowCount === 0) {
      await client.query(`
        CREATE TABLE patient_statuses (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
          name VARCHAR(100) NOT NULL,
          code VARCHAR(50) NOT NULL,
          color_code VARCHAR(20) DEFAULT '#6B7280',
          description TEXT,
          sort_order INTEGER DEFAULT 0,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
        ALTER TABLE patient_statuses ENABLE ROW LEVEL SECURITY;
        ALTER TABLE patient_statuses FORCE ROW LEVEL SECURITY;
        DO $$ BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='patient_statuses' AND policyname='tenant_isolation_patient_statuses') THEN
            CREATE POLICY tenant_isolation_patient_statuses ON patient_statuses FOR ALL USING (
              tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid 
              OR current_setting('app.bypass_rls', true) = 'true'
            );
          END IF;
        END $$;
      `);
      console.log('[Created] patient_statuses table with RLS');
    } else {
      console.log('[Exists] patient_statuses table');
    }

    // Add FK constraint for status_id if table exists
    try {
      await client.query(`
        DO $$ BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints 
            WHERE constraint_name = 'fk_patients_status_id' AND table_name = 'patients'
          ) THEN
            ALTER TABLE patients ADD CONSTRAINT fk_patients_status_id 
              FOREIGN KEY (status_id) REFERENCES patient_statuses(id) ON DELETE SET NULL;
          END IF;
        END $$;
      `);
      console.log('[OK] FK patients.status_id -> patient_statuses.id');
    } catch (e) {
      console.log('[Skip FK]', e.message);
    }

    await client.query('COMMIT');
    console.log('\n[Done] All migrations applied successfully!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[Error]', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
