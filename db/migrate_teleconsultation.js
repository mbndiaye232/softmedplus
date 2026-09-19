const pool = require('../config/db');

async function migrateTeleconsultation() {
  const client = await pool.connect();
  try {
    console.log('Adding teleconsultation support to appointments table...');

    await client.query(`
      DO $$ BEGIN
        CREATE TYPE consultation_mode AS ENUM ('PRESENTIEL', 'TELECONSULTATION');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await client.query(`ALTER TABLE appointments ADD COLUMN IF NOT EXISTS consultation_mode consultation_mode NOT NULL DEFAULT 'PRESENTIEL';`);
    await client.query(`ALTER TABLE appointments ADD COLUMN IF NOT EXISTS video_room_slug VARCHAR(64);`);

    console.log('Teleconsultation columns added successfully!');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

migrateTeleconsultation();
