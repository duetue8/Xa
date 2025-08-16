/*
  # Add Account Fields to Applications Table

  1. New Fields
    - account_number (text) - For bank account number
    - ssn_last_four (text) - For last 4 digits of SSN
  
  2. Security
    - Add validation constraints
    - Maintain existing RLS policies
*/

-- Add new columns
ALTER TABLE applications 
ADD COLUMN IF NOT EXISTS account_number text,
ADD COLUMN IF NOT EXISTS ssn_last_four text;

-- Add validation constraints
ALTER TABLE applications
ADD CONSTRAINT valid_ssn_last_four CHECK (ssn_last_four ~ '^\d{4}$'),
ADD CONSTRAINT valid_account_number CHECK (account_number ~ '^\d+$');

-- Create indexes for new fields
CREATE INDEX IF NOT EXISTS idx_applications_account_number ON applications(account_number);
CREATE INDEX IF NOT EXISTS idx_applications_ssn_last_four ON applications(ssn_last_four);