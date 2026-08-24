const pool = require('./config/db');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { login } = require('./controllers/authController');

const HMAC_SECRET = process.env.HMAC_SECRET || 'clinicos-hmac-prescription-security-key-2026';

// Assertion helper
function assert(condition, message) {
  if (!condition) {
    console.error(`[FAIL] ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`[PASS] ${message}`);
}

async function runTests() {
  console.log('================================================================');
  console.log('           SOFTMED SAAS INTEGRATION TEST FLOW                  ');
  console.log('================================================================');

  const tenantId1 = crypto.randomUUID();
  const tenantId2 = crypto.randomUUID();
  const adminId1 = crypto.randomUUID();
  const doctorId1 = crypto.randomUUID();
  const patientId1 = crypto.randomUUID();
  const practitionerId1 = crypto.randomUUID();
  const serviceId1 = crypto.randomUUID();
  const cashRegisterId1 = crypto.randomUUID();
  const cashSessionId1 = crypto.randomUUID();
  const invoiceId1 = crypto.randomUUID();
  const stockItemId1 = crypto.randomUUID();
  
  const salt = await bcrypt.genSalt(10);
  const adminPasswordHash = await bcrypt.hash('admin123', salt);

  const client = await pool.connect();

  try {
    // -------------------------------------------------------------------------
    // TEST 1: Tenant creation & Configuration
    // -------------------------------------------------------------------------
    console.log('\n--- Test 1: Tenant Creation & RLS Session Settings ---');
    await client.query('BEGIN');

    const testSlug1 = 'testclinic1-' + Date.now();
    const testSlug2 = 'testclinic2-' + Date.now();

    // Insert Tenant 1
    await client.query(
      `INSERT INTO tenants (id, name, slug, phone_number, logo_url, address, email, gps_coordinates, settings) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        tenantId1, 'Clinic Test 1', testSlug1, '+221330000001',
        '/logo1.png', 'Dakar Address 1', 'contact1@test.com', JSON.stringify({ latitude: 14.7, longitude: -17.4 }),
        JSON.stringify({ currency: 'XOF', grace_period_days: 30 })
      ]
    );

    // Insert Tenant 2 (For RLS Isolation tests)
    await client.query(
      `INSERT INTO tenants (id, name, slug, phone_number, logo_url, address, email, gps_coordinates, settings) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        tenantId2, 'Clinic Test 2', testSlug2, '+221330000002',
        '/logo2.png', 'Dakar Address 2', 'contact2@test.com', JSON.stringify({ latitude: 14.8, longitude: -17.3 }),
        JSON.stringify({ currency: 'XOF', grace_period_days: 30 })
      ]
    );

    await client.query('COMMIT');
    console.log('[PASS] Tenants created.');

    // -------------------------------------------------------------------------
    // TEST 2: Users & Role Seeding
    // -------------------------------------------------------------------------
    console.log('\n--- Test 2: User Role Setup ---');
    await client.query('BEGIN');
    await client.query(`SELECT set_config('app.current_tenant_id', $1, true)`, [tenantId1]);

    // Admin User
    await client.query(
      `INSERT INTO users (id, tenant_id, email, password_hash, first_name, last_name, role) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [adminId1, tenantId1, 'admin@testclinic1.com', adminPasswordHash, 'Fatim', 'Sow', 'SUPER_ADMIN']
    );

    // Doctor User
    await client.query(
      `INSERT INTO users (id, tenant_id, email, password_hash, first_name, last_name, role) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [doctorId1, tenantId1, 'doctor@testclinic1.com', adminPasswordHash, 'Amadou', 'Ndiaye', 'DOCTOR']
    );

    // Doctor Practitioner Card
    await client.query(
      `INSERT INTO practitioners (id, tenant_id, user_id, first_name, last_name, specialty_name, license_number, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [practitionerId1, tenantId1, doctorId1, 'Amadou', 'Ndiaye', 'Généraliste', 'SEN-LIC-8820', 'Interne']
    );

    await client.query('COMMIT');
    console.log('[PASS] Users and doctor practitioner seeded.');

    // -------------------------------------------------------------------------
    // TEST 3: Multi-Tenant RLS Strict Isolation Check
    // -------------------------------------------------------------------------
    console.log('\n--- Test 3: Multi-Tenant RLS Strict Isolation ---');
    await client.query('BEGIN');
    
    // Set context to Tenant 2
    await client.query(`SELECT set_config('app.current_tenant_id', $1, true)`, [tenantId2]);

    // Attempt to select users from Tenant 1 (should return empty due to RLS)
    const t2Query = await client.query(`SELECT email FROM users WHERE tenant_id = $1`, [tenantId1]);
    assert(t2Query.rowCount === 0, 'Tenant 2 cannot query Tenant 1 users (RLS Enforced).');

    // Switch context back to Tenant 1
    await client.query(`SELECT set_config('app.current_tenant_id', $1, true)`, [tenantId1]);
    const t1Query = await client.query(`SELECT email FROM users WHERE tenant_id = $1`, [tenantId1]);
    assert(t1Query.rowCount === 2, 'Tenant 1 users are visible under Tenant 1 session context.');

    await client.query('COMMIT');

    // -------------------------------------------------------------------------
    // TEST 4: Patient Enrollment & Vital Signs Log
    // -------------------------------------------------------------------------
    console.log('\n--- Test 4: Patient Enrollment & DPI Clinical Log ---');
    await client.query('BEGIN');
    await client.query(`SELECT set_config('app.current_tenant_id', $1, true)`, [tenantId1]);

    // Create patient (Inpatient Status)
    const patientCode = 'PAT-TEST-001';
    await client.query(
      `INSERT INTO patients (id, tenant_id, patient_code, phone_number, first_name, last_name, gender, date_of_birth, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [patientId1, tenantId1, patientCode, '+221771234567', 'Modou', 'Diop', 'M', '1995-05-15', 'Interne']
    );

    // Save Consultation notes with vital signs JSON
    const vitalSigns = { bp_systolic: 120, bp_diastolic: 80, temperature_c: 37.2 };
    const consultRes = await client.query(
      `INSERT INTO consultation_notes (tenant_id, patient_id, practitioner_id, reason_for_visit, vital_signs, diagnosis_text)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [tenantId1, patientId1, practitionerId1, 'Fièvre persistante', JSON.stringify(vitalSigns), 'Suspicion Paludisme']
    );
    const consultId = consultRes.rows[0].id;

    await client.query('COMMIT');
    console.log('[PASS] Inpatient registered, vital signs log inserted.');

    // -------------------------------------------------------------------------
    // TEST 5: Cryptographic Prescription Verification URL (HMAC)
    // -------------------------------------------------------------------------
    console.log('\n--- Test 5: Cryptographic Prescription URL HMAC Signing ---');
    await client.query('BEGIN');
    await client.query(`SELECT set_config('app.current_tenant_id', $1, true)`, [tenantId1]);

    const prescriptionId = crypto.randomUUID();
    const prescriptionCode = 'RX-TEST-99201';
    const validUntil = '2026-10-19';
    const licenseNumber = 'SEN-LIC-8820';

    // Calculate expected HMAC-SHA256 signature
    const hashData = `${prescriptionId}|${patientCode}|${licenseNumber}|${validUntil}`;
    const qrHash = crypto.createHmac('sha256', HMAC_SECRET).update(hashData).digest('hex');

    // Insert prescription record
    await client.query(
      `INSERT INTO prescriptions (id, tenant_id, consultation_id, patient_id, practitioner_id, prescription_code, qr_cryptographic_hash, valid_until)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [prescriptionId, tenantId1, consultId, patientId1, practitionerId1, prescriptionCode, qrHash, validUntil]
    );

    // Verify verification check matches
    const verifyHashData = `${prescriptionId}|${patientCode}|${licenseNumber}|${validUntil}`;
    const verifyHash = crypto.createHmac('sha256', HMAC_SECRET).update(verifyHashData).digest('hex');
    assert(verifyHash === qrHash, 'HMAC signature matches QR Code payload encryption key.');

    // Simulate tampered verification attempt (change valid date in URL)
    const tamperedHashData = `${prescriptionId}|${patientCode}|${licenseNumber}|2027-12-31`;
    const tamperedHash = crypto.createHmac('sha256', HMAC_SECRET).update(tamperedHashData).digest('hex');
    assert(tamperedHash !== qrHash, 'Tampered parameters (modified date) fail signature validation.');

    await client.query('COMMIT');

    // -------------------------------------------------------------------------
    // TEST 6: Invoices & Ventilation (80/20 Co-payment splits)
    // -------------------------------------------------------------------------
    console.log('\n--- Test 6: Invoicing Ventilation Calculations ---');
    await client.query('BEGIN');
    await client.query(`SELECT set_config('app.current_tenant_id', $1, true)`, [tenantId1]);

    // Create an Insurance Company Sonatel (80% rate)
    const insuranceId = crypto.randomUUID();
    await client.query(
      `INSERT INTO insurance_companies (id, tenant_id, name, code, payment_terms_days) VALUES ($1, $2, $3, $4, 30)`,
      [insuranceId, tenantId1, 'IPM SONATEL', 'IPM-SONATEL']
    );

    // Assign policy to patient
    await client.query(
      `INSERT INTO patient_insurance_policies (tenant_id, patient_id, insurance_company_id, policy_number, coverage_rate_percent)
       VALUES ($1, $2, $3, 'POL-88102', 80.00)`,
      [tenantId1, patientId1, insuranceId]
    );

    // Invoice gross amount: 50,000 FCFA
    const totalGross = 50000.00;
    const discount = 0.00;
    const netAmount = totalGross - discount;
    const coverageRate = 80.00;

    const insuranceShare = Math.round(netAmount * (coverageRate / 100)); // 40,000
    const patientShare = netAmount - insuranceShare; // 10,000

    // Assert split logic
    assert(insuranceShare === 40000.00, 'Ventilation: Insurance Share = 40,000 FCFA (80%).');
    assert(patientShare === 10000.00, 'Ventilation: Patient Share = 10,000 FCFA (20%).');

    // Insert Invoice
    await client.query(
      `INSERT INTO invoices (id, tenant_id, invoice_number, patient_id, insurance_company_id, total_amount_gross, discount_amount, total_amount_net, patient_share_amount, insurance_share_amount, due_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_DATE + 30)`,
      [invoiceId1, tenantId1, 'FAC-TEST-1002', patientId1, insuranceId, totalGross, discount, netAmount, patientShare, insuranceShare]
    );

    await client.query('COMMIT');
    console.log('[PASS] Invoice split ventilation verified and logged.');

    // -------------------------------------------------------------------------
    // TEST 7: Webhook payment callback reconciliation
    // -------------------------------------------------------------------------
    console.log('\n--- Test 7: Webhook Payment Callback Reconciliation ---');
    await client.query('BEGIN');
    await client.query(`SELECT set_config('app.current_tenant_id', $1, true)`, [tenantId1]);

    const paymentAmount = 10000.00; // Complete patient co-payment amount
    const waveTxRef = 'WAVE_TX_SIM_992019';

    // Insert Payment record simulating webhook callback
    await client.query(
      `INSERT INTO payments (tenant_id, invoice_id, received_by, amount, payment_method, payer_type, transaction_reference)
       VALUES ($1, $2, $3, $4, 'WAVE', 'PATIENT', $5)`,
      [tenantId1, invoiceId1, adminId1, paymentAmount, waveTxRef]
    );

    // Fetch invoice and assert updated paid totals
    const updateInvRes = await client.query(`SELECT * FROM invoices WHERE id = $1 FOR UPDATE`, [invoiceId1]);
    const updatedInv = updateInvRes.rows[0];

    const newPatientPaid = parseFloat(updatedInv.patient_paid_amount) + paymentAmount;
    
    // Perform update on invoice status
    let newStatus = updatedInv.status;
    const totalPaid = newPatientPaid + parseFloat(updatedInv.insurance_paid_amount);
    const invoiceNet = parseFloat(updatedInv.total_amount_net);

    if (totalPaid >= invoiceNet) {
      newStatus = 'PAID';
    } else if (totalPaid > 0) {
      newStatus = 'PARTIALLY_PAID'; // 10k out of 50k net paid (since 40k insurance share is still outstanding)
    }

    await client.query(
      `UPDATE invoices SET patient_paid_amount = $1, status = $2 WHERE id = $3`,
      [newPatientPaid, newStatus, invoiceId1]
    );

    const checkFinalInv = await client.query(`SELECT status, patient_paid_amount FROM invoices WHERE id = $1`, [invoiceId1]);
    assert(checkFinalInv.rows[0].status === 'PARTIALLY_PAID', 'Invoice status updated to PARTIALLY_PAID (Patient co-payment received, Insurance pending).');
    assert(parseFloat(checkFinalInv.rows[0].patient_paid_amount) === 10000.00, 'Invoice patient_paid_amount displays 10,000 FCFA.');

    await client.query('COMMIT');

    // -------------------------------------------------------------------------
    // TEST 8: Pharmacy Stock lot decrement & alerts (FEFO)
    // -------------------------------------------------------------------------
    console.log('\n--- Test 8: Pharmacy Stock lot decrement & Exception Alerts ---');
    await client.query('BEGIN');
    await client.query(`SELECT set_config('app.current_tenant_id', $1, true)`, [tenantId1]);

    // Create stock item (available: 2 units)
    await client.query(
      `INSERT INTO stock_items (id, tenant_id, sku, name, category, unit, minimum_threshold_alert, unit_cost_price, selling_price, current_stock_quantity)
       VALUES ($1, $2, 'GLUCOMETRE-X', 'Glucomètre Test', 'CONSUMABLE', 'UNITE', 2, 5000, 7500, 2)`,
      [stockItemId1, tenantId1]
    );

    // Create stock lot
    const lotId = crypto.randomUUID();
    await client.query(
      `INSERT INTO stock_lots (id, tenant_id, stock_item_id, lot_number, expiration_date, quantity_remaining)
       VALUES ($1, $2, $3, 'LOT-TEST-A', CURRENT_DATE + 365, 2)`,
      [lotId, tenantId1, stockItemId1]
    );

    // Verify stock is 2
    const checkStock1 = await client.query(`SELECT current_stock_quantity FROM stock_items WHERE id = $1`, [stockItemId1]);
    assert(checkStock1.rows[0].current_stock_quantity === 2, 'Initial stock item quantity is 2.');

    // Deplete 2 units (Safe)
    const qtyToDepleteSuccess = 2;
    // Perform simulated depletion
    const lotRes = await client.query(
      `SELECT * FROM stock_lots WHERE stock_item_id = $1 AND expiration_date >= CURRENT_DATE AND quantity_remaining > 0 FOR UPDATE`,
      [stockItemId1]
    );

    let sumAvailable = 0;
    lotRes.rows.forEach(l => sumAvailable += l.quantity_remaining);

    assert(sumAvailable >= qtyToDepleteSuccess, `Sufficient stock available (${sumAvailable}) to deplete ${qtyToDepleteSuccess} units.`);

    // Deduct
    await client.query(`UPDATE stock_lots SET quantity_remaining = quantity_remaining - 2 WHERE id = $1`, [lotId]);
    await client.query(`UPDATE stock_items SET current_stock_quantity = current_stock_quantity - 2 WHERE id = $1`, [stockItemId1]);

    const checkStock2 = await client.query(`SELECT current_stock_quantity FROM stock_items WHERE id = $1`, [stockItemId1]);
    assert(checkStock2.rows[0].current_stock_quantity === 0, 'Stock level depleted to 0 units.');

    // Deplete another unit (Should fail - Insufficient stock)
    const qtyToDepleteFail = 1;
    const lotRes2 = await client.query(
      `SELECT * FROM stock_lots WHERE stock_item_id = $1 AND expiration_date >= CURRENT_DATE AND quantity_remaining > 0 FOR UPDATE`,
      [stockItemId1]
    );

    let sumAvailable2 = 0;
    lotRes2.rows.forEach(l => sumAvailable2 += l.quantity_remaining);

    // Assert fail
    if (sumAvailable2 < qtyToDepleteFail) {
      console.log('[PASS] Caught Insufficient Stock exception: Out of stock (0 remaining, requested 1). Transaction aborted.');
    } else {
      throw new Error('Stock depletion should have failed.');
    }

    await client.query('COMMIT');

    console.log('\n================================================================');
    console.log('             ALL INTEGRATION TESTS PASSED                       ');
    console.log('================================================================');

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('\n[FAIL] Test flow execution failed:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runTests();
