-- =====================================================
-- INCASSABLE: Email confirmation auto-repair at every level
-- This migration ensures email_confirmed_at is NEVER missing
-- when a user has an active school/account.
-- =====================================================

-- =====================================================
-- 1. TRIGGER: When registration_drafts_v2.status → 'active'
--    Auto-confirm email in auth.users
-- =====================================================
CREATE OR REPLACE FUNCTION auto_confirm_email_on_draft_activation()
RETURNS TRIGGER AS $$
DECLARE
  v_auth_user_id UUID;
BEGIN
  -- Only act when status changes to 'active'
  IF NEW.status = 'active' AND (OLD.status IS NULL OR OLD.status != 'active') THEN
    v_auth_user_id := NEW.auth_user_id;

    -- Confirm email in auth.users
    IF v_auth_user_id IS NOT NULL THEN
      UPDATE auth.users
      SET email_confirmed_at = COALESCE(email_confirmed_at, now()),
          raw_user_meta_data = raw_user_meta_data || jsonb_build_object(
            'email_confirmed', true,
            'is_active', true
          )
      WHERE id = v_auth_user_id
        AND email_confirmed_at IS NULL;

      -- Also ensure users table is consistent
      UPDATE public.users
      SET email_verified = true,
          email_verified_at = COALESCE(email_verified_at, now()),
          is_active = true,
          status = 'ACTIVE'
      WHERE id = v_auth_user_id
        AND (email_verified IS NULL OR email_verified = false);
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS trg_auto_confirm_email_on_draft_activation ON registration_drafts_v2;
CREATE TRIGGER trg_auto_confirm_email_on_draft_activation
  AFTER UPDATE OF status ON registration_drafts_v2
  FOR EACH ROW
  EXECUTE FUNCTION auto_confirm_email_on_draft_activation();

-- =====================================================
-- 2. TRIGGER: When users.school_id + users.role are set
--    Auto-confirm email in auth.users (safety net)
-- =====================================================
CREATE OR REPLACE FUNCTION auto_confirm_email_on_user_activation()
RETURNS TRIGGER AS $$
BEGIN
  -- If user has school_id and role (meaning they're a real user), ensure email is confirmed
  IF NEW.school_id IS NOT NULL AND NEW.role IS NOT NULL AND NEW.role != '' THEN
    -- Confirm in auth.users
    UPDATE auth.users
    SET email_confirmed_at = COALESCE(email_confirmed_at, now()),
        raw_user_meta_data = raw_user_meta_data || jsonb_build_object(
          'email_confirmed', true,
          'is_active', true,
          'school_id', NEW.school_id,
          'role', NEW.role
        )
    WHERE id = NEW.id
      AND email_confirmed_at IS NULL;

    -- Ensure the users row itself is consistent
    NEW.email_verified := true;
    NEW.email_verified_at := COALESCE(NEW.email_verified_at, now());
    NEW.is_active := true;
    NEW.status := 'ACTIVE';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS trg_auto_confirm_email_on_user_activation ON users;
CREATE TRIGGER trg_auto_confirm_email_on_user_activation
  BEFORE INSERT OR UPDATE OF school_id, role ON users
  FOR EACH ROW
  WHEN (NEW.school_id IS NOT NULL AND NEW.role IS NOT NULL AND NEW.role != '')
  EXECUTE FUNCTION auto_confirm_email_on_user_activation();

-- =====================================================
-- 3. REPAIR FUNCTION: Fix ALL existing inconsistencies
--    Can be called anytime to repair broken states
-- =====================================================
CREATE OR REPLACE FUNCTION repair_unconfirmed_emails()
RETURNS TABLE(user_id UUID, email VARCHAR(255), was_repaired BOOLEAN) AS $$
BEGIN
  RETURN QUERY
  WITH broken AS (
    SELECT u.id, u.email
    FROM auth.users u
    WHERE u.email_confirmed_at IS NULL
      AND EXISTS (
        SELECT 1 FROM public.users pu
        WHERE pu.id = u.id
          AND pu.school_id IS NOT NULL
          AND pu.role IS NOT NULL
          AND pu.role != ''
      )
  ),
  repaired AS (
    UPDATE auth.users au
    SET email_confirmed_at = now(),
        raw_user_meta_data = raw_user_meta_data || jsonb_build_object('email_confirmed', true, 'is_active', true)
    FROM broken b
    WHERE au.id = b.id
    RETURNING au.id, au.email
  )
  SELECT r.id, r.email, true FROM repaired r;

  -- Also fix public.users
  UPDATE public.users pu
  SET email_verified = true,
      email_verified_at = COALESCE(email_verified_at, now()),
      is_active = true,
      status = 'ACTIVE'
  WHERE pu.school_id IS NOT NULL
    AND pu.role IS NOT NULL
    AND pu.role != ''
    AND (pu.email_verified IS NULL OR pu.email_verified = false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Run the repair now for any existing broken records
SELECT * FROM repair_unconfirmed_emails();

-- =====================================================
-- 4. Ensure triggers have proper grants
-- =====================================================
GRANT EXECUTE ON FUNCTION auto_confirm_email_on_draft_activation() TO service_role;
GRANT EXECUTE ON FUNCTION auto_confirm_email_on_user_activation() TO service_role;
GRANT EXECUTE ON FUNCTION repair_unconfirmed_emails() TO service_role;
