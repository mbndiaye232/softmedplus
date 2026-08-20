const pool = require('../config/db');

async function dropConstraint() {
  const client = await pool.connect();
  try {
    console.log('Dropping patients_status_check constraint...');
    await client.query(`
      ALTER TABLE patients DROP CONSTRAINT IF EXISTS patients_status_check;
    `);
    console.log('Successfully dropped patients_status_check constraint!');
  } catch (err) {
    console.error('Error dropping constraint:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

dropConstraint();
