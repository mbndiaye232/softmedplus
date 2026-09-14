const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const { verifyToken, checkWriteAccess, checkPermission } = require('./middleware/auth');
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
const patientPortalCtrl = require('./controllers/patientPortalController');
const { verifyPatientToken } = require('./middleware/patientAuth');
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

// E. Patient Portal - consultation du dossier par le patient lui-meme.
// Limite de debit stricte : code_patient + prenom/nom est un facteur d'identification
// faible, expose a l'enumeration/force brute sans cette limite.
app.post(
  '/api/patient-portal/login',
  rateLimit({ windowMs: 60000, max: 8, message: 'Trop de tentatives de connexion. Merci de patienter avant de réessayer.' }),
  patientPortalCtrl.patientPortalLogin
);
app.get('/api/patient-portal/dossier', verifyPatientToken, patientPortalCtrl.getMyDossier);

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
app.get('/api/payment-methods', checkPermission('settings'), paymentCtrl.getPaymentMethods);
app.post('/api/payment-methods', checkPermission('settings'), paymentCtrl.configurePaymentMethod);
app.delete('/api/payment-methods/:id', checkPermission('settings'), paymentCtrl.deletePaymentMethod);
app.post('/api/payments/initialize', checkPermission('cash_register'), paymentCtrl.initializeOnlinePayment);
app.post('/api/payments/record', checkPermission('cash_register'), paymentCtrl.recordPayment);
// Cet endpoint "webhook" n'a en réalité aucun fournisseur de paiement réel derrière
// lui : les checkout_url générés par initializeOnlinePayment sont tous des URLs
// mock (mock.wave.com, etc.), et le seul appelant existant est le bouton "Simuler
// Retour Validation Webhook" du front (public/app.js), toujours envoyé authentifié.
// Exposée en route publique sans authentification, cette route permettait à
// n'importe qui de marquer n'importe quelle facture comme payée en devinant/
// connaissant son invoice_id — fraude directe. Elle est donc protégée comme les
// autres routes de paiement, en attendant une vraie intégration fournisseur (qui
// nécessitera sa propre vérification de signature, différente par fournisseur).
app.post('/api/payments/webhook/:provider', checkPermission('cash_register'), paymentCtrl.handleWebhook);

// 2. Patient Registry & DPI 360
app.post('/api/patients', checkPermission('patients'), patientCtrl.registerPatient);
app.get('/api/patients', checkPermission('patients'), patientCtrl.getPatients);
app.put('/api/patients/:id', checkPermission('patients'), patientCtrl.updatePatient);
app.post('/api/clinical/consultations', checkPermission('consultations'), patientCtrl.createConsultation);
app.put('/api/clinical/consultations/:id', checkPermission('consultations'), patientCtrl.updateConsultation);
app.delete('/api/clinical/consultations/:id', checkPermission('consultations'), patientCtrl.deleteConsultation);
app.get('/api/clinical/prescriptions/:id', checkPermission('prescriptions'), patientCtrl.getPrescriptionDetails);

// 2b. Patient Statuses CRUD
app.get('/api/patient-statuses', checkPermission('settings'), patientStatusCtrl.getStatuses);
app.post('/api/patient-statuses', checkPermission('settings'), patientStatusCtrl.createStatus);
app.put('/api/patient-statuses/:id', checkPermission('settings'), patientStatusCtrl.updateStatus);
app.delete('/api/patient-statuses/:id', checkPermission('settings'), patientStatusCtrl.deleteStatus);

// 2c. Patient Medical 360° Dossier, Confidential Access Grants, Treatments & Lab Orders
app.get('/api/patients/:patientId/dossier', checkPermission('patients'), medicalHistoryCtrl.getPatientDossier);
app.get('/api/patients/:patientId/access-grants', checkPermission('patients'), medicalHistoryCtrl.getPatientAccessGrants);
app.post('/api/patients/:patientId/access-grants', checkPermission('patients'), medicalHistoryCtrl.grantPatientAccess);
app.delete('/api/patients/:patientId/access-grants/:grantId', checkPermission('patients'), medicalHistoryCtrl.revokePatientAccess);

app.get('/api/patients/:patientId/treatments', checkPermission('patients'), medicalHistoryCtrl.getTreatments);
app.post('/api/patients/:patientId/treatments', checkPermission('patients'), medicalHistoryCtrl.createTreatment);
app.put('/api/patients/treatments/:id', checkPermission('patients'), medicalHistoryCtrl.updateTreatment);
app.delete('/api/patients/treatments/:id', checkPermission('patients'), medicalHistoryCtrl.deleteTreatment);

app.get('/api/patients/:patientId/lab-orders', checkPermission('patients'), medicalHistoryCtrl.getLabOrders);
app.post('/api/patients/:patientId/lab-orders', checkPermission('patients'), medicalHistoryCtrl.createLabOrder);
app.put('/api/patients/lab-orders/:id', checkPermission('patients'), medicalHistoryCtrl.updateLabOrder);
app.delete('/api/patients/lab-orders/:id', checkPermission('patients'), medicalHistoryCtrl.deleteLabOrder);

// 2d. Patient Verification by Unique Code & Cross-Check Identity
app.get('/api/patients/verify-code', checkPermission('patients'), patientCtrl.verifyPatientCode);
app.post('/api/patients/verify-code', checkPermission('patients'), patientCtrl.verifyPatientCode);

// 3. Appointments & Scheduling catalog (Medical Services / Consultations & Treatments CRUD)
app.post('/api/medical-services', checkPermission('practitioners'), apptCtrl.createMedicalService);
app.get('/api/medical-services', checkPermission('practitioners'), apptCtrl.getMedicalServices);
app.put('/api/medical-services/:id', checkPermission('practitioners'), apptCtrl.updateMedicalService);
app.delete('/api/medical-services/:id', checkPermission('practitioners'), apptCtrl.deleteMedicalService);

// 3b. Medical Specialties CRUD
app.get('/api/specialties', checkPermission('practitioners'), practitionerCtrl.getSpecialties);
app.post('/api/specialties', checkPermission('practitioners'), practitionerCtrl.createSpecialty);
app.put('/api/specialties/:id', checkPermission('practitioners'), practitionerCtrl.updateSpecialty);
app.delete('/api/specialties/:id', checkPermission('practitioners'), practitionerCtrl.deleteSpecialty);

// 3c. Medical Departments / Services Hospitaliers CRUD
app.get('/api/departments', checkPermission('practitioners'), practitionerCtrl.getDepartments);
app.post('/api/departments', checkPermission('practitioners'), practitionerCtrl.createDepartment);
app.put('/api/departments/:id', checkPermission('practitioners'), practitionerCtrl.updateDepartment);
app.delete('/api/departments/:id', checkPermission('practitioners'), practitionerCtrl.deleteDepartment);

// 3d. Practitioners & Doctors CRUD (Grades, Multi-Specialties & Departments)
app.get('/api/practitioners', checkPermission('practitioners'), practitionerCtrl.getPractitioners);
app.post('/api/practitioners', checkPermission('practitioners'), practitionerCtrl.createPractitioner);
app.put('/api/practitioners/:id', checkPermission('practitioners'), practitionerCtrl.updatePractitioner);
app.delete('/api/practitioners/:id', checkPermission('practitioners'), practitionerCtrl.deletePractitioner);

// 3e. Practitioner Unavailabilities & Absences
app.get('/api/practitioners/:practitionerId/unavailabilities', checkPermission('practitioners'), practitionerCtrl.getPractitionerUnavailabilities);
app.post('/api/practitioners-unavailabilities', checkPermission('practitioners'), practitionerCtrl.createPractitionerUnavailability);
app.delete('/api/practitioners-unavailabilities/:id', checkPermission('practitioners'), practitionerCtrl.deletePractitionerUnavailability);

app.post('/api/appointments', checkPermission('agenda'), apptCtrl.createAppointment);
app.post('/api/appointments/request-booking', checkPermission('agenda'), apptCtrl.requestAppointmentBooking);
app.get('/api/appointments', checkPermission('agenda'), apptCtrl.getAppointments);
app.put('/api/appointments/:id', checkPermission('agenda'), apptCtrl.updateAppointment);
app.delete('/api/appointments/:id', checkPermission('agenda'), apptCtrl.cancelAppointment);

// 4. Cash Drawer Sessions & Billing
app.get('/api/billing/cash-registers', checkPermission('cash_register'), billingCtrl.getCashRegisters);
app.get('/api/billing/insurances', checkPermission('insurances'), billingCtrl.getInsurances);
app.post('/api/billing/insurances', checkPermission('insurances'), billingCtrl.createInsurance);
app.put('/api/billing/insurances/:id', checkPermission('insurances'), billingCtrl.updateInsurance);
app.delete('/api/billing/insurances/:id', checkPermission('insurances'), billingCtrl.deleteInsurance);
app.post('/api/billing/cash-sessions', checkPermission('cash_register'), billingCtrl.openCashSession);
app.post('/api/billing/cash-sessions/:id/close', checkPermission('cash_register'), billingCtrl.closeCashSession);
app.post('/api/billing/invoices', checkPermission('invoices'), billingCtrl.createInvoice);
app.get('/api/billing/invoices', checkPermission('invoices'), billingCtrl.getInvoices);
app.put('/api/billing/invoices/:id', checkPermission('invoices'), billingCtrl.updateInvoice);
app.delete('/api/billing/invoices/:id', checkPermission('invoices'), billingCtrl.deleteInvoice);
app.get('/api/billing/invoices/:id/details', checkPermission('invoices'), billingCtrl.getInvoiceDetails);
app.get('/api/billing/invoices/:id/available-attachments', checkPermission('invoices'), billingCtrl.getInvoiceAvailableAttachments);
app.post('/api/billing/invoices/:id/send-email', checkPermission('messaging'), billingCtrl.sendInvoiceEmailController);
app.get('/api/billing/invoices/:id/email-logs', checkPermission('messaging'), billingCtrl.getInvoiceEmailLogs);

// 5. Inventory & Pharmacy Lots
app.post('/api/inventory/items', checkPermission('inventory'), stockCtrl.createStockItem);
app.get('/api/inventory/items', checkPermission('inventory'), stockCtrl.getStockItems);
app.put('/api/inventory/items/:id', checkPermission('inventory'), stockCtrl.updateStockItem);
app.delete('/api/inventory/items/:id', checkPermission('inventory'), stockCtrl.deleteStockItem);
app.patch('/api/inventory/items/:id/toggle-status', checkPermission('inventory'), stockCtrl.toggleStockItemStatus);
app.post('/api/inventory/lots', checkPermission('inventory'), stockCtrl.addStockLot);
app.post('/api/inventory/deplete', checkPermission('inventory'), stockCtrl.depleteStock);

// 5b. Hospitalization (Bed & Occupancy Management)
app.get('/api/hospital/buildings', checkPermission('hospitalization'), hospitalCtrl.getBuildings);
app.post('/api/hospital/buildings', checkPermission('hospitalization'), hospitalCtrl.createBuilding);
app.put('/api/hospital/buildings/:id', checkPermission('hospitalization'), hospitalCtrl.updateBuilding);
app.delete('/api/hospital/buildings/:id', checkPermission('hospitalization'), hospitalCtrl.deleteBuilding);

app.get('/api/hospital/rooms', checkPermission('hospitalization'), hospitalCtrl.getRooms);
app.post('/api/hospital/rooms', checkPermission('hospitalization'), hospitalCtrl.createRoom);
app.put('/api/hospital/rooms/:id', checkPermission('hospitalization'), hospitalCtrl.updateRoom);
app.delete('/api/hospital/rooms/:id', checkPermission('hospitalization'), hospitalCtrl.deleteRoom);

app.get('/api/hospital/beds', checkPermission('hospitalization'), hospitalCtrl.getBeds);
app.post('/api/hospital/beds', checkPermission('hospitalization'), hospitalCtrl.createBed);
app.put('/api/hospital/beds/:id', checkPermission('hospitalization'), hospitalCtrl.updateBed);
app.delete('/api/hospital/beds/:id', checkPermission('hospitalization'), hospitalCtrl.deleteBed);

app.get('/api/hospital/hospitalizations', checkPermission('hospitalization'), hospitalCtrl.getHospitalizations);
app.post('/api/hospital/hospitalizations', checkPermission('hospitalization'), hospitalCtrl.admitPatient);
app.post('/api/hospital/hospitalizations/:id/discharge', checkPermission('hospitalization'), hospitalCtrl.dischargePatient);

// 6. Aging Reports, Financial Analytics & Recovery Reminders
app.get('/api/reports/aging-balance', checkPermission('reports'), reportCtrl.getAgingBalance);
app.get('/api/reports/dashboard-analytics', checkPermission('reports'), reportCtrl.getDashboardAnalytics);
app.post('/api/reports/recovery-action', checkPermission('reports'), reportCtrl.triggerRecoveryAction);

// 7. Tenant profile metadata management (logo, address, email, gps)
app.get('/api/tenant/profile', checkPermission('settings'), tenantCtrl.getTenantProfile);
app.put('/api/tenant/profile', checkPermission('settings'), tenantCtrl.updateTenantProfile);

// 7b. Tenant Custom SMTP Email Accounts Management
app.get('/api/settings/smtp-accounts', checkPermission('messaging'), smtpCtrl.getSmtpAccounts);
app.post('/api/settings/smtp-accounts', checkPermission('messaging'), smtpCtrl.createSmtpAccount);
app.put('/api/settings/smtp-accounts/:id', checkPermission('messaging'), smtpCtrl.updateSmtpAccount);
app.delete('/api/settings/smtp-accounts/:id', checkPermission('messaging'), smtpCtrl.deleteSmtpAccount);
app.post('/api/settings/smtp-accounts/:id/test', checkPermission('messaging'), smtpCtrl.testSmtpAccount);
app.post('/api/settings/smtp-accounts/test-direct', checkPermission('messaging'), smtpCtrl.testSmtpAccount);
app.post('/api/settings/smtp-accounts/:id/set-default', checkPermission('messaging'), smtpCtrl.setDefaultSmtpAccount);

// 8. User Management & Permissions Matrix (RBAC)
app.get('/api/users', checkPermission('users'), userCtrl.getUsers);
app.post('/api/users', checkPermission('users'), userCtrl.createUser);
app.put('/api/users/:id', checkPermission('users'), userCtrl.updateUser);
app.delete('/api/users/:id', checkPermission('users'), userCtrl.deleteUser);

// 9. Administrative Tenant CRUD (restricted to SUPER_ADMIN)
app.get('/api/tenants', tenantCtrl.getAllTenants);
app.post('/api/tenants', tenantCtrl.createTenant);
app.put('/api/tenants/:id', tenantCtrl.updateTenant);
app.delete('/api/tenants/:id', tenantCtrl.deleteTenant);

// 10. AI Clinical Voice Copilot & Multi-Provider LLM Engine
app.get('/api/ai/config', checkPermission('ai_assistant'), aiCopilotCtrl.getAIConfig);
app.post('/api/ai/config', checkPermission('ai_assistant'), aiCopilotCtrl.saveAIConfig);
app.post('/api/ai/test', checkPermission('ai_assistant'), aiCopilotCtrl.testAIConnection);
app.post('/api/ai/toggle', checkPermission('ai_assistant'), aiCopilotCtrl.toggleAI);
app.post('/api/ai/copilot/query', checkPermission('ai_assistant'), aiCopilotCtrl.handleCopilotQuery);
app.post('/api/ai/agent/turn', checkPermission('ai_assistant'), aiAgentCtrl.handleAgentTurn);
app.post('/api/ai/copilot/dictate', checkPermission('ai_assistant'), aiCopilotCtrl.handleDictationConsultation);

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

  // Les droits sont désormais réellement appliqués sur les routes. Les comptes
  // existants n'ont pas les clés des modules ajoutés depuis (assurances, IA,
  // messagerie) : sans reprise, ils perdraient du jour au lendemain un accès dont
  // ils disposaient. On dérive donc ces droits de ceux qu'ils ont déjà, sans jamais
  // élargir au-delà — les assurances et la messagerie suivent la facturation,
  // l'assistant IA suit les consultations ou l'agenda.
  try {
    const res = await pool.query(`
      UPDATE users SET permissions = permissions
        || CASE WHEN permissions ? 'insurances' THEN '{}'::jsonb ELSE
             jsonb_build_object('insurances', COALESCE(permissions->'invoices', '{"view":false,"create":false,"update":false,"delete":false}'::jsonb)) END
        || CASE WHEN permissions ? 'messaging' THEN '{}'::jsonb ELSE
             jsonb_build_object('messaging', COALESCE(permissions->'invoices', '{"view":false,"create":false,"update":false,"delete":false}'::jsonb)) END
        || CASE WHEN permissions ? 'ai_assistant' THEN '{}'::jsonb ELSE
             jsonb_build_object('ai_assistant', jsonb_build_object(
               'view',   COALESCE((permissions->'consultations'->>'view')::boolean, (permissions->'agenda'->>'view')::boolean, false),
               'create', COALESCE((permissions->'consultations'->>'view')::boolean, (permissions->'agenda'->>'create')::boolean, false),
               'update', false,
               'delete', false)) END
      WHERE role = 'TENANT_USER'
        AND permissions IS NOT NULL
        AND NOT (permissions ? 'insurances' AND permissions ? 'messaging' AND permissions ? 'ai_assistant')
    `);
    if (res.rowCount > 0) {
      console.log(`Droits repris pour ${res.rowCount} utilisateur(s) : modules assurances, messagerie et assistant IA.`);
    }
  } catch (err) {
    console.error('Permission backfill notice:', err.message);
  }
}

app.listen(PORT, async () => {
  console.log(`SoftMed API server running on port ${PORT}`);
  await runAutoMigrations();
});
