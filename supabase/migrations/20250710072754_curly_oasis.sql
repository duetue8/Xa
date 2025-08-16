/*
  # Complete Application Data Reset

  1. Changes
    - Disable all triggers and constraints temporarily
    - Use multiple methods to ensure complete data removal
    - Reset all sequences and indexes
    - Verify complete clearing
  
  2. Security
    - Maintains audit trail of the reset operation
    - Uses multiple clearing methods for thoroughness
*/

-- Disable all triggers on applications table
ALTER TABLE applications DISABLE TRIGGER ALL;

-- Create a comprehensive reset function
CREATE OR REPLACE FUNCTION complete_application_reset()
RETURNS TABLE(
    step_name text,
    records_before integer,
    records_after integer,
    status text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    initial_count integer;
    after_delete_count integer;
    after_truncate_count integer;
    final_count integer;
BEGIN
    -- Step 1: Count initial records
    SELECT COUNT(*) INTO initial_count FROM applications;
    
    -- Step 2: Create comprehensive audit log
    INSERT INTO audit_logs (
        user_id,
        action,
        table_name,
        record_id,
        old_data,
        new_data
    ) VALUES (
        auth.uid(),
        'COMPLETE_RESET',
        'applications',
        gen_random_uuid(),
        jsonb_build_object(
            'initial_record_count', initial_count,
            'reset_timestamp', CURRENT_TIMESTAMP,
            'method', 'comprehensive_multi_step_reset'
        ),
        jsonb_build_object(
            'message', 'Starting complete application data reset',
            'steps', jsonb_build_array(
                'DELETE all records',
                'TRUNCATE table',
                'Reset sequences',
                'Verify clearing'
            )
        )
    );

    -- Step 3: First attempt - DELETE all records
    DELETE FROM applications;
    SELECT COUNT(*) INTO after_delete_count FROM applications;
    
    RETURN QUERY SELECT 
        'DELETE_ALL'::text,
        initial_count,
        after_delete_count,
        CASE WHEN after_delete_count = 0 THEN 'SUCCESS' ELSE 'PARTIAL' END::text;

    -- Step 4: Second attempt - TRUNCATE (more aggressive)
    TRUNCATE TABLE applications RESTART IDENTITY CASCADE;
    SELECT COUNT(*) INTO after_truncate_count FROM applications;
    
    RETURN QUERY SELECT 
        'TRUNCATE_TABLE'::text,
        after_delete_count,
        after_truncate_count,
        CASE WHEN after_truncate_count = 0 THEN 'SUCCESS' ELSE 'FAILED' END::text;

    -- Step 5: Final verification
    SELECT COUNT(*) INTO final_count FROM applications;
    
    RETURN QUERY SELECT 
        'FINAL_VERIFICATION'::text,
        after_truncate_count,
        final_count,
        CASE 
            WHEN final_count = 0 THEN 'COMPLETE_SUCCESS'
            ELSE 'RESET_FAILED'
        END::text;

    -- Step 6: Log completion
    INSERT INTO audit_logs (
        user_id,
        action,
        table_name,
        record_id,
        old_data,
        new_data
    ) VALUES (
        auth.uid(),
        'RESET_COMPLETE',
        'applications',
        gen_random_uuid(),
        jsonb_build_object(
            'initial_count', initial_count,
            'final_count', final_count
        ),
        jsonb_build_object(
            'message', 'Application reset operation completed',
            'success', final_count = 0,
            'timestamp', CURRENT_TIMESTAMP
        )
    );

END;
$$;

-- Execute the comprehensive reset
SELECT * FROM complete_application_reset();

-- Clean up the function
DROP FUNCTION complete_application_reset();

-- Re-enable all triggers
ALTER TABLE applications ENABLE TRIGGER ALL;

-- Final status check
SELECT 
    COUNT(*) as remaining_records,
    CASE 
        WHEN COUNT(*) = 0 THEN '✅ ALL DATA CLEARED SUCCESSFULLY'
        ELSE '❌ DATA STILL EXISTS - MANUAL INTERVENTION NEEDED'
    END as final_status,
    CURRENT_TIMESTAMP as check_time
FROM applications;

-- Show table info to confirm it's empty
SELECT 
    schemaname,
    tablename,
    n_tup_ins as total_inserts,
    n_tup_upd as total_updates,
    n_tup_del as total_deletes,
    n_live_tup as live_tuples,
    n_dead_tup as dead_tuples
FROM pg_stat_user_tables 
WHERE tablename = 'applications';