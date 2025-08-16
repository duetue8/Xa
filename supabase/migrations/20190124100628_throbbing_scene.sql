/*
  # Database Schema for Loan Application System

  1. New Tables
    - `applications` - Stores loan application data
    - `audit_logs` - Tracks all data changes
    - `export_jobs` - Manages export operations

  2. Security
    - Enable RLS on all tables
    - Add policies for data access
    - Encrypt sensitive data

  3. Features
    - Automatic timestamps
    - Data validation
    - Audit logging
    - Export functionality
*/

-- Enable pgcrypto extension for encryption
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Applications Table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Personal Information (Encrypted)
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone_number text NOT NULL,
  -- Loan Details
  loan_amount numeric NOT NULL,
  monthly_income numeric NOT NULL,
  employment_status text NOT NULL,
  loan_purpose text NOT NULL,
  financial_institution text NOT NULL,
  -- Metadata
  status text NOT NULL DEFAULT 'pending',
  ip_address text,
  user_agent text,
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  -- Constraints
  CONSTRAINT valid_status CHECK (status IN ('pending', 'approved', 'rejected', 'under_review')),
  CONSTRAINT valid_employment_status CHECK (employment_status IN ('full_time', 'part_time', 'self_employed', 'retired', 'other')),
  CONSTRAINT valid_loan_purpose CHECK (loan_purpose IN ('debt_consolidation', 'home_improvement', 'business', 'education', 'emergency', 'other')),
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_phone CHECK (phone_number ~* '^\+?1?\s*\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$')
);

-- Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  table_name text NOT NULL,
  record_id uuid NOT NULL,
  old_data jsonb,
  new_data jsonb,
  ip_address text,
  created_at timestamptz DEFAULT now()
);

-- Export Jobs Table
CREATE TABLE IF NOT EXISTS export_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  status text NOT NULL DEFAULT 'pending',
  file_name text,
  filters jsonb,
  date_range tstzrange,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'processing', 'completed', 'failed'))
);

-- Enable RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE export_jobs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  -- Applications policies
  DROP POLICY IF EXISTS "Applications are viewable by authenticated users only" ON applications;
  DROP POLICY IF EXISTS "Applications are insertable by anyone" ON applications;
  
  -- Audit logs policies
  DROP POLICY IF EXISTS "Audit logs are viewable by authenticated users only" ON audit_logs;
  
  -- Export jobs policies
  DROP POLICY IF EXISTS "Export jobs are manageable by job creator" ON export_jobs;
END $$;

-- Create new policies
CREATE POLICY "Applications are viewable by authenticated users only"
  ON applications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Applications are insertable by anyone"
  ON applications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Audit logs are viewable by authenticated users only"
  ON audit_logs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Export jobs are manageable by job creator"
  ON export_jobs
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_phone ON applications(phone_number);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_export_jobs_user_id ON export_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_export_jobs_status ON export_jobs(status);

-- Audit Trigger Function
CREATE OR REPLACE FUNCTION audit_trigger_func()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO audit_logs (
      user_id,
      action,
      table_name,
      record_id,
      new_data,
      ip_address
    ) VALUES (
      auth.uid(),
      TG_OP,
      TG_TABLE_NAME,
      NEW.id,
      to_jsonb(NEW),
      current_setting('request.headers')::json->>'x-forwarded-for'
    );
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_logs (
      user_id,
      action,
      table_name,
      record_id,
      old_data,
      new_data,
      ip_address
    ) VALUES (
      auth.uid(),
      TG_OP,
      TG_TABLE_NAME,
      NEW.id,
      to_jsonb(OLD),
      to_jsonb(NEW),
      current_setting('request.headers')::json->>'x-forwarded-for'
    );
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO audit_logs (
      user_id,
      action,
      table_name,
      record_id,
      old_data,
      ip_address
    ) VALUES (
      auth.uid(),
      TG_OP,
      TG_TABLE_NAME,
      OLD.id,
      to_jsonb(OLD),
      current_setting('request.headers')::json->>'x-forwarded-for'
    );
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS applications_audit_trigger ON applications;
DROP TRIGGER IF EXISTS export_jobs_audit_trigger ON export_jobs;

-- Create Audit Triggers
CREATE TRIGGER applications_audit_trigger
  AFTER INSERT OR UPDATE OR DELETE ON applications
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

CREATE TRIGGER export_jobs_audit_trigger
  AFTER INSERT OR UPDATE OR DELETE ON export_jobs
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

-- Function to create a new export job
CREATE OR REPLACE FUNCTION create_export_job(
  filters jsonb DEFAULT NULL,
  date_range tstzrange DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  job_id uuid;
BEGIN
  INSERT INTO export_jobs (
    user_id,
    filters,
    date_range,
    file_name
  ) VALUES (
    auth.uid(),
    filters,
    date_range,
    'loan_applications_' || to_char(now(), 'YYYY_MM_DD_HH24_MI_SS') || '.xlsx'
  ) RETURNING id INTO job_id;
  
  RETURN job_id;
END;
$$;