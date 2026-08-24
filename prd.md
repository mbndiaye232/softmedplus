Voici le **Product Requirements Document (PRD) Global & Exhaustif** intégrant l'intégralité du cycle de vie clinique, administratif, financier et logistique : **Dossier Patient Informatisé (DPI)**, **Prescriptions sécurisées**, **Stockage documentaire (S3/R2)**, **Facturation multi-lignes**, **Tiers-Payant IPM/Assurances**, **Recouvrement des créances & Balance âgée**, et **Gestion des stocks médicaux**.

Ce document est directement exploitable par **Google Antigravity** pour générer les modèles, migrations, contrôleurs, middlewares et tests d'intégration.

---

# PRODUCT REQUIREMENTS DOCUMENT (PRD) — SUITE INTÉGRALE CLINIC-OS

* **Identifiant Projet :** `SoftMed-Enterprise-ClinicOS`
* **Version :** `2.0.0-ENTERPRISE-SPEC`
* **Moteur d'Exécution Cible :** Google Antigravity (Agents Autonomes de Développement)
* **Juridiction & Marché :** Sénégal / Zone UEMOA (Conformité CDP Loi 2008-12, flux IPM, Mobile Money Wave/OM)
* **Architecture :** Cloud-Native, Multi-Tenant strict (RLS), Voice-First, Event-Driven, Ledger financier à double entrée.

---

## 1. Topologie Globale & Architecture des Micro-Modules

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   CANAUX D'ENTRÉE                                      │
│   Agent Vocal WebRTC   │   WhatsApp Cloud API   │   PWA Praticiens   │   Guichet Caisse│
└─────────────┬─────────────────────┬───────────────────────┬────────────────────┬───────┘
│                     │                       │                    │
▼                     ▼                       ▼                    ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                    API GATEWAY / HONO (Multi-Tenant & Auth Context)                    │
│         - Injection de session PostgreSQL : `SET LOCAL app.current_tenant_id`          │
│         - Chiffrement AES-GCM / Audit Trail Middleware                                 │
└───────┬─────────────────┬───────────────────┬──────────────────┬─────────────────┬─────┘
│                 │                   │                  │                 │
▼                 ▼                   ▼                  ▼                 ▼
┌──────────────┐  ┌──────────────┐   ┌────────────────┐  ┌───────────────┐  ┌────────────┐
│ MODULE RDV   │  │ MODULE DPI   │   │ FACTURATION &  │  │ SUIVI IPM &   │  │ PHARMACIE &│
│ & AGENDA     │  │ & SUIVI SOINS│   │ RÈGLEMENTS     │  │ CRÉANCES      │  │ STOCKS     │
│ - Anti-GiST  │  │ - Constantes │   │ - Multi-lignes │  │ - Béreaux PEC │  │ - Lots/Pér.│
│ - Redis Lock │  │ - CIM-10     │   │ - Part Patient │  │ - Bal. Âgée   │  │ - Conso    │
│ - Voice STT  │  │ - Ordo QR    │   │ - Tiers-Payant │  │ - Relances    │  │   Directe  │
└───────┬──────┘  └──────┬───────┘   └────────┬───────┘  └───────┬───────┘  └─────┬──────┘
│                │                    │                  │                │
▼                ▼                    ▼                  ▼                ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                       POSTGRESQL 16+ (Schéma Relationnel Unifié)                       │
└────────────────────────────────────────────┬───────────────────────────────────────────┘
│
▼
┌──────────────────────────────────────────┐
│ BUCKET PRIVÉ CHIFFRÉ (Cloudflare R2 / S3)│
│ - Radiographies / Scanners DICOM         │
│ - Ordonnances PDF signées SHA-256        │
│ - Bons de Prise en Charge IPM            │
└──────────────────────────────────────────┘

```

---

## 2. Modèle Relationnel Exhaustif (DDL PostgreSQL + RLS)

```sql
-- Extensions requises
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "btree_gist";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Énumérations Système
CREATE TYPE user_role AS ENUM ('SUPER_ADMIN', 'DOCTOR', 'SECRETARY', 'NURSE', 'CASHIER', 'PHARMACIST', 'ACCOUNTANT');
CREATE TYPE appointment_status AS ENUM ('PENDING_PAYMENT', 'CONFIRMED', 'IN_WAITING_ROOM', 'IN_CONSULTATION', 'COMPLETED', 'CANCELED', 'NO_SHOW');
CREATE TYPE booking_channel AS ENUM ('VOICE_AGENT', 'WHATSAPP', 'WEB_PWA', 'DESK');
CREATE TYPE invoice_status AS ENUM ('DRAFT', 'ISSUED', 'PARTIALLY_PAID', 'PAID', 'OVERDUE', 'CANCELED', 'DISPUTED_IPM');
CREATE TYPE payment_method AS ENUM ('WAVE', 'ORANGE_MONEY', 'CASH', 'CREDIT_CARD', 'CHECK', 'BANK_TRANSFER');
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
settings JSONB NOT NULL DEFAULT '{"currency": "XOF", "deposit_rate": 0.20, "grace_period_days": 30, "ipm_strict_validation": true}',
is_active BOOLEAN NOT NULL DEFAULT true,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE users (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
email VARCHAR(255) UNIQUE NOT NULL,
password_hash VARCHAR(255) NOT NULL,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
role user_role NOT NULL DEFAULT 'SECRETARY',
is_active BOOLEAN NOT NULL DEFAULT true,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE practitioners (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
user_id UUID REFERENCES users(id) ON DELETE SET NULL,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
title VARCHAR(50) DEFAULT 'Dr.',
specialty_name VARCHAR(100) NOT NULL,
license_number VARCHAR(50), -- N° Ordre des Médecins
color_code VARCHAR(7) DEFAULT '#0d3b66',
is_active BOOLEAN NOT NULL DEFAULT true
);

-- ============================================================================
-- 2. RÉFÉRENTIEL PATIENTS & COUVERTURE ASSURANCE (IPM)
-- ============================================================================

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
allergies TEXT[],
chronic_conditions TEXT[],
address TEXT,
trusted_payer_phone VARCHAR(30), -- Payeur diaspora
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
CONSTRAINT unique_tenant_patient_code UNIQUE (tenant_id, patient_code),
CONSTRAINT unique_tenant_phone UNIQUE (tenant_id, phone_number)
);

CREATE TABLE insurance_companies (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
name VARCHAR(200) NOT NULL, -- Ex: IPM SONATEL, AXA Sénégal, ASKIA, SUNU
code VARCHAR(50) NOT NULL,
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
confidential_notes TEXT, -- Accessible uniquement au praticien créateur
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE prescriptions (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
consultation_id UUID REFERENCES consultation_notes(id) ON DELETE CASCADE,
patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
practitioner_id UUID NOT NULL REFERENCES practitioners(id),
prescription_code VARCHAR(50) UNIQUE NOT NULL, -- Code affiché sous le QR
qr_cryptographic_hash TEXT NOT NULL, -- SHA-256 HMAC anti-falsification
issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
valid_until DATE NOT NULL,
is_dispensed BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE prescription_items (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
prescription_id UUID NOT NULL REFERENCES prescriptions(id) ON DELETE CASCADE,
drug_name VARCHAR(200) NOT NULL,
dosage VARCHAR(100) NOT NULL, -- Ex: "500 mg"
frequency VARCHAR(100) NOT NULL, -- Ex: "1 comprimé matin et soir"
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

-- Montants financiers
total_amount_gross NUMERIC(12, 2) NOT NULL,
discount_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
total_amount_net NUMERIC(12, 2) NOT NULL,

-- Ventilation Tiers-Payant
patient_share_amount NUMERIC(12, 2) NOT NULL,
insurance_share_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,

-- Règlements effectués
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
service_id UUID REFERENCES medical_services(id),
description VARCHAR(255) NOT NULL,
quantity INT NOT NULL DEFAULT 1,
unit_price NUMERIC(12, 2) NOT NULL,
total_line_amount NUMERIC(12, 2) NOT NULL
);

CREATE TABLE payments (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE RESTRICT,
cash_session_id UUID REFERENCES cash_sessions(id),
received_by UUID NOT NULL REFERENCES users(id),

amount NUMERIC(12, 2) NOT NULL,
payment_method payment_method NOT NULL,
payer_type VARCHAR(20) NOT NULL CHECK (payer_type IN ('PATIENT', 'INSURANCE_COMPANY')),

transaction_reference VARCHAR(255), -- Ex: Wave TX ID ou Numéro de chèque
proof_document_id UUID REFERENCES medical_documents(id),
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
rejection_reason TEXT, -- Ex: "Absence de bon de prise en charge valide"
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

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE practitioners ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_insurance_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescription_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE cash_registers ENABLE ROW LEVEL SECURITY;
ALTER TABLE cash_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ipm_claims_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE ipm_claims_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE debt_recovery_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_lots ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_audit_logs ENABLE ROW LEVEL SECURITY;

-- Macro standard d'isolation multi-tenant pour toutes les tables
CREATE POLICY tenant_isolation_patients ON patients FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid);
CREATE POLICY tenant_isolation_invoices ON invoices FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid);
CREATE POLICY tenant_isolation_payments ON payments FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid);
CREATE POLICY tenant_isolation_consultations ON consultation_notes FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid);
CREATE POLICY tenant_isolation_prescriptions ON prescriptions FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid);
CREATE POLICY tenant_isolation_stock ON stock_items FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid);
CREATE POLICY tenant_isolation_claims ON ipm_claims_batches FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid);

```

---

## 3. Module DPI, Ordonnances & Stockage Documentaire

### A. Flux de Consultation & Constantes Vitales

1. **Saisie des constantes (Infirmier / Assistant) :** Pression artérielle, Fréquence cardiaque, Température, Glycémie, Poids, SpO2 dans `consultation_notes.vital_signs`.
2. **Examen Médical & Diagnostic CIM-10 :** Le praticien encode le diagnostic structuré via le tableau `icd10_diagnosis_codes`.
3. **Sécurité des Notes Confidentielles :** Le champ `confidential_notes` fait l'objet d'un chiffrement applicatif (clé dérivée du praticien) et n'est jamais exposé aux rôles non médicaux (`SECRETARY`, `CASHIER`).

### B. Moteur d'Ordonnance Sécurisée par QR Code Cryptographique

Pour éradiquer la falsification des ordonnances et la délivrance multiple illicite :

1. **Génération de l'empreinte :**

$$\text{Hash} = \text{HMAC-SHA256}(\text{PrescriptionID} \parallel \text{PatientCode} \parallel \text{PractitionerLicense} \parallel \text{ValidUntil}, \text{SecretKey})$$


2. **Rendu Visuel :** Le QR Code encapsule une URL de vérification publique : `[https://verify.softmed.sn/rx/](https://verify.softmed.sn/rx/){prescription_code}?h={qr_cryptographic_hash}`.
3. **Validation Pharmacie :** Lors du scan par le pharmacien, le serveur valide la signature cryptographique et marque l'ordonnance comme `is_dispensed = true`.

### C. Gestion du Stockage Documentaire (S3/Cloudflare R2)

* **Architecture Zero-Direct-Access :** Les buckets S3/R2 sont strictement privés.
* **Upload Pattern (Presigned PUT) :** Le client demande une URL pré-signée à l'API via `POST /api/v1/documents/presign-upload` (validité : 5 minutes), téléverse directement le binaire, puis valide par `POST /api/v1/documents/confirm`.
* **Visualisation (Presigned GET) :** Accès sécurisé éphémère (validité : 60 secondes) après vérification des droits dans `medical_audit_logs`.

---

## 4. Moteur Financier, Tiers-Payant & Balance Âgée

### A. Calcul Automatisé de la Ventilation Tiers-Payant (IPM)

À la validation des actes de consultation :

```typescript
interface InvoiceSplitCalculation {
totalGross: number;
discount: number;
coverageRate: number; // Ex: 80%
}

function calculateInvoiceSplit(calc: InvoiceSplitCalculation) {
const netAmount = calc.totalGross - calc.discount;
const insuranceShare = Math.round(netAmount * (calc.coverageRate / 100));
const patientShare = netAmount - insuranceShare;
return { netAmount, insuranceShare, patientShare };
}

```

### B. Vue SQL Temps Réel : Balance Âgée des Créances (Aging Balance)

Requête analytique exécutée pour le recouvrement financier :

```sql
CREATE OR REPLACE VIEW view_aging_balance AS
SELECT
i.tenant_id,
i.id AS invoice_id,
i.invoice_number,
p.patient_code,
p.first_name || ' ' || p.last_name AS patient_name,
p.phone_number AS patient_phone,
ic.name AS insurance_name,
(i.patient_share_amount - i.patient_paid_amount) AS patient_balance_due,
(i.insurance_share_amount - i.insurance_paid_amount) AS insurance_balance_due,
(i.total_amount_net - (i.patient_paid_amount + i.insurance_paid_amount)) AS total_balance_due,
i.due_date,
CURRENT_DATE - i.due_date AS days_overdue,
CASE
WHEN CURRENT_DATE <= i.due_date THEN 'CURRENT'
WHEN CURRENT_DATE - i.due_date BETWEEN 1 AND 30 THEN '1_30_DAYS'
WHEN CURRENT_DATE - i.due_date BETWEEN 31 AND 60 THEN '31_60_DAYS'
WHEN CURRENT_DATE - i.due_date BETWEEN 61 AND 90 THEN '61_90_DAYS'
ELSE 'OVER_90_DAYS'
END AS aging_bracket
FROM invoices i
JOIN patients p ON i.patient_id = p.id
LEFT JOIN insurance_companies ic ON i.insurance_company_id = ic.id
WHERE i.status NOT IN ('PAID', 'CANCELED');

```

---

## 5. Workflow de Télétransmission & Rapprochement IPM

```
┌───────────────────────┐
│ Facturation Actes     │ ──► [Ventilation : 20% Patient / 80% IPM]
└──────────┬────────────┘
│
▼
┌───────────────────────┐
│ Encaissement Patient  │ ──► [Paiement Wave/Cash] ──► Quittance Remise
└──────────┬────────────┘
│
▼
┌───────────────────────┐
│ Génération Bordereau  │ ──► Regroupement mensuel dans `ipm_claims_batches`
│ Télétransmission IPM  │     Export PDF récapitulatif & Fichier Excel normalisé
└──────────┬────────────┘
│
▼
┌───────────────────────┐
│ Rapprochement Bancaire│ ──► Lettrage des virements reçus par ligne de facture
│ & Gestion des Rejets  │     - Si Rejet : Bascule en `DISPUTED_IPM` + Motif
└───────────────────────┘

```

---

## 6. Spécification des Contrats d'API (REST Endpoints)

### 1. `POST /api/v1/clinical/consultations`

* **Rôles autorisés :** `DOCTOR`, `SUPER_ADMIN`
* **Payload :**

```json
{
"patient_id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
"reason_for_visit": "Douleurs abdominales aiguës et céphalées",
"vital_signs": {
"bp_systolic": 130,
"bp_diastolic": 85,
"heart_rate": 78,
"temperature_c": 38.5,
"weight_kg": 72.0,
"spo2_pct": 98
},
"clinical_examination": "Abdomen sensible en fosse iliaque droite...",
"icd10_diagnosis_codes": ["K35.8", "R51"],
"diagnosis_text": "Suspicion d'appendicite débutante",
"prescription": {
"valid_until": "2026-09-19",
"items": [
{ "drug_name": "Paracétamol 1g", "dosage": "1g", "frequency": "1 comprimé toutes les 8h si fièvre", "duration_days": 5 },
{ "drug_name": "Phloroglucinol 80mg", "dosage": "80mg", "frequency": "2 comprimés en cas de spasme", "duration_days": 3 }
]
},
"billing_items": [
{ "service_id": "3a7b1c4e-...", "quantity": 1 }
]
}

```

### 2. `POST /api/v1/billing/payments`

* **Rôles autorisés :** `CASHIER`, `SUPER_ADMIN`
* **Payload :**

```json
{
"invoice_id": "4c9d1a8e-2e5b-4a8f-8c7d-1e2f3a4b5c6d",
"amount": 15000,
"payment_method": "WAVE",
"payer_type": "PATIENT",
"transaction_reference": "WAVE_SN_TX_882910394",
"cash_session_id": "7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e"
}

```

### 3. `GET /api/v1/claims/aging-report`

* **Rôles autorisés :** `ACCOUNTANT`, `SUPER_ADMIN`
* **Paramètres de filtre :** `?bracket=OVER_90_DAYS&insurance_company_id=...`
* **Réponse (200 OK) :** Retourne le montant consolidé des créances en retard, ventilé par débiteur avec les métadonnées de contact pour déclenchement des relances automatiques.

---

## 7. Plan de Vérification & Suite de Tests Automatisés (Directives Antigravity)

Antigravity doit obligatoirement générer et exécuter avec succès les scénarios de test suivants :

1. **Test d'Intégrité Financière & Tiers-Payant :**
* *Scénario :* Créer une facture de 50 000 FCFA avec une couverture IPM de 80%.
* *Vérification :* S'assurer que `patient_share_amount = 10000` et `insurance_share_amount = 40000`. Simuler un règlement patient de 10 000 FCFA -> statut `PARTIALLY_PAID`. Simuler le virement IPM de 40 000 FCFA -> statut `PAID`.


2. **Test de Décrémentation Atomique de Stock Médical :**
* *Scénario :* Prescrire et délivrer 2 boîtes de matériel sur un stock disponible de 2 unités.
* *Vérification :* Le stock passe à 0. Une troisième demande concurrente doit lever une exception `422 Unprocessable Entity - Insufficient Stock`.


3. **Test d'Étanchéité Multi-Tenant sur le Dossier Médical :**
* *Scénario :* Un utilisateur du Tenant `T1` tente d'accéder au dossier médical d'un patient du Tenant `T2`.
* *Vérification :* Rejet immédiat avec code `404 Not Found` (grâce au RLS).


4. **Test de Vérification Cryptographique de l'Ordonnance :**
* *Scénario :* Altérer le contenu du QR Code (ex: modifier la date de validité).
* *Vérification :* Le endpoint de vérification doit rejeter avec `403 Forbidden - Invalid Prescription Signature`.