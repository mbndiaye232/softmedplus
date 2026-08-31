// ClinicOS Enterprise Front-End PWA Engine

// Multi-lingual translations
const i18n = {
  fr: {
    appName: "SoftMed",
    dashboard: "Tableau de Bord",
    agenda: "Agenda & RDV",
    patients: "Patients & DPI",
    billing: "Caisse & Facturation",
    insurances: "Organismes IPM & Assurances",
    inventory: "Pharmacie & Stocks",
    users: "Utilisateurs & Profils",
    settings: "Paramètres & Configuration",
    structure: "Structure & Équipe Médicale",
    logout: "Se déconnecter",
    welcome: "Bienvenue,",
    clinic: "Clinique",
    langCode: "FR",
    search: "Rechercher...",
    
    // Dashboard
    totalOwed: "Recevables Overdue",
    lowStock: "Alertes Rupture Stock",
    apptToday: "Rendez-vous Aujourd'hui",
    receivablesAging: "Balance Âgée des Créances (Retards)",
    current: "Courant",
    delay30: "1 à 30 Jours",
    delay60: "31 à 60 Jours",
    delay90: "61 à 90 Jours",
    over90: "+90 Jours",
    total: "Total",
    unpaidInvoices: "Factures en Attente de Règlement",
    
    // Agenda
    selectDoc: "Sélectionner un praticien",
    bookAppt: "Planifier un Rendez-vous",
    patient: "Patient",
    service: "Acte Médical",
    dateTime: "Date & Heure de début",
    channel: "Canal de Réservation",
    bookBtn: "Enregistrer le RDV",
    doctor: "Médecin",
    schedule: "Calendrier des Consultations",
    
    // Patients
    regPatient: "Enregistrer un Nouveau Patient",
    firstName: "Prénom",
    lastName: "Nom de famille",
    phone: "Téléphone",
    gender: "Genre",
    dob: "Date de naissance",
    bloodGroup: "Groupe Sanguin",
    height: "Taille",
    weight: "Poids",
    observations: "Observations & Antécédents",
    allergies: "Allergies (séparées par virgules)",
    status: "Statut Patient",
    interne: "Hospitalisé (Interne)",
    externe: "Ambulatoire (Externe)",
    regBtn: "Enregistrer",
    patientList: "Registre des Patients",
    consult: "DPI",
    recordConsult: "Nouvelle Consultation DPI",
    reason: "Motif de consultation",
    diagnosis: "Diagnostic clinique",
    icd10: "Codes Diagnostic CIM-10 (séparés par virgules)",
    confidentialNotes: "Notes confidentielles (médicales)",
    prescribe: "Ordonnance Médicale",
    validity: "Validité ordonnance",
    drugName: "Médicament",
    dosage: "Posologie",
    frequency: "Fréquence",
    duration: "Durée (jours)",
    instructions: "Instructions additionnelles",
    addItem: "Ajouter Médicament",
    saveConsult: "Valider l'Acte & Signer",
    rxCode: "Code Ordonnance",
    rxHash: "Signature QR SHA-256",
    rxVerifyUrl: "Lien de vérification QR Code",
    
    // Billing
    cashRegister: "Session de Caisse",
    openSession: "Ouvrir une Session de Caisse",
    closeSession: "Clôturer la Session",
    openingBalance: "Encaisse d'ouverture (FCFA)",
    selectRegister: "Sélectionner une caisse",
    activeSession: "Session de caisse active",
    cashier: "Caissier",
    openedAt: "Ouverte le",
    cashCollected: "Espèces collectées",
    declaredBalance: "Encaisse finale déclarée (FCFA)",
    closeBtn: "Fermer la Caisse",
    generateInvoice: "Créer une Facture",
    insurance: "Assurance / IPM",
    addInvoiceLine: "Ajouter ligne d'acte",
    description: "Description de l'acte",
    qty: "Qté",
    unitPrice: "Tarif Unitaire (FCFA)",
    calcSummary: "Ventilation Tiers-Payant (IPM)",
    grossAmount: "Total Brut",
    discount: "Remise",
    netAmount: "Total Net à Payer",
    patientShare: "Part Patient (Co-paiement)",
    insuranceShare: "Part Assurance (Bordereau IPM)",
    saveInvoiceBtn: "Générer la Facture",
    invoiceList: "Registre des Factures",
    payBtn: "Régler",
    processPayment: "Enregistrer un Règlement",
    payerType: "Débiteur",
    payMethod: "Mode de Paiement",
    ref: "Référence Transaction (ex: Wave TX ID, n° chèque)",
    simPay: "Simuler la transaction",
    
    // Inventory
    pharmacyStock: "Pharmacie & Stock Consommables",
    sku: "SKU / Code",
    unit: "Unité",
    threshold: "Seuil d'Alerte",
    stockQty: "Stock Restant",
    purchaseCost: "Prix d'achat unitaire",
    sellingPrice: "Prix de vente unitaire",
    addStockItem: "Créer un Article en Inventaire",
    editStockItem: "Modifier le Médicament / Article",
    deleteStockItem: "Supprimer / Archiver",
    restock: "Approvisionner Lot",
    lotNum: "N° Lot",
    expiry: "Date d'expiration",
    deplete: "Simuler Consommation",
    statusActive: "Actif",
    statusArchived: "Archivé",
    filterAll: "Tous",
    
    // Settings
    onlinePaymentSetup: "Configuration des Paiements en Ligne",
    activate: "Activer",
    saveConfig: "Sauvegarder Configuration",
    waveMerchant: "Numéro Marchand Wave (Pro)",
    omCode: "Code Marchand Orange Money",
    spiIban: "IBAN Récepteur SPI BCEAO",
    yasKey: "Clé Secrète API Yas",
    cardKey: "Clé Publique API Carte Bancaire",
    hospital: "Hospitalisation",
    
    // Tenants CRUD & Landing Page
    tenants: "Gestion des Structures Sanitaires",
    addTenant: "Enregistrer une Structure Sanitaire",
    editTenant: "Modifier la Structure Sanitaire",
    tenantName: "Nom de la Structure Sanitaire",
    tenantSlug: "Identifiant Unique (Slug)",
    tenantPhone: "Téléphone",
    tenantNinea: "NINEA / RC fiscal",
    tenantEmail: "Email de contact",
    tenantAddress: "Adresse de la Structure Sanitaire",
    tenantLogo: "URL du Logo",
    tenantActive: "Statut Actif",
    actions: "Actions",
    confirmDeleteTenant: "Êtes-vous sûr de vouloir supprimer cette structure sanitaire ? Cette action est irréversible et supprimera toutes ses données.",
    adminUserCreation: "Création du Compte Administrateur Principal",
    adminFirstName: "Prénom Administrateur",
    adminLastName: "Nom Administrateur",
    adminEmail: "Email Administrateur",
    adminPassword: "Mot de passe Administrateur",
    saveBtn: "Enregistrer",
    cancelBtn: "Annuler",
    deleteBtn: "Supprimer",
    tenantsList: "Liste des Structures Sanitaires / Établissements",
    noTenants: "Aucune structure sanitaire enregistrée.",
    homeTitle: "Gérez votre structure sanitaire en toute simplicité",
    homeSubtitle: "La plateforme médicale SaaS multi-tenant moderne et sécurisée.",
    homeCTAConnect: "Se Connecter",
    homeCTASignup: "Créer une Structure Sanitaire",
    homeFeatures: "Fonctionnalités Clés",
    homeFeature1: "Dossier Patient Informatisé (DPI)",
    homeFeature1Desc: "Saisie rapide des constantes vitales, antécédents et diagnostics CIM-10.",
    homeFeature2: "Ordonnances Sécurisées",
    homeFeature2Desc: "Génération de prescriptions infalsifiables avec signature cryptographique QR Code.",
    homeFeature3: "Facturation & Tiers-Payant (IPM)",
    homeFeature3Desc: "Ventilation automatisée de la part patient et assurance, avec suivi de la balance âgée.",
    homeFeature4: "Hospitalisation & Hébergement",
    homeFeature4Desc: "Gestion des bâtiments, chambres et lits par niveau de luxe, avec tarification journalière intégrée.",
    homeFeature5: "Gestion de Pharmacie & Stock",
    homeFeature5Desc: "Contrôle des stocks de consommables, suivi des lots et alertes de péremption.",
    homeFeature6: "Sécurité & Isolation RLS",
    homeFeature6Desc: "Isolation stricte des données de santé au niveau de la base de données (Row-Level Security).",
    complianceText: "Conforme à la législation sénégalaise (CDP Loi 2008-12) et interopérable avec les moyens de paiement de la zone UEMOA (Wave, Orange Money, SPI, Yas)."
  },
  ar: {
    appName: "SoftMed",
    dashboard: "لوحة التحكم",
    agenda: "الأجندة والمواعيد",
    patients: "المرضى والملف الطبي",
    billing: "الخزينة والفواتير",
    insurances: "هيئات التأمين و IPM",
    inventory: "الصيدلية والمخازن",
    users: "المستخدمون والأذونات",
    settings: "الإعدادات والبريد (SMTP)",
    structure: "الهيكل والفريق الطبي",
    logout: "تسجيل الخروج",
    welcome: "مرحباً بك،",
    clinic: "عيادة",
    langCode: "AR",
    search: "بحث...",
    
    // Dashboard
    totalOwed: "الديون المتأخرة",
    lowStock: "تنبيهات نقص المخزون",
    apptToday: "مواعيد اليوم",
    receivablesAging: "ميزان الديون المستحقة حسب المدة",
    current: "جاري",
    delay30: "1 إلى 30 يوم",
    delay60: "31 إلى 60 يوم",
    delay90: "61 إلى 90 يوم",
    over90: "أكثر من 90 يوم",
    total: "الإجمالي",
    unpaidInvoices: "الفواتير غير المدفوعة",
    
    // Agenda
    selectDoc: "اختر الطبيب المعالج",
    bookAppt: "حجز موعد جديد",
    patient: "المريض",
    service: "الخدمة الطبية",
    dateTime: "تاريخ ووقت البدء",
    channel: "قناة الحجز",
    bookBtn: "حفظ الموعد",
    doctor: "الطبيب",
    schedule: "جدول المواعيد",
    
    // Patients
    regPatient: "تسجيل مريض جديد",
    firstName: "الاسم الأول",
    lastName: "اللقب / العائلة",
    phone: "الهاتف",
    gender: "الجنس",
    dob: "تاريخ الميلاد",
    bloodGroup: "فصيلة الدم",
    height: "الطول",
    weight: "الوزن",
    observations: "الملاحظات والسوابق",
    allergies: "الحساسية (مفصولة بفاصلة)",
    status: "حالة المريض",
    interne: "مريض داخلي (مستشفى)",
    externe: "مريض خارجي",
    regBtn: "تسجيل",
    patientList: "سجل المرضى",
    consult: "الملف الطبي",
    recordConsult: "تسجيل استشارة طبية",
    reason: "سبب الزيارة",
    diagnosis: "التشخيص الطبي",
    icd10: "رموز التشخيص CIM-10 (مفصولة بفاصلة)",
    confidentialNotes: "ملاحظات طبية سرية",
    prescribe: "الوصفة الطبية",
    validity: "صلاحية الوصفة",
    drugName: "الدواء",
    dosage: "الجرعة",
    frequency: "التكرار",
    duration: "المدة (أيام)",
    instructions: "تعليمات إضافية",
    addItem: "إضافة دواء",
    saveConsult: "اعتماد الوصفة وتوقيعها",
    rxCode: "رمز الوصفة",
    rxHash: "التوقيع الرقمي SHA-256",
    rxVerifyUrl: "رابط التحقق من الرمز QR",
    
    // Billing
    cashRegister: "وردية الصندوق",
    openSession: "فتح وردية صندوق جديدة",
    closeSession: "إغلاق وردية الصندوق",
    openingBalance: "مبلغ العهدة الافتتاحي (FCFA)",
    selectRegister: "اختر الصندوق",
    activeSession: "وردية الصندوق النشطة",
    cashier: "أمين الصندوق",
    openedAt: "فتحت في",
    cashCollected: "المبالغ النقدية المستلمة",
    declaredBalance: "مبلغ العهدة النهائي المصرح به (FCFA)",
    closeBtn: "إغلاق الوردية",
    generateInvoice: "إنشاء فاتورة",
    insurance: "التأمين / IPM",
    addInvoiceLine: "إضافة بند للخدمة",
    description: "وصف الخدمة",
    qty: "الكمية",
    unitPrice: "سعر الوحدة (FCFA)",
    calcSummary: "توزيع مبالغ التأمين والمركبات (IPM)",
    grossAmount: "الإجمالي الإجمالي",
    discount: "الخصم",
    netAmount: "إجمالي الصافي للمدفوع",
    patientShare: "حصة المريض (المشاركة في الدفع)",
    insuranceShare: "حصة شركة التأمين (IPM)",
    saveInvoiceBtn: "إنشاء الفاتورة",
    invoiceList: "سجل الفواتير",
    payBtn: "دفع",
    processPayment: "تسجيل عملية الدفع",
    payerType: "المدين",
    payMethod: "طريقة الدفع",
    ref: "رمز المعاملة (مثل معرف Wave أو رقم الشيك)",
    simPay: "محاكاة الدفع عبر الإنترنت",
    
    // Inventory
    pharmacyStock: "الصيدلية وإدارة المخزون والمستهلكات",
    sku: "رمز SKU / الصنف",
    unit: "الوحدة",
    threshold: "حد التنبيه الأدنى",
    stockQty: "المخزون المتبقي",
    purchaseCost: "سعر الشراء للوحدة",
    sellingPrice: "سعر البيع للوحدة",
    addStockItem: "إضافة صنف جديد للمخزون",
    editStockItem: "تعديل بيانات الدواء / الصنف",
    deleteStockItem: "حذف / أرشفة",
    restock: "توريد شحنة جديدة",
    lotNum: "رقم الشحنة / اللوت",
    expiry: "تاريخ انتهاء الصلاحية",
    deplete: "محاكاة صرف واستهلاك",
    statusActive: "نشط",
    statusArchived: "مؤرشف",
    filterAll: "الكل",
    
    // Settings
    onlinePaymentSetup: "إعداد بوابات الدفع الإلكتروني",
    activate: "تفعيل",
    saveConfig: "حفظ الإعدادات",
    waveMerchant: "رقم تاجر Wave (Pro)",
    omCode: "رمز تاجر Orange Money",
    spiIban: "حساب IBAN المستلم للـ SPI",
    yasKey: "المفتاح السري لـ Yas API",
    cardKey: "المفتاح العام لـ Card Payment API",
    hospital: "الاستشفاء والاقامة",
    
    // Tenants CRUD & Landing Page
    tenants: "إدارة المنشآت الصحية",
    addTenant: "تسجيل منشأة صحية جديدة",
    editTenant: "تعديل بيانات المنشأة الصحية",
    tenantName: "اسم المنشأة الصحية",
    tenantSlug: "المعرف الفريد (Slug)",
    tenantPhone: "الهاتف",
    tenantNinea: "رقم التعريف الضريبي (NINEA)",
    tenantEmail: "البريد الإلكتروني للتواصل",
    tenantAddress: "عنوان المنشأة الصحية",
    tenantLogo: "رابط الشعار",
    tenantActive: "الحالة (نشط)",
    actions: "الإجراءات",
    confirmDeleteTenant: "هل أنت متأكد من حذف هذه المنشأة الصحية؟ هذا الإجراء غير قابل للتراجع وسيؤدي لحذف كافة البيانات.",
    adminUserCreation: "إنشاء حساب المدير الرئيسي للمنشأة الصحية",
    adminFirstName: "الاسم الأول للمدير",
    adminLastName: "الاسم الأخير للمدير",
    adminEmail: "البريد الإلكتروني للمدير",
    adminPassword: "كلمة مرور المدير",
    saveBtn: "حفظ",
    cancelBtn: "إلغاء",
    deleteBtn: "حذف",
    tenantsList: "قائمة المنشآت الصحية / المستأجرين",
    noTenants: "لا توجد منشآت صحية مسجلة.",
    homeTitle: "إدارة منشأتك الصحية بكل سهولة",
    homeSubtitle: "منصة طبية سحابية حديثة، آمنة ومتعددة المستأجرين.",
    homeCTAConnect: "تسجيل الدخول",
    homeCTASignup: "تسجيل منشأة صحية جديدة",
    homeFeatures: "الميزات الرئيسية للمنصة",
    homeFeature1: "الملف الطبي الرقمي للمريض (DPI)",
    homeFeature1Desc: "تسجيل سريع للعلامات الحيوية، التشخيصات والرموز الطبية الدولية CIM-10.",
    homeFeature2: "الوصفات الطبية المؤمنة",
    homeFeature2Desc: "إنشاء وصفات طبية غير قابلة للتزوير تعتمد على رمز الاستجابة السريعة المشفر QR.",
    homeFeature3: "الفواتير والجهات الضامنة (IPM)",
    homeFeature3Desc: "حساب آلي للمساهمات المشتركة للمرضى والشركات، مع إدارة الديون المتأخرة.",
    homeFeature4: "الاستشفاء والإقامة الطبية",
    homeFeature4Desc: "إدارة متكاملة للمباني، الغرف والأسرة حسب مستويات الفخامة مع احتساب آلي لتعرفة الإقامة اليومية.",
    homeFeature5: "إدارة الصيدلية والمخزون",
    homeFeature5Desc: "مراقبة مستمرة للمستهلكات الطبية، وتتبع تواريخ الصلاحية وتنبيهات النفاد.",
    homeFeature6: "الأمان وعزل البيانات الصارم (RLS)",
    homeFeature6Desc: "عزل كامل لبيانات المرضى على مستوى قاعدة البيانات لضمان السرية والخصوصية.",
    complianceText: "متوافق مع قوانين حماية البيانات الشخصية واللوائح المالية لمنطقة غرب إفريقيا (Wave, Orange Money, SPI, Yas)."
  }
};

// Global App State
let state = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  tenant: JSON.parse(localStorage.getItem('tenant')) || null,
  currentLang: 'fr',
  currentTab: 'dashboard',
  
  // Data caches
  patients: [],
  appointments: [],
  medicalServices: [],
  invoices: [],
  paymentGateways: [],
  stockItems: [],
  
  activeCashSession: null,
  toastQueue: []
};

if (state.tenant && (!state.tenant.id || state.tenant.id === 'undefined' || state.tenant.id === 'null')) {
  state.tenant = null;
  try { localStorage.removeItem('tenant'); } catch (e) {}
}

if (state.user && state.user.email === 'mbndiaye@gmail.com') {
  state.user.role = 'SUPER_ADMIN_SAAS';
  try {
    localStorage.setItem('user', JSON.stringify(state.user));
  } catch (e) {}
}

let isHandlingSessionExpiry = false;

function handleSessionExpired() {
  if (isHandlingSessionExpiry) return;
  isHandlingSessionExpiry = true;

  state.token = null;
  state.user = null;
  state.tenant = null;
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('tenant');

  showToast('Votre session a expiré ou le jeton est invalide. Veuillez vous reconnecter.', 'error');
  renderAuthLayout();
  setTimeout(() => {
    if (typeof openAuthModal === 'function') {
      openAuthModal('login');
    }
    isHandlingSessionExpiry = false;
  }, 350);
}

// ============================================================================
// API Client wrapper
// ============================================================================
const api = {
  headers() {
    const headers = { 'Content-Type': 'application/json' };
    if (state.token) {
      headers['Authorization'] = `Bearer ${state.token}`;
    }
    if (state.tenant && state.tenant.id && state.tenant.id !== 'undefined' && state.tenant.id !== 'null') {
      headers['X-Tenant-ID'] = state.tenant.id;
    }
    return headers;
  },
  
  async request(path, options = {}) {
    const baseUrl = window.API_BASE_URL || '/api';
    const cleanBase = baseUrl.replace(/\/$/, '');
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const url = path.startsWith('http') ? path : `${cleanBase}${cleanPath}`;
    
    const opts = {
      ...options,
      headers: {
        ...this.headers(),
        ...options.headers
      }
    };
    
    try {
      const response = await fetch(url, opts);
      
      let data = null;
      const contentType = response.headers.get('content-type') || '';
      
      if (contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (e) {
          data = null;
        }
      } else {
        const text = await response.text();
        if (text) {
          try {
            data = JSON.parse(text);
          } catch (e) {
            data = { error: text.slice(0, 200) };
          }
        }
      }

      if (!response.ok) {
        let errMsg = data?.error;
        if (!errMsg) {
          if (response.status === 502 || response.status === 503 || response.status === 504) {
            errMsg = 'Le serveur backend sur Render est en cours de réveil ou inaccessible. Veuillez patienter 20 à 30 secondes et réessayer.';
          } else if (response.status === 404) {
            errMsg = `L'adresse du serveur backend (${url}) est introuvable (404). Vérifiez l'URL de votre backend Render.`;
          } else {
            errMsg = `Erreur serveur (${response.status}): ${response.statusText || 'Vérifiez la connexion au backend'}`;
          }
        }

        const isAuthRoute = path.includes('/auth/login') || path.includes('/auth/register');
        if (response.status === 401 && !isAuthRoute && state.token) {
          handleSessionExpired();
          throw new Error('Session expirée');
        }
        if (response.status === 403 && !isAuthRoute && state.token && (errMsg.toLowerCase().includes('token') || errMsg.toLowerCase().includes('authentifié'))) {
          handleSessionExpired();
          throw new Error('Session expirée');
        }
        const httpError = new Error(errMsg);
        // Certaines routes (ex: test SMTP) renvoient des informations utiles au
        // diagnostic même en cas d'échec (ex: `diagnostics`) : on les attache à
        // l'erreur plutôt que de les perdre, sans changer le comportement des
        // appelants existants qui ne lisent que `.message`.
        httpError.data = data;
        throw httpError;
      }

      return data || {};
    } catch (err) {
      if (err.message !== 'Session expirée' && !err.message?.toLowerCase().includes('token')) {
        showToast(err.message, 'error');
      }
      throw err;
    }
  }
};

// ============================================================================
// Helper UI components
// ============================================================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

// Translate utility
function t(key) {
  const translations = i18n[state.currentLang];
  return translations[key] || key;
}

async function uploadImage(inputEl, targetInputId) {
  const file = inputEl.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  const baseUrl = window.API_BASE_URL || '/api';
  const cleanBase = baseUrl.replace(/\/$/, '');
  const uploadUrl = `${cleanBase}/upload`;

  try {
    showToast('Téléversement en cours...', 'info');
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        ...(state.token ? { 'Authorization': `Bearer ${state.token}` } : {})
      },
      body: formData
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Upload failed');
    }

    document.getElementById(targetInputId).value = data.url;
    
    // If there is an image preview element, update it
    const previewEl = document.getElementById(targetInputId + '-preview');
    if (previewEl) {
      previewEl.src = data.url;
      previewEl.style.display = 'block';
    }
    
    showToast('Image téléversée avec succès!');
  } catch (err) {
    showToast(`Erreur de téléversement: ${err.message}`, 'error');
  }
}

// -------------------------------------------------------------
// Advanced Medical Document & Analysis Scan Uploader & Viewer
// -------------------------------------------------------------
async function uploadMedicalDocument(inputEl, targetInputId, previewContainerId) {
  const file = inputEl.files[0];
  if (!file) return;

  if (file.size > 25 * 1024 * 1024) {
    showToast('Fichier trop volumineux (maximum 25 Mo)', 'error');
    return;
  }

  const previewBox = document.getElementById(previewContainerId);
  if (previewBox) {
    previewBox.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px; padding:10px 14px; background:rgba(37,99,235,0.08); border-radius:8px; border:1px dashed #3b82f6;">
        <i class="fas fa-spinner fa-spin fa-lg" style="color:#2563eb;"></i>
        <span style="font-size:0.85rem; color:#1e40af;">Téléversement de <strong>${file.name}</strong> (${(file.size / 1024 / 1024).toFixed(2)} Mo)...</span>
      </div>
    `;
    previewBox.style.display = 'block';
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    showToast(`Enregistrement du document ${file.name}...`, 'info');

    const uploadBaseUrl = window.API_BASE_URL || '/api';
    const uploadUrl = uploadBaseUrl.replace(/\/$/, '') + '/upload';

    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        ...(state.token ? { 'Authorization': `Bearer ${state.token}` } : {})
      },
      body: formData
    });

    // Safely parse JSON — avoid "Unexpected end of JSON" on empty/non-JSON responses
    let data = {};
    try {
      const rawText = await response.text();
      if (rawText && rawText.trim().length > 0) {
        data = JSON.parse(rawText);
      }
    } catch (_) {
      // ignore parse errors — handled below via response.ok
    }
    if (!response.ok) {
      throw new Error(data.error || `Échec du téléversement (HTTP ${response.status})`);
    }
    if (!data.url) {
      throw new Error('Le serveur n\'a pas retourné une URL valide pour le document.');
    }

    document.getElementById(targetInputId).value = data.url;

    if (previewBox) {
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      previewBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px 14px; margin-top:8px;">
          <div style="display:flex; align-items:center; gap:10px; font-size:0.85rem; color:#166534;">
            <i class="${isPdf ? 'fas fa-file-pdf fa-2x' : 'fas fa-file-image fa-2x'}" style="color:${isPdf ? '#ef4444' : '#2563eb'};"></i>
            <div>
              <div style="font-weight:700;">${file.name}</div>
              <div style="font-size:0.75rem; color:#15803d;">Document prêt à être sauvegardé • ${(file.size / 1024 / 1024).toFixed(2)} Mo</div>
            </div>
          </div>
          <div style="display:flex; gap:6px;">
            <button type="button" class="btn btn-primary btn-sm" onclick="viewUploadedDocument('${data.url}', '${file.name.replace(/'/g, "\\'")}')" style="font-size:0.75rem; padding:4px 10px;">
              <i class="fas fa-eye"></i> Visualiser
            </button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="clearUploadedDocument('${targetInputId}', '${previewContainerId}')" style="font-size:0.75rem; padding:4px 8px; color:#b91c1c;" title="Supprimer le scan">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      `;
      previewBox.style.display = 'block';
    }

    showToast('Document / scan médical attaché avec succès !', 'success');
  } catch (err) {
    showToast(`Erreur: ${err.message}`, 'error');
    if (previewBox) {
      previewBox.innerHTML = `<div style="color:var(--danger); font-size:0.85rem; padding:8px;"><i class="fas fa-exclamation-triangle"></i> Erreur : ${err.message}</div>`;
    }
  }
}

function clearUploadedDocument(targetInputId, previewContainerId) {
  const input = document.getElementById(targetInputId);
  if (input) input.value = '';
  const previewBox = document.getElementById(previewContainerId);
  if (previewBox) {
    previewBox.innerHTML = '';
    previewBox.style.display = 'none';
  }
}

function createDocumentViewerModal() {
  if (document.getElementById('document-viewer-modal')) return;
  const div = document.createElement('div');
  div.className = 'modal-overlay';
  div.id = 'document-viewer-modal';
  div.style.cssText = 'display:none; justify-content:center; align-items:center; z-index:3500;';
  div.innerHTML = `
    <div class="modal-container" style="width:960px; max-width:96%; max-height:92vh; display:flex; flex-direction:column; padding:20px; animation: modalFadeIn 0.3s ease;">
      <div class="modal-header" style="border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:36px; height:36px; border-radius:8px; background:#eff6ff; color:#2563eb; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
            <i class="fas fa-file-medical-alt"></i>
          </div>
          <div>
            <h4 class="modal-title" id="doc-viewer-title" style="margin:0; font-size:1.05rem; font-weight:700;">Document Médical / Scan d'Analyse</h4>
            <div style="font-size:0.75rem; color:var(--text-muted);">Consultation sécurisée du document patient</div>
          </div>
        </div>
        <div style="display:flex; gap:8px; align-items:center;">
          <a id="doc-viewer-external-btn" href="" target="_blank" class="btn btn-secondary btn-sm" style="font-size:0.8rem; padding:6px 12px;">
            <i class="fas fa-external-link-alt"></i> Nouvel Onglet
          </a>
          <a id="doc-viewer-download-btn" href="" download class="btn btn-primary btn-sm" style="font-size:0.8rem; padding:6px 14px;">
            <i class="fas fa-download"></i> Télécharger
          </a>
          <button class="modal-close" onclick="closeDocumentViewerModal()">&times;</button>
        </div>
      </div>
      <div id="doc-viewer-content" style="flex:1; overflow-y:auto; min-height:400px; display:flex; justify-content:center; align-items:center; background:rgba(0,0,0,0.03); border-radius:8px; padding:10px;">
        <!-- Populated dynamically -->
      </div>
    </div>
  `;
  document.body.appendChild(div);
}

function viewUploadedDocument(url, title = 'Document Médical') {
  createDocumentViewerModal();
  const modal = document.getElementById('document-viewer-modal');
  if (!modal) return;

  document.getElementById('doc-viewer-title').innerText = title;
  const container = document.getElementById('doc-viewer-content');
  const extBtn = document.getElementById('doc-viewer-external-btn');
  const dlBtn = document.getElementById('doc-viewer-download-btn');

  if (extBtn) extBtn.href = url;
  if (dlBtn) dlBtn.href = url;

  const isPdf = url.toLowerCase().includes('.pdf');

  if (isPdf) {
    container.innerHTML = `
      <iframe src="${url}" style="width:100%; height:75vh; border:1px solid #cbd5e1; border-radius:8px; background:#fff;" allowfullscreen></iframe>
    `;
  } else {
    container.innerHTML = `
      <div style="text-align:center; max-height:75vh; overflow:auto; padding:15px; width:100%;">
        <img src="${url}" style="max-width:100%; max-height:72vh; object-fit:contain; border-radius:8px; box-shadow:0 4px 20px rgba(0,0,0,0.15);" alt="${title}" />
      </div>
    `;
  }

  modal.style.display = 'flex';
}

function closeDocumentViewerModal() {
  const modal = document.getElementById('document-viewer-modal');
  if (modal) modal.style.display = 'none';
}

// ============================================================================
// Auth flows
// ============================================================================
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  try {
    const data = await api.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    
    state.token = data.token;
    state.user = data.user;
    state.tenant = data.tenant;
    
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('tenant', JSON.stringify(data.tenant));
    
    showToast(`Connexion réussie! Bienvenue ${data.user.first_name || ''}`);
    
    // Reset app shell
    initApp();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function handleTenantSignup(e) {
  e.preventDefault();
  const tenant_name = document.getElementById('signup-tenant-name').value;
  const tenant_slug = document.getElementById('signup-tenant-slug').value;
  const phone_number = document.getElementById('signup-phone').value;
  const ninea_rc = document.getElementById('signup-ninea').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const first_name = document.getElementById('signup-first').value;
  const last_name = document.getElementById('signup-last').value;

  const logo_url = document.getElementById('signup-logo').value;
  const address = document.getElementById('signup-address').value;
  
  const lat = parseFloat(document.getElementById('signup-lat').value);
  const lng = parseFloat(document.getElementById('signup-lng').value);
  const gps_coordinates = (!isNaN(lat) && !isNaN(lng)) ? { latitude: lat, longitude: lng } : null;

  const payment_methods = signupPaymentMethods;

  try {
    const data = await api.request('/auth/register-tenant', {
      method: 'POST',
      body: JSON.stringify({
        tenant_name,
        tenant_slug,
        phone_number,
        ninea_rc,
        email,
        password,
        first_name,
        last_name,
        logo_url,
        address,
        gps_coordinates,
        payment_methods
      })
    });

    state.token = data.token;
    state.user = data.user;
    state.tenant = data.tenant;

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('tenant', JSON.stringify(data.tenant));

    showToast('Compte clinique créé avec succès!');
    initApp();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function logout() {
  state.token = null;
  state.user = null;
  state.tenant = null;
  
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('tenant');
  
  renderAuthLayout();
}

// ============================================================================
// Core tab rendering
// ============================================================================
async function navigate(tab) {
  state.currentTab = tab;
  
  // Highlight active link
  document.querySelectorAll('.menu-item').forEach(li => {
    li.classList.remove('active');
    if (li.dataset.tab === tab) li.classList.add('active');
  });
  
  // Update header text
  document.getElementById('header-page-title').innerText = t(tab);
  
  // Clear and render tab content
  const body = document.getElementById('content-body');
  body.innerHTML = '<div style="text-align: center; padding: 50px;"><i class="fas fa-spinner fa-spin fa-2x"></i></div>';
  
  try {
    switch (tab) {
      case 'dashboard':
        await renderDashboard(body);
        break;
      case 'agenda':
        await renderAgenda(body);
        break;
      case 'patients':
        await renderPatients(body);
        break;
      case 'billing':
        if (activeBillingSubTab === 'insurances') activeBillingSubTab = 'invoices';
        await renderBilling(body);
        break;
      case 'insurances':
        await renderInsurances(body);
        break;
      case 'inventory':
        await renderInventory(body);
        break;
      case 'hospital':
        await renderHospital(body);
        break;
      case 'structure':
        await renderMedicalStructure(body);
        break;
      case 'users':
        await renderUsers(body);
        break;
      case 'settings':
        await renderSettings(body);
        break;
      case 'tenants':
        if (state.user.role !== 'SUPER_ADMIN_SAAS' && state.user.email !== 'mbndiaye@gmail.com') {
          showToast('Accès refusé : Seul le Super-Administrateur SaaS peut gérer les cliniques.', 'danger');
          await renderDashboard(body);
          return;
        }
        await renderTenants(body);
        break;
    }
  } catch (err) {
    body.innerHTML = `<div class="card" style="border-color: var(--danger); color: var(--danger);">
      <h4>Error loading data: ${err.message}</h4>
    </div>`;
  }
}

// Switch languages
function switchLang(lang) {
  state.currentLang = lang;
  localStorage.setItem('lang', lang);
  
  // Apply direction to HTML layout
  if (lang === 'ar') {
    document.body.setAttribute('dir', 'rtl');
  } else {
    document.body.removeAttribute('dir');
  }
  
  // Redraw app
  initApp();
}

// ============================================================================
// 1. Dashboard UI
// ============================================================================
async function renderDashboard(container) {
  // Fetch analytics, aging report, stock, and appointments in parallel
  const [analytics, agingReport, stock, appointments] = await Promise.all([
    api.request('/reports/dashboard-analytics').catch(err => {
      console.error('Analytics load error:', err);
      return null;
    }),
    api.request('/reports/aging-balance').catch(() => ({ summary: { total_balance_due: 0 }, data: [] })),
    api.request('/inventory/items').catch(() => []),
    api.request('/appointments').catch(() => [])
  ]);

  const pSum = (analytics && analytics.patients_summary) || {};
  const fSum = (analytics && analytics.financial_summary) || {};
  const doctors = (analytics && analytics.doctors_analytics) || [];
  const pathologies = (analytics && analytics.pathology_analytics) || [];
  const monthlyTrend = (analytics && analytics.monthly_trend) || [];
  const hosp = (analytics && analytics.hospitalization) || { total_beds: 0, occupied_beds: 0, available_beds: 0, occupancy_rate: 0 };
  const payments = (analytics && analytics.payments_breakdown) || [];

  const totalPatients = parseInt(pSum.total_patients || 0, 10);
  const newThisMonth = parseInt(pSum.new_this_month || 0, 10);
  const internalPatients = parseInt(pSum.internal_patients || 0, 10);
  const externalPatients = parseInt(pSum.external_patients || 0, 10);

  const totalInvoiced = parseFloat(fSum.total_invoiced || 0);
  const totalCollected = parseFloat(fSum.total_collected || 0);
  const totalDue = parseFloat(fSum.total_due || 0);
  const recoveryRate = fSum.recovery_rate !== undefined ? fSum.recovery_rate : (totalInvoiced > 0 ? Math.round((totalCollected/totalInvoiced)*100) : 100);

  const stockList = Array.isArray(stock) ? stock : [];
  const apptsList = Array.isArray(appointments) ? appointments : [];
  const lowStockCount = stockList.filter(item => (item.current_stock_quantity || 0) <= (item.minimum_threshold_alert || 0)).length;
  const todayISO = new Date().toISOString().split('T')[0];
  const apptsToday = apptsList.filter(a => (a.start_time || '').startsWith(todayISO)).length;

  // Max value in 12 months for relative bar heights
  const agingData = (agingReport && Array.isArray(agingReport.data)) ? agingReport.data : [];
  const agingSummary = (agingReport && agingReport.summary) ? agingReport.summary : { total_balance_due: 0, patient_balance_due: 0, insurance_balance_due: 0, count: 0 };
  const totalAgingDue = parseFloat(agingSummary.total_balance_due || 0);

  // Compile aging buckets totals
  const brackets = {
    CURRENT: 0,
    '1_30_DAYS': 0,
    '31_60_DAYS': 0,
    '61_90_DAYS': 0,
    OVER_90_DAYS: 0
  };
  agingData.forEach(inv => {
    if (inv && brackets[inv.aging_bracket] !== undefined) {
      brackets[inv.aging_bracket] += parseFloat(inv.total_balance_due || 0);
    }
  });

  // Calculate doctor max invoiced for relative progress
  const maxDocInvoiced = Math.max(...doctors.map(d => parseFloat(d.total_invoiced || 0)), 1);
  const maxPathPatients = Math.max(...pathologies.map(p => parseInt(p.patient_count || 0, 10)), 1);
  const maxTrendVal = Math.max(...(monthlyTrend.length > 0 ? monthlyTrend.map(m => parseInt(m.new_patients || 0, 10)) : [1]), 1);

  container.innerHTML = `
    <!-- Top 5 Executive Metric Cards -->
    <div class="dashboard-stats-grid">
      <!-- 1. Total Patients -->
      <div class="dashboard-stat-card stat-patients">
        <div class="stat-header">
          <span class="stat-sub-label"><i class="fas fa-users"></i> Patientèle Totale</span>
          <div class="stat-icon-wrap blue"><i class="fas fa-user-injured"></i></div>
        </div>
        <div class="stat-main-number">${totalPatients.toLocaleString('fr-FR')}</div>
        <div class="stat-sub-label">${totalPatients > 1 ? 'Patients enregistrés' : 'Patient enregistré'}</div>
        <div class="stat-tags-row">
          <span class="stat-tag success"><i class="fas fa-plus"></i> ${newThisMonth} ce mois</span>
          <span class="stat-tag info">${internalPatients} Internes</span>
          <span class="stat-tag">${externalPatients} Ambulatoires</span>
        </div>
      </div>

      <!-- 2. Chiffre d'Affaires Total (CA) -->
      <div class="dashboard-stat-card stat-finance">
        <div class="stat-header">
          <span class="stat-sub-label"><i class="fas fa-coins"></i> Chiffre d'Affaires (CA)</span>
          <div class="stat-icon-wrap green"><i class="fas fa-hand-holding-usd"></i></div>
        </div>
        <div class="stat-main-number" style="color:#059669;">${totalInvoiced.toLocaleString('fr-FR')} <span style="font-size:0.95rem; font-weight:600;">XOF</span></div>
        <div class="stat-sub-label">Recouvrement : <strong>${recoveryRate}%</strong></div>
        <div class="stat-tags-row">
          <span class="stat-tag success"><i class="fas fa-check-circle"></i> Encaissé: ${totalCollected.toLocaleString('fr-FR')} XOF</span>
          <span class="stat-tag warning"><i class="fas fa-clock"></i> En attente: ${totalDue.toLocaleString('fr-FR')} XOF</span>
        </div>
      </div>

      <!-- 3. Praticiens & Médecins -->
      <div class="dashboard-stat-card stat-doctors">
        <div class="stat-header">
          <span class="stat-sub-label"><i class="fas fa-user-md"></i> Corps Médical Actif</span>
          <div class="stat-icon-wrap purple"><i class="fas fa-stethoscope"></i></div>
        </div>
        <div class="stat-main-number">${doctors.length}</div>
        <div class="stat-sub-label">Praticiens référencés</div>
        <div class="stat-tags-row">
          <span class="stat-tag info">${doctors.filter(d => d.status === 'Interne').length} Médecins Internes</span>
          <span class="stat-tag">${doctors.filter(d => d.status === 'Externe').length} Consultants Externes</span>
        </div>
      </div>

      <!-- 4. Activité & Soins du Jour -->
      <div class="dashboard-stat-card stat-activity">
        <div class="stat-header">
          <span class="stat-sub-label"><i class="fas fa-calendar-day"></i> Soins & Hospitalisation</span>
          <div class="stat-icon-wrap amber"><i class="fas fa-calendar-check"></i></div>
        </div>
        <div class="stat-main-number">${apptsToday} <span style="font-size:1rem; font-weight:600;">RDV</span></div>
        <div class="stat-sub-label">Planifiés pour aujourd'hui</div>
        <div class="stat-tags-row">
          <span class="stat-tag ${hosp.occupancy_rate > 80 ? 'warning' : 'info'}"><i class="fas fa-bed"></i> Lits: ${hosp.occupied_beds}/${hosp.total_beds} (${hosp.occupancy_rate}%)</span>
          <span class="stat-tag success">${hosp.available_beds || 0} lits dispos</span>
        </div>
      </div>

      <!-- 5. Ruptures de Stocks & Alertes -->
      <div class="dashboard-stat-card stat-alerts">
        <div class="stat-header">
          <span class="stat-sub-label"><i class="fas fa-exclamation-triangle"></i> Alertes & Créances</span>
          <div class="stat-icon-wrap red"><i class="fas fa-bell"></i></div>
        </div>
        <div class="stat-main-number" style="color:#dc2626;">${lowStockCount}</div>
        <div class="stat-sub-label">Alertes rupture stock pharmacie</div>
        <div class="stat-tags-row">
          <span class="stat-tag warning">${agingData.length} Factures en retard</span>
          <span class="stat-tag">${totalDue.toLocaleString('fr-FR')} XOF dus</span>
        </div>
      </div>
    </div>

    <!-- Section 1 : Évolution des Nouveaux Patients (12 derniers mois) -->
    <div class="analytics-panel" style="margin-bottom: 24px;">
      <div class="analytics-panel-header">
        <h4 class="analytics-panel-title">
          <i class="fas fa-chart-area" style="color:var(--primary);"></i>
          Évolution des Nouveaux Patients (12 Derniers Mois)
        </h4>
        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          <span class="badge" style="background:#eff6ff; color:#1d4ed8; border:1px solid #bfdbfe; font-size:0.8rem; font-weight:700;">
            <i class="fas fa-calendar-alt"></i> Période : ${monthlyTrend.length > 0 ? `${monthlyTrend[0].month_label} - ${monthlyTrend[monthlyTrend.length - 1].month_label}` : '12 mois'}
          </span>
          <span class="badge" style="background:#ecfdf5; color:#059669; border:1px solid #a7f3d0; font-size:0.8rem; font-weight:700;">
            <i class="fas fa-chart-line"></i> Total inscrits : ${monthlyTrend.reduce((acc, m) => acc + parseInt(m.new_patients || 0, 10), 0)}
          </span>
        </div>
      </div>

      <div class="monthly-chart-container">
        ${monthlyTrend.map(m => {
          const val = parseInt(m.new_patients || 0, 10);
          const heightPct = Math.max(Math.round((val / maxTrendVal) * 100), val > 0 ? 12 : 3);
          return `
            <div class="chart-bar-column">
              <div class="chart-bar-fill" style="height:${heightPct}%;" title="${m.month_label} : ${val} nouveaux patients">
                <span class="chart-bar-value">${val}</span>
              </div>
              <span class="chart-bar-label">${m.month_label}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Section 2 : Deux quadrants interactifs (Médecins & Pathologies) -->
    <div class="dashboard-grid-2col">
      
      <!-- Quadrant A : Répartition & CA par Médecin -->
      <div class="analytics-panel">
        <div class="analytics-panel-header">
          <h4 class="analytics-panel-title">
            <i class="fas fa-user-md" style="color:#7c3aed;"></i>
            Activité & Chiffre d'Affaires par Médecin
          </h4>
          <span class="badge" style="background:#f3e8ff; color:#7c3aed; font-weight:700;">${doctors.length} Praticiens</span>
        </div>

        <div class="data-metric-list">
          ${doctors.length === 0 ? '<div style="text-align:center; color:var(--text-muted); padding:20px;">Aucun médecin enregistré</div>' : ''}
          ${doctors.map(d => {
            const docInvoiced = parseFloat(d.total_invoiced || 0);
            const docCollected = parseFloat(d.total_collected || 0);
            const progressPct = Math.round((docInvoiced / maxDocInvoiced) * 100) || 5;
            return `
              <div class="data-metric-item">
                <div class="data-metric-top">
                  <div class="data-metric-title">
                    <div style="width:34px; height:34px; border-radius:50%; background:${d.color_code || '#7c3aed'}; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.85rem;">
                      ${d.doctor_name.replace('Dr. ', '').split(' ').map(n=>n[0]).join('').substring(0,2)}
                    </div>
                    <div>
                      <div>${d.doctor_name}</div>
                      <div style="font-size:0.75rem; color:var(--text-muted); font-weight:500;">${d.specialty} • <span class="badge" style="font-size:0.7rem; padding:1px 6px;">${d.status}</span></div>
                    </div>
                  </div>
                  <div style="text-align:right;">
                    <div style="font-weight:800; color:#059669; font-size:0.95rem;">${docInvoiced.toLocaleString('fr-FR')} XOF</div>
                    <div style="font-size:0.75rem; color:var(--text-muted);">${d.patient_count} patient(s) • ${d.consultation_count || 0} consult.</div>
                  </div>
                </div>
                <div class="progress-track">
                  <div class="progress-fill purple" style="width:${progressPct}%;"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Quadrant B : Répartition & CA par Pathologie / Diagnostic -->
      <div class="analytics-panel">
        <div class="analytics-panel-header">
          <h4 class="analytics-panel-title">
            <i class="fas fa-stethoscope" style="color:#059669;"></i>
            Distribution & CA par Pathologie (Diagnostics)
          </h4>
          <span class="badge" style="background:#ecfdf5; color:#059669; font-weight:700;">Top ${pathologies.length} Motifs</span>
        </div>

        <div class="data-metric-list">
          ${pathologies.length === 0 ? '<div style="text-align:center; color:var(--text-muted); padding:20px;">Aucun diagnostic enregistré pour le moment</div>' : ''}
          ${pathologies.map(p => {
            const pCount = parseInt(p.patient_count || 0, 10);
            const pInvoiced = parseFloat(p.total_invoiced || 0);
            const progressPct = Math.round((pCount / maxPathPatients) * 100) || 10;
            return `
              <div class="data-metric-item">
                <div class="data-metric-top">
                  <div class="data-metric-title">
                    <div style="width:32px; height:32px; border-radius:8px; background:rgba(16,185,129,0.12); color:#059669; display:flex; align-items:center; justify-content:center; font-size:0.95rem;">
                      <i class="fas fa-virus"></i>
                    </div>
                    <div>
                      <div style="font-weight:700; color:var(--text-primary);">${escapeHTML(p.pathology)}</div>
                      <div style="font-size:0.75rem; color:var(--text-muted); font-weight:500;">${p.case_count} consultation(s) documentée(s)</div>
                    </div>
                  </div>
                  <div style="text-align:right;">
                    <div style="font-weight:700; color:var(--text-primary); font-size:0.9rem;">${pCount} ${pCount > 1 ? 'Patients' : 'Patient'}</div>
                    <div style="font-size:0.75rem; color:#059669; font-weight:600;">CA : ${pInvoiced.toLocaleString('fr-FR')} XOF</div>
                  </div>
                </div>
                <div class="progress-track">
                  <div class="progress-fill green" style="width:${progressPct}%;"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

    </div>

    <!-- Section 3 : Balance Âgée des Créances -->
    <div class="card" style="margin-bottom: 24px;">
      <div class="card-title" style="display:flex; justify-content:space-between; align-items:center;">
        <span><i class="fas fa-chart-bar"></i> Balance Âgée des Créances (Retards de Paiement)</span>
        <span class="badge" style="background:#fef2f2; color:#dc2626; font-weight:700;">Total Dû : ${totalAgingDue.toLocaleString('fr-FR')} XOF</span>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Courant (Non échu)</th>
              <th>1 à 30 Jours</th>
              <th>31 à 60 Jours</th>
              <th>61 à 90 Jours</th>
              <th>+90 Jours</th>
              <th>Total Créances</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="aging-bracket-badge current">${brackets.CURRENT.toLocaleString('fr-FR')} XOF</span></td>
              <td><span class="aging-bracket-badge delay-30">${brackets['1_30_DAYS'].toLocaleString('fr-FR')} XOF</span></td>
              <td><span class="aging-bracket-badge delay-60">${brackets['31_60_DAYS'].toLocaleString('fr-FR')} XOF</span></td>
              <td><span class="aging-bracket-badge delay-60">${brackets['61_90_DAYS'].toLocaleString('fr-FR')} XOF</span></td>
              <td><span class="aging-bracket-badge delay-90">${brackets.OVER_90_DAYS.toLocaleString('fr-FR')} XOF</span></td>
              <td><strong style="color:#dc2626;">${totalAgingDue.toLocaleString('fr-FR')} XOF</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Section 4 : Factures en attente de règlement avec action de relance -->
    <div class="card">
      <div class="card-title" style="display:flex; justify-content:space-between; align-items:center;">
        <span><i class="fas fa-bell" style="color:#f59e0b;"></i> Factures en Attente de Règlement</span>
        <span class="badge" style="background:#eff6ff; color:#1d4ed8; font-weight:700;">${agingData.length} Factures</span>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>${t('patient')}</th>
              <th>Assurance / Tiers-Payant</th>
              <th>Montant Dû</th>
              <th>Ancienneté</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${agingData.length === 0 ? '<tr><td colspan="6" style="text-align:center; padding:20px; color:var(--text-muted);">Toutes les factures sont à jour ! Aucune créance en retard.</td></tr>' : ''}
            ${agingData.map(inv => `
              <tr>
                <td><strong>${inv?.invoice_number || '-'}</strong></td>
                <td><strong>${inv?.patient_name || '-'}</strong> <span style="font-size:0.8rem; color:var(--text-muted);">(${inv?.patient_code || ''})</span></td>
                <td>${inv?.insurance_name || '<span class="badge" style="background:#f1f5f9; color:#475569;">Privé</span>'}</td>
                <td><strong style="color:#dc2626;">${parseFloat(inv?.total_balance_due || 0).toLocaleString('fr-FR')} XOF</strong></td>
                <td><span class="badge" style="background:#fffbeb; color:#b45309; border:1px solid #fde68a;">${inv?.days_overdue || 0} jours</span></td>
                <td>
                  <button class="btn btn-primary btn-sm" onclick="simulateRecovery('${inv?.invoice_id || ''}', '${inv?.patient_phone || ''}')" style="display:inline-flex; align-items:center; gap:6px;">
                    <i class="fab fa-whatsapp"></i> Relancer
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Debt Recovery Simulation
async function simulateRecovery(invoiceId, phone) {
  try {
    const res = await api.request('/reports/recovery-action', {
      method: 'POST',
      body: JSON.stringify({
        invoice_id: invoiceId,
        action_type: 'WHATSAPP_NOTICE',
        target_entity: 'PATIENT',
        recipient_contact: phone
      })
    });
    showToast(`Simulation de relance envoyée par WhatsApp au ${phone}!`);
    navigate('dashboard');
  } catch (err) {
    showToast('Failed to trigger recovery action', 'error');
  }
}

// ============================================================================
// 2. Agenda & scheduling UI (Praticiens, Services Hospitaliers & Spécialités)
// ============================================================================
let activePractitionerId = null;
let activeStructureSubTab = 'practitioners'; // 'practitioners', 'departments', 'specialties'
let activeAgendaDate = getTodayDateStr(); // 'YYYY-MM-DD'
let currentAgendaSpecialties = [];
let currentAgendaPractitioners = [];
let currentAgendaDepartments = [];

function getTodayDateStr() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getApptDateStr(dateTime) {
  if (!dateTime) return '';
  const d = new Date(dateTime);
  if (isNaN(d.getTime())) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function changeAgendaDate(newDate) {
  if (!newDate) return;
  activeAgendaDate = newDate;
  navigate('agenda');
}

function navigateAgendaDate(daysDelta) {
  const parts = activeAgendaDate.split('-').map(Number);
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  d.setDate(d.getDate() + daysDelta);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  activeAgendaDate = `${year}-${month}-${day}`;
  navigate('agenda');
}

let currentBookingPatientType = 'existing'; // 'existing' | 'new'

function setBookingPatientType(type) {
  currentBookingPatientType = type;
  const existingSection = document.getElementById('booking-existing-patient-section');
  const newSection = document.getElementById('booking-new-patient-section');
  const btnExisting = document.getElementById('btn-type-existing');
  const btnNew = document.getElementById('btn-type-new');
  
  if (existingSection && newSection) {
    if (type === 'existing') {
      existingSection.style.display = 'block';
      newSection.style.display = 'none';
      if (btnExisting) { btnExisting.className = 'btn btn-primary btn-sm'; }
      if (btnNew) { btnNew.className = 'btn btn-secondary btn-sm'; }
    } else {
      existingSection.style.display = 'none';
      newSection.style.display = 'block';
      if (btnExisting) { btnExisting.className = 'btn btn-secondary btn-sm'; }
      if (btnNew) { btnNew.className = 'btn btn-primary btn-sm'; }
    }
  }
}

function onBookingCodeInput(val, patientList) {
  if (!val || !Array.isArray(patientList)) return;
  const clean = val.trim().toUpperCase();
  const match = patientList.find(p => p.code && p.code.toUpperCase() === clean);
  if (match) {
    const firstInput = document.getElementById('book-patient-first');
    const lastInput = document.getElementById('book-patient-last');
    if (firstInput && !firstInput.value) firstInput.value = match.first;
    if (lastInput && !lastInput.value) lastInput.value = match.last;
  }
}

function onSelectPatientFromDropdown(selectElem, patientList) {
  const selectedCode = selectElem.value;
  if (!selectedCode) return;
  const codeInput = document.getElementById('book-patient-code');
  if (codeInput) codeInput.value = selectedCode;
  
  const match = Array.isArray(patientList) ? patientList.find(p => p.code === selectedCode) : null;
  if (match) {
    const firstInput = document.getElementById('book-patient-first');
    const lastInput = document.getElementById('book-patient-last');
    if (firstInput) firstInput.value = match.first;
    if (lastInput) lastInput.value = match.last;
  }
  verifyBookingPatientCode();
}

async function verifyBookingPatientCode() {
  const codeInput = document.getElementById('book-patient-code');
  const firstInput = document.getElementById('book-patient-first');
  const lastInput = document.getElementById('book-patient-last');
  const statusDiv = document.getElementById('booking-verification-status');
  
  const code = codeInput ? codeInput.value.trim() : '';
  const first = firstInput ? firstInput.value.trim() : '';
  const last = lastInput ? lastInput.value.trim() : '';

  if (!code) {
    showToast('Veuillez saisir un Code Patient (ex: SM-4821)', 'warning');
    return;
  }

  if (statusDiv) {
    statusDiv.innerHTML = '<div style="font-size:0.8rem; color:var(--text-muted); padding:4px;"><i class="fas fa-spinner fa-spin"></i> Vérification en cours...</div>';
    statusDiv.style.display = 'block';
  }

  try {
    const res = await api.request('/patients/verify-code', {
      method: 'POST',
      body: JSON.stringify({ patient_code: code, first_name: first, last_name: last })
    });

    if (statusDiv) {
      if (res.exists && res.verified) {
        statusDiv.innerHTML = `
          <div style="background:rgba(16, 185, 129, 0.1); border:1px solid #10b981; color:#065f46; padding:8px 10px; border-radius:6px; font-size:0.8rem; margin-top:6px;">
            <i class="fas fa-check-circle" style="color:#10b981;"></i> <strong>${res.patient.first_name} ${res.patient.last_name}</strong> (${res.patient.patient_code})<br/>
            <span style="font-size:0.75rem;">✅ Dossier vérifié • Acompte : <strong>0 FCFA</strong> (Prise directe)</span>
          </div>
        `;
        if (firstInput && !firstInput.value) firstInput.value = res.patient.first_name;
        if (lastInput && !lastInput.value) lastInput.value = res.patient.last_name;
      } else if (res.exists && res.identity_mismatch) {
        statusDiv.innerHTML = `
          <div style="background:rgba(245, 158, 11, 0.1); border:1px solid #f59e0b; color:#92400e; padding:8px 10px; border-radius:6px; font-size:0.8rem; margin-top:6px;">
            <i class="fas fa-exclamation-triangle" style="color:#f59e0b;"></i> ${res.error || 'Le prénom/nom ne correspond pas au titulaire de ce code.'}
          </div>
        `;
      } else if (res.exists && res.requires_confirmation) {
        statusDiv.innerHTML = `
          <div style="background:rgba(59, 130, 246, 0.1); border:1px solid #3b82f6; color:#1e40af; padding:8px 10px; border-radius:6px; font-size:0.8rem; margin-top:6px;">
            <i class="fas fa-info-circle" style="color:#3b82f6;"></i> Code valide. Veuillez saisir le <strong>Prénom</strong> et <strong>Nom</strong> pour confirmer l'identité.
          </div>
        `;
      } else {
        statusDiv.innerHTML = `
          <div style="background:rgba(239, 68, 68, 0.1); border:1px solid #ef4444; color:#991b1b; padding:8px 10px; border-radius:6px; font-size:0.8rem; margin-top:6px;">
            <i class="fas fa-times-circle" style="color:#ef4444;"></i> Code introuvable. Passez en mode <strong>Nouveau Patient</strong> (Acompte 2 000 F).
          </div>
        `;
      }
    }
  } catch (err) {
    if (statusDiv) statusDiv.innerHTML = `<div style="color:red; font-size:0.8rem;">Erreur lors de la vérification</div>`;
  }
}

function resetAgendaToday() {
  activeAgendaDate = getTodayDateStr();
  navigate('agenda');
}

// ----------------------------------------------------------------------------
// Annulation & report d'un rendez-vous depuis l'agenda
// ----------------------------------------------------------------------------

async function cancelAppointmentUI(appointmentId, patientLabel, timeStr) {
  const reason = window.prompt(
    `Annuler le rendez-vous de ${patientLabel} à ${timeStr} ?\n\nLe créneau redeviendra disponible. Motif (facultatif) :`,
    ''
  );
  // prompt renvoie null si l'utilisateur annule la boîte de dialogue elle-même :
  // une chaîne vide reste une confirmation valide sans motif.
  if (reason === null) return;

  try {
    const res = await api.request(`/appointments/${appointmentId}`, {
      method: 'DELETE',
      body: JSON.stringify({ reason: reason.trim() || undefined })
    });
    showToast(res.message || 'Rendez-vous annulé.', 'success');
    navigate('agenda');
  } catch (err) {
    showToast(`Échec de l'annulation : ${err.message}`, 'error');
  }
}

function openRescheduleModal(appointmentId, patientLabel, currentStartISO) {
  let modal = document.getElementById('reschedule-modal');
  if (!modal) {
    const div = document.createElement('div');
    div.className = 'modal-overlay';
    div.id = 'reschedule-modal';
    div.style.cssText = 'display:none; justify-content:center; align-items:center; z-index:3200;';
    div.innerHTML = `
      <div class="modal-container" style="width:460px; max-width:96%; padding:22px;">
        <div class="modal-header" style="border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:15px; display:flex; justify-content:space-between; align-items:center;">
          <h4 class="modal-title" style="margin:0; font-size:1.05rem; font-weight:800;">
            <i class="fas fa-clock text-primary"></i> Reporter le rendez-vous
          </h4>
          <button class="modal-close" onclick="closeRescheduleModal()">&times;</button>
        </div>
        <form onsubmit="submitReschedule(event)">
          <input type="hidden" id="reschedule-appt-id" />
          <div style="font-size:0.86rem; color:var(--text-primary); margin-bottom:12px;">
            Patient : <strong id="reschedule-patient"></strong>
          </div>
          <div class="form-group">
            <label class="form-label">Nouvelle date et heure *</label>
            <input type="datetime-local" class="form-control" id="reschedule-start" required />
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">
              La durée est reprise de la prestation. Si le créneau est déjà pris, le report sera refusé.
            </div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:15px; margin-top:6px;">
            <button type="button" class="btn btn-secondary" onclick="closeRescheduleModal()">Annuler</button>
            <button type="submit" class="btn btn-primary" style="font-weight:700;">
              <i class="fas fa-check"></i> Confirmer le report
            </button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(div);
    modal = div;
  }

  document.getElementById('reschedule-appt-id').value = appointmentId;
  document.getElementById('reschedule-patient').innerText = patientLabel;

  // Pré-remplit avec l'horaire actuel, en heure locale : un datetime-local
  // n'accepte pas un horodatage UTC avec suffixe Z.
  const d = new Date(currentStartISO);
  const pad = (n) => String(n).padStart(2, '0');
  document.getElementById('reschedule-start').value =
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;

  modal.style.display = 'flex';
}

function closeRescheduleModal() {
  const modal = document.getElementById('reschedule-modal');
  if (modal) modal.style.display = 'none';
}

async function submitReschedule(e) {
  e.preventDefault();
  const appointmentId = document.getElementById('reschedule-appt-id').value;
  const newStart = document.getElementById('reschedule-start').value;
  if (!newStart) return;

  try {
    await api.request(`/appointments/${appointmentId}`, {
      method: 'PUT',
      body: JSON.stringify({ start_time: new Date(newStart).toISOString() })
    });
    showToast('Rendez-vous reporté.', 'success');
    closeRescheduleModal();
    navigate('agenda');
  } catch (err) {
    showToast(`Échec du report : ${err.message}`, 'error');
  }
}

function quickSelectSlot(timeStr) {
  const timeInput = document.getElementById('book-start-time');
  if (timeInput) {
    timeInput.value = `${activeAgendaDate}T${timeStr}`;
    timeInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    timeInput.focus();
    showToast(`Créneau sélectionné : ${activeAgendaDate} à ${timeStr}`, 'info');
  }
}

// ----------------------------------------------------------------------------
// Agenda & Rendez-vous View (100% Focused on Calendar & Direct Scheduling)
// ----------------------------------------------------------------------------
async function renderAgenda(container) {
  const fr = state.currentLang !== 'ar';

  // Fetch all related entities in parallel
  const [patients, services, dbPractitioners, dbSpecialties, dbDepartments, rawAppointments] = await Promise.all([
    api.request('/patients').catch(() => []),
    api.request('/medical-services').catch(() => []),
    api.request('/practitioners').catch(() => []),
    api.request('/specialties').catch(() => []),
    api.request('/departments').catch(() => []),
    api.request('/appointments').catch(() => [])
  ]);

  const pracs = Array.isArray(dbPractitioners) ? dbPractitioners : [];
  const specs = Array.isArray(dbSpecialties) ? dbSpecialties : [];
  const depts = Array.isArray(dbDepartments) ? dbDepartments : [];
  const appts = Array.isArray(rawAppointments) ? rawAppointments : [];
  const pats = Array.isArray(patients) ? patients : [];
  const servs = Array.isArray(services) ? services : [];

  currentAgendaSpecialties = specs;
  currentAgendaPractitioners = pracs;
  currentAgendaDepartments = depts;

  if (!activePractitionerId && pracs.length > 0) {
    activePractitionerId = pracs[0].id;
  }

  container.innerHTML = `
    <!-- Top Action Header -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; border-bottom:1px solid var(--border-color); padding-bottom:12px; flex-wrap:wrap; gap:12px;">
      <div>
        <h3 style="margin:0; font-size:1.15rem; font-weight:700; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
          <i class="fas fa-calendar-alt" style="color:var(--primary);"></i> ${fr ? 'Calendrier & Rendez-vous' : 'المواعيد والجدول'}
        </h3>
        <p style="margin:2px 0 0 0; font-size:0.82rem; color:var(--text-muted);">${fr ? 'Planification des consultations, créneaux en direct et réservations patients' : 'إدارة المواعيد والجداول والاستشارات'}</p>
      </div>

      <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
        <button class="btn btn-secondary" onclick="openUnavailabilityModal()" style="font-size:0.85rem; color:#dc2626; border-color:#fca5a5; background:#fff1f2; padding:7px 14px;">
          <i class="fas fa-calendar-times"></i> ${fr ? 'Déclarer Indisponibilité / Congé' : 'إجازة / عدم توفر'}
        </button>
      </div>
    </div>

    <div id="agenda-calendar-container">
      ${renderAgendaCalendarContent(pats, servs, pracs, appts, fr)}
    </div>
  `;
}

// ----------------------------------------------------------------------------
// Structure & Équipe Médicale View (Practitioners, Departments & Specialties)
// ----------------------------------------------------------------------------
async function renderMedicalStructure(container) {
  const fr = state.currentLang !== 'ar';

  const [dbPractitioners, dbSpecialties, dbDepartments] = await Promise.all([
    api.request('/practitioners').catch(() => []),
    api.request('/specialties').catch(() => []),
    api.request('/departments').catch(() => [])
  ]);

  const pracs = Array.isArray(dbPractitioners) ? dbPractitioners : [];
  const specs = Array.isArray(dbSpecialties) ? dbSpecialties : [];
  const depts = Array.isArray(dbDepartments) ? dbDepartments : [];

  currentAgendaSpecialties = specs;
  currentAgendaPractitioners = pracs;
  currentAgendaDepartments = depts;

  container.innerHTML = `
    <!-- Top Action Bar & Subtabs -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid var(--border-color); padding-bottom:14px; flex-wrap:wrap; gap:12px;">
      <!-- Sub-tabs pills -->
      <div style="background:var(--bg-surface); padding:5px; border-radius:10px; border:1px solid var(--border-color); display:inline-flex; gap:6px; flex-wrap:wrap;">
        <button class="btn ${activeStructureSubTab === 'practitioners' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="switchStructureSubTab('practitioners')" style="font-size:0.88rem; padding:7px 16px; border-radius:7px; font-weight:600;">
          <i class="fas fa-user-md"></i> ${fr ? `Praticiens & Médecins (${pracs.length})` : `الأطباء (${pracs.length})`}
        </button>
        <button class="btn ${activeStructureSubTab === 'departments' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="switchStructureSubTab('departments')" style="font-size:0.88rem; padding:7px 16px; border-radius:7px; font-weight:600;">
          <i class="fas fa-hospital-alt"></i> ${fr ? `Services Hospitaliers (${depts.length})` : `الأقسام (${depts.length})`}
        </button>
        <button class="btn ${activeStructureSubTab === 'specialties' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="switchStructureSubTab('specialties')" style="font-size:0.88rem; padding:7px 16px; border-radius:7px; font-weight:600;">
          <i class="fas fa-stethoscope"></i> ${fr ? `Spécialités Médicales (${specs.length})` : `التخصصات (${specs.length})`}
        </button>
      </div>

      <!-- Action Button -->
      <div>
        ${activeStructureSubTab === 'practitioners' ? `
          <button class="btn btn-primary" onclick="openCreatePractitionerModal()" style="font-size:0.88rem; padding:8px 16px; font-weight:600;">
            <i class="fas fa-user-plus"></i> ${fr ? 'Nouveau Praticien' : 'طبيب جديد'}
          </button>
        ` : ''}

        ${activeStructureSubTab === 'departments' ? `
          <button class="btn btn-primary" onclick="openCreateDepartmentModal()" style="font-size:0.88rem; padding:8px 16px; font-weight:600;">
            <i class="fas fa-plus"></i> ${fr ? 'Nouveau Service Hospitalier' : 'قسم جديد'}
          </button>
        ` : ''}

        ${activeStructureSubTab === 'specialties' ? `
          <button class="btn btn-primary" onclick="openCreateSpecialtyModal()" style="font-size:0.88rem; padding:8px 16px; font-weight:600;">
            <i class="fas fa-plus-circle"></i> ${fr ? 'Nouvelle Spécialité' : 'تخصص جديد'}
          </button>
        ` : ''}
      </div>
    </div>

    <div id="structure-subtab-content">
      ${activeStructureSubTab === 'practitioners'
        ? renderAgendaPractitionersContent(pracs, specs, depts, fr)
        : activeStructureSubTab === 'departments'
          ? renderAgendaDepartmentsContent(depts, specs, pracs, fr)
          : renderAgendaSpecialtiesContent(specs, fr)
      }
    </div>
  `;
}

function switchStructureSubTab(subtab) {
  activeStructureSubTab = subtab;
  navigate('structure');
}

function switchAgendaSubTab(subtab) {
  if (subtab === 'calendar') {
    navigate('agenda');
  } else {
    activeStructureSubTab = subtab;
    navigate('structure');
  }
}

// ----------------------------------------------------------------------------
// A. Calendar & Appointment Booking Subtab
// ----------------------------------------------------------------------------
function renderAgendaCalendarContent(patients, services, practitioners, appointments, fr) {
  const pracList = Array.isArray(practitioners) ? practitioners : [];
  const apptList = Array.isArray(appointments) ? appointments : [];
  const activeDoc = pracList.find(p => p.id === activePractitionerId) || pracList[0] || null;
  const docColor = activeDoc ? (activeDoc.color_code || '#4A90E2') : '#4A90E2';

  // Filter by selected date and active practitioner
  const dayAppointments = apptList.filter(a => getApptDateStr(a.start_time) === activeAgendaDate);
  const filteredAppts = activePractitionerId 
    ? dayAppointments.filter(a => a.practitioner_id === activePractitionerId)
    : dayAppointments;

  const dateParts = activeAgendaDate.split('-').map(Number);
  const selectedDateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  const isToday = activeAgendaDate === getTodayDateStr();

  const formattedDateStr = selectedDateObj.toLocaleDateString(fr ? 'fr-FR' : 'ar-SA', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const tenantSlug = (state.tenant && state.tenant.slug) ? state.tenant.slug : 'paix';
  const bookingUrl = `${window.location.origin}/rdv/${tenantSlug}`;

  return `
    <!-- Patient Easy Booking Direct Link Banner -->
    <div style="background:linear-gradient(135deg, rgba(74, 144, 226, 0.1), rgba(16, 185, 129, 0.08)); border:1px solid rgba(74, 144, 226, 0.3); border-radius:12px; padding:12px 18px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
      <div>
        <div style="font-weight:700; font-size:0.95rem; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
          <i class="fas fa-link" style="color:var(--primary);"></i> Lien Facile de Réservation Patient
          <span class="badge" style="background:#10b981; color:#fff; font-size:0.7rem; padding:2px 7px; border-radius:10px;">Accessible 24h/24</span>
        </div>
        <div style="font-size:0.83rem; color:var(--text-muted); margin-top:3px;">
          Lien court à transmettre aux patients : <strong style="color:var(--primary);">${bookingUrl}</strong>
        </div>
      </div>
      <div style="display:flex; gap:8px; flex-wrap:wrap;">
        <button class="btn btn-secondary btn-sm" onclick="copyPublicBookingLink('${tenantSlug}')" style="font-size:0.8rem; padding:6px 12px;">
          <i class="fas fa-copy"></i> Copier le Lien
        </button>
        <button class="btn btn-secondary btn-sm" onclick="shareOnWhatsApp('${tenantSlug}', '${state.tenant ? state.tenant.name.replace(/'/g, "\\'") : 'la clinique'}')" style="background:#25D366; color:#fff; border-color:#25D366; font-size:0.8rem; padding:6px 12px;">
          <i class="fab fa-whatsapp"></i> Partager WhatsApp
        </button>
        <button class="btn btn-primary btn-sm" onclick="openPublicBookingPortal('${tenantSlug}')" style="font-size:0.8rem; padding:6px 12px;">
          <i class="fas fa-external-link-alt"></i> Ouvrir le Portail Patient
        </button>
      </div>
    </div>

    <div class="agenda-grid">
      <div>
        <div class="practitioner-list">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
            <h4 style="margin:0; font-size:1.05rem; color:var(--text-primary);"><i class="fas fa-user-md" style="color:var(--primary);"></i> Praticiens</h4>
            <button class="btn btn-secondary btn-sm" onclick="switchAgendaSubTab('practitioners')" title="Gérer les praticiens" style="padding:2px 8px; font-size:0.75rem;">
              <i class="fas fa-cog"></i>
            </button>
          </div>
          ${practitioners.length === 0 ? `
            <div style="font-size:0.85rem; color:var(--text-muted); text-align:center; padding:15px;">
              Aucun praticien enregistré.<br/>
              <button class="btn btn-primary btn-sm" style="margin-top:10px;" onclick="openCreatePractitionerModal()"><i class="fas fa-plus"></i> Ajouter</button>
            </div>
          ` : practitioners.map(prac => {
            const isSelected = activePractitionerId === prac.id;
            const docSpecialties = Array.isArray(prac.specialties) ? prac.specialties : [];
            const specialtyLabels = prac.is_general_practitioner 
              ? '<span class="badge" style="background:#10b981; color:#fff; font-size:0.7rem; padding:1px 6px;">Médecine Générale</span>'
              : (docSpecialties.length > 0 
                  ? docSpecialties.map(s => `<span class="badge" style="background:${s.color_code || '#4a90e2'}; color:#fff; font-size:0.68rem; padding:1px 5px; margin-right:3px;">${s.name}</span>`).join('')
                  : `<span class="badge" style="background:#64748b; color:#fff; font-size:0.68rem; padding:1px 5px;">${prac.specialty_name || 'Généraliste'}</span>`
                );

            const deptBadges = Array.isArray(prac.departments) && prac.departments.length > 0
              ? prac.departments.map(d => `<span class="badge" style="background:var(--bg-surface); color:var(--text-primary); border:1px solid var(--border-color); font-size:0.65rem; padding:1px 4px;"><i class="fas fa-hospital-alt" style="color:var(--primary); font-size:0.6rem;"></i> ${d.name}</span>`).join(' ')
              : '';

            return `
              <div class="practitioner-item ${isSelected ? 'active' : ''}" onclick="selectPractitioner('${prac.id}')" style="border-left: 4px solid ${prac.color_code || '#4a90e2'}; margin-bottom:10px;">
                <span class="color-dot" style="background-color: ${prac.color_code || '#4A90E2'}"></span>
                <div style="flex:1; min-width:0;">
                  <div style="font-weight:600; font-size:0.92rem; color:var(--text-primary);">
                    ${prac.title || 'Dr.'} ${prac.first_name} ${prac.last_name}
                  </div>
                  <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:3px;">
                    ${prac.grade || 'Docteur'} • <span class="badge" style="background:${prac.status === 'Interne' ? 'var(--primary)' : '#64748b'}; color:#fff; font-size:0.65rem; padding:0 4px;">${prac.status || 'Interne'}</span>
                  </div>
                  <div style="display:flex; flex-wrap:wrap; gap:3px; margin-bottom:3px;">
                    ${specialtyLabels}
                  </div>
                  ${deptBadges ? `<div style="display:flex; flex-wrap:wrap; gap:2px;">${deptBadges}</div>` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
        
        <div class="card" style="margin-top:20px;">
          <div class="card-title" style="font-size:1.05rem; display:flex; justify-content:space-between; align-items:center;">
            <span><i class="fas fa-calendar-plus"></i> ${t('bookAppt')}</span>
          </div>

          <!-- Type selection tabs: Patient Existant vs Nouveau Patient -->
          <div style="display:flex; gap:6px; margin-bottom:14px; background:var(--bg-surface); padding:4px; border-radius:8px; border:1px solid var(--border-color);">
            <button type="button" id="btn-type-existing" class="btn ${currentBookingPatientType === 'existing' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="setBookingPatientType('existing')" style="flex:1; font-size:0.78rem; padding:6px 4px;">
              <i class="fas fa-id-card"></i> ${fr ? 'Code Patient Unique' : 'رمز المريض'}
            </button>
            <button type="button" id="btn-type-new" class="btn ${currentBookingPatientType === 'new' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="setBookingPatientType('new')" style="flex:1; font-size:0.78rem; padding:6px 4px;">
              <i class="fas fa-user-plus"></i> ${fr ? 'Nouveau (2000 F)' : 'مريض جديد'}
            </button>
          </div>

          <form id="appt-booking-form" onsubmit="bookAppointment(event)">
            <!-- Mode 1: Patient avec Code Unique (Vérification identité croisée) -->
            <div id="booking-existing-patient-section" style="display:${currentBookingPatientType === 'existing' ? 'block' : 'none'};">
              <div class="form-group">
                <label class="form-label" style="font-size:0.82rem;">Code Patient Unique *</label>
                <div style="display:flex; gap:6px;">
                  <input type="text" class="form-control" id="book-patient-code" placeholder="Ex: SM-4821" style="font-weight:600; text-transform:uppercase;" oninput="onBookingCodeInput(this.value, ${JSON.stringify(patients.map(p => ({ id: p.id, code: p.patient_code, first: p.first_name, last: p.last_name }))).replace(/"/g, '&quot;')})" />
                  <button type="button" class="btn btn-secondary btn-sm" onclick="verifyBookingPatientCode()" title="Vérifier le code">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>

              <!-- Quick dropdown selection helper -->
              <div class="form-group">
                <label class="form-label" style="font-size:0.75rem; color:var(--text-muted);">Ou choisir dans le registre :</label>
                <select class="form-control" style="font-size:0.8rem; padding:4px 8px;" onchange="onSelectPatientFromDropdown(this, ${JSON.stringify(patients.map(p => ({ id: p.id, code: p.patient_code, first: p.first_name, last: p.last_name }))).replace(/"/g, '&quot;')})">
                  <option value="">-- Sélectionner dans la liste --</option>
                  ${patients.map(p => `<option value="${p.patient_code}">${p.first_name} ${p.last_name} (${p.patient_code})</option>`).join('')}
                </select>
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                <div class="form-group">
                  <label class="form-label" style="font-size:0.8rem;">Prénom confirmation *</label>
                  <input type="text" class="form-control" id="book-patient-first" placeholder="Prénom" style="font-size:0.82rem;" />
                </div>
                <div class="form-group">
                  <label class="form-label" style="font-size:0.8rem;">Nom confirmation *</label>
                  <input type="text" class="form-control" id="book-patient-last" placeholder="Nom de famille" style="font-size:0.82rem;" />
                </div>
              </div>
              <div id="booking-verification-status" style="margin-bottom:12px; display:none;"></div>
            </div>

            <!-- Mode 2: Nouveau Patient (Acompte de confirmation 2 000 FCFA) -->
            <div id="booking-new-patient-section" style="display:${currentBookingPatientType === 'new' ? 'block' : 'none'};">
              <div style="background:rgba(245, 158, 11, 0.08); border:1px solid rgba(245, 158, 11, 0.3); border-radius:8px; padding:8px 10px; margin-bottom:12px; font-size:0.78rem; color:var(--text-primary);">
                <i class="fas fa-shield-alt" style="color:#f59e0b;"></i> <strong>Acompte de confirmation : 2 000 FCFA</strong> (Wave / Orange Money).<br/>
                <span style="font-size:0.72rem; color:var(--text-muted);">Un Code Unique Patient (ex: <i>SM-XXXX</i>) sera généré automatiquement dès validation.</span>
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                <div class="form-group">
                  <label class="form-label" style="font-size:0.8rem;">Prénom *</label>
                  <input type="text" class="form-control" id="book-new-first" placeholder="Prénom" style="font-size:0.82rem;" />
                </div>
                <div class="form-group">
                  <label class="form-label" style="font-size:0.8rem;">Nom *</label>
                  <input type="text" class="form-control" id="book-new-last" placeholder="Nom" style="font-size:0.82rem;" />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" style="font-size:0.8rem;">Téléphone portable *</label>
                <input type="tel" class="form-control" id="book-new-phone" placeholder="Ex: 77 123 45 67" style="font-size:0.82rem;" />
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                <div class="form-group">
                  <label class="form-label" style="font-size:0.8rem;">Genre</label>
                  <select class="form-control" id="book-new-gender" style="font-size:0.82rem;">
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label" style="font-size:0.8rem;">Date Naissance</label>
                  <input type="date" class="form-control" id="book-new-dob" style="font-size:0.82rem;" value="1995-01-01" />
                </div>
              </div>
            </div>

            <div class="form-group" style="margin-top:10px;">
              <label class="form-label" style="font-size:0.82rem;">Praticien / Médecin *</label>
              <select class="form-control" id="book-practitioner-id" required onchange="selectPractitioner(this.value)">
                ${practitioners.map(prac => `
                  <option value="${prac.id}" ${activePractitionerId === prac.id ? 'selected' : ''}>
                    ${prac.title || 'Dr.'} ${prac.first_name} ${prac.last_name} (${prac.grade || 'Docteur'})
                  </option>
                `).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-size:0.82rem;">${t('service')} *</label>
              <select class="form-control" id="book-service-id" required>
                <option value="">-- Sélectionner Acte ou Consultation --</option>
                ${services.map(s => `<option value="${s.id}">[${s.category || 'ACTE'}] ${s.name} — ${parseFloat(s.price).toLocaleString()} FCFA</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-size:0.82rem;">${t('dateTime')} *</label>
              <input type="datetime-local" class="form-control" id="book-start-time" value="${activeAgendaDate}T09:00" required />
            </div>
            <div class="form-group">
              <label class="form-label" style="font-size:0.82rem;">${t('channel')}</label>
              <select class="form-control" id="book-channel">
                <option value="VOICE_AGENT">📞 Agent Vocal AI</option>
                <option value="WHATSAPP">💬 WhatsApp / SMS</option>
                <option value="WEB_PWA">🌐 PWA Web SoftMed</option>
                <option value="DESK">🏥 Guichet / Accueil Clinique</option>
              </select>
            </div>
            <button class="btn btn-primary" style="width:100%;"><i class="fas fa-calendar-check"></i> ${t('bookBtn')}</button>
          </form>
        </div>
      </div>
      
      <div class="calendar-view">
        <div class="calendar-header" style="border-bottom:1px solid var(--border-color); padding-bottom:16px; margin-bottom:18px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <h3 style="margin:0; color:var(--text-primary); font-size:1.2rem; display:flex; align-items:center; gap:8px;">
              <i class="fas fa-calendar-alt" style="color:var(--primary);"></i> ${t('schedule')}
              <span class="badge" style="background:var(--primary); color:#fff; font-size:0.75rem; padding:3px 8px; border-radius:12px; font-weight:normal;">
                ${filteredAppts.length} RDV
              </span>
            </h3>
            ${activeDoc ? `
              <div style="font-size:0.85rem; color:var(--text-muted); margin-top:4px;">
                Consultations de <strong>${activeDoc.title || 'Dr.'} ${activeDoc.first_name} ${activeDoc.last_name}</strong> (${activeDoc.grade || 'Docteur'})
              </div>
            ` : ''}
          </div>

          <!-- Date Selector and Day Navigation Toolbar -->
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <div style="display:flex; align-items:center; background:var(--bg-surface); border:1px solid var(--border-color); border-radius:8px; padding:3px 6px; gap:4px;">
              <button class="btn btn-secondary btn-sm" onclick="navigateAgendaDate(-1)" title="Jour précédent" style="padding:4px 8px; font-size:0.8rem; border:none; background:transparent;">
                <i class="fas fa-chevron-left"></i>
              </button>
              <input type="date" id="agenda-date-picker" value="${activeAgendaDate}" onchange="changeAgendaDate(this.value)" style="border:none; background:transparent; color:var(--text-primary); font-size:0.85rem; font-weight:600; padding:2px 4px; outline:none; cursor:pointer;" />
              <button class="btn btn-secondary btn-sm" onclick="navigateAgendaDate(1)" title="Jour suivant" style="padding:4px 8px; font-size:0.8rem; border:none; background:transparent;">
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
            <button class="btn ${isToday ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="resetAgendaToday()" style="padding:6px 12px; font-size:0.82rem;">
              <i class="fas fa-calendar-day"></i> ${fr ? "Aujourd'hui" : 'اليوم'}
            </button>
          </div>
        </div>

        <!-- Legend & Stats Bar -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px; background:var(--bg-surface); padding:10px 16px; border-radius:8px; border:1px solid var(--border-color);">
          <div style="display:flex; gap:16px; align-items:center; font-size:0.85rem; font-weight:700;">
            <span style="display:flex; align-items:center; gap:6px; color:#047857;">
              <span style="display:inline-block; width:12px; height:12px; border-radius:3px; background:#10b981;"></span>
              Tranches Libres : <strong>${(() => {
                let freeCount = 0;
                for (let h = 8; h <= 19; h++) {
                  for (let m of [0, 15, 30, 45]) {
                    if (h === 19 && m > 0) break;
                    const sMin = h * 60 + m;
                    const isOcc = filteredAppts.some(appt => {
                      const d = new Date(appt.start_time);
                      const startM = d.getHours() * 60 + d.getMinutes();
                      let endM = startM + (appt.duration_minutes || 15);
                      if (appt.end_time) {
                        const endD = new Date(appt.end_time);
                        if (getApptDateStr(appt.end_time) === activeAgendaDate) endM = endD.getHours() * 60 + endD.getMinutes();
                      }
                      return sMin >= startM && sMin < endM;
                    });
                    if (!isOcc) freeCount++;
                  }
                }
                return freeCount;
              })()}</strong>
            </span>
            <span style="display:flex; align-items:center; gap:6px; color:#b91c1c;">
              <span style="display:inline-block; width:12px; height:12px; border-radius:3px; background:#ef4444;"></span>
              Tranches Occupées : <strong>${(() => {
                let occCount = 0;
                for (let h = 8; h <= 19; h++) {
                  for (let m of [0, 15, 30, 45]) {
                    if (h === 19 && m > 0) break;
                    const sMin = h * 60 + m;
                    const isOcc = filteredAppts.some(appt => {
                      const d = new Date(appt.start_time);
                      const startM = d.getHours() * 60 + d.getMinutes();
                      let endM = startM + (appt.duration_minutes || 15);
                      if (appt.end_time) {
                        const endD = new Date(appt.end_time);
                        if (getApptDateStr(appt.end_time) === activeAgendaDate) endM = endD.getHours() * 60 + endD.getMinutes();
                      }
                      return sMin >= startM && sMin < endM;
                    });
                    if (isOcc) occCount++;
                  }
                }
                return occCount;
              })()}</strong>
            </span>
          </div>
          <div style="font-size:0.78rem; color:var(--text-muted); font-weight:600;">
            <i class="fas fa-clock text-primary"></i> Tranches de 15 minutes (08:00 à 19:00)
          </div>
        </div>

        <!-- Banner with selected date details -->
        <div style="background:rgba(74, 144, 226, 0.07); border:1px solid rgba(74, 144, 226, 0.2); border-radius:8px; padding:8px 14px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center; font-size:0.88rem;">
          <div style="color:var(--text-primary);">
            <i class="fas fa-calendar-check" style="color:var(--primary); margin-right:6px;"></i>
            <span style="text-transform:capitalize; font-weight:600;">${formattedDateStr}</span>
            ${isToday ? `<span class="badge" style="background:#10b981; color:#fff; font-size:0.7rem; padding:1px 6px; margin-left:6px;">Aujourd'hui</span>` : ''}
          </div>
          <div style="color:var(--text-muted); font-size:0.8rem;">
            ${filteredAppts.length === 0 ? 'Aucun rendez-vous sur cette journée' : `${filteredAppts.length} rendez-vous planifié(s)`}
          </div>
        </div>
        
        <div class="calendar-slots" style="border:1px solid var(--border-color); border-radius:10px; overflow:hidden;">
          ${(() => {
            const slotsHtml = [];
            for (let hour = 8; hour <= 19; hour++) {
              for (let min of [0, 15, 30, 45]) {
                if (hour === 19 && min > 0) break;
                const timeStr = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
                const slotMinutes = hour * 60 + min;

                // Find appointments covering this 15-min slot
                const slotAppts = filteredAppts.filter(appt => {
                  const d = new Date(appt.start_time);
                  const startM = d.getHours() * 60 + d.getMinutes();
                  let endM = startM + (appt.duration_minutes || 15);
                  if (appt.end_time) {
                    const endD = new Date(appt.end_time);
                    if (getApptDateStr(appt.end_time) === activeAgendaDate) {
                      endM = endD.getHours() * 60 + endD.getMinutes();
                    }
                  }
                  return slotMinutes >= startM && slotMinutes < endM;
                });

                const isOccupied = slotAppts.length > 0;

                if (isOccupied) {
                  // ROUGE: OCCUPÉ
                  slotsHtml.push(`
                    <div class="slot-hour" style="background:#fef2f2; color:#b91c1c; font-weight:800; border-left:4px solid #ef4444; border-bottom:1px solid #fee2e2; display:flex; align-items:center; justify-content:center; font-size:0.82rem;">
                      ${timeStr}
                    </div>
                    <div class="slot-content" style="background:#fff5f5; border-bottom:1px solid #fee2e2; padding:6px 10px;">
                      ${slotAppts.map(appt => {
                        const apptStart = new Date(appt.start_time);
                        const startTimeStr = apptStart.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                        const endTimeStr = appt.end_time ? new Date(appt.end_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '';
                        // Un rendez-vous de 30 min occupe deux lignes de 15 min : les actions
                        // ne s'affichent que sur sa ligne de début, pour ne pas les dupliquer.
                        const isStartRow = (apptStart.getHours() * 60 + apptStart.getMinutes()) === slotMinutes;
                        const canAct = isStartRow && appt.status !== 'COMPLETED';
                        const patientLabel = `${appt.patient_first || ''} ${appt.patient_last || ''}`.trim().replace(/'/g, "\\'");
                        return `
                          <div style="background:#ffffff; border:1px solid #fca5a5; border-left:4px solid #ef4444; border-radius:6px; padding:6px 10px; box-shadow:0 1px 3px rgba(239,68,68,0.08);">
                            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
                              <div style="display:flex; align-items:center; gap:8px;">
                                <span class="badge" style="background:#ef4444; color:#fff; font-size:0.7rem; font-weight:700; padding:2px 7px; border-radius:4px;">
                                  <i class="fas fa-lock"></i> OCCUPÉ
                                </span>
                                <strong style="color:#991b1b; font-size:0.88rem;">${appt.patient_first} ${appt.patient_last}</strong>
                                <span style="font-size:0.75rem; color:var(--text-muted);">(${appt.patient_code})</span>
                                <span style="font-size:0.75rem; color:#b91c1c; font-weight:600;">[${startTimeStr}${endTimeStr ? ` - ${endTimeStr}` : ''}]</span>
                              </div>
                              <span class="status-badge ${appt.status.toLowerCase()}" style="font-size:0.7rem; padding:1px 6px;">${appt.status}</span>
                            </div>
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:3px; font-size:0.78rem; color:var(--text-muted); flex-wrap:wrap; gap:4px;">
                              <div>
                                <i class="fas fa-stethoscope text-primary"></i> ${appt.service_name} • <strong style="color:var(--text-primary);">${parseFloat(appt.price || 0).toLocaleString()} FCFA</strong>
                              </div>
                              <span class="badge" style="background:${appt.booking_channel === 'VOICE_AGENT' ? '#8b5cf6' : (appt.booking_channel === 'WHATSAPP' ? '#10b981' : (appt.booking_channel === 'WEB_PWA' ? '#4a90e2' : '#64748b'))}; color:#fff; font-size:0.68rem; padding:1px 6px; border-radius:6px;">
                                <i class="${appt.booking_channel === 'VOICE_AGENT' ? 'fas fa-microphone' : (appt.booking_channel === 'WHATSAPP' ? 'fab fa-whatsapp' : (appt.booking_channel === 'WEB_PWA' ? 'fas fa-globe' : 'fas fa-desktop'))}"></i>
                                ${appt.booking_channel === 'VOICE_AGENT' ? 'Vocal IA' : (appt.booking_channel === 'WHATSAPP' ? 'WhatsApp' : (appt.booking_channel === 'WEB_PWA' ? 'En ligne' : 'Guichet'))}
                              </span>
                            </div>
                            ${canAct ? `
                              <div style="display:flex; gap:6px; margin-top:6px; padding-top:6px; border-top:1px dashed #fecaca;">
                                <button class="btn btn-secondary" style="font-size:0.72rem; padding:3px 9px;"
                                        onclick="openRescheduleModal('${appt.id}', '${patientLabel}', '${appt.start_time}')">
                                  <i class="fas fa-clock"></i> Reporter
                                </button>
                                <button class="btn btn-secondary" style="font-size:0.72rem; padding:3px 9px; color:#b91c1c; border-color:#fca5a5;"
                                        onclick="cancelAppointmentUI('${appt.id}', '${patientLabel}', '${startTimeStr}')">
                                  <i class="fas fa-times-circle"></i> Annuler
                                </button>
                              </div>
                            ` : ''}
                          </div>
                        `;
                      }).join('')}
                    </div>
                  `);
                } else {
                  // VERT: LIBRE
                  slotsHtml.push(`
                    <div class="slot-hour" style="background:#f0fdf4; color:#15803d; font-weight:700; border-left:4px solid #10b981; border-bottom:1px solid #dcfce7; display:flex; align-items:center; justify-content:center; font-size:0.82rem;">
                      ${timeStr}
                    </div>
                    <div class="slot-content" style="background:#f0fdf4; border-bottom:1px solid #dcfce7; padding:4px 10px; cursor:pointer;" onclick="quickSelectSlot('${timeStr}')" title="Cliquer pour planifier à ${timeStr}">
                      <div style="display:flex; justify-content:space-between; align-items:center; padding:2px 4px; border-radius:4px;">
                        <div style="display:flex; align-items:center; gap:8px;">
                          <span class="badge" style="background:#10b981; color:#ffffff; font-size:0.7rem; font-weight:700; padding:2px 7px; border-radius:4px;">
                            <i class="fas fa-check-circle"></i> LIBRE
                          </span>
                          <span style="color:#047857; font-size:0.82rem; font-weight:600;">
                            ${fr ? 'Créneau libre (Cliquer pour planifier)' : 'موعد شاغر (اضغط للحجز)'}
                          </span>
                        </div>
                        <button type="button" class="btn btn-secondary btn-sm" style="font-size:0.72rem; padding:2px 8px; background:#ffffff; color:#047857; border-color:#86efac;">
                          <i class="fas fa-plus"></i> ${fr ? 'Planifier' : 'حجز'}
                        </button>
                      </div>
                    </div>
                  `);
                }
              }
            }
            return slotsHtml.join('');
          })()}
        </div>
      </div>
    </div>
  `;
}

function selectPractitioner(id) {
  activePractitionerId = id;
  const pracSelect = document.getElementById('book-practitioner-id');
  if (pracSelect) pracSelect.value = id;
  navigate('agenda');
}

// ----------------------------------------------------------------------------
// B. Practitioners & Doctors Management Subtab (Grades, Multi-Specialties & Departments)
// ----------------------------------------------------------------------------
function renderAgendaPractitionersContent(practitioners, specialties, departments, fr) {
  const total = practitioners.length;
  const gpCount = practitioners.filter(p => p.is_general_practitioner).length;
  const specialistsCount = practitioners.filter(p => !p.is_general_practitioner && Array.isArray(p.specialties) && p.specialties.length > 0).length;
  const activeCount = practitioners.filter(p => p.is_active !== false).length;

  return `
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:15px; margin-bottom:20px;">
      <div class="card" style="padding:15px; background:var(--bg-surface);">
        <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Total Corps Médical</div>
        <div style="font-size:1.6rem; font-weight:800; color:var(--primary); margin-top:5px;">${total}</div>
      </div>
      <div class="card" style="padding:15px; background:var(--bg-surface);">
        <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Médecins Spécialistes</div>
        <div style="font-size:1.6rem; font-weight:800; color:#8b5cf6; margin-top:5px;">${specialistsCount}</div>
      </div>
      <div class="card" style="padding:15px; background:var(--bg-surface);">
        <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Médecins Généralistes</div>
        <div style="font-size:1.6rem; font-weight:800; color:var(--success); margin-top:5px;">${gpCount}</div>
      </div>
      <div class="card" style="padding:15px; background:var(--bg-surface);">
        <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Praticiens Actifs</div>
        <div style="font-size:1.6rem; font-weight:800; color:var(--accent); margin-top:5px;">${activeCount}</div>
      </div>
    </div>

    <div class="card">
      <div class="card-title" style="display:flex; justify-content:space-between; align-items:center;">
        <span><i class="fas fa-user-md"></i> Registre des Médecins & Praticiens</span>
        <button class="btn btn-primary btn-sm" onclick="openCreatePractitionerModal()">
          <i class="fas fa-plus"></i> Nouveau Praticien
        </button>
      </div>

      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Praticien</th>
              <th>Grade Académique / Titre</th>
              <th>Spécialités</th>
              <th>Services Hospitaliers</th>
              <th>Statut</th>
              <th>Contact & N° Ordre</th>
              <th>Tarif Consultation</th>
              <th>Disponibilité</th>
              <th style="text-align:right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${practitioners.length === 0 ? `
              <tr>
                <td colspan="9" style="text-align:center; padding:35px; color:var(--text-muted);">
                  Aucun praticien enregistré pour cette clinique.
                </td>
              </tr>
            ` : practitioners.map(p => {
              const docSpecialties = Array.isArray(p.specialties) ? p.specialties : [];
              const specialtyBadges = p.is_general_practitioner
                ? '<span class="badge" style="background:#10b981; color:#fff; font-size:0.75rem; padding:3px 8px; border-radius:4px;"><i class="fas fa-stethoscope"></i> Médecin Généraliste</span>'
                : (docSpecialties.length > 0
                    ? docSpecialties.map(s => `<span class="badge" style="background:${s.color_code || '#4a90e2'}; color:#fff; font-size:0.75rem; padding:3px 8px; border-radius:4px; margin-right:4px; margin-bottom:3px; display:inline-block;">${s.name}</span>`).join('')
                    : `<span class="badge" style="background:#64748b; color:#fff; font-size:0.75rem; padding:3px 8px;">${p.specialty_name || 'Médecine Générale'}</span>`
                  );

              const docDepts = Array.isArray(p.departments) ? p.departments : [];
              const deptBadges = docDepts.length > 0
                ? docDepts.map(d => `
                    <div style="margin-bottom:3px;">
                      <span class="badge" style="background:${d.color_code || '#4a90e2'}; color:#fff; font-size:0.75rem; padding:3px 7px; border-radius:4px;">
                        <i class="fas fa-hospital-alt"></i> ${d.name}
                      </span>
                      ${d.role_in_department ? `<span style="font-size:0.75rem; color:var(--text-muted); margin-left:4px;">(${d.role_in_department})</span>` : ''}
                    </div>
                  `).join('')
                : '<span style="color:var(--text-muted); font-size:0.8rem;">Non assigné</span>';

              let gradeBadgeColor = '#3b82f6';
              if ((p.grade || '').toLowerCase().includes('professeur')) gradeBadgeColor = '#8b5cf6';
              else if ((p.grade || '').toLowerCase().includes('assistant')) gradeBadgeColor = '#06b6d4';
              else if ((p.grade || '').toLowerCase().includes('interne')) gradeBadgeColor = '#f59e0b';

              return `
                <tr style="opacity: ${p.is_active ? 1 : 0.6}">
                  <td>
                    <div style="display:flex; align-items:center; gap:10px;">
                      <div style="width:38px; height:38px; border-radius:50%; background:${p.color_code || '#4a90e2'}; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.85rem; border:2px solid #fff; box-shadow:0 2px 5px rgba(0,0,0,0.1);">
                        ${(p.first_name || 'D')[0]}${(p.last_name || 'R')[0]}
                      </div>
                      <div>
                        <strong style="color:var(--text-primary); font-size:0.95rem;">${p.title || 'Dr.'} ${p.first_name} ${p.last_name}</strong>
                        ${p.license_number ? `<div style="font-size:0.75rem; color:var(--text-muted);">Ordre : <code>${p.license_number}</code></div>` : ''}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="badge" style="background:${gradeBadgeColor}; color:#fff; font-size:0.75rem; padding:4px 8px; border-radius:4px; font-weight:600;">
                      ${p.grade || 'Docteur en Médecine'}
                    </span>
                  </td>
                  <td>
                    <div style="max-width:220px;">${specialtyBadges}</div>
                  </td>
                  <td>
                    <div style="max-width:240px;">${deptBadges}</div>
                  </td>
                  <td>
                    <span class="status-badge ${p.status === 'Interne' ? 'interne' : 'externe'}">
                      ${p.status || 'Interne'}
                    </span>
                  </td>
                  <td>
                    ${p.phone_number ? `<div style="font-size:0.85rem;"><i class="fas fa-phone" style="color:var(--primary); width:14px;"></i> ${p.phone_number}</div>` : ''}
                    ${p.email ? `<div style="font-size:0.8rem; color:var(--text-muted);"><i class="fas fa-envelope" style="width:14px;"></i> ${p.email}</div>` : ''}
                    ${!p.phone_number && !p.email ? '<span style="color:var(--text-muted); font-size:0.85rem;">-</span>' : ''}
                  </td>
                  <td>
                    <strong style="color:var(--text-primary); font-size:0.95rem;">${parseFloat(p.consultation_fee || 15000).toLocaleString()} FCFA</strong>
                  </td>
                  <td>
                    <span class="badge ${p.is_active ? 'badge-success' : 'badge-danger'}" style="background-color:${p.is_active ? 'var(--success)' : 'var(--danger)'}; color:white; padding:4px 8px; border-radius:4px; font-size:0.75rem; font-weight:600;">
                      ${p.is_active ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td style="text-align:right;">
                    <button class="btn btn-secondary btn-sm" onclick="openEditPractitionerModal('${p.id}')" style="padding:4px 8px; margin-right:4px;" title="Modifier">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="togglePractitionerStatus('${p.id}', ${p.is_active})" style="padding:4px 8px; margin-right:4px;" title="${p.is_active ? 'Désactiver' : 'Activer'}">
                      <i class="fas ${p.is_active ? 'fa-eye-slash' : 'fa-eye'}"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deletePractitionerConfirm('${p.id}', '${(p.first_name + ' ' + p.last_name).replace(/'/g, "\\'")}')" style="padding:4px 8px; background-color:var(--danger); border-color:var(--danger);" title="Supprimer">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// C. Medical Departments (Services Hospitaliers) Subtab (CRUD)
// ----------------------------------------------------------------------------
function renderAgendaDepartmentsContent(departments, specialties, practitioners, fr) {
  const total = departments.length;
  const activeCount = departments.filter(d => d.is_active !== false).length;
  const headsCount = departments.filter(d => d.head_practitioner_id).length;

  return `
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:15px; margin-bottom:20px;">
      <div class="card" style="padding:15px; background:var(--bg-surface);">
        <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Total Services Cliniques</div>
        <div style="font-size:1.6rem; font-weight:800; color:var(--primary); margin-top:5px;">${total}</div>
      </div>
      <div class="card" style="padding:15px; background:var(--bg-surface);">
        <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Services Actifs</div>
        <div style="font-size:1.6rem; font-weight:800; color:var(--success); margin-top:5px;">${activeCount}</div>
      </div>
      <div class="card" style="padding:15px; background:var(--bg-surface);">
        <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Chefs de Service Nommés</div>
        <div style="font-size:1.6rem; font-weight:800; color:#8b5cf6; margin-top:5px;">${headsCount}</div>
      </div>
    </div>

    <div class="card">
      <div class="card-title" style="display:flex; justify-content:space-between; align-items:center;">
        <span><i class="fas fa-hospital-user"></i> Organigramme des Services Médicaux & Départements</span>
        <button class="btn btn-primary btn-sm" onclick="openCreateDepartmentModal()">
          <i class="fas fa-plus"></i> Nouveau Service Hospitalier
        </button>
      </div>

      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Service Hospitalier</th>
              <th>Code / Réf</th>
              <th>Spécialité Principale</th>
              <th>Chef de Service</th>
              <th>Praticiens Rattachés</th>
              <th>Localisation</th>
              <th>Statut</th>
              <th style="text-align:right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${departments.length === 0 ? `
              <tr>
                <td colspan="8" style="text-align:center; padding:35px; color:var(--text-muted);">
                  Aucun service hospitalier enregistré.
                </td>
              </tr>
            ` : departments.map(d => {
              const deptPracs = Array.isArray(d.practitioners) ? d.practitioners : [];
              const pracsList = deptPracs.length > 0
                ? deptPracs.map(p => `
                    <span class="badge" style="background:var(--bg-surface); color:var(--text-primary); border:1px solid var(--border-color); font-size:0.75rem; padding:2px 6px; margin:2px; display:inline-flex; align-items:center; gap:4px;">
                      <span class="color-dot" style="background:${p.color_code || '#4a90e2'}; width:8px; height:8px; border-radius:50%;"></span>
                      ${p.title || 'Dr.'} ${p.last_name} ${p.role_in_department === 'Chef de Service' ? '⭐' : ''}
                    </span>
                  `).join('')
                : '<span style="color:var(--text-muted); font-size:0.8rem;">Aucun praticien</span>';

              return `
                <tr style="opacity: ${d.is_active ? 1 : 0.6}">
                  <td>
                    <div style="display:flex; align-items:center; gap:8px;">
                      <span class="color-dot" style="background:${d.color_code || '#4a90e2'}; width:12px; height:12px; border-radius:50%;"></span>
                      <div>
                        <strong style="color:var(--text-primary); font-size:0.95rem;">${d.name}</strong>
                        ${d.description ? `<div style="font-size:0.75rem; color:var(--text-muted);">${d.description}</div>` : ''}
                      </div>
                    </div>
                  </td>
                  <td><code style="font-weight:700; color:var(--primary); font-size:0.85rem;">${d.code}</code></td>
                  <td>
                    ${d.specialty_name ? `
                      <span class="badge" style="background:${d.specialty_color || '#4a90e2'}; color:#fff; font-size:0.75rem; padding:3px 8px; border-radius:4px; font-weight:600;">
                        <i class="fas fa-stethoscope"></i> ${d.specialty_name}
                      </span>
                    ` : '<span style="color:var(--text-muted); font-size:0.8rem;">Non affiliée</span>'}
                  </td>
                  <td>
                    ${d.head_first_name ? `
                      <div style="font-size:0.88rem; font-weight:600; color:var(--text-primary);">
                        <i class="fas fa-star" style="color:#f59e0b; font-size:0.75rem;"></i> ${d.head_title || 'Dr.'} ${d.head_first_name} ${d.head_last_name}
                      </div>
                      <div style="font-size:0.72rem; color:var(--text-muted);">${d.head_grade || 'Docteur'}</div>
                    ` : '<span style="color:var(--text-muted); font-size:0.8rem; font-style:italic;">Non désigné</span>'}
                  </td>
                  <td>
                    <div style="max-width:280px;">${pracsList}</div>
                  </td>
                  <td>
                    <span style="font-size:0.85rem; color:var(--text-primary);">
                      <i class="fas fa-map-marker-alt" style="color:var(--primary); font-size:0.8rem;"></i> ${d.location || d.building_name || 'Clinique'}
                    </span>
                  </td>
                  <td>
                    <span class="badge ${d.is_active ? 'badge-success' : 'badge-danger'}" style="background-color:${d.is_active ? 'var(--success)' : 'var(--danger)'}; color:white; padding:4px 8px; border-radius:4px; font-size:0.75rem; font-weight:600;">
                      ${d.is_active ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td style="text-align:right;">
                    <button class="btn btn-secondary btn-sm" onclick="openEditDepartmentModal('${d.id}')" style="padding:4px 8px; margin-right:4px;" title="Modifier">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteDepartmentConfirm('${d.id}', '${d.name.replace(/'/g, "\\'")}')" style="padding:4px 8px; background-color:var(--danger); border-color:var(--danger);" title="Supprimer">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// D. Medical Specialties Management Subtab (CRUD)
// ----------------------------------------------------------------------------
function renderAgendaSpecialtiesContent(specialties, fr) {
  const total = specialties.length;
  const activeCount = specialties.filter(s => s.is_active !== false).length;

  return `
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:15px; margin-bottom:20px;">
      <div class="card" style="padding:15px; background:var(--bg-surface);">
        <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Total Spécialités Médicales</div>
        <div style="font-size:1.6rem; font-weight:800; color:var(--primary); margin-top:5px;">${total}</div>
      </div>
      <div class="card" style="padding:15px; background:var(--bg-surface);">
        <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Spécialités Actives</div>
        <div style="font-size:1.6rem; font-weight:800; color:var(--success); margin-top:5px;">${activeCount}</div>
      </div>
    </div>

    <div class="card">
      <div class="card-title" style="display:flex; justify-content:space-between; align-items:center;">
        <span><i class="fas fa-stethoscope"></i> Référentiel des Spécialités Médicales</span>
        <button class="btn btn-primary btn-sm" onclick="openCreateSpecialtyModal()">
          <i class="fas fa-plus"></i> Nouvelle Spécialité
        </button>
      </div>

      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Spécialité</th>
              <th>Spécialité Médicale</th>
              <th>Code / Sigle</th>
              <th>Durée RDV</th>
              <th>Description / Champ d'intervention</th>
              <th>Couleur</th>
              <th>Praticiens Rattachés</th>
              <th>Services Cliniques</th>
              <th>Statut</th>
              <th style="text-align:right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${specialties.length === 0 ? `
              <tr>
                <td colspan="9" style="text-align:center; padding:35px; color:var(--text-muted);">
                  Aucune spécialité médicale enregistrée.
                </td>
              </tr>
            ` : specialties.map(s => `
              <tr style="opacity: ${s.is_active ? 1 : 0.6}">
                <td>
                  <strong style="color:var(--text-primary); font-size:0.95rem;">${s.name}</strong>
                </td>
                <td><code style="font-weight:700; color:var(--primary); font-size:0.85rem;">${s.code}</code></td>
                <td>
                  <span class="badge" style="background:#eff6ff; color:#1d4ed8; border:1px solid #bfdbfe; font-size:0.85rem; font-weight:700;">
                    <i class="fas fa-stopwatch"></i> ${s.default_duration_minutes || 15} min
                  </span>
                </td>
                <td>
                  <div style="font-size:0.85rem; color:var(--text-muted); max-width:280px;">${s.description || '-'}</div>
                </td>
                <td>
                  <span class="badge" style="background:${s.color_code || '#4a90e2'}; color:#fff; font-size:0.75rem; padding:4px 10px; border-radius:12px; font-weight:600;">
                    ${s.color_code || '#4a90e2'}
                  </span>
                </td>
                <td>
                  <span class="badge" style="background:var(--bg-surface); color:var(--text-primary); border:1px solid var(--border-color); font-size:0.85rem; font-weight:700;">
                    <i class="fas fa-user-md" style="color:var(--primary);"></i> ${s.practitioners_count || 0}
                  </span>
                </td>
                <td>
                  <span class="badge" style="background:var(--bg-surface); color:var(--text-primary); border:1px solid var(--border-color); font-size:0.85rem; font-weight:700;">
                    <i class="fas fa-hospital-alt" style="color:#8b5cf6;"></i> ${s.departments_count || 0}
                  </span>
                </td>
                <td>
                  <span class="badge ${s.is_active ? 'badge-success' : 'badge-danger'}" style="background-color:${s.is_active ? 'var(--success)' : 'var(--danger)'}; color:white; padding:4px 8px; border-radius:4px; font-size:0.75rem; font-weight:600;">
                    ${s.is_active ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td style="text-align:right;">
                  <button class="btn btn-secondary btn-sm" onclick="openEditSpecialtyModal('${s.id}')" style="padding:4px 8px; margin-right:4px;" title="Modifier">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-danger btn-sm" onclick="deleteSpecialtyConfirm('${s.id}', '${s.name.replace(/'/g, "\\'")}')" style="padding:4px 8px; background-color:var(--danger); border-color:var(--danger);" title="Supprimer">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// E. Modal Handlers for Departments (Services Hospitaliers)
// ----------------------------------------------------------------------------
function openCreateDepartmentModal() {
  const modal = document.getElementById('department-modal');
  if (!modal) return;
  modal.style.display = 'flex';

  try {
    const form = document.getElementById('department-form');
    if (form) form.reset();

    const idEl = document.getElementById('department-form-id');
    if (idEl) idEl.value = '';
    const titleEl = document.getElementById('department-modal-title');
    if (titleEl) titleEl.innerText = 'Ajouter un Service Hospitalier';
    const colorEl = document.getElementById('department-color');
    if (colorEl) colorEl.value = '#4a90e2';
    const activeEl = document.getElementById('department-active');
    if (activeEl) activeEl.checked = true;

    // Populate specialty select
    const specSelect = document.getElementById('department-specialty-id');
    if (specSelect) {
      specSelect.innerHTML = '<option value="">-- Aucune Spécialité liée --</option>' +
        (currentAgendaSpecialties || []).map(s => `<option value="${s.id}">${s.name} (${s.code})</option>`).join('');
    }

    // Populate head practitioner select
    const headSelect = document.getElementById('department-head-id');
    if (headSelect) {
      headSelect.innerHTML = '<option value="">-- Sélectionner Chef de Service --</option>' +
        (currentAgendaPractitioners || []).map(p => `<option value="${p.id}">${p.title || 'Dr.'} ${p.first_name} ${p.last_name} (${p.grade || 'Docteur'})</option>`).join('');
    }

    // Populate attached practitioners checkboxes
    renderDepartmentPractitionersCheckboxes([]);
  } catch (err) {
    console.error('Error initializing department modal:', err);
  }

  // Background refresh if lists are empty
  if (!Array.isArray(currentAgendaSpecialties) || currentAgendaSpecialties.length === 0) {
    api.request('/specialties').then(specs => {
      currentAgendaSpecialties = specs || [];
      if (specSelect) {
        specSelect.innerHTML = '<option value="">-- Aucune Spécialité liée --</option>' +
          (currentAgendaSpecialties || []).map(s => `<option value="${s.id}">${s.name} (${s.code})</option>`).join('');
      }
    }).catch(() => {});
  }
  if (!Array.isArray(currentAgendaPractitioners) || currentAgendaPractitioners.length === 0) {
    api.request('/practitioners').then(pracs => {
      currentAgendaPractitioners = pracs || [];
      if (headSelect) {
        headSelect.innerHTML = '<option value="">-- Sélectionner Chef de Service --</option>' +
          (currentAgendaPractitioners || []).map(p => `<option value="${p.id}">${p.title || 'Dr.'} ${p.first_name} ${p.last_name} (${p.grade || 'Docteur'})</option>`).join('');
      }
      renderDepartmentPractitionersCheckboxes([]);
    }).catch(() => {});
  }
}

function openEditDepartmentModal(id) {
  const modal = document.getElementById('department-modal');
  if (!modal) return;

  const dept = (Array.isArray(currentAgendaDepartments) ? currentAgendaDepartments : []).find(d => d.id === id);
  if (!dept) return;

  const idEl = document.getElementById('department-form-id');
  if (idEl) idEl.value = dept.id;
  const codeEl = document.getElementById('department-code');
  if (codeEl) codeEl.value = dept.code || '';
  const nameEl = document.getElementById('department-name');
  if (nameEl) nameEl.value = dept.name || '';
  const locEl = document.getElementById('department-location');
  if (locEl) locEl.value = dept.location || '';
  const descEl = document.getElementById('department-description');
  if (descEl) descEl.value = dept.description || '';
  const colEl = document.getElementById('department-color');
  if (colEl) colEl.value = dept.color_code || '#4a90e2';
  const actEl = document.getElementById('department-active');
  if (actEl) actEl.checked = dept.is_active !== false;

  const specSelect = document.getElementById('department-specialty-id');
  if (specSelect) {
    specSelect.innerHTML = '<option value="">-- Aucune Spécialité liée --</option>' +
      (currentAgendaSpecialties || []).map(s => `<option value="${s.id}" ${dept.specialty_id === s.id ? 'selected' : ''}>${s.name} (${s.code})</option>`).join('');
  }

  const headSelect = document.getElementById('department-head-id');
  if (headSelect) {
    headSelect.innerHTML = '<option value="">-- Sélectionner Chef de Service --</option>' +
      (currentAgendaPractitioners || []).map(p => `<option value="${p.id}" ${dept.head_practitioner_id === p.id ? 'selected' : ''}>${p.title || 'Dr.'} ${p.first_name} ${p.last_name} (${p.grade || 'Docteur'})</option>`).join('');
  }

  const currentPracIds = Array.isArray(dept.practitioner_ids) ? dept.practitioner_ids.filter(Boolean) : [];
  renderDepartmentPractitionersCheckboxes(currentPracIds);

  const titleEl = document.getElementById('department-modal-title');
  if (titleEl) titleEl.innerText = `Modifier : ${dept.name}`;

  modal.style.display = 'flex';
}

function closeDepartmentModal() {
  const modal = document.getElementById('department-modal');
  if (modal) modal.style.display = 'none';
}

function renderDepartmentPractitionersCheckboxes(selectedIds = []) {
  const container = document.getElementById('department-practitioners-container');
  if (!container) return;

  const selSet = new Set(selectedIds);
  const list = Array.isArray(currentAgendaPractitioners) ? currentAgendaPractitioners : [];

  if (list.length === 0) {
    container.innerHTML = '<span style="color:var(--text-muted); font-size:0.8rem; font-style:italic;">Aucun praticien enregistré.</span>';
    return;
  }

  container.innerHTML = list.map(p => `
    <label style="display:flex; align-items:center; gap:8px; background:var(--bg-surface); padding:6px 12px; border-radius:8px; border:1px solid var(--border-color); cursor:pointer; font-size:0.85rem;">
      <input type="checkbox" name="department_practitioners" value="${p.id}" ${selSet.has(p.id) ? 'checked' : ''} style="width:16px; height:16px;" />
      <span class="color-dot" style="background:${p.color_code || '#4a90e2'}; width:10px; height:10px; border-radius:50%;"></span>
      <span>${p.title || 'Dr.'} ${p.first_name} ${p.last_name} <span style="font-size:0.75rem; color:var(--text-muted);">(${p.grade || 'Docteur'})</span></span>
    </label>
  `).join('');
}

async function submitDepartmentForm(e) {
  e.preventDefault();
  const id = document.getElementById('department-form-id').value;
  const code = document.getElementById('department-code').value.trim();
  const name = document.getElementById('department-name').value.trim();
  const specialty_id = document.getElementById('department-specialty-id').value || null;
  const head_practitioner_id = document.getElementById('department-head-id').value || null;
  const location = document.getElementById('department-location').value.trim();
  const description = document.getElementById('department-description').value.trim();
  const color_code = document.getElementById('department-color').value;
  const is_active = document.getElementById('department-active').checked;

  const checkedBoxes = document.querySelectorAll('input[name="department_practitioners"]:checked');
  const practitioner_ids = Array.from(checkedBoxes).map(cb => cb.value);

  const payload = {
    code,
    name,
    specialty_id,
    head_practitioner_id,
    location,
    description,
    color_code,
    is_active,
    practitioner_ids
  };

  try {
    if (id) {
      await api.request(`/departments/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      showToast('Service hospitalier mis à jour avec succès!');
    } else {
      await api.request('/departments', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      showToast('Nouveau service hospitalier créé avec succès!');
    }
    closeDepartmentModal();
    navigate(state.currentTab === 'agenda' ? 'agenda' : 'structure');
  } catch (err) {}
}

async function deleteDepartmentConfirm(id, name) {
  if (!confirm(`Êtes-vous sûr de vouloir supprimer le service "${name}" ?`)) return;

  try {
    const res = await api.request(`/departments/${id}`, { method: 'DELETE' });
    showToast(res.message || 'Service supprimé !');
    navigate(state.currentTab === 'agenda' ? 'agenda' : 'structure');
  } catch (err) {}
}

// ----------------------------------------------------------------------------
// F. Modal Handlers for Specialties
// ----------------------------------------------------------------------------
async function openCreateSpecialtyModal() {
  const modal = document.getElementById('specialty-modal');
  if (!modal) return;
  modal.style.display = 'flex';

  const form = document.getElementById('specialty-form');
  if (form) form.reset();

  const idEl = document.getElementById('specialty-form-id');
  if (idEl) idEl.value = '';
  const titleEl = document.getElementById('specialty-modal-title');
  if (titleEl) titleEl.innerText = 'Ajouter une Spécialité Médicale';
  const durEl = document.getElementById('specialty-duration');
  if (durEl) durEl.value = '15';
  const colEl = document.getElementById('specialty-color');
  if (colEl) colEl.value = '#4a90e2';
  const actEl = document.getElementById('specialty-active');
  if (actEl) actEl.checked = true;
}

async function openEditSpecialtyModal(id) {
  const modal = document.getElementById('specialty-modal');
  if (!modal) return;

  let spec = (Array.isArray(currentAgendaSpecialties) ? currentAgendaSpecialties : []).find(s => s.id === id);
  if (!spec) {
    try {
      const specs = await api.request('/specialties');
      currentAgendaSpecialties = specs || [];
      spec = currentAgendaSpecialties.find(s => s.id === id);
    } catch (e) {}
  }
  if (!spec) {
    showToast('Spécialité introuvable', 'error');
    return;
  }

  const idEl = document.getElementById('specialty-form-id');
  if (idEl) idEl.value = spec.id;
  const codeEl = document.getElementById('specialty-code');
  if (codeEl) codeEl.value = spec.code || '';
  const nameEl = document.getElementById('specialty-name');
  if (nameEl) nameEl.value = spec.name || '';
  const descEl = document.getElementById('specialty-description');
  if (descEl) descEl.value = spec.description || '';
  const durEl = document.getElementById('specialty-duration');
  if (durEl) durEl.value = spec.default_duration_minutes || 15;
  const colEl = document.getElementById('specialty-color');
  if (colEl) colEl.value = spec.color_code || '#4a90e2';
  const actEl = document.getElementById('specialty-active');
  if (actEl) actEl.checked = spec.is_active !== false;

  const titleEl = document.getElementById('specialty-modal-title');
  if (titleEl) titleEl.innerText = `Modifier : ${spec.name}`;

  modal.style.display = 'flex';
}

function closeSpecialtyModal() {
  const modal = document.getElementById('specialty-modal');
  if (modal) modal.style.display = 'none';
}

async function submitSpecialtyForm(e) {
  e.preventDefault();
  const id = document.getElementById('specialty-form-id').value;
  const code = document.getElementById('specialty-code').value.trim();
  const name = document.getElementById('specialty-name').value.trim();
  const description = document.getElementById('specialty-description').value.trim();
  const default_duration_minutes = parseInt(document.getElementById('specialty-duration').value) || 15;
  const color_code = document.getElementById('specialty-color').value;
  const is_active = document.getElementById('specialty-active').checked;

  const payload = { code, name, description, default_duration_minutes, color_code, is_active };

  try {
    if (id) {
      await api.request(`/specialties/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      showToast('Spécialité mise à jour avec succès!');
    } else {
      await api.request('/specialties', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      showToast('Nouvelle spécialité créée avec succès!');
    }
    closeSpecialtyModal();
    navigate(state.currentTab === 'agenda' ? 'agenda' : 'structure');
  } catch (err) {}
}

// ----------------------------------------------------------------------------
// G. Doctor Unavailabilities Modal & Actions
// ----------------------------------------------------------------------------
function openUnavailabilityModal(defaultPractitionerId = null) {
  const modal = document.getElementById('unavailability-modal');
  if (!modal) return;

  const sel = document.getElementById('unavail-practitioner-id');
  if (sel) {
    const list = Array.isArray(currentAgendaPractitioners) ? currentAgendaPractitioners : [];
    if (list.length === 0) {
      sel.innerHTML = '<option value="">-- Chargement des praticiens... --</option>';
    } else {
      sel.innerHTML = list.map(p => `
        <option value="${p.id}" ${defaultPractitionerId === p.id ? 'selected' : ''}>
          ${p.title || 'Dr.'} ${p.first_name} ${p.last_name} (${p.grade || 'Médecin'})
        </option>
      `).join('');
    }
  }

  const today = getTodayDateStr ? getTodayDateStr() : new Date().toISOString().split('T')[0];
  const startEl = document.getElementById('unavail-start');
  if (startEl) startEl.value = `${today}T08:00`;
  const endEl = document.getElementById('unavail-end');
  if (endEl) endEl.value = `${today}T18:00`;
  const reasonEl = document.getElementById('unavail-reason');
  if (reasonEl) reasonEl.value = 'Congé / Indisponibilité';
  const allDayEl = document.getElementById('unavail-all-day');
  if (allDayEl) allDayEl.checked = true;

  modal.style.display = 'flex';

  if (!Array.isArray(currentAgendaPractitioners) || currentAgendaPractitioners.length === 0) {
    api.request('/practitioners').then(pracs => {
      currentAgendaPractitioners = pracs || [];
      if (sel) {
        sel.innerHTML = (currentAgendaPractitioners || []).map(p => `
          <option value="${p.id}" ${defaultPractitionerId === p.id ? 'selected' : ''}>
            ${p.title || 'Dr.'} ${p.first_name} ${p.last_name} (${p.grade || 'Médecin'})
          </option>
        `).join('');
      }
    }).catch(() => {});
  }
}

function closeUnavailabilityModal() {
  const modal = document.getElementById('unavailability-modal');
  if (modal) modal.style.display = 'none';
}

async function submitUnavailabilityForm(e) {
  e.preventDefault();
  const practitioner_id = document.getElementById('unavail-practitioner-id').value;
  const start_time = document.getElementById('unavail-start').value;
  const end_time = document.getElementById('unavail-end').value;
  const reason = document.getElementById('unavail-reason').value.trim();
  const all_day = document.getElementById('unavail-all-day').checked;

  try {
    await api.request('/practitioners-unavailabilities', {
      method: 'POST',
      body: JSON.stringify({
        practitioner_id,
        start_time,
        end_time,
        reason,
        all_day
      })
    });
    showToast('Indisponibilité enregistrée avec succès ! Les créneaux correspondants sont désormais bloqués.', 'success');
    closeUnavailabilityModal();
    navigate('agenda');
  } catch (err) {
    showToast('Erreur: ' + err.message, 'danger');
  }
}

async function deleteSpecialtyConfirm(id, name) {
  if (!confirm(`Êtes-vous sûr de vouloir supprimer la spécialité "${name}" ?`)) return;

  try {
    const res = await api.request(`/specialties/${id}`, { method: 'DELETE' });
    showToast(res.message || 'Spécialité supprimée !');
    navigate(state.currentTab === 'agenda' ? 'agenda' : 'structure');
  } catch (err) {}
}

// ----------------------------------------------------------------------------
// G. Modal Handlers for Practitioners
// ----------------------------------------------------------------------------
function openCreatePractitionerModal() {
  const modal = document.getElementById('practitioner-modal');
  if (!modal) {
    console.error('Modal #practitioner-modal not found');
    return;
  }
  modal.style.display = 'flex';

  try {
    const form = document.getElementById('practitioner-form');
    if (form) form.reset();

    const idEl = document.getElementById('practitioner-form-id');
    if (idEl) idEl.value = '';
    const titleEl = document.getElementById('practitioner-modal-title');
    if (titleEl) titleEl.innerText = 'Ajouter un Nouveau Praticien / Médecin';
    const colorEl = document.getElementById('practitioner-color');
    if (colorEl) colorEl.value = '#0d3b66';
    const feeEl = document.getElementById('practitioner-fee');
    if (feeEl) feeEl.value = '15000';
    const gpEl = document.getElementById('practitioner-is-gp');
    if (gpEl) gpEl.checked = false;
    const activeEl = document.getElementById('practitioner-active');
    if (activeEl) activeEl.checked = true;

    // Immediate rendering of options
    renderSpecialtiesCheckboxes([]);
    renderPractitionerDepartmentsCheckboxes([]);
    toggleGPFields();
  } catch (err) {
    console.error('Error initializing practitioner modal:', err);
  }

  // Background refresh if needed
  if (!Array.isArray(currentAgendaSpecialties) || currentAgendaSpecialties.length === 0) {
    api.request('/specialties').then(specs => {
      currentAgendaSpecialties = specs || [];
      renderSpecialtiesCheckboxes([]);
    }).catch(() => {});
  }
  if (!Array.isArray(currentAgendaDepartments) || currentAgendaDepartments.length === 0) {
    api.request('/departments').then(depts => {
      currentAgendaDepartments = depts || [];
      renderPractitionerDepartmentsCheckboxes([]);
    }).catch(() => {});
  }
}

function openEditPractitionerModal(id) {
  const modal = document.getElementById('practitioner-modal');
  if (!modal) return;

  const prac = (Array.isArray(currentAgendaPractitioners) ? currentAgendaPractitioners : []).find(p => p.id === id);
  if (!prac) {
    showToast('Praticien introuvable', 'error');
    return;
  }

  const idEl = document.getElementById('practitioner-form-id');
  if (idEl) idEl.value = prac.id;
  const titleEl = document.getElementById('practitioner-title');
  if (titleEl) titleEl.value = prac.title || 'Dr.';
  const firstEl = document.getElementById('practitioner-first');
  if (firstEl) firstEl.value = prac.first_name || '';
  const lastEl = document.getElementById('practitioner-last');
  if (lastEl) lastEl.value = prac.last_name || '';
  const gradeEl = document.getElementById('practitioner-grade');
  if (gradeEl) gradeEl.value = prac.grade || 'Docteur en Médecine';
  const phoneEl = document.getElementById('practitioner-phone');
  if (phoneEl) phoneEl.value = prac.phone_number || '';
  const emailEl = document.getElementById('practitioner-email');
  if (emailEl) emailEl.value = prac.email || '';
  const licEl = document.getElementById('practitioner-license');
  if (licEl) licEl.value = prac.license_number || '';
  const statusEl = document.getElementById('practitioner-status');
  if (statusEl) statusEl.value = prac.status || 'Interne';
  const colorEl = document.getElementById('practitioner-color');
  if (colorEl) colorEl.value = prac.color_code || '#0d3b66';
  const feeEl = document.getElementById('practitioner-fee');
  if (feeEl) feeEl.value = prac.consultation_fee || 15000;
  const gpEl = document.getElementById('practitioner-is-gp');
  if (gpEl) gpEl.checked = Boolean(prac.is_general_practitioner);
  const activeEl = document.getElementById('practitioner-active');
  if (activeEl) activeEl.checked = prac.is_active !== false;

  const currentSpecIds = Array.isArray(prac.specialty_ids) ? prac.specialty_ids.filter(Boolean) : [];
  renderSpecialtiesCheckboxes(currentSpecIds);

  const currentDeptIds = Array.isArray(prac.department_ids) ? prac.department_ids.filter(Boolean) : [];
  renderPractitionerDepartmentsCheckboxes(currentDeptIds);

  toggleGPFields();

  const modalTitleEl = document.getElementById('practitioner-modal-title');
  if (modalTitleEl) modalTitleEl.innerText = `Modifier : ${prac.title || 'Dr.'} ${prac.first_name} ${prac.last_name}`;

  modal.style.display = 'flex';
}

function closePractitionerModal() {
  const modal = document.getElementById('practitioner-modal');
  if (modal) modal.style.display = 'none';
}

function renderSpecialtiesCheckboxes(selectedIds = []) {
  const container = document.getElementById('practitioner-specialties-container');
  if (!container) return;

  const selSet = new Set(selectedIds);
  const list = (Array.isArray(currentAgendaSpecialties) ? currentAgendaSpecialties : []).filter(s => s && s.is_active !== false);

  if (list.length === 0) {
    container.innerHTML = '<span style="color:var(--text-muted); font-size:0.8rem; font-style:italic;">Aucune spécialité enregistrée. Vous pouvez en créer dans l\'onglet "Spécialités Médicales".</span>';
    return;
  }

  container.innerHTML = list.map(s => `
    <label style="display:flex; align-items:center; gap:8px; background:var(--bg-surface); padding:6px 12px; border-radius:8px; border:1px solid var(--border-color); cursor:pointer; font-size:0.85rem;">
      <input type="checkbox" name="practitioner_specialties" value="${s.id}" ${selSet.has(s.id) ? 'checked' : ''} style="width:16px; height:16px;" />
      <span class="color-dot" style="background:${s.color_code || '#4a90e2'}; width:10px; height:10px; border-radius:50%;"></span>
      <span>${s.name}</span>
    </label>
  `).join('');
}

function renderPractitionerDepartmentsCheckboxes(selectedIds = []) {
  const container = document.getElementById('practitioner-departments-container');
  if (!container) return;

  const selSet = new Set(selectedIds);
  const list = (Array.isArray(currentAgendaDepartments) ? currentAgendaDepartments : []).filter(d => d && d.is_active !== false);

  if (list.length === 0) {
    container.innerHTML = '<span style="color:var(--text-muted); font-size:0.8rem; font-style:italic;">Aucun service hospitalier enregistré. Vous pouvez en créer dans l\'onglet "Services Hospitaliers".</span>';
    return;
  }

  container.innerHTML = list.map(d => `
    <label style="display:flex; align-items:center; gap:8px; background:var(--bg-surface); padding:6px 12px; border-radius:8px; border:1px solid var(--border-color); cursor:pointer; font-size:0.85rem;">
      <input type="checkbox" name="practitioner_departments" value="${d.id}" ${selSet.has(d.id) ? 'checked' : ''} style="width:16px; height:16px;" />
      <span class="color-dot" style="background:${d.color_code || '#4a90e2'}; width:10px; height:10px; border-radius:50%;"></span>
      <span>${d.name} <span style="font-size:0.75rem; color:var(--text-muted);">(${d.code})</span></span>
    </label>
  `).join('');
}

function toggleGPFields() {
  const gpEl = document.getElementById('practitioner-is-gp');
  const isGP = gpEl ? gpEl.checked : false;
  const specBlock = document.getElementById('practitioner-specialties-block');
  if (specBlock) {
    if (isGP) {
      specBlock.style.opacity = '0.5';
    } else {
      specBlock.style.opacity = '1';
    }
  }
}

async function submitPractitionerForm(e) {
  e.preventDefault();
  const id = document.getElementById('practitioner-form-id').value;
  const title = document.getElementById('practitioner-title').value;
  const first_name = document.getElementById('practitioner-first').value.trim();
  const last_name = document.getElementById('practitioner-last').value.trim();
  const grade = document.getElementById('practitioner-grade').value.trim();
  const is_general_practitioner = document.getElementById('practitioner-is-gp').checked;
  const phone_number = document.getElementById('practitioner-phone').value.trim();
  const email = document.getElementById('practitioner-email').value.trim();
  const license_number = document.getElementById('practitioner-license').value.trim();
  const status = document.getElementById('practitioner-status').value;
  const color_code = document.getElementById('practitioner-color').value;
  const consultation_fee = parseFloat(document.getElementById('practitioner-fee').value) || 15000;
  const is_active = document.getElementById('practitioner-active').checked;

  const checkedSpecBoxes = document.querySelectorAll('input[name="practitioner_specialties"]:checked');
  const specialty_ids = Array.from(checkedSpecBoxes).map(cb => cb.value);

  const checkedDeptBoxes = document.querySelectorAll('input[name="practitioner_departments"]:checked');
  const department_ids = Array.from(checkedDeptBoxes).map(cb => cb.value);

  if (!is_general_practitioner && specialty_ids.length === 0) {
    showToast('Veuillez cocher au moins une spécialité médicale ou cocher "Médecin Généraliste"', 'warning');
    return;
  }

  const payload = {
    title,
    first_name,
    last_name,
    grade,
    is_general_practitioner,
    specialty_ids,
    department_ids,
    phone_number,
    email,
    license_number,
    status,
    color_code,
    consultation_fee,
    is_active
  };

  try {
    if (id) {
      await api.request(`/practitioners/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      showToast('Praticien mis à jour avec succès!');
    } else {
      await api.request('/practitioners', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      showToast('Nouveau praticien créé avec succès!');
    }
    closePractitionerModal();
    navigate(state.currentTab === 'agenda' ? 'agenda' : 'structure');
  } catch (err) {}
}

async function togglePractitionerStatus(id, currentActive) {
  try {
    const prac = currentAgendaPractitioners.find(p => p.id === id);
    if (!prac) return;
    await api.request(`/practitioners/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...prac, is_active: !currentActive })
    });
    showToast(`Praticien ${!currentActive ? 'activé' : 'désactivé'} !`);
    navigate(state.currentTab === 'agenda' ? 'agenda' : 'structure');
  } catch (err) {}
}

async function deletePractitionerConfirm(id, name) {
  if (!confirm(`Êtes-vous sûr de vouloir supprimer le praticien "${name}" ?`)) return;

  try {
    const res = await api.request(`/practitioners/${id}`, { method: 'DELETE' });
    showToast(res.message || 'Praticien supprimé !');
    navigate(state.currentTab === 'agenda' ? 'agenda' : 'structure');
  } catch (err) {}
}

window.openCreatePractitionerModal = openCreatePractitionerModal;
window.openEditPractitionerModal = openEditPractitionerModal;
window.closePractitionerModal = closePractitionerModal;
window.submitPractitionerForm = submitPractitionerForm;
window.toggleGPFields = toggleGPFields;

async function bookAppointment(e) {
  e.preventDefault();
  const practitioner_id = document.getElementById('book-practitioner-id').value || activePractitionerId;
  const medical_service_id = document.getElementById('book-service-id').value;
  const start_time = document.getElementById('book-start-time').value;
  const booking_channel = document.getElementById('book-channel').value;
  
  if (!practitioner_id) {
    showToast('Veuillez sélectionner un praticien pour ce rendez-vous', 'warning');
    return;
  }

  let payload = {
    practitioner_id,
    medical_service_id,
    start_time,
    booking_channel
  };

  if (currentBookingPatientType === 'existing') {
    const codeInput = document.getElementById('book-patient-code');
    const firstInput = document.getElementById('book-patient-first');
    const lastInput = document.getElementById('book-patient-last');
    
    const code = codeInput ? codeInput.value.trim() : '';
    const first = firstInput ? firstInput.value.trim() : '';
    const last = lastInput ? lastInput.value.trim() : '';

    if (!code) {
      showToast('Veuillez saisir un Code Patient (ex: SM-4821) ou sélectionner dans la liste', 'warning');
      return;
    }
    payload.patient_code = code;
    payload.first_name = first;
    payload.last_name = last;
    payload.is_new_patient = false;
  } else {
    const firstInput = document.getElementById('book-new-first');
    const lastInput = document.getElementById('book-new-last');
    const phoneInput = document.getElementById('book-new-phone');
    const genderInput = document.getElementById('book-new-gender');
    const dobInput = document.getElementById('book-new-dob');

    const first = firstInput ? firstInput.value.trim() : '';
    const last = lastInput ? lastInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';

    if (!first || !last || !phone) {
      showToast('Prénom, Nom et Téléphone sont obligatoires pour un nouveau patient', 'warning');
      return;
    }

    payload.is_new_patient = true;
    payload.first_name = first;
    payload.last_name = last;
    payload.phone_number = phone;
    payload.gender = genderInput ? genderInput.value : 'AUTRE';
    payload.date_of_birth = dobInput && dobInput.value ? dobInput.value : '1995-01-01';
  }

  try {
    const res = await api.request('/appointments/request-booking', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (res.deposit_required > 0) {
      alert(`✅ ${res.message}\n\n💳 Instructions de règlement :\n- Acompte anti-no-show : 2 000 FCFA\n- Moyens : Wave Sénégal / Orange Money\n- Nouveau Code Patient unique : ${res.patient.patient_code}\n\nCe montant sera déduit de la consultation lors du passage en caisse.`);
    } else {
      showToast(res.message || 'Rendez-vous planifié avec succès !', 'success');
    }
    navigate('agenda');
  } catch (err) {
    showToast(err.message || 'Erreur lors de la réservation', 'error');
  }
}

// ============================================================================
// 3. Patients Registry & DPI UI
// ============================================================================
let activeDPIPatient = null;
let currentPrescriptionItems = [];
let currentDossierData = null;
let activeDPITab = 'summary';
let allPatientStatuses = [];

async function renderPatients(container) {
  const [patients, rawStatuses, practitioners] = await Promise.all([
    api.request('/patients').catch(() => []),
    api.request('/patient-statuses').catch(() => []),
    api.request('/practitioners').catch(() => [])
  ]);

  const patientList = Array.isArray(patients) ? patients : [];
  const statusList = Array.isArray(rawStatuses) ? rawStatuses : [];
  const pracList = Array.isArray(practitioners) ? practitioners : [];

  allPractitionersList = pracList;

  // Ensure strict uniqueness by name
  const statuses = Array.from(new Map(statusList.filter(s => s && s.name).map(s => [s.name.trim().toLowerCase(), s])).values());
  allPatientStatuses = statuses;

  container.innerHTML = `
    <div class="agenda-grid" style="grid-template-columns: 360px 1fr; gap:20px;">
      <div class="card">
        <div class="card-title"><i class="fas fa-user-plus"></i> ${t('regPatient')}</div>
        <form onsubmit="registerPatient(event)">
          <div class="form-group">
            <label class="form-label">${t('firstName')} *</label>
            <input type="text" class="form-control" id="p-first" required />
          </div>
          <div class="form-group">
            <label class="form-label">${t('lastName')} *</label>
            <input type="text" class="form-control" id="p-last" required />
          </div>
          <div class="form-group">
            <label class="form-label">${t('phone')} *</label>
            <input type="text" class="form-control" id="p-phone" required placeholder="+22177..." />
          </div>

          <div class="form-group" style="margin-bottom:12px;">
            <label class="form-label" style="font-weight:700; color:var(--primary);"><i class="fas fa-user-md"></i> Médecin Traitant Référent *</label>
            <select class="form-control" id="p-attending-doc" required style="border:1.5px solid var(--primary);">
              ${pracList.map(doc => `
                <option value="${doc.id}">
                  ${doc.title || 'Dr.'} ${doc.first_name} ${doc.last_name} (${doc.specialty_name || 'Généraliste'})
                </option>
              `).join('')}
            </select>
            <small style="font-size:0.75rem; color:var(--text-muted);">Le dossier médical est placé sous l'autorité de ce médecin.</small>
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
            <div class="form-group">
              <label class="form-label">${t('gender')} *</label>
              <select class="form-control" id="p-gender" required>
                <option value="M">M</option>
                <option value="F">F</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">${t('dob')} *</label>
              <input type="date" class="form-control" id="p-dob" required />
            </div>
          </div>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
            <div class="form-group">
              <label class="form-label">${t('bloodGroup')}</label>
              <input type="text" class="form-control" id="p-blood" placeholder="A+, O-..." />
            </div>
            <div class="form-group">
              <label class="form-label">${t('status')}</label>
              <select class="form-control" id="p-status-id">
                ${statuses.map(s => `<option value="${s.id}" ${s.is_default ? 'selected' : ''}>${s.name}</option>`).join('')}
              </select>
            </div>
          </div>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
            <div class="form-group">
              <label class="form-label">${t('height')} (cm)</label>
              <input type="number" step="0.1" class="form-control" id="p-height" placeholder="175" />
            </div>
            <div class="form-group">
              <label class="form-label">${t('weight')} (kg)</label>
              <input type="number" step="0.1" class="form-control" id="p-weight" placeholder="70" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">${t('allergies')}</label>
            <input type="text" class="form-control" id="p-allergies" placeholder="pollen, pénicilline" />
          </div>
          <div class="form-group">
            <label class="form-label">${t('observations')}</label>
            <textarea class="form-control" id="p-observations" rows="2" placeholder="Observations, antécédents médicaux ou notes utiles..."></textarea>
          </div>
          <button class="btn btn-primary" style="width:100%;"><i class="fas fa-save"></i> ${t('regBtn')}</button>
        </form>
      </div>
      
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
          <div class="card-title" style="margin:0;"><i class="fas fa-users"></i> ${t('patientList')}</div>
          <button class="btn btn-secondary btn-sm" onclick="openPatientStatusModal()">
            <i class="fas fa-tags"></i> Gérer les Statuts
          </button>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>${t('patient')}</th>
                <th>Médecin Traitant</th>
                <th>${t('phone')}</th>
                <th>${t('gender')}</th>
                <th>Naissance</th>
                <th>${t('height')} / ${t('weight')}</th>
                <th>${t('status')}</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${patientList.length === 0 ? '<tr><td colspan="9" style="text-align:center; padding:30px; color:var(--text-muted);">Aucun patient enregistré</td></tr>' : ''}
              ${patientList.map(p => {
                const height = p.height_cm ? parseFloat(p.height_cm) : null;
                const weight = p.weight_kg ? parseFloat(p.weight_kg) : null;
                const imc = (height && weight) ? (weight / Math.pow(height / 100, 2)).toFixed(1) : null;
                const statusName = p.status_name || p.status || 'Externe';
                const statusColor = p.status_color || '#4a90e2';
                const docName = p.doc_first ? `${p.doc_title || 'Dr.'} ${p.doc_first} ${p.doc_last}` : 'Non assigné';
                return `
                <tr>
                  <td><strong>${p.patient_code}</strong></td>
                  <td>
                    <strong>${p.first_name} ${p.last_name}</strong>
                    ${p.blood_group ? `<span class="badge" style="background:#e74c3c; color:white; font-size:0.7rem; padding:1px 5px; border-radius:4px; margin-left:4px;">${p.blood_group}</span>` : ''}
                    ${p.observations ? `<div style="font-size:0.75rem; color:var(--text-muted); max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${p.observations}"><i class="fas fa-sticky-note"></i> ${p.observations}</div>` : ''}
                  </td>
                  <td>
                    <span class="badge" style="background:#eff6ff; color:#1d4ed8; border:1px solid #bfdbfe; font-size:0.78rem; font-weight:600;">
                      <i class="fas fa-user-md"></i> ${docName}
                    </span>
                  </td>
                  <td>${p.phone_number}</td>
                  <td>${p.gender}</td>
                  <td>${new Date(p.date_of_birth).toLocaleDateString()}</td>
                  <td>
                    ${height ? `${height} cm` : '-'} / ${weight ? `${weight} kg` : '-'}
                    ${imc ? `<br><small style="color:var(--primary); font-weight:600;">IMC: ${imc}</small>` : ''}
                  </td>
                  <td>
                    <span class="badge" style="background:${statusColor}; color:white; padding:4px 8px; border-radius:4px; font-weight:600; font-size:0.75rem;">
                      ${statusName}
                    </span>
                  </td>
                  <td>
                    <div style="display:flex; gap:6px; align-items:center;">
                      <button class="btn btn-secondary btn-sm" onclick="openEditPatientModal('${p.id}')" title="Modifier les données du patient" style="padding:5px 9px; font-size:0.8rem; font-weight:600;">
                        <i class="fas fa-edit"></i> Modifier
                      </button>
                      <button class="btn btn-primary btn-sm" onclick="openDPIModal('${p.id}', '${(p.first_name + ' ' + p.last_name).replace(/'/g, "\\'")}')" style="padding:5px 10px; font-size:0.8rem; white-space:nowrap;">
                        <i class="fas fa-folder-open"></i> Dossier 360°
                      </button>
                    </div>
                  </td>
                </tr>
              `;}).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

async function registerPatient(e) {
  e.preventDefault();
  const phone_number = document.getElementById('p-phone').value.trim();
  const first_name = document.getElementById('p-first').value.trim();
  const last_name = document.getElementById('p-last').value.trim();
  const gender = document.getElementById('p-gender').value;
  const date_of_birth = document.getElementById('p-dob').value;
  const blood_group = (document.getElementById('p-blood').value || '').trim() || null;
  const height_cm = (document.getElementById('p-height').value || '').trim() || null;
  const weight_kg = (document.getElementById('p-weight').value || '').trim() || null;
  const observations = (document.getElementById('p-observations').value || '').trim() || null;
  const allergies = document.getElementById('p-allergies').value 
    ? document.getElementById('p-allergies').value.split(',').map(s => s.trim()).filter(Boolean) 
    : [];
  
  const attending_practitioner_id = document.getElementById('p-attending-doc') ? document.getElementById('p-attending-doc').value : null;
  const statusSelect = document.getElementById('p-status-id');
  const status_id = statusSelect && statusSelect.value ? statusSelect.value : null;
  const status = statusSelect && statusSelect.options[statusSelect.selectedIndex] ? statusSelect.options[statusSelect.selectedIndex].text : 'Externe';

  try {
    await api.request('/patients', {
      method: 'POST',
      body: JSON.stringify({
        phone_number, 
        first_name, 
        last_name, 
        gender, 
        date_of_birth, 
        blood_group, 
        height_cm, 
        weight_kg, 
        observations, 
        allergies, 
        status_id,
        status,
        attending_practitioner_id
      })
    });
    showToast('Patient enregistré avec succès !', 'success');
    navigate('patients');
  } catch (err) {
    // Handled by api.request
  }
}

// ============================================================================
// Dossier Médical 360° (DPI Complet)
// ============================================================================
async function openDPIModal(patientId, patientName) {
  const modal = document.getElementById('dpi-modal');
  if (!modal) return;

  activeDPIPatient = { id: patientId, name: patientName };
  activeDPITab = 'summary';
  modal.style.display = 'flex';

  const bodyContainer = document.getElementById('dpi-modal-content');
  if (bodyContainer) {
    bodyContainer.innerHTML = `<div style="text-align:center; padding:40px;"><i class="fas fa-spinner fa-spin fa-2x" style="color:var(--primary);"></i><div style="margin-top:10px;">Chargement du Dossier Médical 360°...</div></div>`;
  }

  try {
    const [dossier, statuses] = await Promise.all([
      api.request(`/patients/${patientId}/dossier`),
      api.request('/patient-statuses').catch(() => [])
    ]);

    currentDossierData = dossier;
    allPatientStatuses = statuses;

    renderDPI360Modal();
  } catch (err) {
    showToast(`Erreur chargement dossier: ${err.message}`, 'error');
    closeDPIModal();
  }
}

function closeDPIModal() {
  const modal = document.getElementById('dpi-modal');
  if (modal) modal.style.display = 'none';
  activeDPIPatient = null;
  currentDossierData = null;
}

function renderDPI360Modal() {
  if (!currentDossierData) return;
  const p = currentDossierData.patient;
  const bodyContainer = document.getElementById('dpi-modal-content');
  if (!bodyContainer) return;

  // 1. Check Confidentiality / Access Restriction
  if (currentDossierData.has_dpi_access === false) {
    const doc = p.attending_doctor || {};
    bodyContainer.innerHTML = `
      <div style="text-align:center; padding:50px 20px;">
        <div style="width:80px; height:80px; border-radius:50%; background:#fef2f2; color:#ef4444; display:flex; align-items:center; justify-content:center; margin:0 auto 20px; font-size:2.2rem; border:2px solid #fecaca;">
          <i class="fas fa-user-lock"></i>
        </div>
        <h3 style="color:#1e293b; font-weight:800; margin-bottom:10px;">Dossier Médical Confidentiel</h3>
        <p style="color:var(--text-muted); max-width:560px; margin:0 auto 24px; font-size:0.95rem; line-height:1.6;">
          Conformément aux règles de confidentialité médicale, le dossier de <strong>${p.first_name} ${p.last_name}</strong> (${p.patient_code}) n'est accessible qu'à son médecin traitant, à l'administrateur de l'établissement ou aux confrères bénéficiant d'une délégation d'accès active.
        </p>

        <div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:12px; padding:20px; max-width:480px; margin:0 auto 25px; text-align:left;">
          <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:700; margin-bottom:8px;">Médecin Traitant Référent :</div>
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:44px; height:44px; border-radius:50%; background:#2563eb; color:white; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:1.1rem;">
              👨‍⚕️
            </div>
            <div>
              <div style="font-weight:700; color:var(--text-primary); font-size:1.05rem;">${doc.name || 'Médecin Référent'}</div>
              <div style="font-size:0.85rem; color:var(--text-muted);">${doc.specialty || 'Médecine Générale'}</div>
            </div>
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap:12px;">
          <button class="btn btn-secondary" onclick="closeDPIModal()">
            <i class="fas fa-arrow-left"></i> Fermer
          </button>
          <button class="btn btn-primary" onclick="showToast('Demande d\\'accès transmise au ' + '${(doc.name || '').replace(/'/g, "\\'")}', 'success')">
            <i class="fas fa-key"></i> Demander une autorisation d'accès
          </button>
        </div>
      </div>
    `;
    return;
  }

  const age = p.date_of_birth ? Math.floor((new Date() - new Date(p.date_of_birth)) / (365.25 * 24 * 60 * 60 * 1000)) : null;
  const docInfo = p.attending_doctor || {};

  bodyContainer.innerHTML = `
    <!-- Patient Profile Header Banner -->
    <div style="background:var(--bg-primary); border:1px solid var(--border-color); border-radius:10px; padding:15px 20px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:15px;">
      <div style="display:flex; align-items:center; gap:15px;">
        <div style="width:50px; height:50px; border-radius:50%; background:var(--primary); color:white; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:1.2rem;">
          ${p.first_name[0]}${p.last_name[0]}
        </div>
        <div>
          <div style="font-size:1.2rem; font-weight:700; color:var(--text-primary); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <span>${p.first_name} ${p.last_name}</span> 
            ${p.blood_group ? `<span class="badge" style="background:#e74c3c; color:white; font-size:0.75rem; vertical-align:middle;">${p.blood_group}</span>` : ''}
            <span class="badge" style="background:#eff6ff; color:#1d4ed8; border:1px solid #bfdbfe; font-size:0.75rem;">
              <i class="fas fa-user-md"></i> Médecin Traitant: ${docInfo.name || 'Dr.'}
            </span>
            ${currentDossierData.access_role === 'DELEGATED_ACCESS' ? `
              <span class="badge" style="background:#f0fdf4; color:#15803d; border:1px solid #bbf7d0; font-size:0.75rem;">
                <i class="fas fa-key"></i> Accès Délégué
              </span>
            ` : ''}
          </div>
          <div style="font-size:0.85rem; color:var(--text-muted); display:flex; gap:15px; margin-top:3px;">
            <span><i class="fas fa-id-card"></i> <strong>${p.patient_code}</strong></span>
            <span><i class="fas fa-phone"></i> ${p.phone_number}</span>
            <span><i class="fas fa-venus-mars"></i> ${p.gender === 'M' ? 'Homme' : 'Femme'}</span>
            <span><i class="fas fa-birthday-cake"></i> ${age ? `${age} ans (${new Date(p.date_of_birth).toLocaleDateString()})` : '-'}</span>
          </div>
        </div>
      </div>
      
      <!-- Direct Status Change, Edit & Delegation Buttons -->
      <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
        <button class="btn btn-secondary btn-sm" onclick="openEditPatientModal('${p.id}', true)" style="font-size:0.8rem; padding:6px 12px; font-weight:600; background:#f1f5f9; border:1px solid #cbd5e1; color:#1e293b;">
          <i class="fas fa-user-edit text-primary"></i> Modifier Fiche
        </button>
        ${currentDossierData.can_delegate ? `
          <button class="btn btn-primary btn-sm" onclick="openAccessGrantsModal('${p.id}', '${(p.first_name + ' ' + p.last_name).replace(/'/g, "\\'")}')" style="font-size:0.8rem; padding:6px 12px; font-weight:700;">
            <i class="fas fa-user-shield"></i> Gérer les Accès & Délégations
          </button>
        ` : ''}
        <div style="display:flex; align-items:center; gap:6px;">
          <label style="font-size:0.85rem; color:var(--text-muted); margin:0;">Statut :</label>
          <select onchange="changePatientStatusDirect('${p.id}', this.value)" style="background:${p.status_color || '#4A90E2'}; color:white; border:none; padding:6px 12px; border-radius:6px; font-weight:600; font-size:0.85rem; cursor:pointer;">
            ${allPatientStatuses.map(st => `
              <option value="${st.id}" ${p.status_id === st.id ? 'selected' : ''} style="background:var(--bg-surface); color:var(--text-primary);">
                ${st.name}
              </option>
            `).join('')}
          </select>
        </div>
      </div>
    </div>

    <!-- DPI Navigation Tabs -->
    ${(() => {
      const cCount = (currentDossierData.consultations || []).length;
      const rxList = (currentDossierData.prescriptions || []).filter(rx => Array.isArray(rx.items) && rx.items.length > 0);
      const consultRxList = (currentDossierData.consultations || []).filter(c => c.prescription && Array.isArray(c.prescription.items) && c.prescription.items.length > 0);
      const rxCount = Math.max(rxList.length, consultRxList.length);

      return `
        <div style="display:flex; gap:5px; border-bottom:2px solid var(--border-color); margin-bottom:20px; overflow-x:auto; padding-bottom:2px;">
          <button class="btn btn-sm ${activeDPITab === 'summary' ? 'btn-primary' : 'btn-secondary'}" onclick="switchDPITab('summary')">
            <i class="fas fa-id-badge"></i> Synthèse & Constantes
          </button>
          <button class="btn btn-sm ${activeDPITab === 'treatments' ? 'btn-primary' : 'btn-secondary'}" onclick="switchDPITab('treatments')">
            <i class="fas fa-pills"></i> Traitements & Résultats (${(currentDossierData.treatments || []).length})
          </button>
          <button class="btn btn-sm ${activeDPITab === 'lab' ? 'btn-primary' : 'btn-secondary'}" onclick="switchDPITab('lab')">
            <i class="fas fa-vial"></i> Analyses & Examens (${(currentDossierData.lab_orders || currentDossierData.labOrders || []).length})
          </button>
          <button class="btn btn-sm ${activeDPITab === 'consultations' ? 'btn-primary' : 'btn-secondary'}" onclick="switchDPITab('consultations')">
            <i class="fas fa-stethoscope"></i> Consultations (${cCount}) • Ordonnances (${rxCount})
          </button>
          <button class="btn btn-sm ${activeDPITab === 'history' ? 'btn-primary' : 'btn-secondary'}" onclick="switchDPITab('history')">
            <i class="fas fa-history"></i> RDV & Hospitalisation (${(currentDossierData.appointments || []).length + (currentDossierData.hospitalizations || []).length})
          </button>
        </div>
      `;
    })()}

    <!-- Tab Active Body -->
    <div id="dpi-tab-body">
      ${renderDPITabBody()}
    </div>
  `;
}

function switchDPITab(tab) {
  activeDPITab = tab;
  renderDPI360Modal();
}

function renderDPITabBody() {
  if (!currentDossierData) return '';
  const p = currentDossierData.patient;

  // -------------------------------------------------------------
  // TAB 1: SYNTHÈSE & CONSTANTES
  // -------------------------------------------------------------
  if (activeDPITab === 'summary') {
    const height = p.height_cm ? parseFloat(p.height_cm) : null;
    const weight = p.weight_kg ? parseFloat(p.weight_kg) : null;
    let imc = null;
    let imcLabel = '';
    let imcColor = '#2ecc71';

    if (height && weight) {
      imc = (weight / Math.pow(height / 100, 2)).toFixed(1);
      if (imc < 18.5) { imcLabel = 'Insuffisance pondérale'; imcColor = '#3498db'; }
      else if (imc <= 24.9) { imcLabel = 'Poids normal'; imcColor = '#2ecc71'; }
      else if (imc <= 29.9) { imcLabel = 'Surpoids'; imcColor = '#f39c12'; }
      else { imcLabel = 'Obésité'; imcColor = '#e74c3c'; }
    }

    // Last consultation vitals if any
    const lastConsult = currentDossierData.consultations[0];
    const lastVitals = (lastConsult && lastConsult.vital_signs) ? lastConsult.vital_signs : {};

    return `
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
        <!-- Left: Vitals & Body Metrics -->
        <div class="card" style="margin:0;">
          <div class="card-title"><i class="fas fa-heartbeat"></i> Constantes & Mesures Corporelles</div>
          
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-bottom:15px;">
            <div style="background:var(--bg-primary); padding:12px; border-radius:8px; text-align:center; border:1px solid var(--border-color);">
              <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Taille</div>
              <div style="font-size:1.3rem; font-weight:700; color:var(--primary);">${height ? `${height} cm` : '-'}</div>
            </div>
            <div style="background:var(--bg-primary); padding:12px; border-radius:8px; text-align:center; border:1px solid var(--border-color);">
              <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Poids</div>
              <div style="font-size:1.3rem; font-weight:700; color:var(--primary);">${weight ? `${weight} kg` : '-'}</div>
            </div>
            <div style="background:var(--bg-primary); padding:12px; border-radius:8px; text-align:center; border:1px solid var(--border-color);">
              <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">IMC</div>
              <div style="font-size:1.3rem; font-weight:700; color:${imcColor};">${imc || '-'}</div>
              ${imcLabel ? `<div style="font-size:0.65rem; color:${imcColor}; font-weight:600;">${imcLabel}</div>` : ''}
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:15px;">
            <div style="background:var(--bg-primary); padding:12px; border-radius:8px; border:1px solid var(--border-color);">
              <div style="font-size:0.75rem; color:var(--text-muted);">Tension Artérielle (Dernière)</div>
              <div style="font-size:1.1rem; font-weight:600; color:var(--text-primary);">
                ${(lastVitals.bp_systolic && lastVitals.bp_diastolic) ? `${lastVitals.bp_systolic}/${lastVitals.bp_diastolic} mmHg` : 'Non mesurée'}
              </div>
            </div>
            <div style="background:var(--bg-primary); padding:12px; border-radius:8px; border:1px solid var(--border-color);">
              <div style="font-size:0.75rem; color:var(--text-muted);">Température (Dernière)</div>
              <div style="font-size:1.1rem; font-weight:600; color:var(--text-primary);">
                ${lastVitals.temperature_c ? `${lastVitals.temperature_c} °C` : 'Non mesurée'}
              </div>
            </div>
          </div>

          <div style="margin-bottom:15px;">
            <label class="form-label" style="font-weight:600;"><i class="fas fa-allergies"></i> Allergies connues :</label>
            <div>
              ${(p.allergies && p.allergies.length > 0) ? p.allergies.map(a => `<span class="badge" style="background:#e74c3c; color:white; margin-right:5px; padding:4px 8px; border-radius:4px;">${a}</span>`).join('') : '<span style="color:var(--text-muted); font-size:0.85rem;">Aucune allergie déclarée</span>'}
            </div>
          </div>
        </div>

        <!-- Right: Observations & Quick Update -->
        <div class="card" style="margin:0;">
          <div class="card-title"><i class="fas fa-edit"></i> Observations & Antécédents</div>
          <form onsubmit="updatePatientVitalsFromDossier(event, '${p.id}')">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
              <div class="form-group">
                <label class="form-label">Taille (cm)</label>
                <input type="number" step="0.1" class="form-control" id="dossier-p-height" value="${p.height_cm || ''}" placeholder="175" />
              </div>
              <div class="form-group">
                <label class="form-label">Poids (kg)</label>
                <input type="number" step="0.1" class="form-control" id="dossier-p-weight" value="${p.weight_kg || ''}" placeholder="70" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Observations générales / Antécédents médicaux</label>
              <textarea class="form-control" id="dossier-p-observations" rows="4" placeholder="Antécédents familiaux, chirurgicaux, mode de vie, remarques...">${p.observations || ''}</textarea>
            </div>
            <button class="btn btn-primary" type="submit" style="width:100%;">
              <i class="fas fa-save"></i> Enregistrer les Modifications
            </button>
          </form>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // TAB 2: TRAITEMENTS & RÉSULTATS OBTENUS
  // -------------------------------------------------------------
  if (activeDPITab === 'treatments') {
    const list = currentDossierData.treatments || [];
    return `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
        <h4 style="margin:0; color:var(--text-primary);"><i class="fas fa-pills"></i> Traitements Administrés & Résultats Obtenus</h4>
        <button class="btn btn-primary btn-sm" onclick="openCreateTreatmentModal('${p.id}')">
          <i class="fas fa-plus"></i> Nouveau Traitement
        </button>
      </div>

      ${list.length === 0 ? `
        <div class="card" style="text-align:center; padding:30px; color:var(--text-muted);">
          <i class="fas fa-notes-medical fa-2x" style="margin-bottom:10px;"></i>
          <div>Aucun traitement consigné pour ce patient.</div>
        </div>
      ` : `
        <div style="display:flex; flex-direction:column; gap:12px;">
          ${list.map(t => {
            const statusBadge = t.status === 'TERMINE' ? 'badge-success' : (t.status === 'EN_COURS' ? 'badge-primary' : 'badge-danger');
            const statusLabel = t.status === 'TERMINE' ? 'Terminé' : (t.status === 'EN_COURS' ? 'En cours' : 'Interrompu');
            return `
              <div class="card" style="margin:0; padding:15px; border-left:4px solid var(--primary);">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
                  <div>
                    <h4 style="margin:0 0 4px 0; color:var(--text-primary);">${t.treatment_name}</h4>
                    <div style="font-size:0.8rem; color:var(--text-muted);">
                      <span class="badge" style="background:var(--bg-primary); color:var(--text-primary); border:1px solid var(--border-color);">${t.treatment_type || 'Médicamenteux'}</span>
                      <span style="margin-left:8px;"><i class="fas fa-calendar-alt"></i> Du ${new Date(t.start_date).toLocaleDateString()} ${t.end_date ? `au ${new Date(t.end_date).toLocaleDateString()}` : '(En cours)'}</span>
                      ${t.doc_first ? `<span style="margin-left:8px;"><i class="fas fa-user-md"></i> Dr. ${t.doc_first} ${t.doc_last}</span>` : ''}
                    </div>
                  </div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span class="badge" style="background:${t.status === 'TERMINE' ? 'var(--success)' : 'var(--primary)'}; color:white; padding:4px 8px; border-radius:4px; font-size:0.75rem;">
                      ${statusLabel}
                    </span>
                    <button class="btn btn-secondary btn-sm" onclick="openEditTreatmentModal('${t.id}')" title="Modifier">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTreatmentRecord('${t.id}', '${p.id}')" style="background:var(--danger); border-color:var(--danger);" title="Supprimer">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>

                ${t.dosage_instructions ? `
                  <div style="font-size:0.85rem; margin-bottom:10px; color:var(--text-primary);">
                    <strong>Posologie / Protocole :</strong> ${t.dosage_instructions}
                  </div>
                ` : ''}

                <!-- Highlighted Clinical Results -->
                <div style="background: rgba(46, 204, 113, 0.08); border:1px solid rgba(46, 204, 113, 0.3); border-radius:6px; padding:10px 12px; margin-top:8px;">
                  <div style="font-size:0.8rem; font-weight:700; color:var(--success); margin-bottom:3px;">
                    <i class="fas fa-poll-h"></i> Résultats Cliniques Obtenus & Évolution :
                  </div>
                  <div style="font-size:0.85rem; color:var(--text-primary);">
                    ${t.results_obtained ? t.results_obtained : `<span style="color:var(--text-muted); font-style:italic;">Aucun résultat consigné. Cliquez sur Modifier pour saisir l'évolution.</span>`}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    `;
  }

  // -------------------------------------------------------------
  // TAB 3: ANALYSES & EXAMENS (LABORATOIRE & IMAGERIE)
  // -------------------------------------------------------------
  if (activeDPITab === 'lab') {
    const list = currentDossierData.labOrders || currentDossierData.lab_orders || [];
    return `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
        <div>
          <h4 style="margin:0; color:var(--text-primary); font-size:1.1rem; display:flex; align-items:center; gap:8px;">
            <i class="fas fa-vial" style="color:var(--primary);"></i> Analyses & Examens Médicaux (${list.length})
          </h4>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:2px;">Prescriptions, résultats numériques et scans de documents archivés en ligne</div>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-secondary btn-sm" onclick="openImportExternalLabModal('${p.id}')" style="padding:6px 12px; font-weight:600;">
            <i class="fas fa-scanner-image"></i> Scanner / Importer un Bilan
          </button>
          <button class="btn btn-primary btn-sm" onclick="openCreateLabOrderModal('${p.id}')" style="padding:6px 14px; font-weight:600;">
            <i class="fas fa-plus"></i> Prescrire un Examen
          </button>
        </div>
      </div>

      ${list.length === 0 ? `
        <div class="card" style="text-align:center; padding:35px; color:var(--text-muted); border:1px dashed var(--border-color); background:var(--bg-surface);">
          <i class="fas fa-microscope fa-3x" style="margin-bottom:12px; color:var(--primary); opacity:0.6;"></i>
          <div style="font-size:0.95rem; font-weight:600; color:var(--text-primary); margin-bottom:4px;">Aucune analyse ou examen enregistré</div>
          <div style="font-size:0.82rem;">Vous pouvez <strong>prescrire un examen</strong> ou <strong>scanner/importer un document externe</strong> (PDF, Photo).</div>
        </div>
      ` : `
        <div style="display:flex; flex-direction:column; gap:14px;">
          ${list.map(lo => {
            const isDone = lo.status === 'TERMINE';
            const statusColor = isDone ? '#10b981' : (lo.status === 'EN_COURS' ? '#3b82f6' : '#f59e0b');
            const statusLabel = isDone ? 'Terminé (Résultats disponibles)' : (lo.status === 'EN_COURS' ? 'En cours d\'analyse' : 'À faire');
            const hasDoc = !!lo.document_url;
            const isPdf = hasDoc && (lo.document_url.toLowerCase().includes('.pdf'));

            return `
              <div class="card" style="margin:0; padding:16px; border-left:4px solid ${statusColor}; box-shadow:0 2px 6px rgba(0,0,0,0.03);">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px; flex-wrap:wrap; gap:10px;">
                  <div>
                    <div style="display:flex; align-items:center; gap:8px;">
                      <h4 style="margin:0; font-size:1.05rem; color:var(--text-primary);">${lo.test_name}</h4>
                      ${hasDoc ? `<span class="badge badge-success" style="background:#ecfdf5; color:#059669; border:1px solid #a7f3d0; font-size:0.72rem; padding:2px 8px; border-radius:12px; font-weight:700;"><i class="${isPdf ? 'fas fa-file-pdf' : 'fas fa-file-image'}"></i> Scan Archivé</span>` : ''}
                    </div>
                    <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">
                      <span class="badge" style="background:var(--bg-surface); border:1px solid var(--border-color);">${lo.category || 'Biologie'}</span>
                      <span class="badge" style="background:${lo.priority === 'URGENTE' ? '#ef4444' : '#3b82f6'}; color:white; margin-left:6px;">${lo.priority}</span>
                      <span style="margin-left:8px;"><i class="fas fa-calendar-alt"></i> Prescrit le ${new Date(lo.created_at).toLocaleDateString('fr-FR')}</span>
                      ${lo.doc_first ? `<span style="margin-left:8px;"><i class="fas fa-user-md"></i> Dr. ${lo.doc_first} ${lo.doc_last}</span>` : ''}
                    </div>
                  </div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span class="badge" style="background:${statusColor}; color:white; padding:4px 8px; border-radius:4px; font-size:0.75rem;">
                      ${statusLabel}
                    </span>
                    <button class="btn btn-secondary btn-sm" onclick="openRecordLabResultModal('${lo.id}')" title="Saisir ou modifier les résultats & documents">
                      <i class="fas fa-file-medical-alt"></i> Saisir Résultats & Scan
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteLabOrderRecord('${lo.id}', '${p.id}')" style="background:var(--danger); border-color:var(--danger);" title="Supprimer">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>

                ${lo.clinical_notes ? `
                  <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:8px; background:rgba(0,0,0,0.02); padding:6px 10px; border-radius:6px;">
                    <strong>Renseignements cliniques :</strong> ${lo.clinical_notes}
                  </div>
                ` : ''}

                <!-- Lab Results Report & Scanned Document Section -->
                ${(lo.results_text || hasDoc) ? `
                  <div style="background:rgba(37,99,235,0.04); border:1px solid rgba(37,99,235,0.2); border-radius:8px; padding:12px; margin-top:10px;">
                    <div style="font-size:0.82rem; font-weight:700; color:#1e40af; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
                      <i class="fas fa-check-circle" style="color:#10b981;"></i> Compte-rendu d'Analyses ${lo.results_date ? `(Validé le ${new Date(lo.results_date).toLocaleDateString('fr-FR')})` : ''} :
                    </div>
                    
                    ${lo.results_text ? `
                      <div style="font-size:0.85rem; color:var(--text-primary); white-space:pre-wrap; margin-bottom:10px; background:#fff; padding:10px; border-radius:6px; border:1px solid #e2e8f0;">${lo.results_text}</div>
                    ` : ''}

                    ${hasDoc ? `
                      <div style="display:flex; justify-content:space-between; align-items:center; background:#fff; border:1px solid #cbd5e1; border-radius:8px; padding:10px 14px; flex-wrap:wrap; gap:10px;">
                        <div style="display:flex; align-items:center; gap:10px;">
                          <div style="width:36px; height:36px; border-radius:8px; background:#eff6ff; color:#2563eb; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
                            <i class="${isPdf ? 'fas fa-file-pdf' : 'fas fa-file-image'}" style="color:${isPdf ? '#ef4444' : '#2563eb'};"></i>
                          </div>
                          <div>
                            <div style="font-weight:700; font-size:0.85rem; color:#1e293b;">Scan / Document de Résultats Joint</div>
                            <div style="font-size:0.75rem; color:#64748b;">Archivé en ligne • Accessible à tout moment en cas de perte du papier</div>
                          </div>
                        </div>
                        <div style="display:flex; gap:8px;">
                          <button class="btn btn-primary btn-sm" onclick="viewUploadedDocument('${lo.document_url}', '${lo.test_name.replace(/'/g, "\\'")}')" style="font-size:0.8rem; font-weight:600; padding:6px 14px;">
                            <i class="fas fa-eye"></i> Consulter le Scan
                          </button>
                          <a href="${lo.document_url}" target="_blank" download class="btn btn-secondary btn-sm" style="font-size:0.8rem; padding:6px 12px;" title="Télécharger le fichier original">
                            <i class="fas fa-download"></i> Télécharger
                          </a>
                        </div>
                      </div>
                    ` : `
                      <div style="font-size:0.8rem; color:var(--text-muted); display:flex; justify-content:space-between; align-items:center; margin-top:6px;">
                        <span>Aucun fichier scan rattaché.</span>
                        <button class="btn btn-secondary btn-sm" onclick="openRecordLabResultModal('${lo.id}')" style="font-size:0.75rem; padding:3px 8px;">
                          <i class="fas fa-paperclip"></i> Scanner & Attacher un fichier
                        </button>
                      </div>
                    `}
                  </div>
                ` : `
                  <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; color:var(--text-muted); font-style:italic; background:rgba(0,0,0,0.015); padding:8px 12px; border-radius:6px; margin-top:8px;">
                    <span>En attente de résultats de laboratoire ou de scan de document.</span>
                    <button class="btn btn-primary btn-sm" onclick="openRecordLabResultModal('${lo.id}')" style="font-size:0.78rem; padding:4px 10px; font-weight:600;">
                      <i class="fas fa-scanner-image"></i> Scanner / Renseigner
                    </button>
                  </div>
                `}
              </div>
            `;
          }).join('')}
        </div>
      `}
    `;
  }

  // -------------------------------------------------------------
  // TAB 4: CONSULTATIONS & ORDONNANCES
  // -------------------------------------------------------------
  if (activeDPITab === 'consultations') {
    const list = currentDossierData.consultations || [];
    const allPrescriptions = currentDossierData.prescriptions || [];
    const rxList = allPrescriptions.filter(rx => Array.isArray(rx.items) && rx.items.length > 0);
    const consultRxList = list.filter(c => c.prescription && Array.isArray(c.prescription.items) && c.prescription.items.length > 0);
    const rxCount = Math.max(rxList.length, consultRxList.length);

    return `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
        <div>
          <h4 style="margin:0; color:var(--text-primary); font-size:1.1rem; display:flex; align-items:center; gap:8px;">
            <i class="fas fa-stethoscope" style="color:var(--primary);"></i> Historique : ${list.length} Consultation${list.length > 1 ? 's' : ''} • ${rxCount} Ordonnance${rxCount > 1 ? 's' : ''}
          </h4>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:2px;">Consultez, dupliquez pour renouvellement, modifiez et imprimez les ordonnances médicales</div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="openNewConsultationFromDPI()" style="padding:7px 14px; font-weight:600;">
          <i class="fas fa-plus"></i> Nouvelle Consultation & Ordonnance
        </button>
      </div>

      ${list.length === 0 ? `
        <div class="card" style="text-align:center; padding:35px; color:var(--text-muted); border:1px dashed var(--border-color); background:var(--bg-surface);">
          <i class="fas fa-file-prescription fa-3x" style="margin-bottom:12px; color:var(--primary); opacity:0.6;"></i>
          <div style="font-size:0.95rem; font-weight:600; color:var(--text-primary); margin-bottom:4px;">Aucune consultation ou ordonnance enregistrée</div>
          <div style="font-size:0.82rem;">Cliquez sur <strong>"Nouvelle Consultation & Ordonnance"</strong> pour rédiger un acte médical et prescrire.</div>
        </div>
      ` : `
        <div style="display:flex; flex-direction:column; gap:16px;">
          ${list.map(c => {
            const rx = c.prescription || allPrescriptions.find(p => p.consultation_id === c.id);
            const hasRx = rx && Array.isArray(rx.items) && rx.items.length > 0;
            const isExpired = rx && rx.valid_until && new Date(rx.valid_until) < new Date();

            return `
              <div class="card" style="margin:0; padding:18px; border:1px solid var(--border-color); background:var(--bg-surface); border-radius:10px; box-shadow:0 2px 8px rgba(0,0,0,0.03);">
                <!-- Card Header -->
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; flex-wrap:wrap; gap:10px;">
                  <div>
                    <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                      <h4 style="margin:0; color:var(--text-primary); font-size:1.05rem; font-weight:700; display:flex; align-items:center; gap:6px;">
                        <i class="fas fa-notes-medical" style="color:var(--primary);"></i> ${c.reason_for_visit}
                      </h4>
                      ${rx ? `
                        <span class="badge" style="background:linear-gradient(135deg, #1e40af, #2563eb); color:#fff; font-size:0.75rem; padding:3px 9px; border-radius:12px; font-weight:700;">
                          <i class="fas fa-file-prescription"></i> ${rx.prescription_code}
                        </span>
                      ` : ''}
                    </div>
                    <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">
                      <span><i class="fas fa-calendar-alt"></i> ${new Date(c.created_at).toLocaleString('fr-FR')}</span>
                      ${c.doc_first ? `<span style="margin-left:12px;"><i class="fas fa-user-md"></i> ${c.doc_title || 'Dr.'} ${c.doc_first} ${c.doc_last} ${c.doc_specialty ? `(${c.doc_specialty})` : ''}</span>` : ''}
                    </div>
                  </div>

                  <!-- Quick Action Buttons -->
                  <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
                    ${rx ? `
                      <button class="btn btn-primary btn-sm" onclick="openPrescriptionPrintModal('${rx.id}')" style="font-size:0.82rem; padding:6px 12px; font-weight:600;" title="Imprimer l'ordonnance officielle">
                        <i class="fas fa-print"></i> Imprimer
                      </button>
                      <button class="btn btn-secondary btn-sm" onclick="duplicateConsultationPrescription('${c.id}')" style="font-size:0.82rem; padding:6px 12px; font-weight:600; color:#1d4ed8; border-color:#bfdbfe; background:#eff6ff;" title="Renouveler / Dupliquer cette ordonnance pour une nouvelle période">
                        <i class="fas fa-copy"></i> Renouveler
                      </button>
                    ` : `
                      <button class="btn btn-secondary btn-sm" onclick="duplicateConsultationPrescription('${c.id}')" style="font-size:0.82rem; padding:6px 12px;" title="Créer une ordonnance à partir de ce diagnostic">
                        <i class="fas fa-plus-circle"></i> Créer Ordonnance
                      </button>
                    `}
                    <button class="btn btn-secondary btn-sm" onclick="openEditConsultationModal('${c.id}')" style="font-size:0.82rem; padding:6px 10px;" title="Modifier cette consultation & ordonnance">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteConsultationConfirm('${c.id}')" style="font-size:0.82rem; padding:6px 10px; background:var(--danger); border-color:var(--danger);" title="Supprimer">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>

                <!-- Diagnosis & Vitals Box -->
                <div style="background:var(--bg-primary); border-radius:8px; padding:12px 14px; margin-bottom:12px; font-size:0.88rem; border:1px solid var(--border-color);">
                  <div style="margin-bottom:4px;">
                    <strong style="color:var(--text-primary);">Diagnostic :</strong> 
                    <span style="color:var(--text-primary); font-weight:500;">${c.diagnosis_text}</span>
                    ${(c.icd10_diagnosis_codes && c.icd10_diagnosis_codes.length > 0) ? `
                      <span style="margin-left:8px;">
                        ${c.icd10_diagnosis_codes.map(code => `<span class="badge" style="background:#e0e7ff; color:#3730a3; font-size:0.72rem; padding:2px 7px; border-radius:4px; font-weight:600;">${code}</span>`).join(' ')}
                      </span>
                    ` : ''}
                  </div>
                  ${c.clinical_examination ? `
                    <div style="font-size:0.82rem; color:var(--text-muted); margin-top:4px;">
                      <strong>Examen clinique :</strong> ${c.clinical_examination}
                    </div>
                  ` : ''}
                  ${(c.vital_signs && (c.vital_signs.bp_systolic || c.vital_signs.temperature_c)) ? `
                    <div style="font-size:0.8rem; color:var(--text-muted); margin-top:6px; display:flex; gap:12px; flex-wrap:wrap;">
                      ${c.vital_signs.bp_systolic ? `<span><i class="fas fa-heartbeat text-danger"></i> Tension : <strong>${c.vital_signs.bp_systolic}/${c.vital_signs.bp_diastolic || ''} mmHg</strong></span>` : ''}
                      ${c.vital_signs.temperature_c ? `<span><i class="fas fa-thermometer-half text-warning"></i> Température : <strong>${c.vital_signs.temperature_c} °C</strong></span>` : ''}
                    </div>
                  ` : ''}
                </div>

                <!-- Prescription Items Preview Box -->
                ${hasRx ? `
                  <div style="border:1px solid rgba(59, 130, 246, 0.35); background:linear-gradient(135deg, rgba(59, 130, 246, 0.04), rgba(37, 99, 235, 0.02)); border-radius:8px; padding:12px 14px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:6px;">
                      <span style="font-weight:700; font-size:0.88rem; color:#1e40af; display:flex; align-items:center; gap:6px;">
                        <i class="fas fa-pills" style="color:#2563eb;"></i> Médicaments Prescrits (${rx.items.length})
                      </span>
                      <div style="font-size:0.78rem; color:var(--text-muted); display:flex; align-items:center; gap:8px;">
                        <span>Validité : <strong>${rx.valid_until ? new Date(rx.valid_until).toLocaleDateString('fr-FR') : 'Non définie'}</strong></span>
                        ${isExpired 
                          ? `<span class="badge" style="background:#fee2e2; color:#991b1b; font-size:0.7rem; font-weight:700;">Expirée</span>` 
                          : `<span class="badge" style="background:#dcfce7; color:#166534; font-size:0.7rem; font-weight:700;">Valide</span>`
                        }
                      </div>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                      ${rx.items.map((item, idx) => `
                        <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-surface); border:1px solid var(--border-color); border-radius:6px; padding:7px 12px; font-size:0.83rem; flex-wrap:wrap; gap:6px;">
                          <div>
                            <strong style="color:var(--text-primary);">${idx + 1}. ${item.drug_name}</strong>
                            <span style="color:var(--text-muted); margin-left:6px;">— ${item.dosage} • ${item.frequency}</span>
                          </div>
                          <div style="display:flex; align-items:center; gap:8px;">
                            <span class="badge" style="background:#f1f5f9; color:#334155; font-size:0.72rem; font-weight:600; border:1px solid var(--border-color);">${item.duration_days} jours</span>
                            ${item.instructions ? `<span style="font-size:0.78rem; color:var(--text-muted); font-style:italic;">(${item.instructions})</span>` : ''}
                          </div>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      `}
    `;
  }

  // -------------------------------------------------------------
  // TAB 5: RDV & HOSPITALISATION
  // -------------------------------------------------------------
  if (activeDPITab === 'history') {
    const appts = currentDossierData.appointments || [];
    const hosp = currentDossierData.hospitalizations || [];

    return `
      <div style="margin-bottom:20px;">
        <h4 style="margin-bottom:10px; color:var(--text-primary);"><i class="fas fa-calendar-check"></i> Rendez-vous (${appts.length})</h4>
        ${appts.length === 0 ? '<div style="color:var(--text-muted); font-size:0.85rem;">Aucun rendez-vous</div>' : `
          <table class="table">
            <thead>
              <tr>
                <th>Date & Heure</th>
                <th>Service</th>
                <th>Médecin</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              ${appts.map(a => `
                <tr>
                  <td>${new Date(a.start_time).toLocaleString()}</td>
                  <td>${a.service_name || 'Consultation'}</td>
                  <td>${a.doc_first ? `Dr. ${a.doc_first} ${a.doc_last}` : '-'}</td>
                  <td><span class="badge badge-info">${a.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `}
      </div>

      <div>
        <h4 style="margin-bottom:10px; color:var(--text-primary);"><i class="fas fa-bed"></i> Séjours Hospitaliers (${hosp.length})</h4>
        ${hosp.length === 0 ? '<div style="color:var(--text-muted); font-size:0.85rem;">Aucun séjour hospitalier</div>' : `
          <table class="table">
            <thead>
              <tr>
                <th>Bâtiment & Chambre</th>
                <th>Lit</th>
                <th>Admission</th>
                <th>Sortie</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              ${hosp.map(h => `
                <tr>
                  <td>${h.building_name || 'Bâtiment'} - Ch. ${h.room_number || ''}</td>
                  <td><strong>Lit ${h.bed_number}</strong></td>
                  <td>${new Date(h.admission_date).toLocaleDateString()}</td>
                  <td>${h.discharge_date ? new Date(h.discharge_date).toLocaleDateString() : 'En cours'}</td>
                  <td><span class="badge ${h.status === 'EN_COURS' ? 'badge-danger' : 'badge-success'}">${h.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `}
      </div>
    `;
  }
}

// ============================================================================
// Edit Patient Complete Modal & Actions
// ============================================================================
function createEditPatientModalContainer() {
  let modal = document.getElementById('edit-patient-modal');
  if (!modal) {
    const div = document.createElement('div');
    div.className = 'modal-overlay';
    div.id = 'edit-patient-modal';
    div.style.cssText = 'display:none; justify-content:center; align-items:center; z-index:3100;';
    div.innerHTML = `
      <div class="modal-container" style="width:680px; max-width:96%; max-height:92vh; overflow-y:auto; padding:24px; animation: modalFadeIn 0.3s ease;">
        <div id="edit-patient-modal-content"></div>
      </div>
    `;
    document.body.appendChild(div);
    modal = div;
  }
  return modal;
}

function closeEditPatientModal() {
  const modal = document.getElementById('edit-patient-modal');
  if (modal) modal.style.display = 'none';
}

async function openEditPatientModal(patientId, fromDPI = false) {
  const modal = createEditPatientModalContainer();
  const content = document.getElementById('edit-patient-modal-content');
  if (!content) return;

  content.innerHTML = `<div style="text-align:center; padding:40px;"><i class="fas fa-spinner fa-spin fa-2x" style="color:var(--primary);"></i><div style="margin-top:10px;">Chargement des données du patient...</div></div>`;
  modal.style.display = 'flex';

  try {
    const [dossier, rawStatuses, rawPractitioners, rawInsurances] = await Promise.all([
      api.request(`/patients/${patientId}/dossier`).catch(() => ({ patient: {} })),
      api.request('/patient-statuses').catch(() => allPatientStatuses || []),
      api.request('/practitioners').catch(() => allPractitionersList || []),
      api.request('/billing/insurances').catch(() => [])
    ]);

    const p = (dossier && dossier.patient) ? dossier.patient : {};
    const practitioners = Array.isArray(rawPractitioners) ? rawPractitioners : [];
    const insurances = Array.isArray(rawInsurances) ? rawInsurances : [];
    const statuses = Array.isArray(rawStatuses) ? rawStatuses : (allPatientStatuses || []);
    const formattedDob = p.date_of_birth ? new Date(p.date_of_birth).toISOString().split('T')[0] : '';
    const allergiesStr = Array.isArray(p.allergies) ? p.allergies.join(', ') : (p.allergies || '');

    content.innerHTML = `
      <div class="modal-header" style="border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:18px; display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:38px; height:38px; border-radius:8px; background:#eff6ff; color:#1d4ed8; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
            <i class="fas fa-user-edit"></i>
          </div>
          <div>
            <h4 class="modal-title" style="margin:0; font-size:1.15rem; font-weight:800; color:var(--text-primary);">
              Modifier la Fiche Patient
            </h4>
            <div style="font-size:0.8rem; color:var(--text-muted);">
              Code Patient : <strong>${p.patient_code}</strong> • Identifiant : ${p.id.substring(0, 8)}...
            </div>
          </div>
        </div>
        <button class="modal-close" onclick="closeEditPatientModal()">&times;</button>
      </div>

      <form onsubmit="handleUpdatePatientSubmit(event, '${p.id}', ${fromDPI})">
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:14px; margin-bottom:12px;">
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">${t('firstName')} *</label>
            <input type="text" class="form-control" id="edit-p-first" value="${p.first_name || ''}" required />
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">${t('lastName')} *</label>
            <input type="text" class="form-control" id="edit-p-last" value="${p.last_name || ''}" required />
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:14px; margin-bottom:12px;">
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">${t('phone')} *</label>
            <input type="text" class="form-control" id="edit-p-phone" value="${p.phone_number || ''}" required placeholder="+221..." />
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Adresse Email</label>
            <input type="email" class="form-control" id="edit-p-email" value="${p.email || ''}" placeholder="patient@gmail.com" />
          </div>
        </div>

        <div class="form-group" style="margin-bottom:12px;">
          <label class="form-label" style="font-weight:700; color:var(--primary);"><i class="fas fa-user-md"></i> Médecin Traitant Référent</label>
          <select class="form-control" id="edit-p-attending-doc" style="border:1.5px solid var(--primary);">
            <option value="">-- Aucun médecin assigné --</option>
            ${practitioners.map(doc => `
              <option value="${doc.id}" ${(p.attending_practitioner_id === doc.id || (p.attending_doctor && p.attending_doctor.id === doc.id)) ? 'selected' : ''}>
                ${doc.title || 'Dr.'} ${doc.first_name} ${doc.last_name} (${doc.specialty_name || 'Généraliste'})
              </option>
            `).join('')}
          </select>
        </div>

        <!-- Section Prise en Charge IPM / Assurance -->
        <div style="background:#f0f7ff; border:1.5px solid #bfdbfe; border-radius:10px; padding:14px; margin-bottom:14px;">
          <div style="font-weight:700; color:#1e40af; font-size:0.88rem; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
            <i class="fas fa-shield-alt"></i> Prise en Charge Organisme Tiers-Payant / IPM
          </div>
          <div style="display:grid; grid-template-columns: 1fr 1fr 100px; gap:10px;">
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label" style="font-size:0.8rem; font-weight:600;">Organisme IPM / Assurance</label>
              <select class="form-control" id="edit-p-insurance-id">
                <option value="">Régime Privé (100% Patient / Sans IPM)</option>
                ${insurances.map(ins => `
                  <option value="${ins.id}" ${(p.insurance_company_id === ins.id) ? 'selected' : ''}>
                    ${ins.name} ${ins.code ? `(${ins.code})` : ''}
                  </option>
                `).join('')}
              </select>
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label" style="font-size:0.8rem; font-weight:600;">Matricule / N° Police</label>
              <input type="text" class="form-control" id="edit-p-policy" value="${p.policy_number || ''}" placeholder="ex: MAT-9842" />
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label" style="font-size:0.8rem; font-weight:600;">Taux (%)</label>
              <input type="number" min="0" max="100" class="form-control" id="edit-p-coverage" value="${p.coverage_rate_percent !== undefined && p.coverage_rate_percent !== null ? p.coverage_rate_percent : 80}" placeholder="80" />
            </div>
          </div>
          <div style="font-size:0.75rem; color:#475569; margin-top:5px;">
            <i class="fas fa-info-circle text-primary"></i> L'association permet de calculer automatiquement le tiers-payant lors de la facturation et l'envoi des décomptes.
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:14px; margin-bottom:12px;">
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">${t('gender')} *</label>
            <select class="form-control" id="edit-p-gender" required>
              <option value="M" ${p.gender === 'M' ? 'selected' : ''}>M (Masculin)</option>
              <option value="F" ${p.gender === 'F' ? 'selected' : ''}>F (Féminin)</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">${t('dob')} *</label>
            <input type="date" class="form-control" id="edit-p-dob" value="${formattedDob}" required />
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:14px; margin-bottom:12px;">
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">${t('bloodGroup')}</label>
            <input type="text" class="form-control" id="edit-p-blood" value="${p.blood_group || ''}" placeholder="A+, O-, B+..." />
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">${t('status')}</label>
            <select class="form-control" id="edit-p-status-id">
              ${statuses.map(s => `<option value="${s.id}" ${(p.status_id === s.id || p.status === s.name) ? 'selected' : ''}>${s.name}</option>`).join('')}
            </select>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:14px; margin-bottom:12px;">
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">${t('height')} (cm)</label>
            <input type="number" step="0.1" class="form-control" id="edit-p-height" value="${p.height_cm ? parseFloat(p.height_cm) : ''}" placeholder="175" />
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">${t('weight')} (kg)</label>
            <input type="number" step="0.1" class="form-control" id="edit-p-weight" value="${p.weight_kg ? parseFloat(p.weight_kg) : ''}" placeholder="70" />
          </div>
        </div>

        <div class="form-group" style="margin-bottom:12px;">
          <label class="form-label">${t('allergies')} (séparées par virgules)</label>
          <input type="text" class="form-control" id="edit-p-allergies" value="${allergiesStr}" placeholder="pollen, pénicilline, aspirine..." />
        </div>

        <div class="form-group" style="margin-bottom:12px;">
          <label class="form-label">Adresse / Localisation</label>
          <input type="text" class="form-control" id="edit-p-address" value="${p.address || ''}" placeholder="Dakar, Médina rue 11..." />
        </div>

        <div class="form-group" style="margin-bottom:18px;">
          <label class="form-label">${t('observations')}</label>
          <textarea class="form-control" id="edit-p-observations" rows="2" placeholder="Observations, antécédents médicaux ou notes de suivi...">${p.observations || ''}</textarea>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:14px;">
          <button type="button" class="btn btn-secondary" onclick="closeEditPatientModal()">Annuler</button>
          <button type="submit" class="btn btn-primary" style="padding:8px 22px; font-weight:700;">
            <i class="fas fa-check-circle"></i> Enregistrer les Modifications
          </button>
        </div>
      </form>
    `;
  } catch (err) {
    showToast('Erreur lors du chargement du patient : ' + err.message, 'error');
    closeEditPatientModal();
  }
}

async function handleUpdatePatientSubmit(e, patientId, fromDPI) {
  e.preventDefault();
  const first_name = document.getElementById('edit-p-first').value.trim();
  const last_name = document.getElementById('edit-p-last').value.trim();
  const phone_number = document.getElementById('edit-p-phone').value.trim();
  const email = (document.getElementById('edit-p-email').value || '').trim() || null;
  const gender = document.getElementById('edit-p-gender').value;
  const date_of_birth = document.getElementById('edit-p-dob').value;
  const blood_group = (document.getElementById('edit-p-blood').value || '').trim() || null;
  const height_cm = (document.getElementById('edit-p-height').value || '').trim() || null;
  const weight_kg = (document.getElementById('edit-p-weight').value || '').trim() || null;
  const address = (document.getElementById('edit-p-address').value || '').trim() || null;
  const observations = (document.getElementById('edit-p-observations').value || '').trim() || null;
  const allergies = document.getElementById('edit-p-allergies').value 
    ? document.getElementById('edit-p-allergies').value.split(',').map(s => s.trim()).filter(Boolean) 
    : [];

  const attending_practitioner_id = document.getElementById('edit-p-attending-doc') ? document.getElementById('edit-p-attending-doc').value : null;
  const statusSelect = document.getElementById('edit-p-status-id');
  const status_id = statusSelect && statusSelect.value ? statusSelect.value : null;
  const status = statusSelect && statusSelect.options[statusSelect.selectedIndex] ? statusSelect.options[statusSelect.selectedIndex].text : 'Externe';

  // IPM insurance fields
  const insurance_company_id = document.getElementById('edit-p-insurance-id') ? document.getElementById('edit-p-insurance-id').value : null;
  const policy_number = document.getElementById('edit-p-policy') ? document.getElementById('edit-p-policy').value.trim() : null;
  const coverage_rate_percent = document.getElementById('edit-p-coverage') ? document.getElementById('edit-p-coverage').value : null;

  try {
    await api.request(`/patients/${patientId}`, {
      method: 'PUT',
      body: JSON.stringify({
        first_name,
        last_name,
        phone_number,
        email,
        gender,
        date_of_birth,
        blood_group,
        height_cm,
        weight_kg,
        address,
        observations,
        allergies,
        attending_practitioner_id,
        status_id,
        status,
        insurance_company_id,
        policy_number,
        coverage_rate_percent
      })
    });

    showToast('Fiche patient modifiée avec succès !', 'success');
    closeEditPatientModal();

    if (fromDPI && activeDPIPatient) {
      openDPIModal(patientId, `${first_name} ${last_name}`);
    }
    if (state.currentTab === 'patients') {
      navigate('patients');
    }
  } catch (err) {
    showToast(`Erreur de modification: ${err.message}`, 'error');
  }
}

// Quick Update Vitals & Observations from Dossier Modal
async function updatePatientVitalsFromDossier(e, patientId) {
  e.preventDefault();
  const height_cm = document.getElementById('dossier-p-height').value;
  const weight_kg = document.getElementById('dossier-p-weight').value;
  const observations = document.getElementById('dossier-p-observations').value;

  try {
    await api.request(`/patients/${patientId}`, {
      method: 'PUT',
      body: JSON.stringify({ height_cm, weight_kg, observations })
    });
    showToast('Constantes et observations mises à jour!');
    openDPIModal(patientId, activeDPIPatient.name);
  } catch (err) {
    showToast(`Erreur: ${err.message}`, 'error');
  }
}

// Instant Patient Status Change from Dossier Banner
async function changePatientStatusDirect(patientId, statusId) {
  try {
    const selected = allPatientStatuses.find(s => s.id === statusId);
    await api.request(`/patients/${patientId}`, {
      method: 'PUT',
      body: JSON.stringify({
        status_id: statusId,
        status: selected ? selected.name : 'Externe'
      })
    });
    showToast('Statut du patient mis à jour!');
    openDPIModal(patientId, activeDPIPatient.name);
    if (state.currentTab === 'patients') {
      navigate('patients');
    }
  } catch (err) {
    showToast(`Erreur: ${err.message}`, 'error');
  }
}

// -------------------------------------------------------------
// Treatments Actions
// -------------------------------------------------------------
function openCreateTreatmentModal(patientId) {
  const modal = document.getElementById('treatment-modal');
  if (!modal) return;

  document.getElementById('treatment-form-id').value = '';
  document.getElementById('treatment-patient-id').value = patientId;
  document.getElementById('treatment-modal-title').innerText = 'Nouveau Traitement';
  document.getElementById('treatment-name').value = '';
  document.getElementById('treatment-type').value = 'Médicamenteux';
  document.getElementById('treatment-start-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('treatment-end-date').value = '';
  document.getElementById('treatment-dosage').value = '';
  document.getElementById('treatment-status').value = 'EN_COURS';
  document.getElementById('treatment-results').value = '';

  modal.style.display = 'flex';
}

function openEditTreatmentModal(treatmentId) {
  const modal = document.getElementById('treatment-modal');
  if (!modal || !currentDossierData) return;

  const t = currentDossierData.treatments.find(item => item.id === treatmentId);
  if (!t) return;

  document.getElementById('treatment-form-id').value = t.id;
  document.getElementById('treatment-patient-id').value = t.patient_id;
  document.getElementById('treatment-modal-title').innerText = 'Modifier Traitement & Résultats';
  document.getElementById('treatment-name').value = t.treatment_name;
  document.getElementById('treatment-type').value = t.treatment_type || 'Médicamenteux';
  document.getElementById('treatment-start-date').value = t.start_date ? t.start_date.split('T')[0] : '';
  document.getElementById('treatment-end-date').value = t.end_date ? t.end_date.split('T')[0] : '';
  document.getElementById('treatment-dosage').value = t.dosage_instructions || '';
  document.getElementById('treatment-status').value = t.status || 'EN_COURS';
  document.getElementById('treatment-results').value = t.results_obtained || '';

  modal.style.display = 'flex';
}

function closeTreatmentModal() {
  const modal = document.getElementById('treatment-modal');
  if (modal) modal.style.display = 'none';
}

async function saveTreatmentForm(e) {
  e.preventDefault();
  const id = document.getElementById('treatment-form-id').value;
  const patientId = document.getElementById('treatment-patient-id').value;
  const treatment_name = document.getElementById('treatment-name').value;
  const treatment_type = document.getElementById('treatment-type').value;
  const start_date = document.getElementById('treatment-start-date').value;
  const end_date = document.getElementById('treatment-end-date').value || null;
  const dosage_instructions = document.getElementById('treatment-dosage').value;
  const status = document.getElementById('treatment-status').value;
  const results_obtained = document.getElementById('treatment-results').value;

  try {
    if (id) {
      await api.request(`/patients/treatments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ treatment_name, treatment_type, start_date, end_date, dosage_instructions, status, results_obtained })
      });
      showToast('Traitement et résultats mis à jour!');
    } else {
      await api.request(`/patients/${patientId}/treatments`, {
        method: 'POST',
        body: JSON.stringify({ treatment_name, treatment_type, start_date, end_date, dosage_instructions, status, results_obtained })
      });
      showToast('Nouveau traitement enregistré!');
    }
    closeTreatmentModal();
    openDPIModal(patientId, activeDPIPatient.name);
  } catch (err) {
    showToast(`Erreur: ${err.message}`, 'error');
  }
}

async function deleteTreatmentRecord(treatmentId, patientId) {
  if (!confirm('Supprimer ce traitement ?')) return;
  try {
    await api.request(`/patients/treatments/${treatmentId}`, { method: 'DELETE' });
    showToast('Traitement supprimé.');
    openDPIModal(patientId, activeDPIPatient.name);
  } catch (err) {
    showToast(`Erreur: ${err.message}`, 'error');
  }
}

// -------------------------------------------------------------
// Lab Orders & Results Actions
// -------------------------------------------------------------
// Lab Orders & Examination Handlers (Prescriptions & Scans)
// -------------------------------------------------------------
function openCreateLabOrderModal(patientId) {
  const modal = document.getElementById('lab-order-modal');
  if (!modal) return;

  document.getElementById('lab-order-patient-id').value = patientId;
  const titleEl = document.getElementById('lab-order-modal-title');
  if (titleEl) titleEl.innerHTML = `<i class="fas fa-microscope" style="color:var(--primary);"></i> Prescrire un Examen / Analyse Médicale`;
  
  document.getElementById('lab-order-test-name').value = '';
  document.getElementById('lab-order-category').value = 'Biologie';
  document.getElementById('lab-order-priority').value = 'NORMALE';
  document.getElementById('lab-order-notes').value = '';
  document.getElementById('lab-order-doc-url').value = '';

  clearUploadedDocument('lab-order-doc-url', 'lab-order-preview-box');

  modal.style.display = 'flex';
}

function openImportExternalLabModal(patientId) {
  const modal = document.getElementById('lab-order-modal');
  if (!modal) return;

  document.getElementById('lab-order-patient-id').value = patientId;
  const titleEl = document.getElementById('lab-order-modal-title');
  if (titleEl) titleEl.innerHTML = `<i class="fas fa-scanner-image" style="color:var(--primary);"></i> Scanner / Importer un Bilan d'Analyse Externe`;
  
  document.getElementById('lab-order-test-name').value = '';
  document.getElementById('lab-order-category').value = 'Biologie';
  document.getElementById('lab-order-priority').value = 'NORMALE';
  document.getElementById('lab-order-notes').value = 'Document / scan d\'analyse apporté par le patient';
  document.getElementById('lab-order-doc-url').value = '';

  clearUploadedDocument('lab-order-doc-url', 'lab-order-preview-box');

  modal.style.display = 'flex';
}

function closeLabOrderModal() {
  const modal = document.getElementById('lab-order-modal');
  if (modal) modal.style.display = 'none';
}

async function saveLabOrderForm(e) {
  e.preventDefault();
  const patientId = document.getElementById('lab-order-patient-id').value;
  const test_name = document.getElementById('lab-order-test-name').value;
  const category = document.getElementById('lab-order-category').value;
  const priority = document.getElementById('lab-order-priority').value;
  const clinical_notes = document.getElementById('lab-order-notes').value;
  const document_url = document.getElementById('lab-order-doc-url').value;

  try {
    await api.request(`/patients/${patientId}/lab-orders`, {
      method: 'POST',
      body: JSON.stringify({
        test_name,
        category,
        priority,
        clinical_notes,
        document_url,
        status: document_url ? 'TERMINE' : 'A_FAIRE'
      })
    });
    showToast('Examen et document médical enregistrés avec succès !', 'success');
    closeLabOrderModal();
    openDPIModal(patientId, activeDPIPatient.name);
  } catch (err) {
    showToast(`Erreur: ${err.message}`, 'error');
  }
}

function openRecordLabResultModal(labOrderId) {
  const modal = document.getElementById('lab-result-modal');
  if (!modal || !currentDossierData) return;

  const list = currentDossierData.labOrders || currentDossierData.lab_orders || [];
  const lo = list.find(item => item.id === labOrderId);
  if (!lo) return;

  document.getElementById('lab-result-id').value = lo.id;
  document.getElementById('lab-result-patient-id').value = lo.patient_id;
  document.getElementById('lab-result-test-title').innerText = lo.test_name;
  document.getElementById('lab-result-status').value = lo.status === 'A_FAIRE' ? 'TERMINE' : lo.status;
  document.getElementById('lab-result-text').value = lo.results_text || '';
  document.getElementById('lab-result-doc-url').value = lo.document_url || '';

  const previewBox = document.getElementById('lab-result-preview-box');
  if (previewBox) {
    if (lo.document_url) {
      const isPdf = lo.document_url.toLowerCase().includes('.pdf');
      previewBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:10px 14px; margin-top:8px;">
          <div style="display:flex; align-items:center; gap:10px; font-size:0.85rem; color:#166534;">
            <i class="${isPdf ? 'fas fa-file-pdf fa-2x' : 'fas fa-file-image fa-2x'}" style="color:${isPdf ? '#ef4444' : '#2563eb'};"></i>
            <div>
              <div style="font-weight:700;">Document / Scan actuel attaché</div>
              <div style="font-size:0.75rem; color:#15803d;">Archivé en ligne sur le serveur sécurisé</div>
            </div>
          </div>
          <div style="display:flex; gap:6px;">
            <button type="button" class="btn btn-primary btn-sm" onclick="viewUploadedDocument('${lo.document_url}', '${lo.test_name.replace(/'/g, "\\'")}')" style="font-size:0.75rem; padding:4px 10px;">
              <i class="fas fa-eye"></i> Visualiser
            </button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="clearUploadedDocument('lab-result-doc-url', 'lab-result-preview-box')" style="font-size:0.75rem; padding:4px 8px; color:#b91c1c;" title="Supprimer ce scan">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      `;
      previewBox.style.display = 'block';
    } else {
      previewBox.innerHTML = '';
      previewBox.style.display = 'none';
    }
  }

  modal.style.display = 'flex';
}

function closeLabResultModal() {
  const modal = document.getElementById('lab-result-modal');
  if (modal) modal.style.display = 'none';
}

async function saveLabResultForm(e) {
  e.preventDefault();
  const id = document.getElementById('lab-result-id').value;
  const patientId = document.getElementById('lab-result-patient-id').value;
  const status = document.getElementById('lab-result-status').value;
  const results_text = document.getElementById('lab-result-text').value;
  const document_url = document.getElementById('lab-result-doc-url').value;

  try {
    await api.request(`/patients/lab-orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status, results_text, document_url })
    });
    showToast('Résultats d\'analyse et scan enregistrés avec succès !', 'success');
    closeLabResultModal();
    openDPIModal(patientId, activeDPIPatient.name);
  } catch (err) {
    showToast(`Erreur: ${err.message}`, 'error');
  }
}

async function deleteLabOrderRecord(labOrderId, patientId) {
  if (!confirm('Supprimer cette analyse / examen ?')) return;
  try {
    await api.request(`/patients/lab-orders/${labOrderId}`, { method: 'DELETE' });
    showToast('Examen supprimé.');
    openDPIModal(patientId, activeDPIPatient.name);
  } catch (err) {
    showToast(`Erreur: ${err.message}`, 'error');
  }
}

// ============================================================================
// Confidential Medical Record Access Grants & Delegation Handlers
// ============================================================================
let currentGrantsList = [];
let allPractitionersList = [];

async function openAccessGrantsModal(patientId, patientName) {
  const modal = document.getElementById('patient-access-modal');
  if (!modal) return;

  document.getElementById('grant-patient-id').value = patientId;
  document.getElementById('patient-access-modal-title').innerHTML = `<i class="fas fa-user-shield" style="color:var(--primary);"></i> Autorisations & Accès : ${patientName}`;
  document.getElementById('grant-reason').value = '';
  document.getElementById('grant-expires').value = '';

  // Load practitioners for select dropdown
  if (!allPractitionersList || allPractitionersList.length === 0) {
    allPractitionersList = await api.request('/practitioners').catch(() => []);
  }

  const select = document.getElementById('grant-practitioner-id');
  if (select) {
    select.innerHTML = `
      <option value="">-- Sélectionner un Praticien --</option>
      ${allPractitionersList.map(pr => `
        <option value="${pr.id}">${pr.title || 'Dr.'} ${pr.first_name} ${pr.last_name} (${pr.specialty_name || 'Médecine Générale'})</option>
      `).join('')}
    `;
  }

  modal.style.display = 'flex';
  await loadPatientAccessGrants(patientId);
}

async function loadPatientAccessGrants(patientId) {
  const tbody = document.getElementById('grant-table-body');
  if (!tbody) return;

  tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:15px; color:var(--text-muted);"><i class="fas fa-spinner fa-spin"></i> Chargement...</td></tr>`;

  try {
    const list = await api.request(`/patients/${patientId}/access-grants`);
    currentGrantsList = list || [];

    if (currentGrantsList.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center; padding:20px; color:var(--text-muted);">
            <i class="fas fa-shield-alt"></i> Aucune délégation active. Seul le médecin traitant et l'administrateur ont accès.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = currentGrantsList.map(g => {
      const isExpired = g.expires_at && new Date(g.expires_at) < new Date();
      const expiresFormatted = g.expires_at ? new Date(g.expires_at).toLocaleString() : '<span style="color:var(--success); font-weight:600;">Permanent</span>';
      const docName = g.prac_first ? `${g.prac_title || 'Dr.'} ${g.prac_first} ${g.prac_last}` : (g.user_first ? `${g.user_first} ${g.user_last}` : 'Utilisateur');
      const grantedBy = g.granted_by_first ? `${g.granted_by_first} ${g.granted_by_last}` : 'Admin';

      return `
        <tr style="opacity: ${isExpired ? 0.5 : 1};">
          <td>
            <strong style="color:var(--text-primary);">${docName}</strong>
            <div style="font-size:0.75rem; color:var(--text-muted);">${g.prac_specialty || ''}</div>
          </td>
          <td>
            <span class="badge ${g.access_type === 'READ_WRITE' ? 'badge-primary' : 'badge-secondary'}" style="font-size:0.75rem;">
              ${g.access_type === 'READ_WRITE' ? 'Lecture & Écriture' : 'Lecture Seule'}
            </span>
          </td>
          <td><span style="font-size:0.82rem;">${g.reason || '-'}</span></td>
          <td><span style="font-size:0.8rem; color:var(--text-muted);">${grantedBy}</span></td>
          <td>
            <span style="font-size:0.8rem;">
              ${isExpired ? '<span class="badge badge-danger">Expiré</span> ' : ''}${expiresFormatted}
            </span>
          </td>
          <td style="text-align:right;">
            <button class="btn btn-danger btn-sm" onclick="revokeGrant('${g.id}')" style="padding:3px 8px; font-size:0.75rem;" title="Révoquer l'autorisation">
              <i class="fas fa-times-circle"></i> Révoquer
            </button>
          </td>
        </tr>
      `;
    }).join('');
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:15px; color:var(--danger);">Erreur: ${err.message}</td></tr>`;
  }
}

function closeAccessGrantsModal() {
  const modal = document.getElementById('patient-access-modal');
  if (modal) modal.style.display = 'none';
}

async function submitGrantForm(e) {
  e.preventDefault();
  const patientId = document.getElementById('grant-patient-id').value;
  const practitioner_id = document.getElementById('grant-practitioner-id').value;
  const access_type = document.getElementById('grant-access-type').value;
  const reason = document.getElementById('grant-reason').value.trim();
  const expiresVal = document.getElementById('grant-expires').value;
  const expires_at = expiresVal ? new Date(expiresVal).toISOString() : null;

  if (!practitioner_id) {
    showToast('Veuillez sélectionner un praticien confrère.', 'warning');
    return;
  }

  try {
    await api.request(`/patients/${patientId}/access-grants`, {
      method: 'POST',
      body: JSON.stringify({
        practitioner_id,
        access_type,
        reason,
        expires_at
      })
    });

    showToast('Autorisation accordée avec succès !', 'success');
    document.getElementById('grant-reason').value = '';
    document.getElementById('grant-expires').value = '';
    document.getElementById('grant-practitioner-id').value = '';
    await loadPatientAccessGrants(patientId);
  } catch (err) {
    showToast(`Erreur : ${err.message}`, 'danger');
  }
}

async function revokeGrant(grantId) {
  const patientId = document.getElementById('grant-patient-id').value;
  if (!confirm('Êtes-vous sûr de vouloir révoquer cette autorisation d\'accès ?')) return;

  try {
    await api.request(`/patients/${patientId}/access-grants/${grantId}`, {
      method: 'DELETE'
    });
    showToast('Autorisation révoquée.', 'success');
    await loadPatientAccessGrants(patientId);
  } catch (err) {
    showToast(`Erreur : ${err.message}`, 'danger');
  }
}

// -------------------------------------------------------------
// New Consultation, Edit & Duplicate from DPI with Specialty Filtering
// -------------------------------------------------------------
window._cachedPractitioners = [];
window._filteredPrescriptionMedications = [];

async function loadConsultationPractitionersAndMedications(defaultPracId) {
  try {
    const pracList = await api.request('/practitioners').catch(() => []);
    window._cachedPractitioners = pracList || [];

    const select = document.getElementById('dpi-practitioner-select');
    if (!select) return;

    if (window._cachedPractitioners.length === 0) {
      select.innerHTML = '<option value="">-- Aucun médecin configuré --</option>';
      await loadPrescriptionMedicationsForSpecialty('GENERAL');
      return;
    }

    select.innerHTML = window._cachedPractitioners.map(p => {
      const spec = (p.specialties && p.specialties[0] ? p.specialties[0].name : '') || p.specialty_name || 'Médecine Générale';
      const specCode = (p.specialties && p.specialties[0] ? p.specialties[0].code : '') || p.specialty_code || (p.grade && p.grade.includes('Cardio') ? 'CARDIO' : 'GENERAL');
      return `<option value="${p.id}" data-spec-code="${specCode}" data-spec-name="${spec}">${p.title || 'Dr'} ${p.first_name} ${p.last_name} (${spec})</option>`;
    }).join('');

    if (defaultPracId) {
      select.value = defaultPracId;
    } else {
      // Default to first practitioner or match logged in doctor email
      const matched = window._cachedPractitioners.find(p => p.email && state.user && p.email.toLowerCase() === state.user.email?.toLowerCase());
      if (matched) {
        select.value = matched.id;
      } else {
        select.selectedIndex = 0;
      }
    }

    await onConsultationPractitionerChange();
  } catch (err) {
    console.error('Error loading consultation practitioners:', err);
  }
}

async function onConsultationPractitionerChange() {
  const select = document.getElementById('dpi-practitioner-select');
  if (!select) return;

  const selectedOpt = select.selectedOptions[0];
  const specCode = selectedOpt ? selectedOpt.dataset.specCode || 'GENERAL' : 'GENERAL';
  const specName = selectedOpt ? selectedOpt.dataset.specName || 'Médecine Générale' : 'Médecine Générale';

  const badgeNameEl = document.getElementById('dpi-active-spec-name');
  if (badgeNameEl) {
    badgeNameEl.innerText = specName;
  }

  const noticeEl = document.getElementById('rx-specialty-filter-notice');
  if (noticeEl) {
    noticeEl.innerHTML = `<i class="fas fa-filter"></i> Filtré : ${specName} + Médicaments généraux`;
  }

  await loadPrescriptionMedicationsForSpecialty(specCode);
}

async function loadPrescriptionMedicationsForSpecialty(specialtyCode) {
  try {
    const meds = await api.request(`/inventory/items?specialty=${encodeURIComponent(specialtyCode || 'GENERAL')}`).catch(() => []);
    window._filteredPrescriptionMedications = meds || [];

    const datalist = document.getElementById('rx-medications-datalist');
    if (datalist) {
      datalist.innerHTML = window._filteredPrescriptionMedications.map(m => {
        const isGeneral = !m.target_specialty || ['GENERAL', 'MED-GEN', 'TOUS'].includes(m.target_specialty.toUpperCase());
        const tag = isGeneral ? '💊 [Général]' : `🩺 [${m.target_specialty}]`;
        return `<option value="${m.name}">${tag} - ${m.name} (${parseFloat(m.selling_price || 0).toLocaleString()} XOF)</option>`;
      }).join('');
    }

    // Populate quick suggestion pills (top 6 medications)
    const pillsContainer = document.getElementById('rx-quick-pills-container');
    if (pillsContainer) {
      const topMeds = window._filteredPrescriptionMedications.slice(0, 7);
      if (topMeds.length > 0) {
        pillsContainer.innerHTML = `
          <div style="font-size:0.75rem; color:var(--text-muted); width:100%; margin-bottom:2px;">Suggestions rapides (cliquez pour insérer) :</div>
          ${topMeds.map(m => {
            const isSpec = m.target_specialty && !['GENERAL', 'MED-GEN', 'TOUS'].includes(m.target_specialty.toUpperCase());
            const safeName = (m.name || '').replace(/'/g, "\\'");
            const safeDosage = (m.default_dosage || '1 cp matin et soir').replace(/'/g, "\\'");
            return `
              <button type="button" class="btn btn-outline" style="font-size:0.75rem; padding:3px 9px; border-radius:14px; border:1px solid ${isSpec ? 'rgba(239,68,68,0.3)' : 'rgba(37,99,235,0.3)'}; background:${isSpec ? 'rgba(239,68,68,0.06)' : 'rgba(37,99,235,0.06)'}; color:${isSpec ? 'var(--danger)' : 'var(--primary)'}; font-weight:600;" onclick="selectQuickMedication('${safeName}', '${safeDosage}')">
                <i class="fas ${isSpec ? 'fa-heartbeat' : 'fa-pills'}"></i> ${m.name.length > 25 ? m.name.substring(0, 25) + '...' : m.name}
              </button>
            `;
          }).join('')}
        `;
      } else {
        pillsContainer.innerHTML = '';
      }
    }
  } catch (err) {
    console.error('Error loading specialty medications:', err);
  }
}

function onRxDrugInput(val) {
  if (!val || !window._filteredPrescriptionMedications) return;
  const cleanVal = val.toLowerCase().trim();
  const matched = window._filteredPrescriptionMedications.find(m => m.name.toLowerCase() === cleanVal || m.name.toLowerCase().startsWith(cleanVal));
  if (matched && matched.default_dosage) {
    const dosageInput = document.getElementById('rx-dosage');
    if (dosageInput && !dosageInput.value.trim()) {
      dosageInput.value = matched.default_dosage;
    }
  }
}

function selectQuickMedication(name, defaultDosage) {
  const drugInput = document.getElementById('rx-drug');
  const dosageInput = document.getElementById('rx-dosage');
  if (drugInput) drugInput.value = name;
  if (dosageInput && defaultDosage) dosageInput.value = defaultDosage;
  const freqInput = document.getElementById('rx-frequency');
  if (freqInput && !freqInput.value) freqInput.value = '2 fois/jour';
}

async function openNewConsultationFromDPI() {
  if (!activeDPIPatient) return;
  currentPrescriptionItems = [];
  renderPrescriptionItems();
  
  const modal = document.getElementById('dpi-consultation-form-modal');
  if (modal) {
    const idEl = document.getElementById('dpi-consult-id');
    if (idEl) idEl.value = '';
    const titleEl = document.getElementById('dpi-consult-modal-title');
    if (titleEl) titleEl.innerText = 'Nouvelle Consultation';
    document.getElementById('dpi-consult-patient-name').innerText = activeDPIPatient.name;
    document.getElementById('dpi-reason').value = '';
    document.getElementById('dpi-diagnosis').value = '';
    document.getElementById('dpi-bp-sys').value = '';
    document.getElementById('dpi-bp-dia').value = '';
    document.getElementById('dpi-temp').value = '';
    document.getElementById('dpi-icd10').value = '';
    document.getElementById('dpi-confidential').value = '';
    const expEl = document.getElementById('dpi-rx-expiry');
    if (expEl) {
      const d = new Date();
      d.setDate(d.getDate() + 30);
      expEl.value = d.toISOString().split('T')[0];
    }
    
    await loadConsultationPractitionersAndMedications();
    modal.style.display = 'flex';
  }
}

async function openEditConsultationModal(consultId) {
  if (!activeDPIPatient || !currentDossierData) return;
  const consult = (currentDossierData.consultations || []).find(c => c.id === consultId);
  if (!consult) return;

  const modal = document.getElementById('dpi-consultation-form-modal');
  if (modal) {
    const idEl = document.getElementById('dpi-consult-id');
    if (idEl) idEl.value = consult.id;
    const titleEl = document.getElementById('dpi-consult-modal-title');
    if (titleEl) titleEl.innerText = 'Modifier la Consultation & Ordonnance';
    document.getElementById('dpi-consult-patient-name').innerText = activeDPIPatient.name;
    document.getElementById('dpi-reason').value = consult.reason_for_visit || '';
    document.getElementById('dpi-diagnosis').value = consult.diagnosis_text || '';
    document.getElementById('dpi-icd10').value = (consult.icd10_diagnosis_codes || []).join(', ');
    document.getElementById('dpi-confidential').value = consult.confidential_notes || '';

    const v = consult.vital_signs || {};
    document.getElementById('dpi-bp-sys').value = v.bp_systolic || '';
    document.getElementById('dpi-bp-dia').value = v.bp_diastolic || '';
    document.getElementById('dpi-temp').value = v.temperature_c || '';

    const rx = consult.prescription || (currentDossierData.prescriptions || []).find(p => p.consultation_id === consult.id);
    if (rx && Array.isArray(rx.items)) {
      currentPrescriptionItems = rx.items.map(i => ({
        drug_name: i.drug_name,
        dosage: i.dosage,
        frequency: i.frequency,
        duration_days: i.duration_days,
        instructions: i.instructions || ''
      }));
      const expEl = document.getElementById('dpi-rx-expiry');
      if (expEl && rx.valid_until) {
        expEl.value = new Date(rx.valid_until).toISOString().split('T')[0];
      }
    } else {
      currentPrescriptionItems = [];
    }
    renderPrescriptionItems();
    await loadConsultationPractitionersAndMedications(consult.practitioner_id);
    modal.style.display = 'flex';
  }
}

async function duplicateConsultationPrescription(consultId) {
  if (!activeDPIPatient || !currentDossierData) return;
  const consult = (currentDossierData.consultations || []).find(c => c.id === consultId);
  if (!consult) return;

  const modal = document.getElementById('dpi-consultation-form-modal');
  if (modal) {
    const idEl = document.getElementById('dpi-consult-id');
    if (idEl) idEl.value = ''; // new record for renewal!
    const titleEl = document.getElementById('dpi-consult-modal-title');
    if (titleEl) titleEl.innerText = 'Renouvellement d\'Ordonnance';
    document.getElementById('dpi-consult-patient-name').innerText = activeDPIPatient.name;
    document.getElementById('dpi-reason').value = consult.reason_for_visit.startsWith('Renouvellement') ? consult.reason_for_visit : `Renouvellement : ${consult.reason_for_visit}`;
    document.getElementById('dpi-diagnosis').value = consult.diagnosis_text || '';
    document.getElementById('dpi-icd10').value = (consult.icd10_diagnosis_codes || []).join(', ');
    document.getElementById('dpi-confidential').value = '';

    const v = consult.vital_signs || {};
    document.getElementById('dpi-bp-sys').value = v.bp_systolic || '';
    document.getElementById('dpi-bp-dia').value = v.bp_diastolic || '';
    document.getElementById('dpi-temp').value = v.temperature_c || '';

    const rx = consult.prescription || (currentDossierData.prescriptions || []).find(p => p.consultation_id === consult.id);
    if (rx && Array.isArray(rx.items)) {
      currentPrescriptionItems = rx.items.map(i => ({
        drug_name: i.drug_name,
        dosage: i.dosage,
        frequency: i.frequency,
        duration_days: i.duration_days,
        instructions: i.instructions || ''
      }));
    } else {
      currentPrescriptionItems = [];
    }

    const expEl = document.getElementById('dpi-rx-expiry');
    if (expEl) {
      const d = new Date();
      d.setDate(d.getDate() + 30);
      expEl.value = d.toISOString().split('T')[0];
    }

    renderPrescriptionItems();
    await loadConsultationPractitionersAndMedications(consult.practitioner_id);
    modal.style.display = 'flex';
    showToast('Ordonnance dupliquée pour renouvellement. Vous pouvez ajuster les posologies et valider.', 'info');
  }
}

async function deleteConsultationConfirm(consultId) {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette consultation et son ordonnance associée ?')) return;

  try {
    await api.request(`/clinical/consultations/${consultId}`, { method: 'DELETE' });
    showToast('Consultation supprimée avec succès !', 'success');
    if (activeDPIPatient) {
      openDPIModal(activeDPIPatient.id, activeDPIPatient.name);
    }
  } catch (err) {
    showToast(`Erreur : ${err.message}`, 'danger');
  }
}

function closeNewConsultationModal() {
  const modal = document.getElementById('dpi-consultation-form-modal');
  if (modal) modal.style.display = 'none';
}

function addPrescriptionItem() {
  const drug_name = document.getElementById('rx-drug').value.trim();
  const dosage = document.getElementById('rx-dosage').value.trim();
  const frequency = document.getElementById('rx-frequency').value.trim();
  const duration_days = parseInt(document.getElementById('rx-duration').value);
  const instructions = document.getElementById('rx-instructions').value.trim();

  if (!drug_name || !dosage || !frequency || !duration_days) {
    showToast('Veuillez renseigner le médicament, dosage, fréquence et durée', 'error');
    return;
  }

  currentPrescriptionItems.push({ drug_name, dosage, frequency, duration_days, instructions });
  renderPrescriptionItems();

  // Clear inputs
  document.getElementById('rx-drug').value = '';
  document.getElementById('rx-dosage').value = '';
  document.getElementById('rx-frequency').value = '';
  document.getElementById('rx-duration').value = '5';
  document.getElementById('rx-instructions').value = '';
}

function renderPrescriptionItems() {
  const container = document.getElementById('rx-items-list');
  if (!container) return;
  if (currentPrescriptionItems.length === 0) {
    container.innerHTML = '<div style="color:var(--text-muted); font-size:0.85rem;">Aucun médicament prescrit</div>';
    return;
  }

  container.innerHTML = `
    <table class="table" style="margin-top:10px;">
      <thead>
        <tr>
          <th>Désignation</th>
          <th>Dosage</th>
          <th>Fréquence</th>
          <th>Durée</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${currentPrescriptionItems.map((item, index) => `
          <tr>
            <td><strong>${item.drug_name}</strong></td>
            <td>${item.dosage}</td>
            <td>${item.frequency}</td>
            <td>${item.duration_days} jours</td>
            <td><i class="fas fa-trash text-danger" style="cursor:pointer;" onclick="removePrescriptionItem(${index})"></i></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function removePrescriptionItem(index) {
  currentPrescriptionItems.splice(index, 1);
  renderPrescriptionItems();
}

async function submitConsultation(e) {
  e.preventDefault();
  const consultId = document.getElementById('dpi-consult-id')?.value || null;
  const reason_for_visit = document.getElementById('dpi-reason').value;
  const diagnosis_text = document.getElementById('dpi-diagnosis').value;
  const icd10 = document.getElementById('dpi-icd10').value;
  const confidential_notes = document.getElementById('dpi-confidential').value;
  
  const bp_systolic = parseInt(document.getElementById('dpi-bp-sys').value) || null;
  const bp_diastolic = parseInt(document.getElementById('dpi-bp-dia').value) || null;
  const temp = parseFloat(document.getElementById('dpi-temp').value) || null;

  const icd10_diagnosis_codes = icd10 ? icd10.split(',').map(s => s.trim()) : [];

  const selectedPracId = document.getElementById('dpi-practitioner-select')?.value;
  const practitioner_id = selectedPracId || (window._cachedPractitioners && window._cachedPractitioners.length > 0 ? window._cachedPractitioners[0].id : null);

  const payload = {
    patient_id: activeDPIPatient.id,
    practitioner_id,
    reason_for_visit,
    diagnosis_text,
    icd10_diagnosis_codes,
    confidential_notes,
    vital_signs: {
      bp_systolic,
      bp_diastolic,
      temperature_c: temp
    }
  };

  // Auto-include pending medication if user typed into input fields without clicking + Ajouter
  const pendingDrug = (document.getElementById('rx-drug')?.value || '').trim();
  const pendingDosage = (document.getElementById('rx-dosage')?.value || '').trim();
  const pendingFrequency = (document.getElementById('rx-frequency')?.value || '').trim();
  const pendingDuration = parseInt(document.getElementById('rx-duration')?.value || '5', 10);
  const pendingInstructions = (document.getElementById('rx-instructions')?.value || '').trim();

  if (pendingDrug) {
    currentPrescriptionItems.push({
      drug_name: pendingDrug,
      dosage: pendingDosage || '1 cp',
      frequency: pendingFrequency || '2x/jour',
      duration_days: isNaN(pendingDuration) || pendingDuration <= 0 ? 5 : pendingDuration,
      instructions: pendingInstructions
    });
  }

  if (currentPrescriptionItems.length > 0) {
    payload.prescription = {
      valid_until: document.getElementById('dpi-rx-expiry')?.value || null,
      items: currentPrescriptionItems
    };
  }

  try {
    let res;
    if (consultId) {
      res = await api.request(`/clinical/consultations/${consultId}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      showToast('Consultation et ordonnance mises à jour avec succès !', 'success');
    } else {
      res = await api.request('/clinical/consultations', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      showToast('Nouvelle consultation et ordonnance enregistrées !', 'success');
    }

    closeNewConsultationModal();
    if (activeDPIPatient) {
      await openDPIModal(activeDPIPatient.id, activeDPIPatient.name);
      activeDPITab = 'consultations';
      renderDPI360Modal();
    }
    
    // If prescription exists, open official print preview
    const rxObj = res.prescription;
    if (rxObj && (rxObj.id || rxObj.prescription_code)) {
      openPrescriptionPrintModal(rxObj.id || rxObj.prescription_code);
    }
  } catch (err) {
    showToast(`Erreur : ${err.message}`, 'danger');
  }
}

// -------------------------------------------------------------
// Official Printable Prescription Sheet Modal (Anti-Fraud QR)
// -------------------------------------------------------------
let currentPrintPrescriptionData = null;

function createPrescriptionPrintModalContainer() {
  let modal = document.getElementById('prescription-print-modal');
  if (!modal) {
    const div = document.createElement('div');
    div.className = 'modal-overlay';
    div.id = 'prescription-print-modal';
    div.style.cssText = 'display:none; justify-content:center; align-items:center; z-index:3000;';
    div.innerHTML = `
      <div class="modal-container" style="width:840px; max-width:96%; max-height:92vh; overflow-y:auto; padding:20px; animation: modalFadeIn 0.3s ease;">
        <div id="prescription-print-body"></div>
      </div>
    `;
    document.body.appendChild(div);
    modal = div;
  } else {
    modal.style.zIndex = '3000';
  }
  return modal;
}

async function openPrescriptionPrintModal(prescriptionId) {
  if (!prescriptionId || prescriptionId === 'undefined' || prescriptionId === 'null') {
    return;
  }
  const modal = createPrescriptionPrintModalContainer();

  // 1. First, search locally in currentDossierData for instant display without waiting or failing
  let localRx = null;
  if (currentDossierData) {
    localRx = (currentDossierData.prescriptions || []).find(p => p.id === prescriptionId || p.prescription_code === prescriptionId || p.consultation_id === prescriptionId);
    if (!localRx && Array.isArray(currentDossierData.consultations)) {
      for (const c of currentDossierData.consultations) {
        if (c.id === prescriptionId || (c.prescription && (c.prescription.id === prescriptionId || c.prescription.prescription_code === prescriptionId))) {
          localRx = c.prescription ? {
            ...c.prescription,
            doc_first: c.doc_first,
            doc_last: c.doc_last,
            doc_title: c.doc_title,
            doc_specialty: c.doc_specialty,
            doc_license: c.doc_license
          } : null;
          break;
        }
      }
    }
  }

  if (localRx) {
    const pat = currentDossierData?.patient || activeDPIPatient || {};
    const t = state.tenant || {};
    currentPrintPrescriptionData = {
      ...localRx,
      patient_first: localRx.patient_first || pat.first_name || pat.first || '',
      patient_last: localRx.patient_last || pat.last_name || pat.last || '',
      patient_code: localRx.patient_code || pat.patient_code || pat.code || 'SM-0000',
      date_of_birth: localRx.date_of_birth || pat.date_of_birth,
      gender: localRx.gender || pat.gender,
      clinic_name: localRx.clinic_name || t.name || 'CLINIQUE MÉDICALE',
      clinic_address: localRx.clinic_address || t.address || '',
      clinic_phone: localRx.clinic_phone || t.phone_number || '',
      clinic_email: localRx.clinic_email || t.email || '',
      ninea_rc: localRx.ninea_rc || t.ninea_rc || '',
      clinic_logo: localRx.clinic_logo || t.logo_url || '',
      clinic_stamp: localRx.clinic_stamp || t.stamp_url || '',
      items: localRx.items || []
    };
    renderPrescriptionPrintModalContent();
    modal.style.display = 'flex';
  }

  // 2. Fetch latest details from backend in background to ensure fresh data
  try {
    const data = await api.request(`/clinical/prescriptions/${prescriptionId}`);
    if (data && (data.prescription_code || data.id)) {
      currentPrintPrescriptionData = data;
      renderPrescriptionPrintModalContent();
      modal.style.display = 'flex';
    }
  } catch (err) {
    if (!currentPrintPrescriptionData) {
      console.warn('Prescription details lookup notice:', err.message);
    }
  }
}

function closePrescriptionPrintModal() {
  const modal = document.getElementById('prescription-print-modal');
  if (modal) modal.style.display = 'none';
}

function renderPrescriptionPrintModalContent() {
  if (!currentPrintPrescriptionData) return;
  const rx = currentPrintPrescriptionData;
  const container = document.getElementById('prescription-print-body');
  if (!container) return;

  const issuedDateStr = rx.issued_at ? new Date(rx.issued_at).toLocaleDateString('fr-FR') : new Date().toLocaleDateString('fr-FR');
  const validUntilStr = rx.valid_until ? new Date(rx.valid_until).toLocaleDateString('fr-FR') : 'Non spécifiée';
  const verifyUrl = `${window.location.origin}/api/rx/verify/${rx.prescription_code}?h=${rx.qr_cryptographic_hash}`;
  const qrImgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(verifyUrl)}`;

  const items = Array.isArray(rx.items) ? rx.items : [];

  // Calculate patient age
  let patientAgeStr = '';
  if (rx.date_of_birth) {
    const dob = new Date(rx.date_of_birth);
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    const age = Math.abs(ageDt.getUTCFullYear() - 1970);
    patientAgeStr = ` • ${age} ans`;
  }

  container.innerHTML = `
    <!-- Top Action Bar -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;" class="no-print">
      <div style="display:flex; gap:8px; align-items:center;">
        <span class="badge" style="background:#1e40af; color:#fff; font-size:0.85rem; padding:5px 12px; border-radius:8px;">
          <i class="fas fa-file-prescription"></i> ${rx.prescription_code}
        </span>
        <span style="font-size:0.85rem; color:var(--text-muted);">
          Émise le ${issuedDateStr}
        </span>
      </div>
      <div style="display:flex; gap:8px;">
        <button class="btn btn-primary btn-sm" onclick="printPrescriptionDocument()" style="background:#2563eb; border-color:#2563eb; padding:7px 16px; font-weight:700;">
          <i class="fas fa-print"></i> Imprimer / Télécharger PDF
        </button>
        <button class="btn btn-secondary btn-sm" onclick="duplicateFromCurrentPrint()" style="color:#1e40af; border-color:#bfdbfe; background:#eff6ff; padding:7px 14px; font-weight:600;">
          <i class="fas fa-copy"></i> Renouveler cette Ordonnance
        </button>
        <button class="btn btn-secondary btn-sm" onclick="closePrescriptionPrintModal()">
          Fermer
        </button>
      </div>
    </div>

    <!-- Official Printable Sheet (A4 portrait style) -->
    <div id="prescription-sheet" style="background:#ffffff; color:#0f172a; padding:40px 45px; border-radius:8px; font-family:'Segoe UI', Arial, sans-serif; box-shadow:0 4px 20px rgba(0,0,0,0.08); border:1px solid #e2e8f0; line-height:1.5;">
      
      <!-- 1. CLINIC & DOCTOR HEADER -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:2px solid #2563eb; padding-bottom:18px; margin-bottom:22px;">
        <div style="display:flex; gap:16px; align-items:center; max-width:62%;">
          ${rx.clinic_logo ? `
            <img src="${rx.clinic_logo}" style="height:65px; max-width:120px; object-fit:contain; border-radius:6px;" alt="Logo" />
          ` : `
            <div style="width:58px; height:58px; border-radius:10px; background:linear-gradient(135deg, #1e40af, #2563eb); display:flex; align-items:center; justify-content:center; color:white; font-size:1.6rem;">
              <i class="fas fa-hospital-alt"></i>
            </div>
          `}
          <div>
            <h3 style="margin:0; font-size:1.15rem; font-weight:800; color:#1e3a8a; text-transform:uppercase; letter-spacing:0.5px;">${rx.clinic_name || 'CLINIQUE MÉDICALE'}</h3>
            <div style="font-size:0.8rem; color:#475569; margin-top:2px;">${rx.clinic_address || 'Dakar, Sénégal'}</div>
            <div style="font-size:0.78rem; color:#64748b;">Tél: ${rx.clinic_phone || '+221 33 000 00 00'} ${rx.clinic_email ? `• ${rx.clinic_email}` : ''}</div>
            ${rx.ninea_rc ? `<div style="font-size:0.72rem; color:#94a3b8;">NINEA / RC: ${rx.ninea_rc}</div>` : ''}
          </div>
        </div>

        <div style="text-align:right; max-width:38%;">
          <div style="font-size:1.05rem; font-weight:800; color:#0f172a;">${rx.doc_title || 'Dr.'} ${rx.doc_first || ''} ${rx.doc_last || ''}</div>
          <div style="font-size:0.85rem; color:#2563eb; font-weight:600;">${rx.doc_specialty || rx.doc_grade || 'Médecine Générale'}</div>
          ${rx.license_number ? `<div style="font-size:0.78rem; color:#64748b;">N° Inscription Ordre : <strong>${rx.license_number}</strong></div>` : ''}
          <div style="font-size:0.78rem; color:#64748b; margin-top:4px;">Fait le : <strong>${issuedDateStr}</strong></div>
        </div>
      </div>

      <!-- 2. PATIENT INFO BAR -->
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px 18px; margin-bottom:24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div>
          <div style="font-size:0.75rem; text-transform:uppercase; color:#64748b; font-weight:700; letter-spacing:0.5px;">PATIENT(E)</div>
          <div style="font-size:1.05rem; font-weight:800; color:#0f172a;">
            ${rx.patient_first} ${rx.patient_last}
            <span style="font-size:0.85rem; font-weight:500; color:#475569;">(${rx.gender || ''}${patientAgeStr})</span>
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:#64748b; font-weight:700; letter-spacing:0.5px;">IDENTIFIANT DOSSIER</div>
          <div style="font-size:0.95rem; font-weight:800; color:#1e40af; font-family:monospace;">${rx.patient_code || 'SM-0000'}</div>
        </div>
      </div>

      <!-- 3. PRESCRIPTION TITLE & BODY -->
      <div style="text-align:center; margin-bottom:22px;">
        <h2 style="margin:0; font-size:1.35rem; font-weight:900; color:#1e3a8a; text-transform:uppercase; letter-spacing:1.5px; border-bottom:2px solid #e2e8f0; display:inline-block; padding-bottom:4px;">
          ORDONNANCE MÉDICALE
        </h2>
        <div style="font-size:0.8rem; color:#64748b; margin-top:4px;">
          Valable jusqu'au : <strong>${validUntilStr}</strong>
        </div>
      </div>

      <!-- 4. MEDICATIONS LIST -->
      <div style="min-height:220px; margin-bottom:30px;">
        ${items.length === 0 ? `
          <div style="text-align:center; color:#94a3b8; font-style:italic; padding:30px;">Aucun médicament spécifié sur cette ordonnance.</div>
        ` : `
          <div style="display:flex; flex-direction:column; gap:16px;">
            ${items.map((item, idx) => `
              <div style="padding-bottom:12px; border-bottom:1px dashed #cbd5e1;">
                <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:4px;">
                  <span style="font-size:1.02rem; font-weight:800; color:#0f172a;">
                    ${idx + 1}. ${item.drug_name}
                  </span>
                  <span style="font-size:0.88rem; font-weight:700; color:#2563eb;">
                    Pendant ${item.duration_days} jours
                  </span>
                </div>
                <div style="font-size:0.9rem; color:#334155; padding-left:18px;">
                  • Posologie : <strong>${item.dosage}</strong> — <strong>${item.frequency}</strong>
                </div>
                ${item.instructions ? `
                  <div style="font-size:0.84rem; color:#64748b; font-style:italic; padding-left:18px; margin-top:2px;">
                    Conseils : ${item.instructions}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        `}
      </div>

      <!-- 5. FOOTER (CRYPTOGRAPHIC ANTI-FRAUD QR & DOCTOR STAMP / SIGNATURE) -->
      <div style="display:flex; justify-content:space-between; align-items:flex-end; border-top:1.5px solid #e2e8f0; padding-top:20px; margin-top:20px; gap:20px;">
        
        <!-- Left: Anti-fraud Verification QR & Hash -->
        <div style="display:flex; gap:14px; align-items:center; max-width:55%;">
          <img src="${qrImgUrl}" style="width:90px; height:90px; border:1px solid #cbd5e1; border-radius:6px; padding:3px; background:#fff;" alt="QR Code Sécurité" />
          <div style="font-size:0.73rem; color:#64748b; line-height:1.35;">
            <div style="font-weight:700; color:#1e40af; font-size:0.76rem; display:flex; align-items:center; gap:4px;">
              <i class="fas fa-shield-alt"></i> Sécurité Anti-Fraude
            </div>
            <div>Code : <strong style="font-family:monospace; color:#0f172a;">${rx.prescription_code}</strong></div>
            <div style="word-break:break-all; font-family:monospace; font-size:0.68rem; color:#94a3b8; margin-top:2px;">
              HMAC: ${rx.qr_cryptographic_hash ? rx.qr_cryptographic_hash.substring(0, 24) + '...' : ''}
            </div>
            <div style="font-size:0.68rem; color:#64748b; margin-top:3px;">
              Scannez le QR code pour authentifier cette prescription en pharmacie.
            </div>
          </div>
        </div>

        <!-- Right: Doctor Stamp & Signature Zone -->
        <div style="text-align:center; min-width:210px;">
          <div style="font-size:0.8rem; font-weight:700; color:#475569; margin-bottom:8px;">
            Signature & Cachet du Praticien
          </div>
          ${rx.clinic_stamp && !rx.clinic_stamp.includes('stamp-default.png') ? `
            <div style="text-align:center;">
              <img src="${rx.clinic_stamp}" style="max-height:85px; max-width:140px; object-fit:contain; mix-blend-mode:multiply;" alt="Cachet" />
            </div>
          ` : `
            <div style="height:75px; border:1.5px dashed #94a3b8; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#94a3b8; font-size:0.75rem;">
              [ Cachet & Signature ]
            </div>
          `}
          <div style="font-size:0.78rem; font-weight:700; color:#1e3a8a; margin-top:4px;">
            ${rx.doc_title || 'Dr.'} ${rx.doc_first || ''} ${rx.doc_last || ''}
          </div>
        </div>

      </div>

    </div>
  `;
}

function printPrescriptionDocument() {
  const sheet = document.getElementById('prescription-sheet');
  if (!sheet) return;
  
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>SoftMed - Ordonnance ${currentPrintPrescriptionData?.prescription_code || ''}</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <style>
        @page { size: A4 portrait; margin: 12mm 15mm; }
        body { 
          font-family: 'Segoe UI', Arial, sans-serif; 
          background: #ffffff !important; 
          color: #0f172a !important; 
          margin: 0; 
          padding: 10px; 
          -webkit-print-color-adjust: exact; 
          print-color-adjust: exact; 
        }
        * { box-sizing: border-box; }
        .no-print { display: none !important; }
      </style>
    </head>
    <body>
      ${sheet.outerHTML}
    </body>
    </html>
  `);
  doc.close();

  const images = doc.images;
  let loaded = 0;
  const total = images.length;
  
  const triggerPrint = () => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    }, 2000);
  };

  if (total === 0) {
    setTimeout(triggerPrint, 300);
  } else {
    for (let i = 0; i < total; i++) {
      if (images[i].complete) {
        loaded++;
      } else {
        images[i].onload = images[i].onerror = () => {
          loaded++;
          if (loaded >= total) triggerPrint();
        };
      }
    }
    if (loaded >= total) {
      setTimeout(triggerPrint, 300);
    } else {
      setTimeout(triggerPrint, 1000);
    }
  }
}

function duplicateFromCurrentPrint() {
  if (!currentPrintPrescriptionData) return;
  const consultId = currentPrintPrescriptionData.consultation_id;
  closePrescriptionPrintModal();
  if (consultId) {
    duplicateConsultationPrescription(consultId);
  } else {
    openNewConsultationFromDPI();
    currentPrescriptionItems = (currentPrintPrescriptionData.items || []).map(i => ({
      drug_name: i.drug_name,
      dosage: i.dosage,
      frequency: i.frequency,
      duration_days: i.duration_days,
      instructions: i.instructions
    }));
    renderPrescriptionItems();
    showToast('Ordonnance dupliquée ! Ajustez les posologies si besoin et validez.', 'info');
  }
}

function showPrescriptionConfirmation(rx) {
  const modal = document.getElementById('rx-confirmation-modal');
  if (!modal) return;
  document.getElementById('conf-rx-code').innerText = rx.prescription_code;
  document.getElementById('conf-rx-hash').innerText = rx.qr_cryptographic_hash;
  
  const verifyUrl = `${window.location.origin}/api/rx/verify/${rx.prescription_code}?h=${rx.qr_cryptographic_hash}`;
  document.getElementById('conf-rx-url').innerText = verifyUrl;
  document.getElementById('conf-rx-url').href = verifyUrl;
  
  modal.style.display = 'flex';
}

function closeRxConfirmModal() {
  document.getElementById('rx-confirmation-modal').style.display = 'none';
}

// -------------------------------------------------------------
// Patient Statuses CRUD Modal
// -------------------------------------------------------------
async function openPatientStatusModal() {
  const modal = document.getElementById('patient-status-modal');
  if (!modal) return;

  const list = await api.request('/patient-statuses').catch(() => []);
  allPatientStatuses = list;

  const listContainer = document.getElementById('patient-status-list');
  if (listContainer) {
    listContainer.innerHTML = list.length === 0 ? '<div style="color:var(--text-muted); padding:10px;">Aucun statut configuré</div>' : `
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${list.map(s => `
          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-primary); padding:8px 12px; border-radius:6px; border:1px solid var(--border-color);">
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="display:inline-block; width:14px; height:14px; border-radius:50%; background:${s.color_code};"></span>
              <strong>${s.name}</strong>
              <code style="font-size:0.75rem; color:var(--text-muted);">${s.code}</code>
              ${s.is_default ? `<span class="badge badge-success" style="font-size:0.65rem;">Par défaut</span>` : ''}
            </div>
            <button class="btn btn-danger btn-sm" onclick="deletePatientStatus('${s.id}')" style="padding:2px 6px; font-size:0.75rem; background:var(--danger); border-color:var(--danger);">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }

  modal.style.display = 'flex';
}

function closePatientStatusModal() {
  const modal = document.getElementById('patient-status-modal');
  if (modal) modal.style.display = 'none';
}

async function savePatientStatus(e) {
  e.preventDefault();
  const name = document.getElementById('status-name').value;
  const color_code = document.getElementById('status-color').value;
  const is_default = document.getElementById('status-is-default').checked;

  try {
    await api.request('/patient-statuses', {
      method: 'POST',
      body: JSON.stringify({ name, color_code, is_default })
    });
    showToast('Nouveau statut ajouté!');
    document.getElementById('status-name').value = '';
    openPatientStatusModal();
    if (state.currentTab === 'patients') {
      navigate('patients');
    }
  } catch (err) {
    showToast(`Erreur: ${err.message}`, 'error');
  }
}

async function deletePatientStatus(statusId) {
  if (!confirm('Supprimer ce statut ?')) return;
  try {
    await api.request(`/patient-statuses/${statusId}`, { method: 'DELETE' });
    showToast('Statut supprimé / désactivé.');
    openPatientStatusModal();
    if (state.currentTab === 'patients') {
      navigate('patients');
    }
  } catch (err) {
    showToast(`Erreur: ${err.message}`, 'error');
  }
}

// ============================================================================
// 4. Invoices & Billing cash register UI
// ============================================================================
let invoiceLines = [];
let activePaymentInvoice = null;
let activeBillingSubTab = 'invoices'; // 'invoices' or 'services'
let currentServiceCategoryFilter = 'ALL';

async function renderBilling(container) {
  if (activeBillingSubTab !== 'services') {
    activeBillingSubTab = 'invoices';
  }

  const [invoices, patients, registers, insurances, services, practitioners] = await Promise.all([
    api.request('/billing/invoices').catch(() => []),
    api.request('/patients').catch(() => []),
    api.request('/billing/cash-registers').catch(() => []),
    api.request('/billing/insurances').catch(() => []),
    api.request('/medical-services').catch(() => []),
    api.request('/practitioners').catch(() => [])
  ]);

  state.patients = patients;

  container.innerHTML = `
    <!-- Subtabs Navigation -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid var(--border-color); padding-bottom:12px; flex-wrap:wrap; gap:10px;">
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <button class="btn ${activeBillingSubTab === 'invoices' ? 'btn-primary' : 'btn-secondary'}" onclick="switchBillingSubTab('invoices')" style="font-size:0.9rem; padding:7px 18px;">
          <i class="fas fa-cash-register"></i> Caisse & Facturation
        </button>
        <button class="btn ${activeBillingSubTab === 'services' ? 'btn-primary' : 'btn-secondary'}" onclick="switchBillingSubTab('services')" style="font-size:0.9rem; padding:7px 18px;">
          <i class="fas fa-tags"></i> Prestations, Traitements & Tarifs (${services.length})
        </button>
      </div>

      ${activeBillingSubTab === 'services' ? `
        <button class="btn btn-primary" onclick="openCreateServiceModal()" style="font-size:0.85rem;">
          <i class="fas fa-plus"></i> Nouvel Acte / Traitement / Consultation
        </button>
      ` : ''}
    </div>

    <div id="billing-subtab-content">
      ${activeBillingSubTab === 'invoices' 
        ? renderBillingInvoicesContent(invoices, patients, registers, insurances, services, practitioners) 
        : renderBillingServicesContent(services)
      }
    </div>
  `;

  if (activeBillingSubTab === 'invoices') {
    renderInvoiceLines();
  }
}

function switchBillingSubTab(tab) {
  activeBillingSubTab = tab;
  navigate('billing');
}

// ============================================================================
// 4a. Dedicated IPM & Insurances View
// ============================================================================
async function renderInsurances(container) {
  const insurances = await api.request('/billing/insurances').catch(() => []);

  container.innerHTML = `
    <!-- Dedicated IPM Header -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid var(--border-color); padding-bottom:12px; flex-wrap:wrap; gap:10px;">
      <div>
        <h3 style="margin:0; font-size:1.25rem; font-weight:800; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
          <i class="fas fa-shield-alt" style="color:var(--primary);"></i> Répertoire des Organismes Tiers-Payant (IPM & Assurances)
          <span class="badge" style="background:#eff6ff; color:#1d4ed8; border:1px solid #bfdbfe; font-size:0.8rem; font-weight:700;">${insurances.length} conventions</span>
        </h3>
        <p style="margin:4px 0 0 0; font-size:0.85rem; color:var(--text-muted);">
          Gestion des conventions IPM, compagnies d'assurance, taux de couverture et conditions de règlement.
        </p>
      </div>

      <button class="btn btn-primary" onclick="openCreateInsuranceModal()" style="font-size:0.9rem; padding:8px 18px; font-weight:700;">
        <i class="fas fa-plus"></i> Nouvelle IPM / Assurance
      </button>
    </div>

    <div id="insurances-view-content">
      ${renderBillingInsurancesContent(insurances)}
    </div>
  `;
}

function renderBillingInvoicesContent(invoices, patients, registers, insurances, services, practitioners = []) {
  return `
    <div class="agenda-grid" style="grid-template-columns: 420px 1fr;">
      <div>
        <div class="card" id="cash-session-card">
          <!-- Session open/close state render dynamically -->
          ${state.activeCashSession ? `
            <div class="card-title text-success"><i class="fas fa-check-circle"></i> ${t('activeSession')}</div>
            <div style="font-size:0.9rem; line-height:1.6; margin-bottom:15px;">
              <div><strong>${t('cashier')}:</strong> ${state.user.first_name} ${state.user.last_name}</div>
              <div><strong>ID Session:</strong> <code style="font-size:0.75rem;">${state.activeCashSession.id.substring(0,8)}...</code></div>
              <div><strong>${t('openingBalance')}:</strong> ${state.activeCashSession.opening_balance.toLocaleString()} FCFA</div>
            </div>
            <form onsubmit="closeSession(event)">
              <div class="form-group">
                <label class="form-label">${t('declaredBalance')}</label>
                <input type="number" class="form-control" id="close-declared" required />
              </div>
              <button class="btn btn-danger" style="width:100%;"><i class="fas fa-lock"></i> ${t('closeBtn')}</button>
            </form>
          ` : `
            <div class="card-title"><i class="fas fa-key"></i> ${t('openSession')}</div>
            <form onsubmit="openSession(event)">
              <div class="form-group">
                <label class="form-label">${t('selectRegister')}</label>
                <select class="form-control" id="open-register-id" required>
                  ${registers.length > 0 ? registers.map(r => `<option value="${r.id}">${r.name}</option>`).join('') : '<option value="">Aucune caisse enregistrée</option>'}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">${t('openingBalance')}</label>
                <input type="number" class="form-control" id="open-balance" value="50000" required />
              </div>
              <button class="btn btn-primary" style="width:100%;"><i class="fas fa-unlock"></i> Déverrouiller Caisse</button>
            </form>
          `}
        </div>
        
        <div class="card" style="margin-top:20px;">
          <div class="card-title"><i class="fas fa-file-invoice-dollar"></i> ${t('generateInvoice')}</div>
          <form onsubmit="createInvoice(event)">
            <div class="form-group">
              <label class="form-label">${t('patient')}</label>
              <select class="form-control" id="inv-patient-id" onchange="onInvoicePatientChange(this.value)" required>
                <option value="">-- Sélectionner Patient --</option>
                ${patients.map(p => `<option value="${p.id}">${p.first_name} ${p.last_name} (${p.patient_code}) ${p.insurance_name ? `— [IPM: ${p.insurance_name}]` : ''}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">${t('insurance')}</label>
              <select class="form-control" id="inv-insurance-id" onchange="renderInvoiceLines()">
                <option value="">Privé (Pas de couverture)</option>
                ${insurances.filter(ic => ic.is_active !== false).map(ic => `<option value="${ic.id}">${ic.name} (${ic.code})</option>`).join('')}
              </select>
            </div>
            
            <div style="border-top:1px solid var(--border-color); padding-top:15px; margin-top:15px;">
              <h5 style="margin-bottom:10px;"><i class="fas fa-hand-holding-medical"></i> Prestations & Traitements Facturés</h5>
              
              <!-- Quick selection from catalogue & practitioner fees -->
              <div class="form-group" style="margin-bottom:12px; background:var(--bg-surface); padding:8px 10px; border-radius:6px; border:1px dashed var(--border-color);">
                <label class="form-label" style="font-size:0.78rem; color:var(--text-muted); margin-bottom:4px; display:flex; align-items:center; gap:6px;">
                  <i class="fas fa-magic" style="color:var(--primary);"></i> Catalogue (Consultations Praticiens & Actes) :
                </label>
                <select class="form-control" id="service-catalogue-select" onchange="applyServiceFromCatalogue(this)" style="font-size:0.85rem;">
                  <option value="">-- Choisir une consultation ou un acte pour remplir --</option>
                  ${(practitioners && practitioners.length > 0) ? `
                    <optgroup label="🩺 Consultations par Praticien (Tarifs Médecins)">
                      ${practitioners.filter(p => p.is_active !== false).map(p => `
                        <option value="PRAC_${p.id}" data-name="Consultation ${p.title || 'Dr.'} ${p.first_name} ${p.last_name} (${p.specialty_name || 'Médecin'})" data-price="${p.consultation_fee || 15000}">
                          🩺 Consultation ${p.title || 'Dr.'} ${p.first_name} ${p.last_name} (${p.specialty_name || 'Médecin'}) — ${(parseFloat(p.consultation_fee) || 15000).toLocaleString()} FCFA
                        </option>
                      `).join('')}
                    </optgroup>
                  ` : ''}
                  <optgroup label="🔬 Actes Médicaux, Traitements & Analyses">
                    ${(services || []).filter(s => s.is_active !== false).map(s => `
                      <option value="${s.id}" data-name="${s.name.replace(/"/g, '&quot;')}" data-price="${s.price || 0}">
                        [${s.category || 'ACTE'}] ${s.name} ${parseFloat(s.price) > 0 ? `— ${parseFloat(s.price).toLocaleString()} FCFA` : ''}
                      </option>
                    `).join('')}
                  </optgroup>
                </select>
              </div>

              <div class="form-group">
                <input type="text" class="form-control" id="line-desc" placeholder="Désignation de l'acte (ex: Consultation Dr. ...)" />
              </div>
              <div style="display:flex; gap:10px; margin-bottom:15px;">
                <input type="number" class="form-control" id="line-price" placeholder="Tarif (FCFA)" style="flex:2;" />
                <input type="number" class="form-control" id="line-qty" value="1" placeholder="Qté" style="flex:1;" />
                <button class="btn btn-secondary" type="button" onclick="addInvoiceLine()"><i class="fas fa-plus"></i> Ajouter</button>
              </div>
              <div id="invoice-lines-list" style="margin-bottom:15px;"></div>
            </div>
            
            <div class="card" style="background-color:var(--bg-surface); padding:15px; font-size:0.85rem;" id="invoice-totals-box">
              <!-- Live totals calculation -->
              <div>Total Brut: 0 FCFA</div>
              <div>Part Patient (100%): 0 FCFA</div>
            </div>
            
            <button class="btn btn-primary" style="width:100%;"><i class="fas fa-print"></i> ${t('saveInvoiceBtn')}</button>
          </form>
        </div>
      </div>
      
      <div class="card">
        <div class="card-title"><i class="fas fa-receipt"></i> ${t('invoiceList')}</div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Facture #</th>
                <th>${t('patient')}</th>
                <th>Assurance</th>
                <th>Net</th>
                <th>Part Patient</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${invoices.map(inv => `
                <tr>
                  <td><strong>${inv.invoice_number}</strong></td>
                  <td>${inv.patient_first} ${inv.patient_last}</td>
                  <td>${inv.insurance_name || (inv.insurance_company_id ? 'IPM / Assurance' : 'Privé')}</td>
                  <td>${parseFloat(inv.total_amount_net).toLocaleString()} FCFA</td>
                  <td>${parseFloat(inv.patient_share_amount).toLocaleString()} FCFA</td>
                  <td><span class="status-badge ${inv.status.toLowerCase()}">${inv.status}</span></td>
                  <td>
                    <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
                      <button class="btn btn-secondary btn-sm" onclick="openInvoicePrintModal('${inv.id}', 'PATIENT')" title="Imprimer la Facture Patient">
                        <i class="fas fa-file-invoice"></i> Facture
                      </button>
                      ${inv.insurance_company_id ? `
                        <button class="btn btn-secondary btn-sm" style="background:#2c3e50; color:#fff; border-color:#2c3e50;" onclick="openInvoicePrintModal('${inv.id}', 'IPM')" title="Imprimer le Décompte / Facture IPM">
                          <i class="fas fa-building"></i> IPM
                        </button>
                      ` : ''}
                      <button class="btn btn-primary btn-sm" onclick="openSendInvoiceEmailModal('${inv.id}')" style="background:#1e40af; border-color:#1e40af;" title="Envoyer la facture et les pièces jointes par email au patient ou à l'IPM">
                        <i class="fas fa-paper-plane"></i> Mail
                      </button>
                      <button class="btn btn-secondary btn-sm" onclick="openEditInvoiceModal('${inv.id}')" title="Modifier la facture" style="padding:4px 8px;">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button class="btn btn-danger btn-sm" onclick="deleteInvoiceConfirm('${inv.id}', '${inv.invoice_number}')" title="Supprimer la facture" style="padding:4px 8px; background-color:var(--danger); border-color:var(--danger);">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                      ${inv.status !== 'PAID' ? `
                        <button class="btn btn-success btn-sm" onclick="openPaymentModal('${inv.id}', '${inv.invoice_number}', ${inv.patient_share_amount - inv.patient_paid_amount})">
                          <i class="fas fa-money-bill-wave"></i> ${t('payBtn')}
                        </button>
                      ` : '<span class="text-success" style="font-size:0.8rem; font-weight:600;"><i class="fas fa-check"></i> Réglé</span>'}
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function onInvoicePatientChange(patientId) {
  const patient = (state.patients || []).find(p => p.id === patientId);
  const insuranceSelect = document.getElementById('inv-insurance-id');
  if (insuranceSelect) {
    if (patient && patient.insurance_company_id) {
      insuranceSelect.value = patient.insurance_company_id;
      showToast(`IPM "${patient.insurance_name}" sélectionnée automatiquement`, 'info');
    } else {
      insuranceSelect.value = '';
    }
  }
  renderInvoiceLines();
}

function applyServiceFromCatalogue(selectElement) {
  const selectedOpt = selectElement.options[selectElement.selectedIndex];
  if (!selectedOpt || !selectedOpt.value) return;
  const name = selectedOpt.getAttribute('data-name');
  const price = selectedOpt.getAttribute('data-price');
  if (name) document.getElementById('line-desc').value = name;
  if (price) document.getElementById('line-price').value = price;
}

function filterServicesCategory(cat) {
  currentServiceCategoryFilter = cat;
  navigate('billing');
}

function renderBillingServicesContent(services) {
  const categories = [
    { key: 'ALL', label: 'Tous les actes' },
    { key: 'CONSULTATION', label: 'Consultations' },
    { key: 'HOSPITALISATION', label: 'Hospitalisation & Séjours' },
    { key: 'TRAITEMENT', label: 'Traitements & Perfusion' },
    { key: 'SOIN', label: 'Soins & Injections' },
    { key: 'ANALYSE', label: 'Analyses & Imagerie' },
    { key: 'CHIRURGIE', label: 'Chirurgies & Bloc' },
    { key: 'AUTRE', label: 'Autres' }
  ];

  const filteredServices = currentServiceCategoryFilter === 'ALL' 
    ? services 
    : services.filter(s => (s.category || 'CONSULTATION') === currentServiceCategoryFilter);

  const totalActs = services.length;
  const totalConsultations = services.filter(s => (s.category || 'CONSULTATION') === 'CONSULTATION').length;
  const totalTreatments = services.filter(s => (s.category || '') === 'TRAITEMENT' || (s.category || '') === 'SOIN').length;

  return `
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:15px; margin-bottom:20px;">
      <div class="card" style="padding:15px; background:var(--bg-surface);">
        <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Total Actes & Prestations</div>
        <div style="font-size:1.6rem; font-weight:800; color:var(--primary); margin-top:5px;">${totalActs}</div>
      </div>
      <div class="card" style="padding:15px; background:var(--bg-surface);">
        <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Types de Consultations</div>
        <div style="font-size:1.6rem; font-weight:800; color:var(--accent); margin-top:5px;">${totalConsultations}</div>
      </div>
      <div class="card" style="padding:15px; background:var(--bg-surface);">
        <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Traitements & Soins</div>
        <div style="font-size:1.6rem; font-weight:800; color:var(--success); margin-top:5px;">${totalTreatments}</div>
      </div>
    </div>

    <!-- Category Filters -->
    <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:15px;">
      ${categories.map(c => `
        <button class="btn ${currentServiceCategoryFilter === c.key ? 'btn-primary' : 'btn-secondary'}" 
                onclick="filterServicesCategory('${c.key}')" 
                style="font-size:0.82rem; padding:6px 16px; border-radius:20px;">
          ${c.label}
        </button>
      `).join('')}
    </div>

    <div class="card">
      <div class="card-title" style="display:flex; justify-content:space-between; align-items:center;">
        <span><i class="fas fa-list-alt"></i> Référentiel des Prestations & Grille Tarifaire</span>
        <button class="btn btn-primary btn-sm" onclick="openCreateServiceModal()">
          <i class="fas fa-plus"></i> Nouvel Acte / Traitement
        </button>
      </div>

      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Désignation de la Prestation / Acte</th>
              <th>Catégorie</th>
              <th>Code / Réf</th>
              <th>Tarif Conventionné</th>
              <th>Durée Estimée</th>
              <th>Statut</th>
              <th style="text-align:right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${filteredServices.length > 0 ? filteredServices.map(s => {
              let badgeColor = '#3498db';
              if (s.category === 'TRAITEMENT') badgeColor = '#9b59b6';
              else if (s.category === 'SOIN') badgeColor = '#27ae60';
              else if (s.category === 'ANALYSE') badgeColor = '#e67e22';
              else if (s.category === 'CHIRURGIE') badgeColor = '#e74c3c';

              return `
                <tr style="opacity: ${s.is_active ? 1 : 0.6}">
                  <td>
                    <strong style="color:var(--text-primary); font-size:0.95rem;">${s.name}</strong>
                    ${s.description ? `<div style="font-size:0.75rem; color:var(--text-muted);">${s.description}</div>` : ''}
                  </td>
                  <td>
                    <span class="badge" style="background:${badgeColor}; color:#fff; font-size:0.75rem; padding:4px 8px; border-radius:4px; font-weight:600;">
                      ${s.category || 'CONSULTATION'}
                    </span>
                  </td>
                  <td><code style="font-weight:700; color:var(--primary); font-size:0.85rem;">${s.code}</code></td>
                  <td>
                    <strong style="color:var(--text-primary); font-size:1rem;">${parseFloat(s.price).toLocaleString()} FCFA</strong>
                  </td>
                  <td><span style="font-size:0.85rem; color:var(--text-muted);"><i class="far fa-clock"></i> ${s.duration_minutes || 30} min</span></td>
                  <td>
                    <span class="badge ${s.is_active ? 'badge-success' : 'badge-danger'}" style="background-color:${s.is_active ? 'var(--success)' : 'var(--danger)'}; color:white; padding:4px 8px; border-radius:4px; font-size:0.75rem; font-weight:600;">
                      ${s.is_active ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td style="text-align:right;">
                    <button class="btn btn-secondary btn-sm" onclick="openEditServiceModal('${s.id}')" style="padding:4px 8px; margin-right:4px;" title="Modifier">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="toggleServiceStatus('${s.id}', ${s.is_active})" style="padding:4px 8px; margin-right:4px;" title="${s.is_active ? 'Désactiver' : 'Activer'}">
                      <i class="fas ${s.is_active ? 'fa-eye-slash' : 'fa-eye'}"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteServiceConfirm('${s.id}', '${s.name.replace(/'/g, "\\'")}')" style="padding:4px 8px; background-color:var(--danger); border-color:var(--danger);" title="Supprimer">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              `;
            }).join('') : `
              <tr>
                <td colspan="7" style="text-align:center; padding:30px; color:var(--text-muted);">
                  Aucun acte trouvé dans cette catégorie.
                </td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderBillingInsurancesContent(insurances) {
  if (insurances.length === 0) {
    return `
      <div class="card" style="text-align:center; padding:50px 20px; color:var(--text-muted);">
        <i class="fas fa-building fa-3x" style="margin-bottom:15px; opacity:0.4;"></i>
        <h4>Aucun organisme IPM ou compagnie d'assurance configuré</h4>
        <p style="margin-bottom:20px;">Ajoutez vos partenaires tiers-payant (ex: IPM SONATEL, AXA, ASKIA, SUNU, etc.) pour gérer la prise en charge des patients et la facturation automatique.</p>
        <button class="btn btn-primary" onclick="openCreateInsuranceModal()">
          <i class="fas fa-plus"></i> Ajouter une Première IPM
        </button>
      </div>
    `;
  }

  const activeCount = insurances.filter(i => i.is_active).length;

  return `
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:15px; margin-bottom:20px;">
      <div class="card" style="padding:15px; background:var(--bg-surface);">
        <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Total Organismes</div>
        <div style="font-size:1.6rem; font-weight:800; color:var(--primary); margin-top:5px;">${insurances.length}</div>
      </div>
      <div class="card" style="padding:15px; background:var(--bg-surface);">
        <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Organismes Actifs</div>
        <div style="font-size:1.6rem; font-weight:800; color:var(--success); margin-top:5px;">${activeCount}</div>
      </div>
      <div class="card" style="padding:15px; background:var(--bg-surface);">
        <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Délai Moyen Conventionné</div>
        <div style="font-size:1.6rem; font-weight:800; color:var(--accent); margin-top:5px;">30 Jours</div>
      </div>
    </div>

    <div class="card">
      <div class="card-title" style="display:flex; justify-content:space-between; align-items:center;">
        <span><i class="fas fa-shield-alt"></i> Répertoire des Organismes Tiers-Payant (IPM & Assurances)</span>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Nom de l'Organisme / IPM</th>
              <th>Code / Sigle</th>
              <th>Adresse Physique</th>
              <th>Email Contact</th>
              <th>Téléphone</th>
              <th>Délai Règlement</th>
              <th>Statut</th>
              <th style="text-align:right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${insurances.map(ic => `
              <tr style="opacity: ${ic.is_active ? 1 : 0.6}">
                <td>
                  <strong style="color:var(--text-primary); font-size:0.95rem;">${ic.name}</strong>
                </td>
                <td><code style="font-weight:700; color:var(--primary); font-size:0.85rem;">${ic.code}</code></td>
                <td>${ic.address ? `<span style="font-size:0.85rem; color:var(--text-primary);"><i class="fas fa-map-marker-alt" style="color:var(--primary); width:14px;"></i> ${ic.address}</span>` : '<span style="color:var(--text-muted); font-size:0.85rem;">-</span>'}</td>
                <td>${ic.contact_email ? `<a href="mailto:${ic.contact_email}" style="color:var(--text-muted); text-decoration:none;"><i class="fas fa-envelope"></i> ${ic.contact_email}</a>` : '<span style="color:var(--text-muted);">-</span>'}</td>
                <td>${ic.contact_phone ? `<span><i class="fas fa-phone"></i> ${ic.contact_phone}</span>` : '<span style="color:var(--text-muted);">-</span>'}</td>
                <td><span class="badge" style="background:#2c3e50; color:#fff; font-size:0.75rem;">${ic.payment_terms_days || 30} jours</span></td>
                <td>
                  <span class="badge ${ic.is_active ? 'badge-success' : 'badge-danger'}" style="background-color:${ic.is_active ? 'var(--success)' : 'var(--danger)'}; color:white; padding:4px 8px; border-radius:4px; font-size:0.75rem; font-weight:600;">
                    ${ic.is_active ? 'Conventionné (Actif)' : 'Inactif'}
                  </span>
                </td>
                <td style="text-align:right;">
                  <button class="btn btn-secondary btn-sm" onclick="openEditInsuranceModal('${ic.id}')" style="padding:4px 8px; margin-right:4px;" title="Modifier">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-secondary btn-sm" onclick="toggleInsuranceStatus('${ic.id}', ${ic.is_active})" style="padding:4px 8px; margin-right:4px;" title="${ic.is_active ? 'Désactiver' : 'Activer'}">
                    <i class="fas ${ic.is_active ? 'fa-eye-slash' : 'fa-eye'}"></i>
                  </button>
                  <button class="btn btn-danger btn-sm" onclick="deleteInsuranceConfirm('${ic.id}', '${ic.name.replace(/'/g, "\\'")}')" style="padding:4px 8px; background-color:var(--danger); border-color:var(--danger);" title="Supprimer">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

async function openSession(e) {
  e.preventDefault();
  const cash_register_id = document.getElementById('open-register-id').value;
  const opening_balance = document.getElementById('open-balance').value;

  try {
    const session = await api.request('/billing/cash-sessions', {
      method: 'POST',
      body: JSON.stringify({ cash_register_id, opening_balance })
    });
    state.activeCashSession = session;
    showToast('Caisse ouverte avec succès!');
    navigate('billing');
  } catch (err) {}
}

async function closeSession(e) {
  e.preventDefault();
  const closing_balance_declared = document.getElementById('close-declared').value;
  const sessionId = state.activeCashSession.id;

  try {
    const report = await api.request(`/billing/cash-sessions/${sessionId}/close`, {
      method: 'POST',
      body: JSON.stringify({ closing_balance_declared })
    });
    
    state.activeCashSession = null;
    showToast(`Caisse fermée! Caisse théorique calculated: ${report.closing_balance_calculated} FCFA.`);
    navigate('billing');
  } catch (err) {}
}

function addInvoiceLine() {
  const description = document.getElementById('line-desc').value;
  const unit_price = parseFloat(document.getElementById('line-price').value);
  const quantity = parseInt(document.getElementById('line-qty').value);

  if (!description || !unit_price || !quantity) {
    showToast('Veuillez compléter la désignation et le prix', 'error');
    return;
  }

  invoiceLines.push({ description, unit_price, quantity });
  
  document.getElementById('line-desc').value = '';
  document.getElementById('line-price').value = '';
  document.getElementById('line-qty').value = '1';
  
  renderInvoiceLines();
}

function renderInvoiceLines() {
  const container = document.getElementById('invoice-lines-list');
  const totalsBox = document.getElementById('invoice-totals-box');
  
  if (invoiceLines.length === 0) {
    container.innerHTML = '<div style="color:var(--text-muted); font-size:0.85rem;">Aucune prestation ajoutée</div>';
    totalsBox.innerHTML = `<div>Total Brut: 0 FCFA</div>`;
    return;
  }

  let totalGross = 0;
  container.innerHTML = `
    <table class="table" style="font-size:0.8rem; margin-bottom:10px;">
      <tbody>
        ${invoiceLines.map((line, index) => {
          const lineTotal = line.quantity * line.unit_price;
          totalGross += lineTotal;
          return `
            <tr>
              <td>${line.description} x${line.quantity}</td>
              <td>${lineTotal.toLocaleString()} FCFA</td>
              <td><i class="fas fa-trash text-danger" style="cursor:pointer;" onclick="removeInvoiceLine(${index})"></i></td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;

  // Live ventilation calculation preview (Assume 80% coverage if insurance is selected)
  const hasInsurance = document.getElementById('inv-insurance-id') && document.getElementById('inv-insurance-id').value !== '';
  const rate = hasInsurance ? 80 : 0;
  const insuranceShare = Math.round(totalGross * (rate / 100));
  const patientShare = totalGross - insuranceShare;

  totalsBox.innerHTML = `
    <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
      <span>Total Brut:</span><strong>${totalGross.toLocaleString()} FCFA</strong>
    </div>
    <div style="display:flex; justify-content:space-between; margin-bottom:4px; color:var(--success);">
      <span>Part Assurance (${rate}%):</span><strong>${insuranceShare.toLocaleString()} FCFA</strong>
    </div>
    <div style="display:flex; justify-content:space-between; font-weight:700;">
      <span>Part Patient:</span><strong>${patientShare.toLocaleString()} FCFA</strong>
    </div>
  `;
}

function removeInvoiceLine(index) {
  invoiceLines.splice(index, 1);
  renderInvoiceLines();
}

async function createInvoice(e) {
  e.preventDefault();
  const patient_id = document.getElementById('inv-patient-id').value;
  const insurance_company_id = document.getElementById('inv-insurance-id').value || null;

  if (!patient_id) {
    showToast('Veuillez sélectionner un patient', 'error');
    return;
  }

  if (invoiceLines.length === 0) {
    showToast('Ajoutez au moins un acte facturé', 'error');
    return;
  }

  try {
    showToast('Génération de la facture en cours...', 'info');
    const res = await api.request('/billing/invoices', {
      method: 'POST',
      body: JSON.stringify({
        patient_id,
        insurance_company_id,
        discount_amount: 0,
        lines: invoiceLines
      })
    });

    showToast(`Facture ${res.invoice_number || ''} émise avec succès !`, 'success');
    invoiceLines = [];
    navigate('billing');
  } catch (err) {
    showToast(`Erreur lors de la génération de la facture: ${err.message}`, 'error');
  }
}

// ============================================================================
// 4b. Invoice Editing & Deletion Handlers
// ============================================================================
let editingInvoiceLines = [];
let editingInvoiceCurrentData = null;

async function openEditInvoiceModal(id) {
  const modal = document.getElementById('edit-invoice-modal');
  if (!modal) return;

  try {
    showToast('Chargement des détails de la facture...', 'info');
    const [details, patients, insurances, services, practitioners] = await Promise.all([
      api.request(`/billing/invoices/${id}/details`),
      api.request('/patients').catch(() => []),
      api.request('/billing/insurances').catch(() => []),
      api.request('/medical-services').catch(() => []),
      api.request('/practitioners').catch(() => [])
    ]);

    const inv = details.invoice;
    editingInvoiceCurrentData = details;
    editingInvoiceLines = (details.lines || []).map(l => ({
      description: l.description,
      unit_price: parseFloat(l.unit_price) || 0,
      quantity: parseInt(l.quantity) || 1,
      service_id: l.service_id || null
    }));

    document.getElementById('edit-inv-id').value = inv.id;
    document.getElementById('edit-invoice-modal-title').innerHTML = `<i class="fas fa-edit" style="color:var(--primary);"></i> Modifier la Facture <strong>${inv.invoice_number}</strong>`;

    // Populate patient select
    const patientSelect = document.getElementById('edit-inv-patient-id');
    if (patientSelect) {
      patientSelect.innerHTML = patients.map(p => `
        <option value="${p.id}" ${p.id === inv.patient_id ? 'selected' : ''}>
          ${p.first_name} ${p.last_name} (${p.patient_code}) ${p.insurance_name ? `— [IPM: ${p.insurance_name}]` : ''}
        </option>
      `).join('');
    }

    // Populate insurance select
    const insSelect = document.getElementById('edit-inv-insurance-id');
    if (insSelect) {
      insSelect.innerHTML = `<option value="">Privé (Pas de couverture)</option>` +
        insurances.filter(ic => ic.is_active !== false).map(ic => `
          <option value="${ic.id}" ${ic.id === inv.insurance_company_id ? 'selected' : ''}>
            ${ic.name} (${ic.code})
          </option>
        `).join('');
    }

    const statusSelect = document.getElementById('edit-inv-status');
    if (statusSelect) statusSelect.value = inv.status || 'ISSUED';

    const discountInput = document.getElementById('edit-inv-discount');
    if (discountInput) discountInput.value = parseFloat(inv.discount_amount) || 0;

    // Populate catalogue select
    const catSelect = document.getElementById('edit-service-catalogue-select');
    if (catSelect) {
      catSelect.innerHTML = `
        <option value="">-- Ajouter un acte depuis le catalogue / praticien --</option>
        ${(practitioners && practitioners.length > 0) ? `
          <optgroup label="🩺 Consultations par Praticien (Tarifs Médecins)">
            ${practitioners.filter(p => p.is_active !== false).map(p => `
              <option value="PRAC_${p.id}" data-name="Consultation ${p.title || 'Dr.'} ${p.first_name} ${p.last_name} (${p.specialty_name || 'Médecin'})" data-price="${p.consultation_fee || 15000}">
                🩺 Consultation ${p.title || 'Dr.'} ${p.first_name} ${p.last_name} — ${(parseFloat(p.consultation_fee) || 15000).toLocaleString()} FCFA
              </option>
            `).join('')}
          </optgroup>
        ` : ''}
        <optgroup label="🔬 Actes Médicaux, Traitements & Analyses">
          ${(services || []).filter(s => s.is_active !== false).map(s => `
            <option value="${s.id}" data-name="${s.name.replace(/"/g, '&quot;')}" data-price="${s.price || 0}">
              [${s.category || 'ACTE'}] ${s.name} ${parseFloat(s.price) > 0 ? `— ${parseFloat(s.price).toLocaleString()} FCFA` : ''}
            </option>
          `).join('')}
        </optgroup>
      `;
    }

    renderEditInvoiceLines();
    modal.style.display = 'flex';
  } catch (err) {
    showToast(`Erreur de chargement de la facture: ${err.message}`, 'error');
  }
}

function applyEditServiceFromCatalogue(selectEl) {
  const opt = selectEl.options[selectEl.selectedIndex];
  if (!opt || !opt.value) return;
  const name = opt.getAttribute('data-name');
  const price = opt.getAttribute('data-price');
  if (name) document.getElementById('edit-line-desc').value = name;
  if (price !== null && price !== undefined) document.getElementById('edit-line-price').value = price;
}

function addEditInvoiceLine() {
  const descEl = document.getElementById('edit-line-desc');
  const priceEl = document.getElementById('edit-line-price');
  const qtyEl = document.getElementById('edit-line-qty');

  const description = descEl.value.trim();
  const unit_price = parseFloat(priceEl.value);
  const quantity = parseInt(qtyEl.value, 10) || 1;

  if (!description || isNaN(unit_price) || unit_price < 0) {
    showToast('Veuillez renseigner une désignation et un prix valide', 'error');
    return;
  }

  editingInvoiceLines.push({ description, unit_price, quantity });
  descEl.value = '';
  priceEl.value = '';
  qtyEl.value = '1';
  const catSelect = document.getElementById('edit-service-catalogue-select');
  if (catSelect) catSelect.value = '';
  renderEditInvoiceLines();
}

function removeEditInvoiceLine(idx) {
  editingInvoiceLines.splice(idx, 1);
  renderEditInvoiceLines();
}

function renderEditInvoiceLines() {
  const listEl = document.getElementById('edit-invoice-lines-list');
  const totalsEl = document.getElementById('edit-invoice-totals-box');
  if (!listEl || !totalsEl) return;

  if (editingInvoiceLines.length === 0) {
    listEl.innerHTML = `<div style="color:var(--text-muted); font-size:0.85rem; font-style:italic;">Aucune ligne de prestation. Ajoutez au moins un acte.</div>`;
    totalsEl.innerHTML = `<div>Total Brut : 0 FCFA • Net à Payer : 0 FCFA</div>`;
    return;
  }

  let totalGross = 0;
  listEl.innerHTML = `
    <table class="table" style="font-size:0.82rem; margin-bottom:10px;">
      <thead>
        <tr>
          <th>Désignation</th>
          <th style="width:70px; text-align:center;">Qté</th>
          <th style="width:110px; text-align:right;">Prix Unitaire</th>
          <th style="width:110px; text-align:right;">Total</th>
          <th style="width:40px; text-align:center;"></th>
        </tr>
      </thead>
      <tbody>
        ${editingInvoiceLines.map((line, idx) => {
          const lineTotal = (line.quantity || 1) * (line.unit_price || 0);
          totalGross += lineTotal;
          return `
            <tr>
              <td><strong>${line.description}</strong></td>
              <td style="text-align:center;">${line.quantity}</td>
              <td style="text-align:right;">${line.unit_price.toLocaleString()} FCFA</td>
              <td style="text-align:right; font-weight:700;">${lineTotal.toLocaleString()} FCFA</td>
              <td style="text-align:center;">
                <i class="fas fa-trash text-danger" style="cursor:pointer;" onclick="removeEditInvoiceLine(${idx})" title="Supprimer cette ligne"></i>
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;

  const discount = parseFloat(document.getElementById('edit-inv-discount')?.value) || 0;
  const netAmount = Math.max(0, totalGross - discount);
  const insSelect = document.getElementById('edit-inv-insurance-id');
  const hasInsurance = insSelect && insSelect.value !== '';
  const rate = hasInsurance ? 80 : 0;
  const insuranceShare = Math.round(netAmount * (rate / 100));
  const patientShare = netAmount - insuranceShare;

  totalsEl.innerHTML = `
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
      <div>
        <div>Total Brut : <strong>${totalGross.toLocaleString()} FCFA</strong></div>
        ${discount > 0 ? `<div style="color:var(--danger);">Remise : <strong>- ${discount.toLocaleString()} FCFA</strong></div>` : ''}
        <div style="font-size:1rem; font-weight:800; color:var(--text-primary); margin-top:4px;">Net à Payer : ${netAmount.toLocaleString()} FCFA</div>
      </div>
      <div>
        <div style="color:var(--success);">Part IPM (${rate}%) : <strong>${insuranceShare.toLocaleString()} FCFA</strong></div>
        <div style="font-weight:700; color:var(--primary);">Part Patient : <strong>${patientShare.toLocaleString()} FCFA</strong></div>
      </div>
    </div>
  `;
}

function closeEditInvoiceModal() {
  const modal = document.getElementById('edit-invoice-modal');
  if (modal) modal.style.display = 'none';
  editingInvoiceLines = [];
  editingInvoiceCurrentData = null;
}

async function submitEditInvoiceForm(e) {
  e.preventDefault();
  const id = document.getElementById('edit-inv-id').value;
  const patient_id = document.getElementById('edit-inv-patient-id').value;
  const insurance_company_id = document.getElementById('edit-inv-insurance-id').value || null;
  const status = document.getElementById('edit-inv-status').value;
  const discount_amount = parseFloat(document.getElementById('edit-inv-discount').value) || 0;

  if (editingInvoiceLines.length === 0) {
    showToast('Veuillez ajouter au moins une prestation', 'error');
    return;
  }

  const btn = document.getElementById('btn-submit-edit-invoice');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Enregistrement...`;
  }

  try {
    showToast('Mise à jour de la facture en cours...', 'info');
    const res = await api.request(`/billing/invoices/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        patient_id,
        insurance_company_id,
        status,
        discount_amount,
        lines: editingInvoiceLines
      })
    });

    showToast(`Facture ${res.invoice_number || ''} modifiée avec succès !`, 'success');
    closeEditInvoiceModal();
    if (state.currentTab === 'billing') {
      navigate('billing');
    }
  } catch (err) {
    showToast(`Erreur lors de la modification: ${err.message}`, 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i class="fas fa-save"></i> Enregistrer les Modifications`;
    }
  }
}

async function deleteInvoiceConfirm(id, invoiceNumber) {
  if (!confirm(`⚠️ Êtes-vous sûr de vouloir supprimer définitivement la facture "${invoiceNumber}" ?\n\nCette action supprimera également les lignes associées et les éventuels historiques d'envoi.`)) {
    return;
  }

  try {
    showToast('Suppression de la facture en cours...', 'info');
    const res = await api.request(`/billing/invoices/${id}`, {
      method: 'DELETE'
    });

    showToast(res.message || 'Facture supprimée avec succès !', 'success');
    if (state.currentTab === 'billing') {
      navigate('billing');
    }
  } catch (err) {
    showToast(`Erreur de suppression: ${err.message}`, 'error');
  }
}

async function openPaymentModal(invoiceId, invoiceNumber, amountDue) {
  if (!state.activeCashSession) {
    showToast('Veuillez ouvrir une session de caisse avant de recevoir un règlement', 'warning');
    return;
  }

  // Load configured online payment methods
  const methods = await api.request('/payment-methods');
  const activeMethods = methods.filter(m => m.is_active);

  activePaymentInvoice = { id: invoiceId, number: invoiceNumber, amount: amountDue };

  const select = document.getElementById('pay-method-select');
  select.innerHTML = `
    <option value="CASH">Espèces (CASH)</option>
    <option value="CHECK">Chèque</option>
    <option value="BANK_TRANSFER">Virement bancaire classique</option>
    ${activeMethods.map(m => `<option value="ONLINE:${m.id}">${m.name} (${m.provider})</option>`).join('')}
  `;

  document.getElementById('pay-modal-title').innerText = `Règlement Facture ${invoiceNumber}`;
  document.getElementById('pay-amount').value = amountDue;
  document.getElementById('payment-simulation-box').style.display = 'none';

  document.getElementById('payment-modal').style.display = 'flex';
}

function closePaymentModal() {
  document.getElementById('payment-modal').style.display = 'none';
  activePaymentInvoice = null;
}

// React to payment method select (show online payment simulation panel)
function onPaymentMethodChange() {
  const methodVal = document.getElementById('pay-method-select').value;
  const simBox = document.getElementById('payment-simulation-box');
  
  if (methodVal.startsWith('ONLINE:')) {
    simBox.style.display = 'block';
  } else {
    simBox.style.display = 'none';
  }
}

async function processPayment(e) {
  e.preventDefault();
  const methodVal = document.getElementById('pay-method-select').value;
  const amount = parseFloat(document.getElementById('pay-amount').value);
  const reference = document.getElementById('pay-ref').value;

  if (methodVal.startsWith('ONLINE:')) {
    // 1. Initialize online checkout payment
    const tenant_payment_method_id = methodVal.replace('ONLINE:', '');
    
    try {
      const initRes = await api.request('/payments/initialize', {
        method: 'POST',
        body: JSON.stringify({
          invoice_id: activePaymentInvoice.id,
          tenant_payment_method_id,
          amount,
          payer_type: 'PATIENT'
        })
      });

      // Display dynamic simulated checkout controls (QR/checkout link)
      const detailsBox = document.getElementById('sim-checkout-details');
      detailsBox.innerHTML = `
        <div class="card" style="background-color:var(--bg-surface); border-color:var(--primary); text-align:center; padding:15px;">
          <h5 style="margin-bottom:10px; color:white;">Simulateur de Paiement en Ligne</h5>
          ${initRes.qr_code_url ? `
            <div style="margin-bottom: 12px; text-align:center;">
              <strong style="color:var(--text-primary); display:block; margin-bottom:8px;">Scanner pour régler</strong>
              <img src="${initRes.qr_code_url}" style="max-width:180px; border-radius:8px; border:1px solid var(--border-color);" alt="QR Code Marchand" />
            </div>
          ` : initRes.qr_code_data ? `
            <div class="qr-placeholder" style="background-color:#fff; color:#000; font-size:0.65rem; padding:10px; display:flex; flex-direction:column; justify-content:center;">
              <i class="fas fa-qrcode fa-3x" style="color:var(--primary); margin-bottom:5px;"></i>
              <strong>Code QR généré</strong>
              <div style="font-size:0.5rem; word-break:break-all;">${initRes.qr_code_data}</div>
            </div>
          ` : ''}
          
          ${initRes.instructions ? `
            <div style="font-size:0.85rem; margin-bottom:12px; color:var(--text-primary); font-weight:600; padding:8px; background:rgba(255,255,255,0.05); border-radius:6px;">
              ${initRes.instructions}
            </div>
          ` : ''}
          
          ${initRes.checkout_url ? `
            <a href="${initRes.checkout_url}" target="_blank" class="btn btn-secondary" style="font-size:0.8rem; margin-bottom:10px;">
              <i class="fas fa-external-link-alt"></i> Ouvrir page Checkout Wave/OM
            </a>
          ` : ''}
          <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:10px;">
            Référence: <strong>${initRes.transaction_reference}</strong>
          </div>
          <button class="btn btn-success" type="button" style="font-size:0.8rem; width:100%;" onclick="simulateWebhook('${initRes.payment_method}', '${initRes.transaction_reference}', ${amount}, '${activePaymentInvoice.id}')">
            <i class="fas fa-bolt"></i> Simuler Retour Validation Webhook
          </button>
        </div>
      `;
    } catch (err) {}
  } else {
    // 2. Offline normal payment
    try {
      await api.request('/payments/record', {
        method: 'POST',
        body: JSON.stringify({
          invoice_id: activePaymentInvoice.id,
          cash_session_id: state.activeCashSession.id,
          amount,
          payment_method: methodVal,
          payer_type: 'PATIENT',
          transaction_reference: reference
        })
      });

      showToast('Paiement enregistré avec succès!');
      closePaymentModal();
      navigate('billing');
    } catch (err) {}
  }
}

// Simulated checkout webhook callback
async function simulateWebhook(provider, ref, amount, invoiceId) {
  try {
    const data = await api.request(`/payments/webhook/${provider.toLowerCase()}`, {
      method: 'POST',
      body: JSON.stringify({
        transaction_reference: ref,
        amount,
        invoice_id: invoiceId,
        status: 'SUCCESS'
      })
    });

    showToast(`Webhook simulé reçu! Statut facture actualisé: ${data.invoice_status}`);
    closePaymentModal();
    navigate('billing');
  } catch (err) {
    showToast(`Simulation failed: ${err.message}`, 'error');
  }
}

// ============================================================================
// 4a. Medical Services, Consultations & Treatments CRUD
// ============================================================================
function openCreateServiceModal() {
  const modal = document.getElementById('medical-service-modal');
  const form = document.getElementById('medical-service-form');
  if (!modal || !form) return;

  form.reset();
  document.getElementById('service-form-id').value = '';
  document.getElementById('medical-service-modal-title').innerText = 'Ajouter un Acte / Traitement / Consultation';
  document.getElementById('service-category').value = 'CONSULTATION';
  document.getElementById('service-duration').value = '30';
  document.getElementById('service-active').checked = true;

  modal.style.display = 'flex';
}

async function openEditServiceModal(id) {
  const modal = document.getElementById('medical-service-modal');
  if (!modal) return;

  try {
    const services = await api.request('/medical-services');
    const s = services.find(x => x.id === id);
    if (!s) throw new Error('Prestation introuvable');

    document.getElementById('service-form-id').value = s.id;
    document.getElementById('medical-service-modal-title').innerText = 'Modifier l\'Acte / Traitement';
    document.getElementById('service-name').value = s.name || '';
    document.getElementById('service-category').value = s.category || 'CONSULTATION';
    document.getElementById('service-code').value = s.code || '';
    document.getElementById('service-price').value = s.price || 0;
    document.getElementById('service-duration').value = s.duration_minutes || 30;
    document.getElementById('service-description').value = s.description || '';
    document.getElementById('service-active').checked = s.is_active !== false;

    modal.style.display = 'flex';
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function closeServiceModal() {
  const modal = document.getElementById('medical-service-modal');
  if (modal) modal.style.display = 'none';
}

async function submitServiceForm(e) {
  e.preventDefault();
  const id = document.getElementById('service-form-id').value;
  
  const payload = {
    name: document.getElementById('service-name').value,
    category: document.getElementById('service-category').value,
    code: document.getElementById('service-code').value,
    price: parseFloat(document.getElementById('service-price').value) || 0,
    duration_minutes: parseInt(document.getElementById('service-duration').value, 10) || 30,
    description: document.getElementById('service-description').value,
    is_active: document.getElementById('service-active').checked
  };

  try {
    if (id) {
      await api.request(`/medical-services/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      showToast('Prestation mise à jour avec succès !');
    } else {
      await api.request('/medical-services', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      showToast('Prestation créée avec succès !');
    }
    
    closeServiceModal();
    navigate('billing');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function toggleServiceStatus(id, currentActive) {
  try {
    const services = await api.request('/medical-services');
    const s = services.find(x => x.id === id);
    if (!s) return;

    await api.request(`/medical-services/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...s,
        is_active: !currentActive
      })
    });

    showToast(`Prestation ${s.name} ${!currentActive ? 'activée' : 'désactivée'} avec succès.`);
    navigate('billing');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function deleteServiceConfirm(id, name) {
  if (!confirm(`Êtes-vous sûr de vouloir supprimer ou désactiver la prestation "${name}" ?`)) return;

  try {
    const res = await api.request(`/medical-services/${id}`, {
      method: 'DELETE'
    });
    showToast(res.message || 'Prestation supprimée avec succès !');
    navigate('billing');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ============================================================================
// 4b. Insurance Companies & IPM Management CRUD
// ============================================================================
function openCreateInsuranceModal() {
  const modal = document.getElementById('insurance-modal');
  const form = document.getElementById('insurance-form');
  if (!modal || !form) return;

  form.reset();
  document.getElementById('insurance-form-id').value = '';
  document.getElementById('insurance-modal-title').innerText = 'Ajouter un Organisme IPM / Assurance';
  document.getElementById('insurance-address').value = '';
  document.getElementById('insurance-terms').value = '30';
  document.getElementById('insurance-active').checked = true;

  modal.style.display = 'flex';
}

async function openEditInsuranceModal(id) {
  const modal = document.getElementById('insurance-modal');
  if (!modal) return;

  try {
    const insurances = await api.request('/billing/insurances');
    const ic = insurances.find(i => i.id === id);
    if (!ic) throw new Error('IPM introuvable');

    document.getElementById('insurance-form-id').value = ic.id;
    document.getElementById('insurance-modal-title').innerText = 'Modifier l\'Organisme IPM / Assurance';
    document.getElementById('insurance-name').value = ic.name || '';
    document.getElementById('insurance-code').value = ic.code || '';
    document.getElementById('insurance-address').value = ic.address || '';
    document.getElementById('insurance-email').value = ic.contact_email || '';
    document.getElementById('insurance-phone').value = ic.contact_phone || '';
    document.getElementById('insurance-terms').value = ic.payment_terms_days || 30;
    document.getElementById('insurance-active').checked = ic.is_active !== false;

    modal.style.display = 'flex';
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function closeInsuranceModal() {
  const modal = document.getElementById('insurance-modal');
  if (modal) modal.style.display = 'none';
}

async function submitInsuranceForm(e) {
  e.preventDefault();
  const id = document.getElementById('insurance-form-id').value;
  
  const payload = {
    name: document.getElementById('insurance-name').value,
    code: document.getElementById('insurance-code').value,
    address: document.getElementById('insurance-address').value,
    contact_email: document.getElementById('insurance-email').value,
    contact_phone: document.getElementById('insurance-phone').value,
    payment_terms_days: parseInt(document.getElementById('insurance-terms').value, 10) || 30,
    is_active: document.getElementById('insurance-active').checked
  };

  try {
    if (id) {
      await api.request(`/billing/insurances/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      showToast('IPM mise à jour avec succès !');
    } else {
      await api.request('/billing/insurances', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      showToast('Organisme IPM créé avec succès !');
    }
    
    closeInsuranceModal();
    if (state.currentTab === 'insurances') {
      navigate('insurances');
    } else {
      navigate('billing');
    }
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function toggleInsuranceStatus(id, currentActive) {
  try {
    const insurances = await api.request('/billing/insurances');
    const ic = insurances.find(i => i.id === id);
    if (!ic) return;

    await api.request(`/billing/insurances/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...ic,
        is_active: !currentActive
      })
    });

    showToast(`IPM ${ic.name} ${!currentActive ? 'activée' : 'désactivée'} avec succès.`);
    if (state.currentTab === 'insurances') {
      navigate('insurances');
    } else {
      navigate('billing');
    }
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function deleteInsuranceConfirm(id, name) {
  if (!confirm(`Êtes-vous sûr de vouloir supprimer ou désactiver l'organisme "${name}" ?`)) return;

  try {
    const res = await api.request(`/billing/insurances/${id}`, {
      method: 'DELETE'
    });
    showToast(res.message || 'IPM supprimée avec succès !');
    if (state.currentTab === 'insurances') {
      navigate('insurances');
    } else {
      navigate('billing');
    }
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ============================================================================
// 4b. Printable Invoices (Patient Invoice & IPM Claim Printouts)
// ============================================================================
let currentPrintInvoiceData = null;
let currentPrintMode = 'PATIENT'; // 'PATIENT' or 'IPM'

async function openInvoicePrintModal(invoiceId, mode = 'PATIENT') {
  currentPrintMode = mode;
  try {
    showToast('Chargement des données de facturation...', 'info');
    const data = await api.request(`/billing/invoices/${invoiceId}/details`);
    currentPrintInvoiceData = data;
    renderInvoicePrintModalContent();
    const modal = document.getElementById('invoice-print-modal');
    if (modal) modal.style.display = 'flex';
  } catch (err) {
    showToast('Erreur lors du chargement de la facture: ' + err.message, 'error');
  }
}

function closeInvoicePrintModal() {
  const modal = document.getElementById('invoice-print-modal');
  if (modal) modal.style.display = 'none';
}

function switchPrintMode(mode) {
  currentPrintMode = mode;
  renderInvoicePrintModalContent();
}

function printInvoiceDocument() {
  const sheet = document.getElementById('invoice-sheet');
  if (!sheet) return;
  
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>SoftMed - Facture ${currentPrintInvoiceData?.invoice?.invoice_number || ''}</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        @page { size: A4 portrait; margin: 10mm 12mm; }
        body { 
          font-family: 'Poppins', Arial, sans-serif; 
          background: #ffffff !important; 
          color: #2c3e50 !important; 
          margin: 0; 
          padding: 10px; 
          -webkit-print-color-adjust: exact; 
          print-color-adjust: exact; 
        }
        * { box-sizing: border-box; }
        .no-print { display: none !important; }
      </style>
    </head>
    <body>
      ${sheet.outerHTML}
    </body>
    </html>
  `);
  doc.close();

  const images = doc.images;
  let loaded = 0;
  const total = images.length;
  
  const triggerPrint = () => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    }, 2000);
  };

  if (total === 0) {
    setTimeout(triggerPrint, 300);
  } else {
    for (let i = 0; i < total; i++) {
      if (images[i].complete) {
        loaded++;
      } else {
        images[i].onload = images[i].onerror = () => {
          loaded++;
          if (loaded >= total) triggerPrint();
        };
      }
    }
    if (loaded >= total) {
      setTimeout(triggerPrint, 300);
    } else {
      setTimeout(triggerPrint, 1000);
    }
  }
}

function renderInvoicePrintModalContent() {
  if (!currentPrintInvoiceData) return;
  const { invoice, tenant, lines, payments } = currentPrintInvoiceData;
  const isIPM = currentPrintMode === 'IPM';

  const container = document.getElementById('invoice-print-content');
  if (!container) return;

  const totalGross = parseFloat(invoice.total_amount_gross || 0);
  const totalNet = parseFloat(invoice.total_amount_net || 0);
  const patientShare = parseFloat(invoice.patient_share_amount || 0);
  const insuranceShare = parseFloat(invoice.insurance_share_amount || 0);
  const patientPaid = parseFloat(invoice.patient_paid_amount || 0);
  const insurancePaid = parseFloat(invoice.insurance_paid_amount || 0);
  const balanceDue = isIPM ? (insuranceShare - insurancePaid) : (patientShare - patientPaid);

  const statusBadge = invoice.status === 'PAID' ? 'ACQUITTÉE / RÉGLÉE' : (invoice.status === 'PARTIALLY_PAID' ? 'PARTIELLEMENT RÉGLÉE' : 'ÉMISE / EN ATTENTE');
  const statusColor = invoice.status === 'PAID' ? '#27ae60' : (invoice.status === 'PARTIALLY_PAID' ? '#e67e22' : '#e74c3c');

  const isCustomStamp = tenant.stamp_url && !tenant.stamp_url.includes('stamp-default.png');
  const stampHtml = isCustomStamp ? `
    <div style="text-align:center; margin-top:5px;">
      <img src="${tenant.stamp_url}" style="max-height:105px; max-width:160px; object-fit:contain; filter: contrast(1.1) brightness(0.95); mix-blend-mode: multiply;" alt="Cachet Clinique" />
      <div style="font-size:0.75rem; color:#475569; font-weight:600; margin-top:2px;">Cachet & Signature Officielle</div>
    </div>
  ` : `
    <div style="width:145px; height:145px; border:3px double #1e40af; border-radius:50%; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:8px; text-align:center; transform:rotate(-7deg); color:#1e40af; font-family:'Poppins', sans-serif; background:rgba(30,64,175,0.03); box-shadow:0 0 0 2px rgba(30,64,175,0.25); margin:5px auto 0 auto; user-select:none;">
      <div style="font-size:0.55rem; font-weight:800; text-transform:uppercase; letter-spacing:0.5px; line-height:1.1; max-width:120px;">${(tenant.name || 'CLINIQUE MÉDICALE').toUpperCase()}</div>
      <div style="font-size:0.45rem; color:#2563eb; margin:2px 0; font-weight:600;">★ SERVICE FINANCIER & CAISSE ★</div>
      <div style="font-size:0.72rem; font-weight:900; color:#1e40af; border-top:1.5px solid #1e40af; border-bottom:1.5px solid #1e40af; padding:2px 0; width:92%; margin:2px 0; text-transform:uppercase; letter-spacing:1px;">POUR ACQUIT</div>
      <div style="font-size:0.52rem; font-weight:700; color:#1e3a8a;">${new Date().toLocaleDateString('fr-FR')}</div>
      <div style="font-size:0.46rem; color:#334155; font-weight:600;">CACHET ET SIGNATURE</div>
    </div>
  `;

  container.innerHTML = `
    <!-- Switch buttons inside modal -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;" class="no-print">
      <div style="display:flex; gap:10px;">
        <button class="btn ${!isIPM ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="switchPrintMode('PATIENT')">
          <i class="fas fa-user"></i> Vue Facture Patient
        </button>
        ${invoice.insurance_company_id ? `
          <button class="btn ${isIPM ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="switchPrintMode('IPM')">
            <i class="fas fa-building"></i> Vue Facture / Décompte IPM
          </button>
        ` : ''}
      </div>
      <div style="display:flex; gap:10px;">
        <button class="btn btn-primary btn-sm" onclick="openSendInvoiceEmailModal('${invoice.id}', '${isIPM ? 'IPM' : 'PATIENT'}')" style="background:#1e40af; border-color:#1e40af; padding:6px 14px; font-weight:600;">
          <i class="fas fa-paper-plane"></i> Envoyer par Mail
        </button>
        <button class="btn btn-primary btn-sm" onclick="printInvoiceDocument()" style="background:#27ae60; border-color:#27ae60; padding:6px 14px;">
          <i class="fas fa-print"></i> Imprimer / Télécharger PDF
        </button>
        <button class="btn btn-secondary btn-sm" onclick="closeInvoicePrintModal()">
          Fermer
        </button>
      </div>
    </div>

    <!-- PRINTABLE SHEET -->
    <div class="printable-invoice" id="invoice-sheet" style="background:#ffffff; color:#2c3e50; padding:35px 40px; border-radius:8px; font-family:'Inter', Arial, sans-serif; box-shadow:0 4px 15px rgba(0,0,0,0.15);">
      
      <!-- 1. HEADER (LOGO, TENANT DETAILS, INVOICE METADATA) -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:2px solid #3498db; padding-bottom:18px; margin-bottom:20px;">
        <div style="display:flex; gap:15px; align-items:center; max-width:60%;">
          ${tenant.logo_url ? `
            <img src="${tenant.logo_url}" style="height:70px; max-width:120px; object-fit:contain; border-radius:6px;" alt="Logo Clinique" />
          ` : `
            <div style="width:60px; height:60px; border-radius:8px; background:linear-gradient(135deg, #3498db, #2c3e50); display:flex; align-items:center; justify-content:center; color:white; font-size:1.6rem; font-weight:bold;">
              <i class="fas fa-heartbeat"></i>
            </div>
          `}
          <div>
            <h2 style="margin:0 0 3px 0; color:#1a365d; font-size:1.25rem; font-weight:800; text-transform:uppercase;">${tenant.name || 'Clinique Médicale'}</h2>
            <div style="font-size:0.8rem; color:#4a5568; line-height:1.35;">
              ${tenant.address ? `<div><i class="fas fa-map-marker-alt" style="color:#3498db; width:14px;"></i> ${tenant.address}</div>` : ''}
              <div><i class="fas fa-phone-alt" style="color:#3498db; width:14px;"></i> ${tenant.phone_number || ''} ${tenant.email ? `| <i class="fas fa-envelope" style="color:#3498db; width:14px;"></i> ${tenant.email}` : ''}</div>
              ${tenant.ninea_rc ? `<div><strong>NINEA / RC :</strong> ${tenant.ninea_rc}</div>` : ''}
            </div>
          </div>
        </div>

        <div style="text-align:right;">
          <div style="font-size:0.75rem; text-transform:uppercase; font-weight:800; letter-spacing:1px; color:#718096;">
            ${isIPM ? 'FACTURE TIERS-PAYANT (ORGANISME IPM)' : 'FACTURE PATIENT & REÇU D\'HONORAIRES'}
          </div>
          <div style="font-size:1.25rem; font-weight:800; color:#2b6cb0; margin:2px 0;">${invoice.invoice_number}</div>
          <div style="font-size:0.8rem; color:#4a5568;">Date d'émission : <strong>${new Date(invoice.issue_date).toLocaleDateString()}</strong></div>
          <div style="font-size:0.8rem; color:#4a5568;">Date d'échéance : <strong>${new Date(invoice.due_date).toLocaleDateString()}</strong></div>
          <div style="margin-top:5px;">
            <span style="display:inline-block; padding:3px 10px; border-radius:4px; font-size:0.75rem; font-weight:700; background:${statusColor}; color:#fff;">
              ${statusBadge}
            </span>
          </div>
        </div>
      </div>

      <!-- 2. RECIPIENT BLOCK (PATIENT OR IPM ORGANISATION) -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px 18px; margin-bottom:20px;">
        <div>
          <div style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:#718096; margin-bottom:4px;">
            <i class="fas fa-user-injured" style="color:#3498db;"></i> Renseignements Patient
          </div>
          <div style="font-size:1rem; font-weight:700; color:#1a202c;">${invoice.patient_first} ${invoice.patient_last}</div>
          <div style="font-size:0.8rem; color:#4a5568; margin-top:2px;">
            <div>Code Patient : <strong>${invoice.patient_code || 'PAT-N/A'}</strong></div>
            <div>Téléphone : ${invoice.patient_phone || '-'}</div>
            ${invoice.date_of_birth ? `<div>Né(e) le : ${new Date(invoice.date_of_birth).toLocaleDateString()} (${invoice.gender || ''})</div>` : ''}
          </div>
        </div>

        <div>
          <div style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:#718096; margin-bottom:4px;">
            <i class="fas fa-shield-alt" style="color:#3498db;"></i> Prise en charge Organisme Tiers-Payant
          </div>
          ${invoice.insurance_name ? `
            <div style="font-size:1rem; font-weight:700; color:#2c5282;">${invoice.insurance_name} ${invoice.insurance_code ? `(${invoice.insurance_code})` : ''}</div>
            <div style="font-size:0.8rem; color:#4a5568; margin-top:2px;">
              ${invoice.insurance_address ? `<div><i class="fas fa-map-marker-alt" style="color:#3498db; width:12px;"></i> ${invoice.insurance_address}</div>` : ''}
              ${invoice.policy_number ? `<div>Matricule / Police : <strong>${invoice.policy_number}</strong></div>` : ''}
              <div>Taux de prise en charge : <strong>${invoice.policy_coverage_rate || '80'}%</strong></div>
              ${invoice.insurance_phone ? `<div>Contact IPM : ${invoice.insurance_phone} ${invoice.insurance_email ? `| ${invoice.insurance_email}` : ''}</div>` : ''}
            </div>
          ` : `
            <div style="font-size:0.9rem; color:#718096; font-style:italic;">Régime Privé / Paiement direct 100% Patient</div>
          `}
        </div>
      </div>

      <!-- 3. DETAILED SERVICES & MEDICATIONS TABLE -->
      <table style="width:100%; border-collapse:collapse; margin-bottom:15px; font-size:0.85rem;">
        <thead>
          <tr style="background:#edf2f7; color:#2d3748; text-align:left; border-bottom:2px solid #cbd5e0;">
            <th style="padding:8px 10px;">#</th>
            <th style="padding:8px 10px;">Désignation de la Prestation / Acte / Médicament</th>
            <th style="padding:8px 10px; text-align:center;">Qté</th>
            <th style="padding:8px 10px; text-align:right;">Prix Unitaire</th>
            <th style="padding:8px 10px; text-align:right;">Total Brut</th>
            ${isIPM ? `<th style="padding:8px 10px; text-align:right; color:#2b6cb0;">Part IPM</th>` : ''}
          </tr>
        </thead>
        <tbody>
          ${lines.map((l, idx) => {
            const lineGross = parseFloat(l.total_line_amount || 0);
            const lineIpm = Math.round(lineGross * ((invoice.policy_coverage_rate || 80) / 100));
            return `
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:8px 10px; color:#718096;">${idx + 1}</td>
                <td style="padding:8px 10px; font-weight:600; color:#1a202c;">${l.description}</td>
                <td style="padding:8px 10px; text-align:center;">${l.quantity}</td>
                <td style="padding:8px 10px; text-align:right;">${parseFloat(l.unit_price).toLocaleString()} FCFA</td>
                <td style="padding:8px 10px; text-align:right; font-weight:700;">${lineGross.toLocaleString()} FCFA</td>
                ${isIPM ? `<td style="padding:8px 10px; text-align:right; font-weight:700; color:#2b6cb0;">${lineIpm.toLocaleString()} FCFA</td>` : ''}
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>

      <!-- 4. FINANCIAL TOTALS & VENTILATION -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-top:15px;">
        <div style="max-width:55%;">
          ${payments.length > 0 ? `
            <div style="background:#f0fff4; border:1px solid #c6f6d5; border-radius:6px; padding:8px 12px; font-size:0.8rem;">
              <div style="font-weight:700; color:#22543d; margin-bottom:3px;"><i class="fas fa-check-circle"></i> Historique des Règlements Reçus :</div>
              ${payments.map(p => `
                <div style="display:flex; justify-content:space-between; color:#2d3748; margin-bottom:2px;">
                  <span>${new Date(p.payment_date || p.created_at).toLocaleDateString()} — <strong>${p.payment_method}</strong> ${p.transaction_reference ? `(Réf: ${p.transaction_reference})` : ''}</span>
                  <strong>${parseFloat(p.amount).toLocaleString()} FCFA</strong>
                </div>
              `).join('')}
            </div>
          ` : `
            <div style="font-size:0.8rem; color:#718096; font-style:italic;">
              Aucun règlement encaissé à ce jour.
            </div>
          `}
          <div style="font-size:0.75rem; color:#a0aec0; margin-top:8px;">
            Document officiel certifié par SoftMed Health Information System.
          </div>
        </div>

        <div style="width:280px; background:#f8fafc; border:1px solid #cbd5e0; border-radius:8px; padding:12px; font-size:0.85rem;">
          <div style="display:flex; justify-content:space-between; margin-bottom:4px; color:#4a5568;">
            <span>Total Brut :</span>
            <strong>${totalGross.toLocaleString()} FCFA</strong>
          </div>
          ${invoice.insurance_company_id ? `
            <div style="display:flex; justify-content:space-between; margin-bottom:4px; color:#2b6cb0;">
              <span>Part Assurance / IPM :</span>
              <strong>${insuranceShare.toLocaleString()} FCFA</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:4px; color:#2d3748; font-weight:600;">
              <span>Part Patient :</span>
              <strong>${patientShare.toLocaleString()} FCFA</strong>
            </div>
          ` : ''}
          <div style="border-top:2px solid #cbd5e0; margin:6px 0; padding-top:6px; display:flex; justify-content:space-between; font-size:1rem; font-weight:800; color:#1a365d;">
            <span>${isIPM ? 'Total Dû par l\'IPM :' : 'Net Dû par le Patient :'}</span>
            <span>${(isIPM ? insuranceShare : patientShare).toLocaleString()} FCFA</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-top:3px; font-size:0.82rem; color:${balanceDue <= 0 ? '#27ae60' : '#e53e3e'}; font-weight:700;">
            <span>Reste à payer :</span>
            <span>${balanceDue > 0 ? balanceDue.toLocaleString() + ' FCFA' : 'SOLDE RÉGLÉ (0 FCFA)'}</span>
          </div>
        </div>
      </div>

      <!-- 5. BOTTOM OFFICIAL STAMP & SIGNATURE -->
      <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-top:30px; border-top:1px solid #e2e8f0; padding-top:18px;">
        <div style="font-size:0.8rem; color:#718096; max-width:45%;">
          <div>Arrêté la présente facture à la somme de :</div>
          <div style="font-weight:700; color:#2d3748; margin-top:2px;">
            ${(isIPM ? insuranceShare : patientShare).toLocaleString()} Francs CFA
          </div>
        </div>

        <div style="text-align:center;">
          <div style="font-size:0.8rem; font-weight:700; color:#2d3748; margin-bottom:6px;">
            Pour la Direction / Service Comptabilité
          </div>
          ${stampHtml}
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 4b. Invoice & Attached Justifications Email Dispatch Dialog
// -------------------------------------------------------------
let currentInvoiceEmailData = null;
let currentCustomInvoiceAttachments = [];
let currentEmailTargetType = 'PATIENT';

function createInvoiceEmailModalContainer() {
  let modal = document.getElementById('invoice-email-modal');
  if (!modal) {
    const div = document.createElement('div');
    div.className = 'modal-overlay';
    div.id = 'invoice-email-modal';
    div.style.cssText = 'display:none; justify-content:center; align-items:center; z-index:3200;';
    div.innerHTML = `
      <div class="modal-container" style="width:820px; max-width:96%; max-height:92vh; overflow-y:auto; padding:22px; animation: modalFadeIn 0.3s ease;">
        <div id="invoice-email-content"></div>
      </div>
    `;
    document.body.appendChild(div);
    modal = div;
  }
  return modal;
}

async function openSendInvoiceEmailModal(invoiceId, target = 'PATIENT') {
  const modal = createInvoiceEmailModalContainer();
  currentEmailTargetType = target;
  currentCustomInvoiceAttachments = [];

  try {
    showToast('Préparation des justificatifs et des données de facturation...', 'info');
    const [attData, logsData] = await Promise.all([
      api.request(`/billing/invoices/${invoiceId}/available-attachments`),
      api.request(`/billing/invoices/${invoiceId}/email-logs`).catch(() => [])
    ]);

    currentInvoiceEmailData = { ...attData, logs: logsData };
    renderInvoiceEmailModalContent();
    modal.style.display = 'flex';
  } catch (err) {
    showToast('Erreur lors du chargement de la facture: ' + err.message, 'error');
  }
}

function closeInvoiceEmailModal() {
  const modal = document.getElementById('invoice-email-modal');
  if (modal) modal.style.display = 'none';
}

function switchInvoiceEmailTarget(target) {
  currentEmailTargetType = target;
  if (!currentInvoiceEmailData) return;
  const inv = currentInvoiceEmailData.invoice || {};
  const emailInput = document.getElementById('inv-email-recipient');
  const subjectInput = document.getElementById('inv-email-subject');

  if (target === 'PATIENT') {
    if (emailInput) emailInput.value = currentInvoiceEmailData.patient_email || '';
    if (subjectInput) subjectInput.value = `[Facture Médicale] Facture N° ${inv.invoice_number || 'FAC'}`;
  } else if (target === 'IPM') {
    if (emailInput) emailInput.value = currentInvoiceEmailData.insurance_email || '';
    if (subjectInput) subjectInput.value = `[Bordereau / Facture Tiers-Payant IPM] ${inv.insurance_name || 'IPM'} - Facture N° ${inv.invoice_number || 'FAC'} (Patient: ${inv.patient_first} ${inv.patient_last})`;
  } else {
    if (emailInput) emailInput.value = '';
    if (subjectInput) subjectInput.value = `Facture Médicale N° ${inv.invoice_number || 'FAC'}`;
  }

  // Update active tab buttons visually
  const btns = document.querySelectorAll('.email-target-btn');
  btns.forEach(b => {
    if (b.dataset.target === target) {
      b.className = 'btn btn-primary btn-sm email-target-btn';
    } else {
      b.className = 'btn btn-secondary btn-sm email-target-btn';
    }
  });
}

function renderInvoiceEmailModalContent() {
  if (!currentInvoiceEmailData) return;
  const { invoice, patient_email, insurance_email, prescriptions = [], lab_orders = [], payments = [], logs = [], smtp_accounts = [] } = currentInvoiceEmailData;
  const container = document.getElementById('invoice-email-content');
  if (!container) return;

  const defaultEmail = currentEmailTargetType === 'IPM' ? (insurance_email || '') : (patient_email || '');
  const defaultSubject = currentEmailTargetType === 'IPM'
    ? `[Bordereau / Facture Tiers-Payant IPM] ${invoice.insurance_name || 'IPM'} - Facture N° ${invoice.invoice_number} (Patient: ${invoice.patient_first} ${invoice.patient_last})`
    : `[Facture Médicale] Facture N° ${invoice.invoice_number} (${invoice.patient_first} ${invoice.patient_last})`;

  container.innerHTML = `
    <div class="modal-header" style="border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:15px; display:flex; justify-content:space-between; align-items:center;">
      <div style="display:flex; align-items:center; gap:10px;">
        <div style="width:38px; height:38px; border-radius:8px; background:#eff6ff; color:#1e40af; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
          <i class="fas fa-paper-plane"></i>
        </div>
        <div>
          <h4 class="modal-title" style="margin:0; font-size:1.1rem; font-weight:800; color:var(--text-primary);">
            Envoi de Facture & Pièces Jointes par Email
          </h4>
          <div style="font-size:0.8rem; color:var(--text-muted);">
            Facture N° <strong>${invoice.invoice_number}</strong> • Patient : <strong>${invoice.patient_first} ${invoice.patient_last}</strong> (${invoice.patient_code})
          </div>
        </div>
      </div>
      <button class="modal-close" onclick="closeInvoiceEmailModal()">&times;</button>
    </div>

    <!-- Sender SMTP Account Selection -->
    <div class="form-group" style="margin-bottom:14px;">
      ${(smtp_accounts && smtp_accounts.length > 0) ? `
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px 14px;">
          <label class="form-label" style="font-weight:700; color:#1e3a8a; display:flex; align-items:center; gap:6px; margin-bottom:4px;">
            <i class="fas fa-at text-primary"></i> Expéditeur (Compte de messagerie de la Clinique) :
          </label>
          <select class="form-control" id="inv-smtp-account-select" style="font-size:0.85rem; font-weight:600; background:#ffffff;">
            ${smtp_accounts.map(acc => `
              <option value="${acc.id}" ${acc.is_default ? 'selected' : ''}>
                ${acc.account_name} — "${acc.from_name}" &lt;${acc.from_email}&gt; ${acc.is_default ? '(Par défaut)' : ''}
              </option>
            `).join('')}
          </select>
          <div style="font-size:0.75rem; color:#64748b; margin-top:3px;">
            <i class="fas fa-shield-alt text-success"></i> Le patient et l'IPM recevront le courriel avec cette adresse d'expédition vérifiée.
          </div>
        </div>
      ` : `
        <div id="smtp-missing-banner" style="background:#fff7ed; border:2px solid #f97316; border-radius:10px; padding:14px 18px; display:flex; align-items:flex-start; gap:14px;">
          <div style="flex-shrink:0; width:36px; height:36px; border-radius:50%; background:#f97316; display:flex; align-items:center; justify-content:center;">
            <i class="fas fa-exclamation-triangle" style="color:#fff; font-size:1rem;"></i>
          </div>
          <div style="flex:1;">
            <div style="font-weight:800; color:#c2410c; font-size:0.95rem; margin-bottom:4px;">
              Aucun compte de messagerie configuré
            </div>
            <div style="font-size:0.83rem; color:#78350f; line-height:1.5;">
              Vous devez d'abord configurer un compte SMTP pour votre clinique avant de pouvoir envoyer des emails.
              <br/>Rendez-vous dans <strong>Paramètres → Comptes de messagerie</strong> pour en ajouter un.
            </div>
            <button type="button" onclick="closeInvoiceEmailModal(); navigate('settings');" class="btn btn-sm" style="margin-top:10px; background:#f97316; color:#fff; border:none; font-weight:700; font-size:0.8rem; padding:5px 14px; border-radius:6px;">
              <i class="fas fa-cog"></i> Aller dans les Paramètres
            </button>
          </div>
        </div>
      `}
    </div>

    <!-- Recipient Type Switcher -->
    <div style="margin-bottom:15px;">
      <label class="form-label" style="font-weight:700;">Destinataire :</label>
      <div style="display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn ${currentEmailTargetType === 'PATIENT' ? 'btn-primary' : 'btn-secondary'} btn-sm email-target-btn" data-target="PATIENT" onclick="switchInvoiceEmailTarget('PATIENT')">
          <i class="fas fa-user-injured"></i> 👤 Patient (${invoice.patient_first} ${invoice.patient_last})
        </button>
        ${invoice.insurance_name ? `
          <button type="button" class="btn ${currentEmailTargetType === 'IPM' ? 'btn-primary' : 'btn-secondary'} btn-sm email-target-btn" data-target="IPM" onclick="switchInvoiceEmailTarget('IPM')">
            <i class="fas fa-building"></i> 🏢 IPM / Assurance (${invoice.insurance_name})
          </button>
        ` : ''}
        <button type="button" class="btn ${currentEmailTargetType === 'CUSTOM' ? 'btn-primary' : 'btn-secondary'} btn-sm email-target-btn" data-target="CUSTOM" onclick="switchInvoiceEmailTarget('CUSTOM')">
          <i class="fas fa-envelope"></i> ✏️ Autre Destinataire
        </button>
      </div>
    </div>

    <form onsubmit="submitInvoiceEmailForm(event)">
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-bottom:12px;">
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">Adresse Email du Destinataire *</label>
          <input type="email" class="form-control" id="inv-email-recipient" value="${defaultEmail}" required placeholder="ex: patient@gmail.com ou tierspayant@ipm.sn" />
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">Objet de l'Email *</label>
          <input type="text" class="form-control" id="inv-email-subject" value="${defaultSubject}" required placeholder="Objet du message..." />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Message d'accompagnement (facultatif)</label>
        <textarea class="form-control" id="inv-email-message" rows="2" placeholder="Veuillez trouver ci-joint votre facture médicale ainsi que les pièces justificatives..."></textarea>
      </div>

      <!-- ATTACHMENTS SELECTION BOX -->
      <div style="background:rgba(37,99,235,0.04); border:1.5px solid rgba(37,99,235,0.25); border-radius:10px; padding:15px; margin-bottom:18px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <div style="font-size:0.9rem; font-weight:800; color:#1e40af; display:flex; align-items:center; gap:8px;">
            <i class="fas fa-paperclip"></i>
            <span>Sélectionner les Pièces Jointes & Justificatifs Médicaux</span>
          </div>
          <span style="font-size:0.75rem; color:#2563eb; font-weight:600;">Inclus automatiquement dans le courriel</span>
        </div>

        <!-- 1. Mandatory Official Invoice -->
        <div style="background:#fff; border:1px solid #cbd5e1; border-radius:6px; padding:8px 12px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:10px; font-size:0.85rem;">
            <input type="checkbox" checked disabled id="att-invoice-check" />
            <i class="fas fa-file-invoice-dollar" style="color:#2563eb; font-size:1.1rem;"></i>
            <span><strong>Facture Médicale Officielle (PDF & Tableau Récapitulatif)</strong> • ${invoice.invoice_number}</span>
          </div>
          <span class="badge" style="background:#e0f2fe; color:#0369a1; font-size:0.72rem; padding:2px 8px;">Inclus par défaut</span>
        </div>

        <!-- 2. Attached Prescriptions (Ordonnances) -->
        ${prescriptions.length > 0 ? `
          <div style="margin-top:10px;">
            <div style="font-size:0.8rem; font-weight:700; color:#334155; margin-bottom:4px;"><i class="fas fa-prescription-bottle-alt text-primary"></i> Ordonnances Médicales associées :</div>
            ${prescriptions.map((rx, idx) => `
              <label style="display:flex; justify-content:space-between; align-items:center; background:#fff; border:1px solid #e2e8f0; border-radius:6px; padding:7px 12px; margin-bottom:4px; font-size:0.82rem; cursor:pointer;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <input type="checkbox" class="rx-attachment-check" value="${rx.id}" checked />
                  <i class="fas fa-file-prescription text-primary"></i>
                  <span>Ordonnance <strong>${rx.prescription_code}</strong> (${Array.isArray(rx.items) ? rx.items.length : 0} médicament(s) prescrits)</span>
                </div>
                <span style="font-size:0.75rem; color:#64748b;">${new Date(rx.created_at || rx.issued_at || Date.now()).toLocaleDateString('fr-FR')}</span>
              </label>
            `).join('')}
          </div>
        ` : ''}

        <!-- 3. Attached Lab Reports & Scans (Bulletins d'Analyses) -->
        ${lab_orders.length > 0 ? `
          <div style="margin-top:10px;">
            <div style="font-size:0.8rem; font-weight:700; color:#334155; margin-bottom:4px;"><i class="fas fa-vial text-primary"></i> Bulletins & Scans d'Analyses Médicales :</div>
            ${lab_orders.map(lo => `
              <label style="display:flex; justify-content:space-between; align-items:center; background:#fff; border:1px solid #e2e8f0; border-radius:6px; padding:7px 12px; margin-bottom:4px; font-size:0.82rem; cursor:pointer;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <input type="checkbox" class="lab-attachment-check" value="${lo.id}" ${lo.document_url ? 'checked' : ''} />
                  <i class="${lo.document_url ? 'fas fa-file-pdf text-danger' : 'fas fa-microscope text-primary'}"></i>
                  <span><strong>${lo.test_name}</strong> (${lo.category || 'Biologie'})</span>
                  ${lo.document_url ? `<span class="badge badge-success" style="background:#ecfdf5; color:#059669; font-size:0.68rem; padding:1px 6px;">Scan Joint</span>` : ''}
                </div>
                <span style="font-size:0.75rem; color:#64748b;">${new Date(lo.created_at).toLocaleDateString('fr-FR')}</span>
              </label>
            `).join('')}
          </div>
        ` : ''}

        <!-- 4. Custom Uploaded Justifications Zone -->
        <div style="margin-top:12px; border-top:1px dashed #cbd5e1; padding-top:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span style="font-size:0.8rem; font-weight:700; color:#334155;"><i class="fas fa-plus-circle text-primary"></i> Ajouter un justificatif complémentaire (Bon IPM, Reçu, Scan) :</span>
            <input type="file" id="inv-custom-attachment-file" style="display:none;" accept="image/*,.pdf" onchange="handleInvoiceCustomAttachmentUpload(this)" />
            <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('inv-custom-attachment-file').click()" style="font-size:0.75rem; padding:3px 10px;">
              <i class="fas fa-upload"></i> Uploader Fichier / Scan
            </button>
          </div>
          <div id="inv-custom-attachments-list"></div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px; border-top:1px solid var(--border-color); padding-top:15px;">
        <button class="btn btn-secondary" type="button" onclick="closeInvoiceEmailModal()">Annuler</button>
        <button class="btn btn-primary" type="submit" id="btn-submit-invoice-email"
          ${(!smtp_accounts || smtp_accounts.length === 0) ? 'disabled title="Configurez d\'abord un compte de messagerie SMTP"' : ''}
          style="background:${(!smtp_accounts || smtp_accounts.length === 0) ? '#94a3b8' : 'linear-gradient(135deg, #1e40af, #2563eb)'}; font-weight:700; padding:8px 20px; box-shadow:${(!smtp_accounts || smtp_accounts.length === 0) ? 'none' : '0 2px 8px rgba(37,99,235,0.3)'}; cursor:${(!smtp_accounts || smtp_accounts.length === 0) ? 'not-allowed' : 'pointer'};">
          <i class="fas fa-paper-plane"></i> <span>Envoyer la Facture et les Pièces Jointes</span>
        </button>
      </div>
    </form>

    <!-- Historical Dispatches Log Table -->
    ${logs && logs.length > 0 ? `
      <div style="margin-top:25px; border-top:1px solid var(--border-color); padding-top:15px;">
        <h5 style="margin:0 0 10px 0; color:var(--text-primary); font-size:0.9rem; display:flex; align-items:center; gap:6px;">
          <i class="fas fa-history" style="color:var(--primary);"></i> Historique des envois pour cette facture (${logs.length})
        </h5>
        <div class="table-responsive">
          <table class="table" style="font-size:0.78rem;">
            <thead>
              <tr>
                <th>Date & Heure</th>
                <th>Type</th>
                <th>Destinataire</th>
                <th>Expéditeur</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              ${logs.map(l => `
                <tr>
                  <td>${new Date(l.created_at).toLocaleString('fr-FR')}</td>
                  <td><span class="badge" style="background:#e0f2fe; color:#0369a1; font-size:0.7rem;">${l.recipient_type}</span></td>
                  <td><strong>${l.recipient_email}</strong></td>
                  <td>${l.sender_first ? `Dr/Agent ${l.sender_first} ${l.sender_last}` : 'Système'}</td>
                  <td><span class="badge badge-success" style="background:#10b981; color:#fff; font-size:0.7rem;"><i class="fas fa-check"></i> Envoyé</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    ` : ''}
  `;

  renderInvoiceCustomAttachmentsList();
}

async function handleInvoiceCustomAttachmentUpload(inputEl) {
  const file = inputEl.files[0];
  if (!file) return;

  if (file.size > 25 * 1024 * 1024) {
    showToast('Fichier trop volumineux (max 25 Mo)', 'error');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  const baseUrl = window.API_BASE_URL || '/api';
  const uploadUrl = `${baseUrl.replace(/\/$/, '')}/upload`;

  try {
    showToast(`Téléversement de ${file.name}...`, 'info');
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        ...(state.token ? { 'Authorization': `Bearer ${state.token}` } : {})
      },
      body: formData
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Échec de l\'upload');
    }

    currentCustomInvoiceAttachments.push({
      name: file.name,
      url: data.url,
      type: file.type === 'application/pdf' ? 'Document PDF' : 'Scan Image'
    });

    renderInvoiceCustomAttachmentsList();
    showToast(`Fichier ${file.name} attaché avec succès !`, 'success');
  } catch (err) {
    showToast(`Erreur d'upload: ${err.message}`, 'error');
  }
}

function renderInvoiceCustomAttachmentsList() {
  const container = document.getElementById('inv-custom-attachments-list');
  if (!container) return;

  if (currentCustomInvoiceAttachments.length === 0) {
    container.innerHTML = `<div style="font-size:0.75rem; color:var(--text-muted); font-style:italic;">Aucun justificatif personnalisé ajouté.</div>`;
    return;
  }

  container.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:4px; margin-top:4px;">
      ${currentCustomInvoiceAttachments.map((att, idx) => `
        <div style="display:flex; justify-content:space-between; align-items:center; background:#fff; border:1px solid #86efac; border-radius:6px; padding:5px 10px; font-size:0.8rem;">
          <div style="display:flex; align-items:center; gap:6px;">
            <i class="fas fa-check-circle text-success"></i>
            <strong>${att.name}</strong>
            <span style="color:#64748b; font-size:0.72rem;">(${att.type})</span>
          </div>
          <button type="button" class="btn btn-danger btn-sm" onclick="removeInvoiceCustomAttachment(${idx})" style="padding:1px 6px; font-size:0.7rem; background:var(--danger); border-color:var(--danger);">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `).join('')}
    </div>
  `;
}

function removeInvoiceCustomAttachment(idx) {
  currentCustomInvoiceAttachments.splice(idx, 1);
  renderInvoiceCustomAttachmentsList();
}

async function submitInvoiceEmailForm(e) {
  e.preventDefault();
  if (!currentInvoiceEmailData) return;
  const invoice = currentInvoiceEmailData.invoice;
  const recipient_email = document.getElementById('inv-email-recipient').value;
  const subject = document.getElementById('inv-email-subject').value;
  const message = document.getElementById('inv-email-message').value;

  const rxCheckboxes = document.querySelectorAll('.rx-attachment-check:checked');
  const selected_prescription_ids = Array.from(rxCheckboxes).map(cb => cb.value);

  const labCheckboxes = document.querySelectorAll('.lab-attachment-check:checked');
  const selected_lab_ids = Array.from(labCheckboxes).map(cb => cb.value);

  const smtp_account_id = document.getElementById('inv-smtp-account-select')?.value || undefined;

  const btn = document.getElementById('btn-submit-invoice-email');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Envoi en cours...`;
  }

  try {
    showToast('Envoi du courriel avec pièces jointes en cours...', 'info');
    const result = await api.request(`/billing/invoices/${invoice.id}/send-email`, {
      method: 'POST',
      body: JSON.stringify({
        recipient_type: currentEmailTargetType,
        recipient_email,
        subject,
        message,
        smtp_account_id,
        include_prescriptions: selected_prescription_ids.length > 0,
        include_lab_results: selected_lab_ids.length > 0,
        selected_prescription_ids,
        selected_lab_ids,
        custom_attachments: currentCustomInvoiceAttachments
      })
    });

    showToast(result.message || 'Facture et pièces jointes transmises avec succès !', 'success');
    closeInvoiceEmailModal();
    
    // Refresh billing data if in billing tab
    if (state.currentTab === 'billing') {
      navigate('billing');
    }
  } catch (err) {
    showToast(`Erreur d'envoi: ${err.message}`, 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i class="fas fa-paper-plane"></i> <span>Envoyer la Facture et les Pièces Jointes</span>`;
    }
  }
}

// ============================================================================
// 5. Pharmacy & Stocks Inventory UI
// ============================================================================
async function renderInventory(container) {
  const stock = await api.request('/inventory/items');
  window._currentStockItems = stock || [];

  const totalItems = window._currentStockItems.length;
  const lowStockItems = window._currentStockItems.filter(i => (i.current_stock_quantity || 0) <= (i.minimum_threshold_alert || 0)).length;
  const totalStockValue = window._currentStockItems.reduce((acc, i) => acc + ((i.current_stock_quantity || 0) * (parseFloat(i.selling_price) || 0)), 0);

  container.innerHTML = `
    <!-- Top Statistics / Metrics -->
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:15px; margin-bottom:20px;">
      <div class="card" style="margin:0; padding:15px; display:flex; align-items:center; gap:15px; border-left:4px solid var(--primary);">
        <div style="width:45px; height:45px; border-radius:10px; background:rgba(37,99,235,0.1); color:var(--primary); display:flex; align-items:center; justify-content:center; font-size:1.3rem;">
          <i class="fas fa-pills"></i>
        </div>
        <div>
          <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600;">Articles Enregistrés</div>
          <div style="font-size:1.4rem; font-weight:800; color:var(--text-main);">${totalItems}</div>
        </div>
      </div>
      <div class="card" style="margin:0; padding:15px; display:flex; align-items:center; gap:15px; border-left:4px solid var(--danger);">
        <div style="width:45px; height:45px; border-radius:10px; background:rgba(239,68,68,0.1); color:var(--danger); display:flex; align-items:center; justify-content:center; font-size:1.3rem;">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div>
          <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600;">Alertes Seuil Bas</div>
          <div style="font-size:1.4rem; font-weight:800; color:var(--danger);">${lowStockItems}</div>
        </div>
      </div>
      <div class="card" style="margin:0; padding:15px; display:flex; align-items:center; gap:15px; border-left:4px solid var(--success);">
        <div style="width:45px; height:45px; border-radius:10px; background:rgba(16,185,129,0.1); color:var(--success); display:flex; align-items:center; justify-content:center; font-size:1.3rem;">
          <i class="fas fa-coins"></i>
        </div>
        <div>
          <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600;">Valeur Marchande Stock</div>
          <div style="font-size:1.4rem; font-weight:800; color:var(--success);">${Math.round(totalStockValue).toLocaleString()} XOF</div>
        </div>
      </div>
    </div>

    <div class="agenda-grid" style="grid-template-columns: 340px 1fr; gap:20px;">
      <!-- Left Card: Add Stock Item -->
      <div class="card" style="align-self:start;">
        <div class="card-title" style="display:flex; align-items:center; gap:8px;">
          <i class="fas fa-folder-plus text-primary"></i> ${t('addStockItem')}
        </div>
        <form onsubmit="createStockItem(event)">
          <div class="form-group">
            <label class="form-label">SKU (Code Unique) *</label>
            <input type="text" class="form-control" id="st-sku" placeholder="ex: AMLO-5-CP" required />
          </div>
          <div class="form-group">
            <label class="form-label">Désignation Produit *</label>
            <input type="text" class="form-control" id="st-name" placeholder="ex: Amlodipine 5mg" required />
          </div>
          <div class="form-group">
            <label class="form-label">Spécialité Cible *</label>
            <select class="form-control" id="st-specialty" required>
              <option value="GENERAL">💊 Tous / Médecine Générale (Commun)</option>
              <option value="CARDIO">❤️ Cardiologie & Vasculaire</option>
              <option value="PED">👶 Pédiatrie & Néonatalogie</option>
              <option value="GYN-OBS">🤰 Gynécologie-Obstétrique</option>
              <option value="DERMA">🧴 Dermatologie</option>
              <option value="OPHTA">👁️ Ophtalmologie</option>
              <option value="GASTRO">🫁 Gastro-entérologie</option>
              <option value="ORL">👂 Oto-Rhino-Laryngologie (ORL)</option>
              <option value="NEURO">🧠 Neurologie & Psychiatrie</option>
              <option value="TRAUMA-ORTHO">🦴 Traumatologie & Orthopédie</option>
              <option value="CHIR-GEN">✂️ Chirurgie Générale</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Catégorie *</label>
            <select class="form-control" id="st-category" required>
              <option value="MEDICATION">Médicament (MEDICATION)</option>
              <option value="CONSUMABLE">Matériel Clinique (CONSUMABLE)</option>
              <option value="SURGICAL">Chirurgical (SURGICAL)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Posologie usuelle / Dosage</label>
            <input type="text" class="form-control" id="st-dosage" placeholder="ex: 1 cp matin et soir" />
          </div>
          <div class="form-group">
            <label class="form-label">${t('unit')} *</label>
            <input type="text" class="form-control" id="st-unit" placeholder="ex: BOITE, FLACON, TUBE" required />
          </div>
          <div class="form-group">
            <label class="form-label">${t('threshold')} *</label>
            <input type="number" class="form-control" id="st-threshold" value="10" min="0" required />
          </div>
          <div class="form-group">
            <label class="form-label">${t('purchaseCost')} (XOF) *</label>
            <input type="number" class="form-control" id="st-cost" placeholder="ex: 1500" min="0" step="any" required />
          </div>
          <div class="form-group">
            <label class="form-label">${t('sellingPrice')} (XOF) *</label>
            <input type="number" class="form-control" id="st-selling" placeholder="ex: 2500" min="0" step="any" required />
          </div>
          <button class="btn btn-primary" style="width:100%;"><i class="fas fa-save"></i> Enregistrer l'Article</button>
        </form>
      </div>
      
      <!-- Right Card: Stock List & Actions -->
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; flex-wrap:wrap; gap:10px;">
          <div class="card-title" style="margin:0; display:flex; align-items:center; gap:8px;">
            <i class="fas fa-boxes text-primary"></i> ${t('pharmacyStock')}
          </div>
          <!-- Filter Controls -->
          <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
            <div style="position:relative;">
              <i class="fas fa-search" style="position:absolute; left:10px; top:50%; transform:translateY(-50%); color:var(--text-muted); font-size:0.85rem;"></i>
              <input type="text" id="stock-search" class="form-control" placeholder="Rechercher par SKU ou nom..." style="padding-left:30px; width:190px; font-size:0.85rem;" oninput="filterInventoryTable()" />
            </div>
            <select id="stock-specialty-filter" class="form-control" style="width:160px; font-size:0.85rem;" onchange="filterInventoryTable()">
              <option value="">Toutes spécialités</option>
              <option value="GENERAL">💊 Général / Tous</option>
              <option value="CARDIO">❤️ Cardiologie</option>
              <option value="PED">👶 Pédiatrie</option>
              <option value="GYN-OBS">🤰 Gynécologie</option>
              <option value="DERMA">🧴 Dermatologie</option>
              <option value="OPHTA">👁️ Ophtalmologie</option>
              <option value="GASTRO">🫁 Gastro-entérologie</option>
              <option value="ORL">👂 ORL</option>
              <option value="NEURO">🧠 Neurologie</option>
              <option value="TRAUMA-ORTHO">🦴 Traumato-Ortho</option>
              <option value="CHIR-GEN">✂️ Chirurgie</option>
            </select>
            <select id="stock-status-filter" class="form-control" style="width:110px; font-size:0.85rem;" onchange="filterInventoryTable()">
              <option value="ALL">Tous</option>
              <option value="ACTIVE" selected>Actifs</option>
              <option value="ARCHIVED">Archivés</option>
            </select>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table" id="inventory-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Désignation & Spécialité</th>
                <th>Catégorie</th>
                <th>Unité</th>
                <th>Quantité</th>
                <th>P. Achat</th>
                <th>P. Vente</th>
                <th>Statut</th>
                <th style="text-align:right;">Actions</th>
              </tr>
            </thead>
            <tbody id="inventory-table-body">
              ${renderInventoryRows(window._currentStockItems)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function getSpecialtyBadgeInfo(specCode) {
  const code = (specCode || 'GENERAL').toUpperCase();
  switch (code) {
    case 'CARDIO':
      return { label: 'Cardiologie', bg: 'rgba(239,68,68,0.12)', color: '#dc2626', icon: 'fa-heartbeat' };
    case 'PED':
      return { label: 'Pédiatrie', bg: 'rgba(59,130,246,0.12)', color: '#2563eb', icon: 'fa-baby' };
    case 'GYN-OBS':
      return { label: 'Gynécologie', bg: 'rgba(236,72,153,0.12)', color: '#db2777', icon: 'fa-female' };
    case 'DERMA':
      return { label: 'Dermatologie', bg: 'rgba(139,92,246,0.12)', color: '#7c3aed', icon: 'fa-hand-sparkles' };
    case 'OPHTA':
      return { label: 'Ophtalmologie', bg: 'rgba(6,182,212,0.12)', color: '#0891b2', icon: 'fa-eye' };
    case 'GASTRO':
      return { label: 'Gastro-entéro', bg: 'rgba(245,158,11,0.12)', color: '#d97706', icon: 'fa-utensils' };
    case 'ORL':
      return { label: 'ORL', bg: 'rgba(20,184,166,0.12)', color: '#0d9488', icon: 'fa-head-side-cough' };
    case 'NEURO':
      return { label: 'Neurologie', bg: 'rgba(99,102,241,0.12)', color: '#4f46e5', icon: 'fa-brain' };
    case 'TRAUMA-ORTHO':
      return { label: 'Traumato-Ortho', bg: 'rgba(234,88,12,0.12)', color: '#c2410c', icon: 'fa-bone' };
    case 'CHIR-GEN':
      return { label: 'Chirurgie', bg: 'rgba(220,38,38,0.12)', color: '#b91c1c', icon: 'fa-scalpel' };
    default:
      return { label: 'Tous / Général', bg: 'rgba(16,185,129,0.12)', color: '#059669', icon: 'fa-pills' };
  }
}

function renderInventoryRows(items) {
  if (!items || items.length === 0) {
    return `<tr><td colspan="9" style="text-align:center; padding:30px; color:var(--text-muted);"><i class="fas fa-box-open" style="font-size:2rem; margin-bottom:10px; display:block;"></i> Aucun article trouvé dans l'inventaire</td></tr>`;
  }

  return items.map(item => {
    const isLow = (item.current_stock_quantity || 0) <= (item.minimum_threshold_alert || 0);
    const isActive = item.is_active !== false;
    const catLabel = item.category === 'MEDICATION' ? 'Médicament' : (item.category === 'CONSUMABLE' ? 'Matériel' : (item.category === 'SURGICAL' ? 'Chirurgical' : item.category));
    const safeName = (item.name || '').replace(/'/g, "\\'");
    const specInfo = getSpecialtyBadgeInfo(item.target_specialty);

    return `
      <tr data-sku="${(item.sku || '').toLowerCase()}" data-name="${(item.name || '').toLowerCase()}" data-category="${item.category || ''}" data-specialty="${(item.target_specialty || 'GENERAL').toUpperCase()}" data-active="${isActive ? 'ACTIVE' : 'ARCHIVED'}" style="${!isActive ? 'opacity:0.65; background:rgba(0,0,0,0.02);' : ''}">
        <td><strong>${item.sku}</strong></td>
        <td>
          <div style="font-weight:600; color:var(--text-main);">${item.name}</div>
          <div style="display:flex; align-items:center; gap:6px; margin-top:2px;">
            <span class="badge" style="font-size:0.7rem; padding:2px 7px; border-radius:10px; background:${specInfo.bg}; color:${specInfo.color}; font-weight:700;">
              <i class="fas ${specInfo.icon}"></i> ${specInfo.label}
            </span>
            ${item.default_dosage ? `<span style="font-size:0.7rem; color:var(--text-muted);"><i class="fas fa-prescription-bottle-alt"></i> ${item.default_dosage}</span>` : ''}
          </div>
        </td>
        <td><span class="badge" style="font-size:0.75rem; background:rgba(37,99,235,0.08); color:var(--primary); padding:3px 8px; border-radius:4px;">${catLabel}</span></td>
        <td>${item.unit}</td>
        <td>
          <span class="status-badge ${isLow ? 'externe' : 'interne'}" style="background-color: ${isLow ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)'}; color: ${isLow ? 'var(--danger)' : 'var(--success)'}; font-weight:700;">
            ${item.current_stock_quantity || 0}
          </span>
          ${isLow ? '<span style="font-size:0.68rem; color:var(--danger); display:block; margin-top:2px;"><i class="fas fa-exclamation-circle"></i> Stock bas</span>' : ''}
        </td>
        <td>${parseFloat(item.unit_cost_price || 0).toLocaleString()} XOF</td>
        <td><strong>${parseFloat(item.selling_price || 0).toLocaleString()} XOF</strong></td>
        <td>
          <span class="badge" style="font-size:0.75rem; padding:4px 8px; border-radius:12px; background:${isActive ? 'rgba(16,185,129,0.12)' : 'rgba(100,116,139,0.15)'}; color:${isActive ? 'var(--success)' : '#64748b'}; font-weight:600;">
            <i class="fas ${isActive ? 'fa-check-circle' : 'fa-archive'}"></i> ${isActive ? 'Actif' : 'Archivé'}
          </span>
        </td>
        <td style="text-align:right;">
          <div style="display:inline-flex; gap:5px; justify-content:flex-end;">
            <button class="btn btn-secondary" style="font-size:0.72rem; padding:5px 9px;" onclick="openRestockModal('${item.id}', '${safeName}')" title="Approvisionner">
              <i class="fas fa-plus"></i> <span style="display:none; @media(min-width:1200px){display:inline;}">Entrée</span>
            </button>
            <button class="btn btn-danger" style="font-size:0.72rem; padding:5px 9px; background-color:rgba(239,68,68,0.08); color:var(--danger); border:1px solid rgba(239,68,68,0.2);" onclick="simulateDepletion('${item.id}', '${safeName}')" title="Consommer / Décréter">
              <i class="fas fa-minus"></i> <span style="display:none; @media(min-width:1200px){display:inline;}">Sortie</span>
            </button>
            <button class="btn btn-outline" style="font-size:0.72rem; padding:5px 9px; border:1px solid var(--border-color); color:var(--text-main);" onclick="openEditStockModal('${item.id}')" title="Modifier le médicament">
              <i class="fas fa-pen"></i>
            </button>
            <button class="btn btn-danger" style="font-size:0.72rem; padding:5px 9px; border:1px solid rgba(239,68,68,0.2); color:var(--danger); background:transparent;" onclick="deleteOrArchiveStockItem('${item.id}', '${safeName}', ${item.current_stock_quantity || 0})" title="Supprimer ou Archiver">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function filterInventoryTable() {
  const search = (document.getElementById('stock-search')?.value || '').toLowerCase().trim();
  const cat = document.getElementById('stock-category-filter')?.value || '';
  const spec = document.getElementById('stock-specialty-filter')?.value || '';
  const status = document.getElementById('stock-status-filter')?.value || 'ALL';

  const rows = document.querySelectorAll('#inventory-table-body tr');
  rows.forEach(r => {
    if (!r.dataset.sku) return;
    const matchSearch = !search || r.dataset.sku.includes(search) || r.dataset.name.includes(search);
    const matchCat = !cat || r.dataset.category === cat;
    const matchSpec = !spec || r.dataset.specialty === spec;
    const matchStatus = status === 'ALL' || r.dataset.active === status;

    if (matchSearch && matchCat && matchSpec && matchStatus) {
      r.style.display = '';
    } else {
      r.style.display = 'none';
    }
  });
}

async function createStockItem(e) {
  e.preventDefault();
  const skuEl = document.getElementById('st-sku');
  const nameEl = document.getElementById('st-name');
  const catEl = document.getElementById('st-category');
  const specEl = document.getElementById('st-specialty');
  const dosEl = document.getElementById('st-dosage');
  const unitEl = document.getElementById('st-unit');
  const threshEl = document.getElementById('st-threshold');
  const costEl = document.getElementById('st-cost');
  const sellEl = document.getElementById('st-selling');

  const name = nameEl ? nameEl.value.trim() : '';
  const sku = (skuEl && skuEl.value.trim()) ? skuEl.value.trim() : ((name || 'MED').replace(/[^a-zA-Z0-9]/g, '').substring(0, 8).toUpperCase() + '-' + Math.floor(100 + Math.random() * 900));
  const category = catEl ? catEl.value : 'MEDICATION';
  const target_specialty = specEl ? specEl.value : 'GENERAL';
  const default_dosage = dosEl ? dosEl.value : '';
  const unit = unitEl ? unitEl.value.trim() : 'Boîte';
  const minimum_threshold_alert = threshEl ? parseInt(threshEl.value || 10, 10) : 10;
  const unit_cost_price = costEl ? parseFloat(costEl.value || 0) : 0;
  const selling_price = sellEl ? parseFloat(sellEl.value || 0) : 0;

  try {
    await api.request('/inventory/items', {
      method: 'POST',
      body: JSON.stringify({
        sku, name, category, target_specialty, default_dosage, unit, minimum_threshold_alert, unit_cost_price, selling_price
      })
    });
    showToast('Article inventorié créé avec succès!');
    navigate('inventory');
  } catch (err) {
    showToast(err.message || 'Erreur lors de la création de l\'article', 'error');
  }
}

// Edit Stock Item Modal handlers
function openEditStockModal(id) {
  const item = (window._currentStockItems || []).find(i => i.id === id);
  if (!item) {
    showToast('Article introuvable', 'error');
    return;
  }

  document.getElementById('edit-st-id').value = item.id;
  document.getElementById('edit-st-sku').value = item.sku || '';
  document.getElementById('edit-st-name').value = item.name || '';
  document.getElementById('edit-st-category').value = item.category || 'MEDICATION';
  document.getElementById('edit-st-specialty').value = (item.target_specialty || 'GENERAL').toUpperCase();
  document.getElementById('edit-st-dosage').value = item.default_dosage || '';
  document.getElementById('edit-st-unit').value = item.unit || '';
  document.getElementById('edit-st-threshold').value = item.minimum_threshold_alert !== undefined ? item.minimum_threshold_alert : 10;
  document.getElementById('edit-st-cost').value = item.unit_cost_price !== undefined ? item.unit_cost_price : '';
  document.getElementById('edit-st-selling').value = item.selling_price !== undefined ? item.selling_price : '';
  document.getElementById('edit-st-active').checked = item.is_active !== false;

  const deleteBtn = document.getElementById('edit-st-delete-btn');
  if (deleteBtn) {
    deleteBtn.onclick = () => {
      closeEditStockModal();
      deleteOrArchiveStockItem(item.id, item.name, item.current_stock_quantity || 0);
    };
  }

  const modal = document.getElementById('edit-stock-modal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeEditStockModal() {
  const modal = document.getElementById('edit-stock-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

async function submitEditStock(e) {
  e.preventDefault();
  const id = document.getElementById('edit-st-id').value;
  const sku = document.getElementById('edit-st-sku').value;
  const name = document.getElementById('edit-st-name').value;
  const category = document.getElementById('edit-st-category').value;
  const target_specialty = document.getElementById('edit-st-specialty').value;
  const default_dosage = document.getElementById('edit-st-dosage').value;
  const unit = document.getElementById('edit-st-unit').value;
  const minimum_threshold_alert = document.getElementById('edit-st-threshold').value;
  const unit_cost_price = document.getElementById('edit-st-cost').value;
  const selling_price = document.getElementById('edit-st-selling').value;
  const is_active = document.getElementById('edit-st-active').checked;

  try {
    await api.request(`/inventory/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        sku,
        name,
        category,
        target_specialty,
        default_dosage,
        unit,
        minimum_threshold_alert,
        unit_cost_price,
        selling_price,
        is_active
      })
    });

    showToast('Article modifié avec succès!');
    closeEditStockModal();
    navigate('inventory');
  } catch (err) {
    showToast(err.error || 'Erreur lors de la modification de l\'article', 'error');
  }
}

async function deleteOrArchiveStockItem(id, name, currentQty) {
  if (currentQty > 0) {
    const doArchive = confirm(
      `⚠️ Impossible de supprimer définitivement le médicament "${name}" car il dispose encore d'un stock de ${currentQty} unité(s).\n\nSouhaitez-vous le désactiver / archiver à la place pour qu'il n'apparaisse plus dans les sélections courantes ?`
    );
    if (doArchive) {
      await toggleStockStatus(id);
    }
    return;
  }

  const confirmDelete = confirm(`Êtes-vous sûr de vouloir supprimer définitivement le médicament "${name}" ?`);
  if (!confirmDelete) return;

  try {
    const res = await api.request(`/inventory/items/${id}`, {
      method: 'DELETE'
    });
    showToast(res.message || 'Article supprimé avec succès!');
    navigate('inventory');
  } catch (err) {
    if (err.can_archive || err.has_movements) {
      const doArchive = confirm(
        `⚠️ ${err.error || 'Ce médicament a un historique de mouvements de stock (traçabilité médicale).'}\n\nSouhaitez-vous désactiver / archiver cet article à la place ?`
      );
      if (doArchive) {
        await toggleStockStatus(id);
      }
    } else {
      showToast(err.error || 'Erreur lors de la suppression de l\'article', 'error');
    }
  }
}

async function toggleStockStatus(id) {
  try {
    const res = await api.request(`/inventory/items/${id}/toggle-status`, {
      method: 'PATCH'
    });
    showToast(res.is_active ? 'Article réactivé avec succès!' : 'Article archivé / désactivé avec succès!');
    navigate('inventory');
  } catch (err) {
    showToast(err.error || 'Erreur lors de la mise à jour du statut', 'error');
  }
}

let activeRestockItem = null;
function openRestockModal(id, name) {
  activeRestockItem = { id, name };
  document.getElementById('restock-modal-title').innerText = `${t('restock')}: ${name}`;
  document.getElementById('restock-modal').style.display = 'flex';
}

function closeRestockModal() {
  document.getElementById('restock-modal').style.display = 'none';
  activeRestockItem = null;
}

async function submitRestock(e) {
  e.preventDefault();
  const lot_number = document.getElementById('restock-lot-num').value;
  const expiration_date = document.getElementById('restock-expiry').value;
  const quantity = document.getElementById('restock-qty').value;

  try {
    await api.request('/inventory/lots', {
      method: 'POST',
      body: JSON.stringify({
        stock_item_id: activeRestockItem.id,
        lot_number,
        expiration_date,
        quantity
      })
    });

    showToast('Réapprovisionnement du lot enregistré!');
    closeRestockModal();
    navigate('inventory');
  } catch (err) {
    showToast(err.error || 'Erreur lors de l\'approvisionnement', 'error');
  }
}

async function simulateDepletion(id, name) {
  const qtyStr = prompt(`Quantité de [ ${name} ] à consommer / décréter (simulation consultation ou usage clinique) :`, "1");
  if (!qtyStr) return;
  const qty = parseInt(qtyStr);
  if (isNaN(qty) || qty <= 0) {
    showToast('Quantité invalide', 'error');
    return;
  }

  try {
    await api.request('/inventory/deplete', {
      method: 'POST',
      body: JSON.stringify({
        stock_item_id: id,
        quantity: qty
      })
    });
    showToast('Consommation effectuée, lots décrétés!');
    navigate('inventory');
  } catch (err) {
    showToast(err.error || 'Stock insuffisant ou indisponible', 'error');
  }
}

// ============================================================================
// 6. Settings UI (Online Payment Gateways, AI LLMs, SMTP & Profile Configuration)
// ============================================================================
async function renderSettings(container) {
  const [methods, tenant, statuses, users, smtpAccounts, aiRes] = await Promise.all([
    api.request('/payment-methods').catch(() => []),
    api.request('/tenant/profile').catch(() => ({})),
    api.request('/patient-statuses').catch(() => []),
    api.request('/users').catch(() => []),
    api.request('/settings/smtp-accounts').catch(() => []),
    api.request('/ai/config').catch(() => ({ configured: false, config: { is_active: false, provider_name: 'openrouter', model_name: 'deepseek/deepseek-chat' } }))
  ]);
  
  currentSettingsUsers = users || [];
  const aiCfg = (aiRes && aiRes.config) ? aiRes.config : { is_active: false, provider_name: 'openrouter', model_name: 'deepseek/deepseek-chat' };
  const gps = tenant.gps_coordinates || { latitude: '', longitude: '' };
  const isSuperOrTenantAdmin = ['SUPER_ADMIN_SAAS', 'SUPER_ADMIN', 'TENANT_ADMIN', 'ADMIN'].includes(state.user.role);

  container.innerHTML = `
    <!-- 0. Multi-Provider LLM & Artificial Intelligence Configuration Card -->
    <div class="card" style="margin-bottom: 24px; border:1px solid rgba(37,99,235,0.25); background:linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; flex-wrap:wrap; gap:10px;">
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="width:42px; height:42px; border-radius:10px; background:linear-gradient(135deg, #2563eb, #7c3aed); color:#fff; display:flex; align-items:center; justify-content:center; font-size:1.3rem; box-shadow:0 4px 12px rgba(37,99,235,0.25);">
            <i class="fas fa-brain"></i>
          </div>
          <div>
            <div class="card-title" style="margin:0; font-size:1.15rem; font-weight:800;">
              Intelligence Artificielle & Modèles LLM (OpenRouter, Gemini, DeepSeek, Claude, Mammouth...)
            </div>
            <div style="font-size:0.83rem; color:var(--text-muted); margin-top:2px;">
              Connectez le grand modèle de votre choix pour alimenter le Copilote Médical (DPI), les suggestions diagnostiques et l'Agent Vocal/WhatsApp.
            </div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <span id="ai-status-badge" class="badge" style="background:${aiCfg.is_active ? '#ecfdf5' : '#f1f5f9'}; color:${aiCfg.is_active ? '#047857' : '#64748b'}; border:1px solid ${aiCfg.is_active ? '#a7f3d0' : '#cbd5e1'}; font-size:0.82rem; font-weight:700; padding:6px 12px; border-radius:20px;">
            <i class="fas ${aiCfg.is_active ? 'fa-check-circle' : 'fa-circle'}" style="color:${aiCfg.is_active ? '#10b981' : '#94a3b8'};"></i>
            ${aiCfg.is_active ? `IA Active : ${(aiCfg.provider_name || 'OPENROUTER').toUpperCase()} (${aiCfg.model_name || 'deepseek'})` : 'IA Désactivée (Règles locales actives)'}
          </span>
          <button type="button" class="btn ${aiCfg.is_active ? 'btn-secondary' : 'btn-success'} btn-sm" onclick="toggleAIStatus(${!aiCfg.is_active})" style="font-weight:700; padding:6px 14px;">
            <i class="fas ${aiCfg.is_active ? 'fa-toggle-on text-success' : 'fa-toggle-off'}"></i>
            ${aiCfg.is_active ? 'Désactiver l\'IA' : 'Activer l\'IA'}
          </button>
        </div>
      </div>

      <!-- Quick Preset Badges -->
      <div style="background:rgba(37,99,235,0.04); border:1px solid rgba(37,99,235,0.15); border-radius:10px; padding:12px 16px; margin-bottom:18px;">
        <div style="font-size:0.8rem; font-weight:700; color:#1e40af; margin-bottom:8px;">
          ⚡ Modèles & Fournisseurs recommandés (Remplissage en 1 clic) :
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="applyAIPreset('openrouter', 'deepseek/deepseek-chat')" style="font-size:0.78rem; padding:4px 10px;">
            🚀 OpenRouter • DeepSeek V3 (Idéal & Économique)
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="applyAIPreset('aimlapi', 'deepseek/deepseek-chat')" style="font-size:0.78rem; padding:4px 10px;">
            ✨ AIML API (api.aimlapi.com • +200 modèles)
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="applyAIPreset('openrouter', 'anthropic/claude-3.5-sonnet')" style="font-size:0.78rem; padding:4px 10px;">
            🧠 OpenRouter • Claude 3.5 Sonnet (Raisonnement Médical)
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="applyAIPreset('openrouter', 'google/gemini-2.0-flash-001')" style="font-size:0.78rem; padding:4px 10px;">
            ⚡ OpenRouter • Gemini 2.0 Flash (Ultra-rapide)
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="applyAIPreset('gemini', 'gemini-2.0-flash-001')" style="font-size:0.78rem; padding:4px 10px;">
            🌟 Google Gemini Direct (Google AI Studio)
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="applyAIPreset('deepseek', 'deepseek-chat')" style="font-size:0.78rem; padding:4px 10px;">
            🐬 DeepSeek Direct API
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="applyAIPreset('claude', 'claude-3-5-sonnet-20241022')" style="font-size:0.78rem; padding:4px 10px;">
            🎭 Anthropic Claude Direct
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="applyAIPreset('mammouth', 'default')" style="font-size:0.78rem; padding:4px 10px;">
            🐘 Mammouth API Proxy
          </button>
        </div>
      </div>

      <!-- AI Configuration Form -->
      <form onsubmit="saveAIConfigForm(event)" autocomplete="off">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
          <div class="form-group">
            <label class="form-label" style="font-weight:700;">Fournisseur IA (Provider)</label>
            <select class="form-control" id="ai-provider" name="ai_provider_select" onchange="onAIProviderChange(this.value)" required>
              <option value="openrouter" ${aiCfg.provider_name === 'openrouter' ? 'selected' : ''}>🌐 OpenRouter (DeepSeek, Claude, Gemini, Llama via clé unique)</option>
              <option value="aimlapi" ${aiCfg.provider_name === 'aimlapi' ? 'selected' : ''}>✨ AIML API (api.aimlapi.com • Multi-modèles)</option>
              <option value="gemini" ${aiCfg.provider_name === 'gemini' ? 'selected' : ''}>🌟 Google Gemini (Direct API / AI Studio)</option>
              <option value="deepseek" ${aiCfg.provider_name === 'deepseek' ? 'selected' : ''}>🐬 DeepSeek (Direct API)</option>
              <option value="claude" ${aiCfg.provider_name === 'claude' ? 'selected' : ''}>🎭 Anthropic Claude (Direct API)</option>
              <option value="mammouth" ${aiCfg.provider_name === 'mammouth' ? 'selected' : ''}>🐘 Mammouth AI Proxy</option>
              <option value="custom" ${aiCfg.provider_name === 'custom' ? 'selected' : ''}>⚙️ Serveur Personnalisé (Ollama / Proxy Local)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight:700;">Modèle LLM Identifiant</label>
            <input type="text" class="form-control" id="ai-model" name="ai_llm_model_identifier" autocomplete="off" data-lpignore="true" value="${aiCfg.model_name || 'deepseek/deepseek-chat'}" placeholder="ex: deepseek/deepseek-chat ou google/gemini-2.0-flash-001" required />
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:3px;">
              Exemples : <code>deepseek/deepseek-chat</code>, <code>anthropic/claude-3.5-sonnet</code>, <code>gemini-2.0-flash-001</code>
            </div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
          <div class="form-group">
            <label class="form-label" style="font-weight:700;">Clé API Secrète (API Key)</label>
            <div style="display:flex; gap:6px;">
              <input type="password" class="form-control" id="ai-api-key" name="ai_llm_secret_key" autocomplete="new-password" data-lpignore="true" value="${aiCfg.masked_key || ''}" placeholder="sk-or-v1-... ou AIzaSy..." style="flex:1;" />
              <button type="button" class="btn btn-secondary" onclick="togglePasswordVisibility('ai-api-key')" style="padding:0 12px;" title="Afficher/Masquer"><i class="fas fa-eye"></i></button>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight:700;">URL de Base Endpoint (facultatif / Mammouth / Ollama)</label>
            <input type="text" class="form-control" id="ai-base-url" name="ai_llm_endpoint_base_url" autocomplete="off" value="${aiCfg.base_url || ''}" placeholder="ex: https://api.mammouth.ai/v1 ou http://localhost:11434/v1" />
          </div>
        </div>

        <div class="form-group" style="margin-bottom:16px;">
          <label class="form-label" style="font-weight:700;">Consigne Système Globale (System Prompt)</label>
          <textarea class="form-control" id="ai-system-prompt" name="ai_llm_system_instructions" rows="2" style="font-size:0.85rem;" placeholder="Instructions pour l'assistant médical...">${aiCfg.system_prompt || 'Tu es un assistant médical IA expert et bienveillant pour la plateforme de santé SoftMed. Tu rédiges en français clair, précis et professionnel.'}</textarea>
        </div>

        <!-- Connection Test Result Area -->
        <div id="ai-test-result-box" style="display:none; margin-bottom:16px; padding:12px 16px; border-radius:8px; font-size:0.85rem;"></div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <button type="button" class="btn btn-secondary" id="btn-test-ai-conn" onclick="testAIConnectionForm()" style="font-weight:700;">
            <i class="fas fa-bolt text-warning"></i> ⚡ Tester la connexion au LLM
          </button>
          <div style="display:flex; gap:10px;">
            <button type="submit" class="btn btn-primary" id="btn-save-ai-conn" style="font-weight:700;">
              <i class="fas fa-save"></i> Enregistrer les Paramètres LLM
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- 1. User Management & Permissions Matrix Card -->
    <div class="card" style="margin-bottom: 24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; flex-wrap:wrap; gap:10px;">
        <div>
          <div class="card-title" style="margin:0;"><i class="fas fa-users-cog" style="color:var(--primary);"></i> Utilisateurs & Matrice des Droits d'Accès (${users.length})</div>
          <div style="font-size:0.85rem; color:var(--text-muted); margin-top:2px;">
            Gérez les comptes d'accès à la structure sanitaire et configurez avec précision leurs autorisations (Voir, Créer, Modifier, Supprimer).
          </div>
        </div>
        ${isSuperOrTenantAdmin ? `
          <button class="btn btn-primary" onclick="openCreateUserModal()" style="font-size:0.85rem; font-weight:700;">
            <i class="fas fa-user-plus"></i> Nouvel Utilisateur
          </button>
        ` : ''}
      </div>

      <div class="table-responsive">
        <table class="table" style="margin-bottom:0;">
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Email</th>
              <th>Rôle & Modèle</th>
              <th>Permissions Clés</th>
              <th>Statut</th>
              <th style="text-align:right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${users.length === 0 ? `
              <tr>
                <td colspan="6" style="text-align:center; padding:30px; color:var(--text-muted);">
                  Aucun utilisateur configuré.
                </td>
              </tr>
            ` : users.map(u => {
              const isAdm = ['SUPER_ADMIN_SAAS', 'SUPER_ADMIN', 'TENANT_ADMIN', 'ADMIN'].includes(u.role);
              const perms = u.permissions || {};
              const permCount = Object.keys(perms).filter(k => perms[k] && (perms[k].view || perms[k].create || perms[k].update || perms[k].delete)).length;
              
              return `
                <tr style="opacity: ${u.is_active ? 1 : 0.6}">
                  <td>
                    <div style="display:flex; align-items:center; gap:10px;">
                      <div style="width:36px; height:36px; border-radius:50%; background:${isAdm ? '#2563eb' : '#059669'}; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.85rem;">
                        ${(u.first_name || 'U').charAt(0)}${(u.last_name || '').charAt(0)}
                      </div>
                      <div>
                        <strong style="color:var(--text-primary); font-size:0.92rem;">${u.first_name} ${u.last_name}</strong>
                        ${u.id === state.user.id ? '<span class="badge badge-primary" style="font-size:0.65rem; margin-left:6px;">Vous</span>' : ''}
                      </div>
                    </div>
                  </td>
                  <td><code style="font-size:0.85rem; color:var(--text-muted);">${u.email}</code></td>
                  <td>
                    <span class="badge" style="background:${isAdm ? '#eff6ff' : '#ecfdf5'}; color:${isAdm ? '#1d4ed8' : '#047857'}; border:1px solid ${isAdm ? '#bfdbfe' : '#a7f3d0'}; font-size:0.8rem; font-weight:700; padding:4px 8px;">
                      <i class="${isAdm ? 'fas fa-shield-alt' : 'fas fa-user-tag'}"></i>
                      ${isAdm ? 'Administrateur' : (u.preset_name ? u.preset_name : 'Utilisateur')}
                    </span>
                  </td>
                  <td>
                    <span style="font-size:0.82rem; color:var(--text-muted);">
                      ${isAdm ? '✨ Accès Total (Tous droits)' : `<i class="fas fa-check-circle" style="color:#059669;"></i> ${permCount} modules configurés`}
                    </span>
                  </td>
                  <td>
                    <span class="badge ${u.is_active ? 'badge-success' : 'badge-danger'}" style="font-size:0.75rem; padding:3px 8px;">
                      ${u.is_active ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td style="text-align:right;">
                    <button class="btn btn-secondary btn-sm" onclick="openEditUserModal('${u.id}')" style="padding:4px 8px; margin-right:4px;" title="Modifier & Matrice des droits">
                      <i class="fas fa-user-edit"></i> Matrice
                    </button>
                    ${u.id !== state.user.id ? `
                      <button class="btn btn-danger btn-sm" onclick="deleteUserConfirm('${u.id}', '${(u.first_name + ' ' + u.last_name).replace(/'/g, "\\'")}')" style="padding:4px 8px; background:var(--danger); border-color:var(--danger);" title="Supprimer">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    ` : ''}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- 2. Patient Statuses Settings Card -->
    <div class="card" style="margin-bottom: 24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
        <div class="card-title" style="margin:0;"><i class="fas fa-tags"></i> Statuts des Patients (Configuration & CRUD)</div>
        <button class="btn btn-primary btn-sm" onclick="openPatientStatusModal()">
          <i class="fas fa-plus"></i> Nouveau Statut
        </button>
      </div>
      <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:15px;">
        Personnalisez les statuts de suivi de vos patients (ex: Ambulatoire, Hospitalisé, En observation, Soins intensifs, Post-opératoire...).
      </p>
      <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap:12px;">
        ${statuses.map(st => `
          <div style="background:var(--bg-surface); padding:12px; border-radius:8px; border:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="display:inline-block; width:16px; height:16px; border-radius:50%; background:${st.color_code}; flex-shrink:0;"></span>
              <div>
                <strong style="color:var(--text-primary); font-size:0.9rem;">${st.name}</strong>
                <div style="font-size:0.75rem; color:var(--text-muted);">${st.code} ${st.is_default ? '<span class="badge badge-success" style="font-size:0.65rem;">Défaut</span>' : ''}</div>
              </div>
            </div>
            <button class="btn btn-danger btn-sm" onclick="deletePatientStatus('${st.id}')" style="padding:2px 6px; font-size:0.75rem; background:var(--danger); border-color:var(--danger);">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        `).join('')}
      </div>
    </div>
    <!-- Structure Identity Settings -->
    <div class="card" style="margin-bottom: 24px;">
      <div class="card-title"><i class="fas fa-hospital"></i> Identité de la Structure Sanitaire</div>
      <form onsubmit="saveClinicProfile(event)">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
          <div class="form-group">
            <label class="form-label">Nom de la Structure Sanitaire</label>
            <input type="text" class="form-control" id="prof-name" value="${tenant.name || ''}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Téléphone</label>
            <input type="text" class="form-control" id="prof-phone" value="${tenant.phone_number || ''}" required />
          </div>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
          <div class="form-group">
            <label class="form-label">Adresse Email Contact</label>
            <input type="email" class="form-control" id="prof-email" value="${tenant.email || ''}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Numéro Fiscal (NINEA)</label>
            <input type="text" class="form-control" id="prof-ninea" value="${tenant.ninea_rc || ''}" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Adresse Physique Complète</label>
          <input type="text" class="form-control" id="prof-address" value="${tenant.address || ''}" placeholder="ex: 12 Rue Cheikh Anta Diop, Dakar" />
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
          <div class="form-group">
            <label class="form-label">Logo de la Structure Sanitaire</label>
            <div style="display:flex; gap:5px;">
              <input type="text" class="form-control" id="prof-logo" value="${tenant.logo_url || ''}" placeholder="/logo-default.png" style="flex:1;" />
              <input type="file" id="prof-logo-file" style="display:none;" accept="image/*" onchange="uploadImage(this, 'prof-logo')" />
              <button type="button" class="btn btn-secondary" onclick="document.getElementById('prof-logo-file').click()" style="padding:0 12px; height:38px;" title="Uploader Logo"><i class="fas fa-upload"></i></button>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Cachet / Tampon Officiel de la Structure Sanitaire</label>
            <div style="display:flex; gap:5px;">
              <input type="text" class="form-control" id="prof-stamp" value="${tenant.stamp_url || ''}" placeholder="/stamp-default.png" style="flex:1;" />
              <input type="file" id="prof-stamp-file" style="display:none;" accept="image/*" onchange="uploadImage(this, 'prof-stamp')" />
              <button type="button" class="btn btn-secondary" onclick="document.getElementById('prof-stamp-file').click()" style="padding:0 12px; height:38px;" title="Uploader Cachet"><i class="fas fa-upload"></i></button>
            </div>
          </div>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
          <div class="form-group">
            <label class="form-label">Position GPS : Latitude</label>
            <input type="number" step="0.000001" class="form-control" id="prof-lat" value="${gps.latitude || ''}" placeholder="14.6937" />
          </div>
          <div class="form-group">
            <label class="form-label">Position GPS : Longitude</label>
            <input type="number" step="0.000001" class="form-control" id="prof-lng" value="${gps.longitude || ''}" placeholder="-17.4479" />
          </div>
        </div>
        <button class="btn btn-primary" type="submit"><i class="fas fa-save"></i> Enregistrer le Profil de la Structure Sanitaire</button>
      </form>
    </div>

    <!-- 4. Multi-Tenant SMTP Email Accounts Card -->
    <div class="card" style="margin-bottom: 24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; flex-wrap:wrap; gap:10px;">
        <div>
          <div class="card-title" style="margin:0;"><i class="fas fa-mail-bulk" style="color:var(--primary);"></i> Serveurs & Comptes Expéditeurs SMTP (${smtpAccounts.length})</div>
          <div style="font-size:0.85rem; color:var(--text-muted); margin-top:2px;">
            Configurez vos propres serveurs de messagerie (ex: OVH, Gmail, Serveur Dédié) pour que vos factures, ordonnances et justificatifs soient envoyés aux patients et aux IPM avec vos propres adresses de confiance.
          </div>
        </div>
        ${isSuperOrTenantAdmin ? `
          <button class="btn btn-primary" onclick="openCreateSmtpModal()" style="font-size:0.85rem; font-weight:700;">
            <i class="fas fa-plus-circle"></i> Nouveau Compte SMTP
          </button>
        ` : ''}
      </div>

      <div class="table-responsive">
        <table class="table" style="margin-bottom:0;">
          <thead>
            <tr>
              <th>Nom du Compte</th>
              <th>Expéditeur Officiel</th>
              <th>Serveur Hôte</th>
              <th>Port & Sécurité</th>
              <th>Statut & Test</th>
              <th style="text-align:right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${smtpAccounts.length === 0 ? `
              <tr>
                <td colspan="6" style="text-align:center; padding:35px 20px; color:var(--text-muted);">
                  <i class="fas fa-envelope-open-text fa-2x" style="opacity:0.4; margin-bottom:10px;"></i>
                  <div>Aucun compte SMTP personnalisé configuré pour votre clinique.</div>
                  <div style="font-size:0.8rem; margin-top:4px;">Par défaut, le serveur utilise la messagerie système ou le mode simulation sécurisé.</div>
                  ${isSuperOrTenantAdmin ? `
                    <button class="btn btn-primary btn-sm" onclick="openCreateSmtpModal()" style="margin-top:12px;">
                      <i class="fas fa-plus"></i> Configurer un compte (ex: OVH)
                    </button>
                  ` : ''}
                </td>
              </tr>
            ` : smtpAccounts.map(acc => {
              const isDefault = acc.is_default;
              const isTestedOk = acc.last_test_status === 'SUCCESS';
              const isTestedFailed = acc.last_test_status === 'FAILED';

              return `
                <tr style="opacity: ${acc.is_active ? 1 : 0.6}">
                  <td>
                    <div style="display:flex; align-items:center; gap:8px;">
                      <strong style="color:var(--text-primary); font-size:0.92rem;">${acc.account_name}</strong>
                      ${isDefault ? '<span class="badge" style="background:#dbeafe; color:#1d4ed8; font-size:0.7rem; font-weight:700;"><i class="fas fa-star"></i> Par Défaut</span>' : ''}
                    </div>
                    ${acc.reply_to_email ? `<div style="font-size:0.75rem; color:var(--text-muted);">Réponse à : ${acc.reply_to_email}</div>` : ''}
                  </td>
                  <td>
                    <div><strong>"${acc.from_name}"</strong></div>
                    <code style="font-size:0.82rem; color:var(--primary);">&lt;${acc.from_email}&gt;</code>
                  </td>
                  <td><code style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">${acc.smtp_host}</code></td>
                  <td>
                    <span class="badge" style="background:#f1f5f9; color:#334155; font-size:0.78rem;">
                      Port ${acc.smtp_port} (${acc.smtp_secure ? 'SSL' : 'TLS/STARTTLS'})
                    </span>
                  </td>
                  <td>
                    ${isTestedOk ? `
                      <span class="badge badge-success" style="background:#10b981; color:#fff; font-size:0.72rem;">
                        <i class="fas fa-check-circle"></i> Vérifié
                      </span>
                    ` : (isTestedFailed ? `
                      <span class="badge badge-danger" style="background:#ef4444; color:#fff; font-size:0.72rem;">
                        <i class="fas fa-times-circle"></i> Échec Test
                      </span>
                    ` : `
                      <span class="badge" style="background:#e2e8f0; color:#475569; font-size:0.72rem;">Non testé</span>
                    `)}
                    ${acc.last_tested_at ? `<div style="font-size:0.7rem; color:var(--text-muted); margin-top:2px;">${new Date(acc.last_tested_at).toLocaleDateString('fr-FR')}</div>` : ''}
                  </td>
                  <td style="text-align:right;">
                    <button class="btn btn-secondary btn-sm" onclick="openTestSmtpModal('${acc.id}', '${acc.account_name.replace(/'/g, "\\'")}', '${acc.from_email.replace(/'/g, "\\'")}')" style="padding:4px 8px; margin-right:4px;" title="Tester la connexion">
                      <i class="fas fa-bolt text-warning"></i> Test
                    </button>
                    ${!isDefault ? `
                      <button class="btn btn-secondary btn-sm" onclick="setDefaultSmtpAccount('${acc.id}')" style="padding:4px 8px; margin-right:4px;" title="Définir comme compte par défaut">
                        <i class="far fa-star"></i>
                      </button>
                    ` : ''}
                    <button class="btn btn-secondary btn-sm" onclick='openEditSmtpModal(${JSON.stringify(acc)})' style="padding:4px 8px; margin-right:4px;" title="Modifier">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteSmtpAccountConfirm('${acc.id}', '${acc.account_name.replace(/'/g, "\\'")}')" style="padding:4px 8px; background:var(--danger); border-color:var(--danger);" title="Supprimer">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Payment Gateways Card -->
    <div class="card">
      <div class="card-title"><i class="fas fa-cash-register"></i> Moyens de paiement acceptés</div>
      
      <!-- Payment method Add/Edit Form -->
      <form onsubmit="savePaymentMethod(event)" id="payment-method-form" style="background:var(--bg-surface); padding:15px; border-radius:8px; border:1px solid var(--border-color); margin-bottom:20px;">
        <input type="hidden" id="moyen-id" value="" />
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:15px; align-items:flex-end;">
          <div class="form-group" style="margin:0;">
            <label class="form-label">Moyen</label>
            <input type="text" class="form-control" id="moyen-name" placeholder="ex: Wave" required />
          </div>
          <div class="form-group" style="margin:0;">
            <label class="form-label">Numéro à créditer</label>
            <input type="text" class="form-control" id="moyen-number" placeholder="77 123 45 67" required />
          </div>
          <div class="form-group" style="margin:0;">
            <label class="form-label">QR code (facultatif)</label>
            <div style="display:flex; gap:5px;">
              <input type="text" class="form-control" id="moyen-qr-url" placeholder="URL du QR Code..." style="flex:1;" />
              <input type="file" id="moyen-qr-file" style="display:none;" accept="image/*" onchange="uploadImage(this, 'moyen-qr-url')" />
              <button type="button" class="btn btn-secondary" onclick="document.getElementById('moyen-qr-file').click()" style="padding:0 12px; height:38px;"><i class="fas fa-upload"></i></button>
            </div>
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;">
          <span style="font-size:0.8rem; color:var(--text-muted);">Format d'image recommandé: PNG ou JPEG.</span>
          <div style="display:flex; gap:10px;">
            <button class="btn btn-secondary" type="button" onclick="clearPaymentMethodForm()" style="font-size:0.85rem;">Annuler</button>
            <button class="btn btn-primary" id="moyen-btn" type="submit" style="font-size:0.85rem; padding:0 20px; height:36px;">Ajouter</button>
          </div>
        </div>
      </form>
      
      <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:15px;">
        Affichés à vos clients une fois leur commande validée — c'est là qu'ils en ont besoin. Le QR est celui que votre application vous donne : prenez-en une capture et déposez-la ici, elle sera réduite automatiquement.
      </p>
      <p style="font-size:0.85rem; color:var(--text-muted); font-style:italic; margin-bottom:20px; border-bottom:1px solid var(--border-color); padding-bottom:10px;">
        La plateforme n'encaisse rien : vos clients vous paient directement. Nous ne faisons qu'afficher vos coordonnées.
      </p>

      <!-- Active Payment Methods List -->
      <div id="payment-methods-list">
        ${methods.length === 0 ? `<div style="text-align:center; padding:20px; color:var(--text-muted);">Aucun moyen de paiement configuré.</div>` : 
          methods.map(m => {
            const creds = m.credentials || {};
            const numVal = creds.phone_number || creds.account_number || '';
            const isActive = m.is_active;
            const qrCodeUrl = m.qr_code_template || '';
            return `
              <div class="card" style="margin-bottom: 12px; display:flex; flex-direction:row; align-items:center; justify-content:space-between; padding:12px; background-color: var(--bg-surface); opacity: ${isActive ? 1 : 0.6}">
                <div style="display:flex; align-items:center; gap:15px;">
                  <img src="${qrCodeUrl || 'https://placehold.co/100x100?text=Pas+de+QR'}" style="width:50px; height:50px; object-fit:cover; border-radius:6px; border:1px solid var(--border-color);" alt="QR Code" />
                  <div>
                    <h4 style="margin:0; font-size:1rem; color:var(--text-primary); font-weight:600;">${m.name}</h4>
                    <span style="font-size:0.85rem; color:var(--text-muted);">${numVal}</span>
                  </div>
                </div>
                <div style="display:flex; gap:8px;">
                  <button class="btn btn-secondary" style="font-size:0.8rem; padding: 4px 10px;" onclick="editPaymentMethod('${m.id}', '${m.provider}', '${m.name.replace(/'/g, "\\'")}', '${numVal.replace(/'/g, "\\'")}', '${qrCodeUrl.replace(/'/g, "\\'")}')">Modifier</button>
                  <button class="btn btn-secondary" style="font-size:0.8rem; padding: 4px 10px;" onclick="togglePaymentMethodStatus('${m.id}', '${m.provider}', '${m.name.replace(/'/g, "\\'")}', '${numVal.replace(/'/g, "\\'")}', '${qrCodeUrl.replace(/'/g, "\\'")}', ${isActive})">
                    ${isActive ? 'Masquer' : 'Afficher'}
                  </button>
                  <button class="btn btn-danger" style="font-size:0.8rem; padding: 4px 10px; background-color:var(--danger);" onclick="deletePaymentMethod('${m.id}')">Supprimer</button>
                </div>
              </div>
            `;
          }).join('')
        }
      </div>
    </div>
  `;
}

function clearPaymentMethodForm() {
  document.getElementById('moyen-id').value = '';
  document.getElementById('moyen-name').value = '';
  document.getElementById('moyen-number').value = '';
  document.getElementById('moyen-qr-url').value = '';
  document.getElementById('moyen-btn').innerText = 'Ajouter';
}

function editPaymentMethod(id, provider, name, number, qrUrl) {
  document.getElementById('moyen-id').value = id;
  document.getElementById('moyen-name').value = name;
  document.getElementById('moyen-number').value = number;
  document.getElementById('moyen-qr-url').value = qrUrl;
  document.getElementById('moyen-btn').innerText = 'Enregistrer';
  document.getElementById('payment-method-form').scrollIntoView({ behavior: 'smooth' });
}

async function savePaymentMethod(e) {
  e.preventDefault();
  const id = document.getElementById('moyen-id').value;
  const name = document.getElementById('moyen-name').value;
  const number = document.getElementById('moyen-number').value;
  const qrUrl = document.getElementById('moyen-qr-url').value;
  const provider = name.trim().toUpperCase().replace(/[^A-Z0-9]/g, '_');

  try {
    showToast("Enregistrement du moyen de paiement...", 'info');
    await api.request('/payment-methods', {
      method: 'POST',
      body: JSON.stringify({
        id: id || undefined,
        provider,
        name,
        credentials: { phone_number: number },
        qr_code_template: qrUrl || null
      })
    });
    
    showToast(`Moyen de paiement ${name} enregistré avec succès!`);
    clearPaymentMethodForm();
    navigate('settings');
  } catch (err) {
    showToast(`Erreur d'enregistrement: ${err.message}`, 'error');
  }
}

async function togglePaymentMethodStatus(id, provider, name, number, qrUrl, currentActive) {
  try {
    await api.request('/payment-methods', {
      method: 'POST',
      body: JSON.stringify({
        id,
        provider,
        name,
        credentials: { phone_number: number },
        qr_code_template: qrUrl || null,
        is_active: !currentActive
      })
    });
    showToast(`Moyen de paiement ${name} ${!currentActive ? 'activé' : 'désactivé'} avec succès.`);
    navigate('settings');
  } catch (err) {
    showToast(`Erreur: ${err.message}`, 'error');
  }
}

async function deletePaymentMethod(id) {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce moyen de paiement ?')) return;
  
  try {
    await api.request(`/payment-methods/${id}`, {
      method: 'DELETE'
    });
    showToast('Moyen de paiement supprimé avec succès.');
    navigate('settings');
  } catch (err) {
    showToast(`Erreur: ${err.message}`, 'error');
  }
}

async function saveClinicProfile(e) {
  e.preventDefault();
  const name = document.getElementById('prof-name').value;
  const phone_number = document.getElementById('prof-phone').value;
  const email = document.getElementById('prof-email').value;
  const ninea_rc = document.getElementById('prof-ninea').value;
  const address = document.getElementById('prof-address').value;
  const logo_url = document.getElementById('prof-logo').value;
  const stamp_url = document.getElementById('prof-stamp').value;
  const latVal = parseFloat(document.getElementById('prof-lat').value);
  const lngVal = parseFloat(document.getElementById('prof-lng').value);

  const gps_coordinates = (!isNaN(latVal) && !isNaN(lngVal)) ? { latitude: latVal, longitude: lngVal } : null;

  try {
    const updated = await api.request('/tenant/profile', {
      method: 'PUT',
      body: JSON.stringify({
        name, phone_number, email, ninea_rc, address, logo_url, stamp_url, gps_coordinates
      })
    });
    
    state.tenant = updated;
    
    showToast('Profil de la structure sanitaire mis à jour avec succès !');
    navigate('settings');
  } catch (err) {}
}

// -------------------------------------------------------------
// 6a. Multi-Provider LLM Intelligence Configuration Handlers
// -------------------------------------------------------------

function applyAIPreset(provider, model) {
  const provEl = document.getElementById('ai-provider');
  const modelEl = document.getElementById('ai-model');
  const baseEl = document.getElementById('ai-base-url');
  if (provEl) provEl.value = provider;
  if (modelEl) modelEl.value = model;
  if (baseEl) {
    if (provider === 'aimlapi') baseEl.value = 'https://api.aimlapi.com/v1';
    else if (provider === 'mammouth') baseEl.value = 'https://api.mammouth.ai/v1';
    else if (provider === 'openrouter') baseEl.value = 'https://openrouter.ai/api/v1';
    else baseEl.value = '';
  }
  showToast(`Modèle préconfiguré : ${provider.toUpperCase()} (${model})`, 'info');
}

function onAIProviderChange(provider) {
  const modelEl = document.getElementById('ai-model');
  const baseEl = document.getElementById('ai-base-url');
  if (!modelEl) return;

  if (provider === 'openrouter') {
    modelEl.value = 'deepseek/deepseek-chat';
    if (baseEl) baseEl.value = '';
  } else if (provider === 'aimlapi') {
    modelEl.value = 'deepseek/deepseek-chat';
    if (baseEl) baseEl.value = 'https://api.aimlapi.com/v1';
  } else if (provider === 'gemini') {
    modelEl.value = 'gemini-2.0-flash-001';
    if (baseEl) baseEl.value = '';
  } else if (provider === 'deepseek') {
    modelEl.value = 'deepseek-chat';
    if (baseEl) baseEl.value = '';
  } else if (provider === 'claude') {
    modelEl.value = 'claude-3-5-sonnet-20241022';
    if (baseEl) baseEl.value = '';
  } else if (provider === 'mammouth') {
    modelEl.value = 'default';
    if (baseEl) baseEl.value = 'https://api.mammouth.ai/v1';
  } else if (provider === 'custom') {
    modelEl.value = 'llama3.3';
    if (baseEl) baseEl.value = 'http://localhost:11434/v1';
  }
}

function togglePasswordVisibility(fieldId) {
  const el = document.getElementById(fieldId);
  if (!el) return;
  el.type = el.type === 'password' ? 'text' : 'password';
}

async function testAIConnectionForm() {
  const btn = document.getElementById('btn-test-ai-conn');
  const resultBox = document.getElementById('ai-test-result-box');
  const provider = document.getElementById('ai-provider').value;
  const model = document.getElementById('ai-model').value.trim();
  const apiKey = document.getElementById('ai-api-key').value.trim();
  const baseUrl = document.getElementById('ai-base-url').value.trim();

  if (!apiKey) {
    showToast('Veuillez saisir votre clé API pour tester la liaison.', 'warning');
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Test en cours...`;
  }
  if (resultBox) {
    resultBox.style.display = 'block';
    resultBox.style.background = '#eff6ff';
    resultBox.style.border = '1px solid #bfdbfe';
    resultBox.style.color = '#1e40af';
    resultBox.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Envoi d'une requête test à <strong>${provider.toUpperCase()} (${model})</strong>...`;
  }

  try {
    const res = await api.request('/ai/test', {
      method: 'POST',
      body: JSON.stringify({
        provider_name: provider,
        api_key: apiKey,
        model_name: model,
        base_url: baseUrl
      })
    });

    if (resultBox) {
      resultBox.style.background = '#ecfdf5';
      resultBox.style.border = '1px solid #10b981';
      resultBox.style.color = '#065f46';
      resultBox.innerHTML = `
        <div style="font-weight:700; margin-bottom:4px;">
          <i class="fas fa-check-circle" style="color:#10b981;"></i> Connexion réussie ! (Latence : ${res.latency_ms} ms)
        </div>
        <div style="font-size:0.8rem; opacity:0.9;">Réponse du modèle (${res.model}) : <em>« ${res.reply} »</em></div>
      `;
    }
    showToast(`Connexion validée en ${res.latency_ms} ms !`, 'success');
  } catch (err) {
    if (resultBox) {
      resultBox.style.background = '#fef2f2';
      resultBox.style.border = '1px solid #ef4444';
      resultBox.style.color = '#991b1b';
      resultBox.innerHTML = `
        <div style="font-weight:700; margin-bottom:4px;">
          <i class="fas fa-times-circle" style="color:#ef4444;"></i> Échec de la connexion
        </div>
        <div style="font-size:0.8rem;">${err.message || 'Clé invalide ou fournisseur inaccessible'}</div>
      `;
    }
    showToast(`Échec du test : ${err.message}`, 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i class="fas fa-bolt text-warning"></i> ⚡ Tester la connexion au LLM`;
    }
  }
}

async function saveAIConfigForm(e) {
  e.preventDefault();
  const btn = document.getElementById('btn-save-ai-conn');
  const provider = document.getElementById('ai-provider').value;
  const model = document.getElementById('ai-model').value.trim();
  const apiKey = document.getElementById('ai-api-key').value.trim();
  const baseUrl = document.getElementById('ai-base-url').value.trim();
  const systemPrompt = document.getElementById('ai-system-prompt').value.trim();

  if (!apiKey) {
    showToast('La clé API est requise.', 'warning');
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Enregistrement...`;
  }

  try {
    const res = await api.request('/ai/config', {
      method: 'POST',
      body: JSON.stringify({
        provider_name: provider,
        api_key: apiKey,
        model_name: model,
        base_url: baseUrl,
        system_prompt: systemPrompt,
        is_active: true
      })
    });

    showToast('Configuration IA enregistrée et activée avec succès !', 'success');
    navigate('settings');
  } catch (err) {
    showToast(`Erreur : ${err.message}`, 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i class="fas fa-save"></i> Enregistrer les Paramètres LLM`;
    }
  }
}

async function toggleAIStatus(newStatus) {
  try {
    const res = await api.request('/ai/toggle', {
      method: 'POST',
      body: JSON.stringify({ is_active: newStatus })
    });
    showToast(res.message, 'success');
    navigate('settings');
  } catch (err) {
    showToast(`Erreur : ${err.message}`, 'error');
  }
}

// -------------------------------------------------------------
// 6b. Multi-Tenant SMTP Accounts Management Handlers & Modals
// -------------------------------------------------------------
let currentEditingSmtpId = null;
let currentTestingSmtpId = null;

function createSmtpModalContainer() {
  let modal = document.getElementById('smtp-account-modal');
  if (!modal) {
    const div = document.createElement('div');
    div.className = 'modal-overlay';
    div.id = 'smtp-account-modal';
    div.style.cssText = 'display:none; justify-content:center; align-items:center; z-index:3300;';
    div.innerHTML = `
      <div class="modal-container" style="width:700px; max-width:96%; max-height:92vh; overflow-y:auto; padding:22px; animation: modalFadeIn 0.3s ease;">
        <div class="modal-header" style="border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:15px; display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:38px; height:38px; border-radius:8px; background:#eff6ff; color:#1e40af; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
              <i class="fas fa-envelope-open-text"></i>
            </div>
            <div>
              <h4 class="modal-title" id="smtp-modal-title" style="margin:0; font-size:1.1rem; font-weight:800; color:var(--text-primary);">
                Configurer un Compte SMTP Expéditeur
              </h4>
              <div style="font-size:0.8rem; color:var(--text-muted);">Paramètres de messagerie pour l'envoi des factures et documents</div>
            </div>
          </div>
          <button class="modal-close" onclick="closeSmtpModal()">&times;</button>
        </div>

        <!-- Quick Presets -->
        <div style="margin-bottom:15px; background:rgba(37,99,235,0.04); border:1px solid rgba(37,99,235,0.2); border-radius:8px; padding:10px 14px;">
          <div style="font-size:0.78rem; font-weight:700; color:#1e40af; margin-bottom:6px;">
            ⚡ Remplissage rapide par fournisseur :
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button type="button" class="btn btn-secondary btn-sm" onclick="applySmtpPreset('OVH')" style="font-size:0.75rem; padding:4px 10px;">
              <i class="fas fa-server text-primary"></i> OVH Mail (ssl0.ovh.net)
            </button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="applySmtpPreset('GMAIL')" style="font-size:0.75rem; padding:4px 10px;">
              <i class="fab fa-google text-danger"></i> Gmail (smtp.gmail.com)
            </button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="applySmtpPreset('OFFICE365')" style="font-size:0.75rem; padding:4px 10px;">
              <i class="fab fa-microsoft text-info"></i> Microsoft 365
            </button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="applySmtpPreset('CUSTOM')" style="font-size:0.75rem; padding:4px 10px;">
              <i class="fas fa-cog text-muted"></i> Personnalisé
            </button>
          </div>
        </div>

        <form onsubmit="saveSmtpAccount(event)">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Nom du compte / Service *</label>
              <input type="text" class="form-control" id="smtp-acc-name" placeholder="ex: Facturation & IPM ou Secrétariat" required />
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Nom affiché de l'expéditeur *</label>
              <input type="text" class="form-control" id="smtp-from-name" placeholder="ex: Clinique Médicale - Service Facturation" required />
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Adresse Email d'Expédition *</label>
              <input type="email" class="form-control" id="smtp-from-email" placeholder="facturation@votre-clinique.sn" required />
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Email de Réponse (Reply-To facultatif)</label>
              <input type="email" class="form-control" id="smtp-reply-to" placeholder="contact@votre-clinique.sn" />
            </div>
          </div>

          <div style="border-top:1px dashed var(--border-color); padding-top:12px; margin-top:12px; margin-bottom:12px;">
            <div style="font-size:0.85rem; font-weight:700; color:var(--text-primary); margin-bottom:10px;">
              <i class="fas fa-network-wired text-primary"></i> Paramètres du Serveur SMTP
            </div>

            <div style="display:grid; grid-template-columns:2fr 1fr 1fr; gap:12px; margin-bottom:12px;">
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label">Hôte SMTP (Serveur) *</label>
                <input type="text" class="form-control" id="smtp-host" placeholder="ssl0.ovh.net" required />
              </div>
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label">Port *</label>
                <input type="number" class="form-control" id="smtp-port" value="465" required />
              </div>
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label">Chiffrement *</label>
                <select class="form-control" id="smtp-secure">
                  <option value="true">SSL (Port 465)</option>
                  <option value="false">TLS / STARTTLS (Port 587)</option>
                </select>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label">Nom d'Utilisateur SMTP (Login) *</label>
                <input type="text" class="form-control" id="smtp-user" placeholder="facturation@votre-clinique.sn" required />
              </div>
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label">Mot de Passe SMTP *</label>
                <input type="password" class="form-control" id="smtp-pass" placeholder="••••••••••••" />
                <div style="font-size:0.7rem; color:var(--text-muted); margin-top:2px;">Laissez vide en modification pour conserver l'actuel.</div>
              </div>
            </div>
          </div>

          <div style="display:flex; gap:15px; margin-bottom:18px;">
            <label style="display:flex; align-items:center; gap:6px; font-size:0.85rem; cursor:pointer;">
              <input type="checkbox" id="smtp-is-default" />
              <span><strong>Définir comme compte expéditeur par défaut</strong></span>
            </label>
            <label style="display:flex; align-items:center; gap:6px; font-size:0.85rem; cursor:pointer;">
              <input type="checkbox" id="smtp-is-active" checked />
              <span>Compte Actif</span>
            </label>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:15px;">
            <button type="button" class="btn btn-secondary" onclick="closeSmtpModal()">Annuler</button>
            <button type="submit" class="btn btn-primary" id="btn-save-smtp" style="font-weight:700; padding:8px 20px;">
              <i class="fas fa-save"></i> <span>Enregistrer le Compte</span>
            </button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(div);
    modal = div;
  }
  return modal;
}

function createSmtpTestModalContainer() {
  let modal = document.getElementById('smtp-test-modal');
  if (!modal) {
    const div = document.createElement('div');
    div.className = 'modal-overlay';
    div.id = 'smtp-test-modal';
    div.style.cssText = 'display:none; justify-content:center; align-items:center; z-index:3400;';
    div.innerHTML = `
      <div class="modal-container" style="width:500px; max-width:96%; padding:22px; animation: modalFadeIn 0.3s ease;">
        <div class="modal-header" style="border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:15px; display:flex; justify-content:space-between; align-items:center;">
          <h4 class="modal-title" style="margin:0; font-size:1.05rem; font-weight:800; display:flex; align-items:center; gap:8px;">
            <i class="fas fa-bolt text-warning"></i> Tester la connexion SMTP
          </h4>
          <button class="modal-close" onclick="closeTestSmtpModal()">&times;</button>
        </div>
        <form onsubmit="submitTestSmtp(event)">
          <div style="font-size:0.85rem; color:var(--text-primary); margin-bottom:12px;">
            Test du compte : <strong id="test-smtp-acc-name"></strong>
          </div>
          <div class="form-group">
            <label class="form-label">Envoyer un email de test à l'adresse :</label>
            <input type="email" class="form-control" id="test-smtp-recipient" value="${state.user?.email || ''}" required placeholder="votre.email@gmail.com" />
          </div>
          <div id="test-smtp-diagnostics-box" style="display:none; margin-bottom:12px;"></div>
          <div id="test-smtp-status-box" style="display:none; padding:10px; border-radius:6px; font-size:0.82rem; margin-bottom:15px;"></div>
          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:15px;">
            <button type="button" class="btn btn-secondary" onclick="closeTestSmtpModal()">Fermer</button>
            <button type="submit" class="btn btn-primary" id="btn-run-smtp-test" style="font-weight:700;">
              <i class="fas fa-paper-plane"></i> Lancer le Test
            </button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(div);
    modal = div;
  }
  return modal;
}

function openCreateSmtpModal() {
  createSmtpModalContainer();
  currentEditingSmtpId = null;
  document.getElementById('smtp-modal-title').innerText = 'Configurer un Compte SMTP Expéditeur';
  document.getElementById('smtp-acc-name').value = '';
  document.getElementById('smtp-from-name').value = state.tenant?.name || 'Clinique Médicale';
  document.getElementById('smtp-from-email').value = state.tenant?.email || '';
  document.getElementById('smtp-reply-to').value = '';
  document.getElementById('smtp-host').value = 'ssl0.ovh.net';
  document.getElementById('smtp-port').value = 465;
  document.getElementById('smtp-secure').value = 'true';
  document.getElementById('smtp-user').value = '';
  document.getElementById('smtp-pass').value = '';
  document.getElementById('smtp-pass').required = true;
  document.getElementById('smtp-is-default').checked = false;
  document.getElementById('smtp-is-active').checked = true;

  document.getElementById('smtp-account-modal').style.display = 'flex';
}

function openEditSmtpModal(acc) {
  createSmtpModalContainer();
  currentEditingSmtpId = acc.id;
  document.getElementById('smtp-modal-title').innerText = `Modifier le Compte SMTP : ${acc.account_name}`;
  document.getElementById('smtp-acc-name').value = acc.account_name || '';
  document.getElementById('smtp-from-name').value = acc.from_name || '';
  document.getElementById('smtp-from-email').value = acc.from_email || '';
  document.getElementById('smtp-reply-to').value = acc.reply_to_email || '';
  document.getElementById('smtp-host').value = acc.smtp_host || '';
  document.getElementById('smtp-port').value = acc.smtp_port || 465;
  document.getElementById('smtp-secure').value = acc.smtp_secure ? 'true' : 'false';
  document.getElementById('smtp-user').value = acc.smtp_user || '';
  document.getElementById('smtp-pass').value = '';
  document.getElementById('smtp-pass').required = false;
  document.getElementById('smtp-is-default').checked = !!acc.is_default;
  document.getElementById('smtp-is-active').checked = acc.is_active !== false;

  document.getElementById('smtp-account-modal').style.display = 'flex';
}

function closeSmtpModal() {
  const modal = document.getElementById('smtp-account-modal');
  if (modal) modal.style.display = 'none';
}

function applySmtpPreset(preset) {
  if (preset === 'OVH') {
    document.getElementById('smtp-host').value = 'ssl0.ovh.net';
    document.getElementById('smtp-port').value = 465;
    document.getElementById('smtp-secure').value = 'true';
    showToast('Préréglage OVH Mail (ssl0.ovh.net:465 SSL) appliqué', 'info');
  } else if (preset === 'GMAIL') {
    document.getElementById('smtp-host').value = 'smtp.gmail.com';
    document.getElementById('smtp-port').value = 465;
    document.getElementById('smtp-secure').value = 'true';
    showToast('Préréglage Gmail (smtp.gmail.com:465 SSL) appliqué. Utilisez un mot de passe d\'application Google.', 'info');
  } else if (preset === 'OFFICE365') {
    document.getElementById('smtp-host').value = 'smtp.office365.com';
    document.getElementById('smtp-port').value = 587;
    document.getElementById('smtp-secure').value = 'false';
    showToast('Préréglage Microsoft 365 (smtp.office365.com:587 STARTTLS) appliqué', 'info');
  } else {
    document.getElementById('smtp-host').value = '';
    document.getElementById('smtp-port').value = 587;
    document.getElementById('smtp-secure').value = 'false';
  }
}

async function saveSmtpAccount(e) {
  e.preventDefault();
  const account_name = document.getElementById('smtp-acc-name').value;
  const from_name = document.getElementById('smtp-from-name').value;
  const from_email = document.getElementById('smtp-from-email').value;
  const reply_to_email = document.getElementById('smtp-reply-to').value;
  const smtp_host = document.getElementById('smtp-host').value;
  const smtp_port = parseInt(document.getElementById('smtp-port').value, 10) || 465;
  const smtp_secure = document.getElementById('smtp-secure').value === 'true';
  const smtp_user = document.getElementById('smtp-user').value;
  const smtp_password = document.getElementById('smtp-pass').value;
  const is_default = document.getElementById('smtp-is-default').checked;
  const is_active = document.getElementById('smtp-is-active').checked;

  const btn = document.getElementById('btn-save-smtp');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Enregistrement...`;
  }

  try {
    if (currentEditingSmtpId) {
      await api.request(`/settings/smtp-accounts/${currentEditingSmtpId}`, {
        method: 'PUT',
        body: JSON.stringify({
          account_name, from_name, from_email, reply_to_email, smtp_host, smtp_port, smtp_secure, smtp_user, smtp_password: smtp_password || undefined, is_default, is_active
        })
      });
      showToast(`Compte SMTP ${account_name} modifié avec succès !`, 'success');
    } else {
      await api.request('/settings/smtp-accounts', {
        method: 'POST',
        body: JSON.stringify({
          account_name, from_name, from_email, reply_to_email, smtp_host, smtp_port, smtp_secure, smtp_user, smtp_password, is_default, is_active
        })
      });
      showToast(`Compte SMTP ${account_name} créé avec succès !`, 'success');
    }

    closeSmtpModal();
    navigate('settings');
  } catch (err) {
    showToast(`Erreur: ${err.message}`, 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i class="fas fa-save"></i> <span>Enregistrer le Compte</span>`;
    }
  }
}

async function deleteSmtpAccountConfirm(id, name) {
  if (!confirm(`Êtes-vous sûr de vouloir supprimer le compte SMTP "${name}" ?`)) return;

  try {
    await api.request(`/settings/smtp-accounts/${id}`, { method: 'DELETE' });
    showToast(`Compte SMTP "${name}" supprimé.`);
    navigate('settings');
  } catch (err) {
    showToast(`Erreur: ${err.message}`, 'error');
  }
}

async function setDefaultSmtpAccount(id) {
  try {
    await api.request(`/settings/smtp-accounts/${id}/set-default`, { method: 'POST' });
    showToast('Compte SMTP défini par défaut pour tous les envois médicaux !', 'success');
    navigate('settings');
  } catch (err) {
    showToast(`Erreur: ${err.message}`, 'error');
  }
}

function openTestSmtpModal(id, name, fromEmail) {
  createSmtpTestModalContainer();
  currentTestingSmtpId = id;
  document.getElementById('test-smtp-acc-name').innerText = `${name} (${fromEmail})`;
  const statusBox = document.getElementById('test-smtp-status-box');
  if (statusBox) statusBox.style.display = 'none';
  const diagBox = document.getElementById('test-smtp-diagnostics-box');
  if (diagBox) { diagBox.style.display = 'none'; diagBox.innerHTML = ''; }
  document.getElementById('smtp-test-modal').style.display = 'flex';
}

// Diagnostic DNS best-effort avant l'envoi réel (domaine résolvable, adresse grand
// public, SPF, DKIM) — voir utils/smtpDiagnostics.js côté serveur. Un client
// installant SoftMed avec son propre domaine voit ici, en quelques secondes, ce
// qui bloquerait la délivrabilité plutôt que de le découvrir sur un email jamais reçu.
function renderSmtpDiagnostics(diagnostics) {
  const box = document.getElementById('test-smtp-diagnostics-box');
  if (!box) return;
  if (!diagnostics || !Array.isArray(diagnostics.checks) || diagnostics.checks.length === 0) {
    box.style.display = 'none';
    box.innerHTML = '';
    return;
  }

  const styleByStatus = {
    ok: { icon: 'fa-circle-check', color: '#059669' },
    warning: { icon: 'fa-triangle-exclamation', color: '#d97706' },
    blocker: { icon: 'fa-circle-xmark', color: '#dc2626' },
    info: { icon: 'fa-circle-info', color: '#64748b' }
  };

  const rows = diagnostics.checks.map(c => {
    const st = styleByStatus[c.status] || styleByStatus.info;
    return `
      <div style="display:flex; gap:8px; align-items:flex-start; padding:6px 0; border-bottom:1px solid var(--border-color);">
        <i class="fas ${st.icon}" style="color:${st.color}; margin-top:2px; flex-shrink:0;"></i>
        <div style="font-size:0.8rem;">
          <strong style="color:var(--text-primary);">${c.label}</strong>
          <div style="color:var(--text-muted); margin-top:1px;">${c.message}</div>
        </div>
      </div>`;
  }).join('');

  box.style.display = 'block';
  box.innerHTML = `
    <div style="border:1px solid var(--border-color); border-radius:8px; padding:10px 12px; background:var(--bg-surface);">
      <div style="font-size:0.78rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.03em; margin-bottom:4px;">
        Diagnostic de délivrabilité
      </div>
      ${rows}
    </div>`;
}

function closeTestSmtpModal() {
  const modal = document.getElementById('smtp-test-modal');
  if (modal) modal.style.display = 'none';
}

async function submitTestSmtp(e) {
  e.preventDefault();
  const testRecipient = document.getElementById('test-smtp-recipient').value;
  const statusBox = document.getElementById('test-smtp-status-box');
  const btn = document.getElementById('btn-run-smtp-test');

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Test de connexion en cours...`;
  }

  try {
    showToast('Vérification des identifiants et envoi du mail de test...', 'info');
    const result = await api.request(`/settings/smtp-accounts/${currentTestingSmtpId}/test`, {
      method: 'POST',
      body: JSON.stringify({ test_recipient_email: testRecipient })
    });

    renderSmtpDiagnostics(result.diagnostics);

    if (statusBox) {
      statusBox.style.display = 'block';
      statusBox.style.background = '#ecfdf5';
      statusBox.style.color = '#065f46';
      statusBox.style.border = '1px solid #a7f3d0';
      statusBox.innerHTML = `<i class="fas fa-check-circle"></i> <strong>Connexion réussie !</strong><br />Email de test délivré avec succès à ${testRecipient}.`;
    }
    showToast('Connexion SMTP validée avec succès !', 'success');
  } catch (err) {
    renderSmtpDiagnostics(err.data?.diagnostics);

    if (statusBox) {
      statusBox.style.display = 'block';
      statusBox.style.background = '#fef2f2';
      statusBox.style.color = '#991b1b';
      statusBox.style.border = '1px solid #fecaca';
      statusBox.innerHTML = `<i class="fas fa-times-circle"></i> <strong>Échec du test :</strong><br />${err.message}`;
    }
    showToast(`Échec du test: ${err.message}`, 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i class="fas fa-paper-plane"></i> Lancer le Test`;
    }
  }
}

// ============================================================================
// User Management & RBAC Permissions Matrix Handlers
// ============================================================================
let currentSettingsUsers = [];
const RBAC_MODULES = [
  {
    category: 'ACCUEIL & GESTION CLINIQUE',
    items: [
      { key: 'dashboard', label: '📊 Tableau de Bord & Statistiques', desc: 'KPIs d\'activité, chiffre d\'affaires et alertes' },
      { key: 'agenda', label: '📅 Agenda & Prise de Rendez-vous', desc: 'Créneaux et réservations. « Modifier » autorise le report, « Supprimer » l\'annulation' },
      { key: 'practitioners', label: '👨‍⚕️ Praticiens, Spécialités & Services', desc: 'Médecins, spécialités, durées et congés' }
    ]
  },
  {
    category: 'DOSSIERS MÉDICAUX & SOINS (DPI)',
    items: [
      { key: 'patients', label: '👤 Fiches & Dossiers Patients (DPI)', desc: 'État civil, antécédents, traitements en cours' },
      { key: 'consultations', label: '🩺 Consultations & Observations Médicales', desc: 'Examens cliniques, constantes, motifs' },
      { key: 'prescriptions', label: '💊 Ordonnances & Documents Médicaux', desc: 'Rédaction ordonnances, imagerie, certificats' }
    ]
  },
  {
    category: 'FINANCES, CAISSE & FACTURATION',
    items: [
      { key: 'cash_register', label: '💵 Caisse & Encaissements', desc: 'Sessions de caisse, paiements Wave/OM/Espèces' },
      { key: 'invoices', label: '🧾 Facturation & Tiers-Payant (IPM)', desc: 'Émission factures, prises en charge, avoirs' },
      { key: 'insurances', label: '🛡️ Organismes IPM & Assurances', desc: 'Conventions, taux de prise en charge, coordonnées' },
      { key: 'reports', label: '📈 Rapports Financiers & Recouvrement', desc: 'Balance âgée, relances, statistiques' }
    ]
  },
  {
    category: 'ASSISTANCE IA & COMMUNICATION',
    items: [
      { key: 'ai_assistant', label: '🤖 Copilote IA & Agent de Rendez-vous', desc: 'Assistant clinique sur dossier, agent conversationnel de prise de RDV' },
      { key: 'messaging', label: '✉️ Messagerie & Envoi de Documents', desc: 'Comptes SMTP, envoi des factures et justificatifs par email' }
    ]
  },
  {
    category: 'LOGISTIQUE, HOSPITALISATION & CONFIGURATION',
    items: [
      { key: 'inventory', label: '📦 Pharmacie & Gestion du Stock', desc: 'Médicaments, alertes péremption, entrées/sorties' },
      { key: 'hospitalization', label: '🛏️ Hospitalisation & Gestion des Lits', desc: 'Chambres, lits, admissions et séjours' },
      { key: 'settings', label: '⚙️ Paramètres Généraux de la Clinique', desc: 'Identité, tarifs, statuts, moyens de paiement' },
      { key: 'users', label: '👥 Gestion des Utilisateurs & Droits d\'accès', desc: 'Création de comptes et matrice des permissions' }
    ]
  }
];

function renderMatrixTable(currentPermissions = {}) {
  const tbody = document.getElementById('matrix-tbody');
  if (!tbody) return;

  tbody.innerHTML = RBAC_MODULES.map(group => `
    <tr style="background:#f1f5f9; border-top:2px solid #cbd5e1; border-bottom:1px solid #cbd5e1;">
      <td colspan="5" style="padding:8px 14px; font-weight:800; color:#1e293b; font-size:0.8rem; letter-spacing:0.5px;">
        ${group.category}
      </td>
    </tr>
    ${group.items.map(item => {
      const p = currentPermissions[item.key] || { view: false, create: false, update: false, delete: false };
      return `
        <tr style="border-bottom:1px solid var(--border-color);" onmouseover="this.style.background='rgba(37,99,235,0.03)'" onmouseout="this.style.background='transparent'">
          <td style="padding:10px 14px;">
            <div style="font-weight:700; color:var(--text-primary); font-size:0.88rem;">${item.label}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${item.desc}</div>
          </td>
          <td style="text-align:center; padding:8px;">
            <input type="checkbox" class="matrix-chk" data-module="${item.key}" data-action="view" ${p.view ? 'checked' : ''} style="width:18px; height:18px; cursor:pointer;" />
          </td>
          <td style="text-align:center; padding:8px;">
            <input type="checkbox" class="matrix-chk" data-module="${item.key}" data-action="create" ${p.create ? 'checked' : ''} style="width:18px; height:18px; cursor:pointer;" />
          </td>
          <td style="text-align:center; padding:8px;">
            <input type="checkbox" class="matrix-chk" data-module="${item.key}" data-action="update" ${p.update ? 'checked' : ''} style="width:18px; height:18px; cursor:pointer;" />
          </td>
          <td style="text-align:center; padding:8px;">
            <input type="checkbox" class="matrix-chk" data-module="${item.key}" data-action="delete" ${p.delete ? 'checked' : ''} style="width:18px; height:18px; cursor:pointer;" />
          </td>
        </tr>
      `;
    }).join('')}
  `).join('');
}

function toggleMatrixColumn(actionKey, isChecked) {
  const checkboxes = document.querySelectorAll(`.matrix-chk[data-action="${actionKey}"]`);
  checkboxes.forEach(cb => cb.checked = isChecked);
}

function selectUserLevel(level) {
  document.getElementById('user-role').value = level;
  
  // Highlight chosen level button
  document.querySelectorAll('.btn-user-level').forEach(btn => {
    if (btn.dataset.level === level) {
      btn.style.borderColor = 'var(--primary)';
      btn.style.background = 'rgba(37,99,235,0.12)';
      btn.style.color = 'var(--primary)';
      btn.style.fontWeight = '700';
    } else {
      btn.style.borderColor = 'var(--border-color)';
      btn.style.background = 'var(--bg-surface)';
      btn.style.color = 'var(--text-primary)';
      btn.style.fontWeight = 'normal';
    }
  });

  const matrixContainer = document.getElementById('user-matrix-container');
  const presetsContainer = document.getElementById('user-presets-container');
  const tenantSelectContainer = document.getElementById('user-tenant-select-container');
  const isSuperAdmin = state.user.role === 'SUPER_ADMIN_SAAS' || state.user.email === 'mbndiaye@gmail.com';

  if (level === 'SUPER_ADMIN_SAAS') {
    document.getElementById('user-preset').value = 'SUPER_ADMIN_SAAS';
    if (matrixContainer) matrixContainer.style.display = 'none';
    if (presetsContainer) presetsContainer.style.display = 'none';
    if (tenantSelectContainer) tenantSelectContainer.style.display = 'none';
  } else if (level === 'TENANT_ADMIN' || level === 'ADMIN') {
    document.getElementById('user-preset').value = 'ADMIN';
    if (matrixContainer) matrixContainer.style.display = 'none';
    if (presetsContainer) presetsContainer.style.display = 'none';
    if (tenantSelectContainer && isSuperAdmin) tenantSelectContainer.style.display = 'block';
  } else {
    document.getElementById('user-preset').value = 'DOCTOR';
    if (matrixContainer) matrixContainer.style.display = 'block';
    if (presetsContainer) presetsContainer.style.display = 'block';
    if (tenantSelectContainer && isSuperAdmin) tenantSelectContainer.style.display = 'block';
    renderMatrixTable({});
    applyUserPreset('DOCTOR');
  }
}

function applyUserPreset(presetName) {
  document.getElementById('user-preset').value = presetName;
  const isAll = (presetName === 'ADMIN');
  if (isAll) {
    document.getElementById('user-role').value = 'TENANT_ADMIN';
  }

  // Uncheck all initially
  document.querySelectorAll('.matrix-chk').forEach(cb => cb.checked = false);

  if (presetName === 'ADMIN') {
    document.querySelectorAll('.matrix-chk').forEach(cb => cb.checked = true);
  } else if (presetName === 'DOCTOR') {
    ['dashboard', 'agenda', 'patients', 'consultations', 'prescriptions'].forEach(m => {
      setModuleCheckboxes(m, { view: true, create: true, update: true, delete: false });
    });
    ['hospitalization', 'reports'].forEach(m => {
      setModuleCheckboxes(m, { view: true, create: false, update: false, delete: false });
    });
    // Le copilote clinique lit le dossier du patient : réservé aux profils soignants.
    setModuleCheckboxes('ai_assistant', { view: true, create: true, update: false, delete: false });
  } else if (presetName === 'SECRETARY') {
    ['dashboard', 'agenda', 'patients'].forEach(m => {
      setModuleCheckboxes(m, { view: true, create: true, update: true, delete: false });
    });
    // L'accueil reporte et annule les rendez-vous au quotidien : « Supprimer » sur
    // l'agenda correspond à l'annulation, pas à un effacement de données.
    setModuleCheckboxes('agenda', { view: true, create: true, update: true, delete: true });
    ['invoices', 'cash_register', 'insurances'].forEach(m => {
      setModuleCheckboxes(m, { view: true, create: false, update: false, delete: false });
    });
    setModuleCheckboxes('ai_assistant', { view: true, create: true, update: false, delete: false });
  } else if (presetName === 'CASHIER') {
    ['dashboard', 'cash_register', 'invoices', 'reports'].forEach(m => {
      setModuleCheckboxes(m, { view: true, create: true, update: true, delete: false });
    });
    ['patients'].forEach(m => {
      setModuleCheckboxes(m, { view: true, create: false, update: false, delete: false });
    });
    // La caisse applique les conventions IPM et envoie les factures par email.
    setModuleCheckboxes('insurances', { view: true, create: true, update: true, delete: false });
    setModuleCheckboxes('messaging', { view: true, create: true, update: false, delete: false });
  } else if (presetName === 'PHARMACIST') {
    ['dashboard', 'inventory', 'prescriptions'].forEach(m => {
      setModuleCheckboxes(m, { view: true, create: true, update: true, delete: false });
    });
  } else if (presetName === 'READONLY') {
    document.querySelectorAll('.matrix-chk[data-action="view"]').forEach(cb => cb.checked = true);
  }

  showToast(`Modèle "${presetName}" appliqué.`);
}

function setModuleCheckboxes(moduleKey, perms) {
  ['view', 'create', 'update', 'delete'].forEach(action => {
    const cb = document.querySelector(`.matrix-chk[data-module="${moduleKey}"][data-action="${action}"]`);
    if (cb) cb.checked = !!perms[action];
  });
}

async function openCreateUserModal() {
  const modal = document.getElementById('user-modal');
  const form = document.getElementById('user-form');
  if (!modal || !form) return;

  form.reset();
  document.getElementById('user-form-id').value = '';
  document.getElementById('user-modal-title').innerHTML = '<i class="fas fa-user-plus" style="color:var(--primary);"></i> Nouvel Utilisateur & Niveau d\'Accès';
  document.getElementById('user-pwd-help').innerText = '* (Requis)';
  document.getElementById('user-password').required = true;
  document.getElementById('user-active').checked = true;

  const isSuperAdmin = state.user.role === 'SUPER_ADMIN_SAAS' || state.user.email === 'mbndiaye@gmail.com';
  
  // Show / hide super admin option
  const saasBtn = document.getElementById('btn-level-saas');
  if (saasBtn) {
    saasBtn.style.display = isSuperAdmin ? 'flex' : 'none';
  }

  // Populate tenants dropdown if superadmin
  const tenantSection = document.getElementById('user-tenant-select-container');
  if (tenantSection) {
    if (isSuperAdmin) {
      tenantSection.style.display = 'block';
      try {
        const tenants = await api.request('/tenants');
        const select = document.getElementById('user-tenant-id');
        if (select) {
          select.innerHTML = tenants.map(t => `<option value="${t.id}" ${t.id === state.tenant?.id ? 'selected' : ''}>🏥 ${t.name} (${t.slug})</option>`).join('');
        }
      } catch (e) {
        console.warn('Failed to load tenants list:', e.message);
      }
    } else {
      tenantSection.style.display = 'none';
    }
  }

  selectUserLevel(isSuperAdmin ? 'TENANT_ADMIN' : 'TENANT_USER');
  modal.style.display = 'flex';
}

async function openEditUserModal(id) {
  const user = currentSettingsUsers.find(u => u.id === id);
  if (!user) return;

  const isSuperAdmin = state.user.role === 'SUPER_ADMIN_SAAS' || state.user.email === 'mbndiaye@gmail.com';

  document.getElementById('user-form-id').value = user.id;
  document.getElementById('user-first-name').value = user.first_name || '';
  document.getElementById('user-last-name').value = user.last_name || '';
  document.getElementById('user-email').value = user.email || '';
  document.getElementById('user-password').value = '';
  document.getElementById('user-password').required = false;
  document.getElementById('user-pwd-help').innerText = '(Laisser vide pour ne pas modifier)';
  document.getElementById('user-active').checked = user.is_active !== false;

  document.getElementById('user-modal-title').innerHTML = `<i class="fas fa-user-edit" style="color:var(--primary);"></i> Modifier : ${user.first_name} ${user.last_name}`;

  // Show / hide super admin option
  const saasBtn = document.getElementById('btn-level-saas');
  if (saasBtn) {
    saasBtn.style.display = isSuperAdmin ? 'flex' : 'none';
  }

  // Populate and set tenant selector
  const tenantSection = document.getElementById('user-tenant-select-container');
  if (tenantSection) {
    if (isSuperAdmin) {
      tenantSection.style.display = 'block';
      try {
        const tenants = await api.request('/tenants');
        const select = document.getElementById('user-tenant-id');
        if (select) {
          select.innerHTML = tenants.map(t => `<option value="${t.id}" ${t.id === user.tenant_id ? 'selected' : ''}>🏥 ${t.name} (${t.slug})</option>`).join('');
        }
      } catch (e) {}
    } else {
      tenantSection.style.display = 'none';
    }
  }

  let userRole = user.role;
  if (userRole === 'SUPER_ADMIN') userRole = 'TENANT_ADMIN';
  selectUserLevel(userRole || 'TENANT_USER');

  // Populate Matrix with user's permissions
  const isAdm = ['SUPER_ADMIN_SAAS', 'SUPER_ADMIN', 'TENANT_ADMIN', 'ADMIN'].includes(user.role);
  let perms = user.permissions || {};
  if (isAdm && Object.keys(perms).length === 0) {
    perms = {};
    RBAC_MODULES.forEach(g => g.items.forEach(i => perms[i.key] = { view: true, create: true, update: true, delete: true }));
  }

  renderMatrixTable(perms);
  document.getElementById('user-modal').style.display = 'flex';
}

function closeUserModal() {
  const modal = document.getElementById('user-modal');
  if (modal) modal.style.display = 'none';
}

async function submitUserForm(e) {
  e.preventDefault();
  const id = document.getElementById('user-form-id').value;
  const first_name = document.getElementById('user-first-name').value.trim();
  const last_name = document.getElementById('user-last-name').value.trim();
  const email = document.getElementById('user-email').value.trim();
  const password = document.getElementById('user-password').value;
  const role = document.getElementById('user-role').value || 'TENANT_USER';
  const preset_name = document.getElementById('user-preset').value || 'CUSTOM';
  const is_active = document.getElementById('user-active').checked;
  const tenantSelect = document.getElementById('user-tenant-id');
  const targetTenantId = (tenantSelect && tenantSelect.value) ? tenantSelect.value : undefined;

  // Build permissions object from matrix checkboxes
  const permissions = {};
  RBAC_MODULES.forEach(g => {
    g.items.forEach(item => {
      const v = document.querySelector(`.matrix-chk[data-module="${item.key}"][data-action="view"]`)?.checked || false;
      const c = document.querySelector(`.matrix-chk[data-module="${item.key}"][data-action="create"]`)?.checked || false;
      const u = document.querySelector(`.matrix-chk[data-module="${item.key}"][data-action="update"]`)?.checked || false;
      const d = document.querySelector(`.matrix-chk[data-module="${item.key}"][data-action="delete"]`)?.checked || false;
      permissions[item.key] = { view: v, create: c, update: u, delete: d };
    });
  });

  const payload = {
    first_name,
    last_name,
    email,
    password: password || undefined,
    role,
    preset_name,
    permissions,
    is_active,
    tenant_id: targetTenantId
  };

  try {
    if (id) {
      await api.request(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      showToast(`Utilisateur ${first_name} ${last_name} mis à jour avec succès !`, 'success');
    } else {
      await api.request('/users', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      showToast(`Nouvel utilisateur ${first_name} ${last_name} créé avec succès !`, 'success');
    }
    closeUserModal();
    navigate(state.currentTab || 'users');
  } catch (err) {
    showToast(`Erreur : ${err.message}`, 'danger');
  }
}

async function deleteUserConfirm(id, name) {
  if (!confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur "${name}" ? Cette action est irréversible.`)) return;

  try {
    const res = await api.request(`/users/${id}`, { method: 'DELETE' });
    showToast(res.message || 'Utilisateur supprimé avec succès !', 'success');
    navigate(state.currentTab || 'users');
  } catch (err) {
    showToast(`Erreur : ${err.message}`, 'danger');
  }
}

async function toggleUserStatus(id, currentActive) {
  const user = (currentSettingsUsers || []).find(u => u.id === id);
  if (!user) return;
  try {
    await api.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...user, is_active: !currentActive })
    });
    showToast(`Utilisateur ${!currentActive ? 'activé' : 'désactivé'} avec succès !`);
    navigate(state.currentTab || 'users');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ============================================================================
// Dedicated User Management & Roles View (renderUsers) - 3 Niveaux d'Utilisateurs
// ============================================================================
async function renderUsers(container) {
  const isSuperAdmin = state.user.role === 'SUPER_ADMIN_SAAS' || state.user.email === 'mbndiaye@gmail.com';
  let users = [];
  let tenantsList = [];

  try {
    users = await api.request('/users' + (isSuperAdmin ? '?all=true' : ''));
    if (isSuperAdmin) {
      tenantsList = await api.request('/tenants');
    }
  } catch (err) {
    showToast(err.message, 'error');
    users = [];
  }
  currentSettingsUsers = users || [];

  const isSuperOrTenantAdmin = isSuperAdmin || ['SUPER_ADMIN', 'TENANT_ADMIN', 'ADMIN'].includes(state.user.role);
  const totalUsers = users.length;
  const saasAdmins = users.filter(u => u.role === 'SUPER_ADMIN_SAAS').length;
  const tenantAdmins = users.filter(u => ['SUPER_ADMIN', 'TENANT_ADMIN', 'ADMIN'].includes(u.role) && u.role !== 'SUPER_ADMIN_SAAS').length;
  const regularUsers = users.filter(u => !['SUPER_ADMIN_SAAS', 'SUPER_ADMIN', 'TENANT_ADMIN', 'ADMIN'].includes(u.role)).length;
  const activeUsers = users.filter(u => u.is_active !== false).length;

  const fr = state.currentLang !== 'ar';

  container.innerHTML = `
    <!-- Top KPI Summary Cards - 3 Niveaux -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:15px; margin-bottom:20px;">
      <div class="card" style="padding:16px; background:var(--bg-surface); border-left:4px solid var(--primary);">
        <div style="font-size:0.78rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;">${fr ? 'Total Utilisateurs' : 'إجمالي الحسابات'}</div>
        <div style="font-size:1.7rem; font-weight:800; color:var(--primary); margin-top:4px;">${totalUsers}</div>
      </div>
      <div class="card" style="padding:16px; background:var(--bg-surface); border-left:4px solid #b45309;">
        <div style="font-size:0.78rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;">${fr ? '👑 Super-Admins SaaS' : 'مدراء النظام SaaS'}</div>
        <div style="font-size:1.7rem; font-weight:800; color:#b45309; margin-top:4px;">${saasAdmins}</div>
      </div>
      <div class="card" style="padding:16px; background:var(--bg-surface); border-left:4px solid #2563eb;">
        <div style="font-size:0.78rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;">${fr ? '🛡️ Admins Cliniques' : 'مدراء العيادات'}</div>
        <div style="font-size:1.7rem; font-weight:800; color:#2563eb; margin-top:4px;">${tenantAdmins}</div>
      </div>
      <div class="card" style="padding:16px; background:var(--bg-surface); border-left:4px solid #059669;">
        <div style="font-size:0.78rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;">${fr ? '👤 Utilisateurs Cliniques' : 'مستخدمو العيادات'}</div>
        <div style="font-size:1.7rem; font-weight:800; color:#059669; margin-top:4px;">${regularUsers}</div>
      </div>
    </div>

    <!-- Main Users Registry Card -->
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; flex-wrap:wrap; gap:12px;">
        <div>
          <div class="card-title" style="margin:0; display:flex; align-items:center; gap:8px;">
            <i class="fas fa-users-cog" style="color:var(--primary);"></i>
            <span>${fr ? 'Registre des Utilisateurs & Niveaux d\'Accès' : 'إدارة المستخدمين والصلاحيات'}</span>
          </div>
          <div style="font-size:0.85rem; color:var(--text-muted); margin-top:4px;">
            ${fr 
              ? '3 niveaux d\'utilisateurs : <strong>👑 Super-administrateur SaaS</strong> (accès plateforme & tous les tenants), <strong>🛡️ Administrateurs de cliniques</strong> (gestion complète d\'un tenant) et <strong>👤 Utilisateurs simples</strong> (consultation ou profil métier).' 
              : '3 مستويات: مدير النظام SaaS (كل الصلاحيات والعيادات)، مدير العيادة (إدارة عيادته)، ومستخدم العيادة (استطلاع أو وظيفة محددة).'}
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
          ${isSuperAdmin && tenantsList.length > 0 ? `
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="font-size:0.82rem; font-weight:600; color:var(--text-muted);"><i class="fas fa-filter"></i> Clinique :</span>
              <select id="users-filter-clinic" onchange="filterUsersTableByClinic(this.value)" class="form-control" style="font-size:0.82rem; font-weight:600; padding:5px 10px; border-radius:6px;">
                <option value="all">🌍 Toutes les cliniques</option>
                ${tenantsList.map(t => `<option value="${t.id}">🏥 ${t.name}</option>`).join('')}
              </select>
            </div>
          ` : ''}

          ${isSuperOrTenantAdmin ? `
            <button class="btn btn-primary" onclick="openCreateUserModal()" style="font-size:0.88rem; font-weight:700; display:flex; align-items:center; gap:8px; padding:9px 18px;">
              <i class="fas fa-user-plus"></i> ${fr ? 'Nouvel Utilisateur' : 'مستخدم جديد'}
            </button>
          ` : ''}
        </div>
      </div>

      <div class="table-responsive">
        <table class="table" id="users-table">
          <thead>
            <tr>
              <th>${fr ? 'Utilisateur' : 'المستخدم'}</th>
              ${isSuperAdmin ? `<th>${fr ? 'Clinique de Rattachement' : 'العيادة'}</th>` : ''}
              <th>${fr ? 'Email de Connexion' : 'البريد الإلكتروني'}</th>
              <th>${fr ? 'Niveau d\'Accès & Profil' : 'مستوى الصلاحية'}</th>
              <th>${fr ? 'Permissions Accordées' : 'الأذونات'}</th>
              <th>${fr ? 'Statut' : 'الحالة'}</th>
              <th style="text-align:right;">${fr ? 'Actions' : 'الإجراءats'}</th>
            </tr>
          </thead>
          <tbody id="users-tbody">
            ${renderUsersRows(users, isSuperAdmin, fr)}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderUsersRows(users, isSuperAdmin, fr) {
  if (users.length === 0) {
    return `
      <tr>
        <td colspan="${isSuperAdmin ? 7 : 6}" style="text-align:center; padding:35px; color:var(--text-muted);">
          ${fr ? 'Aucun utilisateur trouvé.' : 'لا يوجد مستخدمون مسجلون.'}
        </td>
      </tr>
    `;
  }

  return users.map(u => {
    const isSaas = u.role === 'SUPER_ADMIN_SAAS';
    const isTenantAdmin = ['SUPER_ADMIN', 'TENANT_ADMIN', 'ADMIN'].includes(u.role) && !isSaas;
    const perms = u.permissions || {};
    const permCount = Object.keys(perms).filter(k => perms[k] && (perms[k].view || perms[k].create || perms[k].update || perms[k].delete)).length;
    
    let roleBadge = '';
    let avatarBg = '';
    if (isSaas) {
      roleBadge = '<span class="badge" style="background:#fef3c7; color:#92400e; border:1px solid #fde68a; font-size:0.82rem; font-weight:800; padding:5px 10px;"><i class="fas fa-crown"></i> Super-Admin SaaS (Plateforme)</span>';
      avatarBg = 'linear-gradient(135deg, #f59e0b, #d97706)';
    } else if (isTenantAdmin) {
      roleBadge = '<span class="badge" style="background:#eff6ff; color:#1d4ed8; border:1px solid #bfdbfe; font-size:0.82rem; font-weight:700; padding:5px 10px;"><i class="fas fa-shield-alt"></i> Admin Clinique (Tout faire)</span>';
      avatarBg = 'linear-gradient(135deg, #2563eb, #1d4ed8)';
    } else if (u.preset_name === 'READONLY' || u.role === 'READONLY') {
      roleBadge = '<span class="badge" style="background:#f1f5f9; color:#475569; border:1px solid #cbd5e1; font-size:0.82rem; font-weight:700; padding:5px 10px;"><i class="fas fa-eye"></i> Utilisateur Simple (Consultation seule)</span>';
      avatarBg = 'linear-gradient(135deg, #64748b, #475569)';
    } else {
      roleBadge = `<span class="badge" style="background:#ecfdf5; color:#047857; border:1px solid #a7f3d0; font-size:0.82rem; font-weight:700; padding:5px 10px;"><i class="fas fa-user-tag"></i> Utilisateur Clinique (${u.preset_name || 'Métier'})</span>`;
      avatarBg = 'linear-gradient(135deg, #059669, #10b981)';
    }

    const clinicBadge = isSaas 
      ? '<span class="badge" style="background:#f3e8ff; color:#6b21a8; border:1px solid #e9d5ff; font-size:0.8rem; font-weight:700;"><i class="fas fa-globe"></i> Plateforme Globale (Toutes)</span>'
      : (u.tenant_name ? `<span style="font-weight:600; color:var(--text-primary); font-size:0.85rem;"><i class="fas fa-clinic-medical" style="color:var(--primary);"></i> ${u.tenant_name}</span>` : '<span style="color:var(--text-muted); font-size:0.8rem;">Non assignée</span>');

    return `
      <tr style="opacity: ${u.is_active ? 1 : 0.6}" data-tenant-id="${u.tenant_id || ''}">
        <td>
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:38px; height:38px; border-radius:50%; background:${avatarBg}; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.9rem; box-shadow:0 2px 5px rgba(0,0,0,0.1);">
              ${(u.first_name || 'U').charAt(0).toUpperCase()}${(u.last_name || '').charAt(0).toUpperCase()}
            </div>
            <div>
              <strong style="color:var(--text-primary); font-size:0.95rem;">${u.first_name} ${u.last_name}</strong>
              ${u.id === state.user.id ? '<span class="badge badge-primary" style="font-size:0.7rem; margin-left:6px; background:var(--primary); color:#fff; padding:2px 6px; border-radius:10px;">Vous</span>' : ''}
            </div>
          </div>
        </td>
        ${isSuperAdmin ? `<td>${clinicBadge}</td>` : ''}
        <td>
          <code style="font-size:0.88rem; color:var(--text-primary); background:rgba(0,0,0,0.04); padding:3px 6px; border-radius:4px;">${u.email}</code>
        </td>
        <td>${roleBadge}</td>
        <td>
          ${isSaas
            ? '<span style="font-size:0.82rem; color:#92400e; font-weight:700;"><i class="fas fa-infinity"></i> Accès total SaaS (Multi-cliniques, Tous les tenants)</span>'
            : isTenantAdmin 
              ? '<span style="font-size:0.82rem; color:#1d4ed8; font-weight:600;"><i class="fas fa-check-double"></i> Accès total clinique (Écriture, Création, Modification, Suppression)</span>' 
              : (u.preset_name === 'READONLY' || u.role === 'READONLY')
                ? '<span style="font-size:0.82rem; color:#475569; font-weight:600;"><i class="fas fa-eye"></i> Consultation seule (Lecture intégrale)</span>'
                : `<span style="font-size:0.82rem; color:var(--text-muted);">${permCount} module(s) configuré(s)</span>`
          }
        </td>
        <td>
          <span class="badge ${u.is_active ? 'badge-success' : 'badge-danger'}" style="background-color:${u.is_active ? 'var(--success)' : 'var(--danger)'}; color:white; padding:4px 8px; border-radius:4px; font-size:0.75rem; font-weight:600;">
            ${u.is_active ? (fr ? 'Actif' : 'نشط') : (fr ? 'Inactif' : 'معطل')}
          </span>
        </td>
        <td style="text-align:right;">
          <button class="btn btn-secondary btn-sm" onclick="openEditUserModal('${u.id}')" style="padding:5px 9px; margin-right:4px;" title="Modifier">
            <i class="fas fa-edit"></i>
          </button>
          ${u.id !== state.user.id ? `
            <button class="btn btn-secondary btn-sm" onclick="toggleUserStatus('${u.id}', ${u.is_active})" style="padding:5px 9px; margin-right:4px;" title="${u.is_active ? 'Désactiver' : 'Activer'}">
              <i class="fas ${u.is_active ? 'fa-user-slash' : 'fa-user-check'}"></i>
            </button>
            <button class="btn btn-danger btn-sm" onclick="deleteUserConfirm('${u.id}', '${(u.first_name + ' ' + u.last_name).replace(/'/g, "\\'")}')" style="padding:5px 9px; background-color:var(--danger); border-color:var(--danger);" title="Supprimer">
              <i class="fas fa-trash-alt"></i>
            </button>
          ` : ''}
        </td>
      </tr>
    `;
  }).join('');
}

function filterUsersTableByClinic(tenantId) {
  const isSuperAdmin = state.user.role === 'SUPER_ADMIN_SAAS' || state.user.email === 'mbndiaye@gmail.com';
  const fr = state.currentLang !== 'ar';
  const filtered = tenantId === 'all' 
    ? (currentSettingsUsers || []) 
    : (currentSettingsUsers || []).filter(u => u.tenant_id === tenantId || u.role === 'SUPER_ADMIN_SAAS');
  
  const tbody = document.getElementById('users-tbody');
  if (tbody) {
    tbody.innerHTML = renderUsersRows(filtered, isSuperAdmin, fr);
  }
}

async function switchSuperAdminClinic(tenantId) {
  try {
    const tenants = await api.request('/tenants');
    const target = tenants.find(t => t.id === tenantId);
    if (target) {
      state.tenant = target;
      showToast(`Clinique active basculée sur : ${target.name} (${target.slug})`, 'info');
      navigate(state.currentTab || 'dashboard');
    }
  } catch (err) {
    showToast(err.message, 'error');
  }
}

window.openCreateUserModal = openCreateUserModal;
window.openEditUserModal = openEditUserModal;
window.closeUserModal = closeUserModal;
window.submitUserForm = submitUserForm;
window.applyUserPreset = applyUserPreset;
window.selectUserLevel = selectUserLevel;
window.filterUsersTableByClinic = filterUsersTableByClinic;
window.switchSuperAdminClinic = switchSuperAdminClinic;
window.deleteUserConfirm = deleteUserConfirm;
window.toggleUserStatus = toggleUserStatus;

// ============================================================================
// Tenants Administration View
// ============================================================================
async function renderTenants(container) {
  let list = [];
  try {
    list = await api.request('/tenants');
  } catch (err) {
    showToast(err.message, 'error');
    list = [];
  }

  const isSuperAdmin = state.user.role === 'SUPER_ADMIN_SAAS' || state.user.email === 'mbndiaye@gmail.com';

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
      <h3 style="color:var(--text-primary); font-weight:600; margin:0;">${t('tenantsList')}</h3>
      ${isSuperAdmin ? `
        <button class="btn btn-primary" onclick="openCreateTenantModal()">
          <i class="fas fa-plus"></i> ${t('addTenant')}
        </button>
      ` : ''}
    </div>

    <div class="card">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Logo</th>
              <th>${t('tenantName')}</th>
              <th>Slug</th>
              <th>${t('tenantPhone')}</th>
              <th>${t('tenantEmail')}</th>
              <th>NINEA</th>
              <th>Status</th>
              ${isSuperAdmin ? `<th>${t('actions')}</th>` : ''}
            </tr>
          </thead>
          <tbody>
            ${list.length === 0 ? `
              <tr>
                <td colspan="${isSuperAdmin ? 8 : 7}" style="text-align:center; padding:30px; color:var(--text-muted);">
                  ${t('noTenants')}
                </td>
              </tr>
            ` : list.map(tnt => `
              <tr>
                <td>
                  ${tnt.logo_url ? `
                    <img src="${tnt.logo_url}" alt="logo" style="width:40px; height:40px; border-radius:8px; object-fit:contain; background-color:white; padding:2px; border:1px solid var(--border-color);" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                    <div style="display:none; width:40px; height:40px; border-radius:8px; background:rgba(74,144,226,0.1); color:var(--primary); align-items:center; justify-content:center; font-size:1.2rem;"><i class="fas fa-clinic-medical"></i></div>
                  ` : `
                    <div style="width:40px; height:40px; border-radius:8px; background:rgba(74,144,226,0.1); color:var(--primary); display:flex; align-items:center; justify-content:center; font-size:1.2rem;"><i class="fas fa-clinic-medical"></i></div>
                  `}
                </td>
                <td><strong>${tnt.name}</strong></td>
                <td><code style="background-color:var(--bg-primary); padding:3px 6px; border-radius:4px; font-size:0.85rem; color:var(--primary); font-weight:600;">${tnt.slug}</code></td>
                <td>${tnt.phone_number || ''}</td>
                <td>${tnt.email || ''}</td>
                <td>${tnt.ninea_rc || ''}</td>
                <td>
                  <span class="badge ${tnt.is_active ? 'badge-success' : 'badge-danger'}" style="background-color:${tnt.is_active ? 'var(--success)' : 'var(--danger)'}; color:white; padding:4px 8px; border-radius:4px; font-size:0.75rem; font-weight:600;">
                    ${tnt.is_active ? (state.currentLang === 'ar' ? 'نشط' : 'Actif') : (state.currentLang === 'ar' ? 'غير نشط' : 'Inactif')}
                  </span>
                </td>
                ${isSuperAdmin ? `
                  <td>
                    <button class="btn btn-secondary btn-sm" onclick="openEditTenantModal('${tnt.id}')" style="padding:5px 10px; margin-right:5px;">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTenantConfirm('${tnt.id}')" style="padding:5px 10px; background-color:var(--danger); border-color:var(--danger);">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                ` : ''}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openCreateTenantModal() {
  const modal = document.getElementById('tenant-modal');
  const form = document.getElementById('tenant-form');
  if (!modal || !form) return;

  form.reset();
  document.getElementById('tenant-form-id').value = '';
  document.getElementById('tenant-modal-title').innerText = t('addTenant');
  document.getElementById('tenant-status-group').style.display = 'none';
  document.getElementById('tenant-admin-section').style.display = 'block';
  
  // Set required attributes for admin fields
  document.getElementById('tenant-admin-first').setAttribute('required', 'true');
  document.getElementById('tenant-admin-last').setAttribute('required', 'true');
  document.getElementById('tenant-admin-email').setAttribute('required', 'true');
  document.getElementById('tenant-admin-password').setAttribute('required', 'true');

  modal.style.display = 'flex';
}

async function openEditTenantModal(id) {
  const modal = document.getElementById('tenant-modal');
  const form = document.getElementById('tenant-form');
  if (!modal || !form) return;

  try {
    const tenants = await api.request('/tenants');
    const tenant = tenants.find(tnt => tnt.id === id);
    if (!tenant) throw new Error('Tenant not found');

    document.getElementById('tenant-form-id').value = tenant.id;
    document.getElementById('tenant-modal-title').innerText = t('editTenant');
    
    document.getElementById('tenant-name').value = tenant.name || '';
    document.getElementById('tenant-slug').value = tenant.slug || '';
    document.getElementById('tenant-phone').value = tenant.phone_number || '';
    document.getElementById('tenant-ninea').value = tenant.ninea_rc || '';
    document.getElementById('tenant-email').value = tenant.email || '';
    document.getElementById('tenant-logo').value = tenant.logo_url || '';
    document.getElementById('tenant-stamp').value = tenant.stamp_url || '';
    document.getElementById('tenant-address').value = tenant.address || '';
    document.getElementById('tenant-active').checked = tenant.is_active;

    document.getElementById('tenant-status-group').style.display = 'block';
    document.getElementById('tenant-admin-section').style.display = 'none';

    // Remove required attributes from admin fields
    document.getElementById('tenant-admin-first').removeAttribute('required');
    document.getElementById('tenant-admin-last').removeAttribute('required');
    document.getElementById('tenant-admin-email').removeAttribute('required');
    document.getElementById('tenant-admin-password').removeAttribute('required');

    modal.style.display = 'flex';
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function closeTenantModal() {
  const modal = document.getElementById('tenant-modal');
  if (modal) modal.style.display = 'none';
}

async function submitTenantForm(e) {
  e.preventDefault();
  const id = document.getElementById('tenant-form-id').value;
  
  const payload = {
    name: document.getElementById('tenant-name').value,
    slug: document.getElementById('tenant-slug').value,
    phone_number: document.getElementById('tenant-phone').value,
    ninea_rc: document.getElementById('tenant-ninea').value,
    email: document.getElementById('tenant-email').value,
    logo_url: document.getElementById('tenant-logo').value,
    stamp_url: document.getElementById('tenant-stamp').value,
    address: document.getElementById('tenant-address').value,
  };

  const isEditing = !!id;

  if (isEditing) {
    payload.is_active = document.getElementById('tenant-active').checked;
  } else {
    payload.admin_first_name = document.getElementById('tenant-admin-first').value;
    payload.admin_last_name = document.getElementById('tenant-admin-last').value;
    payload.admin_email = document.getElementById('tenant-admin-email').value;
    payload.admin_password = document.getElementById('tenant-admin-password').value;
  }

  try {
    let response;
    if (isEditing) {
      response = await api.request(`/tenants/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      showToast(state.currentLang === 'ar' ? 'تم تعديل بيانات العiادة بنجاح' : 'Clinique mise à jour avec succès !');
    } else {
      response = await api.request('/tenants', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      showToast(state.currentLang === 'ar' ? 'تم تسجيل العيادة والمسؤول بنجاح' : 'Clinique et administrateur créés avec succès !');
    }
    
    closeTenantModal();
    navigate('tenants');
  } catch (err) {
    // Error is handled by api.request
  }
}

async function deleteTenantConfirm(id) {
  if (confirm(t('confirmDeleteTenant'))) {
    try {
      await api.request(`/tenants/${id}`, {
        method: 'DELETE'
      });
      showToast(state.currentLang === 'ar' ? 'تم حذف العيادة بنجاح' : 'Clinique supprimée avec succès !');
      navigate('tenants');
    } catch (err) {
      // Error shown by api.request
    }
  }
}

// ============================================================================
// Layout and Application Initialization
// ============================================================================
// ============================================================================
// Layout and Application Initialization
// ============================================================================
function renderAuthLayout() {
  const root = document.getElementById('app-root');
  
  root.innerHTML = `
    <!-- Landing Page Shell -->
    <div class="landing-page">
      <!-- Top Navbar -->
      <nav class="landing-nav">
        <div class="landing-brand" style="display:flex; align-items:center; gap:12px;">
          <img src="/logo_softmed.png" alt="SoftMed Logo" style="height:44px; width:44px; border-radius:50%; object-fit:cover; background:white; padding:2px; box-shadow:0 4px 12px rgba(0,0,0,0.15);" />
          <div style="display:flex; flex-direction:column; line-height:1.15;">
            <span style="font-weight:800; font-size:1.35rem; color:#ffffff; letter-spacing:0.5px;">Soft<span style="color:#38bdf8;">Med</span></span>
            <span style="font-size:0.65rem; color:#cbd5e1; text-transform:uppercase; letter-spacing:0.8px; font-weight:600;">Solution de Gestion Médicale</span>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
          <button class="btn btn-success" onclick="openPublicBookingPortal()" style="background:#10b981; border-color:#10b981; color:#fff; font-weight:700; padding:8px 16px; box-shadow:0 4px 12px rgba(16,185,129,0.25);">
            <i class="fas fa-calendar-check"></i> ${state.currentLang === 'fr' ? 'Prendre Rendez-vous' : 'حجز موعد'}
          </button>
          <button class="btn btn-secondary" onclick="openAuthModal('login')">${t('homeCTAConnect')}</button>
          <button class="btn btn-primary" onclick="openAuthModal('signup')">${t('homeCTASignup')}</button>
        </div>
      </nav>

      <!-- Hero Section -->
      <header class="landing-hero">
        <h1>${t('homeTitle')}</h1>
        <p>${t('homeSubtitle')}</p>
        <div class="hero-actions" style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
          <button class="btn btn-success btn-lg" onclick="openPublicBookingPortal()" style="background:#10b981; border-color:#10b981; color:#fff; font-weight:700; padding:12px 24px; box-shadow:0 8px 25px rgba(16, 185, 129, 0.35);">
            <i class="fas fa-calendar-alt"></i> ${state.currentLang === 'fr' ? 'Prendre Rendez-vous en Ligne' : 'حجز موعد عبر الإنترنت'}
          </button>
          <button class="btn btn-primary btn-lg" onclick="openAuthModal('login')"><i class="fas fa-sign-in-alt"></i> ${t('homeCTAConnect')}</button>
          <button class="btn btn-secondary btn-lg" onclick="openAuthModal('signup')"><i class="fas fa-plus-circle"></i> ${t('homeCTASignup')}</button>
        </div>
      </header>

      <!-- Features Section -->
      <section class="landing-features">
        <h2>${t('homeFeatures')}</h2>
        <div class="features-grid">
          <div class="feature-card" style="border:1px solid rgba(16, 185, 129, 0.35); background:rgba(16, 185, 129, 0.05); position:relative; overflow:hidden;">
            <div style="position:absolute; top:12px; right:12px; background:#10b981; color:#fff; font-size:0.65rem; font-weight:700; padding:2px 6px; border-radius:10px;">ACCÈS PATIENT</div>
            <div class="feature-icon" style="background:#10b981; color:#fff;"><i class="fas fa-calendar-check"></i></div>
            <h3 style="color:#10b981;">Prise de Rendez-vous 24h/24</h3>
            <p>Accès direct par Code Patient Unique (0 F d'acompte) ou création de dossier en ligne avec acompte sécurisé Wave / Orange Money.</p>
            <button class="btn btn-success btn-sm" onclick="openPublicBookingPortal()" style="margin-top:12px; width:100%; font-weight:600; background:#10b981; border-color:#10b981;">
              <i class="fas fa-arrow-right"></i> Réserver une consultation
            </button>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-notes-medical"></i></div>
            <h3>${t('homeFeature1')}</h3>
            <p>${t('homeFeature1Desc')}</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-file-prescription"></i></div>
            <h3>${t('homeFeature2')}</h3>
            <p>${t('homeFeature2Desc')}</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-wallet"></i></div>
            <h3>${t('homeFeature3')}</h3>
            <p>${t('homeFeature3Desc')}</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-bed"></i></div>
            <h3>${t('homeFeature4')}</h3>
            <p>${t('homeFeature4Desc')}</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-box"></i></div>
            <h3>${t('homeFeature5')}</h3>
            <p>${t('homeFeature5Desc')}</p>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="landing-footer">
        <!-- Coordonnées de l'éditeur : la plateforme n'affichait aucun moyen de
             contact, un visiteur intéressé n'avait donc pas comment nous joindre. -->
        <div class="landing-contact">
          <div class="landing-contact-brand">
            <!-- Chemin relatif et non « /logo… » : un chemin absolu pointe vers la
                 racine du disque quand la page est ouverte directement en mode
                 fichier, et l'image ne s'affiche pas. Le relatif fonctionne aussi
                 bien servi par Express qu'ouvert depuis public/. -->
            <img src="logo_sst_clean.png" alt="Soft Services Technologiques" />
            <div>
              <div class="landing-contact-name">Soft Services Technologiques</div>
              <div class="landing-contact-baseline">
                Développement de sites web et logiciels &bull; SIG &bull; GED &bull; GFA &bull;
                Réseaux et sécurité informatique &bull; Formation &bull; Maintenance &bull;
                Vente et location de matériels
              </div>
            </div>
          </div>

          <div class="landing-contact-grid">
            <div class="landing-contact-item">
              <i class="fas fa-phone"></i>
              <div>
                <a href="tel:+221338681229">+221 33 868 12 29</a><br />
                <a href="tel:+221776473506">+221 77 647 35 06</a>
              </div>
            </div>
            <div class="landing-contact-item">
              <i class="fas fa-envelope"></i>
              <div>
                <a href="mailto:sst@sst.best">sst@sst.best</a><br />
                <a href="mailto:mbndiaye@sst.best">mbndiaye@sst.best</a>
              </div>
            </div>
            <div class="landing-contact-item">
              <i class="fas fa-globe"></i>
              <div><a href="https://sst.best" target="_blank" rel="noopener">sst.best</a></div>
            </div>
          </div>
        </div>

        <p>${t('complianceText')}</p>
        <p style="margin-top:10px; font-size:0.8rem; opacity:0.6;">
          &copy; 2026 SoftMed &mdash; une solution Soft Services Technologiques. Tous droits réservés.
        </p>
      </footer>
    </div>

    <!-- Auth Modal Overlay -->
    <div class="modal-overlay" id="auth-modal" style="display:none; justify-content:center; align-items:center;">
      <div class="modal-container" style="width:500px; max-width:95%; max-height:90vh; overflow-y:auto; position:relative; animation: modalFadeIn 0.3s ease;">
        <button class="modal-close" onclick="closeAuthModal()" style="position:absolute; top:15px; right:15px; background:none; border:none; color:var(--text-muted); font-size:1.5rem; cursor:pointer;">&times;</button>
        <div style="text-align:center; margin-bottom:18px; padding-top:10px;">
          <img src="/logo_softmed.png" alt="SoftMed" style="width:68px; height:68px; border-radius:50%; object-fit:cover; margin:0 auto 10px; box-shadow:0 4px 14px rgba(0,0,0,0.1); border:2px solid #e2e8f0;" />
          <h3 id="auth-modal-title" style="color:var(--text-primary); font-size:1.35rem; margin:0; font-weight:800;">Se Connecter</h3>
        </div>
        
        <!-- Tab selector -->
        <div style="display:flex; border-bottom:1px solid var(--border-color); margin-bottom:20px;">
          <button id="tab-login-btn" class="btn btn-secondary" style="flex:1; border:none; border-bottom:2px solid var(--primary); border-radius:0; background:none;" onclick="switchAuthTab('login')">Se Connecter</button>
          <button id="tab-signup-btn" class="btn btn-secondary" style="flex:1; border:none; border-radius:0; background:none;" onclick="switchAuthTab('signup')">S'enregistrer</button>
        </div>

        <!-- Login Form -->
        <form id="login-form" onsubmit="handleLogin(event)">
          <div class="form-group">
            <label class="form-label">Adresse Email</label>
            <input type="email" class="form-control" id="login-email" placeholder="votre-email@domaine.com" required />
          </div>
          <div class="form-group">
            <label class="form-label">Mot de passe</label>
            <input type="password" class="form-control" id="login-password" placeholder="••••••••" required />
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:-4px; margin-bottom:14px;">
            <label style="cursor:pointer; display:flex; align-items:center; gap:5px; font-size:0.8rem; color:var(--text-muted); margin:0;">
              <input type="checkbox" id="login-remember" checked /> Se souvenir de moi
            </label>
            <a href="javascript:void(0)" onclick="switchAuthTab('forgot')" style="font-size:0.82rem; color:var(--primary); font-weight:600; text-decoration:none;">
              Mot de passe oublié ?
            </a>
          </div>

          <button class="btn btn-primary" style="width:100%; height:45px; margin-top:5px; font-weight:700;">Accéder à ma structure sanitaire</button>
          
          <div style="margin-top:16px; text-align:center; border-top:1px solid var(--border-color); padding-top:14px;">
            <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:8px;">Vous êtes un patient ?</div>
            <button type="button" class="btn btn-secondary" onclick="openPublicBookingPortal('paix')" style="width:100%; font-size:0.85rem; border-color:var(--primary); color:var(--primary);">
              <i class="fas fa-calendar-alt"></i> Prendre Rendez-vous en Ligne
            </button>
          </div>
        </form>

        <!-- Forgot Password Form -->
        <form id="forgot-form" onsubmit="handleForgotPassword(event)" style="display:none;">
          <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.5; margin-bottom:16px;">
            Saisissez votre adresse email. Un lien sécurisé vous sera instantanément envoyé par email pour réinitialiser votre mot de passe.
          </p>
          <div class="form-group">
            <label class="form-label">Adresse Email Professionnelle</label>
            <input type="email" class="form-control" id="forgot-email" placeholder="nom@domaine.com" required />
          </div>
          <button type="submit" id="btn-submit-forgot" class="btn btn-primary" style="width:100%; height:45px; margin-top:10px; font-weight:700;">
            <i class="fas fa-paper-plane"></i> Envoyer le lien de réinitialisation
          </button>
          
          <div style="margin-top:16px; text-align:center; border-top:1px solid var(--border-color); padding-top:14px;">
            <a href="javascript:void(0)" onclick="switchAuthTab('login')" style="font-size:0.85rem; color:var(--text-muted); text-decoration:none; display:flex; align-items:center; justify-content:center; gap:6px;">
              <i class="fas fa-arrow-left"></i> Retour à la page de connexion
            </a>
          </div>
        </form>

        <!-- Signup Form (Hidden by default) -->
        <form id="signup-form" onsubmit="handleTenantSignup(event)" style="display:none;">
          <div class="form-group">
            <label class="form-label">Nom de la Structure Sanitaire</label>
            <input type="text" class="form-control" id="signup-tenant-name" placeholder="Centre Médical de l'Espoir" required />
          </div>
          <div class="form-group">
            <label class="form-label">Identifiant Unique URL (Slug)</label>
            <input type="text" class="form-control" id="signup-tenant-slug" placeholder="espoir" required />
          </div>
          <div class="form-group" style="display:flex; gap:10px;">
            <div style="flex:1;">
              <label class="form-label">Téléphone</label>
              <input type="text" class="form-control" id="signup-phone" placeholder="+22133..." required />
            </div>
            <div style="flex:1;">
              <label class="form-label">NINEA / RC fiscal</label>
              <input type="text" class="form-control" id="signup-ninea" placeholder="N00189-RC" />
            </div>
          </div>
          
          <div class="form-group" style="display:flex; gap:10px;">
            <div style="flex:1;">
              <label class="form-label">Adresse Physique</label>
              <input type="text" class="form-control" id="signup-address" placeholder="12 Rue de Dakar, Fann" />
            </div>
            <div style="flex:1;">
              <label class="form-label">Logo de la Structure Sanitaire</label>
              <div style="display:flex; gap:5px;">
                <input type="text" class="form-control" id="signup-logo" placeholder="/logo-espoir.png" style="flex:1;" />
                <input type="file" id="signup-logo-file" style="display:none;" accept="image/*" onchange="uploadImage(this, 'signup-logo')" />
                <button type="button" class="btn btn-secondary" onclick="document.getElementById('signup-logo-file').click()" style="padding:0 12px; height:38px;"><i class="fas fa-upload"></i></button>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Géolocalisation (Coordonnées GPS)</label>
            <div style="display:flex; gap:10px;">
              <input type="number" step="any" class="form-control" id="signup-lat" placeholder="Latitude (ex: 14.6937)" />
              <input type="number" step="any" class="form-control" id="signup-lng" placeholder="Longitude (ex: -17.4479)" />
            </div>
          </div>

          <div class="form-group" style="margin-bottom:20px;">
            <label class="form-label" style="font-weight:600;"><i class="fas fa-cash-register"></i> Moyens de paiement acceptés</label>
            <div style="background:var(--bg-primary); border: 1px solid var(--border-color); padding: 12px; border-radius: 8px;">
              <div id="signup-payment-methods-list" style="margin-bottom:10px;">
                <!-- Dynamically rendered list -->
              </div>

              <!-- Sub-form to add a payment method -->
              <div style="border-top:1px dashed var(--border-color); padding-top:10px; margin-top:10px;">
                <span style="font-size:0.85rem; font-weight:600; color:var(--text-primary); display:block; margin-bottom:8px;">Ajouter un moyen de paiement :</span>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; margin-bottom:8px;">
                  <input type="text" class="form-control" id="signup-moyen-name" placeholder="Libellé (ex: Wave, Chèque...)" style="font-size:0.85rem;" />
                  <input type="text" class="form-control" id="signup-moyen-number" placeholder="Numéro à créditer" style="font-size:0.85rem;" />
                </div>
                <div style="display:flex; gap:8px; align-items:center;">
                  <input type="text" class="form-control" id="signup-moyen-qr" placeholder="QR Code URL (facultatif)" style="font-size:0.85rem; flex:1;" />
                  <input type="file" id="signup-moyen-qr-file" style="display:none;" accept="image/*" onchange="uploadImage(this, 'signup-moyen-qr')" />
                  <button type="button" class="btn btn-secondary" onclick="document.getElementById('signup-moyen-qr-file').click()" title="Uploader un QR Code" style="padding:0 12px; height:36px;"><i class="fas fa-upload"></i></button>
                  <button type="button" class="btn btn-primary" onclick="addSignupPaymentMethod()" style="font-size:0.85rem; padding:0 14px; height:36px; white-space:nowrap;"><i class="fas fa-plus"></i> Ajouter</button>
                </div>
              </div>
            </div>
          </div>

          <div style="border-top:1px solid var(--border-color); padding-top:15px; margin-top:15px;">
            <h5 style="margin-bottom:12px; color:var(--text-primary); font-weight:700;"><i class="fas fa-user-shield text-primary"></i> Compte Administrateur Principal</h5>
            <div style="display:flex; gap:10px; margin-bottom:10px;">
              <div style="flex:1;">
                <label class="form-label" style="font-size:0.8rem; font-weight:600;">Prénom</label>
                <input type="text" class="form-control" id="signup-first" placeholder="Prénom" required />
              </div>
              <div style="flex:1;">
                <label class="form-label" style="font-size:0.8rem; font-weight:600;">Nom</label>
                <input type="text" class="form-control" id="signup-last" placeholder="Nom" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-size:0.8rem; font-weight:600;"><i class="fas fa-envelope"></i> Adresse Email Professionnelle (Login)</label>
              <input type="email" class="form-control" id="signup-email" placeholder="admin@structure.com" required />
            </div>
            <div class="form-group">
              <label class="form-label" style="font-size:0.8rem; font-weight:600;"><i class="fas fa-lock"></i> Mot de passe de Connexion</label>
              <input type="password" class="form-control" id="signup-password" placeholder="••••••••" required />
            </div>
          </div>
          <button class="btn btn-primary" style="width:100%; height:45px; margin-top:10px; font-weight:700;">Créer ma structure sanitaire & démarrer</button>
        </form>
      </div>
    </div>
  `;
}

function openAuthModal(tab) {
  const modal = document.getElementById('auth-modal');
  if (modal) {
    modal.style.display = 'flex';
    switchAuthTab(tab);
  }
}

let signupPaymentMethods = [];

function renderSignupPaymentMethodsList() {
  const container = document.getElementById('signup-payment-methods-list');
  if (!container) return;

  if (signupPaymentMethods.length === 0) {
    container.innerHTML = `<div style="font-size:0.8rem; color:var(--text-muted); font-style:italic;">Aucun moyen de paiement ajouté (vous pourrez aussi en configurer dans les paramètres).</div>`;
    return;
  }

  container.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:6px;">
      ${signupPaymentMethods.map((pm, idx) => `
        <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-surface); padding:6px 10px; border-radius:6px; border:1px solid var(--border-color); font-size:0.85rem;">
          <div>
            <strong>${pm.name}</strong> : <span style="color:var(--text-muted);">${pm.number || 'N/A'}</span>
            ${pm.qr_code_url ? `<span class="badge badge-success" style="font-size:0.7rem; margin-left:6px; background:var(--primary); color:white; padding:2px 6px; border-radius:10px;"><i class="fas fa-qrcode"></i> QR</span>` : ''}
          </div>
          <button type="button" class="btn btn-danger btn-sm" onclick="removeSignupPaymentMethod(${idx})" style="padding:2px 6px; font-size:0.75rem; background:var(--danger); border-color:var(--danger);"><i class="fas fa-trash"></i></button>
        </div>
      `).join('')}
    </div>
  `;
}

function addSignupPaymentMethod() {
  const nameInput = document.getElementById('signup-moyen-name');
  const numberInput = document.getElementById('signup-moyen-number');
  const qrInput = document.getElementById('signup-moyen-qr');

  const name = nameInput.value.trim();
  const number = numberInput.value.trim();
  const qr_code_url = qrInput.value.trim();

  if (!name) {
    showToast('Veuillez saisir le libellé du moyen de paiement', 'warning');
    return;
  }

  signupPaymentMethods.push({ name, number, qr_code_url });
  nameInput.value = '';
  numberInput.value = '';
  qrInput.value = '';

  renderSignupPaymentMethodsList();
}

function removeSignupPaymentMethod(index) {
  signupPaymentMethods.splice(index, 1);
  renderSignupPaymentMethodsList();
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function switchAuthTab(tab) {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const forgotForm = document.getElementById('forgot-form');
  const tabSelector = document.getElementById('tab-login-btn') ? document.getElementById('tab-login-btn').parentElement : null;
  const loginBtn = document.getElementById('tab-login-btn');
  const signupBtn = document.getElementById('tab-signup-btn');
  const title = document.getElementById('auth-modal-title');
  
  if (tab === 'login') {
    if (tabSelector) tabSelector.style.display = 'flex';
    if (loginForm) loginForm.style.display = 'block';
    if (signupForm) signupForm.style.display = 'none';
    if (forgotForm) forgotForm.style.display = 'none';
    if (loginBtn) loginBtn.style.borderBottom = '2px solid var(--primary)';
    if (signupBtn) signupBtn.style.borderBottom = 'none';
    if (title) title.innerText = state.currentLang === 'ar' ? 'تسجيل الدخول' : 'Se Connecter';
  } else if (tab === 'signup') {
    if (tabSelector) tabSelector.style.display = 'flex';
    if (loginForm) loginForm.style.display = 'none';
    if (signupForm) signupForm.style.display = 'block';
    if (forgotForm) forgotForm.style.display = 'none';
    if (loginBtn) loginBtn.style.borderBottom = 'none';
    if (signupBtn) signupBtn.style.borderBottom = '2px solid var(--primary)';
    renderSignupPaymentMethodsList();
    if (title) title.innerText = state.currentLang === 'ar' ? 'سجل هيكل صحي جديد' : "Créer une Structure Sanitaire";

    // Clear any invalid browser autofill (such as AI model names) from the email/password fields
    setTimeout(() => {
      const sEmail = document.getElementById('signup-email');
      const sPass = document.getElementById('signup-password');
      if (sEmail && (!sEmail.value.includes('@') || sEmail.value.toLowerCase().includes('deepseek') || sEmail.value.toLowerCase().includes('claude') || sEmail.value.toLowerCase().includes('gemini') || sEmail.value.toLowerCase().includes('openai') || sEmail.value.toLowerCase().includes('llama') || sEmail.value.toLowerCase().includes('aiml'))) {
        sEmail.value = '';
        if (sPass) sPass.value = '';
      }
    }, 60);
  } else if (tab === 'forgot') {
    if (tabSelector) tabSelector.style.display = 'none';
    if (loginForm) loginForm.style.display = 'none';
    if (signupForm) signupForm.style.display = 'none';
    if (forgotForm) forgotForm.style.display = 'block';
    if (title) title.innerText = state.currentLang === 'ar' ? 'نسيت كلمة المرور' : 'Mot de passe oublié';
  }
}

async function handleForgotPassword(e) {
  e.preventDefault();
  const email = document.getElementById('forgot-email').value.trim();
  const submitBtn = document.getElementById('btn-submit-forgot');

  if (!email) {
    showToast('Veuillez renseigner votre adresse email', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Envoi en cours...`;

  try {
    const res = await api.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    });

    showToast(res.message || 'Lien de réinitialisation envoyé avec succès !', 'success');
    
    if (res.simulated && res.resetUrl) {
      console.log('Password Reset Link:', res.resetUrl);
    }

    switchAuthTab('login');
  } catch (err) {
    showToast(`Erreur: ${err.message}`, 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> Envoyer le lien de réinitialisation`;
  }
}

// ============================================================================
// Password Reset Modal & Actions
// ============================================================================
function createResetPasswordModalContainer() {
  let modal = document.getElementById('reset-password-modal');
  if (!modal) {
    const div = document.createElement('div');
    div.className = 'modal-overlay';
    div.id = 'reset-password-modal';
    div.style.cssText = 'display:none; justify-content:center; align-items:center; z-index:3500;';
    div.innerHTML = `
      <div class="modal-container" style="width:480px; max-width:95%; padding:28px; animation: modalFadeIn 0.3s ease; position:relative;">
        <button class="modal-close" onclick="closeResetPasswordModal()" style="position:absolute; top:15px; right:15px; background:none; border:none; color:var(--text-muted); font-size:1.5rem; cursor:pointer;">&times;</button>
        <div id="reset-password-modal-content"></div>
      </div>
    `;
    document.body.appendChild(div);
    modal = div;
  }
  return modal;
}

function closeResetPasswordModal() {
  const modal = document.getElementById('reset-password-modal');
  if (modal) modal.style.display = 'none';
}

async function openResetPasswordModal(token) {
  const modal = createResetPasswordModalContainer();
  const content = document.getElementById('reset-password-modal-content');
  if (!content) return;

  content.innerHTML = `<div style="text-align:center; padding:40px;"><i class="fas fa-spinner fa-spin fa-2x" style="color:var(--primary);"></i><div style="margin-top:10px;">Vérification de votre lien sécurisé...</div></div>`;
  modal.style.display = 'flex';

  try {
    const data = await api.request(`/auth/verify-reset-token?token=${encodeURIComponent(token)}`);
    
    content.innerHTML = `
      <div style="text-align:center; margin-bottom:20px;">
        <img src="/logo_softmed.png" alt="SoftMed" style="width:64px; height:64px; border-radius:50%; object-fit:cover; margin:0 auto 10px; box-shadow:0 4px 12px rgba(0,0,0,0.1); border:2px solid #e2e8f0;" />
        <h3 style="color:var(--text-primary); font-size:1.35rem; margin:0 0 6px 0; font-weight:800;">Nouveau Mot de Passe</h3>
        <p style="font-size:0.85rem; color:var(--text-muted); margin:0;">
          Compte : <strong>${data.email}</strong> • ${data.tenant_name}
        </p>
      </div>

      <form onsubmit="handleResetPasswordSubmit(event, '${token}')">
        <div class="form-group" style="margin-bottom:14px;">
          <label class="form-label">Nouveau mot de passe *</label>
          <input type="password" class="form-control" id="reset-pass-new" placeholder="Au moins 6 caractères" minlength="6" required />
        </div>

        <div class="form-group" style="margin-bottom:20px;">
          <label class="form-label">Confirmer le nouveau mot de passe *</label>
          <input type="password" class="form-control" id="reset-pass-confirm" placeholder="Confirmez votre mot de passe" minlength="6" required />
        </div>

        <button type="submit" id="btn-submit-reset" class="btn btn-primary" style="width:100%; height:45px; font-weight:700;">
          <i class="fas fa-check-circle"></i> Valider mon nouveau mot de passe
        </button>
      </form>
    `;
  } catch (err) {
    content.innerHTML = `
      <div style="text-align:center; padding:20px 10px;">
        <div style="width:60px; height:60px; border-radius:50%; background:#fef2f2; color:#ef4444; display:flex; align-items:center; justify-content:center; margin:0 auto 15px; font-size:1.8rem; border:2px solid #fecaca;">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <h4 style="color:#1e293b; font-weight:800; margin-bottom:10px;">Lien Expiré ou Invalide</h4>
        <p style="color:var(--text-muted); font-size:0.9rem; line-height:1.6; margin-bottom:24px;">
          ${err.message || 'Ce lien de réinitialisation est invalide ou a dépassé sa durée de validité (1 heure).'}
        </p>
        <button class="btn btn-primary" onclick="closeResetPasswordModal(); openAuthModal('login'); switchAuthTab('forgot');" style="width:100%;">
          <i class="fas fa-redo"></i> Demander un nouveau lien
        </button>
      </div>
    `;
  }
}

async function handleResetPasswordSubmit(e, token) {
  e.preventDefault();
  const newPass = document.getElementById('reset-pass-new').value;
  const confirmPass = document.getElementById('reset-pass-confirm').value;
  const submitBtn = document.getElementById('btn-submit-reset');

  if (newPass !== confirmPass) {
    showToast('Les deux mots de passe ne correspondent pas', 'error');
    return;
  }

  if (newPass.length < 6) {
    showToast('Le mot de passe doit contenir au moins 6 caractères', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Mise à jour...`;

  try {
    const res = await api.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, new_password: newPass })
    });

    showToast(res.message || 'Mot de passe réinitialisé avec succès !', 'success');
    closeResetPasswordModal();

    // Clean URL query params
    window.history.replaceState({}, document.title, window.location.pathname);

    // Open login modal
    openAuthModal('login');
  } catch (err) {
    showToast(`Erreur: ${err.message}`, 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fas fa-check-circle"></i> Valider mon nouveau mot de passe`;
  }
}

// Build shell and sidebar menus
function renderAppLayout() {
  const root = document.getElementById('app-root');
  
  root.innerHTML = `
    <div class="app-container">
      <!-- Sidebar Panel -->
      <aside class="sidebar">
        <div class="sidebar-brand" style="display:flex; align-items:center; gap:10px; padding:18px 16px;">
          <img src="/logo_softmed.png" alt="SoftMed Logo" style="height:38px; width:38px; border-radius:50%; object-fit:cover; background:white; padding:2px; box-shadow:0 2px 6px rgba(0,0,0,0.25);" />
          <div style="display:flex; flex-direction:column; line-height:1.15;">
            <span style="font-weight:800; font-size:1.25rem; color:#ffffff; letter-spacing:0.5px;">Soft<span style="color:#38bdf8;">Med</span></span>
            <span style="font-size:0.62rem; color:#94a3b8; text-transform:uppercase; letter-spacing:0.8px; font-weight:600;">Gestion Médicale</span>
          </div>
        </div>
        <ul class="sidebar-menu">
          <!-- 1. VUE GÉNÉRALE -->
          <div class="sidebar-section-header">
            <i class="fas fa-compass"></i> <span>Général</span>
          </div>
          <li class="menu-item active" data-tab="dashboard" onclick="navigate('dashboard')">
            <a class="menu-link"><i class="fas fa-chart-pie"></i> <span>${t('dashboard')}</span></a>
          </li>
          <li class="menu-item" data-tab="agenda" onclick="navigate('agenda')">
            <a class="menu-link"><i class="fas fa-calendar-alt"></i> <span>${t('agenda')}</span></a>
          </li>

          <!-- 2. PÔLE MÉDICAL & SOINS -->
          <div class="sidebar-section-header">
            <i class="fas fa-stethoscope"></i> <span>Médical & Soins</span>
          </div>
          <li class="menu-item" data-tab="patients" onclick="navigate('patients')">
            <a class="menu-link"><i class="fas fa-notes-medical"></i> <span>${t('patients')}</span></a>
          </li>
          <li class="menu-item" data-tab="hospital" onclick="navigate('hospital')">
            <a class="menu-link"><i class="fas fa-bed"></i> <span>${t('hospital')}</span></a>
          </li>
          <li class="menu-item" data-tab="structure" onclick="navigate('structure')">
            <a class="menu-link"><i class="fas fa-hospital-user"></i> <span>${t('structure')}</span></a>
          </li>

          <!-- 3. PÔLE ACCUEIL & FACTURATION -->
          <div class="sidebar-section-header">
            <i class="fas fa-file-invoice-dollar"></i> <span>Accueil & Facturation</span>
          </div>
          <li class="menu-item" data-tab="billing" onclick="navigate('billing')">
            <a class="menu-link"><i class="fas fa-wallet"></i> <span>${t('billing')}</span></a>
          </li>
          <li class="menu-item" data-tab="insurances" onclick="navigate('insurances')">
            <a class="menu-link"><i class="fas fa-shield-alt"></i> <span>${t('insurances')}</span></a>
          </li>

          <!-- 4. PÔLE PHARMACIE & LOGISTIQUE -->
          <div class="sidebar-section-header">
            <i class="fas fa-pills"></i> <span>Pharmacie & Stocks</span>
          </div>
          <li class="menu-item" data-tab="inventory" onclick="navigate('inventory')">
            <a class="menu-link"><i class="fas fa-box"></i> <span>${t('inventory')}</span></a>
          </li>

          <!-- 5. ADMINISTRATION CLINIQUE -->
          <div class="sidebar-section-header">
            <i class="fas fa-cogs"></i> <span>Administration</span>
          </div>
          <li class="menu-item" data-tab="users" onclick="navigate('users')">
            <a class="menu-link"><i class="fas fa-users-cog"></i> <span>${t('users')}</span></a>
          </li>
          <li class="menu-item" data-tab="settings" onclick="navigate('settings')">
            <a class="menu-link"><i class="fas fa-sliders-h"></i> <span>${t('settings')}</span></a>
          </li>

          <!-- 6. SUPER-ADMINISTRATION SAAS -->
          ${(state.user.role === 'SUPER_ADMIN_SAAS' || state.user.email === 'mbndiaye@gmail.com') ? `
            <div class="sidebar-section-header" style="color:#f59e0b;">
              <i class="fas fa-crown"></i> <span>Super-Admin SaaS</span>
            </div>
            <li class="menu-item" data-tab="tenants" onclick="navigate('tenants')">
              <a class="menu-link" style="color:#fbbf24;"><i class="fas fa-hospital-user"></i> <span>${t('tenants')}</span></a>
            </li>
          ` : ''}
        </ul>
        <div class="sidebar-user">
          <div class="avatar">${state.user.first_name[0]}${state.user.last_name[0]}</div>
          <div class="user-info">
            <div class="user-name">${state.user.first_name} ${state.user.last_name}</div>
            <div class="user-role">${state.user.role === 'SUPER_ADMIN_SAAS' || state.user.email === 'mbndiaye@gmail.com' ? 'Super-Admin SaaS' : (['SUPER_ADMIN', 'TENANT_ADMIN', 'ADMIN'].includes(state.user.role) ? 'Admin Clinique' : (state.user.role === 'READONLY' ? 'Consultation Seule' : state.user.role))}</div>
          </div>
          <div class="btn-logout" onclick="logout()"><i class="fas fa-power-off"></i></div>
        </div>
      </aside>

      <!-- Main workspace panel -->
      <main class="main-content">
        <header class="header">
          <div class="header-title" id="header-page-title">${t('dashboard')}</div>
          <div class="header-actions" style="display:flex; align-items:center; gap:10px;">
            <!-- AI Clinical Voice Copilot Global Launcher -->
            <button class="btn btn-primary btn-sm" onclick="openAICopilotModal()" style="display:flex; align-items:center; gap:8px; background:linear-gradient(135deg, #1e40af, #3b82f6); border:none; font-weight:700; padding:7px 14px; border-radius:8px; box-shadow:0 2px 6px rgba(37,99,235,0.25); cursor:pointer;" title="Ouvrir l'Assistant Vocal & Copilote Médical IA">
              <i class="fas fa-robot"></i> <i class="fas fa-microphone"></i> <span>Copilote IA Vocal</span>
            </button>

            ${(state.user.role === 'SUPER_ADMIN_SAAS' || state.user.email === 'mbndiaye@gmail.com') ? `
              <div style="display:flex; align-items:center; gap:8px; background:rgba(37,99,235,0.08); border:1px solid rgba(37,99,235,0.25); padding:4px 10px; border-radius:8px;">
                <span style="font-size:0.8rem; font-weight:700; color:#1e40af;"><i class="fas fa-exchange-alt"></i> Clinique active :</span>
                <select id="header-clinic-switcher" onchange="switchSuperAdminClinic(this.value)" style="font-size:0.82rem; font-weight:600; padding:4px 8px; border:1px solid #bfdbfe; border-radius:6px; background:#fff; color:#1e293b; cursor:pointer;">
                  <option value="${state.tenant?.id || ''}">🏥 ${state.tenant?.name || 'Clinique active'} (${state.tenant?.slug || ''})</option>
                </select>
              </div>
            ` : `
              <div style="font-size:0.85rem; color:var(--text-muted);">
                <i class="fas fa-clinic-medical"></i> ${state.tenant?.name || 'Clinique'} (Slug: <strong>${state.tenant?.slug || ''}</strong>)
              </div>
            `}
          </div>
        </header>
        
        <div class="content-body" id="content-body">
          <!-- Dynamically populated by tabs -->
        </div>
      </main>
    </div>

    <!-- Modals declarations -->
    
    <!-- 1. Dossier Médical 360° (DPI Modal) -->
    <div class="modal-overlay" id="dpi-modal" style="display:none; z-index:1100;">
      <div class="modal-container" style="width:950px; max-width:96%; max-height:92vh; overflow-y:auto;">
        <div class="modal-header" style="border-bottom:none; padding-bottom:0; display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
            <h4 class="modal-title" style="display:flex; align-items:center; gap:8px; margin:0;">
              <i class="fas fa-folder-open" style="color:var(--primary);"></i> Dossier Médical Partagé (DPI 360°)
            </h4>
            <button type="button" class="btn btn-primary btn-sm" onclick="openAICopilotModal()" style="display:inline-flex; align-items:center; gap:7px; background:linear-gradient(135deg, #1d4ed8, #2563eb); color:#ffffff; border:none; font-weight:700; font-size:0.85rem; padding:6px 14px; border-radius:20px; box-shadow:0 2px 8px rgba(37,99,235,0.35); cursor:pointer;">
              <i class="fas fa-robot"></i> <i class="fas fa-microphone"></i> <span>Interroger ce dossier (IA)</span>
            </button>
          </div>
          <button class="modal-close" onclick="closeDPIModal()">&times;</button>
        </div>
        <div id="dpi-modal-content" style="margin-top:15px;">
          <!-- Dynamically populated -->
        </div>
      </div>
    </div>

    <!-- 1b. Nouvelle Consultation & Prescription Form Modal -->
    <div class="modal-overlay" id="dpi-consultation-form-modal" style="display:none; z-index:1100;">
      <div class="modal-container" style="width:750px; max-width:95%; max-height:90vh; overflow-y:auto;">
        <div class="modal-header">
          <h4 class="modal-title"><span id="dpi-consult-modal-title">Nouvelle Consultation</span> - <span id="dpi-consult-patient-name"></span></h4>
          <button class="modal-close" onclick="closeNewConsultationModal()">&times;</button>
        </div>

        <!-- Dictée Vocale Intelligente Banner -->
        <div style="background:rgba(37,99,235,0.06); border:1px solid rgba(37,99,235,0.25); border-radius:10px; padding:10px 14px; margin-bottom:15px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div style="font-size:0.85rem; color:#1e40af; display:flex; align-items:center; gap:8px;">
            <i class="fas fa-magic"></i>
            <span><strong>Dictée Vocale Intelligente :</strong> Parlez, l'IA remplit motif, diagnostic et ordonnance.</span>
          </div>
          <button type="button" id="btn-dictate-consult" class="btn btn-primary btn-sm" onclick="toggleConsultationDictation()" style="font-size:0.8rem; font-weight:700; display:flex; align-items:center; gap:6px;">
            <i class="fas fa-microphone" id="dictate-icon"></i> <span id="dictate-btn-text">Démarrer Dictée</span>
          </button>
        </div>

        <form onsubmit="submitConsultation(event)">
          <input type="hidden" id="dpi-consult-id" value="" />

          <!-- Doctor Prescriber & Active Specialty Selector -->
          <div style="display:grid; grid-template-columns:1.5fr 1fr; gap:15px; margin-bottom:15px; background:var(--bg-light); padding:12px; border-radius:8px; border:1px solid var(--border-color);">
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label" style="font-weight:700;"><i class="fas fa-user-md text-primary"></i> Médecin / Praticien Prescripteur *</label>
              <select class="form-control" id="dpi-practitioner-select" onchange="onConsultationPractitionerChange()" required>
                <!-- Dynamically populated -->
              </select>
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label" style="font-weight:700;"><i class="fas fa-stethoscope text-primary"></i> Spécialité Active</label>
              <div id="dpi-practitioner-spec-badge" style="padding:7px 10px; background:rgba(37,99,235,0.08); border:1px solid rgba(37,99,235,0.2); border-radius:6px; font-weight:700; color:var(--primary); font-size:0.85rem; display:flex; align-items:center; gap:6px;">
                <i class="fas fa-award"></i> <span id="dpi-active-spec-name">Médecine Générale</span>
              </div>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
            <div class="form-group">
              <label class="form-label">${t('reason')} *</label>
              <input type="text" class="form-control" id="dpi-reason" required placeholder="ex: Céphalées fébriles, Bilan HTA..." />
            </div>
            <div class="form-group">
              <label class="form-label">${t('diagnosis')} *</label>
              <input type="text" class="form-control" id="dpi-diagnosis" required placeholder="ex: Accès palustre simple, HTA Grade II..." />
            </div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:15px; margin-bottom:15px;">
            <div class="form-group">
              <label class="form-label">Tension Systolique (mmHg)</label>
              <input type="number" class="form-control" id="dpi-bp-sys" placeholder="120" />
            </div>
            <div class="form-group">
              <label class="form-label">Tension Diastolique (mmHg)</label>
              <input type="number" class="form-control" id="dpi-bp-dia" placeholder="80" />
            </div>
            <div class="form-group">
              <label class="form-label">Température (°C)</label>
              <input type="number" step="0.1" class="form-control" id="dpi-temp" placeholder="37.0" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">${t('icd10')} (Codes CIM-10)</label>
            <input type="text" class="form-control" id="dpi-icd10" placeholder="I10, B54, R50.9, R51" />
          </div>
          <div class="form-group">
            <label class="form-label">${t('confidentialNotes')}</label>
            <textarea class="form-control" id="dpi-confidential" rows="2" placeholder="Saisie confidentielle médicale..."></textarea>
          </div>
          
          <div class="card" style="margin-top:15px; padding:15px; border:1px solid var(--border-color); background:var(--bg-surface);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
              <h5 style="margin:0; color:var(--text-primary); font-weight:700; display:flex; align-items:center; gap:8px;">
                <i class="fas fa-file-prescription text-primary"></i> ${t('prescribe')} (Ordonnance Sécurisée)
              </h5>
              <span id="rx-specialty-filter-notice" style="font-size:0.75rem; font-weight:600; padding:4px 9px; border-radius:12px; background:rgba(16,185,129,0.12); color:var(--success);">
                <i class="fas fa-filter"></i> Filtré : Spécialité + Médicaments généraux
              </span>
            </div>
            
            <div style="display:grid; grid-template-columns:2.5fr 1.2fr 1fr 0.8fr; gap:10px; margin-bottom:10px;">
              <div>
                <input type="text" class="form-control" id="rx-drug" list="rx-medications-datalist" placeholder="Médicament (tapez ou choisissez...)" oninput="onRxDrugInput(this.value)" autocomplete="off" />
                <datalist id="rx-medications-datalist"></datalist>
              </div>
              <input type="text" class="form-control" id="rx-dosage" placeholder="Posologie / Dosage" />
              <input type="text" class="form-control" id="rx-frequency" placeholder="Fréquence (ex: 2x/j)" />
              <input type="number" class="form-control" id="rx-duration" value="5" min="1" placeholder="Jours" />
            </div>
            
            <div style="display:flex; gap:10px; margin-bottom:10px;">
              <input type="text" class="form-control" id="rx-instructions" placeholder="Instructions particulières (ex: Au cours du repas, le matin à jeun...)" style="flex:1;" />
              <button class="btn btn-secondary" type="button" onclick="addPrescriptionItem()"><i class="fas fa-plus"></i> ${t('addItem')}</button>
            </div>

            <!-- Quick medication suggestion pills -->
            <div id="rx-quick-pills-container" style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:12px;"></div>

            <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:10px; display:flex; align-items:center; gap:6px;">
              <i class="fas fa-magic text-primary"></i> <span>Tout médicament nouveau saisi ici est automatiquement enregistré et ajouté au catalogue de la clinique.</span>
            </div>

            <div id="rx-items-list"></div>
            <div class="form-group" style="margin-top:15px; margin-bottom:0;">
              <label class="form-label">${t('validity')}</label>
              <input type="date" class="form-control" id="dpi-rx-expiry" />
            </div>
          </div>
          
          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px;">
            <button class="btn btn-secondary" type="button" onclick="closeNewConsultationModal()">Annuler</button>
            <button class="btn btn-primary" type="submit">${t('saveConsult')}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 1c. Treatment Add/Edit Modal with Clinical Outcomes -->
    <div class="modal-overlay" id="treatment-modal" style="display:none; z-index:1100;">
      <div class="modal-container" style="width:650px; max-width:95%;">
        <div class="modal-header">
          <h4 class="modal-title" id="treatment-modal-title">Traitement Médical</h4>
          <button class="modal-close" onclick="closeTreatmentModal()">&times;</button>
        </div>
        <form onsubmit="saveTreatmentForm(event)">
          <input type="hidden" id="treatment-form-id" value="" />
          <input type="hidden" id="treatment-patient-id" value="" />
          <div class="form-group">
            <label class="form-label">Nom du Traitement / Protocole *</label>
            <input type="text" class="form-control" id="treatment-name" required placeholder="ex: Antibiothérapie Amoxicilline 1g, Protocole CTA..." />
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
            <div class="form-group">
              <label class="form-label">Type de Traitement</label>
              <select class="form-control" id="treatment-type">
                <option value="Médicamenteux">Médicamenteux</option>
                <option value="Chirurgical">Chirurgical</option>
                <option value="Soins infirmiers">Soins infirmiers / Pansement</option>
                <option value="Rééducation">Kinésithérapie / Rééducation</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Statut du Traitement</label>
              <select class="form-control" id="treatment-status">
                <option value="EN_COURS">En cours</option>
                <option value="TERMINE">Terminé</option>
                <option value="INTERROMPU">Interrompu</option>
              </select>
            </div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
            <div class="form-group">
              <label class="form-label">Date Début *</label>
              <input type="date" class="form-control" id="treatment-start-date" required />
            </div>
            <div class="form-group">
              <label class="form-label">Date Fin</label>
              <input type="date" class="form-control" id="treatment-end-date" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Posologie & Instructions</label>
            <textarea class="form-control" id="treatment-dosage" rows="2" placeholder="ex: 1 comprimé matin et soir pendant 7 jours..."></textarea>
          </div>
          <div class="form-group" style="background:rgba(46, 204, 113, 0.08); padding:12px; border-radius:6px; border:1px solid rgba(46, 204, 113, 0.3);">
            <label class="form-label" style="color:var(--success); font-weight:700;">
              <i class="fas fa-poll-h"></i> Résultats Cliniques Obtenus & Évolution
            </label>
            <textarea class="form-control" id="treatment-results" rows="3" placeholder="Consignez l'évolution, l'efficacité, les réactions du patient, disparition des symptômes, résultats de contrôle..."></textarea>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px;">
            <button class="btn btn-secondary" type="button" onclick="closeTreatmentModal()">Annuler</button>
            <button class="btn btn-primary" type="submit">Enregistrer le Traitement</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 1d. Lab Order Prescription Modal -->
    <div class="modal-overlay" id="lab-order-modal" style="display:none; z-index:1100;">
      <div class="modal-container" style="width:650px; max-width:95%; max-height:90vh; overflow-y:auto;">
        <div class="modal-header">
          <h4 class="modal-title" id="lab-order-modal-title"><i class="fas fa-microscope" style="color:var(--primary);"></i> Prescrire un Examen / Analyse Médicale</h4>
          <button class="modal-close" onclick="closeLabOrderModal()">&times;</button>
        </div>
        <form onsubmit="saveLabOrderForm(event)">
          <input type="hidden" id="lab-order-patient-id" value="" />
          <div class="form-group">
            <label class="form-label">Désignation de l'Examen / Bilan *</label>
            <input type="text" class="form-control" id="lab-order-test-name" required placeholder="ex: Numération Formule Sanguine (NFS), Glycémie à jeun, Radiographie Thorax, Échographie..." />
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
            <div class="form-group">
              <label class="form-label">Catégorie</label>
              <select class="form-control" id="lab-order-category">
                <option value="Biologie">Biologie médicale</option>
                <option value="Hématologie">Hématologie</option>
                <option value="Biochimie">Biochimie</option>
                <option value="Imagerie">Radiologie / Imagerie</option>
                <option value="Microbiologie">Bactériologie / Parasitologie</option>
                <option value="Cardiologie">Cardiologie (ECG, Echo)</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Priorité</label>
              <select class="form-control" id="lab-order-priority">
                <option value="NORMALE">Normale</option>
                <option value="URGENTE">Urgente (Urgence)</option>
                <option value="CONTROLE">Bilan de contrôle</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Renseignements Cliniques / Justification</label>
            <textarea class="form-control" id="lab-order-notes" rows="2" placeholder="Précisez le contexte clinique, suspicion diagnostique..."></textarea>
          </div>

          <!-- Direct Scan / Document Attachment Zone -->
          <div id="lab-order-scan-zone" class="form-group" style="background:var(--bg-surface); padding:12px; border-radius:8px; border:1px solid var(--border-color);">
            <label class="form-label" style="display:flex; justify-content:space-between; align-items:center;">
              <span><i class="fas fa-paperclip"></i> Joindre un Scan / Rapport d'analyse (facultatif)</span>
              <span style="font-size:0.75rem; color:var(--text-muted);">PDF ou Photo (max 25 Mo)</span>
            </label>
            <div style="display:flex; gap:8px; align-items:center;">
              <input type="text" class="form-control" id="lab-order-doc-url" placeholder="URL ou téléversez un fichier ci-contre..." style="flex:1;" />
              <input type="file" id="lab-order-file" style="display:none;" accept="image/*,.pdf" onchange="uploadMedicalDocument(this, 'lab-order-doc-url', 'lab-order-preview-box')" />
              <input type="file" id="lab-order-camera" style="display:none;" accept="image/*" capture="environment" onchange="uploadMedicalDocument(this, 'lab-order-doc-url', 'lab-order-preview-box')" />
              <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('lab-order-file').click()" title="Choisir un fichier (PDF ou Scan)"><i class="fas fa-file-upload"></i> Fichier</button>
              <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('lab-order-camera').click()" title="Prendre en photo avec l'appareil"><i class="fas fa-camera"></i> Photo</button>
            </div>
            <div id="lab-order-preview-box" style="display:none; margin-top:8px;"></div>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px;">
            <button class="btn btn-secondary" type="button" onclick="closeLabOrderModal()">Annuler</button>
            <button class="btn btn-primary" type="submit">Valider la Prescription</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 1e. Lab Results Recording Modal -->
    <div class="modal-overlay" id="lab-result-modal" style="display:none; z-index:1100;">
      <div class="modal-container" style="width:700px; max-width:95%; max-height:92vh; overflow-y:auto;">
        <div class="modal-header">
          <h4 class="modal-title"><i class="fas fa-vial" style="color:var(--primary);"></i> Consigner Résultats : <span id="lab-result-test-title"></span></h4>
          <button class="modal-close" onclick="closeLabResultModal()">&times;</button>
        </div>
        <form onsubmit="saveLabResultForm(event)">
          <input type="hidden" id="lab-result-id" value="" />
          <input type="hidden" id="lab-result-patient-id" value="" />
          <div class="form-group">
            <label class="form-label">Statut de l'Analyse</label>
            <select class="form-control" id="lab-result-status">
              <option value="TERMINE">Terminé (Résultats disponibles)</option>
              <option value="EN_COURS">En cours d'analyse</option>
              <option value="A_FAIRE">À faire</option>
            </select>
          </div>
          
          <!-- Dedicated Scanner / PDF Upload Zone -->
          <div class="form-group" style="background:rgba(37,99,235,0.04); border:1.5px dashed #3b82f6; border-radius:10px; padding:15px; margin-bottom:15px;">
            <label class="form-label" style="font-weight:700; color:#1e40af; display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
              <span><i class="fas fa-scanner-image"></i> Scanner / Téléverser le Compte-rendu (PDF ou Scan Photo)</span>
              <span style="font-size:0.75rem; font-weight:normal; color:#2563eb;">Sauvegardé en ligne pour consultation future</span>
            </label>
            
            <div style="display:flex; gap:8px; margin-bottom:6px;">
              <input type="text" class="form-control" id="lab-result-doc-url" placeholder="URL ou sélectionnez un scan ci-contre..." style="flex:1;" />
              <input type="file" id="lab-result-file" style="display:none;" accept="image/*,.pdf" onchange="uploadMedicalDocument(this, 'lab-result-doc-url', 'lab-result-preview-box')" />
              <input type="file" id="lab-result-camera" style="display:none;" accept="image/*" capture="environment" onchange="uploadMedicalDocument(this, 'lab-result-doc-url', 'lab-result-preview-box')" />
              <button type="button" class="btn btn-primary btn-sm" onclick="document.getElementById('lab-result-file').click()" style="padding:6px 12px; font-weight:600;"><i class="fas fa-file-upload"></i> Uploader Fichier/PDF</button>
              <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('lab-result-camera').click()" title="Prendre une photo du document papier avec le smartphone ou webcam"><i class="fas fa-camera"></i> Photo</button>
            </div>
            
            <div id="lab-result-preview-box" style="display:none; margin-top:8px;"></div>
          </div>

          <div class="form-group">
            <label class="form-label">Valeurs Numériques / Compte-rendu d'Analyse (texte)</label>
            <textarea class="form-control" id="lab-result-text" rows="4" placeholder="ex: GB: 6 500 /mm3, Hb: 13.8 g/dL, Plaquettes: 240 000 /mm3. Conclusion: Formule dans les limites de la normale."></textarea>
          </div>
          
          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px;">
            <button class="btn btn-secondary" type="button" onclick="closeLabResultModal()">Annuler</button>
            <button class="btn btn-primary" type="submit">Enregistrer les Résultats</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 1f. Patient Statuses Configuration Modal -->
    <div class="modal-overlay" id="patient-status-modal" style="display:none; z-index:1100;">
      <div class="modal-container" style="width:600px; max-width:95%;">
        <div class="modal-header">
          <h4 class="modal-title"><i class="fas fa-tags"></i> Gestion des Statuts Patients</h4>
          <button class="modal-close" onclick="closePatientStatusModal()">&times;</button>
        </div>
        <div>
          <form onsubmit="savePatientStatus(event)" style="background:var(--bg-primary); padding:15px; border-radius:8px; border:1px solid var(--border-color); margin-bottom:20px;">
            <h5 style="margin:0 0 10px 0; color:var(--text-primary);">Ajouter un nouveau statut</h5>
            <div style="display:grid; grid-template-columns:2fr 1fr 1fr; gap:10px; align-items:flex-end;">
              <div class="form-group" style="margin:0;">
                <label class="form-label">Libellé du Statut *</label>
                <input type="text" class="form-control" id="status-name" placeholder="ex: Soins Intensifs" required />
              </div>
              <div class="form-group" style="margin:0;">
                <label class="form-label">Couleur</label>
                <input type="color" class="form-control" id="status-color" value="#3498db" style="height:38px; padding:2px;" />
              </div>
              <div class="form-group" style="margin:0; display:flex; align-items:center; height:38px;">
                <label style="display:flex; align-items:center; gap:6px; font-size:0.8rem; cursor:pointer; color:var(--text-primary);">
                  <input type="checkbox" id="status-is-default" /> Par défaut
                </label>
              </div>
            </div>
            <button class="btn btn-primary btn-sm" type="submit" style="margin-top:10px; width:100%;">
              <i class="fas fa-plus"></i> Ajouter ce statut
            </button>
          </form>

          <h5 style="margin:0 0 10px 0; color:var(--text-primary);">Statuts Actifs</h5>
          <div id="patient-status-list"></div>
        </div>
      </div>
    </div>

    <!-- 2. Prescription verification details popup -->
    <div class="modal-overlay" id="rx-confirmation-modal" style="display:none;">
      <div class="modal-container" style="text-align:center;">
        <div class="modal-header">
          <h4 class="modal-title">Ordonnance Émise avec Succès</h4>
          <button class="modal-close" onclick="closeRxConfirmModal()">&times;</button>
        </div>
        <div class="qr-placeholder" style="background-color:#fff; color:#000; font-size:0.7rem; padding:15px; display:flex; flex-direction:column; justify-content:center;">
          <i class="fas fa-qrcode fa-4x" style="color:var(--primary); margin-bottom:10px;"></i>
          <strong>Vérification QR Active</strong>
        </div>
        <div style="font-size:0.85rem; text-align:left; line-height:1.6; background-color:var(--bg-surface); padding:15px; border-radius:10px; margin-bottom:20px;">
          <div>${t('rxCode')}: <strong id="conf-rx-code" style="color:white;"></strong></div>
          <div style="word-break:break-all;">${t('rxHash')}: <code id="conf-rx-hash" style="font-size:0.75rem;"></code></div>
        </div>
        <div class="qr-url-text" style="margin-bottom:20px;">
          <a id="conf-rx-url" href="" target="_blank" style="color:var(--primary); text-decoration:none;"></a>
        </div>
        <button class="btn btn-primary" onclick="closeRxConfirmModal()" style="width:100%;">Fermer</button>
      </div>
    </div>

    <!-- 2b. Printable Prescription Sheet Modal (A4/A5 Medical Format) -->
    <div class="modal-overlay" id="prescription-print-modal" style="display:none; justify-content:center; align-items:center; z-index:3000;">
      <div class="modal-container" style="width:840px; max-width:96%; max-height:92vh; overflow-y:auto; padding:20px; animation: modalFadeIn 0.3s ease;">
        <div id="prescription-print-body">
          <!-- Dynamically populated by renderPrescriptionPrintModalContent -->
        </div>
      </div>
    </div>

    <!-- 2c. Printable Invoices Modal -->
    <div class="modal-overlay" id="invoice-print-modal" style="display:none; justify-content:center; align-items:center; z-index:3000;">
      <div class="modal-container" style="width:840px; max-width:96%; max-height:92vh; overflow-y:auto; padding:20px; animation: modalFadeIn 0.3s ease;">
        <div id="invoice-print-content">
          <!-- Dynamically populated by renderInvoicePrintModalContent -->
        </div>
      </div>
    </div>

    <!-- 2d. Document & Medical Scan In-App Full Viewer Modal -->
    <div class="modal-overlay" id="document-viewer-modal" style="display:none; justify-content:center; align-items:center; z-index:3500;">
      <div class="modal-container" style="width:960px; max-width:96%; max-height:92vh; display:flex; flex-direction:column; padding:20px; animation: modalFadeIn 0.3s ease;">
        <div class="modal-header" style="border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:36px; height:36px; border-radius:8px; background:#eff6ff; color:#2563eb; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
              <i class="fas fa-file-medical-alt"></i>
            </div>
            <div>
              <h4 class="modal-title" id="doc-viewer-title" style="margin:0; font-size:1.05rem; font-weight:700;">Document Médical / Scan d'Analyse</h4>
              <div style="font-size:0.75rem; color:var(--text-muted);">Consultation sécurisée du document patient</div>
            </div>
          </div>
          <div style="display:flex; gap:8px; align-items:center;">
            <a id="doc-viewer-external-btn" href="" target="_blank" class="btn btn-secondary btn-sm" style="font-size:0.8rem; padding:6px 12px;">
              <i class="fas fa-external-link-alt"></i> Nouvel Onglet
            </a>
            <a id="doc-viewer-download-btn" href="" download class="btn btn-primary btn-sm" style="font-size:0.8rem; padding:6px 14px;">
              <i class="fas fa-download"></i> Télécharger
            </a>
            <button class="modal-close" onclick="closeDocumentViewerModal()">&times;</button>
          </div>
        </div>
        <div id="doc-viewer-content" style="flex:1; overflow-y:auto; min-height:400px; display:flex; justify-content:center; align-items:center; background:rgba(0,0,0,0.03); border-radius:8px; padding:10px;">
          <!-- Populated dynamically -->
        </div>
      </div>
    </div>

    <!-- 2e. Invoice & Attached Medical Justifications Email Modal -->
    <div class="modal-overlay" id="invoice-email-modal" style="display:none; justify-content:center; align-items:center; z-index:3200;">
      <div class="modal-container" style="width:820px; max-width:96%; max-height:92vh; overflow-y:auto; padding:22px; animation: modalFadeIn 0.3s ease;">
        <div id="invoice-email-content">
          <!-- Dynamically populated by renderInvoiceEmailModalContent -->
        </div>
      </div>
    </div>

    <!-- 3. Billing Payment Dialog Modal -->
    <div class="modal-overlay" id="payment-modal" style="display:none;">
      <div class="modal-container">
        <div class="modal-header">
          <h4 class="modal-title" id="pay-modal-title">Enregistrer un Règlement</h4>
          <button class="modal-close" onclick="closePaymentModal()">&times;</button>
        </div>
        <form onsubmit="processPayment(event)">
          <div class="form-group">
            <label class="form-label">Montant à régler (FCFA)</label>
            <input type="number" class="form-control" id="pay-amount" required readonly />
          </div>
          <div class="form-group">
            <label class="form-label">${t('payMethod')}</label>
            <select class="form-control" id="pay-method-select" onchange="onPaymentMethodChange()" required>
              <!-- Populated dynamically -->
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">${t('ref')}</label>
            <input type="text" class="form-control" id="pay-ref" placeholder="n° de transaction Wave/OM ou chèque" />
          </div>
          
          <!-- Online payment checkout simulator panel -->
          <div id="payment-simulation-box" style="display:none; margin-bottom:20px;">
            <div id="sim-checkout-details">
              <!-- Dynamically populated when checkout initializes -->
              <button class="btn btn-secondary" type="button" style="width:100%;" disabled>
                <i class="fas fa-sync fa-spin"></i> Initialisation de la transaction en ligne...
              </button>
            </div>
          </div>
          
          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px;">
            <button class="btn btn-secondary" type="button" onclick="closePaymentModal()">Annuler</button>
            <button class="btn btn-primary" type="submit">Confirmer le Règlement</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 4. Restock Lot Modal -->
    <div class="modal-overlay" id="restock-modal" style="display:none;">
      <div class="modal-container">
        <div class="modal-header">
          <h4 class="modal-title" id="restock-modal-title">Approvisionner Lot</h4>
          <button class="modal-close" onclick="closeRestockModal()">&times;</button>
        </div>
        <form onsubmit="submitRestock(event)">
          <div class="form-group">
            <label class="form-label">${t('lotNum')}</label>
            <input type="text" class="form-control" id="restock-lot-num" placeholder="LOT-2026-003" required />
          </div>
          <div class="form-group">
            <label class="form-label">${t('expiry')}</label>
            <input type="date" class="form-control" id="restock-expiry" required />
          </div>
          <div class="form-group">
            <label class="form-label">Quantité Reçue</label>
            <input type="number" class="form-control" id="restock-qty" placeholder="100" required />
          </div>
          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px;">
            <button class="btn btn-secondary" type="button" onclick="closeRestockModal()">Annuler</button>
            <button class="btn btn-primary" type="submit">Entrée Stock</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 4b. Edit Stock Item Modal -->
    <div class="modal-overlay" id="edit-stock-modal" style="display:none; justify-content:center; align-items:center; z-index:3000;">
      <div class="modal-container" style="width:580px; max-width:95%; max-height:90vh; overflow-y:auto; position:relative; animation: modalFadeIn 0.3s ease;">
        <div class="modal-header">
          <h4 class="modal-title" id="edit-stock-modal-title" style="display:flex; align-items:center; gap:8px;">
            <i class="fas fa-edit text-primary"></i> Modifier le Médicament / Article
          </h4>
          <button class="modal-close" onclick="closeEditStockModal()">&times;</button>
        </div>
        <form id="edit-stock-form" onsubmit="submitEditStock(event)">
          <input type="hidden" id="edit-st-id" />
          <div class="form-group">
            <label class="form-label">SKU (Code Unique) *</label>
            <input type="text" class="form-control" id="edit-st-sku" placeholder="ex: PARACETAMOL-1G" required />
          </div>
          <div class="form-group">
            <label class="form-label">Désignation Produit *</label>
            <input type="text" class="form-control" id="edit-st-name" placeholder="ex: Paracétamol 1g" required />
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
            <div class="form-group">
              <label class="form-label">Catégorie *</label>
              <select class="form-control" id="edit-st-category" required>
                <option value="MEDICATION">Médicament (MEDICATION)</option>
                <option value="CONSUMABLE">Matériel Clinique (CONSUMABLE)</option>
                <option value="SURGICAL">Chirurgical (SURGICAL)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Spécialité Cible *</label>
              <select class="form-control" id="edit-st-specialty" required>
                <option value="GENERAL">💊 Tous / Médecine Générale (Commun)</option>
                <option value="CARDIO">❤️ Cardiologie & Vasculaire</option>
                <option value="PED">👶 Pédiatrie & Néonatalogie</option>
                <option value="GYN-OBS">🤰 Gynécologie-Obstétrique</option>
                <option value="DERMA">🧴 Dermatologie</option>
                <option value="OPHTA">👁️ Ophtalmologie</option>
                <option value="GASTRO">🫁 Gastro-entérologie</option>
                <option value="ORL">👂 Oto-Rhino-Laryngologie (ORL)</option>
                <option value="NEURO">🧠 Neurologie & Psychiatrie</option>
                <option value="TRAUMA-ORTHO">🦴 Traumatologie & Orthopédie</option>
                <option value="CHIR-GEN">✂️ Chirurgie Générale</option>
              </select>
            </div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
            <div class="form-group">
              <label class="form-label">Posologie usuelle / Dosage</label>
              <input type="text" class="form-control" id="edit-st-dosage" placeholder="ex: 1 cp matin et soir" />
            </div>
            <div class="form-group">
              <label class="form-label">Unité *</label>
              <input type="text" class="form-control" id="edit-st-unit" placeholder="ex: BOITE, PLAQUETTE, FLACON" required />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Seuil d'Alerte Minimum *</label>
            <input type="number" class="form-control" id="edit-st-threshold" min="0" required />
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
            <div class="form-group">
              <label class="form-label">Prix d'achat unitaire (XOF) *</label>
              <input type="number" class="form-control" id="edit-st-cost" min="0" step="any" required />
            </div>
            <div class="form-group">
              <label class="form-label">Prix de vente unitaire (XOF) *</label>
              <input type="number" class="form-control" id="edit-st-selling" min="0" step="any" required />
            </div>
          </div>
          <div class="form-group" style="margin-top:10px; background:var(--bg-light); padding:12px; border-radius:8px; border:1px solid var(--border-color);">
            <label style="display:flex; align-items:center; gap:10px; cursor:pointer; font-weight:600; margin:0;">
              <input type="checkbox" id="edit-st-active" style="width:18px; height:18px; accent-color:var(--primary);" />
              <span>Article Actif (décocher pour archiver / masquer des sélections courantes)</span>
            </label>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px;">
            <button class="btn btn-danger" type="button" id="edit-st-delete-btn" style="background-color:rgba(239,68,68,0.1); color:var(--danger); border:1px solid rgba(239,68,68,0.3);">
              <i class="fas fa-trash-alt"></i> Supprimer
            </button>
            <div style="display:flex; gap:10px;">
              <button class="btn btn-secondary" type="button" onclick="closeEditStockModal()">Annuler</button>
              <button class="btn btn-primary" type="submit"><i class="fas fa-save"></i> Enregistrer les modifications</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- 5. Tenant Create/Edit Modal -->
    <div class="modal-overlay" id="tenant-modal" style="display:none; justify-content:center; align-items:center;">
      <div class="modal-container" style="width:600px; max-width:95%; max-height:90vh; overflow-y:auto; position:relative; animation: modalFadeIn 0.3s ease;">
        <div class="modal-header">
          <h4 class="modal-title" id="tenant-modal-title">Enregistrer une Clinique</h4>
          <button class="modal-close" onclick="closeTenantModal()">&times;</button>
        </div>
        <form id="tenant-form" onsubmit="submitTenantForm(event)">
          <input type="hidden" id="tenant-form-id" />
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
            <div class="form-group">
              <label class="form-label">${t('tenantName')} *</label>
              <input type="text" class="form-control" id="tenant-name" required />
            </div>
            <div class="form-group">
              <label class="form-label">${t('tenantSlug')} *</label>
              <input type="text" class="form-control" id="tenant-slug" required />
            </div>
          </div>
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
            <div class="form-group">
              <label class="form-label">${t('tenantPhone')} *</label>
              <input type="text" class="form-control" id="tenant-phone" required />
            </div>
            <div class="form-group">
              <label class="form-label">${t('tenantNinea')}</label>
              <input type="text" class="form-control" id="tenant-ninea" />
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
            <div class="form-group">
              <label class="form-label">${t('tenantEmail')}</label>
              <input type="email" class="form-control" id="tenant-email" />
            </div>
            <div class="form-group">
              <label class="form-label">${t('tenantLogo')}</label>
              <div style="display:flex; gap:5px;">
                <input type="text" class="form-control" id="tenant-logo" placeholder="/logo-espoir.png" style="flex:1;" />
                <input type="file" id="tenant-logo-file" style="display:none;" accept="image/*" onchange="uploadImage(this, 'tenant-logo')" />
                <button type="button" class="btn btn-secondary" onclick="document.getElementById('tenant-logo-file').click()" style="padding:0 10px; height:38px;"><i class="fas fa-upload"></i></button>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Cachet / Tampon Officiel</label>
            <div style="display:flex; gap:5px;">
              <input type="text" class="form-control" id="tenant-stamp" placeholder="/stamp-default.png" style="flex:1;" />
              <input type="file" id="tenant-stamp-file" style="display:none;" accept="image/*" onchange="uploadImage(this, 'tenant-stamp')" />
              <button type="button" class="btn btn-secondary" onclick="document.getElementById('tenant-stamp-file').click()" style="padding:0 10px; height:38px;"><i class="fas fa-upload"></i></button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">${t('tenantAddress')}</label>
            <textarea class="form-control" id="tenant-address" rows="2"></textarea>
          </div>

          <div class="form-group" id="tenant-status-group" style="display:none; margin-bottom:15px;">
            <label class="form-label" style="display:flex; align-items:center; gap:8px; cursor:pointer;">
              <input type="checkbox" id="tenant-active" checked style="width:16px; height:16px;" /> ${t('tenantActive')}
            </label>
          </div>

          <!-- Section Administrateur initial (only shown when creating a new tenant) -->
          <div id="tenant-admin-section" style="border-top: 1px solid var(--border-color); padding-top: 15px; margin-top: 15px; margin-bottom:15px;">
            <h5 style="margin-bottom:15px; color:var(--text-primary); font-weight:600;"><i class="fas fa-user-shield"></i> ${t('adminUserCreation')}</h5>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
              <div class="form-group">
                <label class="form-label">${t('adminFirstName')} *</label>
                <input type="text" class="form-control" id="tenant-admin-first" />
              </div>
              <div class="form-group">
                <label class="form-label">${t('adminLastName')} *</label>
                <input type="text" class="form-control" id="tenant-admin-last" />
              </div>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
              <div class="form-group">
                <label class="form-label">${t('adminEmail')} *</label>
                <input type="email" class="form-control" id="tenant-admin-email" />
              </div>
              <div class="form-group">
                <label class="form-label">${t('adminPassword')} *</label>
                <input type="password" class="form-control" id="tenant-admin-password" />
              </div>
            </div>
          </div>
          
          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px;">
            <button class="btn btn-secondary" type="button" onclick="closeTenantModal()">${t('cancelBtn')}</button>
            <button class="btn btn-primary" type="submit" id="tenant-submit-btn">${t('saveBtn')}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 6. Printable Invoice & IPM Claim Document Modal -->
    <div class="modal-overlay" id="invoice-print-modal" style="display:none; z-index:1200; justify-content:center; align-items:center; background:rgba(0,0,0,0.75);">
      <div class="modal-container" style="width:850px; max-width:96%; max-height:92vh; overflow-y:auto; padding:20px; background:#e2e8f0;">
        <div id="invoice-print-content">
          <!-- Dynamically injected -->
        </div>
      </div>
    </div>

    <!-- 7. Insurance / IPM Create & Edit Modal -->
    <div class="modal-overlay" id="insurance-modal" style="display:none; justify-content:center; align-items:center; z-index:1150;">
      <div class="modal-container" style="width:550px; max-width:95%; animation: modalFadeIn 0.3s ease;">
        <div class="modal-header">
          <h4 class="modal-title" id="insurance-modal-title">Ajouter un Organisme IPM / Assurance</h4>
          <button class="modal-close" onclick="closeInsuranceModal()">&times;</button>
        </div>
        <form id="insurance-form" onsubmit="submitInsuranceForm(event)">
          <input type="hidden" id="insurance-form-id" />
          
          <div style="display:grid; grid-template-columns:2fr 1fr; gap:15px; margin-bottom:15px;">
            <div class="form-group">
              <label class="form-label">Nom de l'Organisme / Compagnie *</label>
              <input type="text" class="form-control" id="insurance-name" placeholder="ex: IPM SONATEL, AXA Sénégal" required />
            </div>
            <div class="form-group">
              <label class="form-label">Code / Sigle *</label>
              <input type="text" class="form-control" id="insurance-code" placeholder="ex: SONATEL" required />
            </div>
          </div>

          <div class="form-group" style="margin-bottom:15px;">
            <label class="form-label">Adresse Physique Complète</label>
            <input type="text" class="form-control" id="insurance-address" placeholder="ex: 64 Rue Félix Faure, Dakar" />
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
            <div class="form-group">
              <label class="form-label">Email de Contact / Facturation</label>
              <input type="email" class="form-control" id="insurance-email" placeholder="contact@ipm.sn" />
            </div>
            <div class="form-group">
              <label class="form-label">Téléphone</label>
              <input type="text" class="form-control" id="insurance-phone" placeholder="+221 33 800 00 00" />
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
            <div class="form-group">
              <label class="form-label">Délai de règlement conventionné (jours)</label>
              <input type="number" class="form-control" id="insurance-terms" value="30" min="1" max="180" required />
            </div>
            <div class="form-group" style="display:flex; align-items:center; margin-top:25px;">
              <label class="form-label" style="display:flex; align-items:center; gap:8px; cursor:pointer; margin:0;">
                <input type="checkbox" id="insurance-active" checked style="width:18px; height:18px;" />
                <span>Convention active</span>
              </label>
            </div>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px; border-top:1px solid var(--border-color); padding-top:15px;">
            <button class="btn btn-secondary" type="button" onclick="closeInsuranceModal()">Annuler</button>
            <button class="btn btn-primary" type="submit" id="insurance-submit-btn">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 7b. Edit Invoice Modal -->
    <div class="modal-overlay" id="edit-invoice-modal" style="display:none; justify-content:center; align-items:center; z-index:1150;">
      <div class="modal-container" style="width:740px; max-width:96%; max-height:94vh; overflow-y:auto; animation: modalFadeIn 0.3s ease;">
        <div class="modal-header" style="border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:15px; display:flex; justify-content:space-between; align-items:center;">
          <h4 class="modal-title" id="edit-invoice-modal-title" style="margin:0; font-size:1.15rem; font-weight:800; color:var(--text-primary);">
            <i class="fas fa-file-invoice-dollar" style="color:var(--primary);"></i> Modifier la Facture
          </h4>
          <button class="modal-close" onclick="closeEditInvoiceModal()">&times;</button>
        </div>
        <form id="edit-invoice-form" onsubmit="submitEditInvoiceForm(event)">
          <input type="hidden" id="edit-inv-id" />
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px;">
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label" style="font-weight:700;">Patient *</label>
              <select class="form-control" id="edit-inv-patient-id" required>
                <!-- Populated dynamically -->
              </select>
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label" style="font-weight:700;">Prise en charge / IPM</label>
              <select class="form-control" id="edit-inv-insurance-id" onchange="renderEditInvoiceLines()">
                <option value="">Privé (Pas de couverture)</option>
                <!-- Populated dynamically -->
              </select>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px;">
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label" style="font-weight:700;">Statut de la Facture</label>
              <select class="form-control" id="edit-inv-status">
                <option value="ISSUED">ÉMISE / EN ATTENTE</option>
                <option value="PARTIALLY_PAID">PARTIELLEMENT RÉGLÉE</option>
                <option value="PAID">RÉGLÉE / PAYÉE</option>
                <option value="OVERDUE">EN RETARD</option>
                <option value="CANCELED">ANNULÉE</option>
              </select>
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label" style="font-weight:700;">Remise Accordée (FCFA)</label>
              <input type="number" class="form-control" id="edit-inv-discount" value="0" min="0" oninput="renderEditInvoiceLines()" />
            </div>
          </div>

          <div style="border-top:1px solid var(--border-color); padding-top:15px; margin-top:15px;">
            <div style="font-size:0.9rem; font-weight:700; color:var(--text-primary); margin-bottom:10px;">
              <i class="fas fa-list-ul" style="color:var(--primary);"></i> Lignes de Facturation & Actes
            </div>

            <!-- Quick selection from catalogue for edit -->
            <div class="form-group" style="margin-bottom:10px; background:var(--bg-surface); padding:8px 10px; border-radius:6px; border:1px dashed var(--border-color);">
              <select class="form-control" id="edit-service-catalogue-select" onchange="applyEditServiceFromCatalogue(this)" style="font-size:0.85rem;">
                <option value="">-- Ajouter un acte depuis le catalogue / praticien --</option>
              </select>
            </div>

            <div style="display:flex; gap:10px; margin-bottom:12px;">
              <input type="text" class="form-control" id="edit-line-desc" placeholder="Désignation de l'acte / consultation" style="flex:3;" />
              <input type="number" class="form-control" id="edit-line-price" placeholder="Prix Unitaire (FCFA)" style="flex:2;" />
              <input type="number" class="form-control" id="edit-line-qty" value="1" min="1" placeholder="Qté" style="flex:1;" />
              <button class="btn btn-secondary" type="button" onclick="addEditInvoiceLine()"><i class="fas fa-plus"></i> Ajouter</button>
            </div>

            <div id="edit-invoice-lines-list" style="margin-bottom:15px;"></div>
          </div>

          <div class="card" style="background-color:var(--bg-surface); padding:14px; font-size:0.88rem; margin-bottom:15px;" id="edit-invoice-totals-box">
            <!-- Live totals -->
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px; border-top:1px solid var(--border-color); padding-top:15px;">
            <button class="btn btn-secondary" type="button" onclick="closeEditInvoiceModal()">Annuler</button>
            <button class="btn btn-primary" type="submit" id="btn-submit-edit-invoice" style="background:linear-gradient(135deg, #1e40af, #2563eb); font-weight:700; padding:8px 20px;">
              <i class="fas fa-save"></i> Enregistrer les Modifications
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 8. Medical Service, Consultation & Treatment Create/Edit Modal -->
    <div class="modal-overlay" id="medical-service-modal" style="display:none; justify-content:center; align-items:center; z-index:1150;">
      <div class="modal-container" style="width:580px; max-width:95%; animation: modalFadeIn 0.3s ease;">
        <div class="modal-header">
          <h4 class="modal-title" id="medical-service-modal-title">Ajouter un Acte / Traitement / Consultation</h4>
          <button class="modal-close" onclick="closeServiceModal()">&times;</button>
        </div>
        <form id="medical-service-form" onsubmit="submitServiceForm(event)">
          <input type="hidden" id="service-form-id" />
          
          <div class="form-group" style="margin-bottom:15px;">
            <label class="form-label">Désignation de la Prestation / Traitement / Consultation *</label>
            <input type="text" class="form-control" id="service-name" placeholder="ex: Perfusion sanguine, Consultation pédiatrique" required />
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
            <div class="form-group">
              <label class="form-label">Catégorie de l'acte *</label>
              <select class="form-control" id="service-category" required>
                <option value="CONSULTATION">🩺 Consultation Médicale</option>
                <option value="HOSPITALISATION">🛏️ Hospitalisation & Séjour</option>
                <option value="TRAITEMENT">💉 Traitement / Perfusion</option>
                <option value="SOIN">🩹 Soin Infirmier / Injection</option>
                <option value="ANALYSE">🔬 Analyse / Bilan / Imagerie</option>
                <option value="CHIRURGIE">✂️ Chirurgie / Geste technique</option>
                <option value="AUTRE">📦 Autre Prestation</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Code / Référence Unique *</label>
              <input type="text" class="form-control" id="service-code" placeholder="ex: PERF-SANG, CONS-GEN" required />
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
            <div class="form-group">
              <label class="form-label">Tarif Conventionné (FCFA) *</label>
              <input type="number" class="form-control" id="service-price" placeholder="ex: 10000" min="0" step="500" required />
            </div>
            <div class="form-group">
              <label class="form-label">Durée Estimée (minutes)</label>
              <input type="number" class="form-control" id="service-duration" value="30" min="5" step="5" />
            </div>
          </div>

          <div class="form-group" style="margin-bottom:15px;">
            <label class="form-label">Description / Protocole associé (optionnel)</label>
            <textarea class="form-control" id="service-description" rows="2" placeholder="Détails du traitement, matériel nécessaire ou protocole de soin..."></textarea>
          </div>

          <div class="form-group" style="display:flex; align-items:center; margin-bottom:15px;">
            <label class="form-label" style="display:flex; align-items:center; gap:8px; cursor:pointer; margin:0;">
              <input type="checkbox" id="service-active" checked style="width:18px; height:18px;" />
              <span>Prestation active et disponible à la facturation</span>
            </label>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px; border-top:1px solid var(--border-color); padding-top:15px;">
            <button class="btn btn-secondary" type="button" onclick="closeServiceModal()">Annuler</button>
            <button class="btn btn-primary" type="submit" id="service-submit-btn">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 10. User Management & Permissions Matrix Modal -->
    <div class="modal-overlay" id="user-modal" style="display:none; justify-content:center; align-items:center; z-index:1160;">
      <div class="modal-container" style="width:900px; max-width:96%; max-height:94vh; overflow-y:auto; animation: modalFadeIn 0.3s ease;">
        <div class="modal-header" style="border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:15px;">
          <h4 class="modal-title" id="user-modal-title"><i class="fas fa-user-shield" style="color:var(--primary);"></i> Nouvel Utilisateur & Matrice des Droits</h4>
          <button class="modal-close" onclick="closeUserModal()">&times;</button>
        </div>

        <!-- Info Banner -->
        <div style="background:rgba(37,99,235,0.08); border:1px solid rgba(37,99,235,0.25); border-radius:10px; padding:12px 16px; margin-bottom:18px; display:flex; align-items:center; gap:10px; color:#1e40af; font-size:0.88rem;">
          <i class="fas fa-info-circle fa-lg"></i>
          <span>Définissez précisément les modules auxquels cet agent peut accéder en cochant les droits correspondants.</span>
        </div>

        <form id="user-form" onsubmit="submitUserForm(event)">
          <input type="hidden" id="user-form-id" />

          <!-- User Identity -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px;">
            <div class="form-group">
              <label class="form-label" style="font-weight:600;">Prénom *</label>
              <input type="text" class="form-control" id="user-first-name" placeholder="ex: Fatou" required />
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight:600;">Nom de famille *</label>
              <input type="text" class="form-control" id="user-last-name" placeholder="ex: Diop" required />
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px;">
            <div class="form-group">
              <label class="form-label" style="font-weight:600;">Email de connexion *</label>
              <input type="email" class="form-control" id="user-email" placeholder="agent@clinique.sn" required />
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight:600;">Mot de passe <span id="user-pwd-help" style="font-size:0.75rem; color:var(--text-muted); font-weight:normal;">*</span></label>
              <input type="password" class="form-control" id="user-password" placeholder="••••••••" />
            </div>
          </div>

          <!-- 1. Access Tier Selection (3 User Levels) -->
          <div style="margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <label class="form-label" style="font-weight:700; margin:0;">
                <i class="fas fa-layer-group" style="color:var(--primary);"></i> 1. Niveau d'Accès & Périmètre *
              </label>
              <label class="form-label" style="display:flex; align-items:center; gap:8px; cursor:pointer; margin:0;">
                <input type="checkbox" id="user-active" checked style="width:16px; height:16px;" />
                <span style="font-size:0.85rem; font-weight:600;">Compte actif</span>
              </label>
            </div>
            
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:10px;">
              <!-- Tier 1 : Super-Admin SaaS (Affiché pour Super-Admin) -->
              <div id="btn-level-saas" class="btn-user-level" data-level="SUPER_ADMIN_SAAS" onclick="selectUserLevel('SUPER_ADMIN_SAAS')" style="cursor:pointer; border:2px solid var(--border-color); border-radius:10px; padding:12px; display:flex; flex-direction:column; gap:4px; transition:all 0.2s ease;">
                <div style="display:flex; align-items:center; gap:8px; font-weight:700; font-size:0.92rem; color:#92400e;">
                  <span>👑 Super-Admin SaaS</span>
                </div>
                <div style="font-size:0.75rem; color:var(--text-muted);">
                  Accès global à toutes les cliniques, création de cliniques et gestion de tous les comptes.
                </div>
              </div>

              <!-- Tier 2 : Administrateur Clinique -->
              <div id="btn-level-admin" class="btn-user-level" data-level="TENANT_ADMIN" onclick="selectUserLevel('TENANT_ADMIN')" style="cursor:pointer; border:2px solid var(--border-color); border-radius:10px; padding:12px; display:flex; flex-direction:column; gap:4px; transition:all 0.2s ease;">
                <div style="display:flex; align-items:center; gap:8px; font-weight:700; font-size:0.92rem; color:#1d4ed8;">
                  <span>🛡️ Administrateur Clinique</span>
                </div>
                <div style="font-size:0.75rem; color:var(--text-muted);">
                  Gestion complète de sa clinique (tout faire : DPI, caisse, facturation, stock, lits, utilisateurs).
                </div>
              </div>

              <!-- Tier 3 : Utilisateur Clinique -->
              <div id="btn-level-user" class="btn-user-level" data-level="TENANT_USER" onclick="selectUserLevel('TENANT_USER')" style="cursor:pointer; border:2px solid var(--border-color); border-radius:10px; padding:12px; display:flex; flex-direction:column; gap:4px; transition:all 0.2s ease;">
                <div style="display:flex; align-items:center; gap:8px; font-weight:700; font-size:0.92rem; color:#047857;">
                  <span>👤 Utilisateur Clinique</span>
                </div>
                <div style="font-size:0.75rem; color:var(--text-muted);">
                  Profil métier ou consultation seule (Médecin, Infirmier, Accueil, Caisse, Pharmacie).
                </div>
              </div>
            </div>
            <input type="hidden" id="user-role" value="TENANT_USER" />
            <input type="hidden" id="user-preset" value="DOCTOR" />
          </div>

          <!-- 2. Target Tenant Selector (For Super Admin) -->
          <div id="user-tenant-select-container" style="display:none; background:rgba(37,99,235,0.04); border:1px solid rgba(37,99,235,0.2); border-radius:10px; padding:12px; margin-bottom:16px;">
            <label class="form-label" style="font-weight:700; color:#1e40af; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
              <i class="fas fa-hospital"></i> 2. Clinique de Rattachement *
            </label>
            <select class="form-control" id="user-tenant-id" style="font-weight:600;">
              <!-- Dynamically populated -->
            </select>
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">
              Sélectionnez la clinique à laquelle cet administrateur ou utilisateur sera rattaché.
            </div>
          </div>

          <!-- 3. Profile / Role Preset for Tenant User -->
          <div id="user-presets-container" style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:10px; padding:14px; margin-bottom:16px;">
            <label class="form-label" style="font-weight:700; margin-bottom:8px; display:block;">
              <i class="fas fa-id-badge" style="color:var(--primary);"></i> 3. Profil Prédéfini (Rôle métier) :
            </label>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <button type="button" class="btn btn-secondary btn-sm" onclick="applyUserPreset('DOCTOR')" style="font-size:0.8rem; padding:4px 10px;">
                👨‍⚕️ Médecin / Praticien
              </button>
              <button type="button" class="btn btn-secondary btn-sm" onclick="applyUserPreset('SECRETARY')" style="font-size:0.8rem; padding:4px 10px;">
                👩‍💼 Secrétaire / Accueil
              </button>
              <button type="button" class="btn btn-secondary btn-sm" onclick="applyUserPreset('CASHIER')" style="font-size:0.8rem; padding:4px 10px;">
                💵 Caissier / Facturation
              </button>
              <button type="button" class="btn btn-secondary btn-sm" onclick="applyUserPreset('PHARMACIST')" style="font-size:0.8rem; padding:4px 10px;">
                💊 Pharmacien / Stock
              </button>
              <button type="button" class="btn btn-secondary btn-sm" onclick="applyUserPreset('READONLY')" style="font-size:0.8rem; padding:4px 10px;">
                👁️ Consultation Seule (Lecteur)
              </button>
            </div>
          </div>

          <!-- Matrice des Autorisations -->
          <div style="margin-bottom:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <label class="form-label" style="font-weight:700; font-size:0.95rem; margin:0;">
                <i class="fas fa-th" style="color:var(--primary);"></i> Matrice des Droits par Module
              </label>
              <div style="font-size:0.8rem; color:var(--text-muted);">
                Cochez ou décochez les opérations autorisées pour chaque module.
              </div>
            </div>

            <div style="border:1px solid var(--border-color); border-radius:10px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.03);">
              <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
                <thead>
                  <tr style="background:#0f172a; color:#ffffff;">
                    <th style="padding:10px 14px; text-align:left; font-weight:700;">MODULE</th>
                    <th style="padding:10px 12px; text-align:center; width:90px; font-weight:700;">
                      <label style="cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:2px; margin:0;">
                        <span>VOIR</span>
                        <input type="checkbox" id="matrix-all-view" onchange="toggleMatrixColumn('view', this.checked)" style="cursor:pointer;" />
                      </label>
                    </th>
                    <th style="padding:10px 12px; text-align:center; width:90px; font-weight:700;">
                      <label style="cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:2px; margin:0;">
                        <span>CRÉER</span>
                        <input type="checkbox" id="matrix-all-create" onchange="toggleMatrixColumn('create', this.checked)" style="cursor:pointer;" />
                      </label>
                    </th>
                    <th style="padding:10px 12px; text-align:center; width:90px; font-weight:700;">
                      <label style="cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:2px; margin:0;">
                        <span>MODIFIER</span>
                        <input type="checkbox" id="matrix-all-update" onchange="toggleMatrixColumn('update', this.checked)" style="cursor:pointer;" />
                      </label>
                    </th>
                    <th style="padding:10px 12px; text-align:center; width:95px; font-weight:700;">
                      <label style="cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:2px; margin:0;">
                        <span>SUPPRIMER</span>
                        <input type="checkbox" id="matrix-all-delete" onchange="toggleMatrixColumn('delete', this.checked)" style="cursor:pointer;" />
                      </label>
                    </th>
                  </tr>
                </thead>
                <tbody id="matrix-tbody">
                  <!-- Dynamically populated rows by JS -->
                </tbody>
              </table>
            </div>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px; border-top:1px solid var(--border-color); padding-top:15px;">
            <button class="btn btn-secondary" type="button" onclick="closeUserModal()">Annuler</button>
            <button class="btn btn-primary" type="submit" id="user-submit-btn" style="min-width:140px; font-weight:700;">
              <i class="fas fa-save"></i> Enregistrer Utilisateur
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 10d. Patient Record Access Grants & Delegation Modal -->
    <div class="modal-overlay" id="patient-access-modal" style="display:none; justify-content:center; align-items:center; z-index:1170;">
      <div class="modal-container" style="width:720px; max-width:96%; max-height:92vh; overflow-y:auto; animation: modalFadeIn 0.3s ease;">
        <div class="modal-header" style="border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:15px;">
          <h4 class="modal-title" id="patient-access-modal-title"><i class="fas fa-user-shield" style="color:var(--primary);"></i> Autorisations & Délégation d'Accès au Dossier</h4>
          <button class="modal-close" onclick="closeAccessGrantsModal()">&times;</button>
        </div>

        <div style="background:rgba(37,99,235,0.08); border:1px solid rgba(37,99,235,0.2); border-radius:8px; padding:12px 16px; margin-bottom:18px; font-size:0.88rem; color:#1e40af;">
          <i class="fas fa-lock"></i> <strong>Règle de confidentialité :</strong> Le dossier médical d'un patient n'est accessible qu'à son médecin traitant, à l'administrateur et aux confrères autorisés. Accordez ici un accès temporaire ou permanent à un médecin consultant, remplaçant ou soignant.
        </div>

        <!-- Add Grant Form -->
        <div class="card" style="background:var(--bg-surface); margin-bottom:20px; border:1px solid var(--border-color);">
          <div class="card-title" style="font-size:0.95rem; margin-bottom:12px;"><i class="fas fa-user-plus"></i> Accorder une nouvelle autorisation</div>
          <form id="grant-access-form" onsubmit="submitGrantForm(event)">
            <input type="hidden" id="grant-patient-id" />
            
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
              <div class="form-group">
                <label class="form-label" style="font-weight:600;">Praticien / Médecin Bénéficiaire *</label>
                <select class="form-control" id="grant-practitioner-id" required>
                  <!-- Populated by JS -->
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" style="font-weight:600;">Type d'accès *</label>
                <select class="form-control" id="grant-access-type" required>
                  <option value="READ_WRITE">Lecture & Écriture (Dossier Complet)</option>
                  <option value="READ_ONLY">Lecture Seule (Consultation uniquement)</option>
                </select>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:2fr 1fr; gap:12px; margin-bottom:14px;">
              <div class="form-group">
                <label class="form-label" style="font-weight:600;">Motif de la délégation *</label>
                <input type="text" class="form-control" id="grant-reason" placeholder="ex: Avis spécialisé cardiologique, Garde / Urgence, Remplacement" required />
              </div>
              <div class="form-group">
                <label class="form-label" style="font-weight:600;">Expiration (Optionnelle)</label>
                <input type="datetime-local" class="form-control" id="grant-expires" />
              </div>
            </div>

            <div style="display:flex; justify-content:flex-end;">
              <button class="btn btn-primary btn-sm" type="submit" style="font-weight:700;">
                <i class="fas fa-check"></i> Accorder l'accès
              </button>
            </div>
          </form>
        </div>

        <!-- Current Grants List -->
        <div>
          <div class="card-title" style="font-size:0.95rem; margin-bottom:10px;"><i class="fas fa-list-check"></i> Autorisations actives sur ce dossier</div>
          <div class="table-responsive">
            <table class="table" style="font-size:0.85rem; margin-bottom:0;">
              <thead>
                <tr>
                  <th>Praticien Autorisé</th>
                  <th>Type</th>
                  <th>Motif</th>
                  <th>Accordé Par</th>
                  <th>Validité</th>
                  <th style="text-align:right;">Action</th>
                </tr>
              </thead>
              <tbody id="grant-table-body">
                <!-- Populated dynamically -->
              </tbody>
            </table>
          </div>
        </div>

        <div style="display:flex; justify-content:flex-end; margin-top:20px; border-top:1px solid var(--border-color); padding-top:14px;">
          <button class="btn btn-secondary" type="button" onclick="closeAccessGrantsModal()">Fermer</button>
        </div>
      </div>
    </div>

    <!-- 10. Medical Department / Service Hospitalier Create/Edit Modal -->
    <div class="modal-overlay" id="department-modal" style="display:none; justify-content:center; align-items:center; z-index:1160;">
      <div class="modal-container" style="width:600px; max-width:96%; max-height:92vh; overflow-y:auto; animation: modalFadeIn 0.3s ease;">
        <div class="modal-header">
          <h4 class="modal-title" id="department-modal-title">Ajouter un Service Hospitalier</h4>
          <button class="modal-close" onclick="closeDepartmentModal()">&times;</button>
        </div>
        <form id="department-form" onsubmit="submitDepartmentForm(event)">
          <input type="hidden" id="department-form-id" />
          
          <div style="display:grid; grid-template-columns:2fr 1fr; gap:15px; margin-bottom:15px;">
            <div class="form-group">
              <label class="form-label">Nom du Service Hospitalier *</label>
              <input type="text" class="form-control" id="department-name" placeholder="ex: Service de Cardiologie, Service de Pédiatrie" required />
            </div>
            <div class="form-group">
              <label class="form-label">Code Unique *</label>
              <input type="text" class="form-control" id="department-code" placeholder="ex: SERV-CARDIO" required />
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
            <div class="form-group">
              <label class="form-label">Spécialité Médicale Liée</label>
              <select class="form-control" id="department-specialty-id">
                <option value="">-- Aucune Spécialité --</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Chef de Service (Médecin)</label>
              <select class="form-control" id="department-head-id">
                <option value="">-- Sélectionner Chef de Service --</option>
              </select>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:2fr 1fr; gap:15px; margin-bottom:15px;">
            <div class="form-group">
              <label class="form-label">Localisation / Étage / Pavillon</label>
              <input type="text" class="form-control" id="department-location" placeholder="ex: 1er Étage - Pavillon Mère-Enfant" />
            </div>
            <div class="form-group">
              <label class="form-label">Couleur d'identification</label>
              <input type="color" id="department-color" value="#4a90e2" style="width:100%; height:38px; border:none; border-radius:6px; cursor:pointer;" />
            </div>
          </div>

          <div class="form-group" style="margin-bottom:15px;">
            <label class="form-label">Description / Activités du service (optionnel)</label>
            <textarea class="form-control" id="department-description" rows="2" placeholder="Pathologies prises en charge, équipements spécialisés..."></textarea>
          </div>

          <div style="background:var(--bg-surface); padding:15px; border-radius:10px; border:1px solid var(--border-color); margin-bottom:15px;">
            <label class="form-label" style="font-size:0.85rem; color:var(--text-primary); margin-bottom:8px; display:block;">
              <strong>Praticiens rattachés à ce service :</strong> <span style="font-size:0.75rem; color:var(--text-muted);">(Cochez pour affecter les médecins)</span>
            </label>
            <div id="department-practitioners-container" style="display:flex; flex-wrap:wrap; gap:8px;">
              <!-- Dynamically populated -->
            </div>
          </div>

          <div class="form-group" style="display:flex; align-items:center; margin-bottom:15px;">
            <label class="form-label" style="display:flex; align-items:center; gap:8px; cursor:pointer; margin:0;">
              <input type="checkbox" id="department-active" checked style="width:18px; height:18px;" />
              <span>Service hospitalier actif</span>
            </label>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px; border-top:1px solid var(--border-color); padding-top:15px;">
            <button class="btn btn-secondary" type="button" onclick="closeDepartmentModal()">Annuler</button>
            <button class="btn btn-primary" type="submit" id="department-submit-btn">Enregistrer Service</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 11. Practitioner & Doctor Create/Edit Modal -->
    <div class="modal-overlay" id="practitioner-modal" style="display:none; justify-content:center; align-items:center; z-index:1160;">
      <div class="modal-container" style="width:650px; max-width:96%; max-height:92vh; overflow-y:auto; animation: modalFadeIn 0.3s ease;">
        <div class="modal-header">
          <h4 class="modal-title" id="practitioner-modal-title">Ajouter un Praticien / Médecin</h4>
          <button class="modal-close" onclick="closePractitionerModal()">&times;</button>
        </div>
        <form id="practitioner-form" onsubmit="submitPractitionerForm(event)">
          <input type="hidden" id="practitioner-form-id" />
          
          <div style="display:grid; grid-template-columns:100px 1fr 1fr; gap:12px; margin-bottom:15px;">
            <div class="form-group">
              <label class="form-label">Titre</label>
              <select class="form-control" id="practitioner-title" required>
                <option value="Dr.">Dr.</option>
                <option value="Pr.">Pr.</option>
                <option value="Mme">Mme</option>
                <option value="M.">M.</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Prénom *</label>
              <input type="text" class="form-control" id="practitioner-first" placeholder="ex: Fatou, Amadou" required />
            </div>
            <div class="form-group">
              <label class="form-label">Nom de famille *</label>
              <input type="text" class="form-control" id="practitioner-last" placeholder="ex: SOW, DIOP" required />
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
            <div class="form-group">
              <label class="form-label">Grade Académique / Hospitalier *</label>
              <select class="form-control" id="practitioner-grade" required>
                <option value="Docteur en Médecine">Docteur en Médecine</option>
                <option value="Professeur Titulaire">Professeur Titulaire de Chaire</option>
                <option value="Professeur Agrégé">Professeur Agrégé (Val-de-Grâce / CAMES)</option>
                <option value="Maître de Conférences">Maître de Conférences Agrégé</option>
                <option value="Assistant Chef de Clinique">Assistant Chef de Clinique (CCA)</option>
                <option value="Médecin Spécialiste">Médecin Spécialiste Qualifié</option>
                <option value="Médecin Résident / Interne">Médecin Résident / Interne des Hôpitaux</option>
                <option value="Infirmier Major / Cadre">Infirmier Major / Cadre de Santé</option>
                <option value="Sage-Femme Major">Sage-Femme Major</option>
                <option value="Praticien Hospitalier">Praticien Hospitalier (PH)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Statut Praticien</label>
              <select class="form-control" id="practitioner-status" required>
                <option value="Interne">Praticien Interne (Titulaire de la clinique)</option>
                <option value="Externe">Praticien Externe (Consultant / Vacataire)</option>
              </select>
            </div>
          </div>

          <!-- General Practitioner switch & Specialties selector -->
          <div style="background:var(--bg-surface); padding:15px; border-radius:10px; border:1px solid var(--border-color); margin-bottom:15px;">
            <div class="form-group" style="margin-bottom:12px;">
              <label class="form-label" style="display:flex; align-items:center; gap:8px; cursor:pointer; font-weight:700; color:var(--text-primary);">
                <input type="checkbox" id="practitioner-is-gp" onchange="toggleGPFields()" style="width:18px; height:18px;" />
                <span>🩺 Médecin Généraliste (Consultations de médecine générale et soins primaires)</span>
              </label>
            </div>

            <div id="practitioner-specialties-block" style="border-top:1px dashed var(--border-color); padding-top:10px; transition:opacity 0.2s;">
              <label class="form-label" style="font-size:0.85rem; color:var(--text-primary); margin-bottom:8px; display:block;">
                <strong>Spécialités Médicales attribuées :</strong> <span style="font-size:0.75rem; color:var(--text-muted);">(Un praticien peut exercer plusieurs spécialités)</span>
              </label>
              <div id="practitioner-specialties-container" style="display:flex; flex-wrap:wrap; gap:8px;">
                <!-- Dynamically filled with checkboxes -->
              </div>
            </div>
          </div>

          <!-- Department attachment selector -->
          <div style="background:var(--bg-surface); padding:15px; border-radius:10px; border:1px solid var(--border-color); margin-bottom:15px;">
            <label class="form-label" style="font-size:0.85rem; color:var(--text-primary); margin-bottom:8px; display:block;">
              <strong><i class="fas fa-hospital-alt" style="color:var(--primary);"></i> Services Hospitaliers de rattachement :</strong> <span style="font-size:0.75rem; color:var(--text-muted);">(Un praticien peut intervenir dans plusieurs services)</span>
            </label>
            <div id="practitioner-departments-container" style="display:flex; flex-wrap:wrap; gap:8px;">
              <!-- Dynamically filled with checkboxes -->
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
            <div class="form-group">
              <label class="form-label">Téléphone</label>
              <input type="text" class="form-control" id="practitioner-phone" placeholder="+221 77 000 00 00" />
            </div>
            <div class="form-group">
              <label class="form-label">Email professionnel</label>
              <input type="email" class="form-control" id="practitioner-email" placeholder="docteur@clinique.sn" />
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:15px; margin-bottom:15px;">
            <div class="form-group">
              <label class="form-label">N° Ordre des Médecins</label>
              <input type="text" class="form-control" id="practitioner-license" placeholder="ex: 1245/ONM" />
            </div>
            <div class="form-group">
              <label class="form-label">Tarif Consultation (FCFA)</label>
              <input type="number" class="form-control" id="practitioner-fee" value="15000" min="0" step="500" required />
            </div>
            <div class="form-group">
              <label class="form-label">Couleur Planning</label>
              <input type="color" id="practitioner-color" value="#0d3b66" style="width:100%; height:38px; border:none; border-radius:8px; cursor:pointer;" />
            </div>
          </div>

          <div class="form-group" style="display:flex; align-items:center; margin-bottom:15px;">
            <label class="form-label" style="display:flex; align-items:center; gap:8px; cursor:pointer; margin:0;">
              <input type="checkbox" id="practitioner-active" checked style="width:18px; height:18px;" />
              <span>Praticien actif et ouvert aux rendez-vous</span>
            </label>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px; border-top:1px solid var(--border-color); padding-top:15px;">
            <button class="btn btn-secondary" type="button" onclick="closePractitionerModal()">Annuler</button>
            <button class="btn btn-primary" type="submit" id="practitioner-submit-btn">Enregistrer Praticien</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 12. Medical Specialty Create/Edit Modal -->
    <div class="modal-overlay" id="specialty-modal" style="display:none; justify-content:center; align-items:center; z-index:1160;">
      <div class="modal-container" style="width:580px; max-width:96%; max-height:92vh; overflow-y:auto; animation: modalFadeIn 0.3s ease;">
        <div class="modal-header">
          <h4 class="modal-title" id="specialty-modal-title">Ajouter une Spécialité Médicale</h4>
          <button class="modal-close" onclick="closeSpecialtyModal()">&times;</button>
        </div>
        <form id="specialty-form" onsubmit="submitSpecialtyForm(event)">
          <input type="hidden" id="specialty-form-id" />
          
          <div style="display:grid; grid-template-columns:2fr 1fr; gap:15px; margin-bottom:15px;">
            <div class="form-group">
              <label class="form-label">Nom de la Spécialité *</label>
              <input type="text" class="form-control" id="specialty-name" placeholder="ex: Cardiologie, Pédiatrie, Gynécologie" required />
            </div>
            <div class="form-group">
              <label class="form-label">Code Unique *</label>
              <input type="text" class="form-control" id="specialty-code" placeholder="ex: CARDIO, PED" required />
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
            <div class="form-group">
              <label class="form-label">Durée par défaut consultation (min) *</label>
              <input type="number" class="form-control" id="specialty-duration" value="15" min="5" max="180" step="5" required />
            </div>
            <div class="form-group">
              <label class="form-label">Couleur d'identification</label>
              <input type="color" id="specialty-color" value="#4a90e2" style="width:100%; height:38px; border:none; border-radius:6px; cursor:pointer;" />
            </div>
          </div>

          <div class="form-group" style="margin-bottom:15px;">
            <label class="form-label">Description / Détails (optionnel)</label>
            <textarea class="form-control" id="specialty-description" rows="2" placeholder="Description de la spécialité..."></textarea>
          </div>

          <div class="form-group" style="display:flex; align-items:center; margin-bottom:15px;">
            <label class="form-label" style="display:flex; align-items:center; gap:8px; cursor:pointer; margin:0;">
              <input type="checkbox" id="specialty-active" checked style="width:18px; height:18px;" />
              <span>Spécialité active et sélectionnable</span>
            </label>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px; border-top:1px solid var(--border-color); padding-top:15px;">
            <button class="btn btn-secondary" type="button" onclick="closeSpecialtyModal()">Annuler</button>
            <button class="btn btn-primary" type="submit" id="specialty-submit-btn">Enregistrer Spécialité</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 13. Doctor Unavailability / Congé Modal -->
    <div class="modal-overlay" id="unavailability-modal" style="display:none; justify-content:center; align-items:center; z-index:1160;">
      <div class="modal-container" style="width:580px; max-width:96%; max-height:92vh; overflow-y:auto; animation: modalFadeIn 0.3s ease;">
        <div class="modal-header">
          <h4 class="modal-title" id="unavailability-modal-title"><i class="fas fa-calendar-times" style="color:#dc2626;"></i> Déclarer une Indisponibilité / Congé</h4>
          <button class="modal-close" onclick="closeUnavailabilityModal()">&times;</button>
        </div>
        <form id="unavailability-form" onsubmit="submitUnavailabilityForm(event)">
          
          <div class="form-group" style="margin-bottom:15px;">
            <label class="form-label" style="font-weight:600;">Praticien / Médecin concerné *</label>
            <select class="form-control" id="unavail-practitioner-id" required>
              <!-- Populated by JS -->
            </select>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
            <div class="form-group">
              <label class="form-label" style="font-weight:600;">Date & Heure Début *</label>
              <input type="datetime-local" class="form-control" id="unavail-start" required />
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight:600;">Date & Heure Fin *</label>
              <input type="datetime-local" class="form-control" id="unavail-end" required />
            </div>
          </div>

          <div class="form-group" style="margin-bottom:15px;">
            <label class="form-label" style="font-weight:600;">Motif / Raison (optionnel)</label>
            <input type="text" class="form-control" id="unavail-reason" placeholder="ex: Congé annuel, Formation, Mission extérieure, Maladie..." />
          </div>

          <div class="form-group" style="display:flex; align-items:center; margin-bottom:15px;">
            <label class="form-label" style="display:flex; align-items:center; gap:8px; cursor:pointer; margin:0;">
              <input type="checkbox" id="unavail-all-day" checked style="width:18px; height:18px;" />
              <span>Bloquer tous les créneaux sur la période (aucun RDV ne sera proposé)</span>
            </label>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px; border-top:1px solid var(--border-color); padding-top:15px;">
            <button class="btn btn-secondary" type="button" onclick="closeUnavailabilityModal()">Annuler</button>
            <button class="btn btn-primary" type="submit" style="background:#dc2626; border-color:#dc2626; font-weight:700;">
              <i class="fas fa-ban"></i> Valider l'Indisponibilité
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 15. AI Clinical Voice Copilot & Assistant Modal -->
    <div class="modal-overlay" id="ai-copilot-modal" style="display:none; justify-content:center; align-items:center; z-index:2500;">
      <div class="modal-container" style="width:780px; max-width:96%; max-height:92vh; display:flex; flex-direction:column; animation: modalFadeIn 0.3s ease;">
        
        <!-- Header -->
        <div class="modal-header" style="border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:38px; height:38px; border-radius:50%; background:linear-gradient(135deg, #2563eb, #1d4ed8); color:#fff; display:flex; align-items:center; justify-content:center; font-size:1.1rem; box-shadow:0 2px 6px rgba(37,99,235,0.3);">
              <i class="fas fa-robot"></i>
            </div>
            <div>
              <h4 class="modal-title" style="margin:0; font-size:1.1rem; font-weight:700;">Copilote Médical IA & Assistant Vocal</h4>
              <div id="copilot-context-badge" style="font-size:0.78rem; margin-top:2px;">
                <!-- Populated dynamically -->
              </div>
            </div>
          </div>
          <button class="modal-close" onclick="closeAICopilotModal()">&times;</button>
        </div>

        <!-- Sélecteur de mode : consultation du dossier vs actions réelles (RDV) -->
        <div style="display:flex; gap:8px; margin-bottom:14px; background:var(--bg-surface); border:1px solid var(--border-color); border-radius:10px; padding:5px;">
          <button type="button" id="copilot-mode-btn-copilot" onclick="setCopilotMode('copilot')" style="flex:1; border:none; border-radius:7px; padding:9px 12px; font-size:0.84rem; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:7px;">
            <i class="fas fa-stethoscope"></i> Copilote clinique
          </button>
          <button type="button" id="copilot-mode-btn-agent" onclick="setCopilotMode('agent')" style="flex:1; border:none; border-radius:7px; padding:9px 12px; font-size:0.84rem; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:7px;">
            <i class="fas fa-calendar-check"></i> Agent rendez-vous
          </button>
        </div>

        <!-- Voice Interaction Hub (Mic + Status + Wave) -->
        <div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:12px; padding:16px 20px; margin-bottom:14px; text-align:center;">
          <div id="copilot-mic-btn" class="copilot-pulse-circle" onclick="toggleCopilotVoiceListen()" title="Cliquez pour parler">
            <i class="fas fa-microphone" id="copilot-mic-icon"></i>
          </div>
          <div id="copilot-status-text" style="font-size:0.88rem; font-weight:600; margin-top:10px; color:var(--text-muted);">
            Cliquez sur le micro pour parler ou posez votre question ci-dessous
          </div>
          <div id="copilot-wave-anim" class="copilot-wave" style="display:none;">
            <div class="copilot-wave-bar"></div>
            <div class="copilot-wave-bar"></div>
            <div class="copilot-wave-bar"></div>
            <div class="copilot-wave-bar"></div>
            <div class="copilot-wave-bar"></div>
          </div>
        </div>

        <!-- Quick Suggestion Chips -->
        <div id="copilot-quick-chips" style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:14px;">
          <!-- Dynamically populated -->
        </div>

        <!-- Chat / Response Scrollable Timeline -->
        <div id="copilot-chat-timeline" style="flex:1; overflow-y:auto; min-height:220px; max-height:42vh; padding:10px; background:var(--bg-primary); border-radius:10px; border:1px solid var(--border-color); margin-bottom:14px; display:flex; flex-direction:column; gap:12px;">
          <!-- Messages & AI responses -->
        </div>

        <!-- Bottom Input Bar -->
        <form onsubmit="submitCopilotQuery(event)" style="display:flex; gap:10px; align-items:center;">
          <input type="text" id="copilot-text-input" class="form-control" placeholder="Posez une question sur le dossier, un traitement ou un protocole..." style="height:44px; font-size:0.9rem; border-radius:8px;" />
          <button type="button" class="btn btn-secondary" onclick="toggleCopilotVoiceListen()" style="height:44px; width:44px; border-radius:8px; display:flex; align-items:center; justify-content:center;" title="Microphone">
            <i class="fas fa-microphone"></i>
          </button>
          <button type="submit" class="btn btn-primary" style="height:44px; padding:0 18px; font-weight:700; border-radius:8px; display:flex; align-items:center; gap:6px;">
            <i class="fas fa-paper-plane"></i> <span>Envoyer</span>
          </button>
        </form>
      </div>
    </div>
  `;
  
  navigate(state.currentTab);

  if (state.user.role === 'SUPER_ADMIN_SAAS' || state.user.email === 'mbndiaye@gmail.com') {
    api.request('/tenants').then(tenants => {
      const switcher = document.getElementById('header-clinic-switcher');
      if (switcher && Array.isArray(tenants)) {
        if (!state.tenant && tenants.length > 0) {
          state.tenant = tenants[0];
          localStorage.setItem('tenant', JSON.stringify(tenants[0]));
        }
        switcher.innerHTML = tenants.map(t => `<option value="${t.id}" ${t.id === state.tenant?.id ? 'selected' : ''}>🏥 ${t.name} (${t.slug})</option>`).join('');
      }
    }).catch(() => {});
  }
}

async function switchSuperAdminClinic(tenantId) {
  try {
    const tenants = await api.request('/tenants');
    const matched = Array.isArray(tenants) ? tenants.find(t => t.id === tenantId) : null;
    if (matched) {
      state.tenant = matched;
      localStorage.setItem('tenant', JSON.stringify(matched));
      showToast(`Clinique active : ${matched.name}`, 'info');
      navigate(state.currentTab || 'dashboard');
    }
  } catch (err) {
    console.error('switchSuperAdminClinic error:', err);
  }
}
window.switchSuperAdminClinic = switchSuperAdminClinic;

function copyPublicBookingLink(slug) {
  const url = `${window.location.origin}/rdv/${slug || 'paix'}`;
  navigator.clipboard.writeText(url).then(() => {
    showToast(`Lien copié : ${url}`, 'success');
  }).catch(() => {
    prompt('Copiez ce lien de prise de rendez-vous pour vos patients :', url);
  });
}

function shareOnWhatsApp(slug, clinicName) {
  const url = `${window.location.origin}/rdv/${slug || 'paix'}`;
  const text = encodeURIComponent(`Bonjour, prenez rendez-vous en ligne en quelques clics à ${clinicName || 'notre structure sanitaire'} via ce lien sécurisé : ${url}`);
  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
}

async function openPublicBookingPortal(slug) {
  if (slug) {
    window.location.hash = `rdv/${slug}`;
    renderPublicBookingPortal(slug);
    return;
  }
  try {
    const clinics = await api.request('/public/clinics');
    if (Array.isArray(clinics) && clinics.length > 0) {
      if (clinics.length === 1) {
        window.location.hash = `rdv/${clinics[0].slug}`;
        renderPublicBookingPortal(clinics[0].slug);
      } else {
        openSelectClinicModal(clinics);
      }
    } else {
      window.location.hash = 'rdv/paix';
      renderPublicBookingPortal('paix');
    }
  } catch (err) {
    window.location.hash = 'rdv/paix';
    renderPublicBookingPortal('paix');
  }
}

function openSelectClinicModal(clinics) {
  let modal = document.getElementById('select-clinic-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'select-clinic-modal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }
  modal.style.display = 'flex';
  modal.innerHTML = `
    <div class="modal-container" style="width:520px; max-width:95%; animation: modalFadeIn 0.3s ease; padding:25px;">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:16px;">
        <h4 style="margin:0; color:var(--text-primary); font-size:1.15rem; font-weight:700;">
          <i class="fas fa-hospital" style="color:var(--primary);"></i> Choisissez votre Structure Sanitaire
        </h4>
        <button onclick="document.getElementById('select-clinic-modal').style.display='none'" style="background:none; border:none; color:var(--text-muted); font-size:1.4rem; cursor:pointer;">&times;</button>
      </div>
      <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:16px;">Sélectionnez la structure sanitaire où vous souhaitez consulter :</p>
      <div style="display:flex; flex-direction:column; gap:10px; max-height:360px; overflow-y:auto;">
        ${clinics.map(c => `
          <div onclick="document.getElementById('select-clinic-modal').style.display='none'; openPublicBookingPortal('${c.slug}')" style="border:1px solid var(--border-color); background:var(--bg-surface); padding:14px 18px; border-radius:12px; cursor:pointer; display:flex; justify-content:space-between; align-items:center; transition:all 0.2s;" onmouseover="this.style.borderColor='var(--primary)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.borderColor='var(--border-color)'; this.style.transform='translateY(0)'">
            <div>
              <div style="font-weight:700; font-size:0.95rem; color:var(--text-primary);">${c.name}</div>
              <div style="font-size:0.8rem; color:var(--text-muted); margin-top:2px;">
                <i class="fas fa-map-marker-alt" style="color:var(--primary); font-size:0.75rem;"></i> ${c.address || 'Sénégal'} ${c.phone_number ? `• <i class="fas fa-phone-alt" style="font-size:0.75rem;"></i> ${c.phone_number}` : ''}
              </div>
            </div>
            <span class="badge" style="background:#10b981; color:#fff; font-size:0.75rem; padding:5px 10px; border-radius:8px;">
              Prendre RDV <i class="fas fa-chevron-right" style="font-size:0.65rem;"></i>
            </span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ============================================================================
// Public Patient Self-Service Booking Portal Engine
// ============================================================================
let publicPortalData = null;
let publicPortalMode = 'form'; // 'form' | 'voice' | 'whatsapp'
let publicSelectedDocId = null;
let publicSelectedServiceId = null;
let publicSelectedDate = getTodayDateStr();
let publicSelectedTime = null;
let publicPatientType = 'existing'; // 'existing' | 'new'
let publicAvailableSlots = [];
let publicSlotsLoading = false;
let publicSelectedDuration = 15;

// Voice Agent State
let voiceRecognition = null;
let voiceIsListening = false;
let voiceIsSpeaking = false;
let voiceStep = 0; // 0: Welcome, 1: Code/New, 2: Name confirm, 3: Doctor, 4: Date/Time, 5: Booked
// Étape hors séquence : saisie du seul numéro de téléphone, réclamée à la
// confirmation quand il n'a pas été capté avec le nom. Valeur distincte des
// étapes numérotées pour ne jamais entrer en collision avec elles.
const VOICE_STEP_ASK_PHONE = 51;
let voiceTranscriptLog = [];

// Agent conversationnel LLM du portail public. `null` = on n'a pas encore essayé ;
// passe à `false` définitivement si la clinique n'a pas de LLM configuré, ce qui
// fait retomber le canal vocal sur l'automate à scénarios (voiceStep) sans IA.
let voiceAgentLLMEnabled = null;
let voiceAgentHistory = [];
let voicePendingBooking = null;
let voicePatientData = {
  is_existing: true,
  code: '',
  first_name: '',
  last_name: '',
  phone: '',
  gender: 'M',
  doc_id: null,
  service_id: null,
  date: getTodayDateStr(),
  time: '09:00'
};

async function fetchAndRenderPublicSlots() {
  if (!publicPortalData || !publicPortalData.clinic) return;
  publicSlotsLoading = true;
  updateSlotsUI();
  try {
    const slug = publicPortalData.clinic.slug;
    const res = await api.request(`/public/clinics/${slug}/available-slots?practitioner_id=${publicSelectedDocId || ''}&service_id=${publicSelectedServiceId || ''}&date=${publicSelectedDate}`);
    publicAvailableSlots = res.slots || [];
    publicSelectedDuration = res.duration_minutes || 15;
    
    // Auto-select first available slot if current selection is invalid
    const avail = publicAvailableSlots.filter(s => s.available);
    if (avail.length > 0) {
      const match = avail.find(s => s.time === publicSelectedTime);
      if (!match) {
        publicSelectedTime = avail[0].time;
        voicePatientData.time = publicSelectedTime;
        waPatientData.time = publicSelectedTime;
      }
    } else {
      publicSelectedTime = null;
    }
  } catch (e) {
    console.error('Fetch slots error:', e);
  } finally {
    publicSlotsLoading = false;
    updateSlotsUI();
  }
}

function updateSlotsUI() {
  const container = document.getElementById('pub-slots-container');
  if (!container) return;

  if (publicSlotsLoading) {
    container.innerHTML = `
      <div style="padding:15px; text-align:center; color:var(--text-muted);">
        <i class="fas fa-spinner fa-spin fa-2x" style="color:var(--primary); margin-bottom:8px;"></i>
        <div style="font-size:0.85rem; font-weight:600;">Calcul des créneaux en temps réel...</div>
      </div>
    `;
    return;
  }

  const durationBadge = document.getElementById('pub-duration-badge');
  if (durationBadge) {
    durationBadge.innerHTML = `<i class="fas fa-stopwatch" style="color:#2563eb;"></i> Durée estimée : <strong>${publicSelectedDuration} min</strong>`;
  }

  const avail = publicAvailableSlots.filter(s => s.available);
  if (publicAvailableSlots.length === 0 || avail.length === 0) {
    container.innerHTML = `
      <div style="padding:16px; background:#fff1f2; border:1px solid #fecdd3; border-radius:10px; color:#9f1239; font-size:0.88rem; text-align:center;">
        <i class="fas fa-user-slash fa-lg" style="margin-bottom:6px;"></i><br/>
        <strong>Aucun créneau disponible pour ce praticien à cette date.</strong><br/>
        <span style="font-size:0.8rem; color:#be123c;">Le médecin est soit en congé / indisponible, soit la journée est complète. Veuillez choisir une autre date.</span>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:6px;">
      <span style="font-size:0.85rem; color:#059669; font-weight:700;">
        <i class="fas fa-check-circle"></i> ${avail.length} créneaux disponibles
      </span>
      <span class="badge" style="background:#eff6ff; color:#1d4ed8; border:1px solid #bfdbfe; font-size:0.75rem; padding:3px 8px;">
        Tranches de ${publicSelectedDuration} min
      </span>
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(75px, 1fr)); gap:8px;">
      ${publicAvailableSlots.map(slot => {
        if (!slot.available) {
          return `
            <button type="button" class="btn btn-secondary btn-sm" disabled style="opacity:0.35; font-size:0.78rem; padding:6px 4px; text-decoration:line-through; cursor:not-allowed; background:#f1f5f9; border-color:#e2e8f0; color:#94a3b8;" title="${slot.reason || 'Indisponible'}">
              ${slot.time}
            </button>
          `;
        }
        const isSelected = publicSelectedTime === slot.time;
        return `
          <button type="button" class="btn ${isSelected ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="selectPublicTime('${slot.time}')" style="font-size:0.85rem; font-weight:700; padding:8px 4px; border-radius:8px; ${isSelected ? 'box-shadow:0 4px 10px rgba(37,99,235,0.35); transform:scale(1.04);' : 'background:#ffffff; border:1px solid #cbd5e1; color:#0f172a;'} transition:all 0.15s;">
            ${slot.time}
          </button>
        `;
      }).join('')}
    </div>
  `;
}

async function selectPublicDoc(docId) {
  publicSelectedDocId = docId;
  voicePatientData.doc_id = docId;
  waPatientData.doc_id = docId;

  // Auto-match consultation service to this practitioner's specialty
  const docs = publicPortalData.practitioners || [];
  const services = publicPortalData.services || [];
  const doc = docs.find(d => d.id === docId);

  if (doc && services.length > 0) {
    const matchedService = services.find(s => 
      (s.practitioner_id && s.practitioner_id === doc.id) ||
      (doc.specialty_name && s.name && s.name.toLowerCase().includes(doc.specialty_name.toLowerCase())) ||
      (doc.is_general_practitioner && s.name && s.name.toLowerCase().includes('générale'))
    ) || services.find(s => s.category === 'CONSULTATION') || services[0];

    if (matchedService) {
      publicSelectedServiceId = matchedService.id;
      publicSelectedDuration = matchedService.duration_minutes || 20;
      voicePatientData.service_id = matchedService.id;
      waPatientData.service_id = matchedService.id;
    }
  }

  renderPublicPortalView();
  await fetchAndRenderPublicSlots();
}

async function selectPublicService(serviceId) {
  publicSelectedServiceId = serviceId;
  voicePatientData.service_id = serviceId;
  waPatientData.service_id = serviceId;
  await fetchAndRenderPublicSlots();
}

async function changePublicDate(dateStr) {
  publicSelectedDate = dateStr;
  voicePatientData.date = dateStr;
  waPatientData.date = dateStr;
  await fetchAndRenderPublicSlots();
}

// WhatsApp Chat State
let waMessages = [];
let waStep = 0;
let waPatientData = {
  is_existing: true,
  code: '',
  first_name: '',
  last_name: '',
  phone: '',
  doc_id: null,
  service_id: null,
  date: getTodayDateStr(),
  time: '09:00'
};

async function renderPublicBookingPortal(slug) {
  const root = document.getElementById('app-root');
  root.innerHTML = `
    <div style="min-height:100vh; display:flex; justify-content:center; align-items:center; background:var(--bg-primary);">
      <div style="text-align:center; color:var(--text-muted);">
        <i class="fas fa-spinner fa-spin fa-3x" style="color:var(--primary); margin-bottom:15px;"></i>
        <div style="font-size:1.1rem; font-weight:600;">Chargement du Portail de Rendez-vous...</div>
      </div>
    </div>
  `;

  try {
    const data = await api.request(`/public/clinics/${slug || 'paix'}`);
    publicPortalData = data;
    if (data.practitioners && data.practitioners.length > 0 && !publicSelectedDocId) {
      const firstDoc = data.practitioners[0];
      publicSelectedDocId = firstDoc.id;
      voicePatientData.doc_id = firstDoc.id;
      waPatientData.doc_id = firstDoc.id;

      if (data.services && data.services.length > 0) {
        const matchedService = data.services.find(s => 
          (s.practitioner_id && s.practitioner_id === firstDoc.id) ||
          (firstDoc.specialty_name && s.name && s.name.toLowerCase().includes(firstDoc.specialty_name.toLowerCase())) ||
          (firstDoc.is_general_practitioner && s.name && s.name.toLowerCase().includes('générale'))
        ) || data.services.find(s => s.category === 'CONSULTATION') || data.services[0];
        
        publicSelectedServiceId = matchedService.id;
        publicSelectedDuration = matchedService.duration_minutes || 20;
        voicePatientData.service_id = matchedService.id;
        waPatientData.service_id = matchedService.id;
      }
    }
    
    initWhatsAppConversation();
    initVoiceAgentState();
    renderPublicPortalView();
    await fetchAndRenderPublicSlots();
  } catch (err) {
    root.innerHTML = `
      <div style="min-height:100vh; display:flex; justify-content:center; align-items:center; background:var(--bg-primary); padding:20px;">
        <div class="card" style="max-width:500px; text-align:center; padding:30px;">
          <i class="fas fa-hospital-alt fa-3x" style="color:var(--primary); margin-bottom:15px;"></i>
          <h3 style="color:var(--text-primary);">Structure sanitaire introuvable</h3>
          <p style="color:var(--text-muted); font-size:0.9rem;">Le lien utilisé ne correspond à aucune structure sanitaire active.</p>
          <button class="btn btn-primary" onclick="window.location.href='/'" style="margin-top:15px;">
            <i class="fas fa-home"></i> Retour à l'accueil
          </button>
        </div>
      </div>
    `;
  }
}

function setPublicPortalMode(mode) {
  publicPortalMode = mode;
  if (mode === 'voice') {
    startVoiceAgent();
  } else {
    stopVoiceAgent();
  }
  renderPublicPortalView();
  if (mode === 'form') {
    updateSlotsUI();
  }
}

function renderPublicPortalView(bookedResult = null) {
  const root = document.getElementById('app-root');
  const clinic = publicPortalData.clinic;
  const docs = publicPortalData.practitioners || [];
  const services = publicPortalData.services || [];
  const activeDoc = docs.find(d => d.id === publicSelectedDocId) || docs[0];

  if (bookedResult) {
    root.innerHTML = `
      <div style="min-height:100vh; background:linear-gradient(180deg, #edf5fd 0%, #e2e8f0 100%); padding:30px 15px; display:flex; justify-content:center; align-items:center;">
        <div id="appointment-pass" class="card printable-pass" style="max-width:580px; width:100%; border-radius:20px; padding:30px; box-shadow:0 15px 35px rgba(15,23,42,0.08); animation:modalFadeIn 0.4s ease; background:#ffffff; color:#0f172a; border:1px solid #e2e8f0;">
          
          <div style="text-align:center; margin-bottom:20px; border-bottom:2px dashed #cbd5e1; padding-bottom:16px;">
            <div style="width:64px; height:64px; background:#ecfdf5; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; margin-bottom:10px;">
              <i class="fas fa-calendar-check fa-2x" style="color:#10b981;"></i>
            </div>
            <h2 style="color:#0f172a; margin:0; font-size:1.4rem; font-weight:800;">PASS DE RENDEZ-VOUS MÉDICAL</h2>
            <div style="color:#2563eb; font-weight:700; font-size:1.05rem; margin-top:4px;">${clinic.name}</div>
            <div style="font-size:0.8rem; color:#64748b; margin-top:2px;">${clinic.address || 'Sénégal'} • ${clinic.phone_number || ''}</div>
          </div>

          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:18px; margin-bottom:20px; color:#0f172a;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid #e2e8f0; padding-bottom:10px;">
              <span style="color:#64748b; font-size:0.85rem; font-weight:600;">Code Patient Unique :</span>
              <span class="badge" style="background:#2563eb; color:#fff; font-size:1rem; padding:5px 12px; font-weight:800; border-radius:8px;">
                ${bookedResult.patient.patient_code}
              </span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.9rem;">
              <span style="color:#64748b;">Patient :</span>
              <strong style="color:#0f172a;">${bookedResult.patient.first_name} ${bookedResult.patient.last_name}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.9rem;">
              <span style="color:#64748b;">Canal de réservation :</span>
              <span class="badge" style="background:#f1f5f9; color:#334155; border:1px solid #cbd5e1; font-size:0.75rem; padding:2px 8px;">
                <i class="${bookedResult.appointment.booking_channel === 'VOICE_AGENT' ? 'fas fa-microphone' : (bookedResult.appointment.booking_channel === 'WHATSAPP' ? 'fab fa-whatsapp' : 'fas fa-globe')}"></i>
                ${bookedResult.appointment.booking_channel === 'VOICE_AGENT' ? 'Vocal IA' : (bookedResult.appointment.booking_channel === 'WHATSAPP' ? 'WhatsApp' : 'Portail Web')}
              </span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.9rem;">
              <span style="color:#64748b;">Date & Heure :</span>
              <strong style="color:#2563eb;">${new Date(bookedResult.appointment.start_time).toLocaleString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.9rem;">
              <span style="color:#64748b;">Praticien :</span>
              <strong style="color:#0f172a;">${bookedResult.practitioner_name || ((activeDoc.title || 'Dr') + ' ' + activeDoc.first_name + ' ' + activeDoc.last_name + ' (' + (activeDoc.specialty_name || 'Spécialiste') + ')')}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.9rem;">
              <span style="color:#64748b;">Motif de consultation :</span>
              <strong style="color:#2563eb;">${bookedResult.consultation_reason || bookedResult.service_name || 'Consultation médicale'}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.9rem;">
              <span style="color:#64748b;">Tarif consultation :</span>
              <strong style="color:#0f172a;">${parseFloat(bookedResult.service_price || 15000).toLocaleString()} FCFA</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
              <span style="color:#64748b;">Lieu de consultation :</span>
              <span style="color:#0f172a; text-align:right;">${clinic.address || '12 rue Amadou Assane NDOYE, Dakar'}</span>
            </div>
          </div>

          ${bookedResult.deposit_required > 0 ? `
            <div style="background:#fffbeb; border:1px solid #f59e0b; border-radius:12px; padding:14px; margin-bottom:20px; font-size:0.85rem;">
              <div style="font-weight:700; color:#b45309; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
                <i class="fas fa-mobile-alt"></i> Acompte de confirmation : 2 000 FCFA (Wave / OM)
              </div>
              <div style="color:#78350f; line-height:1.4; font-size:0.82rem;">
                Pour valider votre créneau, effectuez le transfert au numéro : <strong>${clinic.phone_number || '+221 77 647 35 06'}</strong>.<br/>
                Référence à indiquer : <strong>${bookedResult.patient.patient_code}</strong>.
              </div>
            </div>
          ` : `
            <div style="background:#ecfdf5; border:1px solid #10b981; border-radius:12px; padding:12px; margin-bottom:20px; font-size:0.85rem; color:#065f46;">
              <i class="fas fa-check-circle" style="color:#10b981; margin-right:6px;"></i>
              <strong>Rendez-vous confirmé directement</strong> (Dossier patient identifié, 0 FCFA d'acompte).
            </div>
          `}

          <div class="no-print" style="display:flex; gap:10px; flex-wrap:wrap; margin-top:20px;">
            <button class="btn btn-secondary" onclick="window.print()" style="flex:1; min-width:130px;">
              <i class="fas fa-print"></i> Imprimer le Pass
            </button>
            <button class="btn btn-primary" onclick="renderPublicBookingPortal('${clinic.slug}')" style="flex:1; min-width:130px;">
              <i class="fas fa-plus"></i> Autre Rendez-vous
            </button>
            <button class="btn btn-secondary" onclick="window.location.href='/'" style="flex:1; min-width:130px;">
              <i class="fas fa-arrow-left"></i> Retour Accueil
            </button>
          </div>
        </div>
      </div>
    `;
    return;
  }

  root.innerHTML = `
    <div style="min-height:100vh; background:linear-gradient(180deg, #edf5fd 0%, #e2e8f0 100%); padding:25px 15px; display:flex; flex-direction:column; align-items:center;">
      <!-- Header -->
      <div style="max-width:850px; width:100%; display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="width:48px; height:48px; background:linear-gradient(135deg, #2563eb, #1d4ed8); border-radius:14px; display:flex; align-items:center; justify-content:center; color:#fff; font-size:1.35rem; font-weight:700; box-shadow:0 4px 12px rgba(37,99,235,0.25);">
            <i class="fas fa-clinic-medical"></i>
          </div>
          <div>
            <h2 style="margin:0; font-size:1.3rem; font-weight:800; color:#0f172a;">${clinic.name}</h2>
            <div style="font-size:0.82rem; color:#475569; margin-top:2px;">
              <i class="fas fa-map-marker-alt" style="color:#2563eb;"></i> ${clinic.address || 'Sénégal'} • <i class="fas fa-phone-alt" style="color:#2563eb;"></i> ${clinic.phone_number || ''}
            </div>
          </div>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-secondary btn-sm" onclick="window.location.href='/'" style="font-size:0.82rem; background:#ffffff; color:#1e293b; border:1px solid #cbd5e1; box-shadow:0 2px 4px rgba(0,0,0,0.05); font-weight:600;">
            <i class="fas fa-arrow-left"></i> Retour
          </button>
          <button class="btn btn-secondary btn-sm" onclick="openAuthModal('login')" style="font-size:0.82rem; background:#ffffff; color:#1e293b; border:1px solid #cbd5e1; box-shadow:0 2px 4px rgba(0,0,0,0.05); font-weight:600;">
            <i class="fas fa-user-lock"></i> Espace Pro
          </button>
        </div>
      </div>

      <!-- Main Booking Card -->
      <div class="card" style="max-width:850px; width:100%; border-radius:20px; padding:28px 32px; box-shadow:0 15px 35px rgba(15,23,42,0.08); background:#ffffff; border:1px solid #e2e8f0;">
        
        <!-- Channels Selector Tabs -->
        <div style="display:flex; gap:10px; margin-bottom:24px; border-bottom:1px solid #e2e8f0; padding-bottom:16px; flex-wrap:wrap;">
          <button class="btn ${publicPortalMode === 'form' ? 'btn-primary' : 'btn-secondary'}" onclick="setPublicPortalMode('form')" style="flex:1; min-width:140px; font-size:0.9rem; font-weight:700; padding:11px 16px; ${publicPortalMode === 'form' ? 'box-shadow:0 4px 12px rgba(37,99,235,0.25);' : 'background:#f8fafc; color:#334155; border:1px solid #cbd5e1;'}">
            <i class="fas fa-calendar-alt"></i> 1. Formulaire Web
          </button>
          <button class="btn ${publicPortalMode === 'voice' ? 'btn-primary' : 'btn-secondary'}" onclick="setPublicPortalMode('voice')" style="flex:1; min-width:140px; font-size:0.9rem; font-weight:700; padding:11px 16px; ${publicPortalMode === 'voice' ? 'background:linear-gradient(135deg, #8b5cf6, #ec4899); border-color:#8b5cf6; color:#fff; box-shadow:0 4px 12px rgba(139,92,246,0.3);' : 'background:#f8fafc; color:#6b21a8; border:1px solid #cbd5e1;'}">
            <i class="fas fa-microphone"></i> 2. Assistant Vocal IA
          </button>
          <button class="btn ${publicPortalMode === 'whatsapp' ? 'btn-primary' : 'btn-secondary'}" onclick="setPublicPortalMode('whatsapp')" style="flex:1; min-width:140px; font-size:0.9rem; font-weight:700; padding:11px 16px; ${publicPortalMode === 'whatsapp' ? 'background:#00a884; border-color:#00a884; color:#fff; box-shadow:0 4px 12px rgba(0,168,132,0.3);' : 'background:#f8fafc; color:#065f46; border:1px solid #cbd5e1;'}">
            <i class="fab fa-whatsapp"></i> 3. WhatsApp Écrit
          </button>
        </div>

        ${publicPortalMode === 'form' ? renderFormChannel(clinic, docs, services) : ''}
        ${publicPortalMode === 'voice' ? renderVoiceChannel(clinic, docs, services) : ''}
        ${publicPortalMode === 'whatsapp' ? renderWhatsAppChannel(clinic, docs, services) : ''}

      </div>
    </div>
  `;
  if (publicPortalMode === 'form') updateSlotsUI();
}

let publicConsultationReason = '';

function setPublicConsultationReason(text) {
  publicConsultationReason = text;
  const input = document.getElementById('pub-consultation-reason');
  if (input) {
    input.value = text;
    input.focus();
  }
}

// ----------------------------------------------------------------------------
// Channel 1: Web Standard Form
// ----------------------------------------------------------------------------
function renderFormChannel(clinic, docs, services) {
  const activeDoc = docs.find(d => d.id === publicSelectedDocId) || docs[0];
  const feeText = activeDoc && activeDoc.consultation_fee ? `${parseFloat(activeDoc.consultation_fee).toLocaleString()} FCFA` : '15 000 FCFA';

  return `
    <div style="text-align:center; margin-bottom:20px;">
      <h3 style="margin:0; color:var(--text-primary); font-size:1.3rem;">
        <i class="fas fa-calendar-alt" style="color:var(--primary);"></i> Formulaire de Réservation
      </h3>
      <p style="color:var(--text-muted); font-size:0.85rem; margin-top:4px;">Choisissez votre médecin, indiquez votre motif et réservez en quelques clics.</p>
    </div>

    <form id="public-booking-form" onsubmit="handlePublicBookingSubmit(event)">
      <!-- Step 1: Doctor -->
      <div style="margin-bottom:20px;">
        <label class="form-label" style="font-weight:600; font-size:0.9rem;"><i class="fas fa-user-md" style="color:var(--primary);"></i> 1. Praticien / Médecin :</label>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px;">
          ${docs.map(doc => `
            <div onclick="selectPublicDoc('${doc.id}')" style="border:2px solid ${publicSelectedDocId === doc.id ? 'var(--primary)' : 'var(--border-color)'}; background:${publicSelectedDocId === doc.id ? 'rgba(74, 144, 226, 0.08)' : 'var(--bg-surface)'}; border-radius:10px; padding:10px 14px; cursor:pointer; transition:all 0.2s;">
              <div style="font-weight:700; font-size:0.92rem; color:var(--text-primary);">${doc.title || 'Dr.'} ${doc.first_name} ${doc.last_name}</div>
              <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">
                ${doc.grade || 'Docteur'} • <span class="badge" style="background:#f1f5f9; color:#475569; font-size:0.72rem; padding:2px 6px;">${doc.is_general_practitioner ? 'Généraliste' : (doc.specialty_name || 'Spécialiste')}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Step 2: Free Consultation Reason Input -->
      <div class="form-group" style="margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <label class="form-label" style="font-weight:600; font-size:0.9rem; margin:0;">
            <i class="fas fa-edit" style="color:var(--primary);"></i> 2. Motif de votre consultation :
          </label>
          <span id="pub-duration-badge" class="badge" style="background:#eff6ff; color:#1d4ed8; border:1px solid #bfdbfe; font-size:0.75rem; padding:4px 8px;">
            <i class="fas fa-stopwatch"></i> Durée estimée : <strong>${publicSelectedDuration} min</strong>
          </span>
        </div>
        <input type="text" class="form-control" id="pub-consultation-reason" value="${publicConsultationReason || ''}" placeholder="Indiquez vos symptômes ou motif (ex: Fièvre enfant, Bilan tension, Maux de ventre, Contrôle de routine...)" style="font-size:0.92rem; padding:10px 14px; border-radius:10px;" required oninput="publicConsultationReason = this.value;" />
        
        <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:8px;">
          <span style="font-size:0.75rem; color:var(--text-muted); align-self:center;">Exemples rapides :</span>
          <button type="button" class="btn btn-secondary btn-sm" onclick="setPublicConsultationReason('Première consultation & Bilan')" style="font-size:0.75rem; padding:3px 8px; border-radius:6px; background:#f8fafc; border-color:#e2e8f0; color:#334155;">
            Routine & Bilan
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="setPublicConsultationReason('Douleurs ou symptômes inhabituels')" style="font-size:0.75rem; padding:3px 8px; border-radius:6px; background:#f8fafc; border-color:#e2e8f0; color:#334155;">
            Douleurs / Symptômes
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="setPublicConsultationReason('Suivi de traitement & Ordonnance')" style="font-size:0.75rem; padding:3px 8px; border-radius:6px; background:#f8fafc; border-color:#e2e8f0; color:#334155;">
            Suivi & Ordonnance
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="setPublicConsultationReason('Avis médical spécialisé')" style="font-size:0.75rem; padding:3px 8px; border-radius:6px; background:#f8fafc; border-color:#e2e8f0; color:#334155;">
            Avis spécialisé
          </button>
        </div>
      </div>

      <!-- Step 2: Date & Hour Slots -->
      <div style="margin-bottom:22px; background:var(--bg-surface); border:1px solid var(--border-color); border-radius:12px; padding:16px;">
        <label class="form-label" style="font-weight:600; font-size:0.9rem; margin-bottom:10px;"><i class="fas fa-clock" style="color:var(--primary);"></i> 3. Date et Créneau horaire souhaité :</label>
        <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap; margin-bottom:14px;">
          <input type="date" id="pub-date" class="form-control" value="${publicSelectedDate}" min="${getTodayDateStr()}" onchange="changePublicDate(this.value)" style="width:auto; font-weight:600; padding:8px 12px;" required />
          <span style="font-size:0.85rem; color:var(--text-muted);">
            Disponibilités pour le <strong>${new Date(publicSelectedDate + 'T00:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</strong> :
          </span>
        </div>

        <!-- Dynamic Slots Container -->
        <div id="pub-slots-container">
          <div style="padding:10px; text-align:center; color:var(--text-muted); font-size:0.85rem;">
            <i class="fas fa-spinner fa-spin"></i> Chargement des créneaux libres...
          </div>
        </div>
      </div>

      <!-- Step 3: Patient Security & Identification -->
      <div style="margin-bottom:22px;">
        <label class="form-label" style="font-weight:600; font-size:0.9rem; margin-bottom:10px;"><i class="fas fa-user-shield" style="color:var(--primary);"></i> 4. Votre Identité Patient :</label>
        
        <div style="display:flex; gap:8px; margin-bottom:14px;">
          <button type="button" class="btn ${publicPatientType === 'existing' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="setPublicPatientType('existing')" style="flex:1; padding:8px 10px; font-size:0.85rem;">
            <i class="fas fa-id-card"></i> J'ai déjà un Code Patient (ex: SM-4821)
          </button>
          <button type="button" class="btn ${publicPatientType === 'new' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="setPublicPatientType('new')" style="flex:1; padding:8px 10px; font-size:0.85rem;">
            <i class="fas fa-user-plus"></i> Nouveau Patient (Acompte 2000 F)
          </button>
        </div>

        <!-- Mode A: Code Patient Unique -->
        <div id="pub-sec-existing" style="display:${publicPatientType === 'existing' ? 'block' : 'none'}; background:var(--bg-surface); border:1px solid var(--border-color); border-radius:12px; padding:16px;">
          <div class="form-group">
            <label class="form-label" style="font-size:0.85rem;">Votre Code Patient Unique *</label>
            <div style="display:flex; gap:8px;">
              <input type="text" class="form-control" id="pub-patient-code" placeholder="Ex: SM-4821" style="font-weight:700; text-transform:uppercase;" />
              <button type="button" class="btn btn-secondary" onclick="verifyPublicPatientCode('${clinic.slug}')">
                <i class="fas fa-search"></i> Vérifier
              </button>
            </div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div class="form-group">
              <label class="form-label" style="font-size:0.82rem;">Prénom de confirmation *</label>
              <input type="text" class="form-control" id="pub-patient-first" placeholder="Votre prénom" />
            </div>
            <div class="form-group">
              <label class="form-label" style="font-size:0.82rem;">Nom de confirmation *</label>
              <input type="text" class="form-control" id="pub-patient-last" placeholder="Votre nom" />
            </div>
          </div>
          <div id="pub-verification-status"></div>
        </div>

        <!-- Mode B: Nouveau Patient -->
        <div id="pub-sec-new" style="display:${publicPatientType === 'new' ? 'block' : 'none'}; background:var(--bg-surface); border:1px solid var(--border-color); border-radius:12px; padding:16px;">
          <div style="background:rgba(245, 158, 11, 0.08); border:1px solid rgba(245, 158, 11, 0.3); border-radius:8px; padding:10px 14px; margin-bottom:14px; font-size:0.82rem; color:var(--text-primary);">
            <i class="fas fa-shield-alt" style="color:#f59e0b; margin-right:6px;"></i> <strong>Acompte de réservation : 2 000 FCFA</strong> (Wave / Orange Money).<br/>
            <span style="font-size:0.75rem; color:var(--text-muted);">Déductible de votre consultation lors de votre passage. Un Code Unique vous sera attribué immédiatement.</span>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div class="form-group">
              <label class="form-label" style="font-size:0.82rem;">Prénom *</label>
              <input type="text" class="form-control" id="pub-new-first" placeholder="Prénom" />
            </div>
            <div class="form-group">
              <label class="form-label" style="font-size:0.82rem;">Nom de famille *</label>
              <input type="text" class="form-control" id="pub-new-last" placeholder="Nom" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-size:0.82rem;">Numéro de téléphone mobile *</label>
            <input type="tel" class="form-control" id="pub-new-phone" placeholder="Ex: 77 123 45 67" />
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div class="form-group">
              <label class="form-label" style="font-size:0.82rem;">Genre</label>
              <select class="form-control" id="pub-new-gender">
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-size:0.82rem;">Date de Naissance</label>
              <input type="date" class="form-control" id="pub-new-dob" value="1995-01-01" />
            </div>
          </div>
        </div>
      </div>

      <button class="btn btn-primary" style="width:100%; height:48px; font-size:1rem; font-weight:700; border-radius:10px;">
        <i class="fas fa-calendar-check"></i> Valider mon Rendez-vous
      </button>
    </form>
  `;
}

// Intelligent specialty & doctor matching helper
function matchDoctorAndServiceFromInput(inputText, docs, services) {
  const text = (inputText || '').toLowerCase();
  
  const specialtyRules = [
    { key: 'pédiatrie', docKeywords: ['pédiatre', 'pediatre', 'pédiatrie', 'pediatrie', 'enfant', 'bébé', 'bebe', 'aminata', 'diop'], serviceKeywords: ['pédiatrique', 'pediatrique', 'pédiatrie', 'pediatrie'] },
    { key: 'cardiologie', docKeywords: ['cardiologue', 'cardiologie', 'cardio', 'coeur', 'cœur', 'amidou', 'ndiaye', 'tension'], serviceKeywords: ['cardiologie', 'ecg', 'cardio'] },
    { key: 'gynécologie', docKeywords: ['gynécologue', 'gynecologue', 'gynéco', 'gyneco', 'gynécologie', 'grossesse', 'maternité', 'fatou', 'sow'], serviceKeywords: ['gynécologique', 'gynecologique', 'grossesse', 'gynéco'] },
    { key: 'ophtalmologie', docKeywords: ['ophtalmologue', 'ophtalmo', 'ophtalmologie', 'yeux', 'vue', 'vision', 'aïssatou', 'aissatou', 'ba'], serviceKeywords: ['ophtalmologie', 'ophtalmo', 'vue'] },
    { key: 'dermatologie', docKeywords: ['dermatologue', 'dermato', 'dermatologie', 'peau', 'bouton'], serviceKeywords: ['dermatologique', 'dermatologie', 'dermato'] },
    { key: 'chirurgie', docKeywords: ['chirurgien', 'chirurgie', 'opération', 'operation', 'ousmane', 'fall'], serviceKeywords: ['chirurgie', 'chirurgicale'] },
    { key: 'générale', docKeywords: ['généraliste', 'generaliste', 'médecin', 'medecin', 'docteur', 'ibrahima', 'sarr', 'saliou'], serviceKeywords: ['générale', 'generale', 'médicale'] }
  ];

  let matchedDoc = null;
  let matchedService = null;

  // 1. Direct name match
  matchedDoc = docs.find(d => 
    text.includes((d.last_name || '').toLowerCase()) || 
    text.includes((d.first_name || '').toLowerCase())
  );

  // 2. Specialty keyword match
  if (!matchedDoc) {
    for (const rule of specialtyRules) {
      if (rule.docKeywords.some(kw => text.includes(kw))) {
        matchedDoc = docs.find(d => 
          (d.specialty_name && d.specialty_name.toLowerCase().includes(rule.key)) ||
          (rule.key === 'générale' && d.is_general_practitioner) ||
          rule.docKeywords.some(kw => (d.first_name + ' ' + d.last_name).toLowerCase().includes(kw))
        );
        if (matchedDoc) break;
      }
    }
  }

  if (!matchedDoc && docs.length > 0) matchedDoc = docs[0];

  // 3. Match service for this doctor / specialty
  if (matchedDoc) {
    matchedService = services.find(s => 
      (s.practitioner_id && s.practitioner_id === matchedDoc.id) ||
      (matchedDoc.specialty_name && s.name && s.name.toLowerCase().includes(matchedDoc.specialty_name.toLowerCase().slice(0, 5))) ||
      (matchedDoc.is_general_practitioner && s.name && s.name.toLowerCase().includes('générale'))
    );
  }

  if (!matchedService) {
    for (const rule of specialtyRules) {
      if (rule.docKeywords.some(kw => text.includes(kw))) {
        matchedService = services.find(s => rule.serviceKeywords.some(skw => (s.name || '').toLowerCase().includes(skw)));
        if (matchedService) break;
      }
    }
  }

  if (!matchedService) {
    matchedService = services.find(s => s.category === 'CONSULTATION' || (s.name && s.name.toLowerCase().includes('consultation'))) || services[0];
  }

  return { doc: matchedDoc, service: matchedService };
}

function parseNameAndPhoneFromInput(userInput) {
  let phone = '';
  const phoneMatch = userInput.match(/(?:\+?221\s*)?(?:7[05678]|33)\s*\d{3}\s*\d{2}\s*\d{2}/) || userInput.match(/\d{9}/);
  if (phoneMatch) {
    phone = phoneMatch[0].replace(/[\s+]/g, '');
    if (phone.startsWith('221') && phone.length === 12) phone = phone.slice(3);
  }

  let cleanName = userInput
    .replace(/(?:mon\s+num[ée]ro\s+de\s+t[ée]l[ée]phone|t[ée]l[ée]phone|num[ée]ro|t[ée]l|mon\s+num[ée]ro\s+c'?est|mon\s+num[ée]ro\s+est|c'?est\s+le|voici\s+mon\s+num[ée]ro)/gi, '')
    .replace(/(?:\+?221\s*)?(?:7[05678]|33)\s*\d{3}\s*\d{2}\s*\d{2}/g, '')
    .replace(/\d+/g, '')
    .replace(/[^\wÀ-ÿ\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const parts = cleanName.split(/\s+/).filter(p => p.length > 1);
  let firstName = 'Patient';
  let lastName = 'Vocal';

  if (parts.length >= 2) {
    firstName = parts[0];
    lastName = parts.slice(1).join(' ');
  } else if (parts.length === 1) {
    firstName = parts[0];
    lastName = 'Nouveau';
  }

  // Aucun numéro par défaut : un numéro inventé rattacherait la réservation au
  // dossier du patient qui le possède déjà, quel que soit le nom annoncé.
  return { firstName, lastName, phone: phone || null };
}

// ----------------------------------------------------------------------------
// Channel 2: Voice AI Assistant (Speech Recognition + SpeechSynthesis)
// ----------------------------------------------------------------------------
function initVoiceAgentState() {
  voiceStep = 0;
  voiceTranscriptLog = [
    { sender: 'ai', text: `Bonjour et bienvenue au service vocal de ${publicPortalData.clinic.name}. Avez-vous déjà un Code Patient (ex: SM-4821) ou est-ce votre première visite ?` }
  ];
}

function startVoiceAgent() {
  initVoiceAgentState();
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition && !voiceRecognition) {
    voiceRecognition = new SpeechRecognition();
    voiceRecognition.lang = 'fr-FR';
    voiceRecognition.continuous = false;
    voiceRecognition.interimResults = false;

    voiceRecognition.onstart = () => {
      voiceIsListening = true;
      updateVoiceUI();
    };

    voiceRecognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      voiceIsListening = false;
      handleVoiceTranscript(transcript);
    };

    voiceRecognition.onerror = () => {
      voiceIsListening = false;
      updateVoiceUI();
    };

    voiceRecognition.onend = () => {
      voiceIsListening = false;
      updateVoiceUI();
    };
  }

  speakAI(voiceTranscriptLog[0].text);
}

function stopVoiceAgent() {
  if (voiceRecognition && voiceIsListening) {
    try { voiceRecognition.stop(); } catch(e) {}
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  voiceIsListening = false;
  voiceIsSpeaking = false;
}

function toggleVoiceListen() {
  if (voiceIsListening) {
    if (voiceRecognition) voiceRecognition.stop();
  } else {
    if (voiceRecognition) {
      try {
        voiceRecognition.start();
      } catch (err) {
        showToast('Microphone actif. Vous pouvez parler.', 'info');
      }
    } else {
      showToast('Reconnaissance vocale non disponible sur ce navigateur. Utilisez le clavier ci-dessous.', 'warning');
    }
  }
}

function speakAI(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    // Même nettoyage que speakCopilotAI : sans lui, la voix française prononce
    // « astérisques » sur le **gras** et « moins » sur les tirets de liste que
    // produit le LLM. Ce chemin (portail public) avait été oublié lors du
    // correctif initial, qui ne couvrait que le copilote côté clinique.
    // Découpage en fragments courts : Chrome interrompt une énonciation unique au
    // bout d'une quinzaine de secondes, ce qui coupait la voix en pleine phrase.
    const fragments = splitForSpeech(sanitizeForSpeechClient(text));
    if (fragments.length === 0) return;

    voiceIsSpeaking = true;
    updateVoiceUI();

    fragments.forEach((fragment, index) => {
      const u = new SpeechSynthesisUtterance(fragment);
      u.lang = 'fr-FR';
      u.rate = 1.0;
      u.pitch = 1.0;

      // On ne réécoute qu'après le DERNIER fragment : reprendre le micro entre
      // deux phrases couperait la parole de l'agent.
      if (index === fragments.length - 1) {
        u.onend = () => {
          voiceIsSpeaking = false;
          updateVoiceUI();
          // Auto listen after speaking if not completed
          if (voiceStep < 7 && voiceRecognition && !voiceIsListening) {
            try { voiceRecognition.start(); } catch(e) {}
          }
        };
      }

      u.onerror = () => {
        voiceIsSpeaking = false;
        updateVoiceUI();
      };

      window.speechSynthesis.speak(u);
    });
  }
}

function updateVoiceUI() {
  const pulse = document.getElementById('voice-pulse-btn');
  const statusTxt = document.getElementById('voice-status-text');
  const wave = document.getElementById('voice-wave-anim');

  if (pulse) {
    pulse.className = `voice-pulse-circle ${voiceIsListening ? 'listening' : (voiceIsSpeaking ? 'speaking' : '')}`;
  }
  if (statusTxt) {
    if (voiceIsListening) {
      statusTxt.innerHTML = '<span style="color:#ef4444; font-weight:700;"><i class="fas fa-circle fa-beat"></i> Je vous écoute... Parlez maintenant</span>';
    } else if (voiceIsSpeaking) {
      statusTxt.innerHTML = '<span style="color:#10b981; font-weight:700;"><i class="fas fa-volume-up fa-beat"></i> L\'Assistant Vocal vous parle...</span>';
    } else {
      statusTxt.innerHTML = '<span style="color:var(--text-muted);">Cliquez sur le micro ou tapez votre réponse ci-dessous</span>';
    }
  }
  if (wave) {
    wave.style.display = (voiceIsListening || voiceIsSpeaking) ? 'flex' : 'none';
  }
}

/**
 * Dialogue avec l'agent LLM du portail public.
 * Retourne true si l'agent a traité le message, false s'il faut retomber sur
 * l'automate à scénarios (aucun LLM configuré pour cette clinique).
 */
async function handleVoiceTranscriptWithLLM(userInput) {
  const slug = publicPortalData?.clinic?.slug;
  if (!slug) return false;

  voiceTranscriptLog.push({ sender: 'ai', text: '<i class="fas fa-spinner fa-spin"></i> ...', pending: true });
  renderVoiceMessages();

  try {
    const res = await api.request('/public/agent/turn', {
      method: 'POST',
      body: JSON.stringify({ slug, message: userInput, history: voiceAgentHistory })
    });

    voiceAgentLLMEnabled = true;
    voiceAgentHistory = res.history || voiceAgentHistory;
    voiceTranscriptLog = voiceTranscriptLog.filter(m => !m.pending);

    // L'agent a réuni tous les éléments : on propose une confirmation explicite.
    // C'est le patient qui déclenche l'enregistrement, via l'endpoint public
    // existant — l'agent ne réserve jamais de lui-même.
    const hadPending = !!voicePendingBooking;
    voicePendingBooking = res.booking_params || null;

    // Le markdown du LLM est retiré aussi à l'affichage : le patient lit une bulle
    // de conversation, pas un document — « **prénom** » doit se lire « prénom ».
    let answerText = sanitizeForSpeechClient(res.answer || '');

    // Un récapitulatif préparé n'est PAS une réservation : l'enregistrement n'a lieu
    // qu'au clic du patient. Or le modèle annonce volontiers « votre rendez-vous est
    // confirmé » dès que l'outil a réussi. Le patient croyait alors avoir réservé et
    // quittait la page : aucun Pass, aucun rendez-vous. On ajoute donc une phrase
    // déterministe, indépendante de la formulation du modèle.
    if (voicePendingBooking) {
      answerText += " Attention, votre rendez-vous n'est pas encore enregistré : cliquez sur le bouton « Confirmer mon rendez-vous » pour le valider définitivement.";
    }

    voiceTranscriptLog.push({ sender: 'ai', text: escapeHTML(answerText) });

    // Le bouton de confirmation vit dans renderVoiceChannel, pas dans le fil de
    // discussion : il faut re-rendre la vue entière pour le faire apparaître ou disparaître.
    if (!!voicePendingBooking !== hadPending) {
      renderPublicPortalView();
    } else {
      renderVoiceMessages();
    }

    speakAI(answerText);
    return true;
  } catch (err) {
    voiceTranscriptLog = voiceTranscriptLog.filter(m => !m.pending);

    // Pas de LLM pour cette clinique : bascule définitive sur l'automate,
    // sans afficher d'erreur au patient qui n'y peut rien.
    if (err.data && err.data.code === 'NO_LLM_CONFIGURED') {
      voiceAgentLLMEnabled = false;
      renderVoiceMessages();
      return false;
    }

    voiceTranscriptLog.push({
      sender: 'ai',
      text: escapeHTML(err.message || "Je n'ai pas pu traiter votre demande. Pouvez-vous réessayer ?")
    });
    renderVoiceMessages();
    return true;
  }
}

/** Enregistre réellement le rendez-vous préparé par l'agent, après clic du patient. */
async function confirmVoiceAgentBooking() {
  if (!voicePendingBooking) return;
  const params = voicePendingBooking;

  try {
    const result = await api.request('/public/book', {
      method: 'POST',
      body: JSON.stringify({ ...params, tenant_slug: publicPortalData.clinic.slug })
    });
    // La réservation a abouti : on peut abandonner le récapitulatif en attente.
    voicePendingBooking = null;
    // Réutilise l'écran de confirmation existant (pass de rendez-vous imprimable)
    renderPublicPortalView(result);
  } catch (err) {
    // Le récapitulatif est conservé : effacé avant l'appel, un échec (créneau pris,
    // numéro déjà rattaché à un autre dossier) faisait disparaître le bouton et
    // laissait le patient sans aucun moyen de réessayer.
    const msg = `${err.message || 'La réservation a échoué.'} Vous pouvez corriger puis cliquer de nouveau sur « Confirmer mon rendez-vous ».`;
    voiceTranscriptLog.push({ sender: 'ai', text: escapeHTML(msg) });
    renderVoiceMessages();
    speakAI(msg);
  }
}
window.confirmVoiceAgentBooking = confirmVoiceAgentBooking;

async function handleVoiceTranscript(userInput) {
  if (!userInput.trim()) return;

  voiceTranscriptLog.push({ sender: 'user', text: userInput });
  renderVoiceMessages();

  // Si la clinique a configuré un LLM, l'agent conversationnel prend la main.
  // Sinon on garde l'automate à scénarios ci-dessous, qui fonctionne sans IA.
  if (voiceAgentLLMEnabled !== false) {
    const handled = await handleVoiceTranscriptWithLLM(userInput);
    if (handled) return;
  }

  const text = userInput.toLowerCase();
  const clinic = publicPortalData.clinic;
  const docs = publicPortalData.practitioners || [];
  const services = publicPortalData.services || [];

  if (voiceStep === 0) {
    // Check if user says code or new
    const codeMatch = userInput.match(/SM-?\s*(\d{4})/i) || userInput.match(/(\d{4})/);
    if (codeMatch || text.includes('oui') || text.includes('code') || text.includes('ancien') || text.includes('dossier')) {
      voicePatientData.is_existing = true;
      if (codeMatch) {
        const rawNum = codeMatch[1] || codeMatch[0];
        voicePatientData.code = `SM-${rawNum.replace(/\s+/g, '')}`;
        voiceStep = 2; // Jump to Name confirmation
        const reply = `Bien noté pour le code ${voicePatientData.code}. Pour confirmer votre identité, quel est votre prénom et votre nom de famille ?`;
        voiceTranscriptLog.push({ sender: 'ai', text: reply });
        renderVoiceMessages();
        speakAI(reply);
      } else {
        voiceStep = 1;
        const reply = `Parfait. Quel est votre Code Patient (par exemple SM-4821) ?`;
        voiceTranscriptLog.push({ sender: 'ai', text: reply });
        renderVoiceMessages();
        speakAI(reply);
      }
    } else {
      // New patient
      voicePatientData.is_existing = false;
      voiceStep = 2;
      const reply = `Bienvenue ! S'agissant de votre première consultation, quel est votre prénom, votre nom et votre numéro de téléphone ?`;
      voiceTranscriptLog.push({ sender: 'ai', text: reply });
      renderVoiceMessages();
      speakAI(reply);
    }
  } else if (voiceStep === 1) {
    // User provides code
    const codeMatch = userInput.match(/SM-?\s*(\d{4})/i) || userInput.match(/(\d{4})/);
    const rawNum = codeMatch ? (codeMatch[1] || codeMatch[0]) : userInput.replace(/[^0-9]/g, '');
    voicePatientData.code = rawNum.length === 4 ? `SM-${rawNum}` : userInput.toUpperCase().trim();
    voiceStep = 2;
    const reply = `Code ${voicePatientData.code} enregistré. Pour sécuriser votre demande, veuillez prononcer votre prénom et votre nom.`;
    voiceTranscriptLog.push({ sender: 'ai', text: reply });
    renderVoiceMessages();
    speakAI(reply);
  } else if (voiceStep === 2) {
    // Name & Phone extraction
    const { firstName, lastName, phone } = parseNameAndPhoneFromInput(userInput);
    voicePatientData.first_name = firstName;
    voicePatientData.last_name = lastName;
    if (phone) voicePatientData.phone = phone;

    if (voicePatientData.is_existing) {
      // Cross-check with backend API
      try {
        const res = await api.request('/public/verify-patient', {
          method: 'POST',
          body: JSON.stringify({
            tenant_slug: clinic.slug,
            patient_code: voicePatientData.code,
            first_name: voicePatientData.first_name,
            last_name: voicePatientData.last_name
          })
        });

        if (res.exists && res.verified) {
          voicePatientData.first_name = res.patient.first_name;
          voicePatientData.last_name = res.patient.last_name;
          voiceStep = 3;
          const reply = `Identité vérifiée avec succès, ${res.patient.first_name} ! Acompte : 0 Francs. Avec quel médecin souhaitez-vous prendre rendez-vous ?`;
          voiceTranscriptLog.push({ sender: 'ai', text: reply });
          renderVoiceMessages();
          speakAI(reply);
          return;
        }
      } catch (e) {}
    }

    voiceStep = 3;
    const reply = `Très bien ${voicePatientData.first_name} ${voicePatientData.last_name}. Quel spécialiste ou médecin souhaitez-vous consulter ? (Par exemple : Cardiologue, Pédiatre, Généraliste...)`;
    voiceTranscriptLog.push({ sender: 'ai', text: reply });
    renderVoiceMessages();
    speakAI(reply);
  } else if (voiceStep === 3) {
    // Match Doctor & Consultation Service by specialty (Cardiologie, Pédiatrie), title (Professeur, Docteur) or name
    const { doc: matchedDoc, service: matchedService } = matchDoctorAndServiceFromInput(userInput, docs, services);

    voicePatientData.doc_id = matchedDoc ? matchedDoc.id : (docs[0] ? docs[0].id : null);
    voicePatientData.service_id = matchedService ? matchedService.id : (services[0] ? services[0].id : null);

    const docName = matchedDoc ? `${matchedDoc.title || 'Dr'} ${matchedDoc.first_name} ${matchedDoc.last_name}` : 'votre médecin';
    const specName = matchedDoc ? (matchedDoc.specialty_name || 'Spécialiste') : 'Médecine';

    voiceStep = 4;
    const reply = `Rendez-vous sélectionné avec ${docName} (${specName}). Quel est le motif de votre consultation ? (Par exemple : Douleurs à la poitrine, bilan de santé, suivi de tension, contrôle de routine...)`;
    voiceTranscriptLog.push({ sender: 'ai', text: reply });
    renderVoiceMessages();
    speakAI(reply);
  } else if (voiceStep === 4) {
    // Consultation Reason provided
    let reason = userInput.trim();
    if (!reason || reason.length < 3) reason = 'Consultation & Bilan';
    voicePatientData.consultation_reason = reason;

    voiceStep = 5;
    const reply = `Bien noté : « ${reason} ». Quel jour et quelle heure préférez-vous ? (Par exemple : Aujourd'hui à 10 heures ou Demain à 15 heures).`;
    voiceTranscriptLog.push({ sender: 'ai', text: reply });
    renderVoiceMessages();
    speakAI(reply);
  } else if (voiceStep === 5) {
    // Time and date selection -> Move to Verification & Confirmation Step 6
    let hour = '10:00';
    const hourMatch = text.match(/(\d{1,2})\s*h(?:eure)?(?:\s*(\d{1,2}))?/i) || text.match(/(\d{1,2})\s*:\s*(\d{2})/i);
    if (hourMatch) {
      let hVal = parseInt(hourMatch[1]);
      let mVal = hourMatch[2] ? parseInt(hourMatch[2]) : 0;
      if (hVal < 8) hVal += 12;
      hour = `${String(hVal).padStart(2, '0')}:${String(mVal).padStart(2, '0')}`;
    }

    let dateStr = getTodayDateStr();
    if (text.includes('demain')) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateStr = tomorrow.toISOString().split('T')[0];
    } else if (text.includes('après-demain') || text.includes('apres demain')) {
      const dayAfter = new Date();
      dayAfter.setDate(dayAfter.getDate() + 2);
      dateStr = dayAfter.toISOString().split('T')[0];
    }

    voicePatientData.date = dateStr;
    voicePatientData.time = hour;
    voiceStep = 6;

    const doc = docs.find(d => d.id === voicePatientData.doc_id) || docs[0];
    const docName = doc ? `${doc.title || 'Dr'} ${doc.first_name} ${doc.last_name}` : 'votre médecin';
    const specName = doc ? (doc.specialty_name || 'Médecine') : 'Consultation';
    const reason = voicePatientData.consultation_reason || 'Consultation & Bilan';

    const reply = `Voici le récapitulatif de votre rendez-vous :
• Patient : ${voicePatientData.first_name} ${voicePatientData.last_name}
• Praticien : ${docName} (${specName})
• Motif : « ${reason} »
• Date et Heure : Le ${dateStr} à ${hour}.

Ces informations sont-elles bien correctes ? Répondez « Oui » pour confirmer, ou dites ce que vous souhaitez modifier (ex: « Changer l'heure », « Changer le médecin », « Changer le motif »).`;

    voiceTranscriptLog.push({ sender: 'ai', text: reply });
    renderVoiceMessages();
    speakAI(reply);

  } else if (voiceStep === VOICE_STEP_ASK_PHONE) {
    // Saisie du seul numéro de téléphone, demandée au moment de la confirmation
    // quand il n'a pas été capté avec le nom à l'étape 2.
    const { phone } = parseNameAndPhoneFromInput(userInput);
    if (!phone) {
      const retry = `Je n'ai pas reconnu de numéro. Dictez-le chiffre par chiffre, par exemple : 77 123 45 67.`;
      voiceTranscriptLog.push({ sender: 'ai', text: retry });
      renderVoiceMessages();
      speakAI(retry);
      return;
    }

    voicePatientData.phone = phone;
    voiceStep = 6;

    const docP = docs.find(d => d.id === voicePatientData.doc_id) || docs[0];
    const docNameP = docP ? `${docP.title || 'Dr'} ${docP.first_name} ${docP.last_name}` : 'votre médecin';
    const reasonP = voicePatientData.consultation_reason || 'Consultation & Bilan';
    const reply = `Merci, j'ai bien noté le ${phone}.

Voici le récapitulatif de votre rendez-vous :
• Patient : ${voicePatientData.first_name} ${voicePatientData.last_name}
• Téléphone : ${phone}
• Praticien : ${docNameP}
• Motif : « ${reasonP} »
• Date et Heure : Le ${voicePatientData.date} à ${voicePatientData.time}.

Confirmez-vous ? Répondez « Oui » pour enregistrer.`;
    voiceTranscriptLog.push({ sender: 'ai', text: reply });
    renderVoiceMessages();
    speakAI(reply);

  } else if (voiceStep === 6) {
    // Step 6: Interactive Confirmation & Continuous Correction Loop
    const isConfirmation = text.includes('oui') || text.includes('correct') || text.includes('valider') || text.includes('confirmer') || text.includes('exact') || text.includes('parfait') || text.includes('d\'accord') || text.includes('c\'est bon') || text.includes('yes') || text.includes('ok');

    if (isConfirmation) {
      // Un nouveau patient sans numéro capté ne peut pas être enregistré : plutôt que
      // d'échouer après la confirmation, on redemande le numéro ici. Auparavant un
      // numéro par défaut était envoyé, ce qui rattachait le rendez-vous au dossier
      // du patient possédant ce numéro, quel que soit le nom annoncé.
      if (!voicePatientData.is_existing && !voicePatientData.phone) {
        const askPhone = `Il me manque votre numéro de téléphone pour créer votre dossier. Pouvez-vous me le dicter, chiffre par chiffre ?`;
        voiceTranscriptLog.push({ sender: 'ai', text: askPhone });
        renderVoiceMessages();
        speakAI(askPhone);
        // Étape dédiée à la saisie du numéro. Renvoyer vers l'étape 5 (date et heure)
        // faisait interpréter le numéro dicté comme un horaire : le patient revenait
        // au récapitulatif toujours sans téléphone, et la boucle était sans issue.
        voiceStep = VOICE_STEP_ASK_PHONE;
        return;
      }

      voiceStep = 7;
      const confirmReply = `Parfait ! J'enregistre définitivement votre rendez-vous...`;
      voiceTranscriptLog.push({ sender: 'ai', text: confirmReply });
      renderVoiceMessages();
      speakAI(confirmReply);

      // Call public booking API
      try {
        const payload = {
          tenant_slug: clinic.slug,
          practitioner_id: voicePatientData.doc_id,
          medical_service_id: voicePatientData.service_id,
          consultation_reason: voicePatientData.consultation_reason || 'Consultation spécialisée',
          start_time: `${voicePatientData.date}T${voicePatientData.time}:00`,
          booking_channel: 'VOICE_AGENT',
          is_new_patient: !voicePatientData.is_existing,
          patient_code: voicePatientData.code,
          first_name: voicePatientData.first_name,
          last_name: voicePatientData.last_name,
          phone_number: voicePatientData.phone || null,
          gender: voicePatientData.gender,
          date_of_birth: voicePatientData.date_of_birth || null
        };

        const res = await api.request('/public/book', {
          method: 'POST',
          body: JSON.stringify(payload)
        });

        const finalMsg = `Félicitations ${res.patient.first_name} ! Votre rendez-vous avec ${res.practitioner_name || 'votre médecin'} est validé sous le Code Patient ${res.patient.patient_code}. Votre pass numérique s'affiche à l'écran.`;
        voiceTranscriptLog.push({ sender: 'ai', text: finalMsg });
        renderVoiceMessages();
        speakAI(finalMsg);

        setTimeout(() => {
          renderPublicPortalView(res);
        }, 2500);

      } catch (err) {
        const errMsg = `Désolé, une erreur est survenue : ${err.message}`;
        voiceTranscriptLog.push({ sender: 'ai', text: errMsg });
        renderVoiceMessages();
        speakAI(errMsg);
      }
      return;
    }

    // Check for specific field corrections:
    // A. Doctor / Specialty
    if (text.includes('médecin') || text.includes('docteur') || text.includes('praticien') || text.includes('changer de medecin') || text.includes('changer le medecin') || text.includes('cardiologue') || text.includes('pédiatre') || text.includes('généraliste') || text.includes('ophtalmo')) {
      const { doc: matchedDoc, service: matchedService } = matchDoctorAndServiceFromInput(userInput, docs, services);
      if (matchedDoc) {
        voicePatientData.doc_id = matchedDoc.id;
        if (matchedService) voicePatientData.service_id = matchedService.id;
        const newDocName = `${matchedDoc.title || 'Dr'} ${matchedDoc.first_name} ${matchedDoc.last_name}`;
        const newSpecName = matchedDoc.specialty_name || 'Spécialiste';
        const reply = `Praticien modifié pour : ${newDocName} (${newSpecName}).\n\nNouveau récapitulatif : RDV avec ${newDocName} le ${voicePatientData.date} à ${voicePatientData.time} pour « ${voicePatientData.consultation_reason} ».\n\nEst-ce bien correct ? (Dites « Oui » pour valider).`;
        voiceTranscriptLog.push({ sender: 'ai', text: reply });
        renderVoiceMessages();
        speakAI(reply);
      } else {
        voiceStep = 3;
        const reply = `D'accord, quel médecin ou spécialité souhaitez-vous choisir ? (ex: Cardiologue, Pédiatre, Généraliste...)`;
        voiceTranscriptLog.push({ sender: 'ai', text: reply });
        renderVoiceMessages();
        speakAI(reply);
      }
      return;
    }

    // B. Date & Time
    if (text.includes('heure') || text.includes('date') || text.includes('jour') || text.includes('changer l\'heure') || text.includes('changer la date') || text.includes('demain') || text.includes('aujourd\'hui') || text.match(/\d{1,2}\s*h/i)) {
      const hourMatch = text.match(/(\d{1,2})\s*h(?:eure)?(?:\s*(\d{1,2}))?/i) || text.match(/(\d{1,2})\s*:\s*(\d{2})/i);
      if (hourMatch) {
        let hVal = parseInt(hourMatch[1]);
        let mVal = hourMatch[2] ? parseInt(hourMatch[2]) : 0;
        if (hVal < 8) hVal += 12;
        voicePatientData.time = `${String(hVal).padStart(2, '0')}:${String(mVal).padStart(2, '0')}`;
      }
      if (text.includes('demain')) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        voicePatientData.date = tomorrow.toISOString().split('T')[0];
      } else if (text.includes('aujourd\'hui')) {
        voicePatientData.date = getTodayDateStr();
      }

      const doc = docs.find(d => d.id === voicePatientData.doc_id) || docs[0];
      const docName = doc ? `${doc.title || 'Dr'} ${doc.first_name} ${doc.last_name}` : 'votre médecin';
      const reply = `Date et heure modifiées pour le ${voicePatientData.date} à ${voicePatientData.time}.\n\nNouveau récapitulatif : RDV avec ${docName} le ${voicePatientData.date} à ${voicePatientData.time} (Motif : « ${voicePatientData.consultation_reason} »).\n\nEst-ce bien correct ? (Dites « Oui » pour valider).`;
      voiceTranscriptLog.push({ sender: 'ai', text: reply });
      renderVoiceMessages();
      speakAI(reply);
      return;
    }

    // C. Reason
    if (text.includes('motif') || text.includes('changer le motif') || text.includes('raison')) {
      const cleanReason = userInput.replace(/^(changer le motif|le motif est|motif\s*:?)/i, '').trim();
      if (cleanReason && cleanReason.length > 2) {
        voicePatientData.consultation_reason = cleanReason;
        const doc = docs.find(d => d.id === voicePatientData.doc_id) || docs[0];
        const docName = doc ? `${doc.title || 'Dr'} ${doc.first_name} ${doc.last_name}` : 'votre médecin';
        const reply = `Motif modifié : « ${cleanReason} ».\n\nNouveau récapitulatif : RDV avec ${docName} le ${voicePatientData.date} à ${voicePatientData.time} pour « ${cleanReason} ».\n\nEst-ce bien correct ? (Dites « Oui » pour valider).`;
        voiceTranscriptLog.push({ sender: 'ai', text: reply });
        renderVoiceMessages();
        speakAI(reply);
      } else {
        voiceStep = 4;
        const reply = `D'accord, quel est le nouveau motif de votre consultation ?`;
        voiceTranscriptLog.push({ sender: 'ai', text: reply });
        renderVoiceMessages();
        speakAI(reply);
      }
      return;
    }

    // D. Name
    if (text.includes('nom') || text.includes('prénom') || text.includes('changer le nom')) {
      voiceStep = 2;
      const reply = `D'accord, veuillez me donner vos prénom et nom exacts :`;
      voiceTranscriptLog.push({ sender: 'ai', text: reply });
      renderVoiceMessages();
      speakAI(reply);
      return;
    }

    // E. General fallback for Step 6
    const doc = docs.find(d => d.id === voicePatientData.doc_id) || docs[0];
    const docName = doc ? `${doc.title || 'Dr'} ${doc.first_name} ${doc.last_name}` : 'votre médecin';
    const reply = `Que souhaitez-vous corriger ? Vous pouvez me dire par exemple : « Changer l'heure pour 16h », « Changer de médecin » ou « Changer le motif ». Ou dites « Oui » pour confirmer ce rendez-vous.`;
    voiceTranscriptLog.push({ sender: 'ai', text: reply });
    renderVoiceMessages();
    speakAI(reply);
  }
}

function getVoiceShortcutsHTML(docs) {
  if (voiceStep === 0) {
    return `
      <button type="button" class="btn btn-secondary btn-sm" onclick="handleVoiceTranscript('J\'ai un code patient SM-4821')" style="font-size:0.78rem;">
        💬 « J'ai un code SM-4821 »
      </button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="handleVoiceTranscript('J\'ai un code patient SM-1042')" style="font-size:0.78rem;">
        💬 « J'ai un code SM-1042 »
      </button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="handleVoiceTranscript('C\'est mon premier rendez-vous')" style="font-size:0.78rem;">
        💬 « Premier rendez-vous »
      </button>
    `;
  } else if (voiceStep === 1) {
    return `
      <button type="button" class="btn btn-secondary btn-sm" onclick="handleVoiceTranscript('SM-4821')" style="font-size:0.78rem;">
        💬 « SM-4821 »
      </button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="handleVoiceTranscript('SM-1042')" style="font-size:0.78rem;">
        💬 « SM-1042 »
      </button>
    `;
  } else if (voiceStep === 2) {
    return `
      <button type="button" class="btn btn-secondary btn-sm" onclick="handleVoiceTranscript('Fatou MBAYE')" style="font-size:0.78rem;">
        💬 « Fatou MBAYE »
      </button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="handleVoiceTranscript('Amidou NDIAYE')" style="font-size:0.78rem;">
        💬 « Amidou NDIAYE »
      </button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="handleVoiceTranscript('Salimata DIALLO 776490234')" style="font-size:0.78rem;">
        💬 « Salimata DIALLO 776490234 »
      </button>
    `;
  } else if (voiceStep === 3) {
    return docs.map(d => `
      <button type="button" class="btn btn-secondary btn-sm" onclick="handleVoiceTranscript('${d.title || 'Dr'} ${d.last_name}')" style="font-size:0.78rem;">
        💬 « ${d.title || 'Dr'} ${d.last_name} (${d.specialty_name || 'Spécialiste'}) »
      </button>
    `).join('');
  } else if (voiceStep === 4) {
    return `
      <button type="button" class="btn btn-secondary btn-sm" onclick="handleVoiceTranscript('Bilan cardiologique & Suivi')" style="font-size:0.78rem;">
        💬 « Bilan & Suivi »
      </button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="handleVoiceTranscript('Contrôle de routine')" style="font-size:0.78rem;">
        💬 « Contrôle de routine »
      </button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="handleVoiceTranscript('Douleurs et symptômes')" style="font-size:0.78rem;">
        💬 « Douleurs & Symptômes »
      </button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="handleVoiceTranscript('Avis spécialisé')" style="font-size:0.78rem;">
        💬 « Avis spécialisé »
      </button>
    `;
  } else if (voiceStep === 5) {
    return `
      <button type="button" class="btn btn-secondary btn-sm" onclick="handleVoiceTranscript('Aujourd\'hui à 11 heures')" style="font-size:0.78rem;">
        💬 « Aujourd'hui à 11h »
      </button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="handleVoiceTranscript('Aujourd\'hui à 16 heures')" style="font-size:0.78rem;">
        💬 « Aujourd'hui à 16h »
      </button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="handleVoiceTranscript('Demain à 09 heures')" style="font-size:0.78rem;">
        💬 « Demain à 09h »
      </button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="handleVoiceTranscript('Demain à 15 heures')" style="font-size:0.78rem;">
        💬 « Demain à 15h »
      </button>
    `;
  } else if (voiceStep === 6) {
    return `
      <button type="button" class="btn btn-success btn-sm" onclick="handleVoiceTranscript('Oui, c\'est tout à fait correct')" style="font-size:0.78rem; font-weight:700; background:#10b981; border-color:#10b981; color:#fff;">
        ✅ « Oui, c'est correct (Confirmer) »
      </button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="handleVoiceTranscript('Changer l\'heure pour 16 heures')" style="font-size:0.78rem;">
        🕒 « Modifier l'heure »
      </button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="handleVoiceTranscript('Changer de médecin')" style="font-size:0.78rem;">
        👨‍⚕️ « Modifier le médecin »
      </button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="handleVoiceTranscript('Changer le motif')" style="font-size:0.78rem;">
        📝 « Modifier le motif »
      </button>
    `;
  }
  return '';
}

function renderVoiceMessages() {
  const container = document.getElementById('voice-chat-history');
  if (container) {
    container.innerHTML = voiceTranscriptLog.map(m => `
      <div style="display:flex; justify-content:${m.sender === 'ai' ? 'flex-start' : 'flex-end'}; margin-bottom:10px;">
        <div style="max-width:85%; padding:10px 14px; border-radius:12px; background:${m.sender === 'ai' ? 'var(--bg-surface)' : 'var(--primary)'}; color:${m.sender === 'ai' ? 'var(--text-primary)' : '#fff'}; border:1px solid var(--border-color); font-size:0.88rem; line-height:1.4;">
          <div style="font-size:0.7rem; font-weight:700; opacity:0.7; margin-bottom:3px;">
            ${m.sender === 'ai' ? '<i class="fas fa-robot"></i> Assistant Vocal IA' : '<i class="fas fa-user"></i> Vous (Voix)'}
          </div>
          ${m.text}
        </div>
      </div>
    `).join('');
    container.scrollTop = container.scrollHeight;
  }

  const shortcutsContainer = document.getElementById('voice-shortcuts-container');
  if (shortcutsContainer && publicPortalData) {
    shortcutsContainer.innerHTML = getVoiceShortcutsHTML(publicPortalData.practitioners || []);
  }
}

function renderVoiceChannel(clinic, docs, services) {
  return `
    <div style="text-align:center; margin-bottom:20px;">
      <h3 style="margin:0; color:var(--text-primary); font-size:1.3rem;">
        <i class="fas fa-microphone-alt" style="color:#8b5cf6;"></i> Assistant Vocal Interactif IA
      </h3>
      <p style="color:var(--text-muted); font-size:0.85rem; margin-top:4px;">Parlez naturellement à haute voix pour réserver votre consultation.</p>
    </div>

    <!-- Voice Pulse Visualizer -->
    <div style="text-align:center; padding:20px 10px; background:var(--bg-surface); border:1px solid var(--border-color); border-radius:16px; margin-bottom:18px;">
      <div id="voice-pulse-btn" class="voice-pulse-circle" onclick="toggleVoiceListen()" title="Cliquer pour parler ou couper le micro">
        <i class="fas fa-microphone"></i>
      </div>

      <div class="voice-wave" id="voice-wave-anim" style="display:none;">
        <div class="voice-wave-bar"></div>
        <div class="voice-wave-bar"></div>
        <div class="voice-wave-bar"></div>
        <div class="voice-wave-bar"></div>
        <div class="voice-wave-bar"></div>
      </div>

      <div id="voice-status-text" style="font-size:0.88rem; margin-top:10px;">
        Cliquez sur le micro ou répondez directement ci-dessous
      </div>
    </div>

    <!-- Dynamic Quick Voice Shortcuts -->
    <div id="voice-shortcuts-container" style="display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin-bottom:15px;">
      ${getVoiceShortcutsHTML(docs)}
    </div>

    <!-- Dialogue Box -->
    <div id="voice-chat-history" style="max-height:220px; overflow-y:auto; background:var(--bg-primary); border:1px solid var(--border-color); border-radius:12px; padding:12px; margin-bottom:15px;">
      ${voiceTranscriptLog.map(m => `
        <div style="display:flex; justify-content:${m.sender === 'ai' ? 'flex-start' : 'flex-end'}; margin-bottom:10px;">
          <div style="max-width:85%; padding:10px 14px; border-radius:12px; background:${m.sender === 'ai' ? 'var(--bg-surface)' : 'var(--primary)'}; color:${m.sender === 'ai' ? 'var(--text-primary)' : '#fff'}; border:1px solid var(--border-color); font-size:0.88rem; line-height:1.4;">
            <div style="font-size:0.7rem; font-weight:700; opacity:0.7; margin-bottom:3px;">
              ${m.sender === 'ai' ? '<i class="fas fa-robot"></i> Assistant Vocal IA' : '<i class="fas fa-user"></i> Vous (Voix)'}
            </div>
            ${m.text}
          </div>
        </div>
      `).join('')}
    </div>

    ${voicePendingBooking ? `
      <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:12px; padding:14px 16px; margin-bottom:15px; text-align:center;">
        <div style="font-size:0.88rem; color:#065f46; font-weight:600; margin-bottom:10px;">
          <i class="fas fa-clipboard-check"></i> Récapitulatif prêt — confirmez pour réserver
        </div>
        <button class="btn btn-primary" onclick="confirmVoiceAgentBooking()" style="background:#059669; border-color:#059669; font-weight:700; padding:10px 22px;">
          <i class="fas fa-check-circle"></i> Confirmer mon rendez-vous
        </button>
      </div>
    ` : ''}

    <!-- Manual Text fallback for voice -->
    <form onsubmit="event.preventDefault(); const inp=document.getElementById('voice-manual-input'); handleVoiceTranscript(inp.value); inp.value='';" style="display:flex; gap:8px;">
      <input type="text" id="voice-manual-input" class="form-control" placeholder="Ou tapez votre réponse ici si le micro n'est pas autorisé..." style="font-size:0.88rem;" />
      <button type="submit" class="btn btn-primary" style="background:#8b5cf6; border-color:#8b5cf6; padding:0 18px;">
        <i class="fas fa-paper-plane"></i>
      </button>
    </form>
  `;
}

// ----------------------------------------------------------------------------
// Channel 3: WhatsApp Interactive Chat
// ----------------------------------------------------------------------------
function initWhatsAppConversation() {
  waStep = 0;
  waMessages = [
    {
      sender: 'bot',
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      text: `👋 Salam / Bonjour ! Bienvenue sur le service de prise de rendez-vous WhatsApp de **${publicPortalData.clinic.name}**.\n\nAvez-vous déjà un **Code Patient** unique chez nous ?`,
      quickReplies: [
        { label: '✅ Oui, j\'ai mon code', action: () => handleWhatsAppUserAnswer('Oui, j\'ai un code patient') },
        { label: '🆕 Nouveau Patient', action: () => handleWhatsAppUserAnswer('Nouveau Patient') }
      ]
    }
  ];
}

function handleWhatsAppUserAnswer(text) {
  const timeNow = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  waMessages.push({ sender: 'user', time: timeNow, text });
  renderWhatsAppMessages();

  setTimeout(() => {
    processWhatsAppFlow(text);
  }, 400);
}

async function processWhatsAppFlow(userInput) {
  const timeNow = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  const clinic = publicPortalData.clinic;
  const docs = publicPortalData.practitioners || [];
  const services = publicPortalData.services || [];
  const text = userInput.toLowerCase();

  if (waStep === 0) {
    if (text.includes('oui') || text.includes('code') || text.includes('sm-')) {
      waPatientData.is_existing = true;
      waStep = 1;
      waMessages.push({
        sender: 'bot',
        time: timeNow,
        text: `Parfait ! Veuillez saisir votre **Code Patient Unique** (ex: **SM-4821**) :`,
        quickReplies: [
          { label: 'SM-4821', action: () => handleWhatsAppUserAnswer('SM-4821') },
          { label: 'SM-1042', action: () => handleWhatsAppUserAnswer('SM-1042') }
        ]
      });
    } else {
      waPatientData.is_existing = false;
      waStep = 2;
      waMessages.push({
        sender: 'bot',
        time: timeNow,
        text: `Bienvenue parmi nous ! Pour créer votre dossier :\n\n• Prénom et Nom\n• Téléphone mobile (Wave / Orange Money)\n\n*(Acompte de 2 000 FCFA déductible de votre consultation)*`,
        quickReplies: [
          { label: 'Mame Mbaye - 77 123 45 67', action: () => handleWhatsAppUserAnswer('Mame Mbaye 771234567') }
        ]
      });
    }
  } else if (waStep === 1) {
    // Existing code input
    const codeMatch = userInput.match(/SM-?\s*(\d{4})/i) || userInput.match(/(\d{4})/);
    const rawNum = codeMatch ? (codeMatch[1] || codeMatch[0]) : userInput.replace(/[^0-9]/g, '');
    waPatientData.code = rawNum.length === 4 ? `SM-${rawNum}` : userInput.toUpperCase().trim();

    waStep = 2;
    waMessages.push({
      sender: 'bot',
      time: timeNow,
      text: `Code **${waPatientData.code}** reçu.\nPour valider votre identité, veuillez indiquer votre **Prénom et Nom** :`,
      quickReplies: [
        { label: 'Mame Mbaye', action: () => handleWhatsAppUserAnswer('Mame Mbaye') },
        { label: 'Fatou Sow', action: () => handleWhatsAppUserAnswer('Fatou Sow') }
      ]
    });
  } else if (waStep === 2) {
    // Name & phone provided
    const { firstName, lastName, phone } = parseNameAndPhoneFromInput(userInput);
    waPatientData.first_name = firstName;
    waPatientData.last_name = lastName;
    if (phone) waPatientData.phone = phone;

    if (waPatientData.is_existing) {
      try {
        const res = await api.request('/public/verify-patient', {
          method: 'POST',
          body: JSON.stringify({
            tenant_slug: clinic.slug,
            patient_code: waPatientData.code,
            first_name: waPatientData.first_name,
            last_name: waPatientData.last_name
          })
        });

        if (res.exists && res.verified) {
          waPatientData.first_name = res.patient.first_name;
          waPatientData.last_name = res.patient.last_name;
        }
      } catch (e) {}
    }

    waStep = 3;
    waMessages.push({
      sender: 'bot',
      time: timeNow,
      text: `✅ Merci **${waPatientData.first_name} ${waPatientData.last_name}**.\n\nQuel praticien ou spécialité souhaitez-vous consulter ?`,
      quickReplies: docs.map(d => ({
        label: `${d.title || 'Dr'} ${d.last_name} (${d.specialty_name || 'Spécialiste'})`,
        action: () => {
          const { doc, service } = matchDoctorAndServiceFromInput(d.last_name, docs, services);
          waPatientData.doc_id = doc ? doc.id : d.id;
          waPatientData.service_id = service ? service.id : null;
          handleWhatsAppUserAnswer(`${d.title || 'Dr'} ${d.first_name} ${d.last_name}`);
        }
      }))
    });
  } else if (waStep === 3) {
    // Practitioner / Specialty chosen -> Pick service & date
    const { doc, service } = matchDoctorAndServiceFromInput(userInput, docs, services);
    if (doc) waPatientData.doc_id = doc.id;
    if (service) waPatientData.service_id = service.id;

    waStep = 4;
    waMessages.push({
      sender: 'bot',
      time: timeNow,
      text: `Consultation : **${service ? service.name : 'Consultation'}** avec **${doc ? ((doc.title || 'Dr') + ' ' + doc.first_name + ' ' + doc.last_name) : 'le médecin'}**.\n\nQuel créneau vous convient le mieux ?`,
      quickReplies: [
        { label: '📅 Aujourd\'hui à 10:00', action: () => { waPatientData.date = getTodayDateStr(); waPatientData.time = '10:00'; handleWhatsAppUserAnswer('Aujourd\'hui à 10:00'); } },
        { label: '📅 Aujourd\'hui à 15:00', action: () => { waPatientData.date = getTodayDateStr(); waPatientData.time = '15:00'; handleWhatsAppUserAnswer('Aujourd\'hui à 15:00'); } },
        { label: '📅 Demain à 09:00', action: () => {
          const t = new Date(); t.setDate(t.getDate()+1);
          waPatientData.date = t.toISOString().split('T')[0];
          waPatientData.time = '09:00';
          handleWhatsAppUserAnswer('Demain à 09:00');
        }}
      ]
    });
  } else if (waStep === 4) {
    // Final booking execution
    waStep = 5;
    waMessages.push({
      sender: 'bot',
      time: timeNow,
      text: `⏳ Validation et enregistrement de votre rendez-vous en cours...`
    });
    renderWhatsAppMessages();

    try {
      const payload = {
        tenant_slug: clinic.slug,
        practitioner_id: waPatientData.doc_id || docs[0].id,
        medical_service_id: waPatientData.service_id,
        start_time: `${waPatientData.date}T${waPatientData.time}:00`,
        booking_channel: 'WHATSAPP',
        is_new_patient: !waPatientData.is_existing,
        patient_code: waPatientData.code,
        first_name: waPatientData.first_name,
        last_name: waPatientData.last_name,
        phone_number: waPatientData.phone || null,
        gender: waPatientData.gender || 'M',
        date_of_birth: waPatientData.date_of_birth || null
      };

      const res = await api.request('/public/book', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      const confirmText = res.deposit_required > 0
        ? `🎉 **Rendez-vous Pré-réservé !**\n\n• **Code Patient :** ${res.patient.patient_code}\n• **Date :** ${new Date(res.appointment.start_time).toLocaleString('fr-FR')}\n• **Acompte :** 2 000 FCFA via Wave / OM au ${clinic.phone_number || '+221 33 800 00 00'}.\n\nVotre pass numérique a été généré !`
        : `🎉 **Rendez-vous Confirmé avec Succès !**\n\n• **Code Patient :** ${res.patient.patient_code}\n• **Date :** ${new Date(res.appointment.start_time).toLocaleString('fr-FR')}\n• **Acompte :** 0 FCFA (Dossier vérifié).\n\nVotre pass numérique s'affiche !`;

      waMessages.push({
        sender: 'bot',
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        text: confirmText,
        quickReplies: [
          { label: '🎟️ Voir mon Pass Numérique', action: () => renderPublicPortalView(res) }
        ]
      });
      renderWhatsAppMessages();

    } catch (err) {
      waMessages.push({
        sender: 'bot',
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        text: `❌ Erreur : ${err.message}`
      });
      renderWhatsAppMessages();
    }
  }

  renderWhatsAppMessages();
}

function renderWhatsAppMessages() {
  const container = document.getElementById('wa-msg-container');
  if (!container) return;

  container.innerHTML = waMessages.map(m => `
    <div class="wa-msg ${m.sender === 'user' ? 'outgoing' : 'incoming'}">
      <div>${m.text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>
      <div class="wa-time">
        <span>${m.time}</span>
        ${m.sender === 'user' ? '<i class="fas fa-check-double" style="color:#53bdeb; font-size:0.65rem;"></i>' : ''}
      </div>
      ${Array.isArray(m.quickReplies) && m.quickReplies.length > 0 ? `
        <div class="wa-quick-replies">
          ${m.quickReplies.map((qr, idx) => `
            <button type="button" class="wa-chip-btn" onclick="executeWhatsAppQuickReply(${waMessages.indexOf(m)}, ${idx})">
              ${qr.label}
            </button>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `).join('');

  container.scrollTop = container.scrollHeight;
}

function executeWhatsAppQuickReply(msgIndex, replyIndex) {
  const msg = waMessages[msgIndex];
  if (msg && msg.quickReplies && msg.quickReplies[replyIndex]) {
    msg.quickReplies[replyIndex].action();
  }
}

function renderWhatsAppChannel(clinic, docs, services) {
  return `
    <div style="text-align:center; margin-bottom:15px;">
      <h3 style="margin:0; color:var(--text-primary); font-size:1.3rem;">
        <i class="fab fa-whatsapp" style="color:#00a884;"></i> Assistant WhatsApp Écrit
      </h3>
      <p style="color:var(--text-muted); font-size:0.85rem; margin-top:4px;">Discutez instantanément avec le robot WhatsApp de la clinique.</p>
    </div>

    <!-- WhatsApp Phone Mockup Container -->
    <div class="whatsapp-chat-box">
      <!-- Chat Header -->
      <div class="whatsapp-chat-header">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:36px; height:36px; border-radius:50%; background:#00a884; display:flex; align-items:center; justify-content:center; color:#fff; font-size:1.1rem;">
            <i class="fas fa-clinic-medical"></i>
          </div>
          <div>
            <div style="font-weight:700; color:#e9edef; font-size:0.92rem;">${clinic.name} — Rendez-vous</div>
            <div style="font-size:0.72rem; color:#8696a0;"><i class="fas fa-circle" style="color:#00a884; font-size:0.5rem;"></i> En ligne 24h/24</div>
          </div>
        </div>
        <div style="color:#8696a0; font-size:0.9rem;">
          <i class="fas fa-phone-alt" style="margin-right:12px;"></i>
          <i class="fas fa-ellipsis-v"></i>
        </div>
      </div>

      <!-- Messages Stream -->
      <div class="whatsapp-chat-messages" id="wa-msg-container">
        <!-- populated dynamically by renderWhatsAppMessages() -->
      </div>

      <!-- Footer Input -->
      <form class="whatsapp-chat-footer" onsubmit="event.preventDefault(); const inp=document.getElementById('wa-input'); if(inp.value.trim()){ handleWhatsAppUserAnswer(inp.value.trim()); inp.value=''; }">
        <input type="text" id="wa-input" class="form-control" placeholder="Écrivez votre message..." style="background:#2a3942; border:none; color:#fff; font-size:0.88rem; height:38px; border-radius:8px;" />
        <button type="submit" class="btn btn-primary" style="background:#00a884; border-color:#00a884; height:38px; width:40px; padding:0; border-radius:50%; display:flex; align-items:center; justify-content:center;">
          <i class="fas fa-paper-plane" style="font-size:0.85rem;"></i>
        </button>
      </form>
    </div>
  `;
}

function selectPublicDoc(id) {
  publicSelectedDocId = id;
  renderPublicPortalView();
}

function changePublicDate(newDate) {
  publicSelectedDate = newDate;
  renderPublicPortalView();
}

function selectPublicTime(timeStr) {
  publicSelectedTime = timeStr;
  renderPublicPortalView();
}

function setPublicPatientType(type) {
  publicPatientType = type;
  const secExist = document.getElementById('pub-sec-existing');
  const secNew = document.getElementById('pub-sec-new');
  if (secExist && secNew) {
    secExist.style.display = type === 'existing' ? 'block' : 'none';
    secNew.style.display = type === 'new' ? 'block' : 'none';
  }
  renderPublicPortalView();
}

async function verifyPublicPatientCode(slug) {
  const code = (document.getElementById('pub-patient-code') || {}).value || '';
  const first = (document.getElementById('pub-patient-first') || {}).value || '';
  const last = (document.getElementById('pub-patient-last') || {}).value || '';
  const statusDiv = document.getElementById('pub-verification-status');

  if (!code.trim()) {
    showToast('Veuillez saisir votre Code Patient', 'warning');
    return;
  }

  if (statusDiv) {
    statusDiv.innerHTML = '<div style="font-size:0.8rem; color:var(--text-muted); padding:6px;"><i class="fas fa-spinner fa-spin"></i> Vérification...</div>';
  }

  try {
    const res = await api.request('/public/verify-patient', {
      method: 'POST',
      body: JSON.stringify({ tenant_slug: slug, patient_code: code.trim(), first_name: first, last_name: last })
    });

    if (statusDiv) {
      if (res.exists && res.verified) {
        statusDiv.innerHTML = `
          <div style="background:rgba(16, 185, 129, 0.1); border:1px solid #10b981; color:#065f46; padding:8px 10px; border-radius:6px; font-size:0.82rem; margin-top:8px;">
            <i class="fas fa-check-circle" style="color:#10b981;"></i> <strong>${res.patient.first_name} ${res.patient.last_name}</strong> (${res.patient.patient_code})<br/>
            ✅ Dossier vérifié • Acompte : <strong>0 FCFA</strong> (Prise directe)
          </div>
        `;
        document.getElementById('pub-patient-first').value = res.patient.first_name;
        document.getElementById('pub-patient-last').value = res.patient.last_name;
      } else if (res.exists && res.identity_mismatch) {
        statusDiv.innerHTML = `
          <div style="background:rgba(245, 158, 11, 0.1); border:1px solid #f59e0b; color:#92400e; padding:8px 10px; border-radius:6px; font-size:0.82rem; margin-top:8px;">
            <i class="fas fa-exclamation-triangle" style="color:#f59e0b;"></i> ${res.error}
          </div>
        `;
      } else if (res.exists && res.requires_confirmation) {
        statusDiv.innerHTML = `
          <div style="background:rgba(59, 130, 246, 0.1); border:1px solid #3b82f6; color:#1e40af; padding:8px 10px; border-radius:6px; font-size:0.82rem; margin-top:8px;">
            <i class="fas fa-info-circle" style="color:#3b82f6;"></i> Code valide. Renseignez votre Prénom et Nom pour confirmer.
          </div>
        `;
      } else {
        statusDiv.innerHTML = `
          <div style="background:rgba(239, 68, 68, 0.1); border:1px solid #ef4444; color:#991b1b; padding:8px 10px; border-radius:6px; font-size:0.82rem; margin-top:8px;">
            <i class="fas fa-times-circle" style="color:#ef4444;"></i> Code non trouvé. Cliquez sur "Nouveau Patient" si c'est votre première visite.
          </div>
        `;
      }
    }
  } catch (err) {
    if (statusDiv) statusDiv.innerHTML = `<div style="color:red; font-size:0.8rem;">Erreur de connexion</div>`;
  }
}

async function handlePublicBookingSubmit(e) {
  e.preventDefault();
  const slug = publicPortalData.clinic.slug;
  const service_id = document.getElementById('pub-service-id').value;
  const start_time = `${publicSelectedDate}T${publicSelectedTime}:00`;

  let payload = {
    tenant_slug: slug,
    practitioner_id: publicSelectedDocId,
    medical_service_id: service_id,
    start_time,
    booking_channel: 'WEB_PWA'
  };

  if (publicPatientType === 'existing') {
    const code = document.getElementById('pub-patient-code').value.trim();
    const first = document.getElementById('pub-patient-first').value.trim();
    const last = document.getElementById('pub-patient-last').value.trim();
    if (!code) {
      showToast('Veuillez saisir votre Code Patient', 'warning');
      return;
    }
    payload.patient_code = code;
    payload.first_name = first;
    payload.last_name = last;
    payload.is_new_patient = false;
  } else {
    const first = document.getElementById('pub-new-first').value.trim();
    const last = document.getElementById('pub-new-last').value.trim();
    const phone = document.getElementById('pub-new-phone').value.trim();
    const gender = document.getElementById('pub-new-gender').value;
    const dob = document.getElementById('pub-new-dob').value;

    if (!first || !last || !phone) {
      showToast('Prénom, Nom et Téléphone sont obligatoires', 'warning');
      return;
    }
    payload.is_new_patient = true;
    payload.first_name = first;
    payload.last_name = last;
    payload.phone_number = phone;
    payload.gender = gender;
    payload.date_of_birth = dob || '1995-01-01';
  }

  try {
    const res = await api.request('/public/book', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    renderPublicPortalView(res);
  } catch (err) {
    showToast(err.message || 'Échec de la réservation', 'error');
  }
}

function selectPublicDoc(id) {
  publicSelectedDocId = id;
  renderPublicPortalView();
}

function changePublicDate(newDate) {
  publicSelectedDate = newDate;
  renderPublicPortalView();
}

function selectPublicTime(timeStr) {
  publicSelectedTime = timeStr;
  renderPublicPortalView();
}

function setPublicPatientType(type) {
  publicPatientType = type;
  const secExist = document.getElementById('pub-sec-existing');
  const secNew = document.getElementById('pub-sec-new');
  if (secExist && secNew) {
    secExist.style.display = type === 'existing' ? 'block' : 'none';
    secNew.style.display = type === 'new' ? 'block' : 'none';
  }
  renderPublicPortalView();
}

async function verifyPublicPatientCode(slug) {
  const code = (document.getElementById('pub-patient-code') || {}).value || '';
  const first = (document.getElementById('pub-patient-first') || {}).value || '';
  const last = (document.getElementById('pub-patient-last') || {}).value || '';
  const statusDiv = document.getElementById('pub-verification-status');

  if (!code.trim()) {
    showToast('Veuillez saisir votre Code Patient', 'warning');
    return;
  }

  if (statusDiv) {
    statusDiv.innerHTML = '<div style="font-size:0.8rem; color:var(--text-muted); padding:6px;"><i class="fas fa-spinner fa-spin"></i> Vérification...</div>';
  }

  try {
    const res = await api.request('/public/verify-patient', {
      method: 'POST',
      body: JSON.stringify({ tenant_slug: slug, patient_code: code.trim(), first_name: first, last_name: last })
    });

    if (statusDiv) {
      if (res.exists && res.verified) {
        statusDiv.innerHTML = `
          <div style="background:rgba(16, 185, 129, 0.1); border:1px solid #10b981; color:#065f46; padding:8px 10px; border-radius:6px; font-size:0.82rem; margin-top:8px;">
            <i class="fas fa-check-circle" style="color:#10b981;"></i> <strong>${res.patient.first_name} ${res.patient.last_name}</strong> (${res.patient.patient_code})<br/>
            ✅ Dossier vérifié • Acompte : <strong>0 FCFA</strong> (Prise directe)
          </div>
        `;
        document.getElementById('pub-patient-first').value = res.patient.first_name;
        document.getElementById('pub-patient-last').value = res.patient.last_name;
      } else if (res.exists && res.identity_mismatch) {
        statusDiv.innerHTML = `
          <div style="background:rgba(245, 158, 11, 0.1); border:1px solid #f59e0b; color:#92400e; padding:8px 10px; border-radius:6px; font-size:0.82rem; margin-top:8px;">
            <i class="fas fa-exclamation-triangle" style="color:#f59e0b;"></i> ${res.error}
          </div>
        `;
      } else if (res.exists && res.requires_confirmation) {
        statusDiv.innerHTML = `
          <div style="background:rgba(59, 130, 246, 0.1); border:1px solid #3b82f6; color:#1e40af; padding:8px 10px; border-radius:6px; font-size:0.82rem; margin-top:8px;">
            <i class="fas fa-info-circle" style="color:#3b82f6;"></i> Code valide. Renseignez votre Prénom et Nom pour confirmer.
          </div>
        `;
      } else {
        statusDiv.innerHTML = `
          <div style="background:rgba(239, 68, 68, 0.1); border:1px solid #ef4444; color:#991b1b; padding:8px 10px; border-radius:6px; font-size:0.82rem; margin-top:8px;">
            <i class="fas fa-times-circle" style="color:#ef4444;"></i> Code non trouvé. Cliquez sur "Nouveau Patient" si c'est votre première visite.
          </div>
        `;
      }
    }
  } catch (err) {
    if (statusDiv) statusDiv.innerHTML = `<div style="color:red; font-size:0.8rem;">Erreur de connexion</div>`;
  }
}

async function handlePublicBookingSubmit(e) {
  e.preventDefault();
  const slug = publicPortalData.clinic.slug;
  const reasonInput = document.getElementById('pub-consultation-reason');
  const customReason = reasonInput ? reasonInput.value.trim() : (publicConsultationReason || 'Consultation médicale');
  const start_time = `${publicSelectedDate}T${publicSelectedTime}:00`;

  let payload = {
    tenant_slug: slug,
    practitioner_id: publicSelectedDocId,
    medical_service_id: publicSelectedServiceId,
    consultation_reason: customReason,
    start_time,
    booking_channel: 'WEB_PWA'
  };

  if (publicPatientType === 'existing') {
    const code = document.getElementById('pub-patient-code').value.trim();
    const first = document.getElementById('pub-patient-first').value.trim();
    const last = document.getElementById('pub-patient-last').value.trim();
    if (!code) {
      showToast('Veuillez saisir votre Code Patient', 'warning');
      return;
    }
    payload.patient_code = code;
    payload.first_name = first;
    payload.last_name = last;
    payload.is_new_patient = false;
  } else {
    const first = document.getElementById('pub-new-first').value.trim();
    const last = document.getElementById('pub-new-last').value.trim();
    const phone = document.getElementById('pub-new-phone').value.trim();
    const gender = document.getElementById('pub-new-gender').value;
    const dob = document.getElementById('pub-new-dob').value;

    if (!first || !last || !phone) {
      showToast('Prénom, Nom et Téléphone sont obligatoires', 'warning');
      return;
    }
    payload.is_new_patient = true;
    payload.first_name = first;
    payload.last_name = last;
    payload.phone_number = phone;
    payload.gender = gender;
    payload.date_of_birth = dob || '1995-01-01';
  }

  try {
    const res = await api.request('/public/book', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    renderPublicPortalView(res);
  } catch (err) {
    showToast(err.message || 'Échec de la réservation', 'error');
  }
}

// Check auth status and render appropriate layouts
function initApp() {
  const urlParams = new URLSearchParams(window.location.search);
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const hashParts = window.location.hash.replace('#', '').split('/').filter(Boolean);

  if (urlParams.has('reset_token')) {
    const resetToken = urlParams.get('reset_token');
    renderAuthLayout();
    openResetPasswordModal(resetToken);
    return;
  }

  if (pathParts[0] === 'rdv' || hashParts[0] === 'rdv' || urlParams.has('rdv')) {
    const slug = pathParts[1] || hashParts[1] || urlParams.get('rdv') || 'paix';
    renderPublicBookingPortal(slug);
    return;
  }

  if (state.token) {
    // Pre-fetch complete tenant profile
    api.request('/tenant/profile').then(profile => {
      if (profile && profile.id) {
        state.tenant = profile;
        try { localStorage.setItem('tenant', JSON.stringify(profile)); } catch (e) {}
      }
      renderAppLayout();
    }).catch(() => {
      if (state.token) {
        renderAppLayout();
      }
    });

    // Pre-check if any cashier cash session is open
    api.request('/patients').then(() => {
      if (state.user && (state.user.role === 'CASHIER' || state.user.role === 'SUPER_ADMIN')) {
        state.activeCashSession = { id: 'session-simulated-id', opening_balance: 50000 };
      }
    }).catch(() => {});
  } else {
    renderAuthLayout();
  }
}
// ============================================================================
// Hospitalization Tab (Bed, Occupancy History & Structure Management)
// ============================================================================
let activeHospitalSubTab = 'beds';
let hospitalSelectedBedId = null;
let hospitalHistoryFilters = {
  start_date: '',
  end_date: '',
  building_id: '',
  status: '',
  search: ''
};

async function renderHospital(container) {
  const fr = state.currentLang === 'fr';

  let historyQuery = '';
  if (activeHospitalSubTab === 'history') {
    const params = new URLSearchParams();
    if (hospitalHistoryFilters.start_date) params.append('start_date', hospitalHistoryFilters.start_date);
    if (hospitalHistoryFilters.end_date) params.append('end_date', hospitalHistoryFilters.end_date);
    if (hospitalHistoryFilters.building_id) params.append('building_id', hospitalHistoryFilters.building_id);
    if (hospitalHistoryFilters.status) params.append('status', hospitalHistoryFilters.status);
    if (hospitalHistoryFilters.search) params.append('search', hospitalHistoryFilters.search);
    const qs = params.toString();
    if (qs) historyQuery = '?' + qs;
  }

  const [buildings, rooms, beds, activeStays, historyStays] = await Promise.all([
    api.request('/hospital/buildings'),
    api.request('/hospital/rooms'),
    api.request('/hospital/beds'),
    api.request('/hospital/hospitalizations?status=ADMITTED'),
    activeHospitalSubTab === 'history' 
      ? api.request(`/hospital/hospitalizations${historyQuery}`).catch(() => []) 
      : Promise.resolve([])
  ]);

  let subTabContent = '';
  if (activeHospitalSubTab === 'beds') {
    subTabContent = renderBedsDashboard(buildings, rooms, beds, activeStays, fr);
  } else if (activeHospitalSubTab === 'history') {
    subTabContent = renderHospitalHistory(buildings, rooms, beds, historyStays, fr);
  } else {
    subTabContent = renderHospitalSetup(buildings, rooms, beds, fr);
  }

  const buildingOptions = buildings.map(b => `<option value="${b.id}">${escapeHTML(b.name)}</option>`).join('');
  const roomOptions = rooms.map(r => `<option value="${r.id}">${escapeHTML(r.number_or_name)} (${escapeHTML(r.building_name)})</option>`).join('');

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
      <div>
        <h3 style="color:var(--text-primary); font-weight:700; margin:0; display:flex; align-items:center; gap:10px;">
          <i class="fas fa-procedures" style="color:var(--primary);"></i> ${fr ? 'Gestion de l\'Hospitalisation & Séjours' : 'إدارة الاستشفاء والإقامة'}
        </h3>
        <div style="font-size:0.85rem; color:var(--text-muted); margin-top:3px;">
          ${fr ? 'Suivi en temps réel des lits, historique des admissions sur période et configuration de la structure.' : 'متابعة حية للأسرة وسجل الإشغال وإعداد الهيكل الطبي.'}
        </div>
      </div>
    </div>

    <!-- Sub-tab Selector -->
    <div style="display:flex; gap:10px; margin-bottom:20px; border-bottom:1px solid var(--border-color); padding-bottom:10px; flex-wrap:wrap;">
      <button class="btn ${activeHospitalSubTab === 'beds' ? 'btn-primary' : 'btn-secondary'}" onclick="switchHospitalSubTab('beds')" style="font-size:0.9rem; padding: 7px 16px;">
        <i class="fas fa-bed"></i> ${fr ? 'Lits & Hospitalisations' : 'الأسرة والاقامات'}
      </button>
      <button class="btn ${activeHospitalSubTab === 'history' ? 'btn-primary' : 'btn-secondary'}" onclick="switchHospitalSubTab('history')" style="font-size:0.9rem; padding: 7px 16px;">
        <i class="fas fa-history"></i> ${fr ? 'Historique des Occupations' : 'سجل الإشغال والإقامات'}
      </button>
      <button class="btn ${activeHospitalSubTab === 'setup' ? 'btn-primary' : 'btn-secondary'}" onclick="switchHospitalSubTab('setup')" style="font-size:0.9rem; padding: 7px 16px;">
        <i class="fas fa-tools"></i> ${fr ? 'Configuration Structure' : 'إعداد الهيكل'}
      </button>
    </div>

    <div id="hospital-subtab-content">
      ${subTabContent}
    </div>

    <!-- 1. Patient Admission Modal -->
    <div class="modal-overlay" id="admit-modal" style="display:none; justify-content:center; align-items:center;">
      <div class="modal-container" style="width:480px; max-width:95%; animation: modalFadeIn 0.3s ease;">
        <div class="modal-header" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:15px;">
          <h4 class="modal-title" style="margin:0; color:var(--text-primary); font-weight:600;"><i class="fas fa-user-plus" style="color:var(--primary); margin-right:6px;"></i> ${fr ? 'Admettre un Patient en Hospitalisation' : 'إدخال مريض جديد'}</h4>
          <button class="modal-close" onclick="closeAdmitModal()" style="background:none; border:none; color:var(--text-muted); font-size:1.4rem; cursor:pointer;">&times;</button>
        </div>
        <form onsubmit="saveAdmission(event)">
          <div class="form-group">
            <label class="form-label">${fr ? 'Sélectionner le Patient' : 'اختر المريض'} *</label>
            <select class="form-control" id="admit-patient-select" required>
              <option value="">-- ${fr ? 'Choisir un patient' : 'اختر مريضاً'} --</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">${fr ? 'Date & Heure d\'Admission (Début)' : 'تاريخ ووقت بداية الإقامة'} *</label>
            <input type="datetime-local" class="form-control" id="admit-date" required />
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:3px;">
              <i class="fas fa-info-circle"></i> Vous pouvez modifier cette date si l'admission effective a eu lieu plus tôt.
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Notes d'admission (Motif / Diagnostic initial)</label>
            <textarea class="form-control" id="admit-notes" rows="3" placeholder="Notes optionnelles..."></textarea>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px; border-top:1px solid var(--border-color); padding-top:12px;">
            <button class="btn btn-secondary" type="button" onclick="closeAdmitModal()">${fr ? 'Annuler' : 'إلغاء'}</button>
            <button class="btn btn-primary" type="submit">${fr ? 'Confirmer l\'Admission' : 'تأكيد الدخول'}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 2. Edit Building Modal -->
    <div class="modal-overlay" id="edit-building-modal" style="display:none; justify-content:center; align-items:center;">
      <div class="modal-container" style="width:420px; max-width:95%;">
        <div class="modal-header" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:15px;">
          <h4 class="modal-title" style="margin:0; color:var(--text-primary); font-weight:600;"><i class="fas fa-edit" style="color:var(--primary); margin-right:6px;"></i> ${fr ? 'Modifier le Bâtiment' : 'تعديل المبنى'}</h4>
          <button class="modal-close" onclick="closeEditBuildingModal()" style="background:none; border:none; color:var(--text-muted); font-size:1.4rem; cursor:pointer;">&times;</button>
        </div>
        <form onsubmit="saveEditBuilding(event)">
          <input type="hidden" id="edit-build-id" />
          <div class="form-group">
            <label class="form-label">${fr ? 'Nom du Bâtiment (unique)' : 'اسم المبنى'} *</label>
            <input type="text" class="form-control" id="edit-build-name" required />
          </div>
          <div class="form-group">
            <label class="form-label">${fr ? 'Code (facultatif)' : 'رمز المبنى'}</label>
            <input type="text" class="form-control" id="edit-build-code" />
          </div>
          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px; border-top:1px solid var(--border-color); padding-top:12px;">
            <button class="btn btn-secondary" type="button" onclick="closeEditBuildingModal()">${fr ? 'Annuler' : 'إلغاء'}</button>
            <button class="btn btn-primary" type="submit">${fr ? 'Enregistrer' : 'حفظ'}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 3. Edit Room Modal -->
    <div class="modal-overlay" id="edit-room-modal" style="display:none; justify-content:center; align-items:center;">
      <div class="modal-container" style="width:450px; max-width:95%;">
        <div class="modal-header" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:15px;">
          <h4 class="modal-title" style="margin:0; color:var(--text-primary); font-weight:600;"><i class="fas fa-edit" style="color:var(--primary); margin-right:6px;"></i> ${fr ? 'Modifier la Chambre' : 'تعديل الغرفة'}</h4>
          <button class="modal-close" onclick="closeEditRoomModal()" style="background:none; border:none; color:var(--text-muted); font-size:1.4rem; cursor:pointer;">&times;</button>
        </div>
        <form onsubmit="saveEditRoom(event)">
          <input type="hidden" id="edit-room-id" />
          <div class="form-group">
            <label class="form-label">${fr ? 'Bâtiment' : 'المبنى'} *</label>
            <select class="form-control" id="edit-room-building-id" required>
              ${buildingOptions}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">${fr ? 'Nom / Numéro de Chambre' : 'اسم / رقم الغرفة'} *</label>
            <input type="text" class="form-control" id="edit-room-number" required />
          </div>
          <div class="form-group">
            <label class="form-label">${fr ? 'Type de Chambre' : 'نوع الغرفة'}</label>
            <select class="form-control" id="edit-room-type" required>
              <option value="STANDARD">STANDARD</option>
              <option value="VIP">VIP</option>
              <option value="SOINS_INTENSIFS">SOINS INTENSIFS (ICU)</option>
              <option value="MATERNITE">MATERNITÉ</option>
            </select>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px; border-top:1px solid var(--border-color); padding-top:12px;">
            <button class="btn btn-secondary" type="button" onclick="closeEditRoomModal()">${fr ? 'Annuler' : 'إلغاء'}</button>
            <button class="btn btn-primary" type="submit">${fr ? 'Enregistrer' : 'حفظ'}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 4. Edit Bed Modal -->
    <div class="modal-overlay" id="edit-bed-modal" style="display:none; justify-content:center; align-items:center;">
      <div class="modal-container" style="width:480px; max-width:95%;">
        <div class="modal-header" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:15px;">
          <h4 class="modal-title" style="margin:0; color:var(--text-primary); font-weight:600;"><i class="fas fa-edit" style="color:var(--primary); margin-right:6px;"></i> ${fr ? 'Modifier le Lit' : 'تعديل السرير'}</h4>
          <button class="modal-close" onclick="closeEditBedModal()" style="background:none; border:none; color:var(--text-muted); font-size:1.4rem; cursor:pointer;">&times;</button>
        </div>
        <form onsubmit="saveEditBed(event)">
          <input type="hidden" id="edit-bed-id" />
          <div class="form-group">
            <label class="form-label">${fr ? 'Chambre / Salle' : 'الغرفة / القاعة'} *</label>
            <select class="form-control" id="edit-bed-room-id" required>
              ${roomOptions}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">${fr ? 'Nom / Numéro de Lit' : 'اسم / رقم السرير'} *</label>
            <input type="text" class="form-control" id="edit-bed-name" required />
          </div>
          <div class="form-group">
            <label class="form-label">${fr ? 'Luxe / Classe' : 'الفئة والدرجة'}</label>
            <select class="form-control" id="edit-bed-luxury" required>
              <option value="STANDARD">STANDARD</option>
              <option value="CONFORT">CONFORT</option>
              <option value="VIP">VIP</option>
              <option value="SUITE">SUITE</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">${fr ? 'Tarif journalier d\'hébergement (XOF)' : 'السعر اليومي (XOF)'} *</label>
            <input type="number" class="form-control" id="edit-bed-rate" min="0" required />
          </div>
          <div class="form-group">
            <label class="form-label">${fr ? 'Statut Opérationnel' : 'الحالة التشغيلية'}</label>
            <select class="form-control" id="edit-bed-status" required>
              <option value="AVAILABLE">${fr ? 'Disponible' : 'متاح'}</option>
              <option value="MAINTENANCE">${fr ? 'En entretien / Hors service' : 'تحت الصيانة'}</option>
              <option value="OCCUPIED" disabled>${fr ? 'Occupé (Géré via admission)' : 'مشغول'}</option>
            </select>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px; border-top:1px solid var(--border-color); padding-top:12px;">
            <button class="btn btn-secondary" type="button" onclick="closeEditBedModal()">${fr ? 'Annuler' : 'إلغاء'}</button>
            <button class="btn btn-primary" type="submit">${fr ? 'Enregistrer' : 'حفظ'}</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function switchHospitalSubTab(subtab) {
  activeHospitalSubTab = subtab;
  navigate('hospital');
}

function renderBedsDashboard(buildings, rooms, beds, stays, fr) {
  if (beds.length === 0) {
    return `
      <div class="card" style="text-align:center; padding:40px; color:var(--text-muted);">
        <i class="fas fa-bed fa-3x" style="margin-bottom:15px; opacity:0.5;"></i>
        <h4>${fr ? 'Aucun lit configuré dans l\'établissement.' : 'لا توجد أسرة مجهزة بعد.'}</h4>
        <p>${fr ? 'Veuillez utiliser l\'onglet "Configuration Structure" pour créer vos bâtiments, chambres et lits.' : 'يرجى الانتقال لعلامة التبويب إعداد الهيكل لإنشاء المباني والغرف والأسرة.'}</p>
      </div>
    `;
  }

  const structure = {};
  for (const b of buildings) {
    structure[b.id] = { name: b.name, code: b.code, rooms: {} };
  }
  for (const r of rooms) {
    if (structure[r.building_id]) {
      structure[r.building_id].rooms[r.id] = { number_or_name: r.number_or_name, room_type: r.room_type, beds: [] };
    }
  }
  for (const b of beds) {
    const roomRes = rooms.find(r => r.id === b.room_id);
    if (roomRes && structure[roomRes.building_id] && structure[roomRes.building_id].rooms[b.room_id]) {
      const stay = b.status === 'OCCUPIED' ? stays.find(s => s.bed_id === b.id) : null;
      structure[roomRes.building_id].rooms[b.room_id].beds.push({ ...b, stay });
    }
  }

  return Object.values(structure).map(b => {
    const roomsHtml = Object.values(b.rooms).map(r => {
      if (r.beds.length === 0) return '';
      
      const bedsHtml = r.beds.map(bed => {
        const isOccupied = bed.status === 'OCCUPIED';
        const isMaintenance = bed.status === 'MAINTENANCE';
        
        let statusBadge = '';
        let colorTheme = 'var(--success)';
        let btnHtml = '';
        let occupantHtml = '';

        if (isOccupied) {
          colorTheme = 'var(--danger)';
          statusBadge = `<span class="badge" style="background-color:var(--danger); color:white; font-size:0.7rem; padding:2px 6px; border-radius:12px;">${fr ? 'Occupé' : 'مشغول'}</span>`;
          
          if (bed.stay) {
            const admittedDate = new Date(bed.stay.admitted_at);
            const days = Math.max(1, Math.ceil((new Date() - admittedDate) / (1000 * 60 * 60 * 24)));
            occupantHtml = `
              <div style="font-size:0.8rem; margin-top:8px; border-top:1px dashed var(--border-color); padding-top:8px; color:var(--text-primary);">
                <div style="cursor:pointer;" onclick="openPatientDossierModal('${bed.stay.patient_id}')" title="${fr ? 'Consulter le dossier médical' : 'عرض الملف الطبي'}">
                  <i class="fas fa-user-injured" style="color:var(--primary); margin-right:4px;"></i> <strong>${escapeHTML(bed.stay.patient_first_name)} ${escapeHTML(bed.stay.patient_last_name)}</strong>
                </div>
                <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">
                  Admis: ${admittedDate.toLocaleDateString('fr-FR')} (${days} j)
                </div>
              </div>
            `;
            btnHtml = `<button class="btn btn-danger" style="width:100%; font-size:0.8rem; margin-top:10px; background-color:var(--danger);" onclick="dischargeAndInvoice('${bed.stay.id}', '${escapeHTML(bed.name)}')"><i class="fas fa-sign-out-alt"></i> Libérer & Facturer</button>`;
          } else {
            occupantHtml = `<div style="font-size:0.8rem; color:var(--text-muted); margin-top:8px;">Occupé (Détails RLS masqués)</div>`;
            btnHtml = `<button class="btn btn-secondary" style="width:100%; font-size:0.8rem; margin-top:10px;" disabled>Occupé</button>`;
          }
        } else if (isMaintenance) {
          colorTheme = 'var(--warning)';
          statusBadge = `<span class="badge" style="background-color:var(--warning); color:black; font-size:0.7rem; padding:2px 6px; border-radius:12px;">Entretien</span>`;
          btnHtml = `<button class="btn btn-secondary" style="width:100%; font-size:0.8rem; margin-top:10px;" onclick="openEditBedModal('${bed.id}', '${bed.room_id}', '${escapeHTML(bed.name)}', '${bed.luxury_level}', ${bed.daily_rate}, '${bed.status}')"><i class="fas fa-tools"></i> Remettre en service</button>`;
        } else {
          statusBadge = `<span class="badge" style="background-color:var(--primary); color:white; font-size:0.7rem; padding:2px 6px; border-radius:12px;">${fr ? 'Disponible' : 'متاح'}</span>`;
          btnHtml = `<button class="btn btn-primary" style="width:100%; font-size:0.8rem; margin-top:10px;" onclick="openAdmitModal('${bed.id}')"><i class="fas fa-check"></i> Admettre</button>`;
        }

        return `
          <div class="card" style="border-top: 4px solid ${colorTheme}; display:flex; flex-direction:column; justify-content:space-between; padding:12px; min-height:165px; background-color:var(--bg-surface);">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <h5 style="margin:0; font-size:1rem; font-weight:600; color:var(--text-primary);"><i class="fas fa-bed"></i> ${escapeHTML(bed.name)}</h5>
                ${statusBadge}
              </div>
              <div style="font-size:0.8rem; color:var(--text-muted); margin-top:5px;">
                ${bed.luxury_level} | <strong>${parseFloat(bed.daily_rate).toLocaleString()} XOF/j</strong>
              </div>
              ${occupantHtml}
            </div>
            ${btnHtml}
          </div>
        `;
      }).join('');

      return `
        <div style="margin-bottom:20px;">
          <h5 style="font-size:0.95rem; color:var(--text-primary); font-weight:600; border-bottom:1px dashed var(--border-color); padding-bottom:6px; margin-bottom:12px;">
            <i class="fas fa-door-open" style="color:var(--primary);"></i> ${escapeHTML(r.number_or_name)} <span style="font-size:0.8rem; font-weight:400; color:var(--text-muted);">(${r.room_type})</span>
          </h5>
          <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap:15px;">
            ${bedsHtml}
          </div>
        </div>
      `;
    }).join('');

    if (roomsHtml.replace(/\s/g, '') === '') return '';

    return `
      <div class="card" style="margin-bottom:24px; padding:20px;">
        <h4 style="margin-top:0; margin-bottom:15px; font-weight:700; color:var(--text-primary); font-size:1.15rem; display:flex; align-items:center; gap:8px;">
          <i class="fas fa-building" style="color:var(--primary);"></i> ${escapeHTML(b.name)} ${b.code ? `<span style="font-size:0.85rem; font-weight:400; color:var(--text-muted);">(${escapeHTML(b.code)})</span>` : ''}
        </h4>
        ${roomsHtml}
      </div>
    `;
  }).join('');
}

function renderHospitalHistory(buildings, rooms, beds, historyStays, fr) {
  // Compute analytics
  const totalStays = historyStays.length;
  const activeCount = historyStays.filter(s => s.status === 'ADMITTED').length;
  const dischargedCount = historyStays.filter(s => s.status === 'DISCHARGED').length;
  const totalDays = historyStays.reduce((acc, s) => acc + (parseInt(s.duration_days) || 1), 0);
  const totalCost = historyStays.reduce((acc, s) => acc + (parseFloat(s.calculated_cost) || 0), 0);

  const buildingFilterOptions = buildings.map(b => 
    `<option value="${b.id}" ${hospitalHistoryFilters.building_id === b.id ? 'selected' : ''}>${escapeHTML(b.name)}</option>`
  ).join('');

  const rowsHtml = historyStays.length === 0
    ? `<tr><td colspan="8" style="text-align:center; padding:40px; color:var(--text-muted);">
        <i class="fas fa-history fa-2x" style="margin-bottom:10px; opacity:0.4;"></i>
        <div>${fr ? 'Aucun séjour hospitalier trouvé pour cette période ou ces critères.' : 'لا توجد سجلات إشغال للفترة المحددة.'}</div>
       </td></tr>`
    : historyStays.map(s => {
        const isAdmitted = s.status === 'ADMITTED';
        const admittedAt = new Date(s.admitted_at);
        const dischargedAt = s.discharged_at ? new Date(s.discharged_at) : null;
        const cost = parseFloat(s.calculated_cost) || 0;

        return `
          <tr style="border-bottom:1px solid var(--border-color);">
            <td style="padding:12px;">
              <div style="font-weight:600; color:var(--text-primary); cursor:pointer;" onclick="openPatientDossierModal('${s.patient_id}')">
                <i class="fas fa-user-injured" style="color:var(--primary); margin-right:4px;"></i>
                ${escapeHTML(s.patient_first_name)} ${escapeHTML(s.patient_last_name)}
              </div>
              <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">
                Code: <strong>${escapeHTML(s.patient_code || '-')}</strong> ${s.patient_phone ? `| Tél: ${escapeHTML(s.patient_phone)}` : ''}
              </div>
            </td>
            <td style="padding:12px;">
              <div style="font-weight:600; color:var(--text-primary);">
                <i class="fas fa-bed" style="color:var(--primary); font-size:0.85rem;"></i> ${escapeHTML(s.bed_name)}
              </div>
              <div style="font-size:0.75rem; color:var(--text-muted);">
                ${escapeHTML(s.building_name || '')} &bull; ${escapeHTML(s.room_name || '')} (${s.luxury_level || 'STANDARD'})
              </div>
            </td>
            <td style="padding:12px; font-size:0.85rem; color:var(--text-secondary);">
              <div>${admittedAt.toLocaleDateString('fr-FR')}</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">${admittedAt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
            </td>
            <td style="padding:12px; font-size:0.85rem; color:var(--text-secondary);">
              ${dischargedAt ? `
                <div>${dischargedAt.toLocaleDateString('fr-FR')}</div>
                <div style="font-size:0.75rem; color:var(--text-muted);">${dischargedAt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
              ` : `<span class="badge" style="background-color:rgba(239, 68, 68, 0.1); color:var(--danger); border:1px solid var(--danger); font-size:0.75rem;">${fr ? 'En cours' : 'مستمرة'}</span>`}
            </td>
            <td style="padding:12px; text-align:center;">
              <span class="badge" style="background:var(--bg-main); font-weight:700; font-size:0.85rem; color:var(--text-primary); border:1px solid var(--border-color);">
                ${s.duration_days} ${fr ? 'j' : 'يوم'}
              </span>
            </td>
            <td style="padding:12px; font-size:0.85rem;">
              <div style="font-weight:700; color:var(--primary); font-size:0.9rem;">
                ${cost.toLocaleString()} XOF
              </div>
              <div style="font-size:0.75rem; color:var(--text-muted);">
                ${parseFloat(s.daily_rate).toLocaleString()} XOF/j
              </div>
            </td>
            <td style="padding:12px;">
              ${isAdmitted 
                ? `<span class="badge" style="background-color:var(--danger); color:white; font-size:0.75rem; padding:3px 8px; border-radius:12px;">${fr ? 'Hospitalisé' : 'مقيد بالقسم'}</span>`
                : `<span class="badge" style="background-color:var(--success); color:white; font-size:0.75rem; padding:3px 8px; border-radius:12px;">${fr ? 'Libéré' : 'مغادر'}</span>`
              }
            </td>
            <td style="padding:12px; text-align:right;">
              <div style="display:inline-flex; gap:6px;">
                <button class="btn btn-secondary" style="padding:4px 8px; font-size:0.8rem;" title="${fr ? 'Consulter le dossier médical' : 'عرض الملف الطبي'}" onclick="openPatientDossierModal('${s.patient_id}')">
                  <i class="fas fa-folder-open"></i> ${fr ? 'Dossier' : 'الملف'}
                </button>
                ${isAdmitted ? `
                  <button class="btn btn-danger" style="padding:4px 8px; font-size:0.8rem;" title="${fr ? 'Libérer et générer la facture' : 'إنهاء الإقامة والفوترة'}" onclick="dischargeAndInvoice('${s.id}', '${escapeHTML(s.bed_name)}')">
                    <i class="fas fa-sign-out-alt"></i> ${fr ? 'Libérer' : 'خروج'}
                  </button>
                ` : ''}
              </div>
            </td>
          </tr>
        `;
      }).join('');

  return `
    <!-- Top Period & Filters Control Box -->
    <div class="card" style="padding:18px; margin-bottom:20px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; flex-wrap:wrap; gap:10px;">
        <h4 style="margin:0; font-size:1.05rem; font-weight:600; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
          <i class="fas fa-filter" style="color:var(--primary);"></i> ${fr ? 'Filtres de Période & Recherche d\'Occupations' : 'فلاتر الفترة والبحث'}
        </h4>
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          <button class="btn btn-secondary" style="font-size:0.8rem; padding:4px 10px;" onclick="setHospitalHistoryPreset('today')">${fr ? 'Aujourd\'hui' : 'اليوم'}</button>
          <button class="btn btn-secondary" style="font-size:0.8rem; padding:4px 10px;" onclick="setHospitalHistoryPreset('week')">${fr ? '7 Derniers Jours' : 'آخر 7 أيام'}</button>
          <button class="btn btn-secondary" style="font-size:0.8rem; padding:4px 10px;" onclick="setHospitalHistoryPreset('month')">${fr ? 'Ce Mois' : 'هذا الشهر'}</button>
          <button class="btn btn-secondary" style="font-size:0.8rem; padding:4px 10px;" onclick="setHospitalHistoryPreset('all')">${fr ? 'Tout l\'Historique' : 'كامل السجل'}</button>
        </div>
      </div>

      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:15px;">
        <div class="form-group" style="margin:0;">
          <label class="form-label" style="font-size:0.8rem;">${fr ? 'Du (Date début)' : 'من تاريخ'}</label>
          <input type="date" class="form-control" id="hosp-filter-start" value="${hospitalHistoryFilters.start_date}" onchange="updateHospitalHistoryFilter('start_date', this.value)" />
        </div>
        <div class="form-group" style="margin:0;">
          <label class="form-label" style="font-size:0.8rem;">${fr ? 'Au (Date fin)' : 'إلى تاريخ'}</label>
          <input type="date" class="form-control" id="hosp-filter-end" value="${hospitalHistoryFilters.end_date}" onchange="updateHospitalHistoryFilter('end_date', this.value)" />
        </div>
        <div class="form-group" style="margin:0;">
          <label class="form-label" style="font-size:0.8rem;">${fr ? 'Bâtiment' : 'المبنى'}</label>
          <select class="form-control" id="hosp-filter-building" onchange="updateHospitalHistoryFilter('building_id', this.value)">
            <option value="">-- ${fr ? 'Tous les bâtiments' : 'جميع المباني'} --</option>
            ${buildingFilterOptions}
          </select>
        </div>
        <div class="form-group" style="margin:0;">
          <label class="form-label" style="font-size:0.8rem;">${fr ? 'Statut du Séjour' : 'حالة الإقامة'}</label>
          <select class="form-control" id="hosp-filter-status" onchange="updateHospitalHistoryFilter('status', this.value)">
            <option value="" ${!hospitalHistoryFilters.status ? 'selected' : ''}>-- ${fr ? 'Tous les statuts' : 'جميع الحالات'} --</option>
            <option value="ADMITTED" ${hospitalHistoryFilters.status === 'ADMITTED' ? 'selected' : ''}>${fr ? 'En cours (Hospitalisé)' : 'مقيم حالياً'}</option>
            <option value="DISCHARGED" ${hospitalHistoryFilters.status === 'DISCHARGED' ? 'selected' : ''}>${fr ? 'Libéré (Sorti)' : 'تمت المغادرة'}</option>
          </select>
        </div>
        <div class="form-group" style="margin:0;">
          <label class="form-label" style="font-size:0.8rem;">${fr ? 'Recherche Patient / Lit' : 'بحث المريض أو السرير'}</label>
          <input type="text" class="form-control" id="hosp-filter-search" placeholder="ex: Nom, code, Lit A..." value="${escapeHTML(hospitalHistoryFilters.search)}" oninput="updateHospitalHistoryFilter('search', this.value)" />
        </div>
      </div>
    </div>

    <!-- Analytics KPI Cards -->
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:15px; margin-bottom:20px;">
      <div class="card" style="padding:15px; border-left:4px solid var(--primary);">
        <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600;">${fr ? 'Total Séjours' : 'إجمالي الإقامات'}</div>
        <div style="font-size:1.6rem; font-weight:700; color:var(--text-primary); margin-top:5px;">
          ${totalStays} <span style="font-size:0.85rem; font-weight:400; color:var(--text-muted);">(${activeCount} ${fr ? 'en cours' : 'حالي'})</span>
        </div>
      </div>
      <div class="card" style="padding:15px; border-left:4px solid var(--danger);">
        <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600;">${fr ? 'Patients Actuellement Admis' : 'المرضى المقيمون الآن'}</div>
        <div style="font-size:1.6rem; font-weight:700; color:var(--danger); margin-top:5px;">
          ${activeCount}
        </div>
      </div>
      <div class="card" style="padding:15px; border-left:4px solid var(--info);">
        <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600;">${fr ? 'Total Journées d\'Occupation' : 'إجمالي أيام الإشغال'}</div>
        <div style="font-size:1.6rem; font-weight:700; color:var(--info); margin-top:5px;">
          ${totalDays} <span style="font-size:0.85rem; font-weight:400; color:var(--text-muted);">${fr ? 'jours' : 'أيام'}</span>
        </div>
      </div>
      <div class="card" style="padding:15px; border-left:4px solid var(--success);">
        <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600;">${fr ? 'Chiffre d\'Affaires Séjours' : 'إجمالي إيراد الإقامة'}</div>
        <div style="font-size:1.6rem; font-weight:700; color:var(--success); margin-top:5px;">
          ${totalCost.toLocaleString()} <span style="font-size:0.85rem; font-weight:400; color:var(--text-muted);">XOF</span>
        </div>
      </div>
    </div>

    <!-- Detailed History Table -->
    <div class="card" style="padding:0; overflow:hidden;">
      <div style="padding:15px 20px; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <h4 style="margin:0; font-size:1.05rem; font-weight:600; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
          <i class="fas fa-list" style="color:var(--primary);"></i> ${fr ? 'Historique Détaillé des Séjours & Occupations' : 'سجل تفاصيل الإقامات والإشغال'}
        </h4>
        <span class="badge" style="background:var(--bg-main); color:var(--text-secondary); border:1px solid var(--border-color);">
          ${historyStays.length} ${fr ? 'séjour(s) affiché(s)' : 'سجل'}
        </span>
      </div>
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; font-size:0.9rem; text-align:left;">
          <thead>
            <tr style="background:var(--bg-main); border-bottom:1px solid var(--border-color); color:var(--text-muted); font-size:0.8rem; text-transform:uppercase;">
              <th style="padding:12px;">${fr ? 'Patient' : 'المريض'}</th>
              <th style="padding:12px;">${fr ? 'Lit & Chambre' : 'السرير والغرفة'}</th>
              <th style="padding:12px;">${fr ? 'Admission' : 'الدخول'}</th>
              <th style="padding:12px;">${fr ? 'Sortie' : 'الخروج'}</th>
              <th style="padding:12px; text-align:center;">${fr ? 'Durée' : 'المدة'}</th>
              <th style="padding:12px;">${fr ? 'Frais de Séjour' : 'التكلفة'}</th>
              <th style="padding:12px;">${fr ? 'Statut' : 'الحالة'}</th>
              <th style="padding:12px; text-align:right;">${fr ? 'Actions' : 'إجراءات'}</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function updateHospitalHistoryFilter(key, value) {
  hospitalHistoryFilters[key] = value;
  // Debounce if typing search
  if (key === 'search') {
    if (window._hospSearchTimer) clearTimeout(window._hospSearchTimer);
    window._hospSearchTimer = setTimeout(() => {
      navigate('hospital');
    }, 350);
  } else {
    navigate('hospital');
  }
}

function setHospitalHistoryPreset(preset) {
  const now = new Date();
  if (preset === 'today') {
    const todayStr = now.toISOString().slice(0, 10);
    hospitalHistoryFilters.start_date = todayStr;
    hospitalHistoryFilters.end_date = todayStr;
  } else if (preset === 'week') {
    const weekAgo = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
    hospitalHistoryFilters.start_date = weekAgo.toISOString().slice(0, 10);
    hospitalHistoryFilters.end_date = now.toISOString().slice(0, 10);
  } else if (preset === 'month') {
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    hospitalHistoryFilters.start_date = firstDay.toISOString().slice(0, 10);
    hospitalHistoryFilters.end_date = now.toISOString().slice(0, 10);
  } else if (preset === 'all') {
    hospitalHistoryFilters.start_date = '';
    hospitalHistoryFilters.end_date = '';
    hospitalHistoryFilters.building_id = '';
    hospitalHistoryFilters.status = '';
    hospitalHistoryFilters.search = '';
  }
  navigate('hospital');
}

function renderHospitalSetup(buildings, rooms, beds, fr) {
  const buildingOptions = buildings.map(b => `<option value="${b.id}">${escapeHTML(b.name)}${b.code ? ` (${escapeHTML(b.code)})` : ''}</option>`).join('');
  const roomOptions = rooms.map(r => `<option value="${r.id}">${escapeHTML(r.number_or_name)} (${escapeHTML(r.building_name)})</option>`).join('');

  // Group rooms and beds by building for the overview list
  const buildingMap = {};
  buildings.forEach(b => {
    buildingMap[b.id] = { ...b, rooms: [] };
  });
  const roomMap = {};
  rooms.forEach(r => {
    const roomObj = { ...r, beds: [] };
    roomMap[r.id] = roomObj;
    if (buildingMap[r.building_id]) {
      buildingMap[r.building_id].rooms.push(roomObj);
    }
  });
  beds.forEach(b => {
    if (roomMap[b.room_id]) {
      roomMap[b.room_id].beds.push(b);
    }
  });

  const structureListHtml = buildings.length === 0 
    ? `<div style="text-align:center; padding:30px; color:var(--text-muted); font-size:0.9rem;">
        <i class="fas fa-info-circle" style="margin-right:6px;"></i> ${fr ? 'Aucun bâtiment configuré pour le moment. Utilisez le formulaire ci-dessus pour ajouter votre premier bâtiment.' : 'لا توجد مباني مضافة حتى الآن.'}
       </div>`
    : buildings.map(b => {
        const bRooms = (buildingMap[b.id] && buildingMap[b.id].rooms) || [];
        const totalBedsInBuilding = bRooms.reduce((acc, r) => acc + (r.beds ? r.beds.length : 0), 0);

        const roomsHtml = bRooms.length === 0
          ? `<div style="padding:10px 15px; color:var(--text-muted); font-size:0.85rem; font-style:italic;">
              ${fr ? 'Aucune chambre dans ce bâtiment.' : 'لا توجد غرف في هذا المبنى.'}
             </div>`
          : bRooms.map(r => {
              const rBeds = r.beds || [];
              const bedsHtml = rBeds.length === 0
                ? `<span style="color:var(--text-muted); font-size:0.8rem; font-style:italic;">${fr ? 'Aucun lit' : 'لا يوجد سرير'}</span>`
                : rBeds.map(bd => {
                    const isOcc = bd.status === 'OCCUPIED';
                    const isMaint = bd.status === 'MAINTENANCE';
                    const statusColor = isOcc ? 'var(--danger)' : isMaint ? 'var(--warning)' : 'var(--success)';
                    const statusText = isOcc ? (fr ? 'Occupé' : 'مشغول') : isMaint ? (fr ? 'Entretien' : 'صيانة') : (fr ? 'Disponible' : 'متاح');

                    return `
                      <div style="display:inline-flex; align-items:center; gap:6px; background:var(--bg-main); border:1px solid var(--border-color); padding:4px 10px; border-radius:6px; font-size:0.8rem; margin-right:6px; margin-bottom:6px;">
                        <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background-color:${statusColor};"></span>
                        <strong style="color:var(--text-primary);">${escapeHTML(bd.name)}</strong>
                        <span style="color:var(--text-muted); font-size:0.75rem;">(${parseFloat(bd.daily_rate).toLocaleString()} XOF)</span>
                        <span class="badge" style="font-size:0.65rem; background:rgba(0,0,0,0.06); padding:1px 4px;">${statusText}</span>
                        <button class="btn-icon" style="color:var(--primary); background:none; border:none; padding:0 2px; cursor:pointer; font-size:0.8rem; margin-left:4px;" title="${fr ? 'Modifier ce lit' : 'تعديل السرير'}" onclick="openEditBedModal('${bd.id}', '${bd.room_id}', '${escapeHTML(bd.name)}', '${bd.luxury_level}', ${bd.daily_rate}, '${bd.status}')">
                          <i class="fas fa-edit"></i>
                        </button>
                        ${!isOcc ? `<button class="btn-icon" style="color:var(--danger); background:none; border:none; padding:0 2px; cursor:pointer; font-size:0.8rem;" title="${fr ? 'Supprimer ce lit' : 'حذف السرير'}" onclick="deleteHospitalBed('${bd.id}', '${escapeHTML(bd.name)}')"><i class="fas fa-trash-alt"></i></button>` : ''}
                      </div>
                    `;
                  }).join('');

              return `
                <div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:6px; padding:10px 14px; margin-bottom:8px;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; flex-wrap:wrap; gap:8px;">
                    <div style="display:flex; align-items:center; gap:8px;">
                      <i class="fas fa-door-open" style="color:var(--primary); font-size:0.9rem;"></i>
                      <strong style="color:var(--text-primary); font-size:0.9rem;">${escapeHTML(r.number_or_name)}</strong>
                      <span class="badge" style="font-size:0.7rem; background:rgba(59,130,246,0.1); color:var(--primary); border:1px solid rgba(59,130,246,0.2);">${r.room_type || 'STANDARD'}</span>
                      <span style="font-size:0.75rem; color:var(--text-muted);">(${rBeds.length} ${fr ? 'lit(s)' : 'سرير'})</span>
                    </div>
                    <div style="display:flex; gap:6px;">
                      <button class="btn btn-secondary" style="padding:2px 8px; font-size:0.75rem;" title="${fr ? 'Modifier la chambre' : 'تعديل الغرفة'}" onclick="openEditRoomModal('${r.id}', '${r.building_id}', '${escapeHTML(r.number_or_name)}', '${r.room_type}')">
                        <i class="fas fa-edit"></i> ${fr ? 'Modifier' : 'تعديل'}
                      </button>
                      <button class="btn btn-secondary" style="padding:2px 8px; font-size:0.75rem; color:var(--danger); border-color:var(--border-color);" title="${fr ? 'Supprimer la chambre' : 'حذف الغرفة'}" onclick="deleteHospitalRoom('${r.id}', '${escapeHTML(r.number_or_name)}')">
                        <i class="fas fa-trash-alt"></i> ${fr ? 'Supprimer' : 'حذف'}
                      </button>
                    </div>
                  </div>
                  <div style="display:flex; flex-wrap:wrap; align-items:center; gap:4px; padding-left:12px; border-left:2px solid var(--border-color); margin-top:6px;">
                    ${bedsHtml}
                  </div>
                </div>
              `;
            }).join('');

        return `
          <div class="card" style="margin-bottom:15px; border-left:4px solid var(--primary); padding:15px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px dashed var(--border-color); padding-bottom:8px; flex-wrap:wrap; gap:8px;">
              <div style="display:flex; align-items:center; gap:10px;">
                <i class="fas fa-building" style="color:var(--primary); font-size:1.2rem;"></i>
                <h4 style="margin:0; font-size:1.05rem; font-weight:700; color:var(--text-primary);">
                  ${escapeHTML(b.name)} ${b.code ? `<span style="font-size:0.8rem; font-weight:400; color:var(--text-muted);">(${escapeHTML(b.code)})</span>` : ''}
                </h4>
                <span class="badge" style="background:var(--bg-main); font-size:0.75rem; color:var(--text-secondary); border:1px solid var(--border-color);">
                  ${bRooms.length} ${fr ? 'chambre(s)' : 'غرف'} | ${totalBedsInBuilding} ${fr ? 'lit(s)' : 'أسرة'}
                </span>
              </div>
              <div style="display:flex; gap:6px;">
                <button class="btn btn-secondary" style="padding:4px 10px; font-size:0.8rem;" onclick="openEditBuildingModal('${b.id}', '${escapeHTML(b.name)}', '${escapeHTML(b.code || '')}')">
                  <i class="fas fa-edit"></i> ${fr ? 'Modifier' : 'تعديل'}
                </button>
                <button class="btn btn-secondary" style="padding:4px 10px; font-size:0.8rem; color:var(--danger);" onclick="deleteHospitalBuilding('${b.id}', '${escapeHTML(b.name)}')">
                  <i class="fas fa-trash-alt"></i> ${fr ? 'Supprimer' : 'حذف'}
                </button>
              </div>
            </div>
            <div style="padding-left:6px;">
              ${roomsHtml}
            </div>
          </div>
        `;
      }).join('');

  return `
    <!-- Top 3 Creation Cards -->
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:20px; margin-bottom:25px;">
      <!-- A. Add Building -->
      <div class="card" style="padding:15px;">
        <h4 style="margin-top:0; margin-bottom:15px; color:var(--text-primary); font-size:1.05rem; font-weight:600; border-bottom:1px solid var(--border-color); padding-bottom:8px;">
          <i class="fas fa-building" style="color:var(--primary); margin-right:6px;"></i> ${fr ? 'Ajouter un Bâtiment' : 'إضافة مبنى'}
        </h4>
        <form onsubmit="saveBuilding(event)">
          <div class="form-group">
            <label class="form-label">${fr ? 'Nom du Bâtiment (unique)' : 'اسم المبنى'} *</label>
            <input type="text" class="form-control" id="build-name" placeholder="ex: Pavillon A" required />
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:3px;">
              <i class="fas fa-fingerprint"></i> ${fr ? 'Le nom du bâtiment doit être unique' : 'يجب أن يكون الاسم فريداً'}
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">${fr ? 'Code (facultatif)' : 'رمز المبنى (اختياري)'}</label>
            <input type="text" class="form-control" id="build-code" placeholder="ex: PAV-A" />
          </div>
          <button class="btn btn-primary" type="submit" style="width:100%; margin-top:10px;"><i class="fas fa-plus"></i> ${fr ? 'Créer Bâtiment' : 'إنشاء المبنى'}</button>
        </form>
      </div>

      <!-- B. Add Room -->
      <div class="card" style="padding:15px;">
        <h4 style="margin-top:0; margin-bottom:15px; color:var(--text-primary); font-size:1.05rem; font-weight:600; border-bottom:1px solid var(--border-color); padding-bottom:8px;">
          <i class="fas fa-door-open" style="color:var(--primary); margin-right:6px;"></i> ${fr ? 'Ajouter une Chambre' : 'إضافة غرفة'}
        </h4>
        <form onsubmit="saveRoom(event)">
          <div class="form-group">
            <label class="form-label">${fr ? 'Bâtiment' : 'المبنى'} *</label>
            <select class="form-control" id="room-building-id" required>
              <option value="">-- ${fr ? 'Choisir un bâtiment' : 'اختر مبنى'} --</option>
              ${buildingOptions}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">${fr ? 'Nom / Numéro de Chambre (unique par bâtiment)' : 'اسم / رقم الغرفة'} *</label>
            <input type="text" class="form-control" id="room-number" placeholder="ex: Ch 101" required />
          </div>
          <div class="form-group">
            <label class="form-label">${fr ? 'Type de Chambre' : 'نوع الغرفة'}</label>
            <select class="form-control" id="room-type" required>
              <option value="STANDARD">STANDARD</option>
              <option value="VIP">VIP</option>
              <option value="SOINS_INTENSIFS">SOINS INTENSIFS (ICU)</option>
              <option value="MATERNITE">MATERNITÉ</option>
            </select>
          </div>
          <button class="btn btn-primary" type="submit" style="width:100%; margin-top:10px;"><i class="fas fa-plus"></i> ${fr ? 'Créer Chambre' : 'إنشاء الغرفة'}</button>
        </form>
      </div>

      <!-- C. Add Bed -->
      <div class="card" style="padding:15px;">
        <h4 style="margin-top:0; margin-bottom:15px; color:var(--text-primary); font-size:1.05rem; font-weight:600; border-bottom:1px solid var(--border-color); padding-bottom:8px;">
          <i class="fas fa-bed" style="color:var(--primary); margin-right:6px;"></i> ${fr ? 'Ajouter un Lit' : 'إضافة سرير'}
        </h4>
        <form onsubmit="saveBed(event)">
          <div class="form-group">
            <label class="form-label">${fr ? 'Chambre / Salle' : 'الغرفة / القاعة'} *</label>
            <select class="form-control" id="bed-room-id" required>
              <option value="">-- ${fr ? 'Choisir une chambre' : 'اختر غرفة'} --</option>
              ${roomOptions}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">${fr ? 'Nom / Numéro de Lit (unique par chambre)' : 'اسم / رقم السرير'} *</label>
            <input type="text" class="form-control" id="bed-name" placeholder="ex: Lit A" required />
          </div>
          <div class="form-group">
            <label class="form-label">${fr ? 'Luxe / Classe' : 'الفئة والدرجة'}</label>
            <select class="form-control" id="bed-luxury" required>
              <option value="STANDARD">STANDARD</option>
              <option value="CONFORT">CONFORT</option>
              <option value="VIP">VIP</option>
              <option value="SUITE">SUITE</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">${fr ? 'Tarif journalier d\'hébergement (XOF)' : 'السعر اليومي (XOF)'} *</label>
            <input type="number" class="form-control" id="bed-rate" placeholder="ex: 15000" min="0" required />
          </div>
          <button class="btn btn-primary" type="submit" style="width:100%; margin-top:10px;"><i class="fas fa-plus"></i> ${fr ? 'Créer Lit' : 'إنشاء السرير'}</button>
        </form>
      </div>
    </div>

    <!-- Bottom Structure Overview and Management List -->
    <div class="card" style="padding:20px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid var(--border-color); padding-bottom:10px;">
        <h4 style="margin:0; font-size:1.1rem; color:var(--text-primary); font-weight:600;">
          <i class="fas fa-sitemap" style="color:var(--primary); margin-right:8px;"></i>
          ${fr ? 'Inventaire de la Structure Hospitalière' : 'مخطط وهيكل المباني والغرف والأسرة'}
        </h4>
        <div style="font-size:0.85rem; color:var(--text-muted); display:flex; gap:12px;">
          <span><strong style="color:var(--text-primary);">${buildings.length}</strong> ${fr ? 'Bâtiment(s)' : 'مبنى'}</span>
          <span><strong style="color:var(--text-primary);">${rooms.length}</strong> ${fr ? 'Chambre(s)' : 'غرفة'}</span>
          <span><strong style="color:var(--text-primary);">${beds.length}</strong> ${fr ? 'Lit(s)' : 'سرير'}</span>
        </div>
      </div>
      <div>
        ${structureListHtml}
      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// Admission Handlers
// ----------------------------------------------------------------------------
async function openAdmitModal(bedId) {
  hospitalSelectedBedId = bedId;
  const select = document.getElementById('admit-patient-select');
  if (!select) return;

  try {
    const [patients, stays] = await Promise.all([
      api.request('/patients'),
      api.request('/hospital/hospitalizations?status=ADMITTED').catch(() => [])
    ]);

    const admittedIds = new Set((stays || []).map(s => s.patient_id));
    const availablePatients = (patients || []).filter(p => !admittedIds.has(p.id));

    select.innerHTML = `
      <option value="">-- Choisir un patient --</option>
      ${availablePatients.length > 0 ? availablePatients.map(p => `
        <option value="${p.id}">${escapeHTML(p.first_name)} ${escapeHTML(p.last_name)} (${escapeHTML(p.patient_code)}) ${p.status ? `— [${escapeHTML(p.status)}]` : ''}</option>
      `).join('') : '<option value="" disabled>Aucun patient disponible (tous sont actuellement hospitalisés)</option>'}
    `;

    const now = new Date();
    const localIso = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    const dateInput = document.getElementById('admit-date');
    if (dateInput) dateInput.value = localIso;

    document.getElementById('admit-modal').style.display = 'flex';
  } catch (err) {
    showToast('Erreur lors du chargement des patients : ' + err.message, 'error');
  }
}

function closeAdmitModal() {
  document.getElementById('admit-modal').style.display = 'none';
  document.getElementById('admit-notes').value = '';
  hospitalSelectedBedId = null;
}

async function saveAdmission(e) {
  e.preventDefault();
  const patientId = document.getElementById('admit-patient-select').value;
  const admitted_at = document.getElementById('admit-date') ? document.getElementById('admit-date').value : null;
  const notes = document.getElementById('admit-notes').value;

  if (!patientId || !hospitalSelectedBedId) return;

  try {
    await api.request('/hospital/hospitalizations', {
      method: 'POST',
      body: JSON.stringify({
        patient_id: patientId,
        bed_id: hospitalSelectedBedId,
        admitted_at,
        notes
      })
    });

    showToast('Admission enregistrée avec succès! Le patient est maintenant Hospitalisé.');
    closeAdmitModal();
    navigate('hospital');
  } catch (err) {
    showToast(err.message || 'Erreur lors de l\'admission du patient', 'error');
  }
}

async function dischargeAndInvoice(stayId, bedName) {
  if (!confirm(`Souhaitez-vous libérer le lit "${bedName}" et générer automatiquement la facture de séjour ?`)) return;

  try {
    showToast('Traitement de la sortie et calcul des frais...', 'info');
    
    const res = await api.request(`/hospital/hospitalizations/${stayId}/discharge`, {
      method: 'POST',
      body: JSON.stringify({ notes: 'Sortie standard d\'hospitalisation' })
    });

    showToast(`Patient libéré! Séjour: ${res.duration_days} jours. Total: ${res.total_cost.toLocaleString()} FCFA.`);

    showToast('Génération automatique de la facture...', 'info');

    const stayLine = {
      description: `Séjour Hospitalier - Lit ${res.bed_name} (${res.building_name || ''} - ${res.room_name || ''} / ${res.luxury_level || 'STANDARD'})`,
      quantity: res.duration_days,
      unit_price: res.daily_rate,
      service_id: null
    };

    const createdInvoice = await api.request('/billing/invoices', {
      method: 'POST',
      body: JSON.stringify({
        patient_id: res.patient_id,
        insurance_company_id: res.insurance_company_id || null,
        lines: [stayLine],
        discount_amount: 0
      })
    });

    showToast(`Facture ${createdInvoice.invoice_number} générée automatiquement avec succès !`);

    invoiceLines = [];
    activeBillingSubTab = 'invoices';
    await navigate('billing');
    
    setTimeout(() => {
      openInvoicePrintModal(createdInvoice.id, res.insurance_company_id ? 'IPM' : 'PATIENT');
    }, 400);

  } catch (err) {
    showToast('Erreur lors de la facturation automatique : ' + err.message, 'error');
  }
}

// ----------------------------------------------------------------------------
// Building Create, Edit & Delete Handlers
// ----------------------------------------------------------------------------
async function saveBuilding(e) {
  e.preventDefault();
  const nameInput = document.getElementById('build-name');
  const codeInput = document.getElementById('build-code');
  const name = nameInput ? nameInput.value.trim() : '';
  const code = codeInput ? codeInput.value.trim() : '';

  if (!name) {
    showToast('Veuillez renseigner le nom du bâtiment.', 'warning');
    return;
  }

  try {
    await api.request('/hospital/buildings', {
      method: 'POST',
      body: JSON.stringify({ name, code })
    });
    showToast('Bâtiment créé avec succès!');
    if (nameInput) nameInput.value = '';
    if (codeInput) codeInput.value = '';
    navigate('hospital');
  } catch (err) {
    showToast(err.message || 'Erreur lors de la création du bâtiment', 'error');
  }
}

async function deleteHospitalBuilding(id, name) {
  if (!confirm(`Êtes-vous sûr de vouloir supprimer le bâtiment "${name}" ainsi que toutes ses chambres et lits vides ?`)) return;
  try {
    const res = await api.request(`/hospital/buildings/${id}`, { method: 'DELETE' });
    showToast(res.message || 'Bâtiment supprimé avec succès!');
    navigate('hospital');
  } catch (err) {
    showToast(err.message || 'Erreur lors de la suppression du bâtiment', 'error');
  }
}

async function saveRoom(e) {
  e.preventDefault();
  const buildingSelect = document.getElementById('room-building-id');
  const numberInput = document.getElementById('room-number');
  const typeSelect = document.getElementById('room-type');

  const building_id = buildingSelect ? buildingSelect.value : '';
  const number_or_name = numberInput ? numberInput.value.trim() : '';
  const room_type = typeSelect ? typeSelect.value : 'STANDARD';

  if (!building_id || !number_or_name) {
    showToast('Veuillez sélectionner un bâtiment et saisir un numéro ou nom de chambre.', 'warning');
    return;
  }

  try {
    await api.request('/hospital/rooms', {
      method: 'POST',
      body: JSON.stringify({ building_id, number_or_name, room_type })
    });
    showToast('Chambre créée avec succès!');
    if (numberInput) numberInput.value = '';
    navigate('hospital');
  } catch (err) {
    showToast(err.message || 'Erreur lors de la création de la chambre', 'error');
  }
}

async function deleteHospitalRoom(id, name) {
  if (!confirm(`Êtes-vous sûr de vouloir supprimer la chambre "${name}" ?`)) return;
  try {
    const res = await api.request(`/hospital/rooms/${id}`, { method: 'DELETE' });
    showToast(res.message || 'Chambre supprimée avec succès!');
    navigate('hospital');
  } catch (err) {
    showToast(err.message || 'Erreur lors de la suppression de la chambre', 'error');
  }
}

async function saveBed(e) {
  e.preventDefault();
  const roomSelect = document.getElementById('bed-room-id');
  const nameInput = document.getElementById('bed-name');
  const luxurySelect = document.getElementById('bed-luxury');
  const rateInput = document.getElementById('bed-rate');

  const room_id = roomSelect ? roomSelect.value : '';
  const name = nameInput ? nameInput.value.trim() : '';
  const luxury_level = luxurySelect ? luxurySelect.value : 'STANDARD';
  const daily_rate = rateInput ? parseFloat(rateInput.value) : 0;

  if (!room_id || !name || isNaN(daily_rate)) {
    showToast('Veuillez sélectionner une chambre, saisir un nom de lit et un tarif valide.', 'warning');
    return;
  }

  try {
    await api.request('/hospital/beds', {
      method: 'POST',
      body: JSON.stringify({ room_id, name, luxury_level, daily_rate })
    });
    showToast('Lit créé avec succès!');
    if (nameInput) nameInput.value = '';
    if (rateInput) rateInput.value = '';
    navigate('hospital');
  } catch (err) {
    showToast(err.message || 'Erreur lors de la création du lit', 'error');
  }
}

async function deleteHospitalBed(id, name) {
  if (!confirm(`Êtes-vous sûr de vouloir supprimer le lit "${name}" ?`)) return;
  try {
    const res = await api.request(`/hospital/beds/${id}`, { method: 'DELETE' });
    showToast(res.message || 'Lit supprimé avec succès!');
    navigate('hospital');
  } catch (err) {
    showToast(err.message || 'Erreur lors de la suppression du lit', 'error');
  }
}

// ============================================================================
// AI Clinical Voice Copilot & Consultation Dictation Engine
// ============================================================================
let copilotActivePatient = null;
let copilotTranscriptLog = [];
let copilotRecognition = null;
let copilotIsListening = false;
let copilotIsSpeaking = false;
let copilotLatestResult = null;

// Deux modes partagent la même fenêtre de discussion :
//  - 'copilot' : questions cliniques sur le dossier (/ai/copilot/query), lecture seule
//  - 'agent'   : agent outillé qui agit réellement (/ai/agent/turn) — crée un patient,
//                cherche un créneau, réserve un rendez-vous
// L'agent a besoin de tout l'historique de la conversation à chaque tour (il le
// renvoie enrichi des appels d'outils), là où le copilote traite chaque question isolément.
let copilotMode = 'copilot';
let agentConversationHistory = [];

// Consultation Dictation State
let consultDictationRecognition = null;
let consultDictationIsListening = false;

function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
window.escapeHTML = escapeHTML;

function openAICopilotModal(patientId, patientName) {
  const modal = document.getElementById('ai-copilot-modal');
  if (!modal) return;

  // Detect active context: explicit args or active DPI patient
  let newPatient = null;
  if (patientId) {
    newPatient = { id: patientId, name: patientName || 'Patient' };
  } else if (typeof activeDPIPatient !== 'undefined' && activeDPIPatient && activeDPIPatient.id) {
    newPatient = { id: activeDPIPatient.id, name: activeDPIPatient.name };
  } else if (typeof currentDossierData !== 'undefined' && currentDossierData && currentDossierData.patient) {
    const p = currentDossierData.patient;
    newPatient = { id: p.id, name: `${p.first_name} ${p.last_name}` };
  }

  const patientChanged = !copilotActivePatient || (newPatient && copilotActivePatient.id !== newPatient.id) || (!newPatient && copilotActivePatient);
  copilotActivePatient = newPatient;

  // Update context badge
  const badge = document.getElementById('copilot-context-badge');
  if (badge) {
    if (copilotActivePatient) {
      badge.innerHTML = `<span class="badge" style="background:#eff6ff; color:#1d4ed8; border:1px solid #bfdbfe; font-weight:700; padding:4px 10px; border-radius:6px;"><i class="fas fa-user-check"></i> Dossier Patient Actif : <strong>${escapeHTML(copilotActivePatient.name)}</strong></span>`;
    } else {
      badge.innerHTML = `<span class="badge" style="background:#f1f5f9; color:#475569; border:1px solid #cbd5e1; font-weight:600; padding:4px 10px; border-radius:6px;"><i class="fas fa-globe"></i> Mode Général (Questions Hors Dossier, Protocoles & Pharmacologie)</span>`;
    }
  }

  if (patientChanged || copilotTranscriptLog.length === 0) {
    copilotTranscriptLog = [];
    const disclaimer = `\n\n> ⚠️ **Avertissement Médical & Prudence :** La santé étant un domaine hautement sensible, mes suggestions constituent une **aide indicative à la décision** et peuvent comporter des erreurs. **Vérifiez systématiquement** chaque information, posologie ou protocole avant toute décision médicale.`;
    
    const welcome = copilotActivePatient
      ? `Bonjour Docteur. Je suis connecté au dossier de **${copilotActivePatient.name}**. Vous pouvez me poser des questions sur ses antécédents, ses allergies, ses constantes ou me demander des suggestions de traitement.${disclaimer}`
      : `Bonjour Docteur. Je suis votre assistant clinique IA. Posez-moi une question sur un protocole médical (ex: paludisme grave, HTA), un calcul de posologie ou la pharmacovigilance.${disclaimer}`;
    
    const speechWelcome = copilotActivePatient
      ? `Bonjour Docteur. Je suis connecté au dossier de ${copilotActivePatient.name}. N'oubliez pas que mes suggestions sont une aide indicative et doivent toujours être vérifiées.`
      : `Bonjour Docteur. Je suis votre assistant clinique IA. Attention, mes réponses constituent une aide à la décision et doivent toujours être vérifiées avec rigueur.`;

    copilotTranscriptLog.push({ sender: 'ai', text: speechWelcome, markdown: welcome });
  }

  renderCopilotChat();

  const firstName = copilotActivePatient ? copilotActivePatient.name.split(' ')[0] : '';
  const defaultChips = copilotActivePatient
    ? [
        `📋 Résumé du dossier de ${firstName}`,
        `⚠️ Vérifier allergies & contre-indications`,
        `🩺 Dernières constantes vitales`,
        `💡 Suggérer un traitement adapté`
      ]
    : [
        `🔬 Protocole paludisme grave (femme enceinte)`,
        `💊 Posologie amoxicilline enfant 15kg`,
        `⚠️ Interactions AINS et anticoagulants`,
        `🩺 Recommandations HTA 2026`
      ];

  renderCopilotChips(defaultChips);

  // Reflète visuellement le mode courant (le sélecteur est reconstruit avec le shell)
  const activeStyle = 'background:var(--primary); color:#fff;';
  const idleStyle = 'background:transparent; color:var(--text-muted);';
  const btnCopilot = document.getElementById('copilot-mode-btn-copilot');
  const btnAgent = document.getElementById('copilot-mode-btn-agent');
  if (btnCopilot) btnCopilot.style.cssText += ';' + (copilotMode === 'copilot' ? activeStyle : idleStyle);
  if (btnAgent) btnAgent.style.cssText += ';' + (copilotMode === 'agent' ? activeStyle : idleStyle);

  modal.style.display = 'flex';
}

function closeAICopilotModal() {
  const modal = document.getElementById('ai-copilot-modal');
  if (modal) modal.style.display = 'none';

  stopCopilotVoice();
}

function stopCopilotVoice() {
  if (copilotRecognition && copilotIsListening) {
    try { copilotRecognition.stop(); } catch(e) {}
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  copilotIsListening = false;
  copilotIsSpeaking = false;
  updateCopilotVoiceUI();
}

function toggleCopilotVoiceListen() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast('La reconnaissance vocale n\'est pas supportée par ce navigateur. Utilisez le champ texte.', 'warning');
    return;
  }

  if (copilotIsListening) {
    stopCopilotVoice();
    return;
  }

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  if (!copilotRecognition) {
    copilotRecognition = new SpeechRecognition();
    copilotRecognition.lang = 'fr-FR';
    copilotRecognition.continuous = false;
    copilotRecognition.interimResults = false;

    copilotRecognition.onstart = () => {
      copilotIsListening = true;
      updateCopilotVoiceUI();
    };

    copilotRecognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      copilotIsListening = false;
      updateCopilotVoiceUI();
      if (transcript && transcript.trim()) {
        sendCopilotPrompt(transcript);
      }
    };

    copilotRecognition.onerror = (e) => {
      copilotIsListening = false;
      updateCopilotVoiceUI();
    };

    copilotRecognition.onend = () => {
      copilotIsListening = false;
      updateCopilotVoiceUI();
    };
  }

  try {
    copilotRecognition.start();
  } catch(e) {
    copilotIsListening = false;
    updateCopilotVoiceUI();
  }
}

function updateCopilotVoiceUI() {
  const pulse = document.getElementById('copilot-mic-btn');
  const statusTxt = document.getElementById('copilot-status-text');
  const wave = document.getElementById('copilot-wave-anim');

  if (pulse) {
    pulse.className = `copilot-pulse-circle ${copilotIsListening ? 'listening' : (copilotIsSpeaking ? 'speaking' : '')}`;
  }
  if (statusTxt) {
    if (copilotIsListening) {
      statusTxt.innerHTML = '<span style="color:#ef4444; font-weight:700;"><i class="fas fa-circle fa-beat"></i> Je vous écoute... Posez votre question au micro</span>';
    } else if (copilotIsSpeaking) {
      statusTxt.innerHTML = '<span style="color:#10b981; font-weight:700;"><i class="fas fa-volume-up fa-beat"></i> L\'Assistant Vocal vous répond...</span>';
    } else {
      statusTxt.innerHTML = '<span style="color:var(--text-muted);">Cliquez sur le micro pour parler ou posez votre question ci-dessous</span>';
    }
  }
  if (wave) {
    wave.style.display = (copilotIsListening || copilotIsSpeaking) ? 'flex' : 'none';
  }
}

// Nettoie le markdown avant la synthèse vocale : un tiret de liste ou isolé
// entre espaces est lu littéralement "moins" par la voix française sans ce nettoyage.
const MOIS_PARLES = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

// Doit rester identique à sanitizeForSpeech() dans controllers/aiCopilotController.js :
// le serveur nettoie le texte lu, ce nettoyage-ci protège les chemins où un texte
// brut arrive directement à la synthèse vocale (bouton « Écouter », agent public).
function sanitizeForSpeechClient(text) {
  if (!text) return '';
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+[.)]\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`#]/g, '')
    // Symboles d'un dossier médical : sans cela la voix prononce « tiret » sur un
    // code patient et « barre oblique » sur une date, une tension ou une posologie.
    .replace(/\b(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})\b/g, (m, j, mo, a) => {
      const i = parseInt(mo, 10) - 1;         // 28/08/2026 -> 28 août 2026
      return MOIS_PARLES[i] ? `${parseInt(j, 10)} ${MOIS_PARLES[i]} ${a}` : m;
    })
    .replace(/([A-Za-zÀ-ÿ])-(?=[A-Za-z0-9À-ÿ])/g, '$1 ')   // SM-4821 -> SM 4821
    // Intervalle : les deux bornes doivent être courtes, sinon un numéro de
    // référence comme FAC-2026-400759 se lirait « 2026 à 400759 ».
    .replace(/\b(\d{1,3})\s*-\s*(?=\d{1,3}\b)/g, '$1 à ')  // 10-15 jours -> 10 à 15
    .replace(/(\d)\s*-\s*(?=\d)/g, '$1 ')                  // FAC-2026-400759 -> FAC 2026 400759
    .replace(/(\d)\s*\/\s*(?=\d)/g, '$1 sur ')             // 14/9 -> 14 sur 9
    .replace(/([A-Za-zÀ-ÿ])\s*\/\s*(?=[A-Za-zÀ-ÿ])/g, '$1 par ') // mg/kg -> mg par kg
    .replace(/\//g, ' ')
    // Monnaie : « FCFA » et le code ISO « XOF » seraient épelés lettre par lettre.
    // L'accord suit le montant, y compris quand il est formaté avec des espaces
    // insécables par toLocaleString('fr-FR').
    .replace(/(\d[\d\s  ]*)\s*(?:F\.?\s?CFA|FCFA|XOF)\b/gi, (m, n) => {
      const brut = n.replace(/[\s  ]/g, '');
      return `${n.trim()} ${parseFloat(brut) === 1 ? 'franc CFA' : 'francs CFA'}`;
    })
    .replace(/\b(?:F\.?\s?CFA|FCFA|XOF)\b/gi, 'francs CFA')
    .replace(/\s[-–—]\s/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Découpe un texte en fragments prononçables d'environ 180 caractères, sans couper
// un mot. Chrome interrompt une énonciation unique au bout d'une quinzaine de
// secondes : c'est ce qui arrêtait la voix en pleine phrase sur les synthèses
// cliniques un peu développées. Enchaîner de courts fragments contourne la limite.
function splitForSpeech(text, maxLen = 180) {
  const phrases = text.split(/(?<=[.!?…:;])\s+/);
  const fragments = [];
  let courant = '';

  for (const phrase of phrases) {
    // Une phrase déjà plus longue que la limite est recoupée sur les espaces.
    if (phrase.length > maxLen) {
      if (courant) { fragments.push(courant); courant = ''; }
      let reste = phrase;
      while (reste.length > maxLen) {
        let coupe = reste.lastIndexOf(' ', maxLen);
        if (coupe <= 0) coupe = maxLen;
        fragments.push(reste.slice(0, coupe).trim());
        reste = reste.slice(coupe).trim();
      }
      if (reste) courant = reste;
      continue;
    }

    if ((courant + ' ' + phrase).trim().length > maxLen) {
      fragments.push(courant);
      courant = phrase;
    } else {
      courant = (courant ? courant + ' ' : '') + phrase;
    }
  }

  if (courant.trim()) fragments.push(courant.trim());
  return fragments.filter(Boolean);
}

function speakCopilotAI(text) {
  if (!('speechSynthesis' in window) || !text) return;
  window.speechSynthesis.cancel();

  const fragments = splitForSpeech(sanitizeForSpeechClient(text));
  if (fragments.length === 0) return;

  copilotIsSpeaking = true;
  updateCopilotVoiceUI();

  fragments.forEach((fragment, index) => {
    const u = new SpeechSynthesisUtterance(fragment);
    u.lang = 'fr-FR';
    u.rate = 1.05;
    u.pitch = 1.0;

    // L'indicateur ne retombe qu'à la fin du dernier fragment, sinon il
    // clignoterait entre chaque phrase.
    if (index === fragments.length - 1) {
      u.onend = () => {
        copilotIsSpeaking = false;
        updateCopilotVoiceUI();
      };
    }

    u.onerror = () => {
      copilotIsSpeaking = false;
      updateCopilotVoiceUI();
    };

    window.speechSynthesis.speak(u);
  });
}

function setCopilotMode(mode) {
  copilotMode = mode === 'agent' ? 'agent' : 'copilot';

  const activeStyle = 'background:var(--primary); color:#fff;';
  const idleStyle = 'background:transparent; color:var(--text-muted);';
  const btnCopilot = document.getElementById('copilot-mode-btn-copilot');
  const btnAgent = document.getElementById('copilot-mode-btn-agent');
  if (btnCopilot) btnCopilot.style.cssText += ';' + (copilotMode === 'copilot' ? activeStyle : idleStyle);
  if (btnAgent) btnAgent.style.cssText += ';' + (copilotMode === 'agent' ? activeStyle : idleStyle);

  const input = document.getElementById('copilot-text-input');
  if (input) {
    input.placeholder = copilotMode === 'agent'
      ? 'Ex : « Awa Diagne, nouvelle patiente, voudrait un rendez-vous jeudi »'
      : 'Posez une question sur le dossier, un traitement ou un protocole...';
  }

  const status = document.getElementById('copilot-status-text');
  if (status) {
    status.innerText = copilotMode === 'agent'
      ? "Mode agent : je peux enregistrer un patient, chercher un créneau et réserver un rendez-vous."
      : 'Cliquez sur le micro pour parler ou posez votre question ci-dessous';
  }

  // Chaque mode a sa propre conversation : on repart d'un fil vierge pour ne pas
  // mélanger un historique clinique avec un historique d'actions.
  copilotTranscriptLog = [];
  agentConversationHistory = [];

  if (copilotMode === 'agent') {
    copilotTranscriptLog.push({
      sender: 'ai',
      text: "Mode agent rendez-vous activé. Dites-moi qui souhaite un rendez-vous et quand.",
      markdown: "**Mode agent rendez-vous.** Je peux enregistrer un nouveau patient, vérifier un code patient existant, chercher les créneaux libres et confirmer un rendez-vous. Dites-moi qui souhaite un rendez-vous et quand."
    });
    renderCopilotChips([
      'Awa Diagne, nouvelle patiente, voudrait un rendez-vous demain matin',
      'Quels créneaux sont libres après-demain ?',
      'Le patient SM-4821 veut un rendez-vous jeudi',
      'Quelles sont les heures d\'ouverture ?'
    ]);
  } else {
    // Réutilise l'accueil et les suggestions déjà calculés selon le contexte patient
    openAICopilotModal(copilotActivePatient?.id, copilotActivePatient?.name);
    return;
  }

  renderCopilotChat();
}
window.setCopilotMode = setCopilotMode;

async function submitCopilotQuery(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('copilot-text-input');
  if (!input) return;
  const prompt = input.value.trim();
  if (!prompt) return;
  input.value = '';
  await sendCopilotPrompt(prompt);
}

async function sendCopilotPrompt(promptText) {
  copilotTranscriptLog.push({ sender: 'user', text: promptText });
  renderCopilotChat();

  const timeline = document.getElementById('copilot-chat-timeline');
  if (timeline) {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'copilot-loading-indicator';
    const loadingLabel = copilotMode === 'agent'
      ? "L'agent consulte l'agenda..."
      : "L'IA analyse les données cliniques...";
    loadingDiv.innerHTML = `<div style="display:flex; align-items:center; gap:8px; color:var(--primary); font-weight:600; font-size:0.85rem; padding:10px;"><i class="fas fa-spinner fa-spin"></i> ${loadingLabel}</div>`;
    timeline.appendChild(loadingDiv);
    timeline.scrollTop = timeline.scrollHeight;
  }

  if (copilotMode === 'agent') {
    await sendAgentPrompt(promptText);
    return;
  }

  try {
    const res = await api.request('/ai/copilot/query', {
      method: 'POST',
      body: JSON.stringify({
        prompt: promptText,
        patient_id: copilotActivePatient?.id
      })
    });

    copilotLatestResult = res;

    // Remove loading
    const loading = document.getElementById('copilot-loading-indicator');
    if (loading) loading.remove();

    copilotTranscriptLog.push({
      sender: 'ai',
      text: res.response_speech || res.response_markdown,
      markdown: res.response_markdown,
      alerts: res.alerts || [],
      patient_matched: res.patient_matched
    });

    renderCopilotChat();

    if (res.quick_suggestions && res.quick_suggestions.length > 0) {
      renderCopilotChips(res.quick_suggestions);
    }

    if (res.response_speech) {
      speakCopilotAI(res.response_speech);
    }

  } catch (err) {
    const loading = document.getElementById('copilot-loading-indicator');
    if (loading) loading.remove();
    copilotTranscriptLog.push({
      sender: 'ai',
      text: 'Erreur lors du traitement : ' + err.message,
      markdown: `❌ **Erreur :** ${err.message}`
    });
    renderCopilotChat();
  }
}

// Résume en une ligne lisible ce que l'agent a réellement fait, pour que l'accueil
// voie les actions exécutées et pas seulement la phrase de l'assistant.
function describeAgentAction(action) {
  if (!action.success) {
    return { icon: 'fa-circle-xmark', color: '#dc2626', label: `Échec : ${action.error || 'action impossible'}` };
  }
  const r = action.result || {};
  switch (action.tool) {
    case 'enregistrer_nouveau_patient':
      return r.already_existed
        ? { icon: 'fa-user-check', color: '#d97706', label: `Patient déjà connu : ${r.patient?.first_name} ${r.patient?.last_name} (${r.patient?.patient_code})` }
        : { icon: 'fa-user-plus', color: '#059669', label: `Dossier créé : ${r.patient?.first_name} ${r.patient?.last_name} (${r.patient?.patient_code})` };
    case 'verifier_patient_par_code':
      return r.found
        ? { icon: 'fa-id-card', color: '#059669', label: `Patient identifié : ${r.patient?.first_name} ${r.patient?.last_name}` }
        : { icon: 'fa-triangle-exclamation', color: '#d97706', label: 'Code patient introuvable' };
    case 'chercher_creneaux_disponibles':
      return { icon: 'fa-calendar-days', color: '#2563eb', label: `${(r.slots || []).length} créneau(x) libre(s) trouvé(s)` };
    case 'prendre_rendez_vous':
      if (!r.booked) return { icon: 'fa-triangle-exclamation', color: '#d97706', label: r.message || 'Créneau indisponible' };
      const when = r.appointment?.start_time ? new Date(r.appointment.start_time).toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'short' }) : '';
      return { icon: 'fa-calendar-check', color: '#059669', label: `Rendez-vous confirmé — ${when}` };
    default:
      return { icon: 'fa-circle-check', color: '#059669', label: action.tool };
  }
}

async function sendAgentPrompt(promptText) {
  try {
    const res = await api.request('/ai/agent/turn', {
      method: 'POST',
      body: JSON.stringify({ message: promptText, history: agentConversationHistory })
    });

    // L'agent renvoie l'historique enrichi des appels d'outils : on le conserve
    // tel quel pour le tour suivant, sinon il perd le fil de la réservation en cours.
    agentConversationHistory = res.history || agentConversationHistory;

    const loading = document.getElementById('copilot-loading-indicator');
    if (loading) loading.remove();

    copilotTranscriptLog.push({
      sender: 'ai',
      text: res.answer,
      markdown: res.answer,
      agentActions: (res.actions || []).map(describeAgentAction)
    });
    renderCopilotChat();

    // Une action a modifié l'agenda : rafraîchir la vue si l'utilisateur y est.
    const bookedSomething = (res.actions || []).some(a => a.success && a.tool === 'prendre_rendez_vous' && a.result?.booked);
    if (bookedSomething && state.currentTab === 'agenda') navigate('agenda');

    if (res.answer) speakCopilotAI(res.answer);
  } catch (err) {
    const loading = document.getElementById('copilot-loading-indicator');
    if (loading) loading.remove();
    copilotTranscriptLog.push({
      sender: 'ai',
      text: 'Erreur : ' + err.message,
      markdown: `❌ **Erreur :** ${err.message}`
    });
    renderCopilotChat();
  }
}

function renderCopilotChat() {
  const timeline = document.getElementById('copilot-chat-timeline');
  if (!timeline) return;

  timeline.innerHTML = copilotTranscriptLog.map((msg, index) => {
    if (msg.sender === 'user') {
      return `
        <div class="copilot-chat-bubble-user">
          <i class="fas fa-user-md" style="margin-right:6px; opacity:0.8;"></i> ${escapeHTML(msg.text)}
        </div>
      `;
    } else {
      let alertsHtml = '';
      if (msg.alerts && msg.alerts.length > 0) {
        alertsHtml = msg.alerts.map(a => `
          <div class="copilot-alert-box">
            <i class="fas fa-exclamation-triangle"></i> ${escapeHTML(a.message)}
          </div>
        `).join('');
      }

      // Actions réellement exécutées par l'agent (création patient, réservation...).
      // escapeHTML sur chaque libellé : ils contiennent des noms de patients issus du LLM.
      let agentActionsHtml = '';
      if (msg.agentActions && msg.agentActions.length > 0) {
        agentActionsHtml = `
          <div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:8px; padding:8px 10px; margin-bottom:8px; display:flex; flex-direction:column; gap:5px;">
            ${msg.agentActions.map(a => `
              <div style="display:flex; align-items:center; gap:7px; font-size:0.79rem; color:var(--text-primary);">
                <i class="fas ${escapeHTML(a.icon)}" style="color:${escapeHTML(a.color)}; width:14px;"></i>
                <span>${escapeHTML(a.label)}</span>
              </div>
            `).join('')}
          </div>
        `;
      }

      const formattedMarkdown = formatMarkdownBasic(msg.markdown || msg.text);

      return `
        <div class="copilot-chat-bubble-ai">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; border-bottom:1px solid rgba(0,0,0,0.06); padding-bottom:6px;">
            <span style="font-weight:700; font-size:0.82rem; color:var(--primary); display:flex; align-items:center; gap:6px;">
              <i class="fas fa-robot"></i> Assistant Clinique IA SoftMed
            </span>
            <div style="display:flex; gap:6px;">
              <button class="btn btn-secondary btn-sm" onclick="speakCopilotAI('${(msg.text || '').replace(/'/g, "\\'")}')" style="font-size:0.75rem; padding:3px 8px;" title="Réécouter la synthèse vocale">
                <i class="fas fa-volume-up"></i> Écouter
              </button>
              <button class="btn btn-secondary btn-sm" onclick="copyToClipboard('${(msg.markdown || msg.text || '').replace(/'/g, "\\'").replace(/\n/g, '\\n')}')" style="font-size:0.75rem; padding:3px 8px;" title="Copier le texte">
                <i class="fas fa-copy"></i>
              </button>
            </div>
          </div>
          ${alertsHtml}
          ${agentActionsHtml}
          <div style="font-size:0.9rem; line-height:1.55;">${formattedMarkdown}</div>
        </div>
      `;
    }
  }).join('');

  timeline.scrollTop = timeline.scrollHeight;
}

function renderCopilotChips(chips) {
  const container = document.getElementById('copilot-quick-chips');
  if (!container) return;

  container.innerHTML = '';
  chips.forEach(chip => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copilot-chip';
    const cleanPrompt = chip.replace(/^[^\wÀ-ÿ]+/g, '').trim();
    btn.innerHTML = `<i class="fas fa-comment-dots" style="color:var(--primary);"></i> <span>${escapeHTML(chip)}</span>`;
    btn.onclick = () => {
      sendCopilotPrompt(cleanPrompt);
    };
    container.appendChild(btn);
  });
}

function formatMarkdownBasic(text) {
  if (!text) return '';
  return text
    .replace(/^### (.*$)/gim, '<h4 style="margin:8px 0 4px; font-weight:700; color:#1e293b;">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 style="margin:10px 0 6px; font-weight:800; color:#1e293b;">$1</h3>')
    .replace(/^> (.*$)/gim, '<div style="background:#fffbeb; border-left:4px solid #f59e0b; padding:8px 12px; margin:8px 0; border-radius:4px; font-size:0.85rem; color:#92400e; line-height:1.45;">$1</div>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/\n\n/gim, '<br/><br/>')
    .replace(/\n/gim, '<br/>')
    .replace(/^- (.*$)/gim, '<div style="margin-left:12px;">• $1</div>');
}

// ----------------------------------------------------------------------------
// Smart Consultation Dictation (Auto-fills Consultation Form)
// ----------------------------------------------------------------------------
function toggleConsultationDictation() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast('Reconnaissance vocale non disponible sur ce navigateur.', 'warning');
    return;
  }

  const btn = document.getElementById('btn-dictate-consult');
  const icon = document.getElementById('dictate-icon');
  const text = document.getElementById('dictate-btn-text');

  if (consultDictationIsListening) {
    if (consultDictationRecognition) consultDictationRecognition.stop();
    consultDictationIsListening = false;
    if (btn) btn.className = 'btn btn-primary btn-sm';
    if (icon) icon.className = 'fas fa-microphone';
    if (text) text.innerText = 'Démarrer Dictée';
    return;
  }

  if (!consultDictationRecognition) {
    consultDictationRecognition = new SpeechRecognition();
    consultDictationRecognition.lang = 'fr-FR';
    consultDictationRecognition.continuous = false;
    consultDictationRecognition.interimResults = false;

    consultDictationRecognition.onstart = () => {
      consultDictationIsListening = true;
      if (btn) btn.className = 'btn btn-danger btn-sm';
      if (icon) icon.className = 'fas fa-stop-circle fa-beat';
      if (text) text.innerText = 'Écoute en cours... Parlez';
      showToast('Dictée vocale active : Décrivez le motif, l\'examen, le diagnostic et l\'ordonnance.', 'info');
    };

    consultDictationRecognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      consultDictationIsListening = false;
      if (btn) btn.className = 'btn btn-primary btn-sm';
      if (icon) icon.className = 'fas fa-microphone';
      if (text) text.innerText = 'Démarrer Dictée';

      if (transcript && transcript.trim()) {
        await handleConsultationDictationResult(transcript);
      }
    };

    consultDictationRecognition.onerror = () => {
      consultDictationIsListening = false;
      if (btn) btn.className = 'btn btn-primary btn-sm';
      if (icon) icon.className = 'fas fa-microphone';
      if (text) text.innerText = 'Démarrer Dictée';
    };

    consultDictationRecognition.onend = () => {
      consultDictationIsListening = false;
      if (btn) btn.className = 'btn btn-primary btn-sm';
      if (icon) icon.className = 'fas fa-microphone';
      if (text) text.innerText = 'Démarrer Dictée';
    };
  }

  try {
    consultDictationRecognition.start();
  } catch (err) {
    consultDictationIsListening = false;
  }
}

async function handleConsultationDictationResult(rawDictation) {
  showToast('Traitement de la dictée par l\'IA en cours...', 'info');
  try {
    const res = await api.request('/ai/copilot/dictate', {
      method: 'POST',
      body: JSON.stringify({
        dictation_text: rawDictation,
        patient_id: activeDPIPatient?.id
      })
    });

    const s = res.structured_data;
    if (s) {
      const reasonInput = document.getElementById('dpi-reason');
      const diagInput = document.getElementById('dpi-diagnosis');
      const notesInput = document.getElementById('dpi-notes');
      const rxInput = document.getElementById('dpi-prescriptions');
      const bpSysInput = document.getElementById('dpi-bp-sys');
      const bpDiaInput = document.getElementById('dpi-bp-dia');
      const tempInput = document.getElementById('dpi-temp');

      if (reasonInput && s.reason) reasonInput.value = s.reason;
      if (diagInput && s.diagnosis) diagInput.value = s.diagnosis;
      if (notesInput && s.examination) notesInput.value = s.examination;
      if (rxInput && s.prescriptions && s.prescriptions.length > 0) {
        rxInput.value = s.prescriptions.join('\n');
      }

      if (s.vitals) {
        if (s.vitals.blood_pressure) {
          const parts = s.vitals.blood_pressure.split('/');
          if (bpSysInput && parts[0]) bpSysInput.value = parts[0];
          if (bpDiaInput && parts[1]) bpDiaInput.value = parts[1];
        }
        if (tempInput && s.vitals.temperature) tempInput.value = s.vitals.temperature;
      }

      showToast('Formulaire de consultation rempli automatiquement avec succès !', 'success');
    }
  } catch (err) {
    showToast('Erreur structuration dictée : ' + err.message, 'error');
  }
}

window.openAICopilotModal = openAICopilotModal;
window.closeAICopilotModal = closeAICopilotModal;
window.toggleCopilotVoiceListen = toggleCopilotVoiceListen;
window.speakCopilotAI = speakCopilotAI;
window.submitCopilotQuery = submitCopilotQuery;
window.sendCopilotPrompt = sendCopilotPrompt;
window.toggleConsultationDictation = toggleConsultationDictation;

// Run app init on load
window.addEventListener('DOMContentLoaded', () => {
  localStorage.setItem('lang', 'fr');
  document.body.removeAttribute('dir');
  initApp();
});

