-- Security hardening: fix RLS bypass, revoke anon access to sensitive RPCs, fix search_path

-- =============================================================================
-- 1. Fix registration_drafts_v2 RLS: remove "WITH CHECK true" bypass policies
--    Server-side API routes use service_role (bypasses RLS) so anon policies are unnecessary
-- =============================================================================

DROP POLICY IF EXISTS "Anon can insert registration_drafts_v2" ON public.registration_drafts_v2;
DROP POLICY IF EXISTS "Anon can select own draft by session_token" ON public.registration_drafts_v2;
DROP POLICY IF EXISTS "Anon can update own draft by session_token" ON public.registration_drafts_v2;

-- Replace with session_token-scoped policies (defense in depth)
CREATE POLICY "anon_insert_drafts_v2"
  ON public.registration_drafts_v2
  FOR INSERT TO anon
  WITH CHECK (session_token IS NOT NULL AND session_token != '');

CREATE POLICY "anon_select_drafts_v2"
  ON public.registration_drafts_v2
  FOR SELECT TO anon
  USING (session_token = current_setting('request.headers', true)::json->>'x-session-token');

CREATE POLICY "anon_update_drafts_v2"
  ON public.registration_drafts_v2
  FOR UPDATE TO anon
  USING (session_token = current_setting('request.headers', true)::json->>'x-session-token')
  WITH CHECK (session_token IS NOT NULL AND session_token != '');

-- =============================================================================
-- 2. Revoke EXECUTE on sensitive SECURITY DEFINER functions from anon
--    Keep only the functions needed for pre-auth flows accessible to anon
-- =============================================================================

REVOKE EXECUTE ON FUNCTION public.auto_generate_school_code FROM anon;
REVOKE EXECUTE ON FUNCTION public.auto_generate_user_identifier FROM anon;
REVOKE EXECUTE ON FUNCTION public.calculate_work_duration FROM anon;
REVOKE EXECUTE ON FUNCTION public.check_staff_attendance_conflicts FROM anon;
REVOKE EXECUTE ON FUNCTION public.cleanup_email_logs FROM anon;
REVOKE EXECUTE ON FUNCTION public.cleanup_expired_otp_data FROM anon;
REVOKE EXECUTE ON FUNCTION public.cleanup_expired_registration_drafts FROM anon;
REVOKE EXECUTE ON FUNCTION public.cleanup_old_registration_audit_logs FROM anon;
REVOKE EXECUTE ON FUNCTION public.cleanup_rate_limits FROM anon;
REVOKE EXECUTE ON FUNCTION public.create_default_permissions FROM anon;
REVOKE EXECUTE ON FUNCTION public.create_enterprise_user FROM anon;
REVOKE EXECUTE ON FUNCTION public.enterprise_activate_school FROM anon;
REVOKE EXECUTE ON FUNCTION public.generate_enterprise_school_code FROM anon;
REVOKE EXECUTE ON FUNCTION public.generate_invitation_code FROM anon;
REVOKE EXECUTE ON FUNCTION public.generate_school_code_v2 FROM anon;
REVOKE EXECUTE ON FUNCTION public.generate_staff_qr FROM anon;
REVOKE EXECUTE ON FUNCTION public.generate_student_qr FROM anon;
REVOKE EXECUTE ON FUNCTION public.generate_teacher_qr FROM anon;
REVOKE EXECUTE ON FUNCTION public.generate_temp_password FROM anon;
REVOKE EXECUTE ON FUNCTION public.generate_user_identifier FROM anon;
REVOKE EXECUTE ON FUNCTION public.generate_visitor_badge FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_city_abbreviation FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_financial_dashboard FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_monthly_revenue_trend FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_payment_method_breakdown FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_retryable_emails FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_user_role FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_user_school_id FROM anon;
REVOKE EXECUTE ON FUNCTION public.handle_ai_updated_at FROM anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user FROM anon;
REVOKE EXECUTE ON FUNCTION public.is_super_admin FROM anon;
REVOKE EXECUTE ON FUNCTION public.log_email_failed FROM anon;
REVOKE EXECUTE ON FUNCTION public.log_email_sent FROM anon;
REVOKE EXECUTE ON FUNCTION public.mark_email_retry FROM anon;
REVOKE EXECUTE ON FUNCTION public.notify_parent_on_attendance FROM anon;
REVOKE EXECUTE ON FUNCTION public.propagate_email_verification FROM anon;
REVOKE EXECUTE ON FUNCTION public.record_staff_attendance_by_surveillant FROM anon;
REVOKE EXECUTE ON FUNCTION public.register_school_via_activation FROM anon;
REVOKE EXECUTE ON FUNCTION public.register_school_with_admin FROM anon;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable FROM anon;
REVOKE EXECUTE ON FUNCTION public.scan_qr_attendance FROM anon;

-- Keep accessible to anon (needed for pre-auth flows):
-- public.resolve_login_identifier (login)
-- public.check_auth_user_exists (email status check)
-- public.validate_confirmation_token_readonly (token validation)
-- public.validate_registration_draft (draft validation)

-- =============================================================================
-- 3. Also revoke from authenticated where not needed (internal/admin-only functions)
-- =============================================================================

REVOKE EXECUTE ON FUNCTION public.cleanup_email_logs FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.cleanup_expired_otp_data FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.cleanup_expired_registration_drafts FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.cleanup_old_registration_audit_logs FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.cleanup_rate_limits FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.propagate_email_verification FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.log_email_failed FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.log_email_sent FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.mark_email_retry FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.get_retryable_emails FROM authenticated;

-- =============================================================================
-- 4. Fix search_path on SECURITY DEFINER functions that have it mutable
-- =============================================================================

ALTER FUNCTION public.check_auth_user_exists SET search_path = public;
ALTER FUNCTION public.cleanup_expired_otp_data SET search_path = public;
ALTER FUNCTION public.cleanup_expired_registration_drafts SET search_path = public;
ALTER FUNCTION public.cleanup_old_registration_audit_logs SET search_path = public;
ALTER FUNCTION public.enterprise_activate_school SET search_path = public, extensions;
ALTER FUNCTION public.generate_enterprise_school_code SET search_path = public, extensions;
ALTER FUNCTION public.register_school_via_activation SET search_path = public, extensions;
ALTER FUNCTION public.validate_confirmation_token_readonly SET search_path = public;
ALTER FUNCTION public.validate_registration_draft SET search_path = public;
