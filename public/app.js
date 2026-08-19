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
    homeSubtitle: "La plateforme médicale SaaS multi-tenant moderne, sécurisée et bilingue.",
    homeCTAConnect: "Se Connecter",
    homeCTASignup: "Créer un Nouveau Cabinet",
    homeFeatures: "Fonctionnalités Clés",
    homeFeature1: "Dossier Patient Informatisé (DPI)",
    homeFeature1Desc: "Saisie rapide des constantes vitales, antécédents et diagnostics CIM-10.",
    homeFeature2: "Ordonnances Sécurisées",
    homeFeature2Desc: "Génération de prescriptions infalsifiables avec signature cryptographique QR Code.",
    homeFeature3: "Facturation & Tiers-Payant (IPM)",
    homeFeature3Desc: "Ventilation automatisée de la part patient et assurance, avec suivi de la balance âgée.",
    homeFeature4: "Gestion de Pharmacie & Stock",
    homeFeature4Desc: "Contrôle des stocks de consommables, suivi des lots et alertes de péremption.",
    homeFeature5: "Sécurité & Isolation RLS",
    homeFeature5Desc: "Isolation stricte des données de santé au niveau de la base de données (Row-Level Security).",
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
    homeSubtitle: "منصة طبية سحابية حديثة، آمنة، متعددة المستأجرين وتدعم اللغتين العربية والفرنسية.",
    homeCTAConnect: "تسجيل الدخول",
    homeCTASignup: "تسجيل عيادة جديدة",
    homeFeatures: "الميزات الرئيسية للمنصة",
    homeFeature1: "الملف الطبي الرقمي للمريض (DPI)",
    homeFeature1Desc: "تسجيل سريع للعلامات الحيوية، التشخيصات والرموز الطبية الدولية CIM-10.",
    homeFeature2: "الوصفات الطبية المؤمنة",
    homeFeature2Desc: "إنشاء وصفات طبية غير قابلة للتزوير تعتمد على رمز الاستجابة السريعة المشفر QR.",
    homeFeature3: "الفواتير والجهات الضامنة (IPM)",
    homeFeature3Desc: "حساب آلي للمساهمات المشتركة للمرضى والشركات، مع إدارة الديون المتأخرة.",
    homeFeature4: "إدارة الصيدلية والمخزون",
    homeFeature4Desc: "مراقبة مستمرة للمستهلكات الطبية، وتتبع تواريخ الصلاحية وتنبيهات النفاد.",
    homeFeature5: "الأمان وعزل البيانات الصارم (RLS)",
    homeFeature5Desc: "عزل كامل لبيانات المرضى على مستوى قاعدة البيانات لضمان السرية والخصوصية.",
    complianceText: "متوافق مع قوانين حماية البيانات الشخصية واللوائح المالية لمنطقة غرب إفريقيا (Wave, Orange Money, SPI, Yas)."
  }
};

// Global App State
let state = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  tenant: JSON.parse(localStorage.getItem('tenant')) || null,
  currentLang: localStorage.getItem('lang') || 'fr',
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
        last_name
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
  // Fetch services and patients for selectors
  const patients = await api.request('/patients');
  const services = await api.request('/medical-services');
  
  // Hardcoded sample practitioners or fetch
  // Normally doctor is registered, we can look up from practitioners table
  const dbPractitioners = await api.request('/patients'); // We can fetch from backend users or custom list
  // Let's seed a standard doctor list
  const practitioners = [
    { id: 'doctor-seeded-uuid', name: 'Dr. Amadou Diallo', specialty: 'Pédiatre', color: '#4A90E2' }
  ];

  if (!activePractitionerId) activePractitionerId = practitioners[0].id;

  // Fetch appointments
  const appointments = await api.request(`/appointments?practitioner_id=${activePractitionerId}`);

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
  
  // Seed database doctor-seeded-uuid (which matches seeded doctor user)
  // Let's resolve the doctor from practitioners seeded in init
  try {
    const listRes = await api.request('/patients'); // Lookup or use hardcoded uuid
    // In db-init, we seeded Amadou Diallo. Let's find his ID from the backend practitioners list
    // To make it easy, backend will return practitioners. But for tests, we will verify this.
    // Let's query practitioner ID
    const serviceRes = await api.request('/medical-services');
    const targetedService = serviceRes.find(s => s.id === medical_service_id);
    const practitioner_id = targetedService.practitioner_id || 'doctor-seeded-uuid';

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

async function renderPatients(container) {
  const patients = await api.request('/patients');

  container.innerHTML = `
    <div class="agenda-grid" style="grid-template-columns: 350px 1fr;">
      <div class="card">
        <div class="card-title"><i class="fas fa-user-plus"></i> ${t('regPatient')}</div>
        <form onsubmit="registerPatient(event)">
          <div class="form-group">
            <label class="form-label">${t('firstName')}</label>
            <input type="text" class="form-control" id="p-first" required />
          </div>
          <div class="form-group">
            <label class="form-label">${t('lastName')}</label>
            <input type="text" class="form-control" id="p-last" required />
          </div>
          <div class="form-group">
            <label class="form-label">${t('phone')}</label>
            <input type="text" class="form-control" id="p-phone" required placeholder="+22177..." />
          </div>
          <div class="form-group">
            <label class="form-label">${t('gender')}</label>
            <select class="form-control" id="p-gender" required>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">${t('dob')}</label>
            <input type="date" class="form-control" id="p-dob" required />
          </div>
          <div class="form-group">
            <label class="form-label">${t('bloodGroup')}</label>
            <input type="text" class="form-control" id="p-blood" placeholder="A+" />
          </div>
          <div class="form-group">
            <label class="form-label">${t('allergies')}</label>
            <input type="text" class="form-control" id="p-allergies" placeholder="pollen, pénicilline" />
          </div>
          <div class="form-group">
            <label class="form-label">${t('status')}</label>
            <select class="form-control" id="p-status">
              <option value="Externe">${t('externe')}</option>
              <option value="Interne">${t('interne')}</option>
            </select>
          </div>
          <button class="btn btn-primary" style="width:100%;"><i class="fas fa-save"></i> ${t('regBtn')}</button>
        </form>
      </div>
      
      <div class="card">
        <div class="card-title"><i class="fas fa-users"></i> ${t('patientList')}</div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>${t('patient')}</th>
                <th>${t('phone')}</th>
                <th>${t('gender')}</th>
                <th>Naissance</th>
                <th>${t('status')}</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${patients.map(p => `
                <tr>
                  <td><strong>${p.patient_code}</strong></td>
                  <td>${p.first_name} ${p.last_name}</td>
                  <td>${p.phone_number}</td>
                  <td>${p.gender}</td>
                  <td>${new Date(p.date_of_birth).toLocaleDateString()}</td>
                  <td><span class="status-badge ${p.status.toLowerCase()}">${p.status === 'Interne' ? t('interne') : t('externe')}</span></td>
                  <td>
                    <button class="btn btn-secondary" onclick="openDPIModal('${p.id}', '${p.first_name} ${p.last_name}')">
                      <i class="fas fa-file-medical"></i> DPI
                    </button>
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

async function registerPatient(e) {
  e.preventDefault();
  const phone_number = document.getElementById('p-phone').value;
  const first_name = document.getElementById('p-first').value;
  const last_name = document.getElementById('p-last').value;
  const gender = document.getElementById('p-gender').value;
  const date_of_birth = document.getElementById('p-dob').value;
  const blood_group = document.getElementById('p-blood').value;
  const allergies = document.getElementById('p-allergies').value ? document.getElementById('p-allergies').value.split(',').map(s => s.trim()) : [];
  const status = document.getElementById('p-status').value;

  try {
    await api.request('/patients', {
      method: 'POST',
      body: JSON.stringify({
        phone_number, first_name, last_name, gender, date_of_birth, blood_group, allergies, status
      })
    });
    showToast('Patient enregistré avec succès!');
    navigate('patients');
  } catch (err) {}
}

function openDPIModal(patientId, patientName) {
  activeDPIPatient = { id: patientId, name: patientName };
  currentPrescriptionItems = [];
  
  const modal = document.getElementById('dpi-modal');
  document.getElementById('dpi-modal-title').innerText = `${t('recordConsult')} - ${patientName}`;
  renderPrescriptionItems();
  
  modal.style.display = 'flex';
}

function closeDPIModal() {
  document.getElementById('dpi-modal').style.display = 'none';
  activeDPIPatient = null;
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
  if (currentPrescriptionItems.length === 0) {
    container.innerHTML = '<div style="color:var(--text-muted);">Aucun médicament prescrit</div>';
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

  const payload = {
    patient_id: activeDPIPatient.id,
    practitioner_id: 'doctor-seeded-uuid', // Map doctor id
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
    closeDPIModal();
    
    // If prescription exists, show verification details
    if (res.prescription) {
      showPrescriptionConfirmation(res.prescription);
    }
  } catch (err) {}
}

function showPrescriptionConfirmation(rx) {
  const modal = document.getElementById('rx-confirmation-modal');
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

// ============================================================================
// 4. Invoices & Billing cash register UI
// ============================================================================
let invoiceLines = [];
let activePaymentInvoice = null;

async function renderBilling(container) {
  // Check active cash session
  // In our simple state, we check if there is an open cash session for this cashier
  const sessionCheck = await api.request('/patients'); // We can fetch current open session or simulate
  // For the frontend client, we will fetch cash sessions or check state
  const invoices = await api.request('/billing/invoices');
  const patients = await api.request('/patients');
  const insurances = await api.request('/payment-methods'); // We fetch all models
  
  // Custom fetch for insurance companies list
  // Let's seed insurance list
  const insuranceCompanies = [
    { id: 'insurance-seeded-uuid', name: 'IPM SONATEL', code: 'IPM-SONATEL' }
  ];

  container.innerHTML = `
    <div class="agenda-grid" style="grid-template-columns: 400px 1fr;">
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
                  <option value="register-seeded-uuid">Caisse Principale Guichet 1</option>
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
              <select class="form-control" id="inv-insurance-id">
                <option value="">Privé (Pas de couverture)</option>
                ${insuranceCompanies.map(ic => `<option value="${ic.id}">${ic.name}</option>`).join('')}
              </select>
            </div>
            
            <div style="border-top:1px solid var(--border-color); padding-top:15px; margin-top:15px;">
              <h5 style="margin-bottom:10px;">Prestations Facturées</h5>
              <div class="form-group">
                <input type="text" class="form-control" id="line-desc" placeholder="Désignation de l'acte (ex: Consultation)" />
              </div>
              <div style="display:flex; gap:10px; margin-bottom:15px;">
                <input type="number" class="form-control" id="line-price" placeholder="Tarif" style="flex:2;" />
                <input type="number" class="form-control" id="line-qty" value="1" placeholder="Qté" style="flex:1;" />
                <button class="btn btn-secondary" type="button" onclick="addInvoiceLine()"><i class="fas fa-plus"></i></button>
              </div>
              <div id="invoice-lines-list" style="margin-bottom:15px;"></div>
            </div>
            
            <div class="card" style="background-color:var(--bg-surface); padding:15px; font-size:0.85rem;" id="invoice-totals-box">
              <!-- Live totals calculation -->
              <div>Gross Total: 0 FCFA</div>
              <div>Patient split (100%): 0 FCFA</div>
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
                  <td>${inv.insurance_company_id ? 'IPM SONATEL' : 'Privé'}</td>
                  <td>${parseFloat(inv.total_amount_net).toLocaleString()} FCFA</td>
                  <td>${parseFloat(inv.patient_share_amount).toLocaleString()} FCFA</td>
                  <td><span class="status-badge ${inv.status.toLowerCase()}">${inv.status}</span></td>
                  <td>
                    ${inv.status !== 'PAID' ? `
                      <button class="btn btn-success" onclick="openPaymentModal('${inv.id}', '${inv.invoice_number}', ${inv.patient_share_amount - inv.patient_paid_amount})">
                        <i class="fas fa-money-bill-wave"></i> ${t('payBtn')}
                      </button>
                    ` : '<span class="text-success"><i class="fas fa-check"></i> Réglé</span>'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  renderInvoiceLines();
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
          ${initRes.qr_code_data ? `
            <div class="qr-placeholder" style="background-color:#fff; color:#000; font-size:0.65rem; padding:10px; display:flex; flex-direction:column; justify-content:center;">
              <i class="fas fa-qrcode fa-3x" style="color:var(--primary); margin-bottom:5px;"></i>
              <strong>Code QR généré</strong>
              <div style="font-size:0.5rem; word-break:break-all;">${initRes.qr_code_data}</div>
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
  const [methods, tenant] = await Promise.all([
    api.request('/payment-methods'),
    api.request('/tenant/profile')
  ]);
  
  const wave = methods.find(m => m.provider === 'WAVE') || { credentials: {} };
  const om = methods.find(m => m.provider === 'ORANGE_MONEY') || { credentials: {} };
  const spi = methods.find(m => m.provider === 'SPI') || { credentials: {} };
  const yas = methods.find(m => m.provider === 'YAS') || { credentials: {} };
  const card = methods.find(m => m.provider === 'CARTE_BANCAIRE') || { credentials: {} };

  const gps = tenant.gps_coordinates || { latitude: '', longitude: '' };

  container.innerHTML = `
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
        <div style="display:grid; grid-template-columns:2fr 1fr 1fr; gap:15px; margin-bottom:15px;">
          <div class="form-group">
            <label class="form-label">Logo URL</label>
            <input type="text" class="form-control" id="prof-logo" value="${tenant.logo_url || ''}" placeholder="/logo-default.png" />
          </div>
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
      <div class="card-title"><i class="fas fa-cash-register"></i> ${t('onlinePaymentSetup')}</div>
      <div class="payment-setup-grid">
        <!-- 1. Wave Configuration -->
        <div class="payment-setup-card">
          <div class="payment-setup-header">
            <div class="payment-brand-title"><span class="brand-icon wave">W</span> Wave Mobile Money</div>
            <label class="switch">
              <input type="checkbox" id="check-wave" ${wave.is_active ? 'checked' : ''} onchange="toggleGateway('WAVE', this.checked)" />
              <span class="slider"></span>
            </label>
          </div>
          <div class="form-group">
            <label class="form-label">${t('waveMerchant')}</label>
            <input type="text" class="form-control" id="val-wave-merchant" value="${wave.credentials.merchant_id || ''}" placeholder="WAVE-ESPOIR-001" />
          </div>
          <div class="form-group">
            <label class="form-label">${t('phone')} Associé</label>
            <input type="text" class="form-control" id="val-wave-phone" value="${wave.credentials.phone_number || ''}" placeholder="+22177..." />
          </div>
          <button class="btn btn-primary" style="font-size:0.8rem; width:100%;" onclick="saveGatewayConfig('WAVE')">${t('saveConfig')}</button>
        </div>

        <!-- 2. Orange Money Configuration -->
        <div class="payment-setup-card">
          <div class="payment-setup-header">
            <div class="payment-brand-title"><span class="brand-icon om">OM</span> Orange Money</div>
            <label class="switch">
              <input type="checkbox" id="check-om" ${om.is_active ? 'checked' : ''} onchange="toggleGateway('ORANGE_MONEY', this.checked)" />
              <span class="slider"></span>
            </label>
          </div>
          <div class="form-group">
            <label class="form-label">${t('omCode')}</label>
            <input type="text" class="form-control" id="val-om-merchant" value="${om.credentials.merchant_code || ''}" placeholder="190928" />
          </div>
          <div class="form-group">
            <label class="form-label">${t('phone')} Associé</label>
            <input type="text" class="form-control" id="val-om-phone" value="${om.credentials.phone_number || ''}" placeholder="+22178..." />
          </div>
          <button class="btn btn-primary" style="font-size:0.8rem; width:100%;" onclick="saveGatewayConfig('ORANGE_MONEY')">${t('saveConfig')}</button>
        </div>

        <!-- 3. SPI Instant Payment Configuration -->
        <div class="payment-setup-card">
          <div class="payment-setup-header">
            <div class="payment-brand-title"><span class="brand-icon spi">SPI</span> SPI instantané</div>
            <label class="switch">
              <input type="checkbox" id="check-spi" ${spi.is_active ? 'checked' : ''} onchange="toggleGateway('SPI', this.checked)" />
              <span class="slider"></span>
            </label>
          </div>
          <div class="form-group">
            <label class="form-label">${t('spiIban')}</label>
            <input type="text" class="form-control" id="val-spi-iban" value="${spi.credentials.account_number || ''}" placeholder="SN098 01092 19280192801 92" />
          </div>
          <div class="form-group">
            <label class="form-label">Nom Banque</label>
            <input type="text" class="form-control" id="val-spi-bank" value="${spi.credentials.bank_name || ''}" placeholder="CBAO Groupe Attijariwafa" />
          </div>
          <button class="btn btn-primary" style="font-size:0.8rem; width:100%;" onclick="saveGatewayConfig('SPI')">${t('saveConfig')}</button>
        </div>

        <!-- 4. Yas Payment Configuration -->
        <div class="payment-setup-card">
          <div class="payment-setup-header">
            <div class="payment-brand-title"><span class="brand-icon yas">Y</span> Yas Mobile</div>
            <label class="switch">
              <input type="checkbox" id="check-yas" ${yas.is_active ? 'checked' : ''} onchange="toggleGateway('YAS', this.checked)" />
              <span class="slider"></span>
            </label>
          </div>
          <div class="form-group">
            <label class="form-label">${t('yasKey')}</label>
            <input type="password" class="form-control" id="val-yas-key" value="${yas.credentials.api_key || ''}" placeholder="••••••••••••••••" />
          </div>
          <button class="btn btn-primary" style="font-size:0.8rem; width:100%;" onclick="saveGatewayConfig('YAS')">${t('saveConfig')}</button>
        </div>

        <!-- 5. Card configuration -->
        <div class="payment-setup-card">
          <div class="payment-setup-header">
            <div class="payment-brand-title"><span class="brand-icon card">CB</span> Carte Bancaire</div>
            <label class="switch">
              <input type="checkbox" id="check-card" ${card.is_active ? 'checked' : ''} onchange="toggleGateway('CARTE_BANCAIRE', this.checked)" />
              <span class="slider"></span>
            </label>
          </div>
          <div class="form-group">
            <label class="form-label">${t('cardKey')}</label>
            <input type="text" class="form-control" id="val-card-key" value="${card.credentials.public_key || ''}" placeholder="pk_live_..." />
          </div>
          <button class="btn btn-primary" style="font-size:0.8rem; width:100%;" onclick="saveGatewayConfig('CARTE_BANCAIRE')">${t('saveConfig')}</button>
        </div>
      </div>
    </div>
  `;
}

async function saveGatewayConfig(provider) {
  let name = '';
  let credentials = {};
  
  if (provider === 'WAVE') {
    name = 'Wave Payment';
    credentials = {
      merchant_id: document.getElementById('val-wave-merchant').value,
      phone_number: document.getElementById('val-wave-phone').value
    };
  } else if (provider === 'ORANGE_MONEY') {
    name = 'Orange Money Payment';
    credentials = {
      merchant_code: document.getElementById('val-om-merchant').value,
      phone_number: document.getElementById('val-om-phone').value
    };
  } else if (provider === 'SPI') {
    name = 'SPI Bank Transfer';
    credentials = {
      account_number: document.getElementById('val-spi-iban').value,
      bank_name: document.getElementById('val-spi-bank').value
    };
  } else if (provider === 'YAS') {
    name = 'Yas Pay';
    credentials = {
      api_key: document.getElementById('val-yas-key').value
    };
  } else if (provider === 'CARTE_BANCAIRE') {
    name = 'Carte Bancaire Stripe';
    credentials = {
      public_key: document.getElementById('val-card-key').value
    };
  }

  const isChecked = document.getElementById(`check-${provider.toLowerCase() === 'carte_bancaire' ? 'card' : provider.toLowerCase()}`).checked;

  try {
    await api.request('/payment-methods', {
      method: 'POST',
      body: JSON.stringify({
        provider,
        name,
        credentials,
        is_active: isChecked
      })
    });
    showToast(`Configuration ${provider} enregistrée avec succès!`);
  } catch (err) {}
}

async function toggleGateway(provider, isChecked) {
  try {
    // If it's a simple toggle, save current credentials but change status
    const methods = await api.request('/payment-methods');
    const gateway = methods.find(m => m.provider === provider) || { credentials: {}, name: `${provider} Payment` };
    
    await api.request('/payment-methods', {
      method: 'POST',
      body: JSON.stringify({
        provider,
        name: gateway.name,
        credentials: gateway.credentials,
        is_active: isChecked
      })
    });
    showToast(`Passerelle ${provider} ${isChecked ? 'activée' : 'désactivée'}.`);
  } catch (err) {}
}

async function saveClinicProfile(e) {
  e.preventDefault();
  const name = document.getElementById('prof-name').value;
  const phone_number = document.getElementById('prof-phone').value;
  const email = document.getElementById('prof-email').value;
  const ninea_rc = document.getElementById('prof-ninea').value;
  const address = document.getElementById('prof-address').value;
  const logo_url = document.getElementById('prof-logo').value;
  const latVal = parseFloat(document.getElementById('prof-lat').value);
  const lngVal = parseFloat(document.getElementById('prof-lng').value);

  const gps_coordinates = (!isNaN(latVal) && !isNaN(lngVal)) ? { latitude: latVal, longitude: lngVal } : null;

  try {
    const updated = await api.request('/tenant/profile', {
      method: 'PUT',
      body: JSON.stringify({
        name, phone_number, email, ninea_rc, address, logo_url, gps_coordinates
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
                  <img src="${tnt.logo_url || '/logo-espoir.png'}" alt="logo" style="width:40px; height:40px; border-radius:8px; object-fit:contain; background-color:white; padding:2px; border:1px solid var(--border-color);" onerror="this.src='/logo-espoir.png';" />
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
          <span style="font-weight:700; font-size:1.4rem; color:var(--text-primary);">Soft<span style="color:var(--primary);">Med</span></span>
        </div>
        <div style="display:flex; align-items:center; gap:20px;">
          <div class="lang-selector">
            <span class="lang-btn ${state.currentLang === 'fr' ? 'active' : ''}" onclick="switchLang('fr')">FR</span>
            <span class="lang-btn ${state.currentLang === 'ar' ? 'active' : ''}" onclick="switchLang('ar')">العربية</span>
          </div>
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
            <div class="feature-icon"><i class="fas fa-box"></i></div>
            <h3>${t('homeFeature4')}</h3>
            <p>${t('homeFeature4Desc')}</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-shield-alt"></i></div>
            <h3>${t('homeFeature5')}</h3>
            <p>${t('homeFeature5Desc')}</p>
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
      <div class="modal-container" style="width:450px; max-width:95%; position:relative; animation: modalFadeIn 0.3s ease;">
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
            <div class="lang-selector">
              <span class="lang-btn ${state.currentLang === 'fr' ? 'active' : ''}" onclick="switchLang('fr')">FR</span>
              <span class="lang-btn ${state.currentLang === 'ar' ? 'active' : ''}" onclick="switchLang('ar')">العربية</span>
            </div>
          </div>
        </header>
        
        <div class="content-body" id="content-body">
          <!-- Dynamically populated by tabs -->
        </div>
      </main>
    </div>

    <!-- Modals declarations -->
    
    <!-- 1. DPI Consultation Record Modal -->
    <div class="modal-overlay" id="dpi-modal" style="display:none;">
      <div class="modal-container" style="width:700px; max-width:95%;">
        <div class="modal-header">
          <h4 class="modal-title" id="dpi-modal-title">Consultation DPI</h4>
          <button class="modal-close" onclick="closeDPIModal()">&times;</button>
        </div>
        <form onsubmit="submitConsultation(event)">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
            <div class="form-group">
              <label class="form-label">${t('reason')}</label>
              <input type="text" class="form-control" id="dpi-reason" required />
            </div>
            <div class="form-group">
              <label class="form-label">${t('diagnosis')}</label>
              <input type="text" class="form-control" id="dpi-diagnosis" required />
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
            <label class="form-label">${t('icd10')}</label>
            <input type="text" class="form-control" id="dpi-icd10" placeholder="K35.8, R51" />
          </div>
          <div class="form-group">
            <label class="form-label">${t('confidentialNotes')}</label>
            <textarea class="form-control" id="dpi-confidential" rows="2" placeholder="Saisie confidentielle médicale..."></textarea>
          </div>
          
          <div class="card" style="margin-top:15px; padding:15px; border-color:var(--primary);">
            <h5 style="margin-bottom:10px; color:#fff;"><i class="fas fa-file-prescription"></i> ${t('prescribe')}</h5>
            <div style="display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:10px; margin-bottom:10px;">
              <input type="text" class="form-control" id="rx-drug" placeholder="Médicament (ex: Paracétamol)" />
              <input type="text" class="form-control" id="rx-dosage" placeholder="Dosage (ex: 1g)" />
              <input type="text" class="form-control" id="rx-frequency" placeholder="Fréquence" />
              <input type="number" class="form-control" id="rx-duration" value="5" placeholder="Durée" />
            </div>
            <div style="display:flex; gap:10px; margin-bottom:15px;">
              <input type="text" class="form-control" id="rx-instructions" placeholder="Instructions (ex: Pendant les repas)" style="flex:1;" />
              <button class="btn btn-secondary" type="button" onclick="addPrescriptionItem()">${t('addItem')}</button>
            </div>
            <div id="rx-items-list"></div>
            <div class="form-group" style="margin-top:15px; margin-bottom:0;">
              <label class="form-label">${t('validity')}</label>
              <input type="date" class="form-control" id="dpi-rx-expiry" />
            </div>
          </div>
          
          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px;">
            <button class="btn btn-secondary" type="button" onclick="closeDPIModal()">Annuler</button>
            <button class="btn btn-primary" type="submit">${t('saveConsult')}</button>
          </div>
        </form>
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
              <input type="text" class="form-control" id="tenant-logo" placeholder="/logo-espoir.png" />
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

// Run app init on load
window.addEventListener('DOMContentLoaded', () => {
  initApp();
});
