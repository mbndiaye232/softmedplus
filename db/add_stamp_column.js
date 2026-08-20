const pool = require('../config/db');

async function addStampColumn() {
  const client = await pool.connect();
  try {
    console.log('Adding stamp_url column to tenants table...');
    await client.query(`ALTER TABLE tenants ADD COLUMN IF NOT EXISTS stamp_url VARCHAR(500);`);
    
    // Also set a default sample stamp for existing clinics if none set
    await client.query(`UPDATE tenants SET stamp_url = '/stamp-default.png' WHERE stamp_url IS NULL;`);
    
    console.log('stamp_url column added successfully!');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

addStampColumn();
