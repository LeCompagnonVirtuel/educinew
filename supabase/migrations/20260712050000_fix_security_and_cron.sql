-- =============================================================================
-- Fix: Security revocations + cron function signature + handle_new_user logging
-- =============================================================================

-- =============================================================================
-- 1. SECURITY: Revoke anon access to user enumeration functions
--    Migration 20260712010000 incorrectly re-granted these to anon.
--    These functions query auth.users and must only be callable by service_role.
-- =============================================================================

REVOKE EXECUTE ON FUNCTION public.check_auth_user_exists FROM anon;
REVOKE EXECUTE ON FUNCTION public.resolve_login_identifier FROM anon;
REVOKE EXECUTE ON FUNCTION public.validate_confirmation_token_readonly FROM anon;

-- Only service_role and authenticated should call resolve_login_identifier
-- (the mobile/web login flow calls it via server-side API route with service_role)
GRANT EXECUTE ON FUNCTION public.resolve_login_identifier TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_auth_user_exists TO service_role;
GRANT EXECUTE ON FUNCTION public.validate_confirmation_token_readonly TO service_role;

-- =============================================================================
-- 2. FIX: cleanup_email_logs() takes 0 args, but cron calls it with 30
--    Replace the function to accept an optional retention_days parameter
-- =============================================================================

CREATE OR REPLACE FUNCTION cleanup_email_logs(retention_days INTEGER DEFAULT 90)
RETURNS void AS $$
BEGIN
  DELETE FROM email_logs WHERE created_at < now() - (retention_days || ' days')::interval;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Re-apply grants (only service_role should call this)
REVOKE EXECUTE ON FUNCTION public.cleanup_email_logs(INTEGER) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.cleanup_email_logs(INTEGER) FROM anon;
REVOKE EXECUTE ON FUNCTION public.cleanup_email_logs(INTEGER) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.cleanup_email_logs(INTEGER) TO service_role;

-- Also fix the zero-arg version grants
REVOKE EXECUTE ON FUNCTION public.cleanup_email_logs() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.cleanup_email_logs() FROM anon;
REVOKE EXECUTE ON FUNCTION public.cleanup_email_logs() FROM authenticated;
GRANT EXECUTE ON FUNCTION public.cleanup_email_logs() TO service_role;

-- =============================================================================
-- 3. FIX: handle_new_user() silently swallows all errors
--    Log the error before returning NEW so we can diagnose failures
-- =============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, name, email, role, school_id, is_active, status)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'STUDENT'),
    (NEW.raw_user_meta_data->>'school_id')::UUID,
    CASE WHEN NEW.email_confirmed_at IS NOT NULL THEN true ELSE false END,
    'ACTIVE'
  )
  ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    email = EXCLUDED.email;
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING '[handle_new_user] Failed for user_id=% email=%: % %',
    NEW.id, NEW.email, SQLERRM, SQLSTATE;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- =============================================================================
-- 4. FIX: registration_drafts_v2 — ensure final state is clean
--    Drop any remaining open anon policies that may have been re-created
--    by migration 20260709120000. Keep only session-token-scoped policies.
-- =============================================================================

DROP POLICY IF EXISTS "Anon can insert registration_drafts_v2" ON public.registration_drafts_v2;
DROP POLICY IF EXISTS "Anon can update registration_drafts_v2" ON public.registration_drafts_v2;
DROP POLICY IF EXISTS "Anon can select registration_drafts_v2" ON public.registration_drafts_v2;
DROP POLICY IF EXISTS "Service role full access on registration_drafts_v2" ON public.registration_drafts_v2;

-- Ensure the session-token-scoped policies exist (idempotent re-create)
DROP POLICY IF EXISTS "anon_insert_drafts_v2" ON public.registration_drafts_v2;
DROP POLICY IF EXISTS "anon_select_drafts_v2" ON public.registration_drafts_v2;
DROP POLICY IF EXISTS "anon_update_drafts_v2" ON public.registration_drafts_v2;

CREATE POLICY "anon_insert_drafts_v2"
  ON public.registration_drafts_v2
  FOR INSERT TO anon
  WITH CHECK (session_token IS NOT NULL AND session_token != '');

CREATE POLICY "anon_select_drafts_v2"
  ON public.registration_drafts_v2
  FOR SELECT TO anon
  USING (
    session_token IS NOT NULL
    AND session_token = COALESCE(
      current_setting('request.headers', true)::json->>'x-session-token',
      ''
    )
  );

CREATE POLICY "anon_update_drafts_v2"
  ON public.registration_drafts_v2
  FOR UPDATE TO anon
  USING (
    session_token IS NOT NULL
    AND session_token = COALESCE(
      current_setting('request.headers', true)::json->>'x-session-token',
      ''
    )
  )
  WITH CHECK (session_token IS NOT NULL AND session_token != '');

-- Service role always bypasses RLS, but explicit policy for clarity
CREATE POLICY "service_role_full_access_drafts_v2"
  ON public.registration_drafts_v2
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- =============================================================================
-- 5. FIX: pg_cron — wrap in DO block so it doesn't block other migrations
-- =============================================================================

DO $$
BEGIN
  -- Unschedule old broken job and reschedule with correct signature
  PERFORM cron.unschedule('cleanup-email-logs');
  PERFORM cron.schedule('cleanup-email-logs', '0 3 * * *', 'SELECT cleanup_email_logs(30)');
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'pg_cron not available or job not found, skipping: %', SQLERRM;
END $$;
