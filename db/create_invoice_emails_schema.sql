-- Schema for Invoices and Medical Attachments Email Dispatching
CREATE TABLE IF NOT EXISTS invoice_email_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    recipient_type VARCHAR(20) NOT NULL, -- 'PATIENT', 'IPM', 'CUSTOM'
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

ALTER TABLE patients ADD COLUMN IF NOT EXISTS email VARCHAR(255);

ALTER TABLE invoice_email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_email_logs FORCE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'invoice_email_logs' AND policyname = 'invoice_email_logs_tenant_isolation'
  ) THEN
    CREATE POLICY invoice_email_logs_tenant_isolation ON invoice_email_logs
      USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);
  END IF;
END $$;
