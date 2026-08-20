const { logAudit } = require('../middleware/audit');
const crypto = require('crypto');

// 1. Open Cash Session
const openCashSession = async (req, res) => {
  const { cash_register_id, opening_balance } = req.body;

  if (!cash_register_id) {
    return res.status(400).json({ error: 'Cash register ID is required' });
  }

  const tenantId = req.user.tenant_id;
  const cashierId = req.user.id;

  try {
    // Check if this cashier already has an open session
    const activeCheck = await req.dbClient.query(
      `SELECT id FROM cash_sessions WHERE tenant_id = $1 AND cashier_id = $2 AND status = 'OPEN'`,
      [tenantId, cashierId]
    );

    if (activeCheck.rowCount > 0) {
      return res.status(400).json({ error: 'You already have an active open cash session' });
    }

    const sessionRes = await req.dbClient.query(
      `INSERT INTO cash_sessions (tenant_id, cash_register_id, cashier_id, opening_balance, status)
       VALUES ($1, $2, $3, $4, 'OPEN')
       RETURNING *`,
      [tenantId, cash_register_id, cashierId, parseFloat(opening_balance || 0)]
    );

    const session = sessionRes.rows[0];
    await logAudit(req, 'OPEN_CASH_SESSION', 'cash_sessions', session.id);

    return res.status(201).json(session);
  } catch (err) {
    console.error('Open cash session error:', err.message);
    return res.status(500).json({ error: 'Failed to open cash session' });
  }
};

// 2. Close Cash Session
const closeCashSession = async (req, res) => {
  const { id } = req.params;
  const { closing_balance_declared } = req.body;

  if (closing_balance_declared === undefined) {
    return res.status(400).json({ error: 'Closing balance declared is required' });
  }

  try {
    // Fetch session details
    const sessionRes = await req.dbClient.query(
      `SELECT * FROM cash_sessions WHERE id = $1 AND status = 'OPEN'`,
      [id]
    );

    if (sessionRes.rowCount === 0) {
      return res.status(404).json({ error: 'Active cash session not found' });
    }

    const session = sessionRes.rows[0];

    // Calculate total payments received during this session in CASH
    const paymentsRes = await req.dbClient.query(
      `SELECT SUM(amount) AS total_cash FROM payments 
       WHERE cash_session_id = $1 AND payment_method = 'CASH'`,
      [id]
    );

    const totalCashCollected = parseFloat(paymentsRes.rows[0].total_cash || 0);
    const openingBalance = parseFloat(session.opening_balance);
    const calculatedBalance = openingBalance + totalCashCollected;

    // Update session
    const updateRes = await req.dbClient.query(
      `UPDATE cash_sessions 
       SET status = 'CLOSED', closing_time = NOW(), closing_balance_declared = $1, closing_balance_calculated = $2
       WHERE id = $3
       RETURNING *`,
      [parseFloat(closing_balance_declared), calculatedBalance, id]
    );

    const closedSession = updateRes.rows[0];
    await logAudit(req, 'CLOSE_CASH_SESSION', 'cash_sessions', id);

    return res.status(200).json(closedSession);
  } catch (err) {
    console.error('Close cash session error:', err.message);
    return res.status(500).json({ error: 'Failed to close cash session' });
  }
};

// 3. Create Invoice (with Tiers-Payant Ventilation)
const createInvoice = async (req, res) => {
  const { patient_id, appointment_id, insurance_company_id, discount_amount, lines } = req.body;

  if (!patient_id || !lines || lines.length === 0) {
    return res.status(400).json({ error: 'Required fields missing: patient_id, lines' });
  }

  const tenantId = req.user.tenant_id;
  const invoiceNumber = `FAC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

  // Validate UUID formats
  const isValidUUID = str => typeof str === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
  const validInsuranceId = isValidUUID(insurance_company_id) ? insurance_company_id : null;
  const validAppointmentId = isValidUUID(appointment_id) ? appointment_id : null;

  try {
    // A. Calculate gross amount
    let totalGross = 0;
    for (const line of lines) {
      line.total = parseFloat(line.quantity || 1) * parseFloat(line.unit_price || 0);
      totalGross += line.total;
    }

    const discount = parseFloat(discount_amount || 0);
    const netAmount = totalGross - discount;

    // B. Check insurance coverage if company is supplied
    let coverageRate = 0;
    if (validInsuranceId) {
      const policyRes = await req.dbClient.query(
        `SELECT coverage_rate_percent FROM patient_insurance_policies 
         WHERE patient_id = $1 AND insurance_company_id = $2 AND is_primary = true`,
        [patient_id, validInsuranceId]
      );
      if (policyRes.rowCount > 0) {
        coverageRate = parseFloat(policyRes.rows[0].coverage_rate_percent);
      } else {
        // Default standard IPM / Tiers-payant coverage rate of 80% if selected
        coverageRate = 80;
      }
    }

    // C. Perform Ventilation calculations
    const insuranceShare = Math.round(netAmount * (coverageRate / 100));
    const patientShare = netAmount - insuranceShare;

    // Fetch tenant settings to get grace period
    let gracePeriod = 30;
    try {
      const tenantRes = await req.dbClient.query(`SELECT settings FROM tenants WHERE id = $1`, [tenantId]);
      if (tenantRes.rowCount > 0 && tenantRes.rows[0].settings) {
        gracePeriod = tenantRes.rows[0].settings.grace_period_days || 30;
      }
    } catch (e) {}

    const issueDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(issueDate.getDate() + gracePeriod);

    // D. Insert Invoice
    const invoiceRes = await req.dbClient.query(
      `INSERT INTO invoices (tenant_id, invoice_number, patient_id, appointment_id, insurance_company_id, total_amount_gross, discount_amount, total_amount_net, patient_share_amount, insurance_share_amount, status, issue_date, due_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'ISSUED', $11, $12)
       RETURNING *`,
      [
        tenantId,
        invoiceNumber,
        patient_id,
        validAppointmentId,
        validInsuranceId,
        totalGross,
        discount,
        netAmount,
        patientShare,
        insuranceShare,
        issueDate.toISOString().split('T')[0],
        dueDate.toISOString().split('T')[0]
      ]
    );

    const invoice = invoiceRes.rows[0];
    invoice.lines = [];

    // E. Insert Invoice Lines
    for (const line of lines) {
      const validServiceId = isValidUUID(line.service_id) ? line.service_id : null;
      const lineRes = await req.dbClient.query(
        `INSERT INTO invoice_lines (invoice_id, service_id, description, quantity, unit_price, total_line_amount)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [
          invoice.id,
          validServiceId,
          line.description || 'Prestation Médicale',
          parseInt(line.quantity || 1),
          parseFloat(line.unit_price || 0),
          line.total
        ]
      );
      invoice.lines.push(lineRes.rows[0]);
    }

    await logAudit(req, 'CREATE_INVOICE', 'invoices', invoice.id);

    return res.status(201).json(invoice);

  } catch (err) {
    console.error('Create invoice error:', err.message);
    return res.status(500).json({ error: `Failed to create invoice: ${err.message}` });
  }
};

// 4. Get Invoices
const getInvoices = async (req, res) => {
  const tenantId = req.user.tenant_id;
  try {
    const result = await req.dbClient.query(
      `SELECT i.*, p.first_name AS patient_first, p.last_name AS patient_last, p.patient_code,
              ic.name AS insurance_name
       FROM invoices i
       JOIN patients p ON i.patient_id = p.id
       LEFT JOIN insurance_companies ic ON i.insurance_company_id = ic.id
       WHERE i.tenant_id = $1
       ORDER BY i.created_at DESC`,
      [tenantId]
    );
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get invoices error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve invoices' });
  }
};

// 5. Get Cash Registers
const getCashRegisters = async (req, res) => {
  const tenantId = req.user.tenant_id;
  try {
    const result = await req.dbClient.query(
      `SELECT * FROM cash_registers WHERE tenant_id = $1 AND is_active = true ORDER BY name ASC`,
      [tenantId]
    );
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get cash registers error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve cash registers' });
  }
};

// 6. Get Insurance Companies
const getInsurances = async (req, res) => {
  const tenantId = req.user.tenant_id;
  try {
    const result = await req.dbClient.query(
      `SELECT * FROM insurance_companies WHERE tenant_id = $1 AND is_active = true ORDER BY name ASC`,
      [tenantId]
    );
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get insurances error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve insurances' });
  }
};

// 7. Get Complete Invoice Details (for Patient Invoice & IPM Claim Printouts)
const getInvoiceDetails = async (req, res) => {
  const { id } = req.params;
  const tenantId = req.user.tenant_id;

  try {
    // A. Invoice, Patient & Insurance info
    const invRes = await req.dbClient.query(
      `SELECT i.*, 
              p.first_name AS patient_first, p.last_name AS patient_last, p.patient_code, p.phone_number AS patient_phone, p.date_of_birth, p.gender,
              ic.name AS insurance_name, ic.code AS insurance_code, ic.contact_phone AS insurance_phone,
              pip.policy_number, pip.coverage_rate_percent AS policy_coverage_rate
       FROM invoices i
       JOIN patients p ON i.patient_id = p.id
       LEFT JOIN insurance_companies ic ON i.insurance_company_id = ic.id
       LEFT JOIN patient_insurance_policies pip ON (pip.patient_id = p.id AND pip.insurance_company_id = ic.id AND pip.is_primary = true)
       WHERE i.id = $1 AND i.tenant_id = $2`,
      [id, tenantId]
    );

    if (invRes.rowCount === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    const invoice = invRes.rows[0];

    // B. Tenant Details (Header & Official Stamp)
    const tenantRes = await req.dbClient.query(
      `SELECT id, name, slug, phone_number, ninea_rc, logo_url, stamp_url, address, email, settings
       FROM tenants WHERE id = $1`,
      [tenantId]
    );
    const tenant = tenantRes.rows[0] || {};

    // C. Invoice Lines
    const linesRes = await req.dbClient.query(
      `SELECT il.*, ms.name AS service_name, ms.code AS service_code
       FROM invoice_lines il
       LEFT JOIN medical_services ms ON il.service_id = ms.id
       WHERE il.invoice_id = $1
       ORDER BY il.id ASC`,
      [id]
    );

    // D. Payments History
    const paymentsRes = await req.dbClient.query(
      `SELECT p.*, u.first_name AS cashier_first, u.last_name AS cashier_last
       FROM payments p
       LEFT JOIN users u ON p.received_by = u.id
       WHERE p.invoice_id = $1
       ORDER BY p.payment_date ASC`,
      [id]
    );

    return res.status(200).json({
      invoice,
      tenant,
      lines: linesRes.rows,
      payments: paymentsRes.rows
    });

  } catch (err) {
    console.error('Get invoice details error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve invoice details' });
  }
};

module.exports = {
  openCashSession,
  closeCashSession,
  createInvoice,
  getInvoices,
  getCashRegisters,
  getInsurances,
  getInvoiceDetails
};
