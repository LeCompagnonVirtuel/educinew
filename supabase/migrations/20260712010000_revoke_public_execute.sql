-- Revoke EXECUTE from PUBLIC on sensitive SECURITY DEFINER functions
-- PostgreSQL grants EXECUTE to PUBLIC by default; revoking from a specific role is not enough.

REVOKE EXECUTE ON FUNCTION public.auto_generate_school_code FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.auto_generate_user_identifier FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.calculate_work_duration FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.check_staff_attendance_conflicts FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.cleanup_email_logs FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.cleanup_expired_otp_data FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.cleanup_expired_registration_drafts FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.cleanup_old_registration_audit_logs FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.cleanup_rate_limits FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.create_default_permissions FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.create_enterprise_user FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.enterprise_activate_school FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.generate_enterprise_school_code FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.generate_invitation_code FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.generate_school_code_v2 FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.generate_staff_qr FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.generate_student_qr FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.generate_teacher_qr FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.generate_temp_password FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.generate_user_identifier FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.generate_visitor_badge FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_city_abbreviation FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_financial_dashboard FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_monthly_revenue_trend FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_payment_method_breakdown FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_retryable_emails FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_user_role FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_user_school_id FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_ai_updated_at FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_super_admin FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.log_email_failed FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.log_email_sent FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.mark_email_retry FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.notify_parent_on_attendance FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.propagate_email_verification FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.record_staff_attendance_by_surveillant FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.register_school_via_activation FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.register_school_with_admin FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.scan_qr_attendance FROM PUBLIC;

-- Re-grant to authenticated for functions they legitimately need
GRANT EXECUTE ON FUNCTION public.auto_generate_school_code TO authenticated;
GRANT EXECUTE ON FUNCTION public.auto_generate_user_identifier TO authenticated;
GRANT EXECUTE ON FUNCTION public.calculate_work_duration TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_staff_attendance_conflicts TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_default_permissions TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_invitation_code TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_school_code_v2 TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_staff_qr TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_student_qr TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_teacher_qr TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_temp_password TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_user_identifier TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_visitor_badge TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_city_abbreviation TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_financial_dashboard TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_monthly_revenue_trend TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_payment_method_breakdown TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_role TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_school_id TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_super_admin TO authenticated;
GRANT EXECUTE ON FUNCTION public.notify_parent_on_attendance TO authenticated;
GRANT EXECUTE ON FUNCTION public.record_staff_attendance_by_surveillant TO authenticated;
GRANT EXECUTE ON FUNCTION public.scan_qr_attendance TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_enterprise_user TO authenticated;
GRANT EXECUTE ON FUNCTION public.enterprise_activate_school TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_enterprise_school_code TO authenticated;
GRANT EXECUTE ON FUNCTION public.register_school_via_activation TO authenticated;
GRANT EXECUTE ON FUNCTION public.register_school_with_admin TO authenticated;

-- Grant to anon ONLY the pre-auth functions
GRANT EXECUTE ON FUNCTION public.resolve_login_identifier TO anon;
GRANT EXECUTE ON FUNCTION public.check_auth_user_exists TO anon;
GRANT EXECUTE ON FUNCTION public.validate_confirmation_token_readonly TO anon;
GRANT EXECUTE ON FUNCTION public.validate_registration_draft TO anon;

-- These helper functions are used by RLS policies (called implicitly), grant to authenticated
GRANT EXECUTE ON FUNCTION public.get_user_role TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_school_id TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_super_admin TO authenticated;

-- Grant service_role full access (for server-side API routes)
GRANT EXECUTE ON FUNCTION public.handle_new_user TO service_role;
GRANT EXECUTE ON FUNCTION public.propagate_email_verification TO service_role;
GRANT EXECUTE ON FUNCTION public.cleanup_email_logs TO service_role;
GRANT EXECUTE ON FUNCTION public.cleanup_expired_otp_data TO service_role;
GRANT EXECUTE ON FUNCTION public.cleanup_expired_registration_drafts TO service_role;
GRANT EXECUTE ON FUNCTION public.cleanup_old_registration_audit_logs TO service_role;
GRANT EXECUTE ON FUNCTION public.cleanup_rate_limits TO service_role;
GRANT EXECUTE ON FUNCTION public.get_retryable_emails TO service_role;
GRANT EXECUTE ON FUNCTION public.log_email_failed TO service_role;
GRANT EXECUTE ON FUNCTION public.log_email_sent TO service_role;
GRANT EXECUTE ON FUNCTION public.mark_email_retry TO service_role;
GRANT EXECUTE ON FUNCTION public.rls_auto_enable TO service_role;
GRANT EXECUTE ON FUNCTION public.handle_ai_updated_at TO service_role;
GRANT EXECUTE ON FUNCTION public.enterprise_activate_school TO service_role;
GRANT EXECUTE ON FUNCTION public.create_enterprise_user TO service_role;
GRANT EXECUTE ON FUNCTION public.generate_enterprise_school_code TO service_role;
GRANT EXECUTE ON FUNCTION public.register_school_via_activation TO service_role;
GRANT EXECUTE ON FUNCTION public.register_school_with_admin TO service_role;
GRANT EXECUTE ON FUNCTION public.resolve_login_identifier TO service_role;
