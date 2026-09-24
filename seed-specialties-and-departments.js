const { Pool } = require('pg');
const crypto = require('crypto');
// Sans cela, DATABASE_URL n'est pas lue depuis .env et le script se rabat
// silencieusement sur une base locale.
require('dotenv').config();

const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new Pool({
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

async function seedData() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query("SET LOCAL app.bypass_rls = 'true'");

    console.log('--- Création des tables & contraintes si manquantes ---');

    // 1. Table medical_specialties
    await client.query(`
      CREATE TABLE IF NOT EXISTS medical_specialties (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        code VARCHAR(50) NOT NULL,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        color_code VARCHAR(20) DEFAULT '#4a90e2',
        default_duration_minutes INTEGER DEFAULT 15,
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      ALTER TABLE medical_specialties ADD COLUMN IF NOT EXISTS default_duration_minutes INTEGER DEFAULT 15;
      ALTER TABLE medical_specialties ADD COLUMN IF NOT EXISTS color_code VARCHAR(20) DEFAULT '#4a90e2';
      ALTER TABLE medical_specialties ADD COLUMN IF NOT EXISTS description TEXT;
      ALTER TABLE medical_specialties ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;

      ALTER TABLE medical_specialties ENABLE ROW LEVEL SECURITY;
      ALTER TABLE medical_specialties FORCE ROW LEVEL SECURITY;
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='medical_specialties' AND policyname='tenant_isolation_medical_specialties') THEN
          CREATE POLICY tenant_isolation_medical_specialties ON medical_specialties FOR ALL USING (
            tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true'
          );
        END IF;
      END $$;
    `);

    // Practitioners column migrations
    await client.query(`
      ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS grade VARCHAR(100) DEFAULT 'Docteur en Médecine';
      ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS is_general_practitioner BOOLEAN NOT NULL DEFAULT false;
      ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS phone_number VARCHAR(30);
      ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS email VARCHAR(255);
      ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS consultation_fee NUMERIC(10, 2) DEFAULT 15000;
      ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS color_code VARCHAR(20) DEFAULT '#3b82f6';
    `);

    // 2. Table hospital_buildings
    await client.query(`
      CREATE TABLE IF NOT EXISTS hospital_buildings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL,
        code VARCHAR(50) NOT NULL,
        description TEXT,
        floors_count INTEGER DEFAULT 1,
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      -- CREATE TABLE IF NOT EXISTS n'ajoute rien a une table deja presente :
      -- celle de schema.sql n'a ni description ni floors_count, que les
      -- insertions plus bas utilisent.
      ALTER TABLE hospital_buildings ADD COLUMN IF NOT EXISTS description TEXT;
      ALTER TABLE hospital_buildings ADD COLUMN IF NOT EXISTS floors_count INTEGER DEFAULT 1;
      ALTER TABLE hospital_buildings ENABLE ROW LEVEL SECURITY;
      ALTER TABLE hospital_buildings FORCE ROW LEVEL SECURITY;
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='hospital_buildings' AND policyname='tenant_isolation_hospital_buildings') THEN
          CREATE POLICY tenant_isolation_hospital_buildings ON hospital_buildings FOR ALL USING (
            tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true'
          );
        END IF;
      END $$;
    `);

    // 3. Table medical_departments
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
        color_code VARCHAR(20) DEFAULT '#4a90e2',
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      ALTER TABLE medical_departments ENABLE ROW LEVEL SECURITY;
      ALTER TABLE medical_departments FORCE ROW LEVEL SECURITY;
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='medical_departments' AND policyname='tenant_isolation_medical_departments') THEN
          CREATE POLICY tenant_isolation_medical_departments ON medical_departments FOR ALL USING (
            tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true'
          );
        END IF;
      END $$;
    `);

    // 4. Table practitioner_specialties
    await client.query(`
      CREATE TABLE IF NOT EXISTS practitioner_specialties (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        practitioner_id UUID NOT NULL REFERENCES practitioners(id) ON DELETE CASCADE,
        specialty_id UUID NOT NULL REFERENCES medical_specialties(id) ON DELETE CASCADE,
        is_primary BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      ALTER TABLE practitioner_specialties ENABLE ROW LEVEL SECURITY;
      ALTER TABLE practitioner_specialties FORCE ROW LEVEL SECURITY;
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='practitioner_specialties' AND policyname='tenant_isolation_practitioner_specialties') THEN
          CREATE POLICY tenant_isolation_practitioner_specialties ON practitioner_specialties FOR ALL USING (
            tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true'
          );
        END IF;
      END $$;
    `);

    // 5. Table practitioner_departments
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
      ALTER TABLE practitioner_departments ENABLE ROW LEVEL SECURITY;
      ALTER TABLE practitioner_departments FORCE ROW LEVEL SECURITY;
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='practitioner_departments' AND policyname='tenant_isolation_practitioner_departments') THEN
          CREATE POLICY tenant_isolation_practitioner_departments ON practitioner_departments FOR ALL USING (
            tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true'
          );
        END IF;
      END $$;
    `);

    // 6. Table practitioner_unavailabilities
    await client.query(`
      CREATE TABLE IF NOT EXISTS practitioner_unavailabilities (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        practitioner_id UUID NOT NULL REFERENCES practitioners(id) ON DELETE CASCADE,
        start_time TIMESTAMPTZ NOT NULL,
        end_time TIMESTAMPTZ NOT NULL,
        reason VARCHAR(255) NOT NULL DEFAULT 'Indisponibilité / Congé',
        all_day BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      ALTER TABLE practitioner_unavailabilities ENABLE ROW LEVEL SECURITY;
      ALTER TABLE practitioner_unavailabilities FORCE ROW LEVEL SECURITY;
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='practitioner_unavailabilities' AND policyname='tenant_isolation_practitioner_unavailabilities') THEN
          CREATE POLICY tenant_isolation_practitioner_unavailabilities ON practitioner_unavailabilities FOR ALL USING (
            tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true'
          );
        END IF;
      END $$;
    `);

    console.log('--- Récupération des cliniques (tenants) ---');
    const tenantsRes = await client.query('SELECT id, name, slug FROM tenants WHERE is_active = true');
    console.log(`Trouvé ${tenantsRes.rowCount} clinique(s)`);

    const specialtiesData = [
      { code: 'MED-GEN', name: 'Médecine Générale', description: 'Consultations générales, médecine préventive et bilans de santé', color: '#10b981', duration: 20 },
      { code: 'CARDIO', name: 'Cardiologie', description: 'Maladies du cœur, hypertension artérielle, échographie cardiaque & ECG', color: '#ef4444', duration: 30 },
      { code: 'PED', name: 'Pédiatrie & Néonatalogie', description: 'Suivi et développement des nourrissons, enfants et adolescents, vaccinations', color: '#3b82f6', duration: 25 },
      { code: 'GYN-OBS', name: 'Gynécologie-Obstétrique', description: 'Suivi de grossesse, échographie obstétricale, accouchement et santé féminine', color: '#ec4899', duration: 30 },
      { code: 'DERMA', name: 'Dermatologie', description: 'Soins et affections cutanées, dermatoscopie, cuir chevelu et ongles', color: '#8b5cf6', duration: 20 },
      { code: 'OPHTA', name: 'Ophtalmologie', description: 'Bilan de vision, réfraction, chirurgie de la cataracte et glaucome', color: '#06b6d4', duration: 20 },
      { code: 'GASTRO', name: 'Gastro-entérologie', description: 'Système digestif, hépatologie, coloscopie et endoscopie', color: '#f59e0b', duration: 25 },
      { code: 'NEURO', name: 'Neurologie', description: 'Affections du système nerveux central et périphérique, migraines, AVC', color: '#6366f1', duration: 35 },
      { code: 'ORL', name: 'Oto-Rhino-Laryngologie (ORL)', description: 'Pathologies oreille, nez, sinus, gorge et chirurgie cervico-faciale', color: '#14b8a6', duration: 20 },
      { code: 'CHIR-GEN', name: 'Chirurgie Générale & Viscérale', description: 'Interventions chirurgicales abdominales, hernies, urgences digestives', color: '#dc2626', duration: 30 },
      { code: 'TRAUMA-ORTHO', name: 'Traumatologie & Orthopédie', description: 'Chirurgie des os, articulations, tendons et lésions sportives', color: '#ea580c', duration: 25 },
      { code: 'RADIO', name: 'Radiologie & Imagerie', description: 'Échographies, radiographies conventionnelles, scanners et doppler', color: '#475569', duration: 15 }
    ];

    const departmentsData = [
      { code: 'SERV-MEDGEN', name: 'Service de Médecine Générale & Consultations', specCode: 'MED-GEN', color: '#10b981', location: 'RDC - Aile Consultations', desc: 'Consultations quotidiennes et urgences ambulatoires' },
      { code: 'SERV-CARDIO', name: 'Service de Cardiologie & Soins Vasculaires', specCode: 'CARDIO', color: '#ef4444', location: '1er Étage - Pavillon Médical', desc: 'Explorations fonctionnelles et suivi cardiovasculaire' },
      { code: 'SERV-PED', name: 'Pavillon Pédiatrique & Soins de l\'Enfant', specCode: 'PED', color: '#3b82f6', location: '2ème Étage - Pavillon Mère-Enfant', desc: 'Urgences et consultations pédiatriques' },
      { code: 'SERV-GYN', name: 'Maternité & Pôle Gynécologie-Obstétrique', specCode: 'GYN-OBS', color: '#ec4899', location: '2ème Étage - Maternité', desc: 'Salles d\'accouchement et suivi prénatal' },
      { code: 'SERV-DERMA', name: 'Service de Dermatologie & Soins Cutanés', specCode: 'DERMA', color: '#8b5cf6', location: 'RDC - Consultations Spécialisées', desc: 'Actes dermatologiques et bilans' },
      { code: 'SERV-OPHTA', name: 'Centre d\'Ophtalmologie & Soins Oculaires', specCode: 'OPHTA', color: '#06b6d4', location: 'RDC - Aile Spécialités', desc: 'Consultations ophtalmiques et petite chirurgie' },
      { code: 'SERV-GASTRO', name: 'Service de Gastro-entérologie & Endoscopie', specCode: 'GASTRO', color: '#f59e0b', location: '1er Étage - Aile Ouest', desc: 'Unité d\'exploration digestive' },
      { code: 'SERV-CHIR', name: 'Pôle Chirurgical & Bloc Opératoire Central', specCode: 'CHIR-GEN', color: '#dc2626', location: 'Bloc Central - 1er Étage', desc: 'Chirurgie programmée et urgences' },
      { code: 'SERV-RADIO', name: 'Plateau Technique d\'Imagerie & Radiologie', specCode: 'RADIO', color: '#475569', location: 'Sous-sol - Pavillon Médical', desc: 'Échographie 4D, Radiologie numérique' }
    ];

    const testPractitioners = [
      { firstName: 'Mame Mbaye', lastName: 'NDIAYE', title: 'Pr', grade: 'Professeur Agrégé en Cardiologie', specialtyCode: 'CARDIO', phone: '+221770000001', email: 'mbndiaye@gmail.com', fee: 25000, color: '#ef4444' },
      { firstName: 'Aminata', lastName: 'DIOP', title: 'Dr', grade: 'Docteur Spécialiste en Pédiatrie', specialtyCode: 'PED', phone: '+221770000002', email: 'aminata.diop@softmed.sn', fee: 18000, color: '#3b82f6' },
      { firstName: 'Ibrahima', lastName: 'SARR', title: 'Dr', grade: 'Médecin Généraliste Sénior', specialtyCode: 'MED-GEN', phone: '+221770000003', email: 'ibrahima.sarr@softmed.sn', fee: 15000, color: '#10b981', isGP: true },
      { firstName: 'Fatou', lastName: 'SOW', title: 'Dr', grade: 'Chirurgien Gynécologue-Obstétricienne', specialtyCode: 'GYN-OBS', phone: '+221770000004', email: 'fatou.sow@softmed.sn', fee: 20000, color: '#ec4899' },
      { firstName: 'Ousmane', lastName: 'FALL', title: 'Dr', grade: 'Chirurgien Viscéral', specialtyCode: 'CHIR-GEN', phone: '+221770000005', email: 'ousmane.fall@softmed.sn', fee: 25000, color: '#dc2626' },
      { firstName: 'Aïssatou', lastName: 'BA', title: 'Dr', grade: 'Ophtalmologiste', specialtyCode: 'OPHTA', phone: '+221770000006', email: 'aissatou.ba@softmed.sn', fee: 20000, color: '#06b6d4' }
    ];

    for (const tenant of tenantsRes.rows) {
      console.log(`\n==> Remplissage des données pour la clinique "${tenant.name}" (${tenant.slug})`);

      // 1. Création Bâtiment principal si manquant
      const bRes = await client.query('SELECT id FROM hospital_buildings WHERE tenant_id = $1 LIMIT 1', [tenant.id]);
      let buildingId;
      if (bRes.rowCount === 0) {
        const insertB = await client.query(`
          INSERT INTO hospital_buildings (tenant_id, name, code, description, floors_count, is_active)
          VALUES ($1, 'Pavillon Médical Principal', 'BAT-PRINCIPAL', 'Bâtiment central des consultations et soins', 3, true)
          RETURNING id
        `, [tenant.id]);
        buildingId = insertB.rows[0].id;
        console.log('  [+] Bâtiment principal créé');
      } else {
        buildingId = bRes.rows[0].id;
      }

      // 2. Insertion des Spécialités
      const specialtyMap = {};
      for (const spec of specialtiesData) {
        const specRes = await client.query(`
          INSERT INTO medical_specialties (tenant_id, code, name, description, color_code, default_duration_minutes, is_active)
          VALUES ($1, $2, $3, $4, $5, $6, true)
          ON CONFLICT (id) DO NOTHING
          RETURNING id
        `, [tenant.id, spec.code, spec.name, spec.description, spec.color, spec.duration]);

        let sId;
        if (specRes.rowCount > 0) {
          sId = specRes.rows[0].id;
        } else {
          const existing = await client.query('SELECT id FROM medical_specialties WHERE tenant_id = $1 AND code = $2', [tenant.id, spec.code]);
          sId = existing.rows[0]?.id;
        }
        if (sId) specialtyMap[spec.code] = sId;
      }
      console.log(`  [+] ${Object.keys(specialtyMap).length} Spécialités médicales enregistrées`);

      // 3. Insertion des Praticiens de test
      const practitionerMap = {};
      for (const p of testPractitioners) {
        let pId;
        const checkPrac = await client.query('SELECT id FROM practitioners WHERE tenant_id = $1 AND email = $2', [tenant.id, p.email]);
        if (checkPrac.rowCount > 0) {
          pId = checkPrac.rows[0].id;
          await client.query(`
            UPDATE practitioners 
            SET title = $1, grade = $2, specialty_name = $3, color_code = $4, consultation_fee = $5
            WHERE id = $6
          `, [p.title, p.grade, specialtiesData.find(s => s.code === p.specialtyCode)?.name || 'Médecine', p.color, p.fee, pId]);
        } else {
          const insertPrac = await client.query(`
            INSERT INTO practitioners (
              tenant_id, first_name, last_name, title, grade, specialty_name,
              phone_number, email, consultation_fee, is_general_practitioner, color_code, is_active
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, true)
            RETURNING id
          `, [
            tenant.id,
            p.firstName,
            p.lastName,
            p.title,
            p.grade,
            specialtiesData.find(s => s.code === p.specialtyCode)?.name || 'Médecine',
            p.phone,
            p.email,
            p.fee,
            !!p.isGP,
            p.color
          ]);
          pId = insertPrac.rows[0].id;
        }
        practitionerMap[p.specialtyCode] = pId;

        // Liaison Praticien <-> Spécialité
        const specId = specialtyMap[p.specialtyCode];
        if (specId && pId) {
          const checkPS = await client.query(
            'SELECT id FROM practitioner_specialties WHERE practitioner_id = $1 AND specialty_id = $2',
            [pId, specId]
          );
          if (checkPS.rowCount === 0) {
            await client.query(`
              INSERT INTO practitioner_specialties (tenant_id, practitioner_id, specialty_id, is_primary)
              VALUES ($1, $2, $3, true)
            `, [tenant.id, pId, specId]);
          }
        }
      }
      console.log(`  [+] ${testPractitioners.length} Praticiens & Médecins configurés`);

      // 4. Insertion des Services Hospitaliers
      let deptsCount = 0;
      for (const dept of departmentsData) {
        const specId = specialtyMap[dept.specCode] || null;
        const headDocId = practitionerMap[dept.specCode] || null;

        const checkDept = await client.query('SELECT id FROM medical_departments WHERE tenant_id = $1 AND code = $2', [tenant.id, dept.code]);
        let deptId;
        if (checkDept.rowCount > 0) {
          deptId = checkDept.rows[0].id;
          await client.query(`
            UPDATE medical_departments
            SET name = $1, specialty_id = $2, head_practitioner_id = $3, building_id = $4,
                location = $5, description = $6, color_code = $7, is_active = true
            WHERE id = $8
          `, [dept.name, specId, headDocId, buildingId, dept.location, dept.desc, dept.color, deptId]);
        } else {
          const insertDept = await client.query(`
            INSERT INTO medical_departments (
              tenant_id, code, name, specialty_id, head_practitioner_id,
              building_id, location, description, color_code, is_active
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true)
            RETURNING id
          `, [tenant.id, dept.code, dept.name, specId, headDocId, buildingId, dept.location, dept.desc, dept.color]);
          deptId = insertDept.rows[0].id;
        }

        // Liaison Département <-> Chef de service / Praticien
        if (deptId && headDocId) {
          const checkPD = await client.query(
            'SELECT id FROM practitioner_departments WHERE department_id = $1 AND practitioner_id = $2',
            [deptId, headDocId]
          );
          if (checkPD.rowCount === 0) {
            await client.query(`
              INSERT INTO practitioner_departments (tenant_id, practitioner_id, department_id, role_in_department, is_primary)
              VALUES ($1, $2, $3, 'Chef de Service', true)
            `, [tenant.id, headDocId, deptId]);
          }
        }
        deptsCount++;
      }
      console.log(`  [+] ${deptsCount} Services hospitaliers enregistrés`);

      // 5. Insertion des Prestations / Consultations Médicales (Medical Services)
      const medicalServicesList = [
        { code: 'CONS-MEDGEN', name: 'Consultation Médecine Générale', specCode: 'MED-GEN', cat: 'CONSULTATION', price: 15000, deposit: 2000, duration: 20, desc: 'Consultation médicale générale et bilan' },
        { code: 'CONS-CARDIO', name: 'Consultation Spécialisée Cardiologie & ECG', specCode: 'CARDIO', cat: 'CONSULTATION', price: 25000, deposit: 2000, duration: 30, desc: 'Consultation cardiologue avec électrocardiogramme' },
        { code: 'CONS-PED', name: 'Consultation Pédiatrique & Suivi de Croissance', specCode: 'PED', cat: 'CONSULTATION', price: 18000, deposit: 2000, duration: 25, desc: 'Bilan pédiatrique complet et carnet vaccinal' },
        { code: 'CONS-GYN', name: 'Consultation Gynécologique & Suivi Grossesse', specCode: 'GYN-OBS', cat: 'CONSULTATION', price: 20000, deposit: 2000, duration: 30, desc: 'Suivi obstétrical et examen gynécologique' },
        { code: 'CONS-DERMA', name: 'Consultation Dermatologique & Bilan Cutané', specCode: 'DERMA', cat: 'CONSULTATION', price: 20000, deposit: 2000, duration: 20, desc: 'Dermatoscopie et examen des lésions cutanées' },
        { code: 'CONS-OPHTA', name: 'Consultation Ophtalmologie & Examen de Vue', specCode: 'OPHTA', cat: 'CONSULTATION', price: 20000, deposit: 2000, duration: 20, desc: 'Mesure de la réfraction et examen lampe à fente' },
        { code: 'CONS-CHIR', name: 'Consultation Chirurgie Viscérale & Pré-opératoire', specCode: 'CHIR-GEN', cat: 'CONSULTATION', price: 25000, deposit: 2000, duration: 30, desc: 'Évaluation chirurgicale et diagnostic' }
      ];

      for (const ms of medicalServicesList) {
        const specId = specialtyMap[ms.specCode] || null;
        const docId = practitionerMap[ms.specCode] || null;
        const checkMS = await client.query('SELECT id FROM medical_services WHERE tenant_id = $1 AND code = $2', [tenant.id, ms.code]);
        if (checkMS.rowCount > 0) {
          await client.query(`
            UPDATE medical_services
            SET name = $1, category = $2, duration_minutes = $3, price = $4, deposit_amount = $5,
                practitioner_id = $6, specialty_id = $7, description = $8, is_active = true
            WHERE id = $9
          `, [ms.name, ms.cat, ms.duration, ms.price, ms.deposit, docId, specId, ms.desc, checkMS.rows[0].id]);
        } else {
          await client.query(`
            INSERT INTO medical_services (
              tenant_id, code, name, category, duration_minutes, price, standard_fee, deposit_amount,
              practitioner_id, specialty_id, description, is_active
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, true)
          `, [tenant.id, ms.code, ms.name, ms.cat, ms.duration, ms.price, ms.price, ms.deposit, docId, specId, ms.desc]);
        }
      }
      console.log(`  [+] ${medicalServicesList.length} Prestations & Consultations médicales enregistrées`);
    }

    await client.query('COMMIT');
    console.log('\n[Succès] Toutes les spécialités médicales, services hospitaliers, praticiens et prestations ont été remplis !');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('\n[Erreur] Échec lors du remplissage des données:', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

seedData();
