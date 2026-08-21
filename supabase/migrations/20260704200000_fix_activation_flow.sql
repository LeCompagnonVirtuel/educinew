-- =====================================================
-- EduCI: Fix activation flow
-- 1. Add register_school_via_activation for service role calls
-- 2. Add validate_confirmation_token_readonly (non-consuming)
-- =====================================================

-- New function that bypasses auth.uid() check for service role activation
CREATE OR REPLACE FUNCTION register_school_via_activation(
  p_admin_id UUID,
  p_admin_name TEXT,
  p_admin_email TEXT,
  p_school_name TEXT,
  p_address TEXT DEFAULT NULL,
  p_phone TEXT DEFAULT NULL,
  p_school_email TEXT DEFAULT NULL,
  p_region TEXT DEFAULT 'ABJ',
  p_city TEXT DEFAULT 'Abidjan',
  p_school_type TEXT DEFAULT 'SECONDARY'
)
RETURNS JSONB AS $$
DECLARE
  v_school_id UUID;
  v_school_code TEXT;
  v_school JSONB;
BEGIN
  -- No auth.uid() check - this is called via service role during activation

  -- Generate school code
  v_school_code := generate_school_code(p_school_name, p_city);

  -- Insert school
  INSERT INTO schools (name, code, address, phone, email, region, city)
  VALUES (p_school_name, v_school_code, p_address, p_phone, COALESCE(p_school_email, p_admin_email), p_region, p_city)
  RETURNING id INTO v_school_id;

  -- Insert or update admin user record in users table
  INSERT INTO users (id, name, email, role, school_id, is_active, status)
  VALUES (p_admin_id, p_admin_name, p_admin_email, 'ADMIN', v_school_id, true, 'ACTIVE')
  ON CONFLICT (id) DO UPDATE SET
    school_id = v_school_id,
    role = 'ADMIN',
    is_active = true,
    status = 'ACTIVE',
    updated_at = now();

  -- Create default academic year
  INSERT INTO academic_years (school_id, name, start_date, end_date, is_active)
  VALUES (v_school_id, to_char(now(), 'YYYY') || '-' || to_char(now() + interval '1 year', 'YYYY'), now(), now() + interval '10 months', true)
  ON CONFLICT DO NOTHING;

  -- Create free trial subscription
  INSERT INTO subscriptions (school_id, plan, status, start_date, end_date, monthly_amount)
  VALUES (v_school_id, 'FREE_TRIAL', 'ACTIVE', now(), now() + interval '30 days', 0)
  ON CONFLICT DO NOTHING;

  -- Return school data as JSONB
  SELECT jsonb_build_object(
    'id', s.id,
    'code', s.code,
    'name', s.name,
    'address', s.address,
    'phone', s.phone,
    'email', s.email,
    'region', s.region,
    'city', s.city,
    'created_at', s.created_at
  ) INTO v_school FROM schools s WHERE s.id = v_school_id;

  RETURN v_school;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Read-only token validation (does NOT mark token as used)
CREATE OR REPLACE FUNCTION validate_confirmation_token_readonly(p_token text)
RETURNS TABLE (
  valid boolean,
  user_id uuid,
  email text,
  already_used boolean,
  expired boolean
) AS $$
DECLARE
  v_token_record RECORD;
BEGIN
  SELECT t.user_id, t.email, t.used_at, t.expires_at
  INTO v_token_record
  FROM email_confirmation_tokens t
  WHERE t.token = p_token;

  IF NOT FOUND THEN
    RETURN QUERY SELECT false, NULL::uuid, NULL::text, false, false;
    RETURN;
  END IF;

  IF v_token_record.used_at IS NOT NULL THEN
    RETURN QUERY SELECT false, v_token_record.user_id, v_token_record.email, true, false;
    RETURN;
  END IF;

  IF v_token_record.expires_at < now() THEN
    RETURN QUERY SELECT false, v_token_record.user_id, v_token_record.email, false, true;
    RETURN;
  END IF;

  -- Token is valid but NOT consumed here
  RETURN QUERY SELECT true, v_token_record.user_id, v_token_record.email, false, false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION register_school_via_activation TO service_role;
GRANT EXECUTE ON FUNCTION validate_confirmation_token_readonly TO service_role;
GRANT EXECUTE ON FUNCTION validate_confirmation_token_readonly TO anon;
GRANT EXECUTE ON FUNCTION validate_confirmation_token_readonly TO authenticated;
