-- Schema for Multi-Tenant SMTP Accounts
CREATE TABLE IF NOT EXISTS tenant_smtp_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    account_name VARCHAR(100) NOT NULL, -- ex: "Facturation & IPM", "Secrétariat", "Direction"
    from_name VARCHAR(150) NOT NULL, -- ex: "Clinique de l'Espoir - Facturation"
    from_email VARCHAR(255) NOT NULL, -- ex: "facturation@clinique-espoir.sn"
    reply_to_email VARCHAR(255),
    smtp_host VARCHAR(255) NOT NULL, -- ex: "ssl0.ovh.net"
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

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'tenant_smtp_accounts' AND policyname = 'tenant_smtp_accounts_tenant_isolation'
  ) THEN
    CREATE POLICY tenant_smtp_accounts_tenant_isolation ON tenant_smtp_accounts
      USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);
  END IF;
END $$;
