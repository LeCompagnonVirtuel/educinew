-- =====================================================
-- EduCI: Email confirmation tokens table
-- Stores custom tokens for email verification flow
-- =====================================================

CREATE TABLE IF NOT EXISTS email_confirmation_tokens (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token text NOT NULL UNIQUE,
  email text NOT NULL,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_email_confirmation_tokens_user ON email_confirmation_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_email_confirmation_tokens_token ON email_confirmation_tokens(token);
CREATE INDEX IF NOT EXISTS idx_email_confirmation_tokens_expires ON email_confirmation_tokens(expires_at);

ALTER TABLE email_confirmation_tokens ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "email_confirmation_tokens_service_all" ON email_confirmation_tokens;
CREATE POLICY "email_confirmation_tokens_service_all" ON email_confirmation_tokens
  FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "email_confirmation_tokens_service_insert" ON email_confirmation_tokens;
CREATE POLICY "email_confirmation_tokens_service_insert" ON email_confirmation_tokens
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "email_confirmation_tokens_service_update" ON email_confirmation_tokens;
CREATE POLICY "email_confirmation_tokens_service_update" ON email_confirmation_tokens
  FOR UPDATE USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "email_confirmation_tokens_service_delete" ON email_confirmation_tokens;
CREATE POLICY "email_confirmation_tokens_service_delete" ON email_confirmation_tokens
  FOR DELETE USING (auth.role() = 'service_role');

-- Cleanup expired tokens (run periodically)
CREATE OR REPLACE FUNCTION cleanup_expired_confirmation_tokens() RETURNS void AS $$
BEGIN
  DELETE FROM email_confirmation_tokens
  WHERE expires_at < now() - interval '7 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to validate and consume a confirmation token
CREATE OR REPLACE FUNCTION validate_confirmation_token(p_token text)
RETURNS TABLE (
  valid boolean,
  user_id uuid,
  email text,
  already_used boolean
) AS $$
DECLARE
  v_token_record RECORD;
BEGIN
  SELECT t.user_id, t.email, t.used_at, t.expires_at
  INTO v_token_record
  FROM email_confirmation_tokens t
  WHERE t.token = p_token;

  IF NOT FOUND THEN
    RETURN QUERY SELECT false, NULL::uuid, NULL::text, false;
    RETURN;
  END IF;

  IF v_token_record.used_at IS NOT NULL THEN
    RETURN QUERY SELECT false, v_token_record.user_id, v_token_record.email, true;
    RETURN;
  END IF;

  IF v_token_record.expires_at < now() THEN
    RETURN QUERY SELECT false, v_token_record.user_id, v_token_record.email, false;
    RETURN;
  END IF;

  UPDATE email_confirmation_tokens
  SET used_at = now()
  WHERE token = p_token;

  RETURN QUERY SELECT true, v_token_record.user_id, v_token_record.email, false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION validate_confirmation_token TO anon;
GRANT EXECUTE ON FUNCTION validate_confirmation_token TO authenticated;
