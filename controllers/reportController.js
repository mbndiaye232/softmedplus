const { logAudit } = require('../middleware/audit');

// 1. Get Aging Balance Receivables Report
const getAgingBalance = async (req, res) => {
  const { bracket, insurance_company_id } = req.query;
  const tenantId = req.user.tenant_id;

  let queryStr = `SELECT * FROM view_aging_balance WHERE tenant_id = $1`;
  const params = [tenantId];

  if (bracket) {
    params.push(bracket.toUpperCase());
    queryStr += ` AND aging_bracket = $${params.length}`;
  }

  if (insurance_company_id) {
    params.push(insurance_company_id);
    queryStr += ` AND insurance_company_id = $${params.length}`;
  }

  // Note: view_aging_balance retrieves data from tables with RLS enabled.
  // Querying it under req.dbClient inherits the active app.current_tenant_id session config.

  try {
    const result = await req.dbClient.query(queryStr, params);
    
    // Calculate summaries
    let totalUnpaid = 0;
    let patientOwed = 0;
    let insuranceOwed = 0;
    
    (result.rows || []).forEach(row => {
      totalUnpaid += parseFloat(row?.total_balance_due || 0);
      patientOwed += parseFloat(row?.patient_balance_due || 0);
      insuranceOwed += parseFloat(row?.insurance_balance_due || 0);
    });

    try {
      await logAudit(req, 'EXPORT_AGING_BALANCE', 'invoices', tenantId);
    } catch (e) {}

    return res.status(200).json({
      summary: {
        total_balance_due: totalUnpaid,
        patient_balance_due: patientOwed,
        insurance_balance_due: insuranceOwed,
        count: result.rowCount || 0
      },
      data: result.rows || []
    });
  } catch (err) {
    console.error('Get aging balance error:', err.message);
    return res.status(200).json({
      summary: { total_balance_due: 0, patient_balance_due: 0, insurance_balance_due: 0, count: 0 },
      data: []
    });
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
      `SELECT invoice_number FROM invoices WHERE id = $1 AND tenant_id = $2`,
      [invoice_id, tenantId]
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

// 3. Complete Clinical & Financial Dashboard Analytics
const getDashboardAnalytics = async (req, res) => {
  const tenantId = req.user.tenant_id;

  try {
    // 1. Total Patients, Status breakdown, and This Month Growth
    const patientsSummary = await req.dbClient.query(`
      SELECT 
        COUNT(*)::int as total_patients,
        COUNT(*) FILTER (WHERE created_at >= DATE_TRUNC('month', NOW()))::int as new_this_month,
        COUNT(*) FILTER (WHERE created_at >= DATE_TRUNC('month', NOW() - INTERVAL '1 month') AND created_at < DATE_TRUNC('month', NOW()))::int as new_last_month,
        COUNT(*) FILTER (WHERE status = 'Interne' OR status_id IN (SELECT id FROM patient_statuses WHERE code = 'INTERNE'))::int as internal_patients,
        COUNT(*) FILTER (WHERE status = 'Externe' OR status = 'Ambulatoire' OR status_id IN (SELECT id FROM patient_statuses WHERE code IN ('EXTERNE', 'AMBULATOIRE')))::int as external_patients
      FROM patients
      WHERE tenant_id = $1
    `, [tenantId]);

    // 2. Patients & CA per Doctor
    const doctorsStats = await req.dbClient.query(`
      SELECT 
        pr.id as practitioner_id,
        CONCAT(COALESCE(pr.title, 'Dr.'), ' ', pr.first_name, ' ', pr.last_name) as doctor_name,
        COALESCE(pr.specialty_name, 'Médecine Générale') as specialty,
        COALESCE(pr.status, 'Interne') as status,
        pr.color_code,
        COUNT(DISTINCT p.id)::int as patient_count,
        COALESCE(SUM(i.total_amount_net), 0)::numeric as total_invoiced,
        COALESCE(SUM(i.patient_paid_amount + i.insurance_paid_amount), 0)::numeric as total_collected,
        COUNT(DISTINCT c.id)::int as consultation_count
      FROM practitioners pr
      LEFT JOIN patients p ON p.attending_practitioner_id = pr.id AND p.tenant_id = pr.tenant_id
      LEFT JOIN consultation_notes c ON c.practitioner_id = pr.id AND c.tenant_id = pr.tenant_id
      LEFT JOIN appointments a ON a.practitioner_id = pr.id AND a.tenant_id = pr.tenant_id
      LEFT JOIN invoices i ON (i.appointment_id = a.id OR i.patient_id = p.id) AND i.tenant_id = pr.tenant_id
      WHERE pr.tenant_id = $1 AND pr.is_active = true
      GROUP BY pr.id, pr.title, pr.first_name, pr.last_name, pr.specialty_name, pr.status, pr.color_code
      ORDER BY patient_count DESC, total_invoiced DESC
    `, [tenantId]);

    // 3. Patients & CA per Pathology / Diagnostic
    const pathologyStats = await req.dbClient.query(`
      WITH path_cases AS (
        SELECT 
          c.id as consultation_id,
          c.patient_id,
          c.tenant_id,
          COALESCE(NULLIF(TRIM(c.diagnosis_text), ''), 'Consultation Générale') as pathology
        FROM consultation_notes c
        WHERE c.tenant_id = $1
      )
      SELECT 
        pc.pathology,
        COUNT(DISTINCT pc.patient_id)::int as patient_count,
        COUNT(pc.consultation_id)::int as case_count,
        COALESCE(SUM(i.total_amount_net), 0)::numeric as total_invoiced,
        COALESCE(SUM(i.patient_paid_amount + i.insurance_paid_amount), 0)::numeric as total_collected
      FROM path_cases pc
      LEFT JOIN invoices i ON i.patient_id = pc.patient_id AND i.tenant_id = pc.tenant_id
      GROUP BY pc.pathology
      ORDER BY patient_count DESC, total_invoiced DESC
      LIMIT 10
    `, [tenantId]);

    // 4. Financial CA Total & Recovery Rate
    const financialStats = await req.dbClient.query(`
      SELECT 
        COALESCE(SUM(total_amount_net), 0)::numeric as total_invoiced,
        COALESCE(SUM(patient_paid_amount + insurance_paid_amount), 0)::numeric as total_collected,
        COALESCE(SUM(total_amount_net - (patient_paid_amount + insurance_paid_amount)), 0)::numeric as total_due,
        COALESCE(SUM(patient_share_amount), 0)::numeric as patient_share_total,
        COALESCE(SUM(insurance_share_amount), 0)::numeric as insurance_share_total,
        COUNT(*)::int as invoice_count,
        COUNT(*) FILTER (WHERE status = 'PAID')::int as paid_invoices_count,
        COUNT(*) FILTER (WHERE status = 'OVERDUE' OR (due_date < CURRENT_DATE AND (total_amount_net - (patient_paid_amount + insurance_paid_amount)) > 0))::int as overdue_invoices_count
      FROM invoices
      WHERE tenant_id = $1
    `, [tenantId]);

    // 5. 12 Months New Patients Evolution Trend
    const monthlyTrend = await req.dbClient.query(`
      SELECT 
        TO_CHAR(d, 'YYYY-MM') as month_key,
        TO_CHAR(d, 'Mon YY') as month_label,
        COUNT(p.id)::int as new_patients
      FROM generate_series(
        DATE_TRUNC('month', NOW()) - INTERVAL '11 months',
        DATE_TRUNC('month', NOW()),
        INTERVAL '1 month'
      ) d
      LEFT JOIN patients p ON DATE_TRUNC('month', p.created_at) = d AND p.tenant_id = $1
      GROUP BY d
      ORDER BY d ASC
    `, [tenantId]);

    // 6. Hospital Bed Occupancy Stats
    const hospitalStats = await req.dbClient.query(`
      SELECT 
        COUNT(*)::int as total_beds,
        COUNT(*) FILTER (WHERE status = 'OCCUPIED')::int as occupied_beds,
        COUNT(*) FILTER (WHERE status <> 'OCCUPIED' AND is_active = true)::int as available_beds
      FROM hospital_beds
      WHERE tenant_id = $1
    `, [tenantId]).catch(() => ({ rows: [{ total_beds: 0, occupied_beds: 0, available_beds: 0 }] }));

    // 7. Payment Methods Breakdown
    const paymentsBreakdown = await req.dbClient.query(`
      SELECT 
        COALESCE(payment_method, 'ESPECES') as method,
        COUNT(*)::int as tx_count,
        COALESCE(SUM(amount), 0)::numeric as total_amount
      FROM payments
      WHERE tenant_id = $1
      GROUP BY payment_method
      ORDER BY total_amount DESC
    `, [tenantId]).catch(() => ({ rows: [] }));

    const fin = financialStats.rows[0] || {};
    const totalInvoiced = parseFloat(fin.total_invoiced || 0);
    const totalCollected = parseFloat(fin.total_collected || 0);
    const recoveryRate = totalInvoiced > 0 ? Math.round((totalCollected / totalInvoiced) * 100) : 100;

    const hosp = hospitalStats.rows[0] || {};
    const totalBeds = parseInt(hosp.total_beds || 0, 10);
    const occupiedBeds = parseInt(hosp.occupied_beds || 0, 10);
    const bedOccupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

    return res.status(200).json({
      patients_summary: patientsSummary.rows[0] || {},
      financial_summary: {
        ...fin,
        recovery_rate: recoveryRate
      },
      doctors_analytics: doctorsStats.rows || [],
      pathology_analytics: pathologyStats.rows || [],
      monthly_trend: monthlyTrend.rows || [],
      hospitalization: {
        total_beds: totalBeds,
        occupied_beds: occupiedBeds,
        available_beds: parseInt(hosp.available_beds || 0, 10),
        occupancy_rate: bedOccupancyRate
      },
      payments_breakdown: paymentsBreakdown.rows || []
    });

  } catch (err) {
    console.error('Dashboard analytics error:', err);
    return res.status(500).json({ error: 'Failed to compute dashboard analytics: ' + err.message });
  }
};

module.exports = {
  getAgingBalance,
  triggerRecoveryAction,
  getDashboardAnalytics
};

