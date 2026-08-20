const pool = require('../config/db');

async function addAddressToInsuranceCompanies() {
  const client = await pool.connect();
  try {
    console.log('Adding address column to insurance_companies table if not exists...');
    await client.query(`
      ALTER TABLE insurance_companies 
      ADD COLUMN IF NOT EXISTS address VARCHAR(255);
    `);
    console.log('Successfully added address column to insurance_companies.');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

addAddressToInsuranceCompanies();
