-- ==============================================================================
-- CONSUL PORTAL - SUPABASE POSTGRESQL COMPLETE PRODUCTION SCHEMA & RLS POLICIES
-- ==============================================================================
-- Run this SQL in your Supabase Project -> SQL Editor to create all tables, 
-- enable Row Level Security (RLS), configure open client/admin access policies,
-- and set up storage buckets for CV/receipt uploads.

-- 1. APPLICATIONS TABLE (Job applicants & CV submissions)
CREATE TABLE IF NOT EXISTS public.applications (
    id TEXT PRIMARY KEY,
    tracking_number TEXT,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    vacancy_id TEXT,
    vacancy_title TEXT,
    country TEXT,
    applying_from TEXT DEFAULT 'Pakistan',
    company TEXT,
    passport_number TEXT,
    passport_expiry TEXT,
    cnic TEXT,
    status TEXT DEFAULT 'Pending',
    cv_link TEXT,
    cover_letter TEXT,
    uploaded_file TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fallback alias view/table
CREATE TABLE IF NOT EXISTS public.job_applications (
    id TEXT PRIMARY KEY,
    full_name TEXT,
    email TEXT,
    phone TEXT,
    job_title TEXT,
    job_category TEXT,
    country TEXT,
    passport_num TEXT,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CLIENT ACCOUNTS TABLE (User registrations & client portal login)
CREATE TABLE IF NOT EXISTS public.client_accounts (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    name TEXT,
    email TEXT,
    phone TEXT,
    passport_num TEXT,
    track_id TEXT,
    country TEXT DEFAULT 'Pakistan',
    role TEXT DEFAULT 'client',
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    full_name TEXT,
    email TEXT,
    phone TEXT,
    country TEXT DEFAULT 'Pakistan',
    role TEXT DEFAULT 'client',
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PASSPORTS TRACKING TABLE (Live milestone tracker & visa workflow)
CREATE TABLE IF NOT EXISTS public.passports (
    id TEXT PRIMARY KEY,
    track_id TEXT UNIQUE,
    name TEXT NOT NULL,
    email TEXT,
    reference_number TEXT,
    passport_num TEXT,
    country TEXT,
    job_title TEXT,
    current_step TEXT DEFAULT 'Document Submission & Verification',
    steps JSONB DEFAULT '[]'::jsonb,
    total_fee NUMERIC DEFAULT 0,
    paid_amount NUMERIC DEFAULT 0,
    status TEXT DEFAULT 'In Progress',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PAYMENTS & ESCROW RECEIPTS TABLE
CREATE TABLE IF NOT EXISTS public.payments (
    id TEXT PRIMARY KEY,
    track_id TEXT,
    client_name TEXT NOT NULL,
    client_email TEXT,
    step_title TEXT,
    method TEXT DEFAULT 'Bank Transfer',
    amount NUMERIC DEFAULT 0,
    currency TEXT DEFAULT 'PKR',
    transaction_id TEXT,
    receipt_url TEXT,
    status TEXT DEFAULT 'Pending',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.payment_receipts (
    id TEXT PRIMARY KEY,
    track_id TEXT,
    client_name TEXT,
    method TEXT,
    amount NUMERIC,
    status TEXT DEFAULT 'Pending',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CLIENT INQUIRIES & CONTACT QUERIES TABLE
CREATE TABLE IF NOT EXISTS public.client_queries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    subject TEXT,
    message TEXT,
    country TEXT,
    category TEXT,
    status TEXT DEFAULT 'New',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Enable RLS and grant full public access for anonymous read/write/upsert
-- ==============================================================================

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.passports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_queries ENABLE ROW LEVEL SECURITY;

-- Applications Policies
DROP POLICY IF EXISTS "Public full access applications" ON public.applications;
CREATE POLICY "Public full access applications" ON public.applications FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access job_applications" ON public.job_applications;
CREATE POLICY "Public full access job_applications" ON public.job_applications FOR ALL USING (true) WITH CHECK (true);

-- Client Accounts Policies
DROP POLICY IF EXISTS "Public full access client_accounts" ON public.client_accounts;
CREATE POLICY "Public full access client_accounts" ON public.client_accounts FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access profiles" ON public.profiles;
CREATE POLICY "Public full access profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);

-- Passports Policies
DROP POLICY IF EXISTS "Public full access passports" ON public.passports;
CREATE POLICY "Public full access passports" ON public.passports FOR ALL USING (true) WITH CHECK (true);

-- Payments Policies
DROP POLICY IF EXISTS "Public full access payments" ON public.payments;
CREATE POLICY "Public full access payments" ON public.payments FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access payment_receipts" ON public.payment_receipts;
CREATE POLICY "Public full access payment_receipts" ON public.payment_receipts FOR ALL USING (true) WITH CHECK (true);

-- Client Queries Policies
DROP POLICY IF EXISTS "Public full access client_queries" ON public.client_queries;
CREATE POLICY "Public full access client_queries" ON public.client_queries FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- STORAGE BUCKETS SETUP FOR DOCUMENT UPLOADS
-- ==============================================================================
-- Insert storage buckets if not already present
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('application-documents', 'application-documents', true),
    ('documents', 'documents', true),
    ('applications', 'applications', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage object policies for file uploads (PDF, DOCX, JPG, PNG)
DROP POLICY IF EXISTS "Public storage read" ON storage.objects;
CREATE POLICY "Public storage read" ON storage.objects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public storage insert" ON storage.objects;
CREATE POLICY "Public storage insert" ON storage.objects FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public storage update" ON storage.objects;
CREATE POLICY "Public storage update" ON storage.objects FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public storage delete" ON storage.objects;
CREATE POLICY "Public storage delete" ON storage.objects FOR DELETE USING (true);
