-- =====================================================
-- Migration: Fix teachers.matricule + reseed auth users
-- =====================================================

-- 1. Add matricule column to teachers
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS matricule TEXT;
CREATE INDEX IF NOT EXISTS idx_teachers_matricule ON teachers(matricule);

-- 2. Recreate resolve_login_identifier with teacher search
CREATE OR REPLACE FUNCTION resolve_login_identifier(p_identifier TEXT)
RETURNS TEXT AS $$
DECLARE
  v_email TEXT;
BEGIN
  IF p_identifier LIKE '%@%' THEN
    RETURN p_identifier;
  END IF;

  -- Search by phone
  SELECT email INTO v_email FROM users WHERE phone = p_identifier AND status = 'ACTIVE' LIMIT 1;
  IF v_email IS NOT NULL THEN RETURN v_email; END IF;

  -- Search by student matricule
  SELECT u.email INTO v_email
  FROM students s JOIN users u ON u.id = s.user_id
  WHERE s.matricule = p_identifier AND u.is_active = true LIMIT 1;
  IF v_email IS NOT NULL THEN RETURN v_email; END IF;

  -- Search by teacher matricule
  SELECT u.email INTO v_email
  FROM teachers t JOIN users u ON u.id = t.user_id
  WHERE t.matricule = p_identifier AND u.is_active = true LIMIT 1;
  IF v_email IS NOT NULL THEN RETURN v_email; END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Create auth users for demo (bcrypt hash of 'Demo1234!')
-- Using Supabase's auth.users with proper bcrypt hashes
-- Hash generated via: node -e "const bcrypt = require('bcrypt'); console.log(bcrypt.hashSync('Demo1234!', 10))"

INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  recovery_token, recovery_sent_at, last_sign_in_at, raw_app_meta_data,
  raw_user_meta_data, created_at, updated_at, confirmation_token, confirmation_sent_at
)
VALUES
  ('00000000-0000-0000-0000-000000000000', 'f0000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated',
   'admin@lma.educi.ci', '$2b$10$EHX5Q08BEFxgK9.LS/wOUugeXr40p3/WBGl9phbFrjOfQ1.naIypm', now(), '', now(), now(),
   '{"provider": "email", "providers": ["email"]}',
   '{"name": "Administrateur LMA", "role": "ADMIN", "school_id": "a0000000-0000-0000-0000-000000000001"}',
   now(), now(), '', now())
ON CONFLICT (id) DO UPDATE SET
  encrypted_password = EXCLUDED.encrypted_password,
  raw_user_meta_data = EXCLUDED.raw_user_meta_data,
  email_confirmed_at = COALESCE(auth.users.email_confirmed_at, now()),
  updated_at = now();

-- Create teacher auth users
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  recovery_token, recovery_sent_at, last_sign_in_at, raw_app_meta_data,
  raw_user_meta_data, created_at, updated_at, confirmation_token, confirmation_sent_at
)
VALUES
  ('00000000-0000-0000-0000-000000000000', 'f0000000-0000-0000-0000-000000000010', 'authenticated', 'authenticated',
   'jean.kouassi@lma.educi.ci', '$2b$10$EHX5Q08BEFxgK9.LS/wOUugeXr40p3/WBGl9phbFrjOfQ1.naIypm', now(), '', now(), now(),
   '{"provider": "email", "providers": ["email"]}',
   '{"name": "Jean Kouassi", "role": "TEACHER", "school_id": "a0000000-0000-0000-0000-000000000001"}',
   now(), now(), '', now())
ON CONFLICT (id) DO UPDATE SET
  encrypted_password = EXCLUDED.encrypted_password,
  raw_user_meta_data = EXCLUDED.raw_user_meta_data,
  email_confirmed_at = COALESCE(auth.users.email_confirmed_at, now()),
  updated_at = now();

-- Create student auth users
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  recovery_token, recovery_sent_at, last_sign_in_at, raw_app_meta_data,
  raw_user_meta_data, created_at, updated_at, confirmation_token, confirmation_sent_at
)
VALUES
  ('00000000-0000-0000-0000-000000000000', 'f0000000-0000-0000-0000-000000000020', 'authenticated', 'authenticated',
   'konan.traore@lma.educi.ci', '$2b$10$EHX5Q08BEFxgK9.LS/wOUugeXr40p3/WBGl9phbFrjOfQ1.naIypm', now(), '', now(), now(),
   '{"provider": "email", "providers": ["email"]}',
   '{"name": "Konan Traore", "role": "STUDENT", "school_id": "a0000000-0000-0000-0000-000000000001"}',
   now(), now(), '', now())
ON CONFLICT (id) DO UPDATE SET
  encrypted_password = EXCLUDED.encrypted_password,
  raw_user_meta_data = EXCLUDED.raw_user_meta_data,
  email_confirmed_at = COALESCE(auth.users.email_confirmed_at, now()),
  updated_at = now();

INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  recovery_token, recovery_sent_at, last_sign_in_at, raw_app_meta_data,
  raw_user_meta_data, created_at, updated_at, confirmation_token, confirmation_sent_at
)
VALUES
  ('00000000-0000-0000-0000-000000000000', 'f0000000-0000-0000-0000-000000000021', 'authenticated', 'authenticated',
   'fatou.ouattara@lma.educi.ci', '$2b$10$EHX5Q08BEFxgK9.LS/wOUugeXr40p3/WBGl9phbFrjOfQ1.naIypm', now(), '', now(), now(),
   '{"provider": "email", "providers": ["email"]}',
   '{"name": "Fatou Ouattara", "role": "STUDENT", "school_id": "a0000000-0000-0000-0000-000000000001"}',
   now(), now(), '', now())
ON CONFLICT (id) DO UPDATE SET
  encrypted_password = EXCLUDED.encrypted_password,
  raw_user_meta_data = EXCLUDED.raw_user_meta_data,
  email_confirmed_at = COALESCE(auth.users.email_confirmed_at, now()),
  updated_at = now();
