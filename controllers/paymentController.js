const { logAudit } = require('../middleware/audit');
const crypto = require('crypto');
const pool = require('../config/db');

// Coordonnées de paiement affichées au patient : ce sont les seules données de
// `credentials` autorisées à sortir du serveur. Tout le reste (clés et secrets API)
// ne doit jamais être renvoyé par l'API, même à un utilisateur authentifié du tenant.
const PUBLIC_CREDENTIAL_FIELDS = ['phone_number', 'account_number'];

const maskPaymentMethod = (method) => {
  if (!method) return method;
  const creds = method.credentials || {};
  const publicCreds = {};
  for (const field of PUBLIC_CREDENTIAL_FIELDS) {
    if (creds[field]) publicCreds[field] = creds[field];
  }
  const hasSecretCredentials = Object.keys(creds).some(
    (k) => !PUBLIC_CREDENTIAL_FIELDS.includes(k) && creds[k]
  );
  return { ...method, credentials: publicCreds, has_secret_credentials: hasSecretCredentials };
};

// Helper to record a payment and update the invoice balances/status
const processPaymentReconciliation = async (dbClient, req, paymentData) => {
  const {
    tenant_id,
    invoice_id,
    cash_session_id,
    received_by,
    amount,
    payment_method,
    tenant_payment_method_id,
    payer_type,
    transaction_reference
  } = paymentData;

  // A. Insert Payment
  const paymentId = crypto.randomUUID();
  await dbClient.query(
    `INSERT INTO payments (id, tenant_id, invoice_id, cash_session_id, received_by, amount, payment_method, tenant_payment_method_id, payer_type, transaction_reference)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [
      paymentId,
      tenant_id,
      invoice_id,
      cash_session_id || null,
      received_by,
      parseFloat(amount),
      payment_method,
      tenant_payment_method_id || null,
      payer_type,
      transaction_reference || null
    ]
  );

  // B. Lock and Fetch current invoice status
  const invoiceRes = await dbClient.query(
    `SELECT * FROM invoices WHERE id = $1 AND tenant_id = $2 FOR UPDATE`,
    [invoice_id, tenant_id]
  );

  if (invoiceRes.rowCount === 0) {
    throw new Error('Invoice not found');
  }

  const invoice = invoiceRes.rows[0];

  // C. Recalculate paid amounts
  let newPatientPaid = parseFloat(invoice.patient_paid_amount);
  let newInsurancePaid = parseFloat(invoice.insurance_paid_amount);

  if (payer_type === 'PATIENT') {
    newPatientPaid += parseFloat(amount);
  } else {
    newInsurancePaid += parseFloat(amount);
  }

  const totalPaid = newPatientPaid + newInsurancePaid;
  const netAmount = parseFloat(invoice.total_amount_net);

  let newStatus = invoice.status;
  if (totalPaid >= netAmount) {
    newStatus = 'PAID';
  } else if (totalPaid > 0) {
    newStatus = 'PARTIALLY_PAID';
  }

  // D. Update Invoice
  const updatedInvoiceRes = await dbClient.query(
    `UPDATE invoices 
     SET patient_paid_amount = $1, insurance_paid_amount = $2, status = $3
     WHERE id = $4
     RETURNING *`,
    [newPatientPaid, newInsurancePaid, newStatus, invoice_id]
  );

  // E. If invoice is paid and is linked to an appointment, verify if we need to confirm appointment
  if (invoice.appointment_id) {
    const appRes = await dbClient.query(
      `SELECT status FROM appointments WHERE id = $1`,
      [invoice.appointment_id]
    );
    if (appRes.rowCount > 0 && appRes.rows[0].status === 'PENDING_PAYMENT') {
      // Confirm the appointment now that deposit or payment is received
      await dbClient.query(
        `UPDATE appointments SET status = 'CONFIRMED' WHERE id = $1`,
        [invoice.appointment_id]
      );
    }
  }

  return { paymentId, invoice: updatedInvoiceRes.rows[0] };
};

// 1. Record Offline Payment (CASH, CHECK, etc.)
const recordPayment = async (req, res) => {
  const { invoice_id, cash_session_id, amount, payment_method, payer_type, transaction_reference } = req.body;

  if (!invoice_id || !amount || !payment_method || !payer_type) {
    return res.status(400).json({ error: 'Required fields missing: invoice_id, amount, payment_method, payer_type' });
  }

  const tenantId = req.user.tenant_id;
  const cashierId = req.user.id;

  try {
    const recon = await processPaymentReconciliation(req.dbClient, req, {
      tenant_id: tenantId,
      invoice_id,
      cash_session_id,
      received_by: cashierId,
      amount,
      payment_method,
      tenant_payment_method_id: null,
      payer_type,
      transaction_reference
    });

    await logAudit(req, 'RECORD_PAYMENT', 'payments', recon.paymentId);

    return res.status(201).json(recon);
  } catch (err) {
    console.error('Record payment error:', err.message);
    return res.status(500).json({ error: err.message || 'Failed to record payment' });
  }
};

// 2. Configure/Activate/Create Payment Method
const configurePaymentMethod = async (req, res) => {
  const { id, provider, name, credentials, is_active, qr_code_template } = req.body;

  if (!provider || !name) {
    return res.status(400).json({ error: 'Required fields: provider, name' });
  }

  const tenantId = req.user.tenant_id;

  try {
    if (id) {
      // Update existing method by ID.
      // Les credentials sont fusionnés (et non remplacés) : l'API ne renvoyant plus les
      // secrets, une modification depuis l'interface ne doit pas effacer une clé existante.
      const result = await req.dbClient.query(
        `UPDATE tenant_payment_methods
         SET name = $1, credentials = COALESCE(credentials, '{}'::jsonb) || $2::jsonb, is_active = $3, qr_code_template = $4
         WHERE id = $5 AND tenant_id = $6
         RETURNING *`,
        [
          name,
          JSON.stringify(credentials || {}),
          is_active === undefined ? true : is_active,
          qr_code_template || null,
          id,
          tenantId
        ]
      );
      if (result.rowCount > 0) {
        return res.status(200).json(maskPaymentMethod(result.rows[0]));
      }
    }

    // Try to update by provider for backward compatibility/presets
    const resultByProvider = await req.dbClient.query(
      `UPDATE tenant_payment_methods
       SET name = $1, credentials = COALESCE(credentials, '{}'::jsonb) || $2::jsonb, is_active = $3, qr_code_template = $4
       WHERE tenant_id = $5 AND provider = $6
       RETURNING *`,
      [
        name,
        JSON.stringify(credentials || {}),
        is_active === undefined ? true : is_active,
        qr_code_template || null,
        tenantId,
        provider.toUpperCase().trim()
      ]
    );

    if (resultByProvider.rowCount > 0) {
      return res.status(200).json(maskPaymentMethod(resultByProvider.rows[0]));
    }

    // If it doesn't exist under this tenant at all, create it dynamically
    const newMethod = await req.dbClient.query(
      `INSERT INTO tenant_payment_methods (tenant_id, provider, name, credentials, is_active, qr_code_template)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        tenantId,
        provider.toUpperCase().trim(),
        name,
        JSON.stringify(credentials || {}),
        is_active === undefined ? true : is_active,
        qr_code_template || null
      ]
    );
    return res.status(201).json(maskPaymentMethod(newMethod.rows[0]));
  } catch (err) {
    console.error('Configure payment method error:', err.message);
    return res.status(500).json({ error: 'Failed to configure payment method' });
  }
};

// 3. Get Tenant's Configured Payment Methods
const getPaymentMethods = async (req, res) => {
  const tenantId = req.user.tenant_id;
  try {
    const result = await req.dbClient.query(
      `SELECT id, provider, name, credentials, is_active, qr_code_template FROM tenant_payment_methods WHERE tenant_id = $1`,
      [tenantId]
    );
    return res.status(200).json(result.rows.map(maskPaymentMethod));
  } catch (err) {
    console.error('Get payment methods error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve payment gateways' });
  }
};

// 4. Initialize Online Payment (Returns checkouts / dynamic QR data)
const initializeOnlinePayment = async (req, res) => {
  const { invoice_id, tenant_payment_method_id, amount, payer_type } = req.body;
  const tenantId = req.user.tenant_id;

  if (!invoice_id || !tenant_payment_method_id || !amount || !payer_type) {
    return res.status(400).json({ error: 'Required fields missing: invoice_id, tenant_payment_method_id, amount, payer_type' });
  }

  try {
    // Fetch payment gateway configuration
    const pmRes = await req.dbClient.query(
      `SELECT * FROM tenant_payment_methods WHERE id = $1 AND tenant_id = $2 AND is_active = true`,
      [tenant_payment_method_id, tenantId]
    );

    if (pmRes.rowCount === 0) {
      return res.status(404).json({ error: 'Selected online payment gateway is inactive or not found' });
    }

    const gateway = pmRes.rows[0];
    const internalRef = `TX-INIT-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    let checkoutUrl = '';
    let qrCodeData = '';

    // Generate simulated provider parameters
    switch (gateway.provider) {
      case 'WAVE':
        checkoutUrl = `https://mock.wave.com/pay?c=${internalRef}&amount=${amount}`;
        qrCodeData = `WAVE_PAYLOAD_QR_${internalRef}_${amount}`;
        break;
      case 'ORANGE_MONEY':
        checkoutUrl = `https://mock.orangemoney.sn/webpay?token=${crypto.randomBytes(8).toString('hex')}`;
        qrCodeData = `OM_PAYLOAD_QR_${internalRef}`;
        break;
      case 'YAS':
        checkoutUrl = `https://mock.yas.sn/pay/${internalRef}`;
        qrCodeData = `YAS_PAYLOAD_QR_${internalRef}`;
        break;
      case 'SPI':
        checkoutUrl = '';
        qrCodeData = `SPI_QR_IBAN:${gateway.credentials.account_number || 'SN0000000000000000000'}|REF:${internalRef}`;
        break;
      default:
        checkoutUrl = `https://mock.checkout.sn/card?ref=${internalRef}`;
    }

    return res.status(200).json({
      transaction_reference: internalRef,
      payment_method: gateway.provider,
      tenant_payment_method_id: gateway.id,
      amount,
      checkout_url: checkoutUrl,
      qr_code_data: qrCodeData,
      qr_code_url: gateway.qr_code_template || null,
      instructions: gateway.provider === 'SPI' 
        ? `Please make bank transfer referencing: ${internalRef}` 
        : (gateway.credentials && gateway.credentials.phone_number 
            ? `Veuillez effectuer le paiement au numéro: ${gateway.credentials.phone_number}` 
            : null)
    });

  } catch (err) {
    console.error('Initialize online payment error:', err.message);
    return res.status(500).json({ error: 'Failed to initialize online payment session' });
  }
};

// 5. Public Webhook Handler (Bypasses token auth, but handles RLS manually by looking up the billing tenant)
const handleWebhook = async (req, res) => {
  const { provider } = req.params;
  const { transaction_reference, amount, invoice_id, status } = req.body;

  if (!transaction_reference || !amount || !invoice_id) {
    return res.status(400).json({ error: 'Required fields missing: transaction_reference, amount, invoice_id' });
  }

  if (status !== 'SUCCESS') {
    return res.status(200).json({ message: 'Webhook received but payment is not successful. Skipping.' });
  }

  // Check out a client from the pool to run bypassed queries
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // Enable RLS bypass to fetch the invoice and resolve its tenant ID
    await client.query(`SELECT set_config('app.bypass_rls', 'true', true)`);

    const invRes = await client.query(
      `SELECT tenant_id, id, patient_id FROM invoices WHERE id = $1`,
      [invoice_id]
    );

    if (invRes.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Invoice associated with webhook not found' });
    }

    const invoice = invRes.rows[0];

    // Find the system superadmin user for this tenant to mark as received_by
    const adminUserRes = await client.query(
      `SELECT id FROM users WHERE tenant_id = $1 ORDER BY (role = 'SUPER_ADMIN') DESC LIMIT 1`,
      [invoice.tenant_id]
    );

    if (adminUserRes.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(500).json({ error: 'No admin user found for RLS billing verification' });
    }

    const adminId = adminUserRes.rows[0].id;

    // Find the payment method ID
    const pmRes = await client.query(
      `SELECT id FROM tenant_payment_methods WHERE tenant_id = $1 AND provider = $2`,
      [invoice.tenant_id, provider.toUpperCase()]
    );

    const pmId = pmRes.rowCount > 0 ? pmRes.rows[0].id : null;

    // Set RLS scope to the invoice's tenant
    await client.query(`SELECT set_config('app.current_tenant_id', $1, true)`, [invoice.tenant_id]);

    const recon = await processPaymentReconciliation(client, req, {
      tenant_id: invoice.tenant_id,
      invoice_id: invoice.id,
      cash_session_id: null,
      received_by: adminId,
      amount,
      payment_method: provider.toUpperCase(),
      tenant_payment_method_id: pmId,
      payer_type: 'PATIENT',
      transaction_reference
    });

    await client.query('COMMIT');

    console.log(`Successfully reconciled Invoice ${invoice.id} for ${amount} via webhook ${provider}`);
    return res.status(200).json({ success: true, invoice_status: recon.invoice.status });

  } catch (err) {
    try { await client.query('ROLLBACK'); } catch(e) {}
    console.error('Webhook processing error:', err.message);
    return res.status(500).json({ error: `Failed to process payment webhook reconciliations: ${err.message}` });
  } finally {
    client.release();
  }
};

// 6. Delete Payment Method
const deletePaymentMethod = async (req, res) => {
  const { id } = req.params;
  const tenantId = req.user.tenant_id;

  try {
    const result = await req.dbClient.query(
      `DELETE FROM tenant_payment_methods 
       WHERE id = $1 AND tenant_id = $2
       RETURNING *`,
      [id, tenantId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Payment method not found' });
    }

    return res.status(200).json({ message: 'Payment method deleted successfully' });
  } catch (err) {
    console.error('Delete payment method error:', err.message);
    return res.status(500).json({ error: 'Failed to delete payment method' });
  }
};

module.exports = {
  recordPayment,
  configurePaymentMethod,
  getPaymentMethods,
  initializeOnlinePayment,
  handleWebhook,
  deletePaymentMethod
};
