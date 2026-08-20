const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const { verifyToken, checkWriteAccess } = require('./middleware/auth');
const { tenantIsolator } = require('./middleware/tenant');
const { uploadFile } = require('./utils/storage');

// Import controllers
const authCtrl = require('./controllers/authController');
const patientCtrl = require('./controllers/patientController');
const apptCtrl = require('./controllers/appointmentController');
const billingCtrl = require('./controllers/billingController');
const paymentCtrl = require('./controllers/paymentController');
const stockCtrl = require('./controllers/stockController');
const reportCtrl = require('./controllers/reportController');
const tenantCtrl = require('./controllers/tenantController');
const hospitalCtrl = require('./controllers/hospitalController');
const patientStatusCtrl = require('./controllers/patientStatusController');
const medicalHistoryCtrl = require('./controllers/medicalHistoryController');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

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

// D. Public image upload endpoint (used for logo during registration and payment QR codes)
app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  try {
    const url = await uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype);
    return res.status(200).json({ url });
  } catch (err) {
    console.error('File upload route error:', err.message);
    return res.status(500).json({ error: 'File upload failed' });
  }
});

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
app.delete('/api/payment-methods/:id', paymentCtrl.deletePaymentMethod);
app.post('/api/payments/initialize', paymentCtrl.initializeOnlinePayment);
app.post('/api/payments/record', paymentCtrl.recordPayment);

// 2. Patient Registry & DPI 360
app.post('/api/patients', patientCtrl.registerPatient);
app.get('/api/patients', patientCtrl.getPatients);
app.put('/api/patients/:id', patientCtrl.updatePatient);
app.post('/api/clinical/consultations', patientCtrl.createConsultation);

// 2b. Patient Statuses CRUD
app.get('/api/patient-statuses', patientStatusCtrl.getStatuses);
app.post('/api/patient-statuses', patientStatusCtrl.createStatus);
app.put('/api/patient-statuses/:id', patientStatusCtrl.updateStatus);
app.delete('/api/patient-statuses/:id', patientStatusCtrl.deleteStatus);

// 2c. Patient Medical 360° Dossier, Treatments & Lab Orders
app.get('/api/patients/:patientId/dossier', medicalHistoryCtrl.getPatientDossier);
app.get('/api/patients/:patientId/treatments', medicalHistoryCtrl.getTreatments);
app.post('/api/patients/:patientId/treatments', medicalHistoryCtrl.createTreatment);
app.put('/api/patients/treatments/:id', medicalHistoryCtrl.updateTreatment);
app.delete('/api/patients/treatments/:id', medicalHistoryCtrl.deleteTreatment);

app.get('/api/patients/:patientId/lab-orders', medicalHistoryCtrl.getLabOrders);
app.post('/api/patients/:patientId/lab-orders', medicalHistoryCtrl.createLabOrder);
app.put('/api/patients/lab-orders/:id', medicalHistoryCtrl.updateLabOrder);
app.delete('/api/patients/lab-orders/:id', medicalHistoryCtrl.deleteLabOrder);

// 3. Appointments & Scheduling catalog
app.post('/api/medical-services', apptCtrl.createMedicalService);
app.get('/api/medical-services', apptCtrl.getMedicalServices);
app.get('/api/practitioners', apptCtrl.getPractitioners);
app.post('/api/appointments', apptCtrl.createAppointment);
app.get('/api/appointments', apptCtrl.getAppointments);

// 4. Cash Drawer Sessions & Billing
app.get('/api/billing/cash-registers', billingCtrl.getCashRegisters);
app.get('/api/billing/insurances', billingCtrl.getInsurances);
app.post('/api/billing/insurances', billingCtrl.createInsurance);
app.put('/api/billing/insurances/:id', billingCtrl.updateInsurance);
app.delete('/api/billing/insurances/:id', billingCtrl.deleteInsurance);
app.post('/api/billing/cash-sessions', billingCtrl.openCashSession);
app.post('/api/billing/cash-sessions/:id/close', billingCtrl.closeCashSession);
app.post('/api/billing/invoices', billingCtrl.createInvoice);
app.get('/api/billing/invoices', billingCtrl.getInvoices);
app.get('/api/billing/invoices/:id/details', billingCtrl.getInvoiceDetails);

// 5. Inventory & Pharmacy Lots
app.post('/api/inventory/items', stockCtrl.createStockItem);
app.get('/api/inventory/items', stockCtrl.getStockItems);
app.post('/api/inventory/lots', stockCtrl.addStockLot);
app.post('/api/inventory/deplete', stockCtrl.depleteStock);

// 5b. Hospitalization (Bed & Occupancy Management)
app.get('/api/hospital/buildings', hospitalCtrl.getBuildings);
app.post('/api/hospital/buildings', hospitalCtrl.createBuilding);
app.get('/api/hospital/rooms', hospitalCtrl.getRooms);
app.post('/api/hospital/rooms', hospitalCtrl.createRoom);
app.get('/api/hospital/beds', hospitalCtrl.getBeds);
app.post('/api/hospital/beds', hospitalCtrl.createBed);
app.get('/api/hospital/hospitalizations', hospitalCtrl.getHospitalizations);
app.post('/api/hospital/hospitalizations', hospitalCtrl.admitPatient);
app.post('/api/hospital/hospitalizations/:id/discharge', hospitalCtrl.dischargePatient);

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
