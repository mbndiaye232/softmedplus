-- Hospitalization Module Schema
-- Extends SoftMed PostgreSQL Database Schema

-- 1. Bâtiments (Buildings)
CREATE TABLE IF NOT EXISTS hospital_buildings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Chambres / Locaux (Rooms / Wards)
CREATE TABLE IF NOT EXISTS hospital_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    building_id UUID NOT NULL REFERENCES hospital_buildings(id) ON DELETE CASCADE,
    number_or_name VARCHAR(100) NOT NULL,
    room_type VARCHAR(50) NOT NULL DEFAULT 'STANDARD', -- 'STANDARD', 'VIP', 'SOINS_INTENSIFS', etc.
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Lits (Beds)
CREATE TABLE IF NOT EXISTS hospital_beds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    room_id UUID NOT NULL REFERENCES hospital_rooms(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    luxury_level VARCHAR(50) NOT NULL DEFAULT 'STANDARD', -- 'STANDARD', 'CONFORT', 'VIP', 'SUITE'
    daily_rate NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'OCCUPIED', 'MAINTENANCE')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Hospitalisations / Séjours (Stays)
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

-- Enable RLS for all new tables
ALTER TABLE hospital_buildings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospital_buildings FORCE ROW LEVEL SECURITY;
ALTER TABLE hospital_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospital_rooms FORCE ROW LEVEL SECURITY;
ALTER TABLE hospital_beds ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospital_beds FORCE ROW LEVEL SECURITY;
ALTER TABLE hospitalizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospitalizations FORCE ROW LEVEL SECURITY;

-- Add RLS policies for multi-tenant isolation
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'tenant_isolation_buildings') THEN
        CREATE POLICY tenant_isolation_buildings ON hospital_buildings FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'tenant_isolation_rooms') THEN
        CREATE POLICY tenant_isolation_rooms ON hospital_rooms FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'tenant_isolation_beds') THEN
        CREATE POLICY tenant_isolation_beds ON hospital_beds FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'tenant_isolation_hospitalizations') THEN
        CREATE POLICY tenant_isolation_hospitalizations ON hospitalizations FOR ALL USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid OR current_setting('app.bypass_rls', true) = 'true');
    END IF;
END $$;
