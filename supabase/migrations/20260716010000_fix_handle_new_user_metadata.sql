-- Fix handle_new_user trigger to use raw_user_meta_data for role/school_id
-- when available (enterprise account creation passes these via admin.createUser)

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, name, email, role, school_id, phone, is_active)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'STUDENT'),
    (NEW.raw_user_meta_data->>'school_id')::UUID,
    NEW.raw_user_meta_data->>'phone',
    NEW.email_confirmed_at IS NOT NULL
  )
  ON CONFLICT (id) DO UPDATE SET
    name = COALESCE(EXCLUDED.name, public.users.name),
    role = COALESCE(EXCLUDED.role, public.users.role),
    school_id = COALESCE(EXCLUDED.school_id, public.users.school_id),
    phone = COALESCE(EXCLUDED.phone, public.users.phone),
    is_active = EXCLUDED.is_active;
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE LOG 'handle_new_user failed for %: %', NEW.id, SQLERRM;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
