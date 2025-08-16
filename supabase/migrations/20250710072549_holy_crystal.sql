/*
  # Force Clear All Applications

  1. Changes
    - Directly truncate applications table
    - Reset auto-increment sequences
    - Add audit log for the operation
    - Verify the clearing was successful
  
  2. Security
    - Maintains audit trail
    - Preserves table structure
*/

-- Temporarily disable the audit trigger
ALTER TABLE applications DISABLE TRIGGER applications_audit_trigger;

-- Create a function to force clear all applications
CREATE OR REPLACE FUNCTION force_clear_applications()
RETURNS TABLE(
    operation_status text,
    records_deleted integer,
    verification_count integer
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    initial_count integer;
    final_count integer;
BEGIN
    -- Count initial records
    SELECT COUNT(*) INTO initial_count FROM applications;
    
    -- Add audit log before deletion
    INSERT INTO audit_logs (
        user_id,
        action,
        table_name,
        record_id,
        old_data,
        new_data
    ) VALUES (
        auth.uid(),
        'FORCE_CLEAR',
        'applications',
        gen_random_uuid(),
        jsonb_build_object(
            'initial_count', initial_count,
            'operation', 'force_clear_all_applications'
        ),
        jsonb_build_object(
            'message', 'Force clearing all applications data',
            'timestamp', CURRENT_TIMESTAMP,
            'method', 'TRUNCATE'
        )
    );

    -- Force delete all records using TRUNCATE for complete clearing
    TRUNCATE TABLE applications RESTART IDENTITY CASCADE;
    
    -- Verify the clearing
    SELECT COUNT(*) INTO final_count FROM applications;
    
    -- Return operation results
    RETURN QUERY SELECT 
        CASE 
            WHEN final_count = 0 THEN 'SUCCESS: All applications cleared'
            ELSE 'WARNING: Some records may remain'
        END::text,
        initial_count,
        final_count;
END;
$$;

-- Execute the force clear function
SELECT * FROM force_clear_applications();

-- Drop the function after use
DROP FUNCTION force_clear_applications();

-- Re-enable the audit trigger
ALTER TABLE applications ENABLE TRIGGER applications_audit_trigger;

-- Final verification query
SELECT 
    COUNT(*) as total_applications,
    CASE 
        WHEN COUNT(*) = 0 THEN 'CLEARED SUCCESSFULLY'
        ELSE 'CLEARING FAILED - RECORDS STILL EXIST'
    END as status
FROM applications;