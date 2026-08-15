-- ==========================================================
-- CONSULPORTAL AUTOMATED EMAIL NOTIFICATION SYSTEM SCHEMA
-- Table: email_logs
-- ==========================================================

CREATE TABLE IF NOT EXISTS public.email_logs (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    application_id TEXT,
    payment_id TEXT,
    recipient_email TEXT NOT NULL,
    recipient_name TEXT,
    email_type TEXT NOT NULL,
    subject TEXT NOT NULL,
    provider TEXT NOT NULL DEFAULT 'brevo',
    provider_message_id TEXT,
    status TEXT NOT NULL DEFAULT 'sent', -- 'queued', 'sending', 'sent', 'delivered', 'failed', 'retrying', 'bounced'
    attempt_count INTEGER NOT NULL DEFAULT 1,
    error_message TEXT,
    variables_summary TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    sent_at TIMESTAMPTZ,
    last_attempt_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices for rapid querying and filtering
CREATE INDEX IF NOT EXISTS idx_email_logs_recipient ON public.email_logs(recipient_email);
CREATE INDEX IF NOT EXISTS idx_email_logs_app_id ON public.email_logs(application_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON public.email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_type ON public.email_logs(email_type);
CREATE INDEX IF NOT EXISTS idx_email_logs_created_at ON public.email_logs(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view only their own emails
CREATE POLICY "Clients can view their own email logs"
    ON public.email_logs
    FOR SELECT
    USING (
        auth.jwt() ->> 'email' = recipient_email 
        OR auth.uid()::text = user_id
    );

-- Allow backend service / service role / anon with key to insert and update logs
CREATE POLICY "Service can insert email logs"
    ON public.email_logs
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Service can update email logs"
    ON public.email_logs
    FOR UPDATE
    USING (true);
