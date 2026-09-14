const pool = require('../config/db');

async function migrateAppointmentReminders() {
  const client = await pool.connect();
  try {
    console.log('Adding appointment reminder support...');

    await client.query(`
      DO $$ BEGIN
        CREATE TYPE reminder_channel AS ENUM ('SMS', 'WHATSAPP');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await client.query(`ALTER TABLE appointments ADD COLUMN IF NOT EXISTS reminder_enabled BOOLEAN NOT NULL DEFAULT true;`);
    await client.query(`ALTER TABLE appointments ADD COLUMN IF NOT EXISTS reminder_hours_before INT NOT NULL DEFAULT 3;`);
    await client.query(`ALTER TABLE appointments ADD COLUMN IF NOT EXISTS reminder_channel reminder_channel NOT NULL DEFAULT 'SMS';`);
    await client.query(`ALTER TABLE appointments ADD COLUMN IF NOT EXISTS reminder_sent_at TIMESTAMPTZ;`);

    console.log('Appointment reminder columns added successfully!');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

migrateAppointmentReminders();
