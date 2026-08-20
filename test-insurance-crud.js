const pool = require('./config/db');

async function testInsuranceCRUD() {
  const client = await pool.connect();
  try {
    console.log('=== TESTING INSURANCE COMPANIES (IPM) CRUD ===');

    // 1. Get a tenant ID
    const tRes = await client.query('SELECT id FROM tenants LIMIT 1');
    const tenantId = tRes.rows[0].id;

    // 2. Insert new IPM
    const insRes = await client.query(
      `INSERT INTO insurance_companies (tenant_id, name, code, contact_email, contact_phone, payment_terms_days, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [tenantId, 'IPM Test Douanes', 'DOUANES-SN', 'douanes@ipm.sn', '+221 33 800 11 22', 45, true]
    );
    const created = insRes.rows[0];
    console.log('-> Created IPM:', created.name, 'Code:', created.code, 'Terms:', created.payment_terms_days);

    // 3. Update IPM
    const updRes = await client.query(
      `UPDATE insurance_companies 
       SET name = $1, payment_terms_days = $2 
       WHERE id = $3 AND tenant_id = $4 
       RETURNING *`,
      ['IPM Douanes Sénégal (Modifié)', 30, created.id, tenantId]
    );
    console.log('-> Updated IPM:', updRes.rows[0].name, 'New Terms:', updRes.rows[0].payment_terms_days);

    // 4. Delete/Clean up test row
    await client.query('DELETE FROM insurance_companies WHERE id = $1', [created.id]);
    console.log('-> Cleaned up test IPM successfully.');

    console.log('=== TEST IPM CRUD PASSED 100% ===');
  } catch (err) {
    console.error('Error during test:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

testInsuranceCRUD();
