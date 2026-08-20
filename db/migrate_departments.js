const pool = require('../config/db');

async function migrateDepartments() {
  const client = await pool.connect();
  try {
    console.log('Starting migration for Medical Departments (Services Hospitaliers)...');

    // 1. Create medical_departments table
    await client.query(`
      CREATE TABLE IF NOT EXISTS medical_departments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        code VARCHAR(50) NOT NULL,
        name VARCHAR(100) NOT NULL,
        specialty_id UUID REFERENCES medical_specialties(id) ON DELETE SET NULL,
        head_practitioner_id UUID REFERENCES practitioners(id) ON DELETE SET NULL,
        building_id UUID REFERENCES hospital_buildings(id) ON DELETE SET NULL,
        location VARCHAR(100),
        description TEXT,
        color_code VARCHAR(7) DEFAULT '#4a90e2',
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    // Add unique constraint on (tenant_id, code)
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'unique_tenant_department_code'
        ) THEN
          ALTER TABLE medical_departments ADD CONSTRAINT unique_tenant_department_code UNIQUE (tenant_id, code);
        END IF;
      END $$;
    `);

    // 2. Create practitioner_departments junction table
    await client.query(`
      CREATE TABLE IF NOT EXISTS practitioner_departments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        practitioner_id UUID NOT NULL REFERENCES practitioners(id) ON DELETE CASCADE,
        department_id UUID NOT NULL REFERENCES medical_departments(id) ON DELETE CASCADE,
        role_in_department VARCHAR(100) DEFAULT 'Praticien Titulaire',
        is_primary BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    // Add unique constraint on (practitioner_id, department_id)
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'unique_practitioner_department'
        ) THEN
          ALTER TABLE practitioner_departments ADD CONSTRAINT unique_practitioner_department UNIQUE (practitioner_id, department_id);
        END IF;
      END $$;
    `);

    // 3. Alter medical_services table to optionally reference department and specialty
    await client.query(`
      ALTER TABLE medical_services ADD COLUMN IF NOT EXISTS department_id UUID REFERENCES medical_departments(id) ON DELETE SET NULL;
      ALTER TABLE medical_services ADD COLUMN IF NOT EXISTS specialty_id UUID REFERENCES medical_specialties(id) ON DELETE SET NULL;
    `);

    // 4. Seed standard departments for all tenants, linking them to existing specialties
    const defaultDepartments = [
      { code: 'SERV-MEDGEN', name: 'Service de Médecine Générale & Consultations', specialtyCode: 'MED-GEN', color: '#10b981', location: 'RDC - Aile Consultations' },
      { code: 'SERV-CARDIO', name: 'Service de Cardiologie & Maladies Vasculaires', specialtyCode: 'CARDIO', color: '#ef4444', location: '1er Étage - Pavillon Médical' },
      { code: 'SERV-GASTRO', name: 'Service de Gastro-entérologie & Hépatologie', specialtyCode: 'GASTRO', color: '#f59e0b', location: '1er Étage - Aile Ouest' },
      { code: 'SERV-PED', name: 'Service de Pédiatrie & Néonatalogie', specialtyCode: 'PED', color: '#3b82f6', location: '2ème Étage - Pavillon Mère-Enfant' },
      { code: 'SERV-GYN', name: 'Service de Gynécologie-Obstétrique & Maternité', specialtyCode: 'GYN-OBS', color: '#ec4899', location: '2ème Étage - Maternité' },
      { code: 'SERV-DERMA', name: 'Service de Dermatologie & Vénérologie', specialtyCode: 'DERMA', color: '#8b5cf6', location: 'RDC - Consultations Spécialisées' },
      { code: 'SERV-OPHTA', name: "Service d'Ophtalmologie & Soins Oculaires", specialtyCode: 'OPHTA', color: '#06b6d4', location: 'RDC - Aile Spécialités' },
      { code: 'SERV-NEURO', name: 'Service de Neurologie', specialtyCode: 'NEURO', color: '#6366f1', location: '3ème Étage' },
      { code: 'SERV-CHIR', name: 'Service de Chirurgie Générale & Bloc Opératoire', specialtyCode: 'CHIR-GEN', color: '#dc2626', location: 'Bloc Central' },
      { code: 'SERV-ORL', name: "Service d'Oto-Rhino-Laryngologie (ORL)", specialtyCode: 'ORL', color: '#14b8a6', location: 'RDC - Consultations Spécialisées' }
    ];

    const tenants = await client.query('SELECT id FROM tenants');
    for (const t of tenants.rows) {
      for (const dept of defaultDepartments) {
        // Find matching specialty
        const specRes = await client.query(
          'SELECT id FROM medical_specialties WHERE tenant_id = $1 AND code = $2',
          [t.id, dept.specialtyCode]
        );
        const specialtyId = specRes.rowCount > 0 ? specRes.rows[0].id : null;

        await client.query(`
          INSERT INTO medical_departments (tenant_id, code, name, specialty_id, color_code, location, is_active)
          VALUES ($1, $2, $3, $4, $5, $6, true)
          ON CONFLICT (tenant_id, code) DO UPDATE 
          SET specialty_id = COALESCE(medical_departments.specialty_id, EXCLUDED.specialty_id)
        `, [t.id, dept.code, dept.name, specialtyId, dept.color, dept.location]);
      }

      // Attach existing practitioners to their primary department if not already attached
      const practitioners = await client.query('SELECT id, is_general_practitioner, specialty_name FROM practitioners WHERE tenant_id = $1', [t.id]);
      for (const prac of practitioners.rows) {
        let targetDeptCode = 'SERV-MEDGEN';
        if (!prac.is_general_practitioner) {
          // Find department from practitioner's specialties
          const pracSpecs = await client.query(
            'SELECT s.code FROM practitioner_specialties ps JOIN medical_specialties s ON ps.specialty_id = s.id WHERE ps.practitioner_id = $1 LIMIT 1',
            [prac.id]
          );
          if (pracSpecs.rowCount > 0) {
            const specCode = pracSpecs.rows[0].code;
            const matchedDept = defaultDepartments.find(d => d.specialtyCode === specCode);
            if (matchedDept) targetDeptCode = matchedDept.code;
          }
        }

        const deptRes = await client.query('SELECT id FROM medical_departments WHERE tenant_id = $1 AND code = $2', [t.id, targetDeptCode]);
        if (deptRes.rowCount > 0) {
          await client.query(`
            INSERT INTO practitioner_departments (tenant_id, practitioner_id, department_id, role_in_department, is_primary)
            VALUES ($1, $2, $3, 'Praticien Titulaire', true)
            ON CONFLICT (practitioner_id, department_id) DO NOTHING
          `, [t.id, prac.id, deptRes.rows[0].id]);
        }
      }
    }

    console.log('Migration & Seeding for Medical Departments completed successfully!');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

migrateDepartments();
