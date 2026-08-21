-- Fix "Database error querying schema" caused by missing search_path
-- on functions referenced by RLS policies and auth triggers.

-- 1. Ensure helper functions exist with correct search_path
-- Use DO block to handle case where table might not be visible yet
DO $$
BEGIN
  -- get_user_school_id
  EXECUTE '
    CREATE OR REPLACE FUNCTION public.get_user_school_id()
    RETURNS UUID AS $fn$
      SELECT school_id FROM users WHERE id = auth.uid();
    $fn$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public';

  -- get_user_role
  EXECUTE '
    CREATE OR REPLACE FUNCTION public.get_user_role()
    RETURNS TEXT AS $fn$
      SELECT role FROM users WHERE id = auth.uid();
    $fn$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public';

  -- is_super_admin
  EXECUTE '
    CREATE OR REPLACE FUNCTION public.is_super_admin()
    RETURNS BOOLEAN AS $fn$
      SELECT get_user_role() = ''SUPER_ADMIN'';
    $fn$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public';
END $$;

-- 2. Fix handle_new_user() - add search_path + exception handler
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, name, email, role, school_id, is_active, status)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    'STUDENT',
    NULL,
    CASE WHEN NEW.email_confirmed_at IS NOT NULL THEN true ELSE false END,
    'ACTIVE'
  )
  ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    email = EXCLUDED.email;
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 3. Fix propagate_email_verification() - add exception handler
CREATE OR REPLACE FUNCTION public.propagate_email_verification()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL AND OLD.email_confirmed_at IS NULL THEN
    UPDATE users
    SET is_active = true,
        email_verified = true,
        email_verified_at = now(),
        status = 'ACTIVE'
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 4. Recreate triggers on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

DROP TRIGGER IF EXISTS on_email_confirmed ON auth.users;
CREATE TRIGGER on_email_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (NEW.email_confirmed_at IS NOT NULL AND OLD.email_confirmed_at IS NULL)
  EXECUTE FUNCTION public.propagate_email_verification();
