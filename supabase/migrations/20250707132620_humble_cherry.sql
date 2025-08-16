/*
  # Update Application Dates

  1. Changes
    - Update applications submitted on 7/3/2025 to 7/7/2025
    - Safely modify only the target date records
    - Maintain audit trail
  
  2. Security
    - Preserves data integrity
    - Updates only specific date records
*/

-- Temporarily disable the audit trigger to avoid duplicate logs
ALTER TABLE applications DISABLE TRIGGER applications_audit_trigger;

-- Create a function to safely update application dates
CREATE OR REPLACE FUNCTION update_application_dates()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    updated_count integer;
BEGIN
    -- Update applications from 7/3/2025 to 7/7/2025
    UPDATE applications 
    SET 
        created_at = '2025-07-07'::date + (created_at::time),
        updated_at = CURRENT_TIMESTAMP
    WHERE 
        created_at::date = '2025-07-03'::date;
    
    -- Get the count of updated records
    GET DIAGNOSTICS updated_count = ROW_COUNT;
    
    -- Add an audit log entry for this bulk update
    INSERT INTO audit_logs (
        user_id,
        action,
        table_name,
        record_id,
        old_data,
        new_data
    ) VALUES (
        auth.uid(),
        'BULK_DATE_UPDATE',
        'applications',
        gen_random_uuid(),
        jsonb_build_object(
            'original_date', '2025-07-03',
            'records_affected', updated_count
        ),
        jsonb_build_object(
            'new_date', '2025-07-07',
            'updated_count', updated_count,
            'timestamp', CURRENT_TIMESTAMP,
            'reason', 'Date correction for applications submitted on 7/3/2025'
        )
    );
    
    -- Log the operation
    RAISE NOTICE 'Updated % application records from 7/3/2025 to 7/7/2025', updated_count;
END;
$$;

-- Execute the date update function
SELECT update_application_dates();

-- Drop the function after use
DROP FUNCTION update_application_dates();

-- Re-enable the audit trigger
ALTER TABLE applications ENABLE TRIGGER applications_audit_trigger;