const pool = require('../config/db');

async function migrate() {
  const client = await pool.connect();
  try {
    console.log('--- Starting migration: Durations by Specialty & Doctor Unavailabilities ---');

    // 1. Add default_duration_minutes to medical_specialties
    await client.query(`
      ALTER TABLE medical_specialties 
      ADD COLUMN IF NOT EXISTS default_duration_minutes INT NOT NULL DEFAULT 15;
    `);
    console.log('✓ Added default_duration_minutes column to medical_specialties');

    // 2. Set realistic durations by specialty code
    const specialtyDurations = [
      { code: 'CARDIO', duration: 15, name: 'Cardiologie' },
      { code: 'MED-GEN', duration: 15, name: 'Médecine Générale' },
      { code: 'PED', duration: 20, name: 'Pédiatrie' },
      { code: 'GYN-OBS', duration: 30, name: 'Gynécologie' },
      { code: 'OPHTA', duration: 20, name: 'Ophtalmologie' },
      { code: 'ORL', duration: 20, name: 'Oto-Rhino' },
      { code: 'DERMA', duration: 15, name: 'Dermatologie' },
      { code: 'RAD', duration: 30, name: 'Radiologie' },
      { code: 'CHIR-GEN', duration: 30, name: 'Chirurgie' },
      { code: 'DEN', duration: 30, name: 'Dentaire' },
      { code: 'NEURO', duration: 30, name: 'Neurologie' },
      { code: 'GASTRO', duration: 20, name: 'Gastro' }
    ];

    for (const item of specialtyDurations) {
      await client.query(
        `UPDATE medical_specialties SET default_duration_minutes = $1 WHERE UPPER(code) = UPPER($2) OR LOWER(name) LIKE LOWER($3)`,
        [item.duration, item.code, `%${item.name}%`]
      );
    }
    console.log('✓ Updated default durations for medical specialties');

    // 3. Update medical_services duration_minutes based on their specialty
    await client.query(`
      UPDATE medical_services ms
      SET duration_minutes = COALESCE(s.default_duration_minutes, 15)
      FROM medical_specialties s
      WHERE ms.specialty_id = s.id AND (ms.duration_minutes IS NULL OR ms.duration_minutes = 60 OR ms.duration_minutes = 30);
    `);
    console.log('✓ Synchronized medical_services duration_minutes with specialties');

    // 4. Create practitioner_unavailabilities table
    await client.query(`
      CREATE TABLE IF NOT EXISTS practitioner_unavailabilities (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        practitioner_id UUID NOT NULL REFERENCES practitioners(id) ON DELETE CASCADE,
        start_time TIMESTAMPTZ NOT NULL,
        end_time TIMESTAMPTZ NOT NULL,
        reason VARCHAR(255) NOT NULL DEFAULT 'Indisponibilité / Congé',
        all_day BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        CONSTRAINT check_unavail_range CHECK (end_time > start_time)
      );
    `);
    console.log('✓ Created practitioner_unavailabilities table');

    // 5. Index for fast availability queries
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_unavail_doc_range 
      ON practitioner_unavailabilities (practitioner_id, start_time, end_time);
    `);
    console.log('✓ Created index on practitioner_unavailabilities');

    console.log('--- Migration completed successfully ---');
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    client.release();
    pool.end();
  }
}

migrate();
