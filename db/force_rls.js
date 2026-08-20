const pool = require('../config/db');

async function forceRLS() {
  const client = await pool.connect();
  const tables = [
    'users', 'patients', 'medical_records', 'consultation_notes', 'prescriptions',
    'prescription_items', 'medical_documents', 'medical_services', 'practitioners',
    'appointments', 'cash_registers', 'cash_sessions', 'invoices', 'invoice_lines',
    'payments', 'ipm_claims_batches', 'ipm_claims_items', 'debt_recovery_actions',
    'stock_items', 'stock_lots', 'stock_movements', 'medical_audit_logs',
    'patient_statuses', 'patient_treatments', 'patient_lab_orders'
  ];

  try {
    for (const table of tables) {
      await client.query(`ALTER TABLE ${table} FORCE ROW LEVEL SECURITY;`);
    }
    console.log('Successfully forced RLS on all tenant tables!');
  } catch (err) {
    console.error('Error forcing RLS:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

forceRLS();
