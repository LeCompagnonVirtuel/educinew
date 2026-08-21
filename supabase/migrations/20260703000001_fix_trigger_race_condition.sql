-- =====================================================
-- MIGRATION: Fix handle_new_user() trigger race condition
-- Priority: P0 - CRITICAL
-- Date: 2026-07-03
-- =====================================================
-- The trigger uses ON CONFLICT (id) DO NOTHING which can race
-- with the RPC register_school_with_admin that sets role/school_id.
-- Change to DO UPDATE SET name/email only, preserving existing
-- role and school_id set by the RPC.

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, name, email, role, school_id, is_active, status)
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
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
