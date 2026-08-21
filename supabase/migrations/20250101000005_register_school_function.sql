-- =====================================================
-- EduCI: Secure school registration function
-- Fixes RLS violation on school creation during signup
-- =====================================================

-- Function to generate a unique school code
CREATE OR REPLACE FUNCTION generate_school_code(school_name TEXT, city TEXT)
RETURNS TEXT AS $$
DECLARE
  prefix TEXT;
  suffix TEXT;
  result TEXT;
  attempts INT := 0;
BEGIN
  prefix := UPPER(LEFT(REGEXP_REPLACE(school_name, '[^a-zA-Z]', '', 'g'), 3));
  IF LENGTH(prefix) < 3 THEN
    prefix := prefix || REPEAT('X', 3 - LENGTH(prefix));
  END IF;

  LOOP
    suffix := LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    result := prefix || '-' || suffix;
    EXIT WHEN NOT EXISTS (SELECT 1 FROM schools WHERE code = result);
    attempts := attempts + 1;
    IF attempts > 20 THEN
      result := prefix || '-' || EXTRACT(EPOCH FROM NOW())::BIGINT::TEXT;
      EXIT;
    END IF;
  END LOOP;

  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Atomic function to register a school + link the admin user
-- Called via supabase.rpc('register_school_with_admin', {...})
-- Runs as SECURITY DEFINER to bypass RLS
CREATE OR REPLACE FUNCTION register_school_with_admin(
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
  -- Verify the caller is the admin being registered
  IF auth.uid() IS NULL OR auth.uid() != p_admin_id THEN
    RAISE EXCEPTION 'Unauthorized: caller must match admin_id';
  END IF;

  -- Generate school code
  v_school_code := generate_school_code(p_school_name, p_city);

  -- Insert school
  INSERT INTO schools (name, code, address, phone, email, region, city)
  VALUES (p_school_name, v_school_code, p_address, p_phone, COALESCE(p_school_email, p_admin_email), p_region, p_city)
  RETURNING id INTO v_school_id;

  -- Insert or update admin user record in users table
  INSERT INTO users (id, name, email, role, school_id, is_active)
  VALUES (p_admin_id, p_admin_name, p_admin_email, 'ADMIN', v_school_id, true)
  ON CONFLICT (id) DO UPDATE SET
    school_id = v_school_id,
    role = 'ADMIN',
    is_active = true,
    updated_at = now();

  -- Return school data
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

-- Grant execute to authenticated users (RLS is handled inside the function)
GRANT EXECUTE ON FUNCTION register_school_with_admin TO authenticated;

-- =====================================================
-- Function to resolve login identifier to email
-- Supports: email, phone, matricule
-- =====================================================
CREATE OR REPLACE FUNCTION resolve_login_identifier(p_identifier TEXT)
RETURNS TEXT AS $$
DECLARE
  v_email TEXT;
BEGIN
  -- If it looks like an email, return as-is
  IF p_identifier LIKE '%@%' THEN
    RETURN p_identifier;
  END IF;

  -- Try phone number lookup in users table
  SELECT email INTO v_email FROM users WHERE phone = p_identifier AND status = 'ACTIVE' LIMIT 1;
  IF v_email IS NOT NULL THEN
    RETURN v_email;
  END IF;

  -- Try matricule lookup in students table
  SELECT u.email INTO v_email
  FROM students s
  JOIN users u ON u.id = s.user_id
  WHERE s.matricule = p_identifier
  LIMIT 1;
  IF v_email IS NOT NULL THEN
    RETURN v_email;
  END IF;

  -- Return the identifier as-is (let Supabase auth handle the error)
  RETURN p_identifier;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION resolve_login_identifier TO anon;
GRANT EXECUTE ON FUNCTION resolve_login_identifier TO authenticated;
