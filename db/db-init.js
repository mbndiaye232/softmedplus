const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
require('dotenv').config();

const dbHost = process.env.DB_HOST || '127.0.0.1';
const dbPort = process.env.DB_PORT || 5432;
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'postgres';
const dbName = process.env.DB_NAME || 'clinicos';

async function initDatabase() {
  // Step 1: Connect to default 'postgres' database to create target db
  console.log(`Connecting to default postgres database to check/create '${dbName}'...`);
  const adminClient = new Client({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    database: 'postgres',
  });

  try {
    await adminClient.connect();
    const res = await adminClient.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);
    if (res.rowCount === 0) {
      console.log(`Database '${dbName}' does not exist. Creating it...`);
      // CREATE DATABASE cannot run inside a transaction block, so we execute it directly
      await adminClient.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database '${dbName}' created.`);
    } else {
      console.log(`Database '${dbName}' already exists.`);
    }
  } catch (err) {
    console.error('Error verifying/creating database:', err.message);
    process.exit(1);
  } finally {
    await adminClient.end();
  }

  // Step 2: Connect to target database and execute schema.sql
  console.log(`Connecting directly to database '${dbName}'...`);
  const client = new Client({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    database: dbName,
  });

  try {
    await client.connect();

    console.log('Reading and executing schema.sql...');
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    // Execute the full schema definition
    await client.query(schemaSql);
    console.log('Schema executed successfully. Tables, enums, extensions, and RLS policies created!');

    // Step 3: Seed data (using app.current_tenant_id bypass for superuser or just standard insert since superuser bypasses RLS)
    console.log('Seeding sample data...');

    const tenantId = crypto.randomUUID();
    const superAdminId = crypto.randomUUID();
    const doctorUserId = crypto.randomUUID();
    const secretaryUserId = crypto.randomUUID();
    const cashierUserId = crypto.randomUUID();
    const pharmacistUserId = crypto.randomUUID();
    const practitionerId = crypto.randomUUID();
    const serviceId = crypto.randomUUID();
    const registerId = crypto.randomUUID();
    const insuranceId = crypto.randomUUID();
    const stockItemId = crypto.randomUUID();
    const stockLotId = crypto.randomUUID();

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('admin123', salt);

    // Bypass RLS for seeding by setting current_tenant_id session variable
    await client.query(`SET LOCAL app.current_tenant_id = $1`, [tenantId]);

    // 1. Tenant
    console.log('- Seeding tenant...');
    await client.query(
      `INSERT INTO tenants (id, name, slug, phone_number, ninea_rc, logo_url, address, email, gps_coordinates, settings) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        tenantId,
        "Clinique de l'Espoir",
        'espoir',
        '+221338000000',
        'N01234567-RC',
        '/logo-espoir.png',
        '12, Avenue Cheikh Anta Diop, Dakar, Sénégal',
        'contact@espoir.com',
        JSON.stringify({ latitude: 14.6937, longitude: -17.4479 }),
        JSON.stringify({ currency: 'XOF', deposit_rate: 0.20, grace_period_days: 30 })
      ]
    );

    // 2. Tenant Payment Methods (Wave, Orange Money, SPI, Yas, Credit Card)
    console.log('- Seeding payment methods...');
    const paymentMethods = [
      [crypto.randomUUID(), tenantId, 'WAVE', 'Wave Caisse Pro', JSON.stringify({ phone_number: '+221772938493', merchant_id: 'WAVE-ESPOIR' })],
      [crypto.randomUUID(), tenantId, 'ORANGE_MONEY', 'Orange Money Caisse', JSON.stringify({ phone_number: '+221783920193', merchant_code: '190293' })],
      [crypto.randomUUID(), tenantId, 'SPI', 'Virement SPI', JSON.stringify({ bank_name: 'BCEAO-SPI', account_number: 'SN09819280192801' })],
      [crypto.randomUUID(), tenantId, 'YAS', 'Yas Pay', JSON.stringify({ api_key: 'yas_live_920193' })],
      [crypto.randomUUID(), tenantId, 'CARTE_BANCAIRE', 'Paiement Carte', JSON.stringify({ provider: 'Stripe/Paypack', public_key: 'pk_test_123' })]
    ];
    for (const pm of paymentMethods) {
      await client.query(
        `INSERT INTO tenant_payment_methods (id, tenant_id, provider, name, credentials, is_active) VALUES ($1, $2, $3, $4, $5, true)`,
        pm
      );
    }

    // 3. Users
    console.log('- Seeding users...');
    const users = [
      [superAdminId, tenantId, 'admin@espoir.com', passwordHash, 'Awa', 'Diop', 'SUPER_ADMIN'],
      [doctorUserId, tenantId, 'doctor@espoir.com', passwordHash, 'Amadou', 'Diallo', 'DOCTOR'],
      [secretaryUserId, tenantId, 'secretaire@espoir.com', passwordHash, 'Mariama', 'Sow', 'SECRETARY'],
      [cashierUserId, tenantId, 'caissier@espoir.com', passwordHash, 'Cheikh', 'Ndiaye', 'CASHIER'],
      [pharmacistUserId, tenantId, 'pharmacist@espoir.com', passwordHash, 'Moussa', 'Fall', 'PHARMACIST']
    ];
    for (const u of users) {
      await client.query(
        `INSERT INTO users (id, tenant_id, email, password_hash, first_name, last_name, role) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        u
      );
    }

    // 4. Practitioner
    console.log('- Seeding practitioner...');
    await client.query(
      `INSERT INTO practitioners (id, tenant_id, user_id, first_name, last_name, specialty_name, license_number, color_code, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'Interne')`,
      [practitionerId, tenantId, doctorUserId, 'Amadou', 'Diallo', 'Pédiatre', 'SEN-MD-4889', '#4A90E2']
    );

    // 5. Medical Service
    console.log('- Seeding medical service...');
    await client.query(
      `INSERT INTO medical_services (id, tenant_id, practitioner_id, code, name, duration_minutes, price, deposit_amount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [serviceId, tenantId, practitionerId, 'CONS-PED', 'Consultation Pédiatrique', 30, 15000, 3000]
    );

    // 6. Cash Register
    console.log('- Seeding cash register...');
    await client.query(
      `INSERT INTO cash_registers (id, tenant_id, name) VALUES ($1, $2, $3)`,
      [registerId, tenantId, 'Caisse Principale Guichet 1']
    );

    // 7. Insurance Company
    console.log('- Seeding insurance company...');
    await client.query(
      `INSERT INTO insurance_companies (id, tenant_id, name, code, contact_email, contact_phone, payment_terms_days) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [insuranceId, tenantId, 'IPM SONATEL', 'IPM-SONATEL', 'contact@ipmsonatel.sn', '+221338390000', 30]
    );

    // 8. Stock & Pharmacy
    console.log('- Seeding stock items and lots...');
    await client.query(
      `INSERT INTO stock_items (id, tenant_id, sku, name, category, unit, minimum_threshold_alert, unit_cost_price, selling_price, current_stock_quantity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [stockItemId, tenantId, 'PARACETAMOL-1G', 'Paracétamol 1g', 'MEDICATION', 'BOITE', 5, 800, 1200, 100]
    );

    await client.query(
      `INSERT INTO stock_lots (id, tenant_id, stock_item_id, lot_number, expiration_date, quantity_remaining) VALUES ($1, $2, $3, $4, $5, $6)`,
      [stockLotId, tenantId, stockItemId, 'LOT-2026-001', '2027-12-31', 100]
    );

    // Create a stock movement for initial entry
    await client.query(
      `INSERT INTO stock_movements (id, tenant_id, stock_item_id, lot_id, movement_type, quantity, performed_by) VALUES ($1, $2, $3, $4, 'INITIAL_IN', $5, $6)`,
      [crypto.randomUUID(), tenantId, stockItemId, stockLotId, 100, superAdminId]
    );

    console.log('Seeding finished successfully!');
    console.log('\nSeed Accounts:');
    console.log('- Admin: admin@espoir.com / admin123');
    console.log('- Doctor: doctor@espoir.com / admin123');
    console.log('- Cashier: caissier@espoir.com / admin123');
    console.log('- Secretary: secretaire@espoir.com / admin123');
    console.log('- Pharmacist: pharmacist@espoir.com / admin123');
  } catch (err) {
    console.error('Error seeding data:', err.message);
  } finally {
    await client.end();
  }
}

initDatabase().catch(err => {
  console.error('Fatal initialization error:', err);
});
