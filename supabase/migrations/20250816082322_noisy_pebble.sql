/*
  # Update postal code constraint for Canadian format

  1. Changes
    - Drop existing valid_zip constraint that expects 5-digit US ZIP codes
    - Add new valid_postal_code constraint for Canadian K1A 0A6 format
    - Update existing data if needed

  2. Security
    - Maintains data integrity with proper postal code validation
    - Supports Canadian postal code format (K1A 0A6)
*/

-- Drop the existing ZIP code constraint
ALTER TABLE applications DROP CONSTRAINT IF EXISTS valid_zip;
ALTER TABLE applications DROP CONSTRAINT IF EXISTS valid_zip_code;

-- Add new Canadian postal code constraint
ALTER TABLE applications ADD CONSTRAINT valid_postal_code 
  CHECK (zip_code ~ '^[A-Z][0-9][A-Z]\s[0-9][A-Z][0-9]$');

-- Update any existing records that might have invalid format
-- (This is safe to run even if no records exist)
UPDATE applications 
SET zip_code = UPPER(SUBSTRING(zip_code, 1, 3)) || ' ' || UPPER(SUBSTRING(zip_code, 4, 3))
WHERE zip_code ~ '^[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]$' 
  AND zip_code !~ '^[A-Z][0-9][A-Z]\s[0-9][A-Z][0-9]$';