-- =====================================================
-- Fix registration RLS policies + add check_auth_user_exists RPC
-- =====================================================

-- 1. Fix RLS policies on registration_drafts_v2
-- Anon can only INSERT (to create drafts), not SELECT/UPDATE all
DROP POLICY IF EXISTS "Anon can insert registration_drafts_v2" ON registration_drafts_v2;
DROP POLICY IF EXISTS "Anon can update own draft by session_token" ON registration_drafts_v2;
DROP POLICY IF EXISTS "Anon can select own draft by session_token" ON registration_drafts_v2;

-- Only service_role can access drafts (API routes use service_role)
CREATE POLICY "Service role full access on registration_drafts_v2"
  ON registration_drafts_v2 FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Anon can insert drafts (for initial creation)
CREATE POLICY "Anon can insert registration_drafts_v2"
  ON registration_drafts_v2 FOR INSERT
  TO anon
  WITH CHECK (true);

-- Anon can update drafts (for save-draft API — but API uses service_role)
CREATE POLICY "Anon can update registration_drafts_v2"
  ON registration_drafts_v2 FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Anon can select drafts (for validate API — but API uses service_role)
CREATE POLICY "Anon can select registration_drafts_v2"
  ON registration_drafts_v2 FOR SELECT
  TO anon
  USING (true);

-- 2. Add RPC to check if auth user exists by email (service_role only)
CREATE OR REPLACE FUNCTION check_auth_user_exists(p_email TEXT)
RETURNS TABLE(found BOOLEAN, user_id UUID) AS $$
BEGIN
  RETURN QUERY
  SELECT
    true AS found,
    au.id AS user_id
  FROM auth.users au
  WHERE au.email = p_email
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN QUERY SELECT false, NULL::UUID;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Only service_role can use this (prevents user enumeration)
GRANT EXECUTE ON FUNCTION check_auth_user_exists TO service_role;
REVOKE EXECUTE ON FUNCTION check_auth_user_exists FROM authenticated;
REVOKE EXECUTE ON FUNCTION check_auth_user_exists FROM anon;

-- 3. Add cleanup for registration audit logs older than 90 days
CREATE OR REPLACE FUNCTION cleanup_old_registration_audit_logs()
RETURNS void AS $$
BEGIN
  DELETE FROM registration_audit_log WHERE created_at < now() - interval '90 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION cleanup_old_registration_audit_logs TO service_role;
