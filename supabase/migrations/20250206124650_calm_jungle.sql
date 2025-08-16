/*
  # Reset Leads Database

  1. Changes
    - Safely clears all application data while preserving audit logs
    - Creates a system audit entry for the reset
    - Maintains table structure and policies
  
  2. Security
    - Preserves RLS policies
    - Maintains audit trail
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
            'message', 'Manual application data reset',
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