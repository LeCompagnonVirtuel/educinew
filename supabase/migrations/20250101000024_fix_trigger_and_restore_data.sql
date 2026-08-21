-- =====================================================
-- Migration: Fix handle_new_user trigger + restore data
-- =====================================================

-- 1. Fix handle_new_user: don't overwrite existing rows
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create profile for NEW users (not existing ones)
  INSERT INTO public.users (id, name, email, role, school_id, is_active, status)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'STUDENT'),
    (NEW.raw_user_meta_data->>'school_id')::uuid,
    CASE WHEN NEW.email_confirmed_at IS NOT NULL THEN true ELSE false END,
    'ACTIVE'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Restore correct role/school_id for users that were overwritten
-- Admin
UPDATE users SET role = 'ADMIN', school_id = 'a0000000-0000-0000-0000-000000000001'
WHERE id = 'f0000000-0000-0000-0000-000000000001';

-- Teachers
UPDATE users SET role = 'TEACHER', school_id = 'a0000000-0000-0000-0000-000000000001'
WHERE id IN ('f0000000-0000-0000-0000-000000000010', 'f0000000-0000-0000-0000-000000000011', 'f0000000-0000-0000-0000-000000000012');

-- Students
UPDATE users SET role = 'STUDENT', school_id = 'a0000000-0000-0000-0000-000000000001'
WHERE id IN ('f0000000-0000-0000-0000-000000000020', 'f0000000-0000-0000-0000-000000000021',
             'f0000000-0000-0000-0000-000000000022', 'f0000000-0000-0000-0000-000000000023',
             'f0000000-0000-0000-0000-000000000024');

-- Parent
UPDATE users SET role = 'PARENT', school_id = 'a0000000-0000-0000-0000-000000000001'
WHERE id = 'f0000000-0000-0000-0000-000000000030';
