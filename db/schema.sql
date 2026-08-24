-- ClinicOS PostgreSQL Database Schema

-- Drop tables in reverse order of dependencies if they exist
DROP VIEW IF EXISTS view_aging_balance;
DROP TABLE IF EXISTS medical_audit_logs;
DROP TABLE IF EXISTS stock_movements;
DROP TABLE IF EXISTS stock_lots;
DROP TABLE IF EXISTS stock_items;
DROP TABLE IF EXISTS debt_recovery_actions;
DROP TABLE IF EXISTS ipm_claims_items;
DROP TABLE IF EXISTS ipm_claims_batches;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS invoice_lines;
DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS cash_sessions;
DROP TABLE IF EXISTS cash_registers;
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS medical_services;
DROP TABLE IF EXISTS medical_documents;
DROP TABLE IF EXISTS prescription_items;
DROP TABLE IF EXISTS prescriptions;
DROP TABLE IF EXISTS consultation_notes;
DROP TABLE IF EXISTS medical_records;
DROP TABLE IF EXISTS patient_insurance_policies;
DROP TABLE IF EXISTS insurance_companies;
DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS practitioners;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tenant_payment_methods;
DROP TABLE IF EXISTS tenants;

-- Drop Enums if they exist
DROP TYPE IF EXISTS stock_movement_type;
DROP TYPE IF EXISTS claim_status;
DROP TYPE IF EXISTS payment_method;
DROP TYPE IF EXISTS invoice_status;
DROP TYPE IF EXISTS booking_channel;
DROP TYPE IF EXISTS appointment_status;
DROP TYPE IF EXISTS user_role;

-- Extensions requises
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "btree_gist";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Énumérations Système
CREATE TYPE user_role AS ENUM ('SUPER_ADMIN', 'DOCTOR', 'SECRETARY', 'NURSE', 'CASHIER', 'PHARMACIST', 'ACCOUNTANT');
CREATE TYPE appointment_status AS ENUM ('PENDING_PAYMENT', 'CONFIRMED', 'IN_WAITING_ROOM', 'IN_CONSULTATION', 'COMPLETED', 'CANCELED', 'NO_SHOW');
CREATE TYPE booking_channel AS ENUM ('VOICE_AGENT', 'WHATSAPP', 'WEB_PWA', 'DESK');
CREATE TYPE invoice_status AS ENUM ('DRAFT', 'ISSUED', 'PARTIALLY_PAID', 'PAID', 'OVERDUE', 'CANCELED', 'DISPUTED_IPM');
CREATE TYPE claim_status AS ENUM ('PENDING_SUBMISSION', 'SUBMITTED', 'ACCEPTED', 'PARTIALLY_REJECTED', 'REJECTED', 'SETTLED');
CREATE TYPE stock_movement_type AS ENUM ('INITIAL_IN', 'PURCHASE_RECEIPT', 'CONSULTATION_USAGE', 'ADJUSTMENT_LOSS', 'RETURN');

-- ============================================================================
-- 1. FONDATION MULTI-TENANT & ACTEURS
-- ============================================================================

CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    ninea_rc VARCHAR(50), -- Identifiant fiscal sénégalais
    logo_url VARCHAR(500) NULL,
    stamp_url VARCHAR(500) NULL,
    address TEXT NULL,
    email VARCHAR(255) NULL,
    gps_coordinates JSONB NULL, -- {"latitude": 14.6937, "longitude": -17.4479}
    settings JSONB NOT NULL DEFAULT '{"currency": "XOF", "deposit_rate": 0.20, "grace_period_days": 30}',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tenant_payment_methods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL, -- 'WAVE', 'ORANGE_MONEY', 'YAS', 'SPI', 'CARTE_BANCAIRE'
    name VARCHAR(100) NOT NULL, -- e.g. 'Wave Pro Clinic', 'Orange Money Caisse'
    credentials JSONB NOT NULL DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT true,
    qr_code_template VARCHAR(500) NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role user_role NOT NULL DEFAULT 'SECRETARY',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_tenant_email UNIQUE (tenant_id, email)
);

CREATE TABLE medical_specialties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    color_code VARCHAR(7) DEFAULT '#4a90e2',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_tenant_specialty_code UNIQUE (tenant_id, code)
);

CREATE TABLE practitioners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    title VARCHAR(50) DEFAULT 'Dr.',
    grade VARCHAR(100) DEFAULT 'Docteur en Médecine', -- Pr. Titulaire, Agrégé, Assistant, etc.
    specialty_name VARCHAR(100) DEFAULT 'Médecine Générale',
    is_general_practitioner BOOLEAN NOT NULL DEFAULT false,
    phone_number VARCHAR(30),
    email VARCHAR(255),
    license_number VARCHAR(50), -- N° Ordre des Médecins
    color_code VARCHAR(7) DEFAULT '#0d3b66',
    consultation_fee NUMERIC(10, 2) DEFAULT 15000,
    status VARCHAR(20) NOT NULL DEFAULT 'Interne' CHECK (status IN ('Interne', 'Externe')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE practitioner_specialties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    practitioner_id UUID NOT NULL REFERENCES practitioners(id) ON DELETE CASCADE,
    specialty_id UUID NOT NULL REFERENCES medical_specialties(id) ON DELETE CASCADE,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_practitioner_specialty UNIQUE (practitioner_id, specialty_id)
);

-- ============================================================================
-- HOSPITALIZATION & INFRASTRUCTURE TABLES
-- ============================================================================

CREATE TABLE IF NOT EXISTS hospital_buildings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hospital_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    building_id UUID NOT NULL REFERENCES hospital_buildings(id) ON DELETE CASCADE,
    room_number VARCHAR(100) NOT NULL,
    number_or_name VARCHAR(100),
    room_type VARCHAR(50) NOT NULL DEFAULT 'STANDARD',
    daily_rate NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hospital_beds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    room_id UUID NOT NULL REFERENCES hospital_rooms(id) ON DELETE CASCADE,
    bed_number VARCHAR(100),
    name VARCHAR(100),
    luxury_level VARCHAR(50) NOT NULL DEFAULT 'STANDARD',
    daily_rate NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'OCCUPIED', 'MAINTENANCE')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hospitalizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    bed_id UUID NOT NULL REFERENCES hospital_beds(id) ON DELETE RESTRICT,
    admitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    discharged_at TIMESTAMPTZ NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ADMITTED' CHECK (status IN ('ADMITTED', 'DISCHARGED')),
    notes TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE medical_departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL, -- Ex: SERV-CARDIO, SERV-PED, SERV-MEDGEN
    name VARCHAR(100) NOT NULL, -- Ex: Service de Cardiologie, Service de Pédiatrie
    specialty_id UUID REFERENCES medical_specialties(id) ON DELETE SET NULL,
    head_practitioner_id UUID REFERENCES practitioners(id) ON DELETE SET NULL,
    building_id UUID REFERENCES hospital_buildings(id) ON DELETE SET NULL,
    location VARCHAR(100),
    description TEXT,
    color_code VARCHAR(7) DEFAULT '#4a90e2',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_tenant_department_code UNIQUE (tenant_id, code)
);

CREATE TABLE practitioner_departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    practitioner_id UUID NOT NULL REFERENCES practitioners(id) ON DELETE CASCADE,
    department_id UUID NOT NULL REFERENCES medical_departments(id) ON DELETE CASCADE,
    role_in_department VARCHAR(100) DEFAULT 'Praticien Titulaire', -- Chef de Service, Praticien Titulaire, Médecin Consultant, Interne
    is_primary BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_practitioner_department UNIQUE (practitioner_id, department_id)
);

-- ============================================================================
-- 2. RÉFÉRENTIEL PATIENTS & COUVERTURE ASSURANCE (IPM)
-- ============================================================================

CREATE TABLE patient_statuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    color_code VARCHAR(7) DEFAULT '#4A90E2',
    is_default BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_tenant_status_code UNIQUE (tenant_id, code)
);

CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    patient_code VARCHAR(30) NOT NULL, -- Ex: PAT-2026-00084
    phone_number VARCHAR(30) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('M', 'F')),
    date_of_birth DATE NOT NULL,
    blood_group VARCHAR(5), -- A+, O-, etc.
    height_cm NUMERIC(5, 2), -- Taille en cm
    weight_kg NUMERIC(5, 2), -- Poids en kg
    observations TEXT, -- Observations et antécédents libres
    status_id UUID REFERENCES patient_statuses(id) ON DELETE SET NULL,
    allergies TEXT[],
    chronic_conditions TEXT[],
    address TEXT,
    trusted_payer_phone VARCHAR(30), -- Payeur diaspora
    status VARCHAR(50) NOT NULL DEFAULT 'Externe',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_tenant_patient_code UNIQUE (tenant_id, patient_code),
    CONSTRAINT unique_tenant_phone UNIQUE (tenant_id, phone_number)
);

CREATE TABLE patient_treatments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    treatment_name VARCHAR(255) NOT NULL,
    treatment_type VARCHAR(100) DEFAULT 'Médicamenteux', -- 'Médicamenteux', 'Chirurgical', 'Soins infirmiers', 'Rééducation', 'Autre'
    start_date DATE NOT NULL,
    end_date DATE,
    dosage_instructions TEXT,
    status VARCHAR(50) DEFAULT 'EN_COURS', -- 'EN_COURS', 'TERMINE', 'INTERROMPU'
    results_obtained TEXT, -- Résultats cliniques obtenus & évolution
    prescribed_by UUID REFERENCES practitioners(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE patient_lab_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    practitioner_id UUID REFERENCES practitioners(id) ON DELETE SET NULL,
    test_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'Biologie',
    priority VARCHAR(20) DEFAULT 'NORMALE',
    status VARCHAR(50) DEFAULT 'A_FAIRE', -- 'A_FAIRE', 'EN_COURS', 'TERMINE', 'ANNULE'
    clinical_notes TEXT,
    results_text TEXT,
    results_date TIMESTAMPTZ,
    document_url VARCHAR(500),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE insurance_companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL, -- Ex: IPM SONATEL, AXA Sénégal, ASKIA, SUNU
    code VARCHAR(50) NOT NULL,
    address VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(30),
    payment_terms_days INT NOT NULL DEFAULT 30,
    is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE patient_insurance_policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    insurance_company_id UUID NOT NULL REFERENCES insurance_companies(id),
    policy_number VARCHAR(100) NOT NULL, -- Numéro d'assuré / matricule
    coverage_rate_percent NUMERIC(5, 2) NOT NULL CHECK (coverage_rate_percent BETWEEN 0 AND 100),
    is_primary BOOLEAN NOT NULL DEFAULT true,
    valid_until DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 3. DOSSIER PATIENT INFORMATISÉ (DPI) & ORDONNANCES
-- ============================================================================

CREATE TABLE medical_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    patient_id UUID UNIQUE NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    summary_notes TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE consultation_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    practitioner_id UUID NOT NULL REFERENCES practitioners(id),
    consultation_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reason_for_visit TEXT NOT NULL,
    vital_signs JSONB NOT NULL DEFAULT '{"bp_systolic": null, "bp_diastolic": null, "heart_rate": null, "temperature_c": null, "weight_kg": null, "spo2_pct": null, "glycemia_g_l": null}',
    clinical_examination TEXT,
    icd10_diagnosis_codes VARCHAR(10)[], -- Codes CIM-10
    diagnosis_text TEXT NOT NULL,
    confidential_notes TEXT, -- Accessible uniquement au praticien créateur (chiffré)
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE prescriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    consultation_id UUID REFERENCES consultation_notes(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    practitioner_id UUID NOT NULL REFERENCES practitioners(id),
    prescription_code VARCHAR(50) UNIQUE NOT NULL, -- Code affiché sous le QR
    qr_cryptographic_hash TEXT NOT NULL, -- SHA-256 HMAC
    issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    valid_until DATE NOT NULL,
    is_dispensed BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE prescription_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prescription_id UUID NOT NULL REFERENCES prescriptions(id) ON DELETE CASCADE,
    drug_name VARCHAR(200) NOT NULL,
    dosage VARCHAR(100) NOT NULL,
    frequency VARCHAR(100) NOT NULL,
    duration_days INT NOT NULL,
    instructions TEXT
);

CREATE TABLE medical_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    uploaded_by UUID NOT NULL REFERENCES users(id),
    document_type VARCHAR(50) NOT NULL, -- 'LAB_RESULT', 'XRAY', 'SCANNER_DICOM', 'SURGICAL_REPORT', 'IPM_BON'
    title VARCHAR(255) NOT NULL,
    s3_storage_key VARCHAR(500) NOT NULL,
    file_mime_type VARCHAR(100) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    sha256_checksum VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 4. RENDEZ-VOUS & GESTION TEMPORELLE STRICTE
-- ============================================================================

CREATE TABLE medical_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    practitioner_id UUID REFERENCES practitioners(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(200) NOT NULL,
    duration_minutes INT NOT NULL DEFAULT 30,
    price NUMERIC(12, 2) NOT NULL,
    deposit_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    practitioner_id UUID NOT NULL REFERENCES practitioners(id) ON DELETE RESTRICT,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    medical_service_id UUID NOT NULL REFERENCES medical_services(id) ON DELETE RESTRICT,
    time_slot TSTZRANGE NOT NULL,
    status appointment_status NOT NULL DEFAULT 'PENDING_PAYMENT',
    booking_channel booking_channel NOT NULL DEFAULT 'VOICE_AGENT',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT no_overlapping_appointments EXCLUDE USING gist (
        practitioner_id WITH =,
        time_slot WITH &&
    ) WHERE (status NOT IN ('CANCELED', 'NO_SHOW'))
);

-- ============================================================================
-- 5. FACTURATION, RÈGLEMENTS, TIERS-PAYANT & CAISSE
-- ============================================================================

CREATE TABLE cash_registers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL, -- Ex: "Caisse Principale Guichet 1"
    is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE cash_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    cash_register_id UUID NOT NULL REFERENCES cash_registers(id),
    cashier_id UUID NOT NULL REFERENCES users(id),
    opening_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    closing_time TIMESTAMPTZ,
    opening_balance NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    closing_balance_declared NUMERIC(12, 2),
    closing_balance_calculated NUMERIC(12, 2),
    status VARCHAR(20) NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'CLOSED'))
);

CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    invoice_number VARCHAR(50) NOT NULL, -- Ex: FAC-2026-003412
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    insurance_company_id UUID REFERENCES insurance_companies(id) ON DELETE SET NULL,
    
    total_amount_gross NUMERIC(12, 2) NOT NULL,
    discount_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    total_amount_net NUMERIC(12, 2) NOT NULL,
    
    patient_share_amount NUMERIC(12, 2) NOT NULL,
    insurance_share_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    
    patient_paid_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    insurance_paid_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    
    status invoice_status NOT NULL DEFAULT 'ISSUED',
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL, -- Base pour le calcul de la balance âgée
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT unique_tenant_invoice_number UNIQUE (tenant_id, invoice_number),
    CONSTRAINT check_invoice_split CHECK (total_amount_net = patient_share_amount + insurance_share_amount)
);

CREATE TABLE invoice_lines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    service_id UUID REFERENCES medical_services(id) ON DELETE SET NULL,
    description VARCHAR(255) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price NUMERIC(12, 2) NOT NULL,
    total_line_amount NUMERIC(12, 2) NOT NULL
);

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE RESTRICT,
    cash_session_id UUID REFERENCES cash_sessions(id) ON DELETE SET NULL,
    received_by UUID NOT NULL REFERENCES users(id),
    
    amount NUMERIC(12, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL, -- 'CASH', 'CHECK', 'BANK_TRANSFER', 'ONLINE' (or Wave/OM/Yas/SPI configured)
    tenant_payment_method_id UUID REFERENCES tenant_payment_methods(id) ON DELETE SET NULL,
    payer_type VARCHAR(20) NOT NULL CHECK (payer_type IN ('PATIENT', 'INSURANCE_COMPANY')),
    
    transaction_reference VARCHAR(255), -- Ex: Wave TX ID ou Numéro de chèque
    proof_document_id UUID REFERENCES medical_documents(id) ON DELETE SET NULL,
    payment_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 6. SUIVI DES CRÉANCES, RECOUVREMENT & BORDEREAUX IPM
-- ============================================================================

CREATE TABLE ipm_claims_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    batch_reference VARCHAR(50) NOT NULL, -- Ex: BOR-SONATEL-2026-08
    insurance_company_id UUID NOT NULL REFERENCES insurance_companies(id),
    submission_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_invoiced_amount NUMERIC(12, 2) NOT NULL,
    total_settled_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    total_rejected_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    status claim_status NOT NULL DEFAULT 'SUBMITTED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE ipm_claims_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    batch_id UUID NOT NULL REFERENCES ipm_claims_batches(id) ON DELETE CASCADE,
    invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE RESTRICT,
    claim_amount NUMERIC(12, 2) NOT NULL,
    status claim_status NOT NULL DEFAULT 'SUBMITTED',
    rejection_reason TEXT,
    settled_at TIMESTAMPTZ
);

CREATE TABLE debt_recovery_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    action_type VARCHAR(50) NOT NULL, -- 'SMS_REMINDER', 'WHATSAPP_NOTICE', 'FORMAL_LETTER', 'PHONE_CALL'
    target_entity VARCHAR(20) NOT NULL CHECK (target_entity IN ('PATIENT', 'INSURANCE_COMPANY')),
    recipient_contact VARCHAR(100) NOT NULL,
    action_status VARCHAR(20) NOT NULL DEFAULT 'SENT',
    notes TEXT,
    executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 7. GESTION DE PHARMACIE & STOCKS CONSOMMABLES
-- ============================================================================

CREATE TABLE stock_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    sku VARCHAR(50) NOT NULL,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'MEDICATION', 'CONSUMABLE', 'SURGICAL'
    unit VARCHAR(30) NOT NULL, -- 'BOITE', 'FLACON', 'UNITE'
    minimum_threshold_alert INT NOT NULL DEFAULT 10,
    unit_cost_price NUMERIC(12, 2) NOT NULL,
    selling_price NUMERIC(12, 2) NOT NULL,
    current_stock_quantity INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT unique_tenant_sku UNIQUE (tenant_id, sku)
);

CREATE TABLE stock_lots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    stock_item_id UUID NOT NULL REFERENCES stock_items(id) ON DELETE CASCADE,
    lot_number VARCHAR(100) NOT NULL,
    expiration_date DATE NOT NULL,
    quantity_remaining INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE stock_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    stock_item_id UUID NOT NULL REFERENCES stock_items(id) ON DELETE RESTRICT,
    lot_id UUID REFERENCES stock_lots(id),
    movement_type stock_movement_type NOT NULL,
    quantity INT NOT NULL, -- Positif pour entrées, négatif pour sorties
    reference_id UUID, -- consultation_id ou invoice_id
    performed_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 8. PISTE D'AUDIT IMMUABLE (CDP SÉNÉGAL COMPLIANCE)
-- ============================================================================

CREATE TABLE medical_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    action VARCHAR(50) NOT NULL, -- 'VIEW_PATIENT_RECORD', 'UPDATE_PRESCRIPTION', 'EXPORT_BALANCE'
    resource_type VARCHAR(50) NOT NULL,
    resource_id UUID NOT NULL,
    ip_address INET,
    user_agent TEXT,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 9. ACTIVATION POLITIQUES RLS (ROW-LEVEL SECURITY)
-- ============================================================================

ALTER TABLE tenant_payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_payment_methods FORCE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE users FORCE ROW LEVEL SECURITY;
ALTER TABLE practitioners ENABLE ROW LEVEL SECURITY;
ALTER TABLE practitioners FORCE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients FORCE ROW LEVEL SECURITY;
ALTER TABLE insurance_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_companies FORCE ROW LEVEL SECURITY;
ALTER TABLE patient_insurance_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_insurance_policies FORCE ROW LEVEL SECURITY;
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_records FORCE ROW LEVEL SECURITY;
ALTER TABLE consultation_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_notes FORCE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions FORCE ROW LEVEL SECURITY;
ALTER TABLE prescription_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescription_items FORCE ROW LEVEL SECURITY;
ALTER TABLE medical_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_documents FORCE ROW LEVEL SECURITY;
ALTER TABLE medical_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_services FORCE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments FORCE ROW LEVEL SECURITY;
ALTER TABLE cash_registers ENABLE ROW LEVEL SECURITY;
ALTER TABLE cash_registers FORCE ROW LEVEL SECURITY;
ALTER TABLE cash_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cash_sessions FORCE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices FORCE ROW LEVEL SECURITY;
ALTER TABLE invoice_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_lines FORCE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments FORCE ROW LEVEL SECURITY;
ALTER TABLE ipm_claims_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE ipm_claims_batches FORCE ROW LEVEL SECURITY;
ALTER TABLE ipm_claims_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE ipm_claims_items FORCE ROW LEVEL SECURITY;
ALTER TABLE debt_recovery_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE debt_recovery_actions FORCE ROW LEVEL SECURITY;
ALTER TABLE stock_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_items FORCE ROW LEVEL SECURITY;
ALTER TABLE stock_lots ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_lots FORCE ROW LEVEL SECURITY;
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements FORCE ROW LEVEL SECURITY;
ALTER TABLE medical_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_audit_logs FORCE ROW LEVEL SECURITY;

-- Macro standard d'isolation multi-tenant pour toutes les tables possédant tenant_id
CREATE POLICY tenant_isolation_payment_methods ON tenant_payment_methods FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
CREATE POLICY tenant_isolation_users ON users FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
CREATE POLICY tenant_isolation_practitioners ON practitioners FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
CREATE POLICY tenant_isolation_patients ON patients FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
CREATE POLICY tenant_isolation_insurance_companies ON insurance_companies FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
CREATE POLICY tenant_isolation_insurance_policies ON patient_insurance_policies FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
CREATE POLICY tenant_isolation_medical_records ON medical_records FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
CREATE POLICY tenant_isolation_consultations ON consultation_notes FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
CREATE POLICY tenant_isolation_prescriptions ON prescriptions FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
CREATE POLICY tenant_isolation_medical_documents ON medical_documents FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
CREATE POLICY tenant_isolation_medical_services ON medical_services FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
CREATE POLICY tenant_isolation_appointments ON appointments FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
CREATE POLICY tenant_isolation_cash_registers ON cash_registers FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
CREATE POLICY tenant_isolation_cash_sessions ON cash_sessions FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
CREATE POLICY tenant_isolation_invoices ON invoices FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
CREATE POLICY tenant_isolation_payments ON payments FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
CREATE POLICY tenant_isolation_claims ON ipm_claims_batches FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
CREATE POLICY tenant_isolation_claims_items ON ipm_claims_items FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
CREATE POLICY tenant_isolation_debt_recovery ON debt_recovery_actions FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
CREATE POLICY tenant_isolation_stock ON stock_items FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
CREATE POLICY tenant_isolation_stock_lots ON stock_lots FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
CREATE POLICY tenant_isolation_stock_movements ON stock_movements FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
CREATE POLICY tenant_isolation_audit_logs ON medical_audit_logs FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');

-- Isolation pour les tables enfants sans colonne direct tenant_id
CREATE POLICY tenant_isolation_prescription_items ON prescription_items FOR ALL USING (
    current_setting('app.bypass_rls', true) = 'true' OR
    EXISTS (
        SELECT 1 FROM prescriptions 
        WHERE prescriptions.id = prescription_items.prescription_id 
        AND prescriptions.tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid
    )
);

CREATE POLICY tenant_isolation_invoice_lines ON invoice_lines FOR ALL USING (
    current_setting('app.bypass_rls', true) = 'true' OR
    EXISTS (
        SELECT 1 FROM invoices 
        WHERE invoices.id = invoice_lines.invoice_id 
        AND invoices.tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid
    )
);

-- ============================================================================
-- 10. REAL-TIME RECEIVABLES AGING VIEW
-- ============================================================================

CREATE OR REPLACE VIEW view_aging_balance AS
SELECT
    i.tenant_id,
    i.id AS invoice_id,
    i.invoice_number,
    p.patient_code,
    (p.first_name || ' ' || p.last_name) AS patient_name,
    p.phone_number AS patient_phone,
    ic.name AS insurance_name,
    (i.patient_share_amount - i.patient_paid_amount) AS patient_balance_due,
    (i.insurance_share_amount - i.insurance_paid_amount) AS insurance_balance_due,
    (i.total_amount_net - (i.patient_paid_amount + i.insurance_paid_amount)) AS total_balance_due,
    i.due_date,
    (CURRENT_DATE - i.due_date) AS days_overdue,
    CASE
        WHEN CURRENT_DATE <= i.due_date THEN 'CURRENT'
        WHEN (CURRENT_DATE - i.due_date) BETWEEN 1 AND 30 THEN '1_30_DAYS'
        WHEN (CURRENT_DATE - i.due_date) BETWEEN 31 AND 60 THEN '31_60_DAYS'
        WHEN (CURRENT_DATE - i.due_date) BETWEEN 61 AND 90 THEN '61_90_DAYS'
        ELSE 'OVER_90_DAYS'
    END AS aging_bracket
FROM invoices i
JOIN patients p ON i.patient_id = p.id
LEFT JOIN insurance_companies ic ON i.insurance_company_id = ic.id
WHERE i.status NOT IN ('PAID', 'CANCELED');

-- ============================================================================
-- 11. MULTI-TENANT SMTP ACCOUNTS & EMAIL LOGS
-- ============================================================================

CREATE TABLE IF NOT EXISTS tenant_smtp_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    account_name VARCHAR(100) NOT NULL,
    from_name VARCHAR(150) NOT NULL,
    from_email VARCHAR(255) NOT NULL,
    reply_to_email VARCHAR(255),
    smtp_host VARCHAR(255) NOT NULL,
    smtp_port INT NOT NULL DEFAULT 465,
    smtp_secure BOOLEAN NOT NULL DEFAULT true,
    smtp_user VARCHAR(255) NOT NULL,
    smtp_password VARCHAR(255) NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_tested_at TIMESTAMPTZ,
    last_test_status VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE tenant_smtp_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_smtp_accounts FORCE ROW LEVEL SECURITY;

CREATE POLICY tenant_smtp_accounts_tenant_isolation ON tenant_smtp_accounts
    FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');

CREATE TABLE IF NOT EXISTS invoice_email_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    recipient_type VARCHAR(20) NOT NULL,
    recipient_email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    custom_message TEXT,
    attachments_json JSONB DEFAULT '[]'::jsonb,
    sent_by UUID REFERENCES users(id) ON DELETE SET NULL,
    message_id VARCHAR(255),
    is_simulated BOOLEAN DEFAULT false,
    status VARCHAR(50) DEFAULT 'SENT',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE invoice_email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_email_logs FORCE ROW LEVEL SECURITY;

CREATE POLICY invoice_email_logs_tenant_isolation ON invoice_email_logs
    FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');

-- ============================================================================
-- 12. PASSWORD RESET TOKENS
-- ============================================================================

CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token ON password_reset_tokens(token);

