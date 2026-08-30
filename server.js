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
const practitionerCtrl = require('./controllers/practitionerController');
const publicBookingCtrl = require('./controllers/publicBookingController');
const userCtrl = require('./controllers/userController');
const aiCopilotCtrl = require('./controllers/aiCopilotController');
const aiAgentCtrl = require('./controllers/aiAgentController');
const smtpCtrl = require('./controllers/smtpController');
const { rateLimit } = require('./middleware/rateLimit');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB limit for high-res scans & multi-page PDFs
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype === 'application/pdf' ||
      file.mimetype.includes('document') ||
      file.mimetype.includes('octet-stream') ||
      file.originalname.match(/\.(jpg|jpeg|png|gif|webp|pdf|bmp|tiff|doc|docx)$/i)
    ) {
      cb(null, true);
    } else {
      cb(new Error('Format de fichier non supporté. Veuillez sélectionner un scan, une photo (JPG, PNG) ou un PDF.'), false);
    }
  }
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Tenant-ID']
}));
app.use(express.json());

// ============================================================================
// PUBLIC ROUTES (No Auth, handles RLS bypass internally within query connection)
// ============================================================================

// A. Self-service tenant signup & user login & Password Reset
app.post('/api/auth/register-tenant', authCtrl.registerTenant);
app.post('/api/auth/login', authCtrl.login);
app.post('/api/auth/forgot-password', authCtrl.forgotPassword);
app.get('/api/auth/verify-reset-token', authCtrl.verifyResetToken);
app.post('/api/auth/reset-password', authCtrl.resetPassword);

// B. Public Patient Online Booking Portal (Direct Links & QR codes)
app.get('/api/public/clinics', publicBookingCtrl.getPublicClinics);
app.get('/api/public/clinics/:slug', publicBookingCtrl.getPublicClinic);
app.get('/api/public/clinics/:slug/available-slots', publicBookingCtrl.getPublicAvailableSlots);
app.post('/api/public/verify-patient', publicBookingCtrl.publicVerifyPatient);
app.post('/api/public/book', publicBookingCtrl.publicBookAppointment);

// Agent conversationnel du portail public. Débit limité : chaque message consomme
// la clé API LLM de la clinique, dont elle supporte le coût — un endpoint non
// authentifié sans limite exposerait sa facture à n'importe quel visiteur.
app.post(
  '/api/public/agent/turn',
  rateLimit({ windowMs: 60000, max: 12, message: "Vous envoyez trop de messages. Merci de patienter quelques instants avant de réessayer." }),
  aiAgentCtrl.handlePublicAgentTurn
);

// C. Public Cryptographic Prescription Verification (QR scanning endpoint)
app.get('/api/rx/verify/:code', patientCtrl.verifyPrescription);

// D. Public Payment Webhook (from Wave/OM/Yas/SPI checkouts)
app.post('/api/payments/webhook/:provider', paymentCtrl.handleWebhook);

// D. Public image upload endpoint (used for logo during registration and payment QR codes)
app.post('/api/upload', (req, res) => {
  upload.single('file')(req, res, async (multerErr) => {
    if (multerErr) {
      // Multer errors (file too large, wrong type, etc.) — always return JSON
      const msg = multerErr.code === 'LIMIT_FILE_SIZE'
        ? 'Fichier trop volumineux. La taille maximale autorisée est 25 Mo.'
        : (multerErr.message || 'Erreur lors du téléversement du fichier.');
      return res.status(400).json({ error: msg });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier reçu. Veuillez sélectionner un fichier.' });
    }
    try {
      const url = await uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype);
      return res.status(200).json({ url });
    } catch (err) {
      console.error('File upload route error:', err.message);
      return res.status(500).json({ error: 'Échec du téléversement : ' + err.message });
    }
  });
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
app.put('/api/clinical/consultations/:id', patientCtrl.updateConsultation);
app.delete('/api/clinical/consultations/:id', patientCtrl.deleteConsultation);
app.get('/api/clinical/prescriptions/:id', patientCtrl.getPrescriptionDetails);

// 2b. Patient Statuses CRUD
app.get('/api/patient-statuses', patientStatusCtrl.getStatuses);
app.post('/api/patient-statuses', patientStatusCtrl.createStatus);
app.put('/api/patient-statuses/:id', patientStatusCtrl.updateStatus);
app.delete('/api/patient-statuses/:id', patientStatusCtrl.deleteStatus);

// 2c. Patient Medical 360° Dossier, Confidential Access Grants, Treatments & Lab Orders
app.get('/api/patients/:patientId/dossier', medicalHistoryCtrl.getPatientDossier);
app.get('/api/patients/:patientId/access-grants', medicalHistoryCtrl.getPatientAccessGrants);
app.post('/api/patients/:patientId/access-grants', medicalHistoryCtrl.grantPatientAccess);
app.delete('/api/patients/:patientId/access-grants/:grantId', medicalHistoryCtrl.revokePatientAccess);

app.get('/api/patients/:patientId/treatments', medicalHistoryCtrl.getTreatments);
app.post('/api/patients/:patientId/treatments', medicalHistoryCtrl.createTreatment);
app.put('/api/patients/treatments/:id', medicalHistoryCtrl.updateTreatment);
app.delete('/api/patients/treatments/:id', medicalHistoryCtrl.deleteTreatment);

app.get('/api/patients/:patientId/lab-orders', medicalHistoryCtrl.getLabOrders);
app.post('/api/patients/:patientId/lab-orders', medicalHistoryCtrl.createLabOrder);
app.put('/api/patients/lab-orders/:id', medicalHistoryCtrl.updateLabOrder);
app.delete('/api/patients/lab-orders/:id', medicalHistoryCtrl.deleteLabOrder);

// 2d. Patient Verification by Unique Code & Cross-Check Identity
app.get('/api/patients/verify-code', patientCtrl.verifyPatientCode);
app.post('/api/patients/verify-code', patientCtrl.verifyPatientCode);

// 3. Appointments & Scheduling catalog (Medical Services / Consultations & Treatments CRUD)
app.post('/api/medical-services', apptCtrl.createMedicalService);
app.get('/api/medical-services', apptCtrl.getMedicalServices);
app.put('/api/medical-services/:id', apptCtrl.updateMedicalService);
app.delete('/api/medical-services/:id', apptCtrl.deleteMedicalService);

// 3b. Medical Specialties CRUD
app.get('/api/specialties', practitionerCtrl.getSpecialties);
app.post('/api/specialties', practitionerCtrl.createSpecialty);
app.put('/api/specialties/:id', practitionerCtrl.updateSpecialty);
app.delete('/api/specialties/:id', practitionerCtrl.deleteSpecialty);

// 3c. Medical Departments / Services Hospitaliers CRUD
app.get('/api/departments', practitionerCtrl.getDepartments);
app.post('/api/departments', practitionerCtrl.createDepartment);
app.put('/api/departments/:id', practitionerCtrl.updateDepartment);
app.delete('/api/departments/:id', practitionerCtrl.deleteDepartment);

// 3d. Practitioners & Doctors CRUD (Grades, Multi-Specialties & Departments)
app.get('/api/practitioners', practitionerCtrl.getPractitioners);
app.post('/api/practitioners', practitionerCtrl.createPractitioner);
app.put('/api/practitioners/:id', practitionerCtrl.updatePractitioner);
app.delete('/api/practitioners/:id', practitionerCtrl.deletePractitioner);

// 3e. Practitioner Unavailabilities & Absences
app.get('/api/practitioners/:practitionerId/unavailabilities', practitionerCtrl.getPractitionerUnavailabilities);
app.post('/api/practitioners-unavailabilities', practitionerCtrl.createPractitionerUnavailability);
app.delete('/api/practitioners-unavailabilities/:id', practitionerCtrl.deletePractitionerUnavailability);

app.post('/api/appointments', apptCtrl.createAppointment);
app.post('/api/appointments/request-booking', apptCtrl.requestAppointmentBooking);
app.get('/api/appointments', apptCtrl.getAppointments);
app.put('/api/appointments/:id', apptCtrl.updateAppointment);
app.delete('/api/appointments/:id', apptCtrl.cancelAppointment);

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
app.put('/api/billing/invoices/:id', billingCtrl.updateInvoice);
app.delete('/api/billing/invoices/:id', billingCtrl.deleteInvoice);
app.get('/api/billing/invoices/:id/details', billingCtrl.getInvoiceDetails);
app.get('/api/billing/invoices/:id/available-attachments', billingCtrl.getInvoiceAvailableAttachments);
app.post('/api/billing/invoices/:id/send-email', billingCtrl.sendInvoiceEmailController);
app.get('/api/billing/invoices/:id/email-logs', billingCtrl.getInvoiceEmailLogs);

// 5. Inventory & Pharmacy Lots
app.post('/api/inventory/items', stockCtrl.createStockItem);
app.get('/api/inventory/items', stockCtrl.getStockItems);
app.put('/api/inventory/items/:id', stockCtrl.updateStockItem);
app.delete('/api/inventory/items/:id', stockCtrl.deleteStockItem);
app.patch('/api/inventory/items/:id/toggle-status', stockCtrl.toggleStockItemStatus);
app.post('/api/inventory/lots', stockCtrl.addStockLot);
app.post('/api/inventory/deplete', stockCtrl.depleteStock);

// 5b. Hospitalization (Bed & Occupancy Management)
app.get('/api/hospital/buildings', hospitalCtrl.getBuildings);
app.post('/api/hospital/buildings', hospitalCtrl.createBuilding);
app.put('/api/hospital/buildings/:id', hospitalCtrl.updateBuilding);
app.delete('/api/hospital/buildings/:id', hospitalCtrl.deleteBuilding);

app.get('/api/hospital/rooms', hospitalCtrl.getRooms);
app.post('/api/hospital/rooms', hospitalCtrl.createRoom);
app.put('/api/hospital/rooms/:id', hospitalCtrl.updateRoom);
app.delete('/api/hospital/rooms/:id', hospitalCtrl.deleteRoom);

app.get('/api/hospital/beds', hospitalCtrl.getBeds);
app.post('/api/hospital/beds', hospitalCtrl.createBed);
app.put('/api/hospital/beds/:id', hospitalCtrl.updateBed);
app.delete('/api/hospital/beds/:id', hospitalCtrl.deleteBed);

app.get('/api/hospital/hospitalizations', hospitalCtrl.getHospitalizations);
app.post('/api/hospital/hospitalizations', hospitalCtrl.admitPatient);
app.post('/api/hospital/hospitalizations/:id/discharge', hospitalCtrl.dischargePatient);

// 6. Aging Reports, Financial Analytics & Recovery Reminders
app.get('/api/reports/aging-balance', reportCtrl.getAgingBalance);
app.get('/api/reports/dashboard-analytics', reportCtrl.getDashboardAnalytics);
app.post('/api/reports/recovery-action', reportCtrl.triggerRecoveryAction);

// 7. Tenant profile metadata management (logo, address, email, gps)
app.get('/api/tenant/profile', tenantCtrl.getTenantProfile);
app.put('/api/tenant/profile', tenantCtrl.updateTenantProfile);

// 7b. Tenant Custom SMTP Email Accounts Management
app.get('/api/settings/smtp-accounts', smtpCtrl.getSmtpAccounts);
app.post('/api/settings/smtp-accounts', smtpCtrl.createSmtpAccount);
app.put('/api/settings/smtp-accounts/:id', smtpCtrl.updateSmtpAccount);
app.delete('/api/settings/smtp-accounts/:id', smtpCtrl.deleteSmtpAccount);
app.post('/api/settings/smtp-accounts/:id/test', smtpCtrl.testSmtpAccount);
app.post('/api/settings/smtp-accounts/test-direct', smtpCtrl.testSmtpAccount);
app.post('/api/settings/smtp-accounts/:id/set-default', smtpCtrl.setDefaultSmtpAccount);

// 8. User Management & Permissions Matrix (RBAC)
app.get('/api/users', userCtrl.getUsers);
app.post('/api/users', userCtrl.createUser);
app.put('/api/users/:id', userCtrl.updateUser);
app.delete('/api/users/:id', userCtrl.deleteUser);

// 9. Administrative Tenant CRUD (restricted to SUPER_ADMIN)
app.get('/api/tenants', tenantCtrl.getAllTenants);
app.post('/api/tenants', tenantCtrl.createTenant);
app.put('/api/tenants/:id', tenantCtrl.updateTenant);
app.delete('/api/tenants/:id', tenantCtrl.deleteTenant);

// 10. AI Clinical Voice Copilot & Multi-Provider LLM Engine
app.get('/api/ai/config', aiCopilotCtrl.getAIConfig);
app.post('/api/ai/config', aiCopilotCtrl.saveAIConfig);
app.post('/api/ai/test', aiCopilotCtrl.testAIConnection);
app.post('/api/ai/toggle', aiCopilotCtrl.toggleAI);
app.post('/api/ai/copilot/query', aiCopilotCtrl.handleCopilotQuery);
app.post('/api/ai/agent/turn', aiAgentCtrl.handleAgentTurn);
app.post('/api/ai/copilot/dictate', aiCopilotCtrl.handleDictationConsultation);

// ============================================================================
// STATIC ASSET HOSTING (Serves compiled React frontend)
// ============================================================================

// Set no-cache headers so client always receives the latest updates
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

// Serve static React files if build folder is populated
app.use(express.static(path.join(__dirname, 'public'), { etag: false, maxAge: 0 }));

// Catch-all route to redirect non-API page hits back to SPA index router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
    if (err) {
      res.status(200).send('API Server is online. Front-end PWA not yet compiled.');
    }
  });
});

const pool = require('./config/db');
async function runAutoMigrations() {
  try {
    await pool.query(`
      ALTER TABLE stock_items ADD COLUMN IF NOT EXISTS target_specialty VARCHAR(50) DEFAULT 'GENERAL';
      ALTER TABLE stock_items ADD COLUMN IF NOT EXISTS default_dosage VARCHAR(255);
      ALTER TABLE stock_items ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;
      ALTER TABLE prescriptions ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
      ALTER TABLE medical_specialties ADD COLUMN IF NOT EXISTS default_duration_minutes INT NOT NULL DEFAULT 15;
      ALTER TABLE appointments ADD COLUMN IF NOT EXISTS consultation_reason TEXT;
    `);
    console.log('Database schema verified / auto-migrated.');
  } catch (err) {
    console.error('Auto-migration notice:', err.message);
  }
}

app.listen(PORT, async () => {
  console.log(`SoftMed API server running on port ${PORT}`);
  await runAutoMigrations();
});
