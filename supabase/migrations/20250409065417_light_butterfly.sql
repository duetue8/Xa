/*
  # Add Address Fields to Applications Table

  1. Changes
    - Add city, state, and zip_code columns to applications table
    - Update existing RLS policies
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add address columns if they don't exist
ALTER TABLE applications 
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS state text,
ADD COLUMN IF NOT EXISTS zip_code text;

-- Add constraint for state format (2 letters)
ALTER TABLE applications
ADD CONSTRAINT valid_state CHECK (state ~ '^[A-Z]{2}$');

-- Add constraint for ZIP code format
ALTER TABLE applications
ADD CONSTRAINT valid_zip CHECK (zip_code ~ '^\d{5}(-\d{4})?$');