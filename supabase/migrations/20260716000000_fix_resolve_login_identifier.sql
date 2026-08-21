-- Fix resolve_login_identifier:
-- 1. Invitation code lookup now checks users.invitation_code (enterprise accounts)
-- 2. Restore phone number lookup (removed in previous migration)
-- 3. Keep invitations.token as fallback for link-based invitations

DROP FUNCTION IF EXISTS public.resolve_login_identifier(TEXT);

CREATE OR REPLACE FUNCTION public.resolve_login_identifier(p_identifier TEXT)
RETURNS TABLE(email TEXT, user_id UUID, role TEXT, school_id UUID)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_email TEXT;
  v_user_id UUID;
  v_role TEXT;
  v_school_id UUID;
BEGIN
  -- 1. Try direct email match
  SELECT u.email, u.id, u.role, u.school_id
  INTO v_email, v_user_id, v_role, v_school_id
  FROM users u
  WHERE u.email = p_identifier AND u.is_active = true
  LIMIT 1;

  IF v_email IS NOT NULL THEN
    RETURN QUERY SELECT v_email, v_user_id, v_role, v_school_id;
    RETURN;
  END IF;

  -- 2. Try identifier (ELV-XXXX-XXXXXX format)
  SELECT u.email, u.id, u.role, u.school_id
  INTO v_email, v_user_id, v_role, v_school_id
  FROM users u
  WHERE u.identifier = p_identifier AND u.is_active = true
  LIMIT 1;

  IF v_email IS NOT NULL THEN
    RETURN QUERY SELECT v_email, v_user_id, v_role, v_school_id;
    RETURN;
  END IF;

  -- 3. Try matricule (student)
  SELECT u.email, u.id, u.role, u.school_id
  INTO v_email, v_user_id, v_role, v_school_id
  FROM students s
  JOIN users u ON u.id = s.user_id
  WHERE s.matricule = p_identifier AND u.is_active = true
  LIMIT 1;

  IF v_email IS NOT NULL THEN
    RETURN QUERY SELECT v_email, v_user_id, v_role, v_school_id;
    RETURN;
  END IF;

  -- 4. Try invitation code from users table (enterprise-created accounts)
  SELECT u.email, u.id, u.role, u.school_id
  INTO v_email, v_user_id, v_role, v_school_id
  FROM users u
  WHERE u.invitation_code = p_identifier AND u.is_active = true
  LIMIT 1;

  IF v_email IS NOT NULL THEN
    RETURN QUERY SELECT v_email, v_user_id, v_role, v_school_id;
    RETURN;
  END IF;

  -- 5. Try invitation token from invitations table (link-based invitations)
  SELECT u.email, u.id, u.role, u.school_id
  INTO v_email, v_user_id, v_role, v_school_id
  FROM invitations i
  JOIN users u ON u.id = i.used_by
  WHERE i.token = p_identifier AND i.used_at IS NOT NULL AND u.is_active = true
  LIMIT 1;

  IF v_email IS NOT NULL THEN
    RETURN QUERY SELECT v_email, v_user_id, v_role, v_school_id;
    RETURN;
  END IF;

  -- 6. Try phone number
  SELECT u.email, u.id, u.role, u.school_id
  INTO v_email, v_user_id, v_role, v_school_id
  FROM users u
  WHERE u.phone = p_identifier AND u.is_active = true
  LIMIT 1;

  IF v_email IS NOT NULL THEN
    RETURN QUERY SELECT v_email, v_user_id, v_role, v_school_id;
    RETURN;
  END IF;

  -- Not found
  RETURN;
END;
$$;

-- Grant access to anon (login page) and authenticated
GRANT EXECUTE ON FUNCTION public.resolve_login_identifier(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.resolve_login_identifier(TEXT) TO authenticated;
