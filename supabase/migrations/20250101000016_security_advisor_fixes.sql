-- =====================================================
-- Migration: Comprehensive Security & Schema fixes (v3)
-- All policies are idempotent (DROP IF EXISTS before CREATE)
-- =====================================================

-- =====================================================
-- 1. FIX BROKEN RLS: exam_categories/exams/quizzes
-- =====================================================
DROP POLICY IF EXISTS "exam_categories_select" ON exam_categories;
CREATE POLICY "exam_categories_select" ON exam_categories
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM exams e
      JOIN subjects s ON s.id = e.subject_id
      WHERE e.category_id = exam_categories.id
      AND s.school_id = get_user_school_id()
    )
  );

DROP POLICY IF EXISTS "exams_select" ON exams;
CREATE POLICY "exams_select" ON exams
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM subjects s WHERE s.id = exams.subject_id
      AND s.school_id = get_user_school_id()
    )
  );

DROP POLICY IF EXISTS "quizzes_select" ON quizzes;
CREATE POLICY "quizzes_select" ON quizzes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM subjects s WHERE s.id = quizzes.subject_id
      AND s.school_id = get_user_school_id()
    )
  );

-- =====================================================
-- 2. SCHOOL BRANDING: scope SELECT to school members
-- =====================================================
DROP POLICY IF EXISTS "school_branding_select" ON school_branding;
CREATE POLICY "school_branding_select" ON school_branding
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.school_id = school_branding.school_id
    )
  );

-- =====================================================
-- 3. MARKETPLACE LISTINGS: scope SELECT to school (via seller)
-- =====================================================
DROP POLICY IF EXISTS "marketplace_listings_select" ON marketplace_listings;
CREATE POLICY "marketplace_listings_select" ON marketplace_listings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid()
      AND u.school_id = (
        SELECT u2.school_id FROM users u2 WHERE u2.id = marketplace_listings.seller_id
      )
    )
  );

-- =====================================================
-- 4. STORAGE: restrict logos to authenticated
-- =====================================================
DROP POLICY IF EXISTS "Logos public read" ON storage.objects;
DROP POLICY IF EXISTS "Logos read" ON storage.objects;
CREATE POLICY "Logos read" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'logos'
    AND auth.role() = 'authenticated'
  );

-- =====================================================
-- 5. STORAGE: restrict QR codes to school members
-- =====================================================
DROP POLICY IF EXISTS "QR codes public read" ON storage.objects;
DROP POLICY IF EXISTS "QR codes read" ON storage.objects;
CREATE POLICY "QR codes read" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'qr-codes'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

-- =====================================================
-- 6. STORAGE: restrict school-logos to school members
-- =====================================================
DROP POLICY IF EXISTS "school_logos_public_read" ON storage.objects;
DROP POLICY IF EXISTS "school_logos_read" ON storage.objects;
CREATE POLICY "school_logos_read" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'school-logos'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

-- =====================================================
-- 7. MISSING TABLES: push_tokens, payment_methods, marketplace_categories
-- =====================================================
CREATE TABLE IF NOT EXISTS push_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  platform TEXT NOT NULL DEFAULT 'web',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE push_tokens ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "push_tokens_self" ON push_tokens;
CREATE POLICY "push_tokens_self" ON push_tokens
  FOR ALL USING (user_id = auth.uid());
CREATE INDEX IF NOT EXISTS idx_push_tokens_user ON push_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_push_tokens_token ON push_tokens(token);

CREATE TABLE IF NOT EXISTS payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(school_id, code)
);
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "payment_methods_school" ON payment_methods;
CREATE POLICY "payment_methods_school" ON payment_methods
  FOR ALL USING (school_id = get_user_school_id() OR is_super_admin());
CREATE INDEX IF NOT EXISTS idx_payment_methods_school ON payment_methods(school_id);

CREATE TABLE IF NOT EXISTS marketplace_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(school_id, slug)
);
ALTER TABLE marketplace_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "marketplace_categories_school" ON marketplace_categories;
CREATE POLICY "marketplace_categories_school" ON marketplace_categories
  FOR ALL USING (
    school_id IS NULL
    OR school_id = get_user_school_id()
    OR is_super_admin()
  );
CREATE INDEX IF NOT EXISTS idx_marketplace_categories_school ON marketplace_categories(school_id);

-- =====================================================
-- 8. ADD MISSING COLUMN: students.parent_id
-- =====================================================
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'students' AND column_name = 'parent_id'
  ) THEN
    ALTER TABLE students ADD COLUMN parent_id UUID REFERENCES users(id) ON DELETE SET NULL;
    CREATE INDEX IF NOT EXISTS idx_students_parent_id ON students(parent_id);
  END IF;
END $$;

-- =====================================================
-- 9. ADD MISSING RLS POLICIES (all idempotent)
-- =====================================================
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'payment_transactions_insert' AND tablename = 'payment_transactions'
  ) THEN
    CREATE POLICY "payment_transactions_insert" ON payment_transactions
      FOR INSERT WITH CHECK (auth.role() = 'service_role');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'teacher_attendance_stats_insert' AND tablename = 'teacher_attendance_stats'
  ) THEN
    CREATE POLICY "teacher_attendance_stats_insert" ON teacher_attendance_stats
      FOR INSERT WITH CHECK (is_super_admin() OR school_id = get_user_school_id());
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'teacher_attendance_stats_update' AND tablename = 'teacher_attendance_stats'
  ) THEN
    CREATE POLICY "teacher_attendance_stats_update" ON teacher_attendance_stats
      FOR UPDATE USING (is_super_admin() OR school_id = get_user_school_id());
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'teacher_badges_update' AND tablename = 'teacher_badges'
  ) THEN
    CREATE POLICY "teacher_badges_update" ON teacher_badges
      FOR UPDATE USING (
        EXISTS (SELECT 1 FROM teachers t WHERE t.id = teacher_badges.teacher_id AND t.school_id = get_user_school_id())
      );
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'documents_update' AND tablename = 'documents'
  ) THEN
    CREATE POLICY "documents_update" ON documents
      FOR UPDATE USING (is_super_admin() OR school_id = get_user_school_id());
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'payment_reminders_update' AND tablename = 'payment_reminders'
  ) THEN
    CREATE POLICY "payment_reminders_update" ON payment_reminders
      FOR UPDATE USING (is_super_admin() OR school_id = get_user_school_id());
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'qr_codes_delete' AND tablename = 'qr_codes'
  ) THEN
    CREATE POLICY "qr_codes_delete" ON qr_codes
      FOR DELETE USING (is_super_admin() OR school_id = get_user_school_id());
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'messages_delete' AND tablename = 'messages'
  ) THEN
    CREATE POLICY "messages_delete" ON messages
      FOR DELETE USING (
        is_super_admin() OR school_id = get_user_school_id() OR sender_id = auth.uid() OR receiver_id = auth.uid()
      );
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'email_logs_delete' AND tablename = 'email_logs'
  ) THEN
    CREATE POLICY "email_logs_delete" ON email_logs
      FOR DELETE USING (is_super_admin());
  END IF;
END $$;

-- =====================================================
-- 10. ADD MISSING INDEXES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_end_date ON subscriptions(end_date);
CREATE INDEX IF NOT EXISTS idx_cycles_school_id ON cycles(school_id);
CREATE INDEX IF NOT EXISTS idx_levels_school_id ON levels(school_id);
CREATE INDEX IF NOT EXISTS idx_levels_cycle_id ON levels(cycle_id);
CREATE INDEX IF NOT EXISTS idx_permissions_role ON permissions(role);
CREATE INDEX IF NOT EXISTS idx_permissions_resource ON permissions(resource);
CREATE INDEX IF NOT EXISTS idx_email_logs_user_id ON email_logs(user_id);

-- =====================================================
-- 11. ADD MISSING FOREIGN KEYS
-- =====================================================
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'email_logs_school_id_fkey'
  ) THEN
    ALTER TABLE email_logs ADD CONSTRAINT email_logs_school_id_fkey
      FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE SET NULL;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'email_logs_user_id_fkey'
  ) THEN
    ALTER TABLE email_logs ADD CONSTRAINT email_logs_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'rate_limits_user_id_fkey'
  ) THEN
    ALTER TABLE rate_limits ADD CONSTRAINT rate_limits_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- =====================================================
-- 12. ADD MISSING updated_at TRIGGERS
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_parents_updated_at ON parents;
CREATE TRIGGER update_parents_updated_at
  BEFORE UPDATE ON parents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_staff_updated_at ON staff;
CREATE TRIGGER update_staff_updated_at
  BEFORE UPDATE ON staff
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_permissions_updated_at ON permissions;
CREATE TRIGGER update_permissions_updated_at
  BEFORE UPDATE ON permissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_push_tokens_updated_at ON push_tokens;
CREATE TRIGGER update_push_tokens_updated_at
  BEFORE UPDATE ON push_tokens
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_payment_methods_updated_at ON payment_methods;
CREATE TRIGGER update_payment_methods_updated_at
  BEFORE UPDATE ON payment_methods
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
