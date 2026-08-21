-- =============================================================
-- SECURITY & PERFORMANCE ADVISORS FIXES
-- Date: 2026-07-13
-- Fixes all Supabase Security and Performance advisor warnings
-- =============================================================

-- =====================================================
-- 1. FIX: security_definer_view (qr_code_stats)
-- Replace SECURITY DEFINER view with a regular view
-- =====================================================

DROP VIEW IF EXISTS qr_code_stats;

CREATE OR REPLACE VIEW qr_code_stats AS
SELECT
  s.id AS school_id,
  s.name AS school_name,
  COUNT(q.id) AS total_qr_codes,
  COUNT(q.id) FILTER (WHERE q.is_active = true) AS active_qr_codes,
  COUNT(q.id) FILTER (WHERE q.is_active = false) AS revoked_qr_codes,
  COUNT(q.id) FILTER (WHERE q.user_type = 'STUDENT') AS student_qr_codes,
  COUNT(q.id) FILTER (WHERE q.user_type = 'TEACHER') AS teacher_qr_codes,
  COUNT(q.id) FILTER (WHERE q.user_type = 'STAFF') AS staff_qr_codes,
  COUNT(q.id) FILTER (WHERE q.user_type = 'PARENT') AS parent_qr_codes,
  COALESCE(SUM(q.scan_count), 0) AS total_scans,
  MAX(q.last_scanned_at) AS last_scan_at,
  COUNT(q.id) FILTER (WHERE q.generated_at > now() - interval '24 hours') AS generated_last_24h,
  COUNT(q.id) FILTER (WHERE q.last_scanned_at > now() - interval '24 hours') AS scanned_last_24h
FROM schools s
LEFT JOIN qr_codes q ON q.school_id = s.id
WHERE s.is_active = true
GROUP BY s.id, s.name;

-- =====================================================
-- 2. FIX: RLS policies with WITH CHECK (true)
-- Replace always-true policies with proper school/user checks
-- =====================================================

-- login_history: restrict insert to authenticated users only
DROP POLICY IF EXISTS login_history_insert ON login_history;
CREATE POLICY login_history_insert ON login_history
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- quiz_questions: restrict insert to school members
DROP POLICY IF EXISTS quiz_questions_insert ON quiz_questions;
CREATE POLICY quiz_questions_insert ON quiz_questions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM quizzes q
      JOIN subjects sub ON sub.id = q.subject_id
      WHERE q.id = quiz_questions.quiz_id
        AND sub.school_id = get_user_school_id()
    )
    OR is_super_admin()
  );

-- security_alerts: restrict insert to authenticated users
DROP POLICY IF EXISTS security_alerts_insert ON security_alerts;
CREATE POLICY security_alerts_insert ON security_alerts
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- technical_logs: restrict insert to authenticated users
DROP POLICY IF EXISTS tech_logs_insert ON technical_logs;
CREATE POLICY tech_logs_insert ON technical_logs
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- =====================================================
-- 3. FIX: SECURITY DEFINER functions — REVOKE from anon
-- Only resolve_login_identifier should be callable by anon
-- Uses DO blocks to handle non-existent functions gracefully
-- =====================================================

DO $$
DECLARE
  funcs TEXT[] := ARRAY[
    'auto_confirm_email_on_draft_activation()',
    'auto_confirm_email_on_user_activation()',
    'check_auth_user_exists(text)',
    'complete_trip(uuid)',
    'encrypt_two_factor_secret()',
    'enterprise_activate_school(uuid, text, text, text, text, text, text, text, text, text)',
    'generate_unified_qr()',
    'get_bus_students(uuid)',
    'get_driver_bus(uuid)',
    'get_qr_stats(uuid)',
    'increment_scan_count(uuid)',
    'record_staff_attendance_by_surveillant(uuid, uuid, text, double precision, double precision, uuid)',
    'repair_unconfirmed_emails()',
    'scan_qr_attendance(text, uuid, uuid, double precision, double precision, text)',
    'start_trip(uuid, uuid, uuid, text)',
    'validate_confirmation_token(text)',
    'validate_confirmation_token_readonly(text)',
    'validate_registration_draft(uuid, text)',
    'verify_document_qr(text)',
    'generate_matricule()',
    'validate_matricule(text)'
  ];
  f TEXT;
BEGIN
  FOREACH f IN ARRAY funcs LOOP
    BEGIN
      EXECUTE format('REVOKE EXECUTE ON FUNCTION public.%s FROM anon', f);
    EXCEPTION WHEN undefined_function THEN
      -- Function doesn't exist, skip
      NULL;
    END;
  END LOOP;
END $$;

-- Revoke from authenticated for admin/trigger-only functions
DO $$
DECLARE
  funcs TEXT[] := ARRAY[
    'auto_confirm_email_on_draft_activation()',
    'auto_confirm_email_on_user_activation()',
    'encrypt_two_factor_secret()',
    'enterprise_activate_school(uuid, text, text, text, text, text, text, text, text, text)',
    'generate_unified_qr()',
    'repair_unconfirmed_emails()',
    'validate_confirmation_token(text)',
    'validate_confirmation_token_readonly(text)',
    'validate_registration_draft(uuid, text)',
    'generate_enterprise_school_code(text)',
    'generate_invitation_code()',
    'generate_school_code_v2(text)',
    'generate_staff_qr()',
    'generate_student_qr()',
    'generate_teacher_qr()',
    'check_auth_user_exists(text)',
    'repair_unconfirmed_emails()'
  ];
  f TEXT;
BEGIN
  FOREACH f IN ARRAY funcs LOOP
    BEGIN
      EXECUTE format('REVOKE EXECUTE ON FUNCTION public.%s FROM authenticated', f);
    EXCEPTION WHEN undefined_function THEN
      NULL;
    END;
  END LOOP;
END $$;

-- Keep these accessible to authenticated (they are user-facing):
-- resolve_login_identifier (login flow)
-- get_financial_dashboard, get_monthly_revenue_trend, get_payment_method_breakdown (dashboard)
-- get_qr_stats (QR monitoring)
-- increment_scan_count (QR scanning)
-- scan_qr_attendance (attendance)
-- start_trip, complete_trip (transport)
-- get_driver_bus, get_bus_students (driver dashboard)
-- record_staff_attendance_by_surveillant (surveillance)
-- verify_document_qr (document verification)
-- generate_matricule, validate_matricule (student management)
-- auto_generate_school_code, auto_generate_user_identifier (triggers)

-- =====================================================
-- 4. FIX: search_path mutable on functions
-- =====================================================

-- validate_matricule
CREATE OR REPLACE FUNCTION validate_matricule(p_matricule TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
BEGIN
  IF p_matricule IS NULL THEN
    RETURN FALSE;
  END IF;
  IF LENGTH(p_matricule) != 9 THEN
    RETURN FALSE;
  END IF;
  IF p_matricule ~ '^\d{8}[A-Z]$' THEN
    RETURN TRUE;
  END IF;
  RETURN FALSE;
END;
$$;

-- generate_matricule
CREATE OR REPLACE FUNCTION generate_matricule()
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  v_matricule TEXT;
  v_digits TEXT;
  v_letter TEXT;
  v_exists BOOLEAN;
  v_attempts INT := 0;
BEGIN
  LOOP
    v_digits := '';
    FOR i IN 1..8 LOOP
      v_digits := v_digits || FLOOR(RANDOM() * 10)::TEXT;
    END LOOP;
    v_letter := CHR(65 + FLOOR(RANDOM() * 26)::INT);
    v_matricule := v_digits || v_letter;

    SELECT EXISTS(SELECT 1 FROM students WHERE matricule = v_matricule) INTO v_exists;
    IF NOT v_exists THEN
      RETURN v_matricule;
    END IF;

    v_attempts := v_attempts + 1;
    IF v_attempts > 20 THEN
      RAISE EXCEPTION 'Impossible de générer un matricule unique après 20 tentatives';
    END IF;
  END LOOP;
END;
$$;

-- Also fix other functions that might be missing search_path
CREATE OR REPLACE FUNCTION auto_generate_school_code()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.school_code IS NULL THEN
    NEW.school_code := 'EDUCI-SYS-' || UPPER(COALESCE(LEFT(NEW.city, 3), 'UNK')) || '-' || LPAD(FLOOR(RANDOM() * 99999)::TEXT, 5, '0');
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION auto_generate_user_identifier()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_year TEXT;
  v_seq TEXT;
BEGIN
  IF NEW.identifier IS NULL THEN
    v_year := EXTRACT(YEAR FROM now())::TEXT;
    SELECT LPAD((COUNT(*) + 1)::TEXT, 6, '0') INTO v_seq FROM users WHERE identifier LIKE 'ELV-' || v_year || '-%';
    NEW.identifier := 'ELV-' || v_year || '-' || v_seq;
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION calculate_work_duration()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.check_in_time IS NOT NULL AND NEW.check_out_time IS NOT NULL THEN
    NEW.total_work_minutes := EXTRACT(EPOCH FROM (NEW.check_out_time - NEW.check_in_time)) / 60;
    IF NEW.break_start IS NOT NULL AND NEW.break_end IS NOT NULL THEN
      NEW.break_minutes := EXTRACT(EPOCH FROM (NEW.break_end - NEW.break_start)) / 60;
      NEW.total_work_minutes := NEW.total_work_minutes - NEW.break_minutes;
    END IF;
    IF NEW.total_work_minutes > 480 THEN
      NEW.status := 'PRESENT';
    ELSIF NEW.total_work_minutes > 0 THEN
      NEW.status := 'PRESENT';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION create_default_permissions()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_roles TEXT[] := ARRAY['ADMIN', 'TEACHER', 'PARENT', 'STUDENT', 'COMPTABLE', 'SECRETAIRE', 'CENSEUR', 'SURVEILLANT'];
  v_resources TEXT[] := ARRAY['students', 'teachers', 'classes', 'grades', 'attendance', 'payments', 'messages', 'notifications', 'reports', 'settings', 'documents', 'transport', 'announcements'];
  v_role TEXT;
  v_resource TEXT;
BEGIN
  FOREACH v_role IN ARRAY v_roles LOOP
    FOREACH v_resource IN ARRAY v_resources LOOP
      INSERT INTO permissions (school_id, role, resource, can_create, can_read, can_update, can_delete, can_export)
      VALUES (
        NEW.id,
        v_role,
        v_resource,
        CASE WHEN v_role IN ('ADMIN', 'SUPER_ADMIN') THEN true ELSE false END,
        true,
        CASE WHEN v_role IN ('ADMIN', 'SUPER_ADMIN', 'TEACHER') THEN true ELSE false END,
        CASE WHEN v_role IN ('ADMIN', 'SUPER_ADMIN') THEN true ELSE false END,
        CASE WHEN v_role IN ('ADMIN', 'SUPER_ADMIN', 'COMPTABLE') THEN true ELSE false END
      )
      ON CONFLICT DO NOTHING;
    END LOOP;
  END LOOP;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION generate_enterprise_school_code(p_city TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_code TEXT;
  v_exists BOOLEAN;
BEGIN
  LOOP
    v_code := 'EDUCI-SYS-' || UPPER(COALESCE(LEFT(p_city, 3), 'UNK')) || '-' || LPAD(FLOOR(RANDOM() * 99999)::TEXT, 5, '0');
    SELECT EXISTS(SELECT 1 FROM schools WHERE school_code = v_code) INTO v_exists;
    IF NOT v_exists THEN RETURN v_code; END IF;
  END LOOP;
END;
$$;

CREATE OR REPLACE FUNCTION generate_invitation_code()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_code TEXT;
  v_exists BOOLEAN;
BEGIN
  LOOP
    v_code := UPPER(LEFT(MD5(RANDOM()::TEXT), 8));
    SELECT EXISTS(SELECT 1 FROM invitations WHERE token = v_code) INTO v_exists;
    IF NOT v_exists THEN RETURN v_code; END IF;
  END LOOP;
END;
$$;

CREATE OR REPLACE FUNCTION generate_school_code_v2(p_prefix TEXT DEFAULT 'EDU')
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_code TEXT;
  v_exists BOOLEAN;
BEGIN
  LOOP
    v_code := p_prefix || '-' || LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0');
    SELECT EXISTS(SELECT 1 FROM schools WHERE code = v_code) INTO v_exists;
    IF NOT v_exists THEN RETURN v_code; END IF;
  END LOOP;
END;
$$;

-- =====================================================
-- 5. FIX: Storage buckets — restrict public listing
-- =====================================================

-- Drop overly permissive policies
DROP POLICY IF EXISTS "QR codes public read" ON storage.objects;
DROP POLICY IF EXISTS "avatars public read" ON storage.objects;
DROP POLICY IF EXISTS "school-logos public read" ON storage.objects;

-- Avatars: authenticated users can read, owners can write
CREATE POLICY "avatars_authenticated_read" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'avatars'
    AND auth.uid() IS NOT NULL
  );

CREATE POLICY "avatars_owner_insert" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- School logos: school members can read
CREATE POLICY "school_logos_school_read" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'school-logos'
    AND auth.uid() IS NOT NULL
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

-- QR codes: school members can read (already has this, ensure it's correct)
CREATE POLICY "qr_codes_school_read" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'qr-codes'
    AND auth.uid() IS NOT NULL
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

-- =====================================================
-- 6. FIX: Duplicate indexes
-- =====================================================

-- Drop duplicate indexes (keep the better-named one)
-- fee_categories
DROP INDEX IF EXISTS idx_fee_categories_school_id;
-- invoices
DROP INDEX IF EXISTS idx_invoices_school_id;
-- payment_gateway_configs
DROP INDEX IF EXISTS idx_payment_gateway_configs_school_id;
-- payment_transactions
DROP INDEX IF EXISTS idx_payment_transactions_invoice_id;

-- =====================================================
-- 7. FIX: Missing FK indexes for new tables
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_assignment_submissions_assignment ON assignment_submissions(assignment_id);
CREATE INDEX IF NOT EXISTS idx_assignment_submissions_student ON assignment_submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_bus_tracking_bus_id ON bus_tracking(bus_id);
CREATE INDEX IF NOT EXISTS idx_bus_tracking_driver_id ON bus_tracking(driver_id);
CREATE INDEX IF NOT EXISTS idx_document_qr_codes_student ON document_qr_codes(student_id);
CREATE INDEX IF NOT EXISTS idx_exam_progress_student ON exam_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_exam_progress_quiz ON exam_progress(quiz_id);
CREATE INDEX IF NOT EXISTS idx_periods_academic_year ON periods(academic_year_id);
CREATE INDEX IF NOT EXISTS idx_security_alerts_user ON security_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_security_alerts_school ON security_alerts(school_id);
CREATE INDEX IF NOT EXISTS idx_student_documents_student ON student_documents(student_id);
CREATE INDEX IF NOT EXISTS idx_student_documents_school ON student_documents(school_id);
CREATE INDEX IF NOT EXISTS idx_trip_events_trip ON trip_events(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_events_bus ON trip_events(bus_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_wallet ON wallet_transactions(wallet_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_user ON wallet_transactions(user_id);

-- =====================================================
-- 8. FIX: Multiple permissive policies — consolidate
-- =====================================================

-- bus_tracking: consolidate into single policy (no school_id, use bus join)
DROP POLICY IF EXISTS bus_tracking_select ON bus_tracking;
DROP POLICY IF EXISTS bus_tracking_insert ON bus_tracking;
DROP POLICY IF EXISTS bus_tracking_update ON bus_tracking;

CREATE POLICY bus_tracking_all ON bus_tracking
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM buses b WHERE b.id = bus_tracking.bus_id
        AND (b.school_id = get_user_school_id() OR is_super_admin())
    )
  );

-- gateway_test_results: consolidate
DROP POLICY IF EXISTS gateway_test_results_select ON gateway_test_results;
DROP POLICY IF EXISTS gateway_test_results_insert ON gateway_test_results;

CREATE POLICY gateway_test_results_all ON gateway_test_results
  FOR ALL USING (
    school_id = get_user_school_id()
    OR is_super_admin()
  );

-- payment_gateway_configs: consolidate
DROP POLICY IF EXISTS payment_gateway_configs_select ON payment_gateway_configs;
DROP POLICY IF EXISTS payment_gateway_configs_insert ON payment_gateway_configs;
DROP POLICY IF EXISTS payment_gateway_configs_update ON payment_gateway_configs;
DROP POLICY IF EXISTS payment_gateway_configs_delete ON payment_gateway_configs;

CREATE POLICY payment_gateway_configs_all ON payment_gateway_configs
  FOR ALL USING (
    school_id = get_user_school_id()
    OR is_super_admin()
  );

-- permissions: consolidate
DROP POLICY IF EXISTS permissions_select ON permissions;
DROP POLICY IF EXISTS permissions_insert ON permissions;
DROP POLICY IF EXISTS permissions_update ON permissions;
DROP POLICY IF EXISTS permissions_delete ON permissions;

CREATE POLICY permissions_all ON permissions
  FOR ALL USING (
    school_id = get_user_school_id()
    OR is_super_admin()
  );

-- transaction_logs: consolidate
DROP POLICY IF EXISTS transaction_logs_select ON transaction_logs;
DROP POLICY IF EXISTS transaction_logs_insert ON transaction_logs;

CREATE POLICY transaction_logs_all ON transaction_logs
  FOR ALL USING (
    school_id = get_user_school_id()
    OR is_super_admin()
  );

-- =====================================================
-- 9. FIX: Auth Leaked Password Protection
-- This must be enabled via Supabase Dashboard:
-- Authentication > Settings > Security > Enable leaked password protection
-- =====================================================
-- Note: This is a dashboard setting, not a SQL migration.
-- Document this for manual configuration.

COMMENT ON SCHEMA public IS 'EduCI Production Schema. Manual config needed: Enable leaked password protection in Auth > Settings > Security.';
