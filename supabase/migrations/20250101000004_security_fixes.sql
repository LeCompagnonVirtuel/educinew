-- =====================================================
-- EduCI Security Fixes — CRITICAL PATCH
-- Run AFTER 003_storage_buckets.sql
-- =====================================================

-- =====================================================
-- 1. FIX: Schools INSERT — only via SECURITY DEFINER functions
-- Direct INSERT blocked; new schools created via register_school_with_admin()
-- =====================================================
DROP POLICY IF EXISTS "schools_insert" ON schools;
CREATE POLICY "schools_insert" ON schools
  FOR INSERT WITH CHECK (is_super_admin());

-- =====================================================
-- 2. FIX: Wallets — users should NOT update balance
-- =====================================================
DROP POLICY IF EXISTS "wallets_insert" ON wallets;
DROP POLICY IF EXISTS "wallets_update" ON wallets;

-- Only service role can insert/update wallets (via Edge Functions)
-- Users can only SELECT their own wallet
CREATE POLICY "wallets_insert_service" ON wallets
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "wallets_update_service" ON wallets
  FOR UPDATE USING (auth.role() = 'service_role');

-- =====================================================
-- 3. FIX: Wallet Transactions — users should NOT insert
-- =====================================================
DROP POLICY IF EXISTS "wallet_transactions_insert" ON wallet_transactions;

-- Only service role can insert wallet transactions
CREATE POLICY "wallet_transactions_insert_service" ON wallet_transactions
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- =====================================================
-- 4. FIX: Missing RLS UPDATE policies
-- =====================================================

-- bulletin_entries UPDATE
CREATE POLICY "bulletin_entries_update" ON bulletin_entries
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM bulletins b
      WHERE b.id = bulletin_id
        AND (is_super_admin() OR b.school_id = get_user_school_id())
    )
  );

-- class_subjects UPDATE
CREATE POLICY "class_subjects_update" ON class_subjects
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM classes c
      WHERE c.id = class_id
        AND (is_super_admin() OR c.school_id = get_user_school_id())
    )
  );

-- timetable_slots UPDATE
CREATE POLICY "timetable_slots_update" ON timetable_slots
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM classes c
      WHERE c.id = class_id
        AND (is_super_admin() OR c.school_id = get_user_school_id())
    )
  );

-- announcements UPDATE
CREATE POLICY "announcements_update" ON announcements
  FOR UPDATE USING (
    is_super_admin() OR school_id = get_user_school_id()
  );

-- behavior_reports UPDATE
CREATE POLICY "behavior_reports_update" ON behavior_reports
  FOR UPDATE USING (
    is_super_admin() OR school_id = get_user_school_id()
  );

-- behavior_reports DELETE
CREATE POLICY "behavior_reports_delete" ON behavior_reports
  FOR DELETE USING (
    is_super_admin() OR school_id = get_user_school_id()
  );

-- =====================================================
-- 5. FIX: Add missing indexes for performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_academic_years_school_id ON academic_years(school_id);
CREATE INDEX IF NOT EXISTS idx_academic_years_is_active ON academic_years(is_active);
CREATE INDEX IF NOT EXISTS idx_classes_academic_year_id ON classes(academic_year_id);
CREATE INDEX IF NOT EXISTS idx_tuition_plans_school_id ON tuition_plans(school_id);
CREATE INDEX IF NOT EXISTS idx_invitations_school_id ON invitations(school_id);
CREATE INDEX IF NOT EXISTS idx_teacher_attendance_teacher_id ON teacher_attendance(teacher_id);
CREATE INDEX IF NOT EXISTS idx_teacher_attendance_stats_teacher_id ON teacher_attendance_stats(teacher_id);
CREATE INDEX IF NOT EXISTS idx_teacher_badges_teacher_id ON teacher_badges(teacher_id);
CREATE INDEX IF NOT EXISTS idx_grades_student_id ON grades(student_id);
CREATE INDEX IF NOT EXISTS idx_grades_class_id ON grades(class_id);
CREATE INDEX IF NOT EXISTS idx_grades_subject_id ON grades(subject_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student_id ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);
CREATE INDEX IF NOT EXISTS idx_payments_student_id ON payments(student_id);
CREATE INDEX IF NOT EXISTS idx_payments_school_id ON payments(school_id);
CREATE INDEX IF NOT EXISTS idx_invoices_student_id ON invoices(student_id);
CREATE INDEX IF NOT EXISTS idx_invoices_school_id ON invoices(school_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_timetable_slots_class_id ON timetable_slots(class_id);
CREATE INDEX IF NOT EXISTS idx_timetable_slots_subject_id ON timetable_slots(subject_id);

-- =====================================================
-- 6. FIX: Add missing foreign keys
-- =====================================================
ALTER TABLE payments
  ADD CONSTRAINT fk_payments_subscription
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(id)
  ON DELETE SET NULL;

ALTER TABLE payment_transactions
  ADD CONSTRAINT fk_payment_transactions_gateway
  FOREIGN KEY (gateway_id) REFERENCES payment_gateway_configs(id)
  ON DELETE SET NULL;

-- =====================================================
-- 7. FIX: Storage bucket policies — school-scoped
-- =====================================================

-- Drop existing non-scoped policies
DROP POLICY IF EXISTS "Student photos read" ON storage.objects;
DROP POLICY IF EXISTS "Student photos insert" ON storage.objects;
DROP POLICY IF EXISTS "Student photos update" ON storage.objects;
DROP POLICY IF EXISTS "Student photos delete" ON storage.objects;

DROP POLICY IF EXISTS "Teacher photos read" ON storage.objects;
DROP POLICY IF EXISTS "Teacher photos insert" ON storage.objects;
DROP POLICY IF EXISTS "Teacher photos update" ON storage.objects;
DROP POLICY IF EXISTS "Teacher photos delete" ON storage.objects;

DROP POLICY IF EXISTS "Documents read" ON storage.objects;
DROP POLICY IF EXISTS "Documents insert" ON storage.objects;
DROP POLICY IF EXISTS "Documents update" ON storage.objects;
DROP POLICY IF EXISTS "Documents delete" ON storage.objects;

DROP POLICY IF EXISTS "Bulletins read" ON storage.objects;
DROP POLICY IF EXISTS "Bulletins insert" ON storage.objects;
DROP POLICY IF EXISTS "Bulletins delete" ON storage.objects;

DROP POLICY IF EXISTS "Attachments read" ON storage.objects;
DROP POLICY IF EXISTS "Attachments insert" ON storage.objects;
DROP POLICY IF EXISTS "Attachments delete" ON storage.objects;

-- School-scoped storage policies
-- Files are stored in: {bucket}/{school_id}/{filename}
-- The first folder must match the user's school_id

CREATE POLICY "Student photos read" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'student-photos'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Student photos insert" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'student-photos'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Student photos update" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'student-photos'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Student photos delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'student-photos'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

-- Teacher photos
CREATE POLICY "Teacher photos read" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'teacher-photos'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Teacher photos insert" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'teacher-photos'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Teacher photos update" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'teacher-photos'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Teacher photos delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'teacher-photos'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

-- Documents
CREATE POLICY "Documents read" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'documents'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Documents insert" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'documents'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Documents update" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'documents'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Documents delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'documents'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

-- Bulletins
CREATE POLICY "Bulletins read" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'bulletins'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Bulletins insert" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'bulletins'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Bulletins delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'bulletins'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

-- Attachments
CREATE POLICY "Attachments read" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'attachments'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Attachments insert" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'attachments'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Attachments delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'attachments'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );
