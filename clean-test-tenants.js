const pool = require('./config/db');

async function cleanTestTenants() {
  const client = await pool.connect();
  try {
    console.log('Cleaning up duplicate automated test tenants...');

    const testTenants = await client.query(`
      SELECT id, name, slug FROM tenants 
      WHERE slug LIKE 'test%' 
         OR name LIKE 'Clinic Test%' 
         OR name LIKE 'Clinique Test%'
    `);

    for (const t of testTenants.rows) {
      console.log(`Deleting test tenant: ${t.name} (${t.slug})...`);
      await client.query('DELETE FROM medical_audit_logs WHERE tenant_id = $1 OR user_id IN (SELECT id FROM users WHERE tenant_id = $1)', [t.id]);
      await client.query('DELETE FROM appointments WHERE tenant_id = $1 OR practitioner_id IN (SELECT id FROM practitioners WHERE tenant_id = $1)', [t.id]);
      await client.query('DELETE FROM invoice_lines WHERE invoice_id IN (SELECT id FROM invoices WHERE tenant_id = $1)', [t.id]);
      await client.query('DELETE FROM payments WHERE tenant_id = $1', [t.id]);
      await client.query('DELETE FROM invoices WHERE tenant_id = $1', [t.id]);
      await client.query('DELETE FROM consultation_notes WHERE tenant_id = $1 OR practitioner_id IN (SELECT id FROM practitioners WHERE tenant_id = $1)', [t.id]);
      await client.query('DELETE FROM prescription_items WHERE prescription_id IN (SELECT id FROM prescriptions WHERE tenant_id = $1)', [t.id]);
      await client.query('DELETE FROM prescriptions WHERE tenant_id = $1', [t.id]);
      await client.query('DELETE FROM medical_records WHERE tenant_id = $1', [t.id]);
      await client.query('DELETE FROM patient_treatments WHERE tenant_id = $1', [t.id]);
      await client.query('DELETE FROM patient_lab_orders WHERE tenant_id = $1', [t.id]);
      await client.query('DELETE FROM hospitalizations WHERE tenant_id = $1', [t.id]);
      await client.query('DELETE FROM hospital_beds WHERE room_id IN (SELECT id FROM hospital_rooms WHERE building_id IN (SELECT id FROM hospital_buildings WHERE tenant_id = $1))', [t.id]);
      await client.query('DELETE FROM hospital_rooms WHERE building_id IN (SELECT id FROM hospital_buildings WHERE tenant_id = $1)', [t.id]);
      await client.query('DELETE FROM hospital_buildings WHERE tenant_id = $1', [t.id]);
      await client.query('DELETE FROM patients WHERE tenant_id = $1', [t.id]);
      await client.query('DELETE FROM medical_services WHERE tenant_id = $1', [t.id]);
      await client.query('DELETE FROM practitioners WHERE tenant_id = $1', [t.id]);
      await client.query('DELETE FROM tenant_payment_methods WHERE tenant_id = $1', [t.id]);
      // Les sessions de caisse référencent le caissier : à purger avant les utilisateurs
      await client.query('DELETE FROM cash_sessions WHERE tenant_id = $1', [t.id]);
      await client.query('DELETE FROM cash_registers WHERE tenant_id = $1', [t.id]);
      await client.query('DELETE FROM users WHERE tenant_id = $1', [t.id]);
      await client.query('DELETE FROM tenants WHERE id = $1', [t.id]);
    }

    console.log(`Cleaned up ${testTenants.rowCount} test tenants.`);

    const remaining = await client.query('SELECT id, name, slug FROM tenants ORDER BY name');
    console.log('Remaining active clinics:');
    remaining.rows.forEach(r => console.log(` -> ${r.name} (${r.slug})`));

  } catch (err) {
    console.error('Cleanup error:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

cleanTestTenants();
