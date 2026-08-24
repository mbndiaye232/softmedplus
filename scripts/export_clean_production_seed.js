const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

async function exportCleanProductionSeed() {
  const client = await pool.connect();
  try {
    console.log('🔄 Extraction des données de configuration et de référence (sans données de tests)...');

    const outputFile = path.join(__dirname, '..', 'db', 'production_seed.sql');
    let sqlOutput = `-- ============================================================================
-- SOFTMED PRODUCTION CLEAN SEED DATA
-- Baseline configuration, reference data, practitioners, and services
-- Generated on: ${new Date().toISOString()}
-- ============================================================================

SET app.bypass_rls = 'true';

`;

    // 1. Tenants
    const tenants = await client.query('SELECT * FROM tenants ORDER BY created_at ASC');
    if (tenants.rowCount > 0) {
      sqlOutput += `-- 1. TENANTS (${tenants.rowCount})\n`;
      for (const t of tenants.rows) {
        sqlOutput += `INSERT INTO tenants (id, name, slug, email, phone, address, tax_id, logo_url, stamp_url, is_active, created_at)
VALUES ('${t.id}', ${esc(t.name)}, ${esc(t.slug)}, ${esc(t.email)}, ${esc(t.phone)}, ${esc(t.address)}, ${esc(t.tax_id)}, ${esc(t.logo_url)}, ${esc(t.stamp_url)}, ${t.is_active}, '${t.created_at.toISOString()}')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, slug = EXCLUDED.slug, logo_url = EXCLUDED.logo_url;\n`;
      }
      sqlOutput += '\n';
    }

    // 2. Users (Admin, Médecins, Caissiers, Secrétaires, SuperAdmin)
    const users = await client.query('SELECT * FROM users ORDER BY created_at ASC');
    if (users.rowCount > 0) {
      sqlOutput += `-- 2. USERS (${users.rowCount})\n`;
      for (const u of users.rows) {
        const perms = u.permissions ? `'${JSON.stringify(u.permissions)}'::jsonb` : `'{}'::jsonb`;
        sqlOutput += `INSERT INTO users (id, tenant_id, email, password_hash, first_name, last_name, role, preset_name, permissions, is_active, created_at)
VALUES ('${u.id}', '${u.tenant_id}', ${esc(u.email)}, ${esc(u.password_hash)}, ${esc(u.first_name)}, ${esc(u.last_name)}, '${u.role}', ${esc(u.preset_name)}, ${perms}, ${u.is_active}, '${u.created_at.toISOString()}')
ON CONFLICT (id) DO UPDATE SET password_hash = EXCLUDED.password_hash, permissions = EXCLUDED.permissions;\n`;
      }
      sqlOutput += '\n';
    }

    // 3. Practitioner Specialties
    try {
      const specs = await client.query('SELECT * FROM practitioner_specialties ORDER BY name ASC');
      if (specs.rowCount > 0) {
        sqlOutput += `-- 3. SPECIALTIES (${specs.rowCount})\n`;
        for (const s of specs.rows) {
          sqlOutput += `INSERT INTO practitioner_specialties (id, tenant_id, name, code, description, is_active)
VALUES ('${s.id}', '${s.tenant_id}', ${esc(s.name)}, ${esc(s.code)}, ${esc(s.description)}, ${s.is_active})
ON CONFLICT (id) DO NOTHING;\n`;
        }
        sqlOutput += '\n';
      }
    } catch (e) {}

    // 4. Practitioners
    try {
      const practs = await client.query('SELECT * FROM practitioners ORDER BY created_at ASC');
      if (practs.rowCount > 0) {
        sqlOutput += `-- 4. PRACTITIONERS (${practs.rowCount})\n`;
        for (const p of practs.rows) {
          sqlOutput += `INSERT INTO practitioners (id, tenant_id, user_id, specialty_id, specialty, license_number, consultation_fee, consultation_duration_minutes, is_active)
VALUES ('${p.id}', '${p.tenant_id}', ${p.user_id ? `'${p.user_id}'` : 'NULL'}, ${p.specialty_id ? `'${p.specialty_id}'` : 'NULL'}, ${esc(p.specialty)}, ${esc(p.license_number)}, ${p.consultation_fee || 0}, ${p.consultation_duration_minutes || 30}, ${p.is_active})
ON CONFLICT (id) DO UPDATE SET consultation_fee = EXCLUDED.consultation_fee, consultation_duration_minutes = EXCLUDED.consultation_duration_minutes;\n`;
        }
        sqlOutput += '\n';
      }
    } catch (e) {}

    // 5. Medical Services / Prestations & Tarifs
    try {
      const services = await client.query('SELECT * FROM medical_services ORDER BY category, name ASC');
      if (services.rowCount > 0) {
        sqlOutput += `-- 5. MEDICAL SERVICES & TARIFS (${services.rowCount})\n`;
        for (const m of services.rows) {
          sqlOutput += `INSERT INTO medical_services (id, tenant_id, code, name, category, standard_fee, is_active)
VALUES ('${m.id}', '${m.tenant_id}', ${esc(m.code)}, ${esc(m.name)}, ${esc(m.category)}, ${m.standard_fee || 0}, ${m.is_active})
ON CONFLICT (id) DO NOTHING;\n`;
        }
        sqlOutput += '\n';
      }
    } catch (e) {}

    // 6. Insurance Companies (IPM & Assurances)
    try {
      const insurances = await client.query('SELECT * FROM insurance_companies ORDER BY name ASC');
      if (insurances.rowCount > 0) {
        sqlOutput += `-- 6. INSURANCE COMPANIES & IPM (${insurances.rowCount})\n`;
        for (const ic of insurances.rows) {
          sqlOutput += `INSERT INTO insurance_companies (id, tenant_id, name, code, contact_phone, contact_email, address, payment_terms_days, is_active)
VALUES ('${ic.id}', '${ic.tenant_id}', ${esc(ic.name)}, ${esc(ic.code)}, ${esc(ic.contact_phone)}, ${esc(ic.contact_email)}, ${esc(ic.address)}, ${ic.payment_terms_days || 30}, ${ic.is_active})
ON CONFLICT (id) DO NOTHING;\n`;
        }
        sqlOutput += '\n';
      }
    } catch (e) {}

    // 7. Payment Methods
    try {
      const payments = await client.query('SELECT * FROM payment_methods ORDER BY created_at ASC');
      if (payments.rowCount > 0) {
        sqlOutput += `-- 7. PAYMENT METHODS (${payments.rowCount})\n`;
        for (const pm of payments.rows) {
          sqlOutput += `INSERT INTO payment_methods (id, tenant_id, method_type, provider_name, account_number, qr_code_url, is_active)
VALUES ('${pm.id}', '${pm.tenant_id}', ${esc(pm.method_type)}, ${esc(pm.provider_name)}, ${esc(pm.account_number)}, ${esc(pm.qr_code_url)}, ${pm.is_active})
ON CONFLICT (id) DO NOTHING;\n`;
        }
        sqlOutput += '\n';
      }
    } catch (e) {}

    // 8. Hospitalization Infrastructure (Buildings, Rooms, Beds)
    try {
      const buildings = await client.query('SELECT * FROM hospital_buildings ORDER BY name ASC');
      if (buildings.rowCount > 0) {
        sqlOutput += `-- 8. BUILDINGS (${buildings.rowCount})\n`;
        for (const b of buildings.rows) {
          sqlOutput += `INSERT INTO hospital_buildings (id, tenant_id, name, code, is_active)
VALUES ('${b.id}', '${b.tenant_id}', ${esc(b.name)}, ${esc(b.code)}, ${b.is_active})
ON CONFLICT (id) DO NOTHING;\n`;
        }
        sqlOutput += '\n';
      }

      const rooms = await client.query('SELECT * FROM hospital_rooms ORDER BY room_number ASC');
      if (rooms.rowCount > 0) {
        sqlOutput += `-- ROOMS (${rooms.rowCount})\n`;
        for (const r of rooms.rows) {
          sqlOutput += `INSERT INTO hospital_rooms (id, tenant_id, building_id, room_number, room_type, daily_rate, is_active)
VALUES ('${r.id}', '${r.tenant_id}', '${r.building_id}', ${esc(r.room_number)}, ${esc(r.room_type)}, ${r.daily_rate || 0}, ${r.is_active})
ON CONFLICT (id) DO NOTHING;\n`;
        }
        sqlOutput += '\n';
      }

      const beds = await client.query('SELECT * FROM hospital_beds ORDER BY bed_number ASC');
      if (beds.rowCount > 0) {
        sqlOutput += `-- BEDS (${beds.rowCount})\n`;
        for (const bd of beds.rows) {
          sqlOutput += `INSERT INTO hospital_beds (id, tenant_id, room_id, bed_number, status, is_active)
VALUES ('${bd.id}', '${bd.tenant_id}', '${bd.room_id}', ${esc(bd.bed_number)}, 'AVAILABLE', ${bd.is_active})
ON CONFLICT (id) DO NOTHING;\n`;
        }
        sqlOutput += '\n';
      }
    } catch (e) {}

    // 9. Tenant SMTP Accounts
    try {
      const smtps = await client.query('SELECT * FROM tenant_smtp_accounts ORDER BY created_at ASC');
      if (smtps.rowCount > 0) {
        sqlOutput += `-- 9. SMTP ACCOUNTS (${smtps.rowCount})\n`;
        for (const sm of smtps.rows) {
          sqlOutput += `INSERT INTO tenant_smtp_accounts (id, tenant_id, account_name, from_name, from_email, reply_to_email, smtp_host, smtp_port, smtp_secure, smtp_user, smtp_password, is_default, is_active)
VALUES ('${sm.id}', '${sm.tenant_id}', ${esc(sm.account_name)}, ${esc(sm.from_name)}, ${esc(sm.from_email)}, ${esc(sm.reply_to_email)}, ${esc(sm.smtp_host)}, ${sm.smtp_port || 465}, ${sm.smtp_secure}, ${esc(sm.smtp_user)}, ${esc(sm.smtp_password)}, ${sm.is_default}, ${sm.is_active})
ON CONFLICT (id) DO NOTHING;\n`;
        }
        sqlOutput += '\n';
      }
    } catch (e) {}

    sqlOutput += `RESET app.bypass_rls;\n`;

    fs.writeFileSync(outputFile, sqlOutput, 'utf8');
    console.log(`✅ Fichier de seed de production généré avec succès dans : ${outputFile}`);
    console.log('✨ Toutes les configurations réelles sont préservées, et aucune fausse facture/patient de test n\'a été incluse.');

  } catch (err) {
    console.error('Erreur lors de l\'export:', err);
  } finally {
    client.release();
    process.exit(0);
  }
}

function esc(val) {
  if (val === null || val === undefined) return 'NULL';
  return `'${String(val).replace(/'/g, "''")}'`;
}

exportCleanProductionSeed();
