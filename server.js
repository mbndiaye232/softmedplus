const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { verifyToken, checkWriteAccess } = require('./middleware/auth');
const { tenantIsolator } = require('./middleware/tenant');

// Import controllers
const authCtrl = require('./controllers/authController');
const patientCtrl = require('./controllers/patientController');
const apptCtrl = require('./controllers/appointmentController');
const billingCtrl = require('./controllers/billingController');
const paymentCtrl = require('./controllers/paymentController');
const stockCtrl = require('./controllers/stockController');
const reportCtrl = require('./controllers/reportController');
const tenantCtrl = require('./controllers/tenantController');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ============================================================================
// PUBLIC ROUTES (No Auth, handles RLS bypass internally within query connection)
// ============================================================================

// A. Self-service tenant signup & user login
app.post('/api/auth/register-tenant', authCtrl.registerTenant);
app.post('/api/auth/login', authCtrl.login);

// B. Public Cryptographic Prescription Verification (QR scanning endpoint)
app.get('/api/rx/verify/:code', patientCtrl.verifyPrescription);

// C. Public Payment Webhook (from Wave/OM/Yas/SPI checkouts)
app.post('/api/payments/webhook/:provider', paymentCtrl.handleWebhook);

// ============================================================================
// PRIVATE ROUTES (Protected by JWT and scoped by Row Level Security)
// ============================================================================

// Apply Token authentication and RLS isolation middleware globally to private endpoints
app.use('/api', verifyToken);
app.use('/api', tenantIsolator);
app.use('/api', checkWriteAccess); // Simple user write protection (blocks modifications for read-only roles)

// 1. Payment Gateway Settings & Initialization
app.get('/api/payment-methods', paymentCtrl.getPaymentMethods);
app.post('/api/payment-methods', paymentCtrl.configurePaymentMethod);
app.post('/api/payments/initialize', paymentCtrl.initializeOnlinePayment);
app.post('/api/payments/record', paymentCtrl.recordPayment);

// 2. Patient Registry & DPI
app.post('/api/patients', patientCtrl.registerPatient);
app.get('/api/patients', patientCtrl.getPatients);
app.post('/api/clinical/consultations', patientCtrl.createConsultation);

// 3. Appointments & Scheduling catalog
app.post('/api/medical-services', apptCtrl.createMedicalService);
app.get('/api/medical-services', apptCtrl.getMedicalServices);
app.post('/api/appointments', apptCtrl.createAppointment);
app.get('/api/appointments', apptCtrl.getAppointments);

// 4. Cash Drawer Sessions & Billing
app.post('/api/billing/cash-sessions', billingCtrl.openCashSession);
app.post('/api/billing/cash-sessions/:id/close', billingCtrl.closeCashSession);
app.post('/api/billing/invoices', billingCtrl.createInvoice);
app.get('/api/billing/invoices', billingCtrl.getInvoices);

// 5. Inventory & Pharmacy Lots
app.post('/api/inventory/items', stockCtrl.createStockItem);
app.get('/api/inventory/items', stockCtrl.getStockItems);
app.post('/api/inventory/lots', stockCtrl.addStockLot);
app.post('/api/inventory/deplete', stockCtrl.depleteStock);

// 6. Aging Reports & Recovery Reminders
app.get('/api/reports/aging-balance', reportCtrl.getAgingBalance);
app.post('/api/reports/recovery-action', reportCtrl.triggerRecoveryAction);

// 7. Tenant profile metadata management (logo, address, email, gps)
app.get('/api/tenant/profile', tenantCtrl.getTenantProfile);
app.put('/api/tenant/profile', tenantCtrl.updateTenantProfile);

// 8. Administrative Tenant CRUD (restricted to SUPER_ADMIN)
app.get('/api/tenants', tenantCtrl.getAllTenants);
app.post('/api/tenants', tenantCtrl.createTenant);
app.put('/api/tenants/:id', tenantCtrl.updateTenant);
app.delete('/api/tenants/:id', tenantCtrl.deleteTenant);

// ============================================================================
// STATIC ASSET HOSTING (Serves compiled React frontend)
// ============================================================================

// Serve static React files if build folder is populated
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to redirect non-API page hits back to SPA index router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
    if (err) {
      res.status(200).send('API Server is online. Front-end PWA not yet compiled.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`SoftMed Enterprise API server running on port ${PORT}`);
});
