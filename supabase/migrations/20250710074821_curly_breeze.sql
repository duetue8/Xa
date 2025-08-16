/*
  # Add Diagnostic Functions for Database Testing

  1. Functions
    - check_rls_policies: Check current RLS policy status
    - force_delete_applications: Direct deletion with detailed logging
    - get_table_stats: Get detailed table statistics
  
  2. Security
    - All functions are SECURITY DEFINER for admin access
    - Comprehensive logging of all operations
*/

-- Function to check RLS policies
CREATE OR REPLACE FUNCTION check_rls_policies()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result jsonb;
BEGIN
    SELECT jsonb_build_object(
        'table_name', 'applications',
        'rls_enabled', (
            SELECT relrowsecurity 
            FROM pg_class 
            WHERE relname = 'applications'
        ),
        'policies', (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'policy_name', polname,
                    'command', polcmd,
                    'roles', polroles::text,
                    'qual', polqual::text,
                    'with_check', polwithcheck::text
                )
            )
            FROM pg_policy 
            WHERE polrelid = 'applications'::regclass
        ),
        'current_user', current_user,
        'session_user', session_user,
        'auth_uid', auth.uid()
    ) INTO result;
    
    RETURN result;
END;
$$;

-- Function to force delete all applications with detailed logging
CREATE OR REPLACE FUNCTION force_delete_applications()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    initial_count integer;
    delete_count integer;
    final_count integer;
    result jsonb;
BEGIN
    -- Disable triggers temporarily
    ALTER TABLE applications DISABLE TRIGGER ALL;
    
    -- Count initial records
    SELECT COUNT(*) INTO initial_count FROM applications;
    
    -- Attempt deletion
    DELETE FROM applications;
    GET DIAGNOSTICS delete_count = ROW_COUNT;
    
    -- Count remaining records
    SELECT COUNT(*) INTO final_count FROM applications;
    
    -- If records still exist, try TRUNCATE
    IF final_count > 0 THEN
        TRUNCATE TABLE applications RESTART IDENTITY CASCADE;
        SELECT COUNT(*) INTO final_count FROM applications;
    END IF;
    
    -- Re-enable triggers
    ALTER TABLE applications ENABLE TRIGGER ALL;
    
    -- Create result
    SELECT jsonb_build_object(
        'initial_count', initial_count,
        'delete_count', delete_count,
        'final_count', final_count,
        'success', final_count = 0,
        'method_used', CASE 
            WHEN delete_count = initial_count THEN 'DELETE'
            ELSE 'TRUNCATE'
        END,
        'timestamp', CURRENT_TIMESTAMP
    ) INTO result;
    
    -- Log the operation
    INSERT INTO audit_logs (
        user_id,
        action,
        table_name,
        record_id,
        old_data,
        new_data
    ) VALUES (
        auth.uid(),
        'FORCE_DELETE_TEST',
        'applications',
        gen_random_uuid(),
        jsonb_build_object('initial_count', initial_count),
        result
    );
    
    RETURN result;
END;
$$;

-- Function to get detailed table statistics
CREATE OR REPLACE FUNCTION get_table_stats()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result jsonb;
BEGIN
    SELECT jsonb_build_object(
        'table_info', (
            SELECT jsonb_build_object(
                'table_name', schemaname || '.' || tablename,
                'total_inserts', n_tup_ins,
                'total_updates', n_tup_upd,
                'total_deletes', n_tup_del,
                'live_tuples', n_live_tup,
                'dead_tuples', n_dead_tup,
                'last_vacuum', last_vacuum,
                'last_autovacuum', last_autovacuum,
                'last_analyze', last_analyze
            )
            FROM pg_stat_user_tables 
            WHERE tablename = 'applications'
        ),
        'table_size', (
            SELECT pg_size_pretty(pg_total_relation_size('applications'::regclass))
        ),
        'index_info', (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'index_name', indexname,
                    'index_size', pg_size_pretty(pg_relation_size(indexname::regclass))
                )
            )
            FROM pg_indexes 
            WHERE tablename = 'applications'
        )
    ) INTO result;
    
    RETURN result;
END;
$$;

-- Test function to verify everything is working
CREATE OR REPLACE FUNCTION run_comprehensive_test()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    test_results jsonb;
    app_count integer;
    rls_info jsonb;
    table_stats jsonb;
BEGIN
    -- Get current application count
    SELECT COUNT(*) INTO app_count FROM applications;
    
    -- Get RLS information
    SELECT check_rls_policies() INTO rls_info;
    
    -- Get table statistics
    SELECT get_table_stats() INTO table_stats;
    
    -- Compile results
    SELECT jsonb_build_object(
        'test_timestamp', CURRENT_TIMESTAMP,
        'application_count', app_count,
        'rls_policies', rls_info,
        'table_statistics', table_stats,
        'database_version', version(),
        'current_user_info', jsonb_build_object(
            'current_user', current_user,
            'session_user', session_user,
            'auth_uid', auth.uid()
        )
    ) INTO test_results;
    
    -- Log the test
    INSERT INTO audit_logs (
        user_id,
        action,
        table_name,
        record_id,
        old_data,
        new_data
    ) VALUES (
        auth.uid(),
        'COMPREHENSIVE_TEST',
        'applications',
        gen_random_uuid(),
        jsonb_build_object('test_type', 'diagnostic'),
        test_results
    );
    
    RETURN test_results;
END;
$$;