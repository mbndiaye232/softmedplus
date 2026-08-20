const pool = require('../config/db');

async function migratePractitionersAndSpecialties() {
  const client = await pool.connect();
  try {
    console.log('Starting migration for Specialties and Practitioners multi-specialty support...');

    // 1. Create medical_specialties table
    await client.query(`
      CREATE TABLE IF NOT EXISTS medical_specialties (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        code VARCHAR(50) NOT NULL,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        color_code VARCHAR(7) DEFAULT '#4a90e2',
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    // Add unique constraint on (tenant_id, code) if not exists
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'unique_tenant_specialty_code'
        ) THEN
          ALTER TABLE medical_specialties ADD CONSTRAINT unique_tenant_specialty_code UNIQUE (tenant_id, code);
        END IF;
      END $$;
    `);

    // 2. Alter practitioners table to add new columns
    await client.query(`
      ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS grade VARCHAR(100) DEFAULT 'Docteur en Médecine';
      ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS is_general_practitioner BOOLEAN NOT NULL DEFAULT false;
      ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS phone_number VARCHAR(30);
      ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS email VARCHAR(255);
      ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS consultation_fee NUMERIC(10, 2) DEFAULT 15000;
    `);

    // 3. Create practitioner_specialties junction table
    await client.query(`
      CREATE TABLE IF NOT EXISTS practitioner_specialties (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        practitioner_id UUID NOT NULL REFERENCES practitioners(id) ON DELETE CASCADE,
        specialty_id UUID NOT NULL REFERENCES medical_specialties(id) ON DELETE CASCADE,
        is_primary BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    // Add unique constraint on (practitioner_id, specialty_id)
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'unique_practitioner_specialty'
        ) THEN
          ALTER TABLE practitioner_specialties ADD CONSTRAINT unique_practitioner_specialty UNIQUE (practitioner_id, specialty_id);
        END IF;
      END $$;
    `);

    // 4. Seed standard specialties for all active tenants
    const defaultSpecialties = [
      { code: 'MED-GEN', name: 'Médecine Générale', description: 'Consultations générales, médecine préventive et soins de santé primaire', color: '#10b981' },
      { code: 'CARDIO', name: 'Cardiologie', description: 'Maladies du cœur et des vaisseaux sanguins, ECG, hypertension', color: '#ef4444' },
      { code: 'GASTRO', name: 'Gastro-entérologie', description: 'Système digestif, foie, estomac, endoscopie digestive', color: '#f59e0b' },
      { code: 'PED', name: 'Pédiatrie', description: 'Santé et développement des nourrissons, enfants et adolescents', color: '#3b82f6' },
      { code: 'GYN-OBS', name: 'Gynécologie-Obstétrique', description: 'Santé de la femme, suivi de grossesse, accouchement, PMA', color: '#ec4899' },
      { code: 'DERMA', name: 'Dermatologie', description: 'Affections de la peau, muqueuses, ongles et cheveux', color: '#8b5cf6' },
      { code: 'OPHTA', name: 'Ophtalmologie', description: 'Vision, chirurgie oculaire, réfraction et maladies des yeux', color: '#06b6d4' },
      { code: 'NEURO', name: 'Neurologie', description: 'Système nerveux central et périphérique, cerveau et moelle', color: '#6366f1' },
      { code: 'CHIR-GEN', name: 'Chirurgie Générale', description: 'Interventions chirurgicales viscérales et traumatologiques', color: '#dc2626' },
      { code: 'ORL', name: 'Oto-Rhino-Laryngologie (ORL)', description: 'Oreille, nez, gorge, cou et glandes salivaires', color: '#14b8a6' }
    ];

    const tenants = await client.query('SELECT id FROM tenants');
    for (const t of tenants.rows) {
      for (const spec of defaultSpecialties) {
        await client.query(`
          INSERT INTO medical_specialties (tenant_id, code, name, description, color_code, is_active)
          VALUES ($1, $2, $3, $4, $5, true)
          ON CONFLICT (tenant_id, code) DO NOTHING
        `, [t.id, spec.code, spec.name, spec.description, spec.color]);
      }
    }

    console.log('Migration & Seeding for Specialties & Practitioners completed successfully!');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

migratePractitionersAndSpecialties();
