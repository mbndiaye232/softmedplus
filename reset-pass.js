const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

// Support both connectionString (Render PostgreSQL) or separate config variables
const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new Pool({
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

async function reset() {
  const email = 'mbndiaye@gmail.com';
  const newPassword = 'Soft2026';
  
  try {
    const hash = await bcrypt.hash(newPassword, 10);
    const result = await pool.query(
      "UPDATE users SET password_hash = $1 WHERE email = $2",
      [hash, email]
    );
    if (result.rowCount > 0) {
      console.log(`[Success] Password successfully reset to "${newPassword}" for user "${email}".`);
    } else {
      console.log(`[Warning] No user found with email "${email}".`);
    }
  } catch (err) {
    console.error('[Error] Failed to reset password:', err.message);
  } finally {
    await pool.end();
  }
}

reset();
