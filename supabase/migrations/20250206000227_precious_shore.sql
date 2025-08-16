/*
  # Reset Application Data

  1. Changes
    - Temporarily disables audit trigger
    - Safely removes all application data
    - Records a system reset audit log
    - Re-enables audit trigger
  
  2. Security
    - Maintains data integrity
    - Preserves audit trail of the reset
*/

-- Temporarily disable the audit trigger
ALTER TABLE applications DISABLE TRIGGER applications_audit_trigger;

-- Create a function to safely delete applications
CREATE OR REPLACE FUNCTION safely_delete_applications()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Add a system reset audit log entry
    INSERT INTO audit_logs (
        user_id,
        action,
        table_name,
        record_id,
        old_data,
        new_data
    ) VALUES (
        auth.uid(),
        'SYSTEM_RESET',
        'applications',
        gen_random_uuid(),
        (SELECT jsonb_agg(to_jsonb(t)) FROM (SELECT * FROM applications) t),
        jsonb_build_object(
            'message', 'Complete application data reset',
            'timestamp', CURRENT_TIMESTAMP
        )
    );

    -- Delete all applications
    DELETE FROM applications;
END;
$$;

-- Execute the safe deletion function
SELECT safely_delete_applications();

-- Drop the function after use
DROP FUNCTION safely_delete_applications();

-- Re-enable the audit trigger
ALTER TABLE applications ENABLE TRIGGER applications_audit_trigger;