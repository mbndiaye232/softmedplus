const pool = require('../config/db');

async function seedHospitalisationService() {
  const client = await pool.connect();
  try {
    const tenants = await client.query('SELECT id FROM tenants');
    for (const t of tenants.rows) {
      const existing = await client.query(
        "SELECT id FROM medical_services WHERE tenant_id = $1 AND code = 'HOSP-01'",
        [t.id]
      );
      if (existing.rowCount === 0) {
        await client.query(`
          INSERT INTO medical_services (tenant_id, name, code, category, price, duration_minutes, description, is_active)
          VALUES ($1, 'Séjour Hospitalier (Frais d''hébergement / Journée)', 'HOSP-01', 'HOSPITALISATION', 15000, 1440, 'Frais d''hébergement journalier en hospitalisation', true)
        `, [t.id]);
      }
    }
    console.log('Seeded Hospitalisation medical service for all tenants');
  } catch (err) {
    console.error('Error seeding service:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

seedHospitalisationService();
