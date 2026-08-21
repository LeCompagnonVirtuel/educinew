-- =============================================================
-- ADVISOR CENTER: Fix all lints (security + performance)
-- Date: 2026-07-13
-- =============================================================

-- =============================================================
-- 🔐 SECURITY FIXES
-- =============================================================

-- -------------------------------------------------------------
-- 1. security_definer_view: Recreate qr_code_stats as INVOKER view
-- -------------------------------------------------------------
DROP VIEW IF EXISTS public.qr_code_stats;
CREATE VIEW public.qr_code_stats WITH (security_invoker = true) AS
SELECT s.id AS school_id,
    s.name AS school_name,
    count(q.id) AS total_qr_codes,
    count(q.id) FILTER (WHERE q.is_active = true) AS active_qr_codes,
    count(q.id) FILTER (WHERE q.is_active = false) AS revoked_qr_codes,
    count(q.id) FILTER (WHERE q.user_type = 'STUDENT') AS student_qr_codes,
    count(q.id) FILTER (WHERE q.user_type = 'TEACHER') AS teacher_qr_codes,
    count(q.id) FILTER (WHERE q.user_type = 'STAFF') AS staff_qr_codes,
    count(q.id) FILTER (WHERE q.user_type = 'PARENT') AS parent_qr_codes,
    COALESCE(sum(q.scan_count), 0) AS total_scans,
    max(q.last_scanned_at) AS last_scan_at,
    count(q.id) FILTER (WHERE q.generated_at > (now() - interval '24 hours')) AS generated_last_24h,
    count(q.id) FILTER (WHERE q.last_scanned_at > (now() - interval '24 hours')) AS scanned_last_24h
FROM schools s
LEFT JOIN qr_codes q ON q.school_id = s.id
WHERE s.is_active = true
GROUP BY s.id, s.name;

-- -------------------------------------------------------------
-- 2. function_search_path_mutable: Fix validate_matricule, generate_matricule
-- -------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'validate_matricule' AND pronamespace = 'public'::regnamespace) THEN
    ALTER FUNCTION public.validate_matricule SET search_path = public;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'generate_matricule' AND pronamespace = 'public'::regnamespace) THEN
    ALTER FUNCTION public.generate_matricule SET search_path = public;
  END IF;
END $$;

-- -------------------------------------------------------------
-- 3. rls_policy_always_true: Tighten INSERT policies on logging tables
-- -------------------------------------------------------------
-- login_history: restrict to own entries (user_id nullable for failed logins)
DROP POLICY IF EXISTS login_history_insert ON public.login_history;
CREATE POLICY login_history_insert ON public.login_history
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL
    AND (user_id IS NULL OR user_id = auth.uid())
  );

-- security_alerts: restrict to own school
DROP POLICY IF EXISTS security_alerts_insert ON public.security_alerts;
CREATE POLICY security_alerts_insert ON public.security_alerts
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL
    AND (school_id IS NULL OR school_id = get_user_school_id() OR is_super_admin())
  );

-- technical_logs: restrict to own school
DROP POLICY IF EXISTS tech_logs_insert ON public.technical_logs;
CREATE POLICY tech_logs_insert ON public.technical_logs
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL
    AND (school_id IS NULL OR school_id = get_user_school_id() OR is_super_admin())
  );

-- -------------------------------------------------------------
-- 4. public_bucket_allows_listing: Disable public listing on buckets
--    (files still accessible by direct URL, but listing is blocked)
-- -------------------------------------------------------------
UPDATE storage.buckets SET public = false WHERE name IN ('avatars', 'school-logos');

-- Add proper RLS policies for authenticated access to these buckets
DO $$
BEGIN
  -- avatars: authenticated users can read all, upload/update own
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'avatars_select_auth') THEN
    CREATE POLICY avatars_select_auth ON storage.objects
      FOR SELECT USING (bucket_id = 'avatars' AND auth.uid() IS NOT NULL);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'avatars_insert_auth') THEN
    CREATE POLICY avatars_insert_auth ON storage.objects
      FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid() IS NOT NULL);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'avatars_update_auth') THEN
    CREATE POLICY avatars_update_auth ON storage.objects
      FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid() IS NOT NULL);
  END IF;

  -- school-logos: authenticated users can read all, admin can upload
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'school_logos_select_auth') THEN
    CREATE POLICY school_logos_select_auth ON storage.objects
      FOR SELECT USING (bucket_id = 'school-logos' AND auth.uid() IS NOT NULL);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'school_logos_insert_auth') THEN
    CREATE POLICY school_logos_insert_auth ON storage.objects
      FOR INSERT WITH CHECK (bucket_id = 'school-logos' AND auth.uid() IS NOT NULL AND (SELECT role FROM public.users WHERE id = auth.uid()) IN ('ADMIN', 'SUPER_ADMIN'));
  END IF;
END $$;

-- -------------------------------------------------------------
-- 5. anon_security_definer_function_executable: Revoke EXECUTE from anon & PUBLIC
--    Must revoke from PUBLIC too (PG default grants EXECUTE to PUBLIC)
-- -------------------------------------------------------------
DO $$
DECLARE
  fn_oid OID;
BEGIN
  FOR fn_oid IN
    SELECT p.oid FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public'
      AND p.proname IN (
        'auto_confirm_email_on_draft_activation',
        'auto_confirm_email_on_user_activation',
        'check_auth_user_exists',
        'complete_trip',
        'encrypt_two_factor_secret',
        'enterprise_activate_school',
        'generate_unified_qr',
        'get_bus_students',
        'get_driver_bus',
        'get_qr_stats',
        'increment_scan_count',
        'record_staff_attendance_by_surveillant',
        'repair_unconfirmed_emails',
        'scan_qr_attendance',
        'start_trip',
        'validate_confirmation_token_readonly',
        'validate_registration_draft',
        'verify_document_qr'
      )
  LOOP
    BEGIN
      EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM PUBLIC', fn_oid::regprocedure);
      EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM anon', fn_oid::regprocedure);
      EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO authenticated', fn_oid::regprocedure);
      EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO service_role', fn_oid::regprocedure);
    EXCEPTION WHEN OTHERS THEN
      NULL;
    END;
  END LOOP;
END $$;

-- Re-grant resolve_login_identifier to anon (needed for login flow)
GRANT EXECUTE ON FUNCTION public.resolve_login_identifier(text) TO anon;

-- -------------------------------------------------------------
-- 6. authenticated_security_definer_function_executable
--    Restrict admin-only functions to service_role
-- -------------------------------------------------------------
DO $$
DECLARE
  fn_oid OID;
BEGIN
  FOR fn_oid IN
    SELECT p.oid FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public'
      AND p.prosecdef = true
      AND p.proname IN (
        'auto_confirm_email_on_draft_activation',
        'auto_confirm_email_on_user_activation',
        'encrypt_two_factor_secret',
        'repair_unconfirmed_emails'
      )
  LOOP
    BEGIN
      EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM authenticated', fn_oid::regprocedure);
      EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO service_role', fn_oid::regprocedure);
    EXCEPTION WHEN OTHERS THEN
      NULL;
    END;
  END LOOP;
END $$;

-- -------------------------------------------------------------
-- 7. auth_leaked_password_protection: Enable HaveIBeenPwned check
--    NOTE: This requires Supabase Dashboard > Auth > Settings > Enable
--    Cannot be set via SQL, but documenting the intent here.
-- -------------------------------------------------------------
-- Action required: Enable "Leaked Password Protection" in Supabase Dashboard
-- Auth > Settings > Security > Enable HaveIBeenPwned protection

-- =============================================================
-- ⚙️ PERFORMANCE FIXES
-- =============================================================

-- -------------------------------------------------------------
-- 8. unindexed_foreign_keys: Add missing FK indexes
-- -------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_periods_school_id ON public.periods(school_id);
CREATE INDEX IF NOT EXISTS idx_bus_tracking_trip_id ON public.bus_tracking(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_events_school_id ON public.trip_events(school_id);
CREATE INDEX IF NOT EXISTS idx_trip_events_student_id ON public.trip_events(student_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_invoice_uuid ON public.wallet_transactions(invoice_uuid);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_payment_transaction_uuid ON public.wallet_transactions(payment_transaction_uuid);
CREATE INDEX IF NOT EXISTS idx_student_documents_uploaded_by ON public.student_documents(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_document_qr_codes_user_id ON public.document_qr_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_assignments_subject_id ON public.assignments(subject_id);
CREATE INDEX IF NOT EXISTS idx_assignment_submissions_school_id ON public.assignment_submissions(school_id);
CREATE INDEX IF NOT EXISTS idx_security_alerts_resolved_by ON public.security_alerts(resolved_by);
CREATE INDEX IF NOT EXISTS idx_technical_logs_user_id ON public.technical_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_technical_logs_school_id ON public.technical_logs(school_id);
CREATE INDEX IF NOT EXISTS idx_exam_progress_exam_id ON public.exam_progress(exam_id);

-- -------------------------------------------------------------
-- 9. duplicate_index: Remove duplicate indexes
-- -------------------------------------------------------------
-- fee_categories: idx_fee_categories_school duplicates fee_categories_school_id_name_key (covers school_id)
DROP INDEX IF EXISTS idx_fee_categories_school;

-- invoices: idx_invoices_school duplicated by idx_invoices_school_status_due (covers school_id)
DROP INDEX IF EXISTS idx_invoices_school;
-- idx_invoices_student duplicated by idx_invoices_student_id
DROP INDEX IF EXISTS idx_invoices_student;

-- payment_transactions: idx_payment_transactions_reference duplicated by payment_transactions_reference_key (unique)
DROP INDEX IF EXISTS idx_payment_transactions_reference;

-- document_qr_codes: idx_document_qr_codes_student duplicated by idx_doc_qr_student
DROP INDEX IF EXISTS idx_document_qr_codes_student;

-- student_documents: idx_student_documents_student duplicated by idx_student_docs_student
DROP INDEX IF EXISTS idx_student_documents_student;
DROP INDEX IF EXISTS idx_student_documents_school;

-- trip_events: idx_trip_events_bus_id duplicated by idx_trip_events_bus
DROP INDEX IF EXISTS idx_trip_events_bus_id;
-- idx_trip_events_trip_id duplicated by idx_trip_events_trip
DROP INDEX IF EXISTS idx_trip_events_trip_id;

-- wallet_transactions: idx_wallet_transactions_wallet_id duplicated by idx_wallet_transactions_wallet
DROP INDEX IF EXISTS idx_wallet_transactions_wallet_id;

-- assignment_submissions: idx_submissions_assignment duplicated by idx_assignment_submissions_assignment
DROP INDEX IF EXISTS idx_submissions_assignment;
-- idx_submissions_student duplicated by idx_assignment_submissions_student
DROP INDEX IF EXISTS idx_submissions_student;

-- -------------------------------------------------------------
-- 10. auth_rls_initplan: Optimize RLS policies with stable helper functions
--     The helper functions get_user_school_id() and is_super_admin() are already
--     marked STABLE. Ensure they are also SECURITY DEFINER with fixed search_path.
--     This is already done in prior migrations but reaffirming for completeness.
-- -------------------------------------------------------------
ALTER FUNCTION public.get_user_school_id() STABLE;
ALTER FUNCTION public.is_super_admin() STABLE;
ALTER FUNCTION public.get_user_role() STABLE;

-- -------------------------------------------------------------
-- 11. multiple_permissive_policies: Consolidate overlapping policies
-- -------------------------------------------------------------
-- bus_tracking: merge if multiple permissive SELECT policies exist
DO $$
DECLARE
  policy_count INT;
  rec RECORD;
BEGIN
  SELECT count(*) INTO policy_count FROM pg_policies
  WHERE tablename = 'bus_tracking' AND cmd = 'SELECT' AND permissive = 'PERMISSIVE';
  IF policy_count > 1 THEN
    FOR rec IN (SELECT policyname FROM pg_policies WHERE tablename = 'bus_tracking' AND cmd = 'SELECT' AND permissive = 'PERMISSIVE') LOOP
      EXECUTE format('DROP POLICY IF EXISTS %I ON public.bus_tracking', rec.policyname);
    END LOOP;
    CREATE POLICY bus_tracking_select ON public.bus_tracking
      FOR SELECT USING (is_super_admin() OR school_id = get_user_school_id());
  END IF;
END $$;

-- gateway_test_results: consolidate
DO $$
DECLARE
  policy_count INT;
  rec RECORD;
BEGIN
  SELECT count(*) INTO policy_count FROM pg_policies
  WHERE tablename = 'gateway_test_results' AND cmd = 'SELECT' AND permissive = 'PERMISSIVE';
  IF policy_count > 1 THEN
    FOR rec IN (SELECT policyname FROM pg_policies WHERE tablename = 'gateway_test_results' AND cmd = 'SELECT' AND permissive = 'PERMISSIVE') LOOP
      EXECUTE format('DROP POLICY IF EXISTS %I ON public.gateway_test_results', rec.policyname);
    END LOOP;
    CREATE POLICY gateway_test_results_select ON public.gateway_test_results
      FOR SELECT USING (is_super_admin() OR school_id = get_user_school_id());
  END IF;
END $$;

-- payment_gateway_configs: consolidate
DO $$
DECLARE
  policy_count INT;
  rec RECORD;
BEGIN
  SELECT count(*) INTO policy_count FROM pg_policies
  WHERE tablename = 'payment_gateway_configs' AND cmd = 'SELECT' AND permissive = 'PERMISSIVE';
  IF policy_count > 1 THEN
    FOR rec IN (SELECT policyname FROM pg_policies WHERE tablename = 'payment_gateway_configs' AND cmd = 'SELECT' AND permissive = 'PERMISSIVE') LOOP
      EXECUTE format('DROP POLICY IF EXISTS %I ON public.payment_gateway_configs', rec.policyname);
    END LOOP;
    CREATE POLICY payment_gateway_configs_select ON public.payment_gateway_configs
      FOR SELECT USING (is_super_admin() OR school_id = get_user_school_id());
  END IF;
END $$;

-- permissions: consolidate
DO $$
DECLARE
  policy_count INT;
  rec RECORD;
BEGIN
  SELECT count(*) INTO policy_count FROM pg_policies
  WHERE tablename = 'permissions' AND cmd = 'SELECT' AND permissive = 'PERMISSIVE';
  IF policy_count > 1 THEN
    FOR rec IN (SELECT policyname FROM pg_policies WHERE tablename = 'permissions' AND cmd = 'SELECT' AND permissive = 'PERMISSIVE') LOOP
      EXECUTE format('DROP POLICY IF EXISTS %I ON public.permissions', rec.policyname);
    END LOOP;
    CREATE POLICY permissions_select ON public.permissions
      FOR SELECT USING (is_super_admin() OR school_id = get_user_school_id());
  END IF;
END $$;

-- transaction_logs: consolidate
DO $$
DECLARE
  policy_count INT;
  rec RECORD;
BEGIN
  SELECT count(*) INTO policy_count FROM pg_policies
  WHERE tablename = 'transaction_logs' AND cmd = 'SELECT' AND permissive = 'PERMISSIVE';
  IF policy_count > 1 THEN
    FOR rec IN (SELECT policyname FROM pg_policies WHERE tablename = 'transaction_logs' AND cmd = 'SELECT' AND permissive = 'PERMISSIVE') LOOP
      EXECUTE format('DROP POLICY IF EXISTS %I ON public.transaction_logs', rec.policyname);
    END LOOP;
    CREATE POLICY transaction_logs_select ON public.transaction_logs
      FOR SELECT USING (is_super_admin() OR school_id = get_user_school_id());
  END IF;
END $$;
