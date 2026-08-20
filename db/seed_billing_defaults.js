const pool = require('../config/db');
const crypto = require('crypto');

async function seedBillingDefaults() {
  const client = await pool.connect();
  try {
    console.log('Seeding default cash registers and insurances for all tenants...');

    const tenantsRes = await client.query('SELECT id, name FROM tenants');
    for (const t of tenantsRes.rows) {
      // 1. Seed Cash Register if none exists
      const regRes = await client.query('SELECT id FROM cash_registers WHERE tenant_id = $1', [t.id]);
      if (regRes.rowCount === 0) {
        await client.query(
          `INSERT INTO cash_registers (id, tenant_id, name, is_active)
           VALUES ($1, $2, 'Caisse Principale Guichet 1', true)`,
          [crypto.randomUUID(), t.id]
        );
        console.log(`-> Seeded cash register for tenant ${t.name}`);
      }

      // 2. Seed Insurance Companies if none exists
      const insRes = await client.query('SELECT id FROM insurance_companies WHERE tenant_id = $1', [t.id]);
      if (insRes.rowCount === 0) {
        const defaultInsurances = [
          { name: 'IPM SONATEL', code: 'IPM-SONATEL', phone: '+221338391200' },
          { name: 'AXA Assurances', code: 'AXA-SN', phone: '+221338493434' },
          { name: 'GMC Assurances / IPM', code: 'GMC-SN', phone: '+221338234567' },
          { name: 'Allianz Sénégal', code: 'ALLIANZ-SN', phone: '+221338898989' }
        ];

        for (const ins of defaultInsurances) {
          await client.query(
            `INSERT INTO insurance_companies (id, tenant_id, name, code, contact_phone, is_active)
             VALUES ($1, $2, $3, $4, $5, true)`,
            [crypto.randomUUID(), t.id, ins.name, ins.code, ins.phone]
          );
        }
        console.log(`-> Seeded default insurances for tenant ${t.name}`);
      }
    }

    console.log('Billing defaults seeding completed successfully!');
  } catch (err) {
    console.error('Seeding error:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

seedBillingDefaults();
