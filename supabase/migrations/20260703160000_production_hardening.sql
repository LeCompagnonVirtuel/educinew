-- =====================================================
-- Migration: Production Hardening
-- Date: 2026-07-03
-- Description: Fix storage bucket RLS, scope marketplace/exams/quizzes
--              SELECT to school, add onboarding_drafts DELETE
-- =====================================================

-- =====================================================
-- 1. FIX STORAGE BUCKETS: school-scoped policies
-- =====================================================
-- student-photos, teacher-photos, documents, bulletins, attachments
-- currently use auth.role() = 'authenticated' which is too permissive

-- student-photos
DROP POLICY IF EXISTS "Student photos read" ON storage.objects;
CREATE POLICY "Student photos read" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'student-photos'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Student photos insert" ON storage.objects;
CREATE POLICY "Student photos insert" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'student-photos'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

-- teacher-photos
DROP POLICY IF EXISTS "Teacher photos read" ON storage.objects;
CREATE POLICY "Teacher photos read" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'teacher-photos'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Teacher photos insert" ON storage.objects;
CREATE POLICY "Teacher photos insert" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'teacher-photos'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

-- documents
DROP POLICY IF EXISTS "Documents read" ON storage.objects;
CREATE POLICY "Documents read" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'documents'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Documents insert" ON storage.objects;
CREATE POLICY "Documents insert" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'documents'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

-- bulletins
DROP POLICY IF EXISTS "Bulletins read" ON storage.objects;
CREATE POLICY "Bulletins read" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'bulletins'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Bulletins insert" ON storage.objects;
CREATE POLICY "Bulletins insert" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'bulletins'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

-- attachments
DROP POLICY IF EXISTS "Attachments read" ON storage.objects;
CREATE POLICY "Attachments read" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'attachments'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Attachments insert" ON storage.objects;
CREATE POLICY "Attachments insert" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'attachments'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

-- =====================================================
-- 2. FIX marketplace_listings SELECT: add is_super_admin()
-- =====================================================
-- Migration 0016 scoped via seller_id but missed is_super_admin()
DROP POLICY IF EXISTS "marketplace_listings_select" ON marketplace_listings;
CREATE POLICY "marketplace_listings_select" ON marketplace_listings
  FOR SELECT USING (
    is_super_admin()
    OR EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid()
      AND u.school_id = (
        SELECT u2.school_id FROM users u2 WHERE u2.id = marketplace_listings.seller_id
      )
    )
  );

-- =====================================================
-- 3. FIX exams SELECT: add is_super_admin()
-- =====================================================
-- Migration 0016 scoped via subjects but missed is_super_admin()
DROP POLICY IF EXISTS "exams_select" ON exams;
CREATE POLICY "exams_select" ON exams
  FOR SELECT USING (
    is_super_admin()
    OR EXISTS (
      SELECT 1 FROM subjects s WHERE s.id = exams.subject_id
      AND s.school_id = get_user_school_id()
    )
  );

-- =====================================================
-- 4. FIX quizzes SELECT: add is_super_admin()
-- =====================================================
-- Migration 0016 scoped via subjects but missed is_super_admin()
DROP POLICY IF EXISTS "quizzes_select" ON quizzes;
CREATE POLICY "quizzes_select" ON quizzes
  FOR SELECT USING (
    is_super_admin()
    OR EXISTS (
      SELECT 1 FROM subjects s WHERE s.id = quizzes.subject_id
      AND s.school_id = get_user_school_id()
    )
  );

-- =====================================================
-- 5. FIX exam_categories SELECT: add is_super_admin()
-- =====================================================
-- Migration 0016 scoped via exams/subjects but missed is_super_admin()
DROP POLICY IF EXISTS "exam_categories_select" ON exam_categories;
CREATE POLICY "exam_categories_select" ON exam_categories
  FOR SELECT USING (
    is_super_admin()
    OR EXISTS (
      SELECT 1 FROM exams e
      JOIN subjects s ON s.id = e.subject_id
      WHERE e.category_id = exam_categories.id
      AND s.school_id = get_user_school_id()
    )
  );

-- =====================================================
-- 6. ADD onboarding_drafts DELETE policy
-- =====================================================
-- Migration 20260703120000 created SELECT/INSERT/UPDATE but no DELETE
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'onboarding_drafts_delete' AND tablename = 'onboarding_drafts'
  ) THEN
    CREATE POLICY "onboarding_drafts_delete" ON onboarding_drafts
      FOR DELETE USING (user_id = auth.uid());
  END IF;
END $$;
