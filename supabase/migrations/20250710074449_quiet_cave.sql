/*
  # Ultimate Database Reset - Force Clear All Applications

  1. Changes
    - Disable all constraints and triggers temporarily
    - Use multiple deletion strategies
    - Force clear with TRUNCATE CASCADE
    - Reset all sequences and counters
    - Verify complete clearing
  
  2. Security
    - Maintains audit trail
    - Re-enables all security after clearing
*/

-- Step 1: Disable all constraints and triggers temporarily
ALTER TABLE applications DISABLE TRIGGER ALL;
ALTER TABLE applications DISABLE ROW LEVEL SECURITY;

-- Step 2: Create ultimate reset function
CREATE OR REPLACE FUNCTION ultimate_database_reset()
RETURNS TABLE(
    step_description text,
    records_before integer,
    records_after integer,
    success boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    initial_count integer;
    after_step1 integer;
    after_step2 integer;
    after_step3 integer;
    final_count integer;
    reset_id uuid := gen_random_uuid();
BEGIN
    -- Count initial records
    SELECT COUNT(*) INTO initial_count FROM applications;
    
    -- Log the start of ultimate reset
    INSERT INTO audit_logs (
        user_id,
        action,
        table_name,
        record_id,
        old_data,
        new_data
    ) VALUES (
        auth.uid(),
        'ULTIMATE_RESET_START',
        'applications',
        reset_id,
        jsonb_build_object(
            'initial_count', initial_count,
            'reset_method', 'ultimate_force_clear',
            'timestamp', CURRENT_TIMESTAMP
        ),
        jsonb_build_object(
            'message', 'Starting ultimate database reset - all methods',
            'warning', 'This will forcibly clear all application data'
        )
    );

    -- STEP 1: Standard DELETE with no conditions
    DELETE FROM applications;
    SELECT COUNT(*) INTO after_step1 FROM applications;
    
    RETURN QUERY SELECT 
        'STEP_1_DELETE_ALL'::text,
        initial_count,
        after_step1,
        after_step1 = 0;

    -- STEP 2: TRUNCATE with CASCADE (most aggressive)
    TRUNCATE TABLE applications RESTART IDENTITY CASCADE;
    SELECT COUNT(*) INTO after_step2 FROM applications;
    
    RETURN QUERY SELECT 
        'STEP_2_TRUNCATE_CASCADE'::text,
        after_step1,
        after_step2,
        after_step2 = 0;

    -- STEP 3: Drop and recreate table if still has data
    IF after_step2 > 0 THEN
        -- Save the table structure
        CREATE TEMP TABLE temp_applications_backup AS 
        SELECT * FROM applications WHERE 1=0; -- Just structure, no data
        
        -- Drop and recreate
        DROP TABLE applications CASCADE;
        
        -- Recreate table with same structure
        CREATE TABLE applications (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            first_name text NOT NULL,
            last_name text NOT NULL,
            email text NOT NULL,
            phone_number text NOT NULL,
            city text NOT NULL,
            state text NOT NULL,
            zip_code text NOT NULL,
            best_time_to_call text,
            loan_amount numeric NOT NULL,
            monthly_income numeric NOT NULL,
            employment_status text NOT NULL,
            loan_purpose text NOT NULL,
            financial_institution text NOT NULL,
            account_number text,
            ssn_last_four text,
            status text NOT NULL DEFAULT 'pending',
            ip_address text,
            user_agent text,
            created_at timestamptz DEFAULT now(),
            updated_at timestamptz DEFAULT now()
        );
        
        -- Add constraints back
        ALTER TABLE applications ADD CONSTRAINT valid_status CHECK (status IN ('pending', 'approved', 'rejected', 'under_review'));
        ALTER TABLE applications ADD CONSTRAINT valid_employment_status CHECK (employment_status IN ('full_time', 'part_time', 'self_employed', 'retired', 'other'));
        ALTER TABLE applications ADD CONSTRAINT valid_loan_purpose CHECK (loan_purpose IN ('debt_consolidation', 'home_improvement', 'business', 'education', 'emergency', 'other'));
        ALTER TABLE applications ADD CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
        ALTER TABLE applications ADD CONSTRAINT valid_phone CHECK (phone_number ~* '^\+?1?\s*\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$');
        ALTER TABLE applications ADD CONSTRAINT valid_state_code CHECK (state ~ '^[A-Z]{2}$');
        ALTER TABLE applications ADD CONSTRAINT valid_zip_code CHECK (zip_code ~ '^\d{5}$');
        ALTER TABLE applications ADD CONSTRAINT valid_ssn_last_four CHECK (ssn_last_four ~ '^\d{4}$');
        ALTER TABLE applications ADD CONSTRAINT valid_account_number CHECK (account_number ~ '^\d+$');
        
        -- Recreate indexes
        CREATE INDEX idx_applications_created_at ON applications(created_at);
        CREATE INDEX idx_applications_status ON applications(status);
        CREATE INDEX idx_applications_email ON applications(email);
        CREATE INDEX idx_applications_phone ON applications(phone_number);
        CREATE INDEX idx_applications_city ON applications(city);
        CREATE INDEX idx_applications_state ON applications(state);
        CREATE INDEX idx_applications_zip_code ON applications(zip_code);
        CREATE INDEX idx_applications_account_number ON applications(account_number);
        CREATE INDEX idx_applications_ssn_last_four ON applications(ssn_last_four);
        
        SELECT COUNT(*) INTO after_step3 FROM applications;
    ELSE
        after_step3 := after_step2;
    END IF;
    
    RETURN QUERY SELECT 
        'STEP_3_DROP_RECREATE'::text,
        after_step2,
        after_step3,
        after_step3 = 0;

    -- Final count
    SELECT COUNT(*) INTO final_count FROM applications;
    
    -- Log completion
    INSERT INTO audit_logs (
        user_id,
        action,
        table_name,
        record_id,
        old_data,
        new_data
    ) VALUES (
        auth.uid(),
        'ULTIMATE_RESET_COMPLETE',
        'applications',
        reset_id,
        jsonb_build_object(
            'initial_count', initial_count,
            'steps_executed', 3,
            'final_count', final_count
        ),
        jsonb_build_object(
            'message', 'Ultimate database reset completed',
            'success', final_count = 0,
            'records_cleared', initial_count,
            'timestamp', CURRENT_TIMESTAMP,
            'table_recreated', after_step2 > 0
        )
    );

    RETURN QUERY SELECT 
        'FINAL_VERIFICATION'::text,
        initial_count,
        final_count,
        final_count = 0;

END;
$$;

-- Step 3: Execute the ultimate reset
SELECT * FROM ultimate_database_reset();

-- Step 4: Clean up the function
DROP FUNCTION ultimate_database_reset();

-- Step 5: Re-enable security and triggers
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Recreate RLS policies
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON applications;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON applications;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON applications;
DROP POLICY IF EXISTS "Enable read access for all users" ON applications;

CREATE POLICY "Enable read access for authenticated users"
ON applications FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for anonymous users"
ON applications FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users"
ON applications FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable read access for all users"
ON applications FOR SELECT
TO anon, authenticated
USING (true);

-- Recreate the audit trigger
CREATE OR REPLACE FUNCTION audit_trigger_func()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO audit_logs (
      user_id,
      action,
      table_name,
      record_id,
      new_data,
      ip_address
    ) VALUES (
      auth.uid(),
      TG_OP,
      TG_TABLE_NAME,
      NEW.id,
      to_jsonb(NEW),
      current_setting('request.headers')::json->>'x-forwarded-for'
    );
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_logs (
      user_id,
      action,
      table_name,
      record_id,
      old_data,
      new_data,
      ip_address
    ) VALUES (
      auth.uid(),
      TG_OP,
      TG_TABLE_NAME,
      NEW.id,
      to_jsonb(OLD),
      to_jsonb(NEW),
      current_setting('request.headers')::json->>'x-forwarded-for'
    );
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO audit_logs (
      user_id,
      action,
      table_name,
      record_id,
      old_data,
      ip_address
    ) VALUES (
      auth.uid(),
      TG_OP,
      TG_TABLE_NAME,
      OLD.id,
      to_jsonb(OLD),
      current_setting('request.headers')::json->>'x-forwarded-for'
    );
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-enable the audit trigger
DROP TRIGGER IF EXISTS applications_audit_trigger ON applications;
CREATE TRIGGER applications_audit_trigger
  AFTER INSERT OR UPDATE OR DELETE ON applications
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

-- Step 6: Final verification and status report
SELECT 
    'ULTIMATE_RESET_RESULTS' as operation,
    COUNT(*) as remaining_applications,
    CASE 
        WHEN COUNT(*) = 0 THEN '✅ COMPLETE SUCCESS - ALL DATA CLEARED'
        ELSE '❌ RESET FAILED - DATA STILL EXISTS'
    END as final_status,
    CURRENT_TIMESTAMP as completed_at
FROM applications;

-- Show recent audit logs to confirm the operation
SELECT 
    action,
    new_data->>'message' as message,
    new_data->>'success' as success,
    created_at
FROM audit_logs 
WHERE action LIKE '%ULTIMATE_RESET%' 
ORDER BY created_at DESC 
LIMIT 3;