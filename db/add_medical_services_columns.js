const pool = require('../config/db');

async function migrateMedicalServices() {
  const client = await pool.connect();
  try {
    console.log('Ensuring medical_services table & columns exist...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS medical_services (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        practitioner_id UUID REFERENCES practitioners(id) ON DELETE SET NULL,
        category VARCHAR(50) NOT NULL DEFAULT 'CONSULTATION',
        code VARCHAR(50) NOT NULL,
        name VARCHAR(200) NOT NULL,
        description TEXT,
        duration_minutes INT DEFAULT 30,
        price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
        deposit_amount NUMERIC(12, 2) DEFAULT 0.00,
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      ALTER TABLE medical_services ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'CONSULTATION';
      ALTER TABLE medical_services ADD COLUMN IF NOT EXISTS description TEXT;
      ALTER TABLE medical_services ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
    `);
    console.log('Successfully updated medical_services table.');

    // Seed standard starter acts/tarifs for existing tenants if empty
    const tenants = await client.query('SELECT id FROM tenants');
    for (const t of tenants.rows) {
      const check = await client.query('SELECT 1 FROM medical_services WHERE tenant_id = $1 LIMIT 1', [t.id]);
      if (check.rowCount === 0) {
        await client.query(`
          INSERT INTO medical_services (tenant_id, code, name, category, price, duration_minutes)
          VALUES 
            ($1, 'CONS-GEN', 'Consultation Médecine Générale', 'CONSULTATION', 15000, 30),
            ($1, 'CONS-SPEC', 'Consultation Spécialiste', 'CONSULTATION', 25000, 45),
            ($1, 'PERF-SANG', 'Perfusion Sanguine', 'TRAITEMENT', 10000, 60),
            ($1, 'PANSM-COMP', 'Pansement Complexe & Soins', 'TRAITEMENT', 8000, 30),
            ($1, 'INJ-IV', 'Injection Intraveineuse (IV / IM)', 'SOIN', 3000, 15),
            ($1, 'ECHO-ABD', 'Échographie Abdomino-Pelvienne', 'ANALYSE', 30000, 30),
            ($1, 'NFS-BIO', 'Bilan Sanguin NFS & Glycémie', 'ANALYSE', 12000, 15)
        `, [t.id]);
      }
    }
    console.log('Default medical services seeded for all clinics.');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

migrateMedicalServices();
