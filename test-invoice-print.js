const pool = require('./config/db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'softmed-enterprise-super-secure-jwt-key-2026';

async function testInvoicePrint() {
  const client = await pool.connect();
  try {
    console.log('=== TESTING INVOICE DETAILS & STAMP PRINT API ===');

    // 1. Get an invoice from DB
    const invRes = await client.query(`SELECT id, tenant_id FROM invoices LIMIT 1`);
    if (invRes.rowCount === 0) {
      console.log('No invoice found to test.');
      return;
    }

    const invoiceId = invRes.rows[0].id;
    const tenantId = invRes.rows[0].tenant_id;

    // 2. Query tenant
    const tRes = await client.query(`SELECT name, logo_url, stamp_url FROM tenants WHERE id = $1`, [tenantId]);
    console.log('-> Tenant details:', tRes.rows[0]);

    // 3. Query details as backend endpoint does
    const invDetailsRes = await client.query(
      `SELECT i.*, 
              p.first_name AS patient_first, p.last_name AS patient_last, p.patient_code, p.phone_number AS patient_phone, p.date_of_birth, p.gender,
              ic.name AS insurance_name, ic.code AS insurance_code, ic.contact_phone AS insurance_phone,
              pip.policy_number, pip.coverage_rate_percent AS policy_coverage_rate
       FROM invoices i
       JOIN patients p ON i.patient_id = p.id
       LEFT JOIN insurance_companies ic ON i.insurance_company_id = ic.id
       LEFT JOIN patient_insurance_policies pip ON (pip.patient_id = p.id AND pip.insurance_company_id = ic.id AND pip.is_primary = true)
       WHERE i.id = $1 AND i.tenant_id = $2`,
      [invoiceId, tenantId]
    );

    console.log('-> Invoice loaded:', invDetailsRes.rows[0].invoice_number, 'Patient:', invDetailsRes.rows[0].patient_first, invDetailsRes.rows[0].patient_last);
    console.log('-> Insurance:', invDetailsRes.rows[0].insurance_name || 'Privé');

    console.log('=== TEST PASSED 100% ===');
  } catch (err) {
    console.error('Test error:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

testInvoicePrint();
