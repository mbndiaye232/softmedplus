-- Patient Statuses, Treatments & Lab Orders Schema with RLS

CREATE TABLE IF NOT EXISTS patient_statuses (
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

CREATE TABLE IF NOT EXISTS patient_treatments (
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

CREATE TABLE IF NOT EXISTS patient_lab_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    practitioner_id UUID REFERENCES practitioners(id) ON DELETE SET NULL,
    test_name VARCHAR(255) NOT NULL, -- Ex: NFS, Glycémie, Radiographie, etc.
    category VARCHAR(100) DEFAULT 'Biologie', -- 'Biologie', 'Imagerie', 'Cardiologie', 'Urologie', 'Autre'
    priority VARCHAR(20) DEFAULT 'NORMALE', -- 'URGENTE', 'NORMALE', 'CONTROLE'
    status VARCHAR(50) DEFAULT 'A_FAIRE', -- 'A_FAIRE', 'EN_COURS', 'TERMINE', 'ANNULE'
    clinical_notes TEXT,
    results_text TEXT,
    results_date TIMESTAMPTZ,
    document_url VARCHAR(500),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add status_id reference to patients table if not exists
ALTER TABLE patients ADD COLUMN IF NOT EXISTS status_id UUID REFERENCES patient_statuses(id) ON DELETE SET NULL;

-- Enable RLS
ALTER TABLE patient_statuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_statuses FORCE ROW LEVEL SECURITY;

ALTER TABLE patient_treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_treatments FORCE ROW LEVEL SECURITY;

ALTER TABLE patient_lab_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_lab_orders FORCE ROW LEVEL SECURITY;

-- Policies
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'tenant_isolation_patient_statuses') THEN
        CREATE POLICY tenant_isolation_patient_statuses ON patient_statuses FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'tenant_isolation_patient_treatments') THEN
        CREATE POLICY tenant_isolation_patient_treatments ON patient_treatments FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'tenant_isolation_patient_lab_orders') THEN
        CREATE POLICY tenant_isolation_patient_lab_orders ON patient_lab_orders FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
    END IF;
END $$;
