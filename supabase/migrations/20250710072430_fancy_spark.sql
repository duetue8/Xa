/*
  # Reset Applications Storage

  1. Changes
    - Safely clears all application data while preserving audit logs
    - Creates a system audit entry for the reset
    - Maintains table structure and policies
  
  2. Security
    - Preserves RLS policies
    - Maintains audit trail
    - Records the reset operation
*/

-- Temporarily disable the audit trigger to avoid duplicate logs
ALTER TABLE applications DISABLE TRIGGER applications_audit_trigger;

-- Create a function to safely delete all applications
CREATE OR REPLACE FUNCTION reset_applications_storage()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    deleted_count integer;
    backup_data jsonb;
BEGIN
    -- Count existing applications
    SELECT COUNT(*) INTO deleted_count FROM applications;
    
    -- Create backup of all data before deletion (for audit purposes)
    SELECT jsonb_agg(to_jsonb(t)) INTO backup_data 
    FROM (SELECT * FROM applications ORDER BY created_at) t;
    
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
        'STORAGE_RESET',
        'applications',
        gen_random_uuid(),
        backup_data,
        jsonb_build_object(
            'message', 'Complete applications storage reset',
            'deleted_count', deleted_count,
            'timestamp', CURRENT_TIMESTAMP,
            'reason', 'Admin requested storage reset'
        )
    );

    -- Delete all applications
    DELETE FROM applications;
    
    -- Log the completion
    RAISE NOTICE 'Successfully deleted % application records', deleted_count;
END;
$$;

-- Execute the reset function
SELECT reset_applications_storage();

-- Drop the function after use
DROP FUNCTION reset_applications_storage();

-- Re-enable the audit trigger
ALTER TABLE applications ENABLE TRIGGER applications_audit_trigger;

-- Verify the reset
SELECT 
    COUNT(*) as remaining_applications,
    'Storage has been reset' as status
FROM applications;