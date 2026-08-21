-- =====================================================
-- Migration: Fix users_insert RLS + secure handle_new_user trigger
-- Issue 1: id = auth.uid() lets any user insert into users (privilege escalation)
-- Issue 2: handle_new_user() reads raw_user_meta_data for role/school_id (user-editable)
-- Fix: Remove self-insert policy, harden trigger to only allow STUDENT role
-- =====================================================

-- Fix 1: users_insert - remove self-insert, only admin/owner can create users
DROP POLICY IF EXISTS "users_insert" ON users;
CREATE POLICY "users_insert" ON users
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- Fix 2: handle_new_user trigger - never trust raw_user_meta_data for role/school_id
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, name, email, role, school_id, is_active, status)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    'STUDENT',
    NULL,
    CASE WHEN NEW.email_confirmed_at IS NOT NULL THEN true ELSE false END,
    'ACTIVE'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin/school creation goes through register_school_with_admin (SECURITY DEFINER)
-- which bypasses RLS and sets role/school_id safely via parameter, not metadata
