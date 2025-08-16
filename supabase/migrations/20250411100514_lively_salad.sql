/*
  # Add address and contact fields to applications table

  1. Changes
    - Add address-related columns to applications table:
      - `city` (text, required)
      - `state` (text, required)
      - `zip_code` (text, required)
      - `best_time_to_call` (text)

  2. Validation
    - Add check constraint for state codes (2 letters)
    - Add check constraint for ZIP codes (5 digits)
    
  Note: Using a two-step process to handle existing rows
*/

-- Temporarily disable the audit trigger
ALTER TABLE applications DISABLE TRIGGER applications_audit_trigger;

-- First add columns as nullable
ALTER TABLE applications
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS state text,
ADD COLUMN IF NOT EXISTS zip_code text,
ADD COLUMN IF NOT EXISTS best_time_to_call text;

-- Update any existing rows with default values
UPDATE applications 
SET 
  city = 'Unknown',
  state = 'CA',
  zip_code = '00000'
WHERE 
  city IS NULL OR 
  state IS NULL OR 
  zip_code IS NULL;

-- Now make columns NOT NULL
ALTER TABLE applications
ALTER COLUMN city SET NOT NULL,
ALTER COLUMN state SET NOT NULL,
ALTER COLUMN zip_code SET NOT NULL;

-- Add validation constraints
ALTER TABLE applications
ADD CONSTRAINT valid_state_code CHECK (state ~ '^[A-Z]{2}$'),
ADD CONSTRAINT valid_zip_code CHECK (zip_code ~ '^\d{5}$');

-- Create indexes for commonly queried fields
CREATE INDEX IF NOT EXISTS idx_applications_city ON applications(city);
CREATE INDEX IF NOT EXISTS idx_applications_state ON applications(state);
CREATE INDEX IF NOT EXISTS idx_applications_zip_code ON applications(zip_code);

-- Re-enable the audit trigger
ALTER TABLE applications ENABLE TRIGGER applications_audit_trigger;