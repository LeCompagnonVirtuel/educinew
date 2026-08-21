-- Security fixes: webhook secrets, RLS hardening, rate limiting

-- =====================================================
-- 1. Revoke anon access to resolve_login_identifier (email enumeration prevention)
-- Mobile uses service_role key for RPC calls, so this doesn't break mobile
-- =====================================================
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'resolve_login_identifier') THEN
    REVOKE EXECUTE ON FUNCTION resolve_login_identifier(text) FROM anon;
    REVOKE EXECUTE ON FUNCTION resolve_login_identifier(text) FROM PUBLIC;
    GRANT EXECUTE ON FUNCTION resolve_login_identifier(text) TO authenticated;
    GRANT EXECUTE ON FUNCTION resolve_login_identifier(text) TO service_role;
  END IF;
END $$;

-- =====================================================
-- 2. Fix RLS: exam_categories, exams, quizzes should be school-scoped
-- =====================================================
DO $$
BEGIN
  -- exam_categories: add school_id if missing
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'exam_categories')
    AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'exam_categories' AND column_name = 'school_id') THEN
    ALTER TABLE exam_categories ADD COLUMN school_id UUID REFERENCES schools(id) ON DELETE CASCADE;
    CREATE INDEX IF NOT EXISTS idx_exam_categories_school_id ON exam_categories(school_id);
  END IF;

  -- exams: add school_id if missing
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'exams')
    AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'exams' AND column_name = 'school_id') THEN
    ALTER TABLE exams ADD COLUMN school_id UUID REFERENCES schools(id) ON DELETE CASCADE;
    CREATE INDEX IF NOT EXISTS idx_exams_school_id ON exams(school_id);
  END IF;

  -- quizzes: add school_id if missing
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'quizzes')
    AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quizzes' AND column_name = 'school_id') THEN
    ALTER TABLE quizzes ADD COLUMN school_id UUID REFERENCES schools(id) ON DELETE CASCADE;
    CREATE INDEX IF NOT EXISTS idx_quizzes_school_id ON quizzes(school_id);
  END IF;
END $$;

-- Backfill school_id from subjects for existing data
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'exams' AND column_name = 'school_id') THEN
    UPDATE exams e SET school_id = s.school_id
    FROM subjects s WHERE e.subject_id = s.id AND e.school_id IS NULL;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quizzes' AND column_name = 'school_id') THEN
    UPDATE quizzes q SET school_id = s.school_id
    FROM subjects s WHERE q.subject_id = s.id AND q.school_id IS NULL;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'exam_categories' AND column_name = 'school_id') THEN
    UPDATE exam_categories ec SET school_id = e.school_id
    FROM exams e WHERE e.category_id = ec.id AND ec.school_id IS NULL
    AND ec.school_id IS NULL;
  END IF;
END $$;

-- Update RLS policies for exam_categories
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'exam_categories') THEN
    DROP POLICY IF EXISTS exam_categories_select ON exam_categories;
    DROP POLICY IF EXISTS exam_categories_insert ON exam_categories;
    DROP POLICY IF EXISTS exam_categories_update ON exam_categories;
    DROP POLICY IF EXISTS exam_categories_delete ON exam_categories;

    CREATE POLICY exam_categories_select ON exam_categories FOR SELECT
      USING (school_id = get_user_school_id() OR school_id IS NULL OR is_super_admin());
    CREATE POLICY exam_categories_insert ON exam_categories FOR INSERT
      WITH CHECK (school_id = get_user_school_id() AND get_user_role() IN ('ADMIN', 'CENSEUR', 'SUPER_ADMIN'));
    CREATE POLICY exam_categories_update ON exam_categories FOR UPDATE
      USING (school_id = get_user_school_id() AND get_user_role() IN ('ADMIN', 'CENSEUR', 'SUPER_ADMIN'));
    CREATE POLICY exam_categories_delete ON exam_categories FOR DELETE
      USING (school_id = get_user_school_id() AND get_user_role() IN ('ADMIN', 'SUPER_ADMIN'));
  END IF;
END $$;

-- Update RLS policies for exams
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'exams') THEN
    DROP POLICY IF EXISTS exams_select ON exams;
    DROP POLICY IF EXISTS exams_insert ON exams;
    DROP POLICY IF EXISTS exams_update ON exams;
    DROP POLICY IF EXISTS exams_delete ON exams;

    CREATE POLICY exams_select ON exams FOR SELECT
      USING (school_id = get_user_school_id() OR is_super_admin());
    CREATE POLICY exams_insert ON exams FOR INSERT
      WITH CHECK (school_id = get_user_school_id() AND get_user_role() IN ('ADMIN', 'CENSEUR', 'SUPER_ADMIN'));
    CREATE POLICY exams_update ON exams FOR UPDATE
      USING (school_id = get_user_school_id() AND get_user_role() IN ('ADMIN', 'CENSEUR', 'SUPER_ADMIN'));
    CREATE POLICY exams_delete ON exams FOR DELETE
      USING (school_id = get_user_school_id() AND get_user_role() IN ('ADMIN', 'SUPER_ADMIN'));
  END IF;
END $$;

-- Update RLS policies for quizzes
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'quizzes') THEN
    DROP POLICY IF EXISTS quizzes_select ON quizzes;
    DROP POLICY IF EXISTS quizzes_insert ON quizzes;
    DROP POLICY IF EXISTS quizzes_update ON quizzes;
    DROP POLICY IF EXISTS quizzes_delete ON quizzes;

    CREATE POLICY quizzes_select ON quizzes FOR SELECT
      USING (school_id = get_user_school_id() OR is_super_admin());
    CREATE POLICY quizzes_insert ON quizzes FOR INSERT
      WITH CHECK (school_id = get_user_school_id() AND get_user_role() IN ('ADMIN', 'TEACHER', 'SUPER_ADMIN'));
    CREATE POLICY quizzes_update ON quizzes FOR UPDATE
      USING (school_id = get_user_school_id() AND get_user_role() IN ('ADMIN', 'TEACHER', 'SUPER_ADMIN'));
    CREATE POLICY quizzes_delete ON quizzes FOR DELETE
      USING (school_id = get_user_school_id() AND get_user_role() IN ('ADMIN', 'SUPER_ADMIN'));
  END IF;
END $$;

-- =====================================================
-- 3. Fix registration_drafts_v2 RLS - restrict to service_role only
-- (Already done in 20260711000000 but ensure it's applied)
-- =====================================================
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'registration_drafts_v2') THEN
    -- Drop any remaining anon policies
    EXECUTE 'DROP POLICY IF EXISTS "Allow anon select registration_drafts_v2" ON registration_drafts_v2';
    EXECUTE 'DROP POLICY IF EXISTS "Allow anon update registration_drafts_v2" ON registration_drafts_v2';
    EXECUTE 'DROP POLICY IF EXISTS "Allow anon insert registration_drafts_v2" ON registration_drafts_v2';
    EXECUTE 'DROP POLICY IF EXISTS "registration_drafts_v2_anon_select" ON registration_drafts_v2';
    EXECUTE 'DROP POLICY IF EXISTS "registration_drafts_v2_anon_insert" ON registration_drafts_v2';
    EXECUTE 'DROP POLICY IF EXISTS "registration_drafts_v2_anon_update" ON registration_drafts_v2';
  END IF;
END $$;
