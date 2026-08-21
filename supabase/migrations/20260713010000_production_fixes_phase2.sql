-- =============================================================
-- PRODUCTION FIXES — Phase 2 (2026-07-13)
-- =============================================================

-- 1. Add is_first_login column to users (move from user_metadata to DB)
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_first_login BOOLEAN DEFAULT false;

-- Backfill from existing data
UPDATE users SET is_first_login = false WHERE is_first_login IS NULL;

-- 2. Enable pgcrypto for encryption (if not already)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 3. Encrypt two_factor_secret at rest
-- Add encrypted column
ALTER TABLE users ADD COLUMN IF NOT EXISTS two_factor_secret_encrypted BYTEA;

-- Create helper functions for column-level encryption
CREATE OR REPLACE FUNCTION encrypt_two_factor_secret()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.two_factor_secret IS NOT NULL AND NEW.two_factor_secret != OLD.two_factor_secret THEN
    NEW.two_factor_secret_encrypted := pgp_sym_encrypt(
      NEW.two_factor_secret,
      current_setting('app.settings.encryption_key', true)
    );
    -- Clear plaintext after encryption
    NEW.two_factor_secret := NULL;
  END IF;
  RETURN NEW;
END;
$$;

-- Note: The trigger will be created once the encryption_key setting is configured
-- For now, we provide the function. To activate:
-- ALTER SYSTEM SET app.settings.encryption_key = 'your-key-here';
-- CREATE TRIGGER trg_encrypt_two_factor_secret
--   BEFORE INSERT OR UPDATE ON users
--   FOR EACH ROW EXECUTE FUNCTION encrypt_two_factor_secret();

-- 4. Fix enterprise_activate_school — replace crypt() with Supabase-compatible password generation
-- The issue: crypt() produces bcrypt hashes but GoTrue uses argon2id
-- Solution: generate a random password and use supabase.auth.admin.createUser instead
-- This function now just creates the school and user record, NOT the auth user
-- The auth user is created via the Edge Function / API using supabase.auth.admin

CREATE OR REPLACE FUNCTION public.enterprise_activate_school(
  p_draft_id UUID,
  p_owner_name TEXT,
  p_owner_email TEXT,
  p_school_name TEXT,
  p_school_type TEXT DEFAULT 'SECONDARY',
  p_region TEXT DEFAULT '',
  p_city TEXT DEFAULT '',
  p_address TEXT DEFAULT '',
  p_phone TEXT DEFAULT '',
  p_school_email TEXT DEFAULT ''
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_school_id UUID;
  v_user_id UUID;
  v_school_code TEXT;
  v_draft RECORD;
BEGIN
  -- Validate draft exists
  SELECT * INTO v_draft FROM registration_drafts_v2
  WHERE id = p_draft_id AND status IN ('PENDING', 'VERIFIED');

  IF v_draft IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Draft not found or already processed');
  END IF;

  -- Check for existing school with same email
  SELECT id INTO v_school_id FROM schools WHERE email = p_school_email LIMIT 1;
  IF v_school_id IS NOT NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Un établissement avec cet email existe déjà');
  END IF;

  -- Generate unique school code
  v_school_code := 'EDUCI-SYS-' || UPPER(LEFT(p_city, 3)) || '-' || LPAD(FLOOR(RANDOM() * 99999)::TEXT, 5, '0');

  -- Create school
  INSERT INTO schools (
    name, email, phone, address, city, region, country,
    type, status, is_active, school_code, code,
    onboarding_completed, subscription_plan
  ) VALUES (
    p_school_name, p_school_email, p_phone, p_address, p_city, p_region, 'CI',
    p_school_type, 'ACTIVE', true, v_school_code, v_school_code,
    false, 'FREE_TRIAL'
  )
  RETURNING id INTO v_school_id;

  -- Update draft with school_id
  UPDATE registration_drafts_v2
  SET school_id = v_school_id, status = 'ACTIVATED'
  WHERE id = p_draft_id;

  -- Create audit log
  INSERT INTO registration_audit_log (draft_id, event_type, event_data)
  VALUES (p_draft_id, 'SCHOOL_ACTIVATED', jsonb_build_object('school_id', v_school_id, 'school_code', v_school_code));

  RETURN jsonb_build_object(
    'success', true,
    'school_id', v_school_id,
    'school_code', v_school_code
  );
END;
$$;

-- 5. Add rate_limits cleanup index
CREATE INDEX IF NOT EXISTS idx_rate_limits_user_created
  ON rate_limits(user_id, created_at);

-- 6. Add otp_rate_limits composite index
CREATE INDEX IF NOT EXISTS idx_otp_rate_limits_email_action
  ON otp_rate_limits(email, action, window_start);

-- 7. Fix wallet_transactions to use proper FK types (add UUID columns alongside TEXT)
-- This is a non-breaking migration — existing TEXT columns are kept for backward compatibility
-- New writes should use the UUID columns
ALTER TABLE wallet_transactions ADD COLUMN IF NOT EXISTS invoice_uuid UUID REFERENCES invoices(id) ON DELETE SET NULL;
ALTER TABLE wallet_transactions ADD COLUMN IF NOT EXISTS payment_transaction_uuid UUID REFERENCES payment_transactions(id) ON DELETE SET NULL;

-- 8. Add missing realtime publications
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'behavior_reports') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE behavior_reports;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'invoices') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE invoices;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'bulletins') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE bulletins;
  END IF;
END $$;

-- 9. Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.enterprise_activate_school(UUID, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO service_role;
