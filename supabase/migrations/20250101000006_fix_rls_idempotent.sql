-- =====================================================
-- EduCI: Make RLS policies idempotent + fix schools_insert
-- Run this if you get "policy already exists" errors
-- =====================================================

-- Fix: Drop and recreate schools policies to ensure clean state
DROP POLICY IF EXISTS "schools_select" ON schools;
DROP POLICY IF EXISTS "schools_insert" ON schools;
DROP POLICY IF EXISTS "schools_update" ON schools;
DROP POLICY IF EXISTS "schools_delete" ON schools;

CREATE POLICY "schools_select" ON schools
  FOR SELECT USING (
    is_super_admin() OR id = get_user_school_id()
  );

-- Schools INSERT: only via SECURITY DEFINER functions (register_school_with_admin)
-- or SUPER_ADMIN direct access
CREATE POLICY "schools_insert" ON schools
  FOR INSERT WITH CHECK (is_super_admin());

CREATE POLICY "schools_update" ON schools
  FOR UPDATE USING (
    is_super_admin() OR id = get_user_school_id()
  );

CREATE POLICY "schools_delete" ON schools
  FOR DELETE USING (is_super_admin());

-- Fix: Drop and recreate users_insert to allow self-registration via RPC
DROP POLICY IF EXISTS "users_insert" ON users;
CREATE POLICY "users_insert" ON users
  FOR INSERT WITH CHECK (
    id = auth.uid()
    OR is_super_admin()
    OR school_id = get_user_school_id()
  );

-- Ensure register_school_with_admin function exists and is SECURITY DEFINER
-- (This bypasses all RLS since it runs as the function owner)
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

  -- Insert school (bypasses RLS because SECURITY DEFINER)
  INSERT INTO schools (name, code, address, phone, email, region, city)
  VALUES (p_school_name, v_school_code, p_address, p_phone, COALESCE(p_school_email, p_admin_email), p_region, p_city)
  RETURNING id INTO v_school_id;

  -- Insert or update admin user record
  INSERT INTO users (id, name, email, role, school_id, is_active, status)
  VALUES (p_admin_id, p_admin_name, p_admin_email, 'ADMIN', v_school_id, true, 'ACTIVE')
  ON CONFLICT (id) DO UPDATE SET
    school_id = v_school_id,
    role = 'ADMIN',
    is_active = true,
    status = 'ACTIVE',
    updated_at = now();

  -- Create a default academic year for the new school
  INSERT INTO academic_years (school_id, name, start_date, end_date, is_active)
  VALUES (v_school_id, '2026-2027', '2026-09-01', '2027-07-31', true)
  ON CONFLICT DO NOTHING;

  -- Create a free trial subscription
  INSERT INTO subscriptions (school_id, plan, status, start_date, end_date, monthly_amount)
  VALUES (v_school_id, 'FREE_TRIAL', 'ACTIVE', now(), now() + interval '30 days', 0)
  ON CONFLICT DO NOTHING;

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

-- Ensure proper grants
GRANT EXECUTE ON FUNCTION register_school_with_admin TO authenticated;

-- Ensure generate_school_code exists
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

-- Ensure resolve_login_identifier exists
CREATE OR REPLACE FUNCTION resolve_login_identifier(p_identifier TEXT)
RETURNS TEXT AS $$
DECLARE
  v_email TEXT;
BEGIN
  IF p_identifier LIKE '%@%' THEN
    RETURN p_identifier;
  END IF;

  SELECT email INTO v_email FROM users WHERE phone = p_identifier AND status = 'ACTIVE' LIMIT 1;
  IF v_email IS NOT NULL THEN
    RETURN v_email;
  END IF;

  SELECT u.email INTO v_email
  FROM students s
  JOIN users u ON u.id = s.user_id
  WHERE s.matricule = p_identifier
  LIMIT 1;
  IF v_email IS NOT NULL THEN
    RETURN v_email;
  END IF;

  RETURN p_identifier;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION resolve_login_identifier TO anon;
GRANT EXECUTE ON FUNCTION resolve_login_identifier TO authenticated;
