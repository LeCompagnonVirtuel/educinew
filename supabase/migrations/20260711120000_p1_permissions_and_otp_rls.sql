-- P1-11: Scope permissions SELECT by school_id
-- P1-12: Add RLS on otp_rate_limits

-- =====================================================
-- P1-11: Fix permissions SELECT policy
-- =====================================================

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'permissions') THEN
    EXECUTE 'DROP POLICY IF EXISTS "permissions_select" ON permissions';
    EXECUTE 'DROP POLICY IF EXISTS "permissions_select_school" ON permissions';

    EXECUTE 'CREATE POLICY "permissions_select_school" ON permissions
      FOR SELECT USING (
        school_id = get_user_school_id()
        OR is_super_admin()
      )';
  END IF;
END $$;

-- =====================================================
-- P1-12: Add RLS on otp_rate_limits
-- =====================================================

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'otp_rate_limits') THEN
    EXECUTE 'ALTER TABLE otp_rate_limits ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "otp_rate_limits_service_only" ON otp_rate_limits';
    EXECUTE 'CREATE POLICY "otp_rate_limits_service_only" ON otp_rate_limits
      FOR ALL USING (auth.role() = ''service_role'')
      WITH CHECK (auth.role() = ''service_role'')';
  END IF;
END $$;
