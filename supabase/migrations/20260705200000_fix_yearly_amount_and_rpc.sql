-- Fix: yearly_amount NOT NULL constraint missing DEFAULT
ALTER TABLE subscriptions ALTER COLUMN yearly_amount SET DEFAULT 0;
UPDATE subscriptions SET yearly_amount = 0 WHERE yearly_amount IS NULL;

-- Update RPC to include yearly_amount explicitly
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
  v_school_code := generate_school_code(p_school_name, p_city);

  INSERT INTO schools (name, code, address, phone, email, region, city)
  VALUES (p_school_name, v_school_code, p_address, p_phone, COALESCE(p_school_email, p_admin_email), p_region, p_city)
  RETURNING id INTO v_school_id;

  INSERT INTO users (id, name, email, role, school_id, is_active, status)
  VALUES (p_admin_id, p_admin_name, p_admin_email, 'ADMIN', v_school_id, true, 'ACTIVE')
  ON CONFLICT (id) DO UPDATE SET
    school_id = v_school_id,
    role = 'ADMIN',
    is_active = true,
    status = 'ACTIVE',
    updated_at = now();

  INSERT INTO academic_years (school_id, name, start_date, end_date, is_active)
  VALUES (
    v_school_id,
    to_char(now(), 'YYYY') || '-' || to_char(now() + interval '1 year', 'YYYY'),
    now(),
    now() + interval '10 months',
    true
  )
  ON CONFLICT DO NOTHING;

  INSERT INTO subscriptions (school_id, plan, status, start_date, end_date, monthly_amount, yearly_amount)
  VALUES (v_school_id, 'FREE_TRIAL', 'ACTIVE', now(), now() + interval '30 days', 0, 0)
  ON CONFLICT DO NOTHING;

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

GRANT EXECUTE ON FUNCTION register_school_via_activation TO service_role;
