const { logAudit } = require('../middleware/audit');

// 1. Get Aging Balance Receivables Report
const getAgingBalance = async (req, res) => {
  const { bracket, insurance_company_id } = req.query;

  let queryStr = `SELECT * FROM view_aging_balance WHERE 1=1`;
  const params = [];

  if (bracket) {
    params.push(bracket.toUpperCase());
    queryStr += ` AND aging_bracket = $${params.length}`;
  }

  // Note: view_aging_balance retrieves data from tables with RLS enabled.
  // Querying it under req.dbClient inherits the active app.current_tenant_id session config.

  try {
    const result = await req.dbClient.query(queryStr, params);
    
    // Calculate summaries
    let totalUnpaid = 0;
    let patientOwed = 0;
    let insuranceOwed = 0;
    
    result.rows.forEach(row => {
      totalUnpaid += parseFloat(row.total_balance_due);
      patientOwed += parseFloat(row.patient_balance_due);
      insuranceOwed += parseFloat(row.insurance_balance_due);
    });

    await logAudit(req, 'EXPORT_AGING_BALANCE', 'invoices', req.user.tenant_id);

    return res.status(200).json({
      summary: {
        total_balance_due: totalUnpaid,
        patient_balance_due: patientOwed,
        insurance_balance_due: insuranceOwed,
        count: result.rowCount
      },
      data: result.rows
    });
  } catch (err) {
    console.error('Get aging balance error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve aging balance report' });
  }
};

// 2. Trigger Debt Recovery Action (Simulate SMS / WhatsApp reminder)
const triggerRecoveryAction = async (req, res) => {
  const { invoice_id, action_type, target_entity, recipient_contact, notes } = req.body;

  if (!invoice_id || !action_type || !target_entity || !recipient_contact) {
    return res.status(400).json({ error: 'Required fields missing: invoice_id, action_type, target_entity, recipient_contact' });
  }

  const tenantId = req.user.tenant_id;

  try {
    // Verify invoice exists
    const checkInv = await req.dbClient.query(
      `SELECT invoice_number FROM invoices WHERE id = $1`,
      [invoice_id]
    );

    if (checkInv.rowCount === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    const invoiceNum = checkInv.rows[0].invoice_number;

    // Simulate notification API delivery (Wave/WhatsApp/SMS simulator)
    const simulatedStatus = 'DELIVERED'; 

    const result = await req.dbClient.query(
      `INSERT INTO debt_recovery_actions (tenant_id, invoice_id, action_type, target_entity, recipient_contact, action_status, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        tenantId,
        invoice_id,
        action_type.toUpperCase(),
        target_entity.toUpperCase(),
        recipient_contact,
        simulatedStatus,
        notes || `Simulated ${action_type} reminder for Invoice ${invoiceNum}`
      ]
    );

    const action = result.rows[0];
    await logAudit(req, 'TRIGGER_RECOVERY_ACTION', 'debt_recovery_actions', action.id);

    return res.status(201).json({
      message: `Recovery action ${action_type} successfully simulated and logged.`,
      action
    });

  } catch (err) {
    console.error('Trigger recovery action error:', err.message);
    return res.status(500).json({ error: 'Failed to log recovery action' });
  }
};

module.exports = {
  getAgingBalance,
  triggerRecoveryAction
};
