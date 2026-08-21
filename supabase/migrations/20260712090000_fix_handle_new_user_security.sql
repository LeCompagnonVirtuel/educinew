-- CRITICAL SECURITY FIX: handle_new_user() was trusting raw_user_meta_data
-- for role and school_id, allowing privilege escalation on signup.
-- A user could set role='ADMIN' in metadata and gain full admin access.
-- Fix: hardcode 'STUDENT' role and NULL school_id on self-registration.
-- Only /api/admin/create-user (service_role) should set role/school_id.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, name, email, role, school_id, phone, is_active)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    'STUDENT',
    NULL,
    NEW.raw_user_meta_data->>'phone',
    true
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE LOG 'handle_new_user failed for %: %', NEW.id, SQLERRM;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Fix search_path on resolve_login_identifier (already SECURITY DEFINER)
CREATE OR REPLACE FUNCTION public.resolve_login_identifier(p_identifier TEXT)
RETURNS TEXT AS $$
DECLARE
  v_email TEXT;
BEGIN
  IF p_identifier LIKE '%@%' THEN RETURN p_identifier; END IF;
  SELECT email INTO v_email FROM users WHERE identifier = UPPER(p_identifier) AND is_active = true;
  IF v_email IS NOT NULL THEN RETURN v_email; END IF;
  SELECT u.email INTO v_email FROM students s JOIN users u ON s.user_id = u.id WHERE s.matricule = UPPER(p_identifier) AND u.is_active = true;
  IF v_email IS NOT NULL THEN RETURN v_email; END IF;
  SELECT email INTO v_email FROM users WHERE phone = p_identifier AND is_active = true;
  IF v_email IS NOT NULL THEN RETURN v_email; END IF;
  SELECT email INTO v_email FROM users WHERE invitation_code = UPPER(p_identifier) AND is_active = true;
  RETURN v_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

GRANT EXECUTE ON FUNCTION public.resolve_login_identifier(text) TO anon;
GRANT EXECUTE ON FUNCTION public.resolve_login_identifier(text) TO authenticated;

-- Restrict payment_gateway_configs SELECT to ADMIN only
DROP POLICY IF EXISTS "school_select_gateway_configs" ON payment_gateway_configs;
CREATE POLICY "admin_select_gateway_configs" ON payment_gateway_configs
  FOR SELECT USING (
    school_id = (SELECT school_id FROM users WHERE id = auth.uid())
    AND (SELECT role FROM users WHERE id = auth.uid()) IN ('ADMIN', 'SUPER_ADMIN', 'COMPTABLE')
  );

-- Revoke dangerous RPCs from authenticated (should be service_role only)
REVOKE EXECUTE ON FUNCTION public.generate_temp_password() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.enterprise_activate_school(uuid, text) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.generate_temp_password() TO service_role;
GRANT EXECUTE ON FUNCTION public.enterprise_activate_school(uuid, text) TO service_role;
