-- ============================================================================
-- EduCI Advisor Center Fixes — Production Hardening (Idempotent)
-- Date: 2026-07-03
-- Fixes: RLS, SECURITY DEFINER, search_path, indexes, policies
-- Every statement gracefully skips if target doesn't exist
-- ============================================================================

-- ============================================================================
-- 1. FIX: RLS policies on users table
-- ============================================================================

DROP POLICY IF EXISTS users_select ON public.users;
DROP POLICY IF EXISTS users_insert ON public.users;
DROP POLICY IF EXISTS users_update ON public.users;
DROP POLICY IF EXISTS users_delete ON public.users;

CREATE POLICY users_select ON public.users
  FOR SELECT USING (is_super_admin() OR id = auth.uid() OR school_id = get_user_school_id());
CREATE POLICY users_insert ON public.users
  FOR INSERT WITH CHECK (is_super_admin() OR school_id = get_user_school_id());
CREATE POLICY users_update ON public.users
  FOR UPDATE USING (is_super_admin() OR id = auth.uid() OR school_id = get_user_school_id());
CREATE POLICY users_delete ON public.users
  FOR DELETE USING (is_super_admin());

-- ============================================================================
-- 2. FIX: Function Search Path — idempotent DO blocks
-- ============================================================================

DO $$
BEGIN
  -- Helper functions
  ALTER FUNCTION public.get_user_school_id() SET search_path = public;
  ALTER FUNCTION public.get_user_role() SET search_path = public;
  ALTER FUNCTION public.is_super_admin() SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.handle_new_user() SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.register_school_with_admin(uuid, text, text, text, text, text, text, text, text, text) SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.resolve_login_identifier(text) SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.cleanup_rate_limits() SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.cleanup_expired_confirmation_tokens() SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.validate_confirmation_token(text) SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.log_email_sent(text, text, text, text, uuid, uuid, jsonb, text) SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.log_email_failed(text, text, text, text, uuid, uuid, jsonb, text) SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.get_retryable_emails(integer) SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.mark_email_retry(uuid, text) SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.cleanup_email_logs() SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.generate_student_qr() SET search_path = public;
  ALTER FUNCTION public.generate_teacher_qr() SET search_path = public;
  ALTER FUNCTION public.generate_staff_qr() SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.notify_parent_on_attendance() SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.scan_qr_attendance(text, text, uuid, real, real, text) SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.check_staff_attendance_conflicts(uuid, text, timestamptz) SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.calculate_work_duration() SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.generate_visitor_badge() SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.record_staff_attendance_by_surveillant(uuid, text, uuid) SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.create_default_permissions() SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.get_financial_dashboard(uuid) SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.get_payment_method_breakdown(uuid) SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.get_monthly_revenue_trend(uuid, integer) SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.generate_school_code(text, text) SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$
BEGIN
  ALTER FUNCTION public.update_updated_at_column() SET search_path = public;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

-- ============================================================================
-- 3. FIX: SECURITY DEFINER — REVOKE/GRANT (idempotent)
-- ============================================================================

-- REVOKE from anon
DO $$
BEGIN
  REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon;
  REVOKE EXECUTE ON FUNCTION public.cleanup_rate_limits() FROM anon;
  REVOKE EXECUTE ON FUNCTION public.cleanup_email_logs() FROM anon;
  REVOKE EXECUTE ON FUNCTION public.cleanup_expired_confirmation_tokens() FROM anon;
  REVOKE EXECUTE ON FUNCTION public.log_email_sent(text, text, text, text, uuid, uuid, jsonb, text) FROM anon;
  REVOKE EXECUTE ON FUNCTION public.log_email_failed(text, text, text, text, uuid, uuid, jsonb, text) FROM anon;
  REVOKE EXECUTE ON FUNCTION public.get_retryable_emails(integer) FROM anon;
  REVOKE EXECUTE ON FUNCTION public.mark_email_retry(uuid, text) FROM anon;
  REVOKE EXECUTE ON FUNCTION public.generate_student_qr() FROM anon;
  REVOKE EXECUTE ON FUNCTION public.generate_teacher_qr() FROM anon;
  REVOKE EXECUTE ON FUNCTION public.generate_staff_qr() FROM anon;
  REVOKE EXECUTE ON FUNCTION public.notify_parent_on_attendance() FROM anon;
  REVOKE EXECUTE ON FUNCTION public.create_default_permissions() FROM anon;
  REVOKE EXECUTE ON FUNCTION public.get_financial_dashboard(uuid) FROM anon;
  REVOKE EXECUTE ON FUNCTION public.get_payment_method_breakdown(uuid) FROM anon;
  REVOKE EXECUTE ON FUNCTION public.get_monthly_revenue_trend(uuid, integer) FROM anon;
  REVOKE EXECUTE ON FUNCTION public.calculate_work_duration() FROM anon;
  REVOKE EXECUTE ON FUNCTION public.check_staff_attendance_conflicts(uuid, text, timestamptz) FROM anon;
  REVOKE EXECUTE ON FUNCTION public.generate_visitor_badge() FROM anon;
  REVOKE EXECUTE ON FUNCTION public.record_staff_attendance_by_surveillant(uuid, text, uuid) FROM anon;
  REVOKE EXECUTE ON FUNCTION public.scan_qr_attendance(text, text, uuid, real, real, text) FROM anon;
  REVOKE EXECUTE ON FUNCTION public.generate_school_code(text, text) FROM anon;
  REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon;
EXCEPTION WHEN undefined_function OR insufficient_privilege THEN NULL;
END $$;

-- REVOKE from authenticated (internal functions only)
DO $$
BEGIN
  REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM authenticated;
  REVOKE EXECUTE ON FUNCTION public.cleanup_rate_limits() FROM authenticated;
  REVOKE EXECUTE ON FUNCTION public.cleanup_email_logs() FROM authenticated;
  REVOKE EXECUTE ON FUNCTION public.cleanup_expired_confirmation_tokens() FROM authenticated;
  REVOKE EXECUTE ON FUNCTION public.log_email_sent(text, text, text, text, uuid, uuid, jsonb, text) FROM authenticated;
  REVOKE EXECUTE ON FUNCTION public.log_email_failed(text, text, text, text, uuid, uuid, jsonb, text) FROM authenticated;
  REVOKE EXECUTE ON FUNCTION public.get_retryable_emails(integer) FROM authenticated;
  REVOKE EXECUTE ON FUNCTION public.mark_email_retry(uuid, text) FROM authenticated;
  REVOKE EXECUTE ON FUNCTION public.create_default_permissions() FROM authenticated;
  REVOKE EXECUTE ON FUNCTION public.get_financial_dashboard(uuid) FROM authenticated;
  REVOKE EXECUTE ON FUNCTION public.get_payment_method_breakdown(uuid) FROM authenticated;
  REVOKE EXECUTE ON FUNCTION public.get_monthly_revenue_trend(uuid, integer) FROM authenticated;
  REVOKE EXECUTE ON FUNCTION public.generate_school_code(text, text) FROM authenticated;
EXCEPTION WHEN undefined_function OR insufficient_privilege THEN NULL;
END $$;

-- GRANT to service_role
DO $$
BEGIN
  GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;
  GRANT EXECUTE ON FUNCTION public.cleanup_rate_limits() TO service_role;
  GRANT EXECUTE ON FUNCTION public.cleanup_email_logs() TO service_role;
  GRANT EXECUTE ON FUNCTION public.cleanup_expired_confirmation_tokens() TO service_role;
  GRANT EXECUTE ON FUNCTION public.log_email_sent(text, text, text, text, uuid, uuid, jsonb, text) TO service_role;
  GRANT EXECUTE ON FUNCTION public.log_email_failed(text, text, text, text, uuid, uuid, jsonb, text) TO service_role;
  GRANT EXECUTE ON FUNCTION public.get_retryable_emails(integer) TO service_role;
  GRANT EXECUTE ON FUNCTION public.mark_email_retry(uuid, text) TO service_role;
  GRANT EXECUTE ON FUNCTION public.create_default_permissions() TO service_role;
  GRANT EXECUTE ON FUNCTION public.get_financial_dashboard(uuid) TO service_role;
  GRANT EXECUTE ON FUNCTION public.get_payment_method_breakdown(uuid) TO service_role;
  GRANT EXECUTE ON FUNCTION public.get_monthly_revenue_trend(uuid, integer) TO service_role;
  GRANT EXECUTE ON FUNCTION public.generate_school_code(text, text) TO service_role;
EXCEPTION WHEN undefined_function OR insufficient_privilege THEN NULL;
END $$;

-- GRANT to authenticated (legitimate user functions)
DO $$
BEGIN
  GRANT EXECUTE ON FUNCTION public.scan_qr_attendance(text, text, uuid, real, real, text) TO authenticated;
  GRANT EXECUTE ON FUNCTION public.generate_student_qr() TO authenticated;
  GRANT EXECUTE ON FUNCTION public.generate_teacher_qr() TO authenticated;
  GRANT EXECUTE ON FUNCTION public.generate_staff_qr() TO authenticated;
  GRANT EXECUTE ON FUNCTION public.generate_visitor_badge() TO authenticated;
  GRANT EXECUTE ON FUNCTION public.record_staff_attendance_by_surveillant(uuid, text, uuid) TO authenticated;
  GRANT EXECUTE ON FUNCTION public.check_staff_attendance_conflicts(uuid, text, timestamptz) TO authenticated;
  GRANT EXECUTE ON FUNCTION public.calculate_work_duration() TO authenticated;
  GRANT EXECUTE ON FUNCTION public.notify_parent_on_attendance() TO authenticated;
  GRANT EXECUTE ON FUNCTION public.resolve_login_identifier(text) TO authenticated;
  GRANT EXECUTE ON FUNCTION public.register_school_with_admin(uuid, text, text, text, text, text, text, text, text, text) TO authenticated;
  GRANT EXECUTE ON FUNCTION public.validate_confirmation_token(text) TO authenticated;
EXCEPTION WHEN undefined_function OR insufficient_privilege THEN NULL;
END $$;

-- ============================================================================
-- 4. FIX: RLS Policy Always True — scope audit_logs and notifications inserts
-- ============================================================================

DROP POLICY IF EXISTS audit_logs_insert ON public.audit_logs;
CREATE POLICY audit_logs_insert ON public.audit_logs
  FOR INSERT WITH CHECK (is_super_admin() OR school_id = get_user_school_id());

DROP POLICY IF EXISTS notifications_insert ON public.notifications;
CREATE POLICY notifications_insert ON public.notifications
  FOR INSERT WITH CHECK (user_id = auth.uid() OR is_super_admin());

-- ============================================================================
-- 5. FIX: Multiple Permissive Policies — consolidate
-- ============================================================================

DROP POLICY IF EXISTS "Allow service role full access" ON public.gateway_test_results;
DROP POLICY IF EXISTS gateway_test_results_insert ON public.gateway_test_results;
DROP POLICY IF EXISTS gateway_test_results_select ON public.gateway_test_results;

CREATE POLICY gateway_test_results_insert ON public.gateway_test_results
  FOR INSERT WITH CHECK (is_super_admin() OR school_id = get_user_school_id());
CREATE POLICY gateway_test_results_select ON public.gateway_test_results
  FOR SELECT USING (is_super_admin() OR school_id = get_user_school_id());

DROP POLICY IF EXISTS "Allow authenticated inserts" ON public.notifications;

DROP POLICY IF EXISTS permissions_select_anon ON public.permissions;
DROP POLICY IF EXISTS permissions_select_auth ON public.permissions;
DROP POLICY IF EXISTS permissions_select ON public.permissions;

CREATE POLICY permissions_select ON public.permissions
  FOR SELECT USING (true);

-- ============================================================================
-- 6. FIX: Unindexed Foreign Keys
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_invoices_tuition_plan_id ON public.invoices(tuition_plan_id);
CREATE INDEX IF NOT EXISTS idx_invoices_fee_category_id ON public.invoices(fee_category_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_tuition_plan_id ON public.payments(tuition_plan_id);
CREATE INDEX IF NOT EXISTS idx_payments_subscription_id ON public.payments(subscription_id);
CREATE INDEX IF NOT EXISTS idx_staff_user_id ON public.staff(user_id);
CREATE INDEX IF NOT EXISTS idx_invitations_student_id ON public.invitations(student_id);
CREATE INDEX IF NOT EXISTS idx_invitations_invited_by_id ON public.invitations(invited_by_id);
CREATE INDEX IF NOT EXISTS idx_staff_attendance_recorded_by ON public.staff_attendance(recorded_by);
CREATE INDEX IF NOT EXISTS idx_visitors_created_by ON public.visitors(created_by);
CREATE INDEX IF NOT EXISTS idx_staff_invitations_invited_by ON public.staff_invitations(invited_by);
CREATE INDEX IF NOT EXISTS idx_attendance_events_qr_code_id ON public.attendance_events(qr_code_id);
CREATE INDEX IF NOT EXISTS idx_attendance_events_scanned_by ON public.attendance_events(scanned_by);
CREATE INDEX IF NOT EXISTS idx_attendance_events_user_id ON public.attendance_events(user_id);
CREATE INDEX IF NOT EXISTS idx_class_qr_codes_academic_year_id ON public.class_qr_codes(academic_year_id);
CREATE INDEX IF NOT EXISTS idx_classes_academic_year_id ON public.classes(academic_year_id);
CREATE INDEX IF NOT EXISTS idx_gateway_test_results_gateway_id ON public.gateway_test_results(gateway_id);
CREATE INDEX IF NOT EXISTS idx_push_tokens_school_id ON public.push_tokens(school_id);
CREATE INDEX IF NOT EXISTS idx_school_events_created_by ON public.school_events(created_by);
CREATE INDEX IF NOT EXISTS idx_transaction_logs_gateway_id ON public.transaction_logs(gateway_id);

-- ============================================================================
-- 7. FIX: Unused Indexes
-- ============================================================================

DROP INDEX IF EXISTS public.idx_users_is_active;
DROP INDEX IF EXISTS public.idx_marketplace_listings_status;
DROP INDEX IF EXISTS public.idx_periods_period_type;
DROP INDEX IF EXISTS public.idx_bulletins_status;
DROP INDEX IF EXISTS public.idx_invoices_status;
DROP INDEX IF EXISTS public.idx_payment_transactions_flw_reference;
DROP INDEX IF EXISTS public.idx_payment_gateway_configs_gateway;
DROP INDEX IF EXISTS public.idx_wallet_transactions_status;
DROP INDEX IF EXISTS public.idx_payment_reminders_status;
DROP INDEX IF EXISTS public.idx_payment_reminders_type;
DROP INDEX IF EXISTS public.idx_marketplace_listings_category;
DROP INDEX IF EXISTS public.idx_grades_academic_year_id;
DROP INDEX IF EXISTS public.idx_grades_teacher_id;
DROP INDEX IF EXISTS public.idx_grades_grade_type;
DROP INDEX IF EXISTS public.idx_attendance_date;
DROP INDEX IF EXISTS public.idx_behavior_reports_student_id;
DROP INDEX IF EXISTS public.idx_exams_category_id;
DROP INDEX IF EXISTS public.idx_qr_codes_data;
DROP INDEX IF EXISTS public.idx_users_role;
DROP INDEX IF EXISTS public.idx_periods_academic_year_id;
DROP INDEX IF EXISTS public.idx_classes_school_id;
DROP INDEX IF EXISTS public.idx_students_school_id;
DROP INDEX IF EXISTS public.idx_students_class_id;
DROP INDEX IF EXISTS public.idx_students_matricule;
