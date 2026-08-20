// ClinicOS Enterprise Front-End PWA Engine

// Multi-lingual translations
const i18n = {
  fr: {
    appName: "SoftMed",
    dashboard: "Tableau de Bord",
    agenda: "Agenda & RDV",
    patients: "Patients & DPI",
    billing: "Caisse & Facturation",
    inventory: "Pharmacie & Stocks",
    settings: "Modes de Règlement",
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
    restock: "Approvisionner Lot",
    lotNum: "N° Lot",
    expiry: "Date d'expiration",
    deplete: "Simuler Consommation",
    
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
    tenants: "Gestion des Cliniques",
    addTenant: "Enregistrer une Clinique",
    editTenant: "Modifier la Clinique",
    tenantName: "Nom de la Clinique",
    tenantSlug: "Identifiant Unique (Slug)",
    tenantPhone: "Téléphone",
    tenantNinea: "NINEA / RC fiscal",
    tenantEmail: "Email de contact",
    tenantAddress: "Adresse de la Clinique",
    tenantLogo: "URL du Logo",
    tenantActive: "Statut Actif",
    actions: "Actions",
    confirmDeleteTenant: "Êtes-vous sûr de vouloir supprimer cette clinique ? Cette action est irréversible et supprimera toutes ses données.",
    adminUserCreation: "Création du Compte Administrateur Principal",
    adminFirstName: "Prénom Administrateur",
    adminLastName: "Nom Administrateur",
    adminEmail: "Email Administrateur",
    adminPassword: "Mot de passe Administrateur",
    saveBtn: "Enregistrer",
    cancelBtn: "Annuler",
    deleteBtn: "Supprimer",
    tenantsList: "Liste des Cliniques / Tenants",
    noTenants: "Aucune clinique enregistrée.",
    homeTitle: "Gérez votre clinique en toute simplicité",
    homeSubtitle: "La plateforme médicale SaaS multi-tenant moderne et sécurisée.",
    homeCTAConnect: "Se Connecter",
    homeCTASignup: "Créer un Nouveau Cabinet",
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
    inventory: "الصيدلية والمخازن",
    settings: "طرق الدفع الإلكتروني",
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
    restock: "توريد شحنة جديدة",
    lotNum: "رقم الشحنة / اللوت",
    expiry: "تاريخ انتهاء الصلاحية",
    deplete: "محاكاة صرف واستهلاك",
    
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
    tenants: "إدارة العيادات",
    addTenant: "تسجيل عيادة جديدة",
    editTenant: "تعديل بيانات العيادة",
    tenantName: "اسم العيادة",
    tenantSlug: "المعرف الفريد (Slug)",
    tenantPhone: "الهاتف",
    tenantNinea: "رقم التعريف الضريبي (NINEA)",
    tenantEmail: "البريد الإلكتروني للتواصل",
    tenantAddress: "عنوان العيادة",
    tenantLogo: "رابط الشعار",
    tenantActive: "الحالة (نشط)",
    actions: "الإجراءات",
    confirmDeleteTenant: "هل أنت متأكد من حذف هذه العيادة؟ هذا الإجراء غير قابل للتراجع وسيؤدي لحذف كافة البيانات.",
    adminUserCreation: "إنشاء حساب المدير الرئيسي للعيادة",
    adminFirstName: "الاسم الأول للمدير",
    adminLastName: "الاسم الأخير للمدير",
    adminEmail: "البريد الإلكتروني للمدير",
    adminPassword: "كلمة مرور المدير",
    saveBtn: "حفظ",
    cancelBtn: "إلغاء",
    deleteBtn: "حذف",
    tenantsList: "قائمة العيادات / المستأجرين",
    noTenants: "لا توجد عيادات مسجلة.",
    homeTitle: "إدارة عيادتك الطبية بكل سهولة",
    homeSubtitle: "منصة طبية سحابية حديثة، آمنة ومتعددة المستأجرين.",
    homeCTAConnect: "تسجيل الدخول",
    homeCTASignup: "تسجيل عيادة جديدة",
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

// ============================================================================
// API Client wrapper
// ============================================================================
const api = {
  headers() {
    const headers = { 'Content-Type': 'application/json' };
    if (state.token) {
      headers['Authorization'] = `Bearer ${state.token}`;
    }
    if (state.tenant) {
      headers['X-Tenant-ID'] = state.tenant.id;
    }
    return headers;
  },
  
  async request(path, options = {}) {
    const url = `/api${path}`;
    const opts = {
      ...options,
      headers: {
        ...this.headers(),
        ...options.headers
      }
    };
    
    try {
      const response = await fetch(url, opts);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Server request failed');
      }
      return data;
    } catch (err) {
      showToast(err.message, 'error');
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

  try {
    showToast('Téléversement en cours...', 'info');
    const response = await fetch('/api/upload', {
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

// ============================================================================
// Auth flows
// ============================================================================
async function handleLogin(e) {
  e.preventDefault();
  const tenant_slug = document.getElementById('login-tenant-slug').value;
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tenant_slug, email, password })
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    
    state.token = data.token;
    state.user = data.user;
    state.tenant = data.tenant;
    
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('tenant', JSON.stringify(data.tenant));
    
    showToast(`Connexion réussie! Bienvenue ${data.user.first_name}`);
    
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
    const response = await fetch('/api/auth/register-tenant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

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
        await renderBilling(body);
        break;
      case 'inventory':
        await renderInventory(body);
        break;
      case 'hospital':
        await renderHospital(body);
        break;
      case 'settings':
        await renderSettings(body);
        break;
      case 'tenants':
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
  // Fetch reports data
  const agingReport = await api.request('/reports/aging-balance');
  const stock = await api.request('/inventory/items');
  const appointments = await api.request('/appointments');
  
  // Calculate low stock metrics
  const lowStockCount = stock.filter(item => item.current_stock_quantity <= item.minimum_threshold_alert).length;
  
  // Compile aging buckets totals
  const brackets = {
    CURRENT: 0,
    '1_30_DAYS': 0,
    '31_60_DAYS': 0,
    '61_90_DAYS': 0,
    OVER_90_DAYS: 0
  };
  
  agingReport.data.forEach(inv => {
    brackets[inv.aging_bracket] += parseFloat(inv.total_balance_due);
  });
  
  const todayISO = new Date().toISOString().split('T')[0];
  const apptsToday = appointments.filter(a => a.start_time.startsWith(todayISO)).length;
  
  container.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon primary"><i class="fas fa-hand-holding-usd"></i></div>
        <div>
          <div class="stat-number">${agingReport.summary.total_balance_due.toLocaleString()} XOF</div>
          <div class="stat-label">${t('totalOwed')}</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon success"><i class="fas fa-calendar-check"></i></div>
        <div>
          <div class="stat-number">${apptsToday}</div>
          <div class="stat-label">${t('apptToday')}</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon warning"><i class="fas fa-exclamation-triangle"></i></div>
        <div>
          <div class="stat-number">${lowStockCount}</div>
          <div class="stat-label">${t('lowStock')}</div>
        </div>
      </div>
    </div>
    
    <div class="card">
      <div class="card-title"><i class="fas fa-chart-bar"></i> ${t('receivablesAging')}</div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>${t('current')}</th>
              <th>${t('delay30')}</th>
              <th>${t('delay60')}</th>
              <th>${t('delay60')}</th>
              <th>${t('over90')}</th>
              <th>${t('total')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="aging-bracket-badge current">${brackets.CURRENT.toLocaleString()} XOF</span></td>
              <td><span class="aging-bracket-badge delay-30">${brackets['1_30_DAYS'].toLocaleString()} XOF</span></td>
              <td><span class="aging-bracket-badge delay-60">${brackets['31_60_DAYS'].toLocaleString()} XOF</span></td>
              <td><span class="aging-bracket-badge delay-60">${brackets['61_90_DAYS'].toLocaleString()} XOF</span></td>
              <td><span class="aging-bracket-badge delay-90">${brackets.OVER_90_DAYS.toLocaleString()} XOF</span></td>
              <td><strong>${agingReport.summary.total_balance_due.toLocaleString()} XOF</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div class="card">
      <div class="card-title"><i class="fas fa-bell"></i> ${t('unpaidInvoices')}</div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>${t('patient')}</th>
              <th>Assurance</th>
              <th>Total Owed</th>
              <th>Days Overdue</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${agingReport.data.length === 0 ? '<tr><td colspan="6" style="text-align:center;">Aucune facture en retard</td></tr>' : ''}
            ${agingReport.data.map(inv => `
              <tr>
                <td><strong>${inv.invoice_number}</strong></td>
                <td>${inv.patient_name} (${inv.patient_code})</td>
                <td>${inv.insurance_name || 'Aucune (Privé)'}</td>
                <td>${parseFloat(inv.total_balance_due).toLocaleString()} XOF</td>
                <td>${inv.days_overdue} jours</td>
                <td>
                  <button class="btn btn-primary" onclick="simulateRecovery('${inv.invoice_id}', '${inv.patient_phone}')">
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
// 2. Agenda & scheduling UI
// ============================================================================
let activePractitionerId = null;

async function renderAgenda(container) {
  // Fetch services, patients, and real database practitioners
  const [patients, services, dbPractitioners] = await Promise.all([
    api.request('/patients').catch(() => []),
    api.request('/medical-services').catch(() => []),
    api.request('/practitioners').catch(() => [])
  ]);
  
  const practitioners = dbPractitioners && dbPractitioners.length > 0
    ? dbPractitioners.map(p => ({
        id: p.id,
        name: `${p.title || 'Dr.'} ${p.first_name} ${p.last_name}`,
        specialty: p.specialty_name || 'Médecine',
        color: p.color_code || '#4A90E2'
      }))
    : [];

  if (!activePractitionerId && practitioners.length > 0) {
    activePractitionerId = practitioners[0].id;
  }

  // Fetch appointments
  const apptUrl = activePractitionerId 
    ? `/appointments?practitioner_id=${activePractitionerId}`
    : '/appointments';
  const appointments = await api.request(apptUrl).catch(() => []);

  container.innerHTML = `
    <div class="agenda-grid">
      <div>
        <div class="practitioner-list">
          <h4 style="margin-bottom:15px;">Praticiens</h4>
          ${practitioners.map(prac => `
            <div class="practitioner-item ${activePractitionerId === prac.id ? 'active' : ''}" onclick="selectPractitioner('${prac.id}')">
              <span class="color-dot" style="background-color: ${prac.color}"></span>
              <div>
                <strong>${prac.name}</strong>
                <div style="font-size:0.75rem; color:var(--text-muted);">${prac.specialty}</div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="card" style="margin-top:20px;">
          <div class="card-title">${t('bookAppt')}</div>
          <form id="appt-booking-form" onsubmit="bookAppointment(event)">
            <div class="form-group">
              <label class="form-label">${t('patient')}</label>
              <select class="form-control" id="book-patient-id" required>
                <option value="">-- Sélectionner Patient --</option>
                ${patients.map(p => `<option value="${p.id}">${p.first_name} ${p.last_name} (${p.patient_code})</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">${t('service')}</label>
              <select class="form-control" id="book-service-id" required>
                <option value="">-- Sélectionner Acte --</option>
                ${services.map(s => `<option value="${s.id}">${s.name} (${s.price} FCFA)</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">${t('dateTime')}</label>
              <input type="datetime-local" class="form-control" id="book-start-time" required />
            </div>
            <div class="form-group">
              <label class="form-label">${t('channel')}</label>
              <select class="form-control" id="book-channel">
                <option value="DESK">Guichet</option>
                <option value="WEB_PWA">PWA Web</option>
                <option value="VOICE_AGENT">Agent Vocal AI</option>
                <option value="WHATSAPP">WhatsApp</option>
              </select>
            </div>
            <button class="btn btn-primary" style="width:100%;"><i class="fas fa-plus"></i> ${t('bookBtn')}</button>
          </form>
        </div>
      </div>
      
      <div class="calendar-view">
        <div class="calendar-header">
          <h3>${t('schedule')}</h3>
        </div>
        
        <div class="calendar-slots">
          ${[8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(hour => {
            const hourStr = `${hour.toString().padStart(2, '0')}:00`;
            // Find appointments scheduled during this hour
            const appt = appointments.find(a => {
              const date = new Date(a.start_time);
              return date.getHours() === hour;
            });

            return `
              <div class="slot-hour">${hourStr}</div>
              <div class="slot-content">
                ${appt ? `
                  <div class="appt-pill" style="border-color:${practitioners[0].color};">
                    <div class="appt-pill-header">
                      <span>${appt.patient_first} ${appt.patient_last}</span>
                      <span style="font-size:0.75rem;" class="status-badge ${appt.status.toLowerCase()}">${appt.status}</span>
                    </div>
                    <div style="font-size:0.75rem; color:var(--text-muted);">${appt.service_name}</div>
                  </div>
                ` : '<div style="color:rgba(255,255,255,0.03);">Aucun rendez-vous</div>'}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

function selectPractitioner(id) {
  activePractitionerId = id;
  navigate('agenda');
}

async function bookAppointment(e) {
  e.preventDefault();
  const patient_id = document.getElementById('book-patient-id').value;
  const medical_service_id = document.getElementById('book-service-id').value;
  const start_time = document.getElementById('book-start-time').value;
  const booking_channel = document.getElementById('book-channel').value;
  
  try {
    const serviceRes = await api.request('/medical-services').catch(() => []);
    const targetedService = serviceRes.find(s => s.id === medical_service_id);
    let practitioner_id = targetedService ? targetedService.practitioner_id : null;

    if (!practitioner_id) {
      const pracList = await api.request('/practitioners').catch(() => []);
      if (pracList.length > 0) {
        practitioner_id = pracList[0].id;
      }
    }

    const result = await api.request('/appointments', {
      method: 'POST',
      body: JSON.stringify({
        practitioner_id,
        patient_id,
        medical_service_id,
        start_time,
        booking_channel
      })
    });

    showToast('Rendez-vous planifié avec succès!');
    navigate('agenda');
  } catch (err) {
    // Overlapping conflicts are handles by 409
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
  const [patients, rawStatuses] = await Promise.all([
    api.request('/patients'),
    api.request('/patient-statuses').catch(() => [])
  ]);

  // Ensure strict uniqueness by name
  const statuses = Array.from(new Map(rawStatuses.map(s => [s.name.trim().toLowerCase(), s])).values());
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
                <th>${t('phone')}</th>
                <th>${t('gender')}</th>
                <th>Naissance</th>
                <th>${t('height')} / ${t('weight')}</th>
                <th>${t('status')}</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${patients.length === 0 ? '<tr><td colspan="8" style="text-align:center; padding:30px; color:var(--text-muted);">Aucun patient enregistré</td></tr>' : ''}
              ${patients.map(p => {
                const height = p.height_cm ? parseFloat(p.height_cm) : null;
                const weight = p.weight_kg ? parseFloat(p.weight_kg) : null;
                const imc = (height && weight) ? (weight / Math.pow(height / 100, 2)).toFixed(1) : null;
                const statusName = p.status_name || p.status || 'Externe';
                const statusColor = p.status_color || '#4a90e2';
                return `
                <tr>
                  <td><strong>${p.patient_code}</strong></td>
                  <td>
                    <strong>${p.first_name} ${p.last_name}</strong>
                    ${p.blood_group ? `<span class="badge" style="background:#e74c3c; color:white; font-size:0.7rem; padding:1px 5px; border-radius:4px; margin-left:4px;">${p.blood_group}</span>` : ''}
                    ${p.observations ? `<div style="font-size:0.75rem; color:var(--text-muted); max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${p.observations}"><i class="fas fa-sticky-note"></i> ${p.observations}</div>` : ''}
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
                    <button class="btn btn-primary btn-sm" onclick="openDPIModal('${p.id}', '${p.first_name} ${p.last_name}')" style="padding:5px 10px;">
                      <i class="fas fa-folder-open"></i> Dossier 360°
                    </button>
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
  const phone_number = document.getElementById('p-phone').value;
  const first_name = document.getElementById('p-first').value;
  const last_name = document.getElementById('p-last').value;
  const gender = document.getElementById('p-gender').value;
  const date_of_birth = document.getElementById('p-dob').value;
  const blood_group = document.getElementById('p-blood').value || null;
  const height_cm = document.getElementById('p-height').value || null;
  const weight_kg = document.getElementById('p-weight').value || null;
  const observations = document.getElementById('p-observations').value || null;
  const allergies = document.getElementById('p-allergies').value ? document.getElementById('p-allergies').value.split(',').map(s => s.trim()) : [];
  
  const statusSelect = document.getElementById('p-status-id');
  const status_id = statusSelect ? statusSelect.value : null;
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
        status
      })
    });
    showToast('Patient enregistré avec succès!');
    navigate('patients');
  } catch (err) {}
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

  const age = p.date_of_birth ? Math.floor((new Date() - new Date(p.date_of_birth)) / (365.25 * 24 * 60 * 60 * 1000)) : null;

  bodyContainer.innerHTML = `
    <!-- Patient Profile Header Banner -->
    <div style="background:var(--bg-primary); border:1px solid var(--border-color); border-radius:10px; padding:15px 20px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:15px;">
      <div style="display:flex; align-items:center; gap:15px;">
        <div style="width:50px; height:50px; border-radius:50%; background:var(--primary); color:white; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:1.2rem;">
          ${p.first_name[0]}${p.last_name[0]}
        </div>
        <div>
          <div style="font-size:1.2rem; font-weight:700; color:var(--text-primary);">
            ${p.first_name} ${p.last_name} 
            ${p.blood_group ? `<span class="badge" style="background:#e74c3c; color:white; font-size:0.75rem; vertical-align:middle; margin-left:6px;">${p.blood_group}</span>` : ''}
          </div>
          <div style="font-size:0.85rem; color:var(--text-muted); display:flex; gap:15px; margin-top:3px;">
            <span><i class="fas fa-id-card"></i> <strong>${p.patient_code}</strong></span>
            <span><i class="fas fa-phone"></i> ${p.phone_number}</span>
            <span><i class="fas fa-venus-mars"></i> ${p.gender === 'M' ? 'Homme' : 'Femme'}</span>
            <span><i class="fas fa-birthday-cake"></i> ${age ? `${age} ans (${new Date(p.date_of_birth).toLocaleDateString()})` : '-'}</span>
          </div>
        </div>
      </div>
      
      <!-- Direct Status Change Selector -->
      <div style="display:flex; align-items:center; gap:10px;">
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

    <!-- DPI Navigation Tabs -->
    <div style="display:flex; gap:5px; border-bottom:2px solid var(--border-color); margin-bottom:20px; overflow-x:auto; padding-bottom:2px;">
      <button class="btn btn-sm ${activeDPITab === 'summary' ? 'btn-primary' : 'btn-secondary'}" onclick="switchDPITab('summary')">
        <i class="fas fa-id-badge"></i> Synthèse & Constantes
      </button>
      <button class="btn btn-sm ${activeDPITab === 'treatments' ? 'btn-primary' : 'btn-secondary'}" onclick="switchDPITab('treatments')">
        <i class="fas fa-pills"></i> Traitements & Résultats (${currentDossierData.treatments.length})
      </button>
      <button class="btn btn-sm ${activeDPITab === 'lab' ? 'btn-primary' : 'btn-secondary'}" onclick="switchDPITab('lab')">
        <i class="fas fa-vial"></i> Analyses & Examens (${currentDossierData.labOrders.length})
      </button>
      <button class="btn btn-sm ${activeDPITab === 'consultations' ? 'btn-primary' : 'btn-secondary'}" onclick="switchDPITab('consultations')">
        <i class="fas fa-stethoscope"></i> Consultations & Ordonnances (${currentDossierData.consultations.length})
      </button>
      <button class="btn btn-sm ${activeDPITab === 'history' ? 'btn-primary' : 'btn-secondary'}" onclick="switchDPITab('history')">
        <i class="fas fa-history"></i> RDV & Hospitalisation (${currentDossierData.appointments.length + currentDossierData.hospitalizations.length})
      </button>
    </div>

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
  // TAB 3: ANALYSES & EXAMENS (LABORATOIRE)
  // -------------------------------------------------------------
  if (activeDPITab === 'lab') {
    const list = currentDossierData.labOrders || [];
    return `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
        <h4 style="margin:0; color:var(--text-primary);"><i class="fas fa-vial"></i> Analyses Médicales & Examens Prescrits</h4>
        <button class="btn btn-primary btn-sm" onclick="openCreateLabOrderModal('${p.id}')">
          <i class="fas fa-plus"></i> Prescrire un Examen
        </button>
      </div>

      ${list.length === 0 ? `
        <div class="card" style="text-align:center; padding:30px; color:var(--text-muted);">
          <i class="fas fa-microscope fa-2x" style="margin-bottom:10px;"></i>
          <div>Aucune analyse ou examen prescrit pour ce patient.</div>
        </div>
      ` : `
        <div style="display:flex; flex-direction:column; gap:12px;">
          ${list.map(lo => {
            const isDone = lo.status === 'TERMINE';
            const statusColor = isDone ? 'var(--success)' : (lo.status === 'EN_COURS' ? 'var(--primary)' : '#f39c12');
            const statusLabel = isDone ? 'Terminé (Résultats disponibles)' : (lo.status === 'EN_COURS' ? 'En cours d\'analyse' : 'À faire');
            return `
              <div class="card" style="margin:0; padding:15px; border-left:4px solid ${statusColor};">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
                  <div>
                    <h4 style="margin:0 0 4px 0; color:var(--text-primary);">${lo.test_name}</h4>
                    <div style="font-size:0.8rem; color:var(--text-muted);">
                      <span class="badge" style="background:var(--bg-primary); border:1px solid var(--border-color);">${lo.category || 'Biologie'}</span>
                      <span class="badge" style="background:${lo.priority === 'URGENTE' ? '#e74c3c' : '#3498db'}; color:white; margin-left:6px;">${lo.priority}</span>
                      <span style="margin-left:8px;"><i class="fas fa-clock"></i> Prescrit le ${new Date(lo.created_at).toLocaleDateString()}</span>
                      ${lo.doc_first ? `<span style="margin-left:8px;"><i class="fas fa-user-md"></i> Dr. ${lo.doc_first} ${lo.doc_last}</span>` : ''}
                    </div>
                  </div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span class="badge" style="background:${statusColor}; color:white; padding:4px 8px; border-radius:4px; font-size:0.75rem;">
                      ${statusLabel}
                    </span>
                    <button class="btn btn-secondary btn-sm" onclick="openRecordLabResultModal('${lo.id}')" title="Saisir les résultats">
                      <i class="fas fa-file-medical-alt"></i> Saisir Résultats
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteLabOrderRecord('${lo.id}', '${p.id}')" style="background:var(--danger); border-color:var(--danger);" title="Supprimer">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>

                ${lo.clinical_notes ? `
                  <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:8px;">
                    <strong>Renseignements cliniques :</strong> ${lo.clinical_notes}
                  </div>
                ` : ''}

                <!-- Lab Results Report Box -->
                ${lo.results_text ? `
                  <div style="background:rgba(52, 152, 219, 0.08); border:1px solid rgba(52, 152, 219, 0.3); border-radius:6px; padding:10px 12px; margin-top:8px;">
                    <div style="font-size:0.8rem; font-weight:700; color:var(--primary); margin-bottom:4px;">
                      <i class="fas fa-check-circle"></i> Compte-rendu & Valeurs d'Analyses (Validé le ${lo.results_date ? new Date(lo.results_date).toLocaleDateString() : ''}) :
                    </div>
                    <div style="font-size:0.85rem; color:var(--text-primary); white-space:pre-wrap;">${lo.results_text}</div>
                    ${lo.document_url ? `<div style="margin-top:6px;"><a href="${lo.document_url}" target="_blank" class="btn btn-secondary btn-sm"><i class="fas fa-paperclip"></i> Voir document joint</a></div>` : ''}
                  </div>
                ` : `
                  <div style="font-size:0.8rem; color:var(--text-muted); font-style:italic;">En attente de résultat. Cliquez sur "Saisir Résultats" une fois l'analyse effectuée.</div>
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
    return `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
        <h4 style="margin:0; color:var(--text-primary);"><i class="fas fa-stethoscope"></i> Historique des Consultations</h4>
        <button class="btn btn-primary btn-sm" onclick="openNewConsultationFromDPI()">
          <i class="fas fa-plus"></i> Nouvelle Consultation & Ordonnance
        </button>
      </div>

      ${list.length === 0 ? `
        <div class="card" style="text-align:center; padding:30px; color:var(--text-muted);">
          <i class="fas fa-file-medical fa-2x" style="margin-bottom:10px;"></i>
          <div>Aucune consultation enregistrée pour le moment.</div>
        </div>
      ` : `
        <div style="display:flex; flex-direction:column; gap:12px;">
          ${list.map(c => `
            <div class="card" style="margin:0; padding:15px;">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                <div>
                  <h4 style="margin:0; color:var(--text-primary);">${c.reason_for_visit}</h4>
                  <div style="font-size:0.8rem; color:var(--text-muted);">
                    <span><i class="fas fa-calendar-alt"></i> ${new Date(c.created_at).toLocaleString()}</span>
                    ${c.doc_first ? `<span style="margin-left:10px;"><i class="fas fa-user-md"></i> Dr. ${c.doc_first} ${c.doc_last}</span>` : ''}
                  </div>
                </div>
                ${(c.icd10_diagnosis_codes && c.icd10_diagnosis_codes.length > 0) ? `
                  <div>
                    ${c.icd10_diagnosis_codes.map(code => `<span class="badge badge-primary" style="font-size:0.75rem;">${code}</span>`).join(' ')}
                  </div>
                ` : ''}
              </div>

              <div style="font-size:0.9rem; color:var(--text-primary); margin-bottom:8px;">
                <strong>Diagnostic :</strong> ${c.diagnosis_text}
              </div>

              ${c.clinical_examination ? `
                <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:8px;">
                  <strong>Examen clinique :</strong> ${c.clinical_examination}
                </div>
              ` : ''}
            </div>
          `).join('')}
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
function openCreateLabOrderModal(patientId) {
  const modal = document.getElementById('lab-order-modal');
  if (!modal) return;

  document.getElementById('lab-order-patient-id').value = patientId;
  document.getElementById('lab-order-test-name').value = '';
  document.getElementById('lab-order-category').value = 'Biologie';
  document.getElementById('lab-order-priority').value = 'NORMALE';
  document.getElementById('lab-order-notes').value = '';

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

  try {
    await api.request(`/patients/${patientId}/lab-orders`, {
      method: 'POST',
      body: JSON.stringify({ test_name, category, priority, clinical_notes })
    });
    showToast('Examen / analyse prescrit avec succès!');
    closeLabOrderModal();
    openDPIModal(patientId, activeDPIPatient.name);
  } catch (err) {
    showToast(`Erreur: ${err.message}`, 'error');
  }
}

function openRecordLabResultModal(labOrderId) {
  const modal = document.getElementById('lab-result-modal');
  if (!modal || !currentDossierData) return;

  const lo = currentDossierData.labOrders.find(item => item.id === labOrderId);
  if (!lo) return;

  document.getElementById('lab-result-id').value = lo.id;
  document.getElementById('lab-result-patient-id').value = lo.patient_id;
  document.getElementById('lab-result-test-title').innerText = lo.test_name;
  document.getElementById('lab-result-status').value = lo.status === 'A_FAIRE' ? 'TERMINE' : lo.status;
  document.getElementById('lab-result-text').value = lo.results_text || '';
  document.getElementById('lab-result-doc-url').value = lo.document_url || '';

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
    showToast('Résultats d\'analyse consignés avec succès!');
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

// -------------------------------------------------------------
// New Consultation from DPI
// -------------------------------------------------------------
function openNewConsultationFromDPI() {
  if (!activeDPIPatient) return;
  currentPrescriptionItems = [];
  renderPrescriptionItems();
  
  const modal = document.getElementById('dpi-consultation-form-modal');
  if (modal) {
    document.getElementById('dpi-consult-patient-name').innerText = activeDPIPatient.name;
    document.getElementById('dpi-reason').value = '';
    document.getElementById('dpi-diagnosis').value = '';
    document.getElementById('dpi-bp-sys').value = '';
    document.getElementById('dpi-bp-dia').value = '';
    document.getElementById('dpi-temp').value = '';
    document.getElementById('dpi-icd10').value = '';
    document.getElementById('dpi-confidential').value = '';
    modal.style.display = 'flex';
  }
}

function closeNewConsultationModal() {
  const modal = document.getElementById('dpi-consultation-form-modal');
  if (modal) modal.style.display = 'none';
}

function addPrescriptionItem() {
  const drug_name = document.getElementById('rx-drug').value;
  const dosage = document.getElementById('rx-dosage').value;
  const frequency = document.getElementById('rx-frequency').value;
  const duration_days = parseInt(document.getElementById('rx-duration').value);
  const instructions = document.getElementById('rx-instructions').value;

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
  const reason_for_visit = document.getElementById('dpi-reason').value;
  const diagnosis_text = document.getElementById('dpi-diagnosis').value;
  const icd10 = document.getElementById('dpi-icd10').value;
  const confidential_notes = document.getElementById('dpi-confidential').value;
  
  const bp_systolic = parseInt(document.getElementById('dpi-bp-sys').value) || null;
  const bp_diastolic = parseInt(document.getElementById('dpi-bp-dia').value) || null;
  const temp = parseFloat(document.getElementById('dpi-temp').value) || null;

  const icd10_diagnosis_codes = icd10 ? icd10.split(',').map(s => s.trim()) : [];

  const pracList = await api.request('/practitioners').catch(() => []);
  const practitioner_id = pracList.length > 0 ? pracList[0].id : null;

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

  if (currentPrescriptionItems.length > 0) {
    payload.prescription = {
      valid_until: document.getElementById('dpi-rx-expiry').value || null,
      items: currentPrescriptionItems
    };
  }

  try {
    const res = await api.request('/clinical/consultations', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    showToast('Consultation et ordonnance enregistrées!');
    closeNewConsultationModal();
    openDPIModal(activeDPIPatient.id, activeDPIPatient.name);
    
    // If prescription exists, show verification details
    if (res.prescription) {
      showPrescriptionConfirmation(res.prescription);
    }
  } catch (err) {}
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
let activeBillingSubTab = 'invoices'; // 'invoices', 'services', or 'insurances'
let currentServiceCategoryFilter = 'ALL';

async function renderBilling(container) {
  const [invoices, patients, registers, insurances, services] = await Promise.all([
    api.request('/billing/invoices').catch(() => []),
    api.request('/patients').catch(() => []),
    api.request('/billing/cash-registers').catch(() => []),
    api.request('/billing/insurances').catch(() => []),
    api.request('/medical-services').catch(() => [])
  ]);

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
        <button class="btn ${activeBillingSubTab === 'insurances' ? 'btn-primary' : 'btn-secondary'}" onclick="switchBillingSubTab('insurances')" style="font-size:0.9rem; padding:7px 18px;">
          <i class="fas fa-building"></i> Organismes IPM & Assurances (${insurances.length})
        </button>
      </div>

      ${activeBillingSubTab === 'services' ? `
        <button class="btn btn-primary" onclick="openCreateServiceModal()" style="font-size:0.85rem;">
          <i class="fas fa-plus"></i> Nouvel Acte / Traitement / Consultation
        </button>
      ` : ''}

      ${activeBillingSubTab === 'insurances' ? `
        <button class="btn btn-primary" onclick="openCreateInsuranceModal()" style="font-size:0.85rem;">
          <i class="fas fa-plus"></i> Nouvelle IPM / Assurance
        </button>
      ` : ''}
    </div>

    <div id="billing-subtab-content">
      ${activeBillingSubTab === 'invoices' 
        ? renderBillingInvoicesContent(invoices, patients, registers, insurances, services) 
        : activeBillingSubTab === 'services'
          ? renderBillingServicesContent(services)
          : renderBillingInsurancesContent(insurances)
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

function renderBillingInvoicesContent(invoices, patients, registers, insurances, services) {
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
              <select class="form-control" id="inv-patient-id" required>
                <option value="">-- Sélectionner Patient --</option>
                ${patients.map(p => `<option value="${p.id}">${p.first_name} ${p.last_name}</option>`).join('')}
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
              
              <!-- Quick selection from catalogue -->
              <div class="form-group" style="margin-bottom:12px; background:var(--bg-surface); padding:8px 10px; border-radius:6px; border:1px dashed var(--border-color);">
                <label class="form-label" style="font-size:0.78rem; color:var(--text-muted); margin-bottom:4px; display:flex; align-items:center; gap:6px;">
                  <i class="fas fa-magic" style="color:var(--primary);"></i> Catalogue (Consultations & Traitements) :
                </label>
                <select class="form-control" id="service-catalogue-select" onchange="applyServiceFromCatalogue(this)" style="font-size:0.85rem;">
                  <option value="">-- Choisir un acte ou traitement pour remplir --</option>
                  ${(services || []).filter(s => s.is_active !== false).map(s => `
                    <option value="${s.id}" data-name="${s.name.replace(/"/g, '&quot;')}" data-price="${s.price}">
                      [${s.category || 'ACTE'}] ${s.name} — ${parseFloat(s.price).toLocaleString()} FCFA
                    </option>
                  `).join('')}
                </select>
              </div>

              <div class="form-group">
                <input type="text" class="form-control" id="line-desc" placeholder="Désignation de l'acte (ex: Perfusion sanguine)" />
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
                        <i class="fas fa-file-invoice"></i> Facture Patient
                      </button>
                      ${inv.insurance_company_id ? `
                        <button class="btn btn-secondary btn-sm" style="background:#2c3e50; color:#fff; border-color:#2c3e50;" onclick="openInvoicePrintModal('${inv.id}', 'IPM')" title="Imprimer le Décompte / Facture IPM">
                          <i class="fas fa-building"></i> Facture IPM
                        </button>
                      ` : ''}
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

  if (invoiceLines.length === 0) {
    showToast('Ajoutez au moins un acte facturé', 'error');
    return;
  }

  try {
    await api.request('/billing/invoices', {
      method: 'POST',
      body: JSON.stringify({
        patient_id,
        insurance_company_id,
        discount_amount: 0,
        lines: invoiceLines
      })
    });

    showToast('Facture émise avec succès!');
    invoiceLines = [];
    navigate('billing');
  } catch (err) {}
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
    const response = await fetch(`/api/payments/webhook/${provider.toLowerCase()}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transaction_reference: ref,
        amount,
        invoice_id: invoiceId,
        status: 'SUCCESS'
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

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
    navigate('billing');
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
    navigate('billing');
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
    navigate('billing');
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

// ============================================================================
// 5. Pharmacy & Stocks Inventory UI
// ============================================================================
async function renderInventory(container) {
  const stock = await api.request('/inventory/items');

  container.innerHTML = `
    <div class="agenda-grid" style="grid-template-columns: 350px 1fr;">
      <div class="card">
        <div class="card-title"><i class="fas fa-folder-plus"></i> ${t('addStockItem')}</div>
        <form onsubmit="createStockItem(event)">
          <div class="form-group">
            <label class="form-label">SKU (Code Unique)</label>
            <input type="text" class="form-control" id="st-sku" placeholder="PARACETAMOL-1G" required />
          </div>
          <div class="form-group">
            <label class="form-label">Désignation Produit</label>
            <input type="text" class="form-control" id="st-name" placeholder="Paracétamol 1g" required />
          </div>
          <div class="form-group">
            <label class="form-label">Catégorie</label>
            <select class="form-control" id="st-category">
              <option value="MEDICATION">Médicament (MEDICATION)</option>
              <option value="CONSUMABLE">Matériel Clinique (CONSUMABLE)</option>
              <option value="SURGICAL">Chirurgical (SURGICAL)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">${t('unit')}</label>
            <input type="text" class="form-control" id="st-unit" placeholder="BOITE" required />
          </div>
          <div class="form-group">
            <label class="form-label">${t('threshold')}</label>
            <input type="number" class="form-control" id="st-threshold" value="10" required />
          </div>
          <div class="form-group">
            <label class="form-label">${t('purchaseCost')}</label>
            <input type="number" class="form-control" id="st-cost" required />
          </div>
          <div class="form-group">
            <label class="form-label">${t('sellingPrice')}</label>
            <input type="number" class="form-control" id="st-selling" required />
          </div>
          <button class="btn btn-primary" style="width:100%;"><i class="fas fa-save"></i> Enregistrer</button>
        </form>
      </div>
      
      <div class="card">
        <div class="card-title"><i class="fas fa-boxes"></i> ${t('pharmacyStock')}</div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Désignation</th>
                <th>Catégorie</th>
                <th>Unité</th>
                <th>Quantité</th>
                <th>P. Achat</th>
                <th>P. Vente</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${stock.map(item => {
                const isLow = item.current_stock_quantity <= item.minimum_threshold_alert;
                return `
                  <tr>
                    <td><strong>${item.sku}</strong></td>
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>${item.unit}</td>
                    <td>
                      <span class="status-badge ${isLow ? 'externe' : 'interne'}" style="background-color: ${isLow ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)'}; color: ${isLow ? 'var(--danger)' : 'var(--success)'};">
                        ${item.current_stock_quantity}
                      </span>
                    </td>
                    <td>${parseFloat(item.unit_cost_price).toLocaleString()} XOF</td>
                    <td>${parseFloat(item.selling_price).toLocaleString()} XOF</td>
                    <td style="display:flex; gap:6px;">
                      <button class="btn btn-secondary" style="font-size:0.75rem; padding:6px 10px;" onclick="openRestockModal('${item.id}', '${item.name}')">
                        <i class="fas fa-plus-circle"></i> Approvisionner
                      </button>
                      <button class="btn btn-danger" style="font-size:0.75rem; padding:6px 10px; background-color:rgba(239,68,68,0.1); color:var(--danger); border:1px solid rgba(239,68,68,0.2);" onclick="simulateDepletion('${item.id}', '${item.name}')">
                        <i class="fas fa-minus-circle"></i> Consommer
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

async function createStockItem(e) {
  e.preventDefault();
  const sku = document.getElementById('st-sku').value;
  const name = document.getElementById('st-name').value;
  const category = document.getElementById('st-category').value;
  const unit = document.getElementById('st-unit').value;
  const minimum_threshold_alert = document.getElementById('st-threshold').value;
  const unit_cost_price = document.getElementById('st-cost').value;
  const selling_price = document.getElementById('st-selling').value;

  try {
    await api.request('/inventory/items', {
      method: 'POST',
      body: JSON.stringify({
        sku, name, category, unit, minimum_threshold_alert, unit_cost_price, selling_price
      })
    });
    showToast('Article inventorié créé avec succès!');
    navigate('inventory');
  } catch (err) {}
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
  } catch (err) {}
}

async function simulateDepletion(id, name) {
  const qtyStr = prompt(`Quantité de [ ${name} ] à consommer/décréter (Simule consultation médicale ou utilisation clinique) :`, "1");
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
    // Catch-all triggers 422 if stock is insufficient
  }
}

// ============================================================================
// 6. Settings UI (Online Payment Gateways Configuration)
// ============================================================================
async function renderSettings(container) {
  const [methods, tenant, statuses] = await Promise.all([
    api.request('/payment-methods'),
    api.request('/tenant/profile'),
    api.request('/patient-statuses').catch(() => [])
  ]);
  
  const gps = tenant.gps_coordinates || { latitude: '', longitude: '' };

  container.innerHTML = `
    <!-- Patient Statuses Settings Card -->
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
    <!-- Clinic Identity Settings -->
    <div class="card" style="margin-bottom: 24px;">
      <div class="card-title"><i class="fas fa-clinic-medical"></i> Identité de la Clinique / Cabinet</div>
      <form onsubmit="saveClinicProfile(event)">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
          <div class="form-group">
            <label class="form-label">Nom du Cabinet / Clinique</label>
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
            <label class="form-label">Logo de la Clinique</label>
            <div style="display:flex; gap:5px;">
              <input type="text" class="form-control" id="prof-logo" value="${tenant.logo_url || ''}" placeholder="/logo-default.png" style="flex:1;" />
              <input type="file" id="prof-logo-file" style="display:none;" accept="image/*" onchange="uploadImage(this, 'prof-logo')" />
              <button type="button" class="btn btn-secondary" onclick="document.getElementById('prof-logo-file').click()" style="padding:0 12px; height:38px;" title="Uploader Logo"><i class="fas fa-upload"></i></button>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Cachet / Tampon Officiel de la Clinique</label>
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
        <button class="btn btn-primary" type="submit"><i class="fas fa-save"></i> Enregistrer le Profil Clinique</button>
      </form>
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
    
    showToast('Profil clinique mis à jour avec succès !');
    navigate('settings');
  } catch (err) {}
}

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

  const isSuperAdmin = state.user.role === 'SUPER_ADMIN';

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
        <div class="landing-brand">
          <svg class="landing-brand-logo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="44" stroke="currentColor" stroke-width="7" />
            <path d="M38 32 C48 24, 52 36, 42 46 C32 56, 42 68, 52 62" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
            <path d="M52 64 L52 42 L62 56 L72 42 L72 64" stroke="#4a90e2" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M46 36 L50 36 L52 28 L55 42 L57 33 L59 36 L63 36" stroke="#4a90e2" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M50 78 L50 86 M46 82 L54 82" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" />
          </svg>
          <span style="font-weight:700; font-size:1.4rem; color:#ffffff;">Soft<span style="color:var(--primary);">Med</span></span>
        </div>
        <div style="display:flex; align-items:center; gap:20px;">
          <button class="btn btn-secondary" onclick="openAuthModal('login')">${t('homeCTAConnect')}</button>
          <button class="btn btn-primary" onclick="openAuthModal('signup')">${t('homeCTASignup')}</button>
        </div>
      </nav>

      <!-- Hero Section -->
      <header class="landing-hero">
        <h1>${t('homeTitle')}</h1>
        <p>${t('homeSubtitle')}</p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-lg" onclick="openAuthModal('login')"><i class="fas fa-sign-in-alt"></i> ${t('homeCTAConnect')}</button>
          <button class="btn btn-secondary btn-lg" onclick="openAuthModal('signup')"><i class="fas fa-plus-circle"></i> ${t('homeCTASignup')}</button>
        </div>
      </header>

      <!-- Features Section -->
      <section class="landing-features">
        <h2>${t('homeFeatures')}</h2>
        <div class="features-grid">
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
          <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-shield-alt"></i></div>
            <h3>${t('homeFeature6')}</h3>
            <p>${t('homeFeature6Desc')}</p>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="landing-footer">
        <p>${t('complianceText')}</p>
        <p style="margin-top:10px; font-size:0.8rem; opacity:0.6;">&copy; 2026 SoftMed Enterprise. Tous droits réservés.</p>
      </footer>
    </div>

    <!-- Auth Modal Overlay -->
    <div class="modal-overlay" id="auth-modal" style="display:none; justify-content:center; align-items:center;">
      <div class="modal-container" style="width:500px; max-width:95%; max-height:90vh; overflow-y:auto; position:relative; animation: modalFadeIn 0.3s ease;">
        <button class="modal-close" onclick="closeAuthModal()" style="position:absolute; top:15px; right:15px; background:none; border:none; color:var(--text-muted); font-size:1.5rem; cursor:pointer;">&times;</button>
        <div style="text-align:center; margin-bottom:20px; padding-top:15px;">
          <h3 id="auth-modal-title" style="color:var(--text-primary); font-size:1.4rem; margin-bottom:15px;">Se Connecter</h3>
        </div>
        
        <!-- Tab selector -->
        <div style="display:flex; border-bottom:1px solid var(--border-color); margin-bottom:20px;">
          <button id="tab-login-btn" class="btn btn-secondary" style="flex:1; border:none; border-bottom:2px solid var(--primary); border-radius:0; background:none;" onclick="switchAuthTab('login')">Se Connecter</button>
          <button id="tab-signup-btn" class="btn btn-secondary" style="flex:1; border:none; border-radius:0; background:none;" onclick="switchAuthTab('signup')">S'enregistrer</button>
        </div>

        <!-- Login Form -->
        <form id="login-form" onsubmit="handleLogin(event)">
          <div class="form-group">
            <label class="form-label">Identifiant Clinique (Tenant Slug)</label>
            <input type="text" class="form-control" id="login-tenant-slug" value="espoir" placeholder="ex: espoir" required />
          </div>
          <div class="form-group">
            <label class="form-label">Adresse Email</label>
            <input type="email" class="form-control" id="login-email" value="admin@espoir.com" placeholder="nom@espoir.com" required />
          </div>
          <div class="form-group">
            <label class="form-label">Mot de passe</label>
            <input type="password" class="form-control" id="login-password" value="admin123" placeholder="••••••••" required />
          </div>
          <button class="btn btn-primary" style="width:100%; height:45px; margin-top:10px;">Accéder à ma clinique</button>
        </form>

        <!-- Signup Form (Hidden by default) -->
        <form id="signup-form" onsubmit="handleTenantSignup(event)" style="display:none;">
          <div class="form-group">
            <label class="form-label">Nom de la Clinique / Cabinet</label>
            <input type="text" class="form-control" id="signup-tenant-name" placeholder="Clinique de l'Espoir" required />
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
              <label class="form-label">Logo de la Clinique</label>
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
            <h5 style="margin-bottom:10px; color:var(--text-primary);">Compte Administrateur Principal</h5>
            <div style="display:flex; gap:10px; margin-bottom:10px;">
              <input type="text" class="form-control" id="signup-first" placeholder="Prénom" required />
              <input type="text" class="form-control" id="signup-last" placeholder="Nom" required />
            </div>
            <div class="form-group">
              <input type="email" class="form-control" id="signup-email" placeholder="email@clinique.com" required />
            </div>
            <div class="form-group">
              <input type="password" class="form-control" id="signup-password" placeholder="Mot de passe" required />
            </div>
          </div>
          <button class="btn btn-primary" style="width:100%; height:45px; margin-top:10px;">Créer ma clinique & démarrer</button>
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
  const loginBtn = document.getElementById('tab-login-btn');
  const signupBtn = document.getElementById('tab-signup-btn');
  const title = document.getElementById('auth-modal-title');
  
  if (tab === 'login') {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    loginBtn.style.borderBottom = '2px solid var(--primary)';
    signupBtn.style.borderBottom = 'none';
    if (title) title.innerText = state.currentLang === 'ar' ? 'تسجيل الدخول' : 'Se Connecter';
  } else {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    loginBtn.style.borderBottom = 'none';
    signupBtn.style.borderBottom = '2px solid var(--primary)';
    renderSignupPaymentMethodsList();
    if (title) title.innerText = state.currentLang === 'ar' ? 'سجل عيادة جديدة' : "S'enregistrer (Clinique)";
  }
}

// Build shell and sidebar menus
function renderAppLayout() {
  const root = document.getElementById('app-root');
  
  root.innerHTML = `
    <div class="app-container">
      <!-- Sidebar Panel -->
      <aside class="sidebar">
        <div class="sidebar-brand">
          <svg class="sidebar-brand-logo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="color:#ffffff;">
            <circle cx="50" cy="50" r="44" stroke="currentColor" stroke-width="7" />
            <path d="M38 32 C48 24, 52 36, 42 46 C32 56, 42 68, 52 62" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
            <path d="M52 64 L52 42 L62 56 L72 42 L72 64" stroke="#4a90e2" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M46 36 L50 36 L52 28 L55 42 L57 33 L59 36 L63 36" stroke="#4a90e2" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M50 78 L50 86 M46 82 L54 82" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" />
          </svg>
          <span style="font-weight:700; font-size:1.25rem; color:#ffffff; letter-spacing:0.5px;">Soft<span style="color:var(--primary);">Med</span></span>
        </div>
        <ul class="sidebar-menu">
          <li class="menu-item active" data-tab="dashboard" onclick="navigate('dashboard')">
            <a class="menu-link"><i class="fas fa-chart-pie"></i> <span>${t('dashboard')}</span></a>
          </li>
          <li class="menu-item" data-tab="agenda" onclick="navigate('agenda')">
            <a class="menu-link"><i class="fas fa-calendar-alt"></i> <span>${t('agenda')}</span></a>
          </li>
          <li class="menu-item" data-tab="patients" onclick="navigate('patients')">
            <a class="menu-link"><i class="fas fa-notes-medical"></i> <span>${t('patients')}</span></a>
          </li>
          <li class="menu-item" data-tab="billing" onclick="navigate('billing')">
            <a class="menu-link"><i class="fas fa-wallet"></i> <span>${t('billing')}</span></a>
          </li>
          <li class="menu-item" data-tab="inventory" onclick="navigate('inventory')">
            <a class="menu-link"><i class="fas fa-box"></i> <span>${t('inventory')}</span></a>
          </li>
          <li class="menu-item" data-tab="hospital" onclick="navigate('hospital')">
            <a class="menu-link"><i class="fas fa-bed"></i> <span>${t('hospital')}</span></a>
          </li>
          <li class="menu-item" data-tab="settings" onclick="navigate('settings')">
            <a class="menu-link"><i class="fas fa-credit-card"></i> <span>${t('settings')}</span></a>
          </li>
          <li class="menu-item" data-tab="tenants" onclick="navigate('tenants')">
            <a class="menu-link"><i class="fas fa-hospital"></i> <span>${t('tenants')}</span></a>
          </li>
        </ul>
        <div class="sidebar-user">
          <div class="avatar">${state.user.first_name[0]}${state.user.last_name[0]}</div>
          <div class="user-info">
            <div class="user-name">${state.user.first_name} ${state.user.last_name}</div>
            <div class="user-role">${state.user.role === 'SUPER_ADMIN' ? t('superAdmin') : state.user.role}</div>
          </div>
          <div class="btn-logout" onclick="logout()"><i class="fas fa-power-off"></i></div>
        </div>
      </aside>

      <!-- Main workspace panel -->
      <main class="main-content">
        <header class="header">
          <div class="header-title" id="header-page-title">${t('dashboard')}</div>
          <div class="header-actions">
            <div style="font-size:0.85rem; color:var(--text-muted);">
              <i class="fas fa-clinic-medical"></i> ${state.tenant.name} (Slug: <strong>${state.tenant.slug}</strong>)
            </div>
          </div>
        </header>
        
        <div class="content-body" id="content-body">
          <!-- Dynamically populated by tabs -->
        </div>
      </main>
    </div>

    <!-- Modals declarations -->
    
    <!-- 1. Dossier Médical 360° (DPI Modal) -->
    <div class="modal-overlay" id="dpi-modal" style="display:none;">
      <div class="modal-container" style="width:950px; max-width:96%; max-height:92vh; overflow-y:auto;">
        <div class="modal-header" style="border-bottom:none; padding-bottom:0;">
          <h4 class="modal-title" style="display:flex; align-items:center; gap:8px;">
            <i class="fas fa-folder-open" style="color:var(--primary);"></i> Dossier Médical Partagé (DPI 360°)
          </h4>
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
          <h4 class="modal-title">Nouvelle Consultation - <span id="dpi-consult-patient-name"></span></h4>
          <button class="modal-close" onclick="closeNewConsultationModal()">&times;</button>
        </div>
        <form onsubmit="submitConsultation(event)">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
            <div class="form-group">
              <label class="form-label">${t('reason')} *</label>
              <input type="text" class="form-control" id="dpi-reason" required placeholder="ex: Céphalées fébriles" />
            </div>
            <div class="form-group">
              <label class="form-label">${t('diagnosis')} *</label>
              <input type="text" class="form-control" id="dpi-diagnosis" required placeholder="ex: Accès palustre simple" />
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
            <input type="text" class="form-control" id="dpi-icd10" placeholder="B54, R50.9, R51" />
          </div>
          <div class="form-group">
            <label class="form-label">${t('confidentialNotes')}</label>
            <textarea class="form-control" id="dpi-confidential" rows="2" placeholder="Saisie confidentielle médicale..."></textarea>
          </div>
          
          <div class="card" style="margin-top:15px; padding:15px; border-color:var(--primary);">
            <h5 style="margin-bottom:10px; color:#fff;"><i class="fas fa-file-prescription"></i> ${t('prescribe')} (Ordonnance Sécurisée)</h5>
            <div style="display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:10px; margin-bottom:10px;">
              <input type="text" class="form-control" id="rx-drug" placeholder="Médicament (ex: Coartem 80/480mg)" />
              <input type="text" class="form-control" id="rx-dosage" placeholder="Dosage (ex: 1 cp)" />
              <input type="text" class="form-control" id="rx-frequency" placeholder="2 fois/jour" />
              <input type="number" class="form-control" id="rx-duration" value="3" placeholder="Durée (jours)" />
            </div>
            <div style="display:flex; gap:10px; margin-bottom:15px;">
              <input type="text" class="form-control" id="rx-instructions" placeholder="Instructions (ex: Au cours d'un repas gras)" style="flex:1;" />
              <button class="btn btn-secondary" type="button" onclick="addPrescriptionItem()">${t('addItem')}</button>
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
      <div class="modal-container" style="width:600px; max-width:95%;">
        <div class="modal-header">
          <h4 class="modal-title">Prescrire un Examen / Analyse Médicale</h4>
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
            <textarea class="form-control" id="lab-order-notes" rows="3" placeholder="Précisez le contexte clinique, suspicion diagnostique..."></textarea>
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
      <div class="modal-container" style="width:650px; max-width:95%;">
        <div class="modal-header">
          <h4 class="modal-title">Saisir Résultats : <span id="lab-result-test-title"></span></h4>
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
          <div class="form-group">
            <label class="form-label">Résultats & Compte-rendu d'Analyse *</label>
            <textarea class="form-control" id="lab-result-text" rows="5" required placeholder="ex: GB: 6 500 /mm3, Hb: 13.8 g/dL, Plaquettes: 240 000 /mm3. Conclusion: Formule dans les limites de la normale."></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Document Joint (facultatif)</label>
            <div style="display:flex; gap:5px;">
              <input type="text" class="form-control" id="lab-result-doc-url" placeholder="URL du document ou scanner..." style="flex:1;" />
              <input type="file" id="lab-result-file" style="display:none;" accept="image/*,.pdf" onchange="uploadImage(this, 'lab-result-doc-url')" />
              <button type="button" class="btn btn-secondary" onclick="document.getElementById('lab-result-file').click()"><i class="fas fa-upload"></i></button>
            </div>
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
  `;
  
  navigate(state.currentTab);
}

// Check auth status and render appropriate layouts
function initApp() {
  if (state.token) {
    // Pre-fetch complete tenant profile
    api.request('/tenant/profile').then(profile => {
      state.tenant = profile;
      renderAppLayout();
    }).catch(() => {
      renderAppLayout();
    });

    // Pre-check if any cashier cash session is open
    api.request('/patients').then(() => { // Simulated check
      // For demonstration, we simulate cache session values if cashier
      if (state.user.role === 'CASHIER' || state.user.role === 'SUPER_ADMIN') {
        state.activeCashSession = { id: 'session-simulated-id', opening_balance: 50000 };
      }
    }).catch(() => {});
  } else {
    renderAuthLayout();
  }
}

// ============================================================================
// Hospitalization Tab (Bed & Occupancy Management)
// ============================================================================
let activeHospitalSubTab = 'beds';
let hospitalSelectedBedId = null;

async function renderHospital(container) {
  const [buildings, rooms, beds, stays] = await Promise.all([
    api.request('/hospital/buildings'),
    api.request('/hospital/rooms'),
    api.request('/hospital/beds'),
    api.request('/hospital/hospitalizations?status=ADMITTED')
  ]);

  const fr = state.currentLang === 'fr';

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
      <h3 style="color:var(--text-primary); font-weight:600; margin:0;">${fr ? 'Gestion de l\'Hospitalisation' : 'إدارة الاستشفاء والإقامة'}</h3>
    </div>

    <!-- Sub-tab Selector -->
    <div style="display:flex; gap:10px; margin-bottom:20px; border-bottom:1px solid var(--border-color); padding-bottom:10px;">
      <button class="btn ${activeHospitalSubTab === 'beds' ? 'btn-primary' : 'btn-secondary'}" onclick="switchHospitalSubTab('beds')" style="font-size:0.9rem; padding: 6px 15px;">
        <i class="fas fa-bed"></i> ${fr ? 'Lits & Hospitalisations' : 'الأسرة والاقامات'}
      </button>
      <button class="btn ${activeHospitalSubTab === 'setup' ? 'btn-primary' : 'btn-secondary'}" onclick="switchHospitalSubTab('setup')" style="font-size:0.9rem; padding: 6px 15px;">
        <i class="fas fa-tools"></i> ${fr ? 'Configuration Structure' : 'إعداد الهيكل'}
      </button>
    </div>

    <div id="hospital-subtab-content">
      ${activeHospitalSubTab === 'beds' 
        ? renderBedsDashboard(buildings, rooms, beds, stays, fr) 
        : renderHospitalSetup(buildings, rooms, beds, fr)
      }
    </div>

    <!-- Patient Admission Modal -->
    <div class="modal-overlay" id="admit-modal" style="display:none; justify-content:center; align-items:center;">
      <div class="modal-container" style="width:450px; max-width:95%; animation: modalFadeIn 0.3s ease;">
        <div class="modal-header" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:15px;">
          <h4 class="modal-title" style="margin:0; color:var(--text-primary); font-weight:600;">${fr ? 'Admettre un Patient' : 'إدخال مريض جديد'}</h4>
          <button class="modal-close" onclick="closeAdmitModal()" style="background:none; border:none; color:var(--text-muted); font-size:1.4rem; cursor:pointer;">&times;</button>
        </div>
        <form onsubmit="saveAdmission(event)">
          <div class="form-group">
            <label class="form-label">${fr ? 'Sélectionner le Patient' : 'اختر المريض'}</label>
            <select class="form-control" id="admit-patient-select" required>
              <option value="">-- ${fr ? 'Choisir un patient' : 'اختر مريضاً'} --</option>
            </select>
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
                <i class="fas fa-user-injured" style="color:var(--primary); margin-right:4px;"></i> <strong>${bed.stay.patient_first_name} ${bed.stay.patient_last_name}</strong>
                <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">
                  Admis: ${admittedDate.toLocaleDateString('fr-FR')} (${days} j)
                </div>
              </div>
            `;
            btnHtml = `<button class="btn btn-danger" style="width:100%; font-size:0.8rem; margin-top:10px; background-color:var(--danger);" onclick="dischargeAndInvoice('${bed.stay.id}', '${bed.name}')"><i class="fas fa-sign-out-alt"></i> Libérer & Facturer</button>`;
          } else {
            occupantHtml = `<div style="font-size:0.8rem; color:var(--text-muted); margin-top:8px;">Occupé (Détails RLS masqués)</div>`;
            btnHtml = `<button class="btn btn-secondary" style="width:100%; font-size:0.8rem; margin-top:10px;" disabled>Occupé</button>`;
          }
        } else if (isMaintenance) {
          colorTheme = 'var(--warning)';
          statusBadge = `<span class="badge" style="background-color:var(--warning); color:black; font-size:0.7rem; padding:2px 6px; border-radius:12px;">Entretien</span>`;
          btnHtml = `<button class="btn btn-secondary" style="width:100%; font-size:0.8rem; margin-top:10px;" disabled>Entretien</button>`;
        } else {
          statusBadge = `<span class="badge" style="background-color:var(--primary); color:white; font-size:0.7rem; padding:2px 6px; border-radius:12px;">${fr ? 'Disponible' : 'متاح'}</span>`;
          btnHtml = `<button class="btn btn-primary" style="width:100%; font-size:0.8rem; margin-top:10px;" onclick="openAdmitModal('${bed.id}')"><i class="fas fa-check"></i> Admettre</button>`;
        }

        return `
          <div class="card" style="border-top: 4px solid ${colorTheme}; display:flex; flex-direction:column; justify-content:space-between; padding:12px; min-height:165px; background-color:var(--bg-surface);">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <h5 style="margin:0; font-size:1rem; font-weight:600; color:var(--text-primary);"><i class="fas fa-bed"></i> ${bed.name}</h5>
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
            <i class="fas fa-door-open" style="color:var(--primary);"></i> ${r.number_or_name} <span style="font-size:0.8rem; font-weight:400; color:var(--text-muted);">(${r.room_type})</span>
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
          <i class="fas fa-building" style="color:var(--primary);"></i> ${b.name} ${b.code ? `<span style="font-size:0.85rem; font-weight:400; color:var(--text-muted);">(${b.code})</span>` : ''}
        </h4>
        ${roomsHtml}
      </div>
    `;
  }).join('');
}

function renderHospitalSetup(buildings, rooms, beds, fr) {
  const buildingOptions = buildings.map(b => `<option value="${b.id}">${b.name}</option>`).join('');
  const roomOptions = rooms.map(r => `<option value="${r.id}">${r.number_or_name} (${r.building_name})</option>`).join('');

  return `
    <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:20px;">
      <!-- A. Add Building -->
      <div class="card" style="padding:15px;">
        <h4 style="margin-top:0; margin-bottom:15px; color:var(--text-primary); font-size:1.05rem; font-weight:600; border-bottom:1px solid var(--border-color); padding-bottom:8px;"><i class="fas fa-building"></i> Ajouter un Bâtiment</h4>
        <form onsubmit="saveBuilding(event)">
          <div class="form-group">
            <label class="form-label">Nom du Bâtiment</label>
            <input type="text" class="form-control" id="build-name" placeholder="ex: Pavillon A" required />
          </div>
          <div class="form-group">
            <label class="form-label">Code (facultatif)</label>
            <input type="text" class="form-control" id="build-code" placeholder="ex: PAV-A" />
          </div>
          <button class="btn btn-primary" type="submit" style="width:100%; margin-top:10px;"><i class="fas fa-plus"></i> Créer Bâtiment</button>
        </form>
      </div>

      <!-- B. Add Room -->
      <div class="card" style="padding:15px;">
        <h4 style="margin-top:0; margin-bottom:15px; color:var(--text-primary); font-size:1.05rem; font-weight:600; border-bottom:1px solid var(--border-color); padding-bottom:8px;"><i class="fas fa-door-open"></i> Ajouter une Chambre</h4>
        <form onsubmit="saveRoom(event)">
          <div class="form-group">
            <label class="form-label">Bâtiment</label>
            <select class="form-control" id="room-building-id" required>
              <option value="">-- Choisir un bâtiment --</option>
              ${buildingOptions}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Nom / Numéro de Chambre</label>
            <input type="text" class="form-control" id="room-number" placeholder="ex: Ch 101" required />
          </div>
          <div class="form-group">
            <label class="form-label">Type</label>
            <select class="form-control" id="room-type" required>
              <option value="STANDARD">STANDARD</option>
              <option value="VIP">VIP</option>
              <option value="SOINS_INTENSIFS">SOINS INTENSIFS (ICU)</option>
              <option value="MATERNITE">MATERNITÉ</option>
            </select>
          </div>
          <button class="btn btn-primary" type="submit" style="width:100%; margin-top:10px;"><i class="fas fa-plus"></i> Créer Chambre</button>
        </form>
      </div>

      <!-- C. Add Bed -->
      <div class="card" style="padding:15px;">
        <h4 style="margin-top:0; margin-bottom:15px; color:var(--text-primary); font-size:1.05rem; font-weight:600; border-bottom:1px solid var(--border-color); padding-bottom:8px;"><i class="fas fa-bed"></i> Ajouter un Lit</h4>
        <form onsubmit="saveBed(event)">
          <div class="form-group">
            <label class="form-label">Chambre / Salle</label>
            <select class="form-control" id="bed-room-id" required>
              <option value="">-- Choisir une chambre --</option>
              ${roomOptions}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Nom / Numéro de Lit</label>
            <input type="text" class="form-control" id="bed-name" placeholder="ex: Lit A" required />
          </div>
          <div class="form-group">
            <label class="form-label">Luxe / Classe</label>
            <select class="form-control" id="bed-luxury" required>
              <option value="STANDARD">STANDARD</option>
              <option value="CONFORT">CONFORT</option>
              <option value="VIP">VIP</option>
              <option value="SUITE">SUITE</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Tarif journalier d'hébergement (XOF)</label>
            <input type="number" class="form-control" id="bed-rate" placeholder="ex: 15000" min="0" required />
          </div>
          <button class="btn btn-primary" type="submit" style="width:100%; margin-top:10px;"><i class="fas fa-plus"></i> Créer Lit</button>
        </form>
      </div>
    </div>
  `;
}

async function openAdmitModal(bedId) {
  hospitalSelectedBedId = bedId;
  const select = document.getElementById('admit-patient-select');
  if (!select) return;

  try {
    const [patients, stays] = await Promise.all([
      api.request('/patients'),
      api.request('/hospital/hospitalizations?status=ADMITTED').catch(() => [])
    ]);

    // Exclude only patients who are actively hospitalized in a bed
    const admittedIds = new Set((stays || []).map(s => s.patient_id));
    const availablePatients = (patients || []).filter(p => !admittedIds.has(p.id));

    select.innerHTML = `
      <option value="">-- Choisir un patient --</option>
      ${availablePatients.length > 0 ? availablePatients.map(p => `
        <option value="${p.id}">${p.first_name} ${p.last_name} (${p.patient_code}) ${p.status ? `— [${p.status}]` : ''}</option>
      `).join('') : '<option value="" disabled>Aucun patient disponible (tous sont actuellement hospitalisés)</option>'}
    `;

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
  const notes = document.getElementById('admit-notes').value;

  if (!patientId || !hospitalSelectedBedId) return;

  try {
    await api.request('/hospital/hospitalizations', {
      method: 'POST',
      body: JSON.stringify({
        patient_id: patientId,
        bed_id: hospitalSelectedBedId,
        notes
      })
    });

    showToast('Admission enregistrée avec succès! Le patient est maintenant Hospitalisé.');
    closeAdmitModal();
    navigate('hospital');
  } catch (err) {}
}

async function dischargeAndInvoice(stayId, bedName) {
  if (!confirm(`Souhaitez-vous libérer le lit "${bedName}" et facturer le séjour ?`)) return;

  try {
    showToast('Traitement de la sortie et calcul des frais...', 'info');
    
    const res = await api.request(`/hospital/hospitalizations/${stayId}/discharge`, {
      method: 'POST',
      body: JSON.stringify({ notes: 'Sortie standard d\'hospitalisation' })
    });

    showToast(`Patient libéré! Séjour: ${res.duration_days} jours. Total: ${res.total_cost.toLocaleString()} FCFA.`);

    if (!state.activeCashSession) {
      showToast('Veuillez ouvrir une session de caisse dans "Caisse & Facturation" pour finaliser le règlement.', 'warning');
    }

    state.currentTab = 'billing';
    
    const stayLine = {
      description: `Hébergement Lit ${res.bed_name} (${res.luxury_level || 'STANDARD'}) - ${res.duration_days} jours`,
      quantity: 1,
      unit_price: res.total_cost,
      service_id: null
    };

    invoiceLines = [stayLine];
    navigate('billing');
    
    setTimeout(() => {
      const patientSelect = document.getElementById('inv-patient-id');
      if (patientSelect) {
        patientSelect.value = res.hospitalization.patient_id;
      }
      renderInvoiceLines();
    }, 500);

  } catch (err) {
    showToast('Erreur lors de la libération : ' + err.message, 'error');
  }
}

async function saveBuilding(e) {
  e.preventDefault();
  const name = document.getElementById('build-name').value;
  const code = document.getElementById('build-code').value;

  try {
    await api.request('/hospital/buildings', {
      method: 'POST',
      body: JSON.stringify({ name, code })
    });
    showToast('Bâtiment créé avec succès!');
    navigate('hospital');
  } catch (err) {}
}

async function saveRoom(e) {
  e.preventDefault();
  const building_id = document.getElementById('room-building-id').value;
  const number_or_name = document.getElementById('room-number').value;
  const room_type = document.getElementById('room-type').value;

  try {
    await api.request('/hospital/rooms', {
      method: 'POST',
      body: JSON.stringify({ building_id, number_or_name, room_type })
    });
    showToast('Chambre créée avec succès!');
    navigate('hospital');
  } catch (err) {}
}

async function saveBed(e) {
  e.preventDefault();
  const room_id = document.getElementById('bed-room-id').value;
  const name = document.getElementById('bed-name').value;
  const luxury_level = document.getElementById('bed-luxury').value;
  const daily_rate = parseFloat(document.getElementById('bed-rate').value);

  try {
    await api.request('/hospital/beds', {
      method: 'POST',
      body: JSON.stringify({ room_id, name, luxury_level, daily_rate })
    });
    showToast('Lit créé avec succès!');
    navigate('hospital');
  } catch (err) {}
}

// Run app init on load
window.addEventListener('DOMContentLoaded', () => {
  localStorage.setItem('lang', 'fr');
  document.body.removeAttribute('dir');
  initApp();
});
