-- Migration: Normalize student matricule to official format
-- Format: 8 digits + 1 uppercase letter (e.g., 16137807D)
-- This migration adds validation constraints and a generation function.

-- 1. Create the matricule validation function
CREATE OR REPLACE FUNCTION validate_matricule(p_matricule TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  -- Format: exactly 8 digits followed by exactly 1 uppercase letter
  -- Example: 16137807D
  IF p_matricule IS NULL THEN
    RETURN FALSE;
  END IF;
  -- Must be exactly 9 characters
  IF LENGTH(p_matricule) != 9 THEN
    RETURN FALSE;
  END IF;
  -- First 8 must be digits, last must be uppercase letter
  IF p_matricule ~ '^\d{8}[A-Z]$' THEN
    RETURN TRUE;
  END IF;
  RETURN FALSE;
END;
$$;

-- 2. Create the matricule generation function
CREATE OR REPLACE FUNCTION generate_matricule()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  v_matricule TEXT;
  v_digits TEXT;
  v_letter TEXT;
  v_exists BOOLEAN;
  v_attempts INT := 0;
BEGIN
  LOOP
    -- Generate 8 random digits
    v_digits := '';
    FOR i IN 1..8 LOOP
      v_digits := v_digits || FLOOR(RANDOM() * 10)::TEXT;
    END LOOP;
    -- Generate random uppercase letter (A-Z)
    v_letter := CHR(65 + FLOOR(RANDOM() * 26)::INT);
    v_matricule := v_digits || v_letter;

    -- Check uniqueness
    SELECT EXISTS(SELECT 1 FROM students WHERE matricule = v_matricule) INTO v_exists;
    IF NOT v_exists THEN
      RETURN v_matricule;
    END IF;

    v_attempts := v_attempts + 1;
    IF v_attempts > 20 THEN
      RAISE EXCEPTION 'Impossible de générer un matricule unique après 20 tentatives';
    END IF;
  END LOOP;
END;
$$;

-- 3. Add CHECK constraint to students table for matricule format
-- First, update any existing invalid matricules by generating new ones
DO $$
DECLARE
  r RECORD;
  v_new_matricule TEXT;
  v_count INT := 0;
BEGIN
  FOR r IN SELECT id, matricule FROM students WHERE matricule IS NOT NULL AND NOT validate_matricule(matricule)
  LOOP
    v_new_matricule := generate_matricule();
    UPDATE students SET matricule = v_new_matricule WHERE id = r.id;
    v_count := v_count + 1;
    RAISE NOTICE 'Migrated matricule % -> % for student %', r.matricule, v_new_matricule, r.id;
  END LOOP;
  IF v_count > 0 THEN
    RAISE NOTICE 'Total matricules migrated: %', v_count;
  END IF;
END $$;

-- 4. Add the CHECK constraint (using NOT VALID to avoid locking)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'chk_students_matricule_format'
      AND conrelid = 'students'::regclass
  ) THEN
    ALTER TABLE students
      ADD CONSTRAINT chk_students_matricule_format
      CHECK (matricule IS NULL OR validate_matricule(matricule))
      NOT VALID;
  END IF;
END $$;

-- 5. Validate the constraint (non-blocking)
ALTER TABLE students VALIDATE CONSTRAINT chk_students_matricule_format;

-- 6. Update the resolve_login_identifier function to handle new format
-- Drop existing function first (return type changed from TEXT to TABLE)
DROP FUNCTION IF EXISTS resolve_login_identifier(TEXT);

CREATE OR REPLACE FUNCTION resolve_login_identifier(p_identifier TEXT)
RETURNS TABLE(email TEXT, user_id UUID, role TEXT, school_id UUID)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_email TEXT;
  v_user_id UUID;
  v_role TEXT;
  v_school_id UUID;
BEGIN
  -- Try direct email match
  SELECT u.email, u.id, u.role, u.school_id
  INTO v_email, v_user_id, v_role, v_school_id
  FROM users u
  WHERE LOWER(u.email) = LOWER(p_identifier) AND u.is_active = true;

  IF v_email IS NOT NULL THEN
    email := v_email;
    user_id := v_user_id;
    role := v_role;
    school_id := v_school_id;
    RETURN NEXT;
    RETURN;
  END IF;

  -- Try matricule match (new format: 8 digits + 1 letter)
  SELECT u.email, u.id, u.role, u.school_id
  INTO v_email, v_user_id, v_role, v_school_id
  FROM students s
  JOIN users u ON s.user_id = u.id
  WHERE s.matricule = UPPER(p_identifier) AND u.is_active = true;

  IF v_email IS NOT NULL THEN
    email := v_email;
    user_id := v_user_id;
    role := v_role;
    school_id := v_school_id;
    RETURN NEXT;
    RETURN;
  END IF;

  -- Try identifier match (enterprise format)
  SELECT u.email, u.id, u.role, u.school_id
  INTO v_email, v_user_id, v_role, v_school_id
  FROM users u
  WHERE u.identifier = UPPER(p_identifier) AND u.is_active = true;

  IF v_email IS NOT NULL THEN
    email := v_email;
    user_id := v_user_id;
    role := v_role;
    school_id := v_school_id;
    RETURN NEXT;
    RETURN;
  END IF;

  -- Try teacher employee_code match
  SELECT u.email, u.id, u.role, u.school_id
  INTO v_email, v_user_id, v_role, v_school_id
  FROM teachers t
  JOIN users u ON t.user_id = u.id
  WHERE t.employee_code = UPPER(p_identifier) AND u.is_active = true;

  IF v_email IS NOT NULL THEN
    email := v_email;
    user_id := v_user_id;
    role := v_role;
    school_id := v_school_id;
    RETURN NEXT;
    RETURN;
  END IF;

  -- No match found
  RETURN;
END;
$$;

-- 7. Add index for faster matricule lookups (already exists but ensure it's there)
CREATE INDEX IF NOT EXISTS idx_students_matricule ON students(matricule);

-- 8. Add comment documenting the official format
COMMENT ON COLUMN students.matricule IS 'Official student identifier. Format: 8 digits + 1 uppercase letter (e.g., 16137807D). Must be unique per school.';
COMMENT ON FUNCTION generate_matricule() IS 'Generates a random unique student matricule in official format: 8 digits + 1 uppercase letter';
COMMENT ON FUNCTION validate_matricule(TEXT) IS 'Validates that a matricule follows the official format: exactly 8 digits followed by 1 uppercase letter (e.g., 16137807D)';
