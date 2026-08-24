const pool = require('../config/db');

async function migrateUserPermissions() {
  console.log('--- Starting User Permissions & RBAC Migration ---');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Add permissions and preset_name columns if not existing
    console.log('Adding permissions and preset_name columns to users table...');
    await client.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS permissions JSONB NOT NULL DEFAULT '{}',
      ADD COLUMN IF NOT EXISTS preset_name VARCHAR(50) DEFAULT 'CUSTOM';
    `);

    // 2. Change role column from enum to VARCHAR if necessary to accommodate new role hierarchy
    try {
      await client.query(`
        ALTER TABLE users ALTER COLUMN role TYPE VARCHAR(50) USING role::VARCHAR;
      `);
      console.log('Converted users.role to VARCHAR(50).');
    } catch (e) {
      console.log('users.role is already compatible.');
    }

    // 3. Define full admin permissions
    const allModules = [
      'dashboard', 'agenda', 'practitioners', 'patients',
      'consultations', 'prescriptions', 'cash_register',
      'invoices', 'inventory', 'hospitalization',
      'reports', 'settings', 'users'
    ];

    const fullPermissions = {};
    allModules.forEach(mod => {
      fullPermissions[mod] = { view: true, create: true, update: true, delete: true };
    });

    const readOnlyPermissions = {};
    allModules.forEach(mod => {
      readOnlyPermissions[mod] = { view: true, create: false, update: false, delete: false };
    });

    // 4. Update existing SUPER_ADMIN users to TENANT_ADMIN / SUPER_ADMIN with full permissions
    await client.query(`
      UPDATE users 
      SET permissions = $1, preset_name = 'ADMIN'
      WHERE role IN ('SUPER_ADMIN', 'TENANT_ADMIN', 'ADMIN') OR permissions = '{}'::jsonb
    `, [JSON.stringify(fullPermissions)]);

    // 5. Update doctors presets
    const doctorPerms = { ...readOnlyPermissions };
    ['dashboard', 'agenda', 'patients', 'consultations', 'prescriptions'].forEach(m => {
      doctorPerms[m] = { view: true, create: true, update: true, delete: false };
    });
    await client.query(`
      UPDATE users 
      SET permissions = $1, preset_name = 'DOCTOR', role = 'TENANT_USER'
      WHERE role = 'DOCTOR'
    `, [JSON.stringify(doctorPerms)]);

    // 6. Update secretary presets
    const secretaryPerms = { ...readOnlyPermissions };
    ['dashboard', 'agenda', 'patients'].forEach(m => {
      secretaryPerms[m] = { view: true, create: true, update: true, delete: false };
    });
    await client.query(`
      UPDATE users 
      SET permissions = $1, preset_name = 'SECRETARY', role = 'TENANT_USER'
      WHERE role = 'SECRETARY'
    `, [JSON.stringify(secretaryPerms)]);

    // 7. Update cashier presets
    const cashierPerms = { ...readOnlyPermissions };
    ['dashboard', 'cash_register', 'invoices'].forEach(m => {
      cashierPerms[m] = { view: true, create: true, update: true, delete: false };
    });
    await client.query(`
      UPDATE users 
      SET permissions = $1, preset_name = 'CASHIER', role = 'TENANT_USER'
      WHERE role = 'CASHIER'
    `, [JSON.stringify(cashierPerms)]);

    // 8. Update pharmacist presets
    const pharmaPerms = { ...readOnlyPermissions };
    ['dashboard', 'inventory', 'prescriptions'].forEach(m => {
      pharmaPerms[m] = { view: true, create: true, update: true, delete: false };
    });
    await client.query(`
      UPDATE users 
      SET permissions = $1, preset_name = 'PHARMACIST', role = 'TENANT_USER'
      WHERE role = 'PHARMACIST'
    `, [JSON.stringify(pharmaPerms)]);

    await client.query('COMMIT');
    console.log('✅ User permissions migration completed successfully.');
    process.exit(0);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', err);
    process.exit(1);
  } finally {
    client.release();
  }
}

migrateUserPermissions();
