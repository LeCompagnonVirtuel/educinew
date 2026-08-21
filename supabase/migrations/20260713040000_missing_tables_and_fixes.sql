-- =============================================================
-- MISSING TABLES — Referenced in code but not in migrations
-- Date: 2026-07-13
-- =============================================================

-- 1. ASSIGNMENTS — Teacher creates assignments for classes
CREATE TABLE IF NOT EXISTS assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ,
  max_score NUMERIC DEFAULT 20,
  status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'CLOSED', 'DRAFT')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_assignments_school ON assignments(school_id);
CREATE INDEX IF NOT EXISTS idx_assignments_teacher ON assignments(teacher_id);
CREATE INDEX IF NOT EXISTS idx_assignments_class ON assignments(class_id);
CREATE INDEX IF NOT EXISTS idx_assignments_due ON assignments(due_date);

ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY assignments_select ON assignments
  FOR SELECT USING (school_id = get_user_school_id() OR is_super_admin());

CREATE POLICY assignments_insert ON assignments
  FOR INSERT WITH CHECK (school_id = get_user_school_id() OR is_super_admin());

CREATE POLICY assignments_update ON assignments
  FOR UPDATE USING (school_id = get_user_school_id() OR is_super_admin());

CREATE POLICY assignments_delete ON assignments
  FOR DELETE USING (school_id = get_user_school_id() OR is_super_admin());

-- 2. ASSIGNMENT_SUBMISSIONS — Students submit assignments
CREATE TABLE IF NOT EXISTS assignment_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  content TEXT,
  file_url TEXT,
  score NUMERIC,
  feedback TEXT,
  status TEXT DEFAULT 'SUBMITTED' CHECK (status IN ('SUBMITTED', 'GRADED', 'RETURNED', 'LATE')),
  submitted_at TIMESTAMPTZ DEFAULT now(),
  graded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_submissions_assignment ON assignment_submissions(assignment_id);
CREATE INDEX IF NOT EXISTS idx_submissions_student ON assignment_submissions(student_id);

ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY submissions_select ON assignment_submissions
  FOR SELECT USING (school_id = get_user_school_id() OR is_super_admin());

CREATE POLICY submissions_insert ON assignment_submissions
  FOR INSERT WITH CHECK (school_id = get_user_school_id() OR is_super_admin());

CREATE POLICY submissions_update ON assignment_submissions
  FOR UPDATE USING (school_id = get_user_school_id() OR is_super_admin());

-- 3. STUDENT_DOCUMENTS — Documents attached to students
CREATE TABLE IF NOT EXISTS student_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  document_type TEXT DEFAULT 'OTHER' CHECK (document_type IN (
    'REPORT_CARD', 'CERTIFICATE', 'MEDICAL', 'ID_CARD', 'PHOTO',
    'BIRTH_CERTIFICATE', 'TRANSFERT_CERTIFICATE', 'OTHER'
  )),
  file_url TEXT,
  file_path TEXT,
  file_size INTEGER,
  mime_type TEXT,
  status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'ARCHIVED', 'DELETED')),
  uploaded_by UUID REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_student_docs_student ON student_documents(student_id);
CREATE INDEX IF NOT EXISTS idx_student_docs_school ON student_documents(school_id);

ALTER TABLE student_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY student_docs_select ON student_documents
  FOR SELECT USING (school_id = get_user_school_id() OR is_super_admin());

CREATE POLICY student_docs_insert ON student_documents
  FOR INSERT WITH CHECK (school_id = get_user_school_id() OR is_super_admin());

CREATE POLICY student_docs_update ON student_documents
  FOR UPDATE USING (school_id = get_user_school_id() OR is_super_admin());

CREATE POLICY student_docs_delete ON student_documents
  FOR DELETE USING (school_id = get_user_school_id() OR is_super_admin());

-- 4. LOGIN_HISTORY — Track login attempts for security
CREATE TABLE IF NOT EXISTS login_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  email TEXT,
  ip_address TEXT,
  user_agent TEXT,
  status TEXT DEFAULT 'SUCCESS' CHECK (status IN ('SUCCESS', 'FAILED', 'BLOCKED')),
  failure_reason TEXT,
  device_info TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_login_history_user ON login_history(user_id);
CREATE INDEX IF NOT EXISTS idx_login_history_email ON login_history(email);
CREATE INDEX IF NOT EXISTS idx_login_history_created ON login_history(created_at DESC);

ALTER TABLE login_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY login_history_select ON login_history
  FOR SELECT USING (is_super_admin());

CREATE POLICY login_history_insert ON login_history
  FOR INSERT WITH CHECK (true);

-- 5. PLATFORM_CONFIG — Super admin platform configuration
CREATE TABLE IF NOT EXISTS platform_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  description TEXT,
  category TEXT DEFAULT 'general',
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE platform_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY platform_config_select ON platform_config
  FOR SELECT USING (is_super_admin());

CREATE POLICY platform_config_update ON platform_config
  FOR UPDATE USING (is_super_admin());

-- 6. PLATFORM_MODULES — Module management
CREATE TABLE IF NOT EXISTS platform_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  display_name TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  is_maintenance BOOLEAN DEFAULT false,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE platform_modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY platform_modules_select ON platform_modules
  FOR SELECT USING (is_super_admin() OR is_active = true);

CREATE POLICY platform_modules_update ON platform_modules
  FOR UPDATE USING (is_super_admin());

-- 7. SECURITY_ALERTS — Security monitoring
CREATE TABLE IF NOT EXISTS security_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_type TEXT NOT NULL,
  severity TEXT DEFAULT 'MEDIUM' CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
  title TEXT NOT NULL,
  description TEXT,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  school_id UUID REFERENCES schools(id) ON DELETE SET NULL,
  ip_address TEXT,
  status TEXT DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'INVESTIGATING', 'RESOLVED', 'DISMISSED')),
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES users(id),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_security_alerts_status ON security_alerts(status);
CREATE INDEX IF NOT EXISTS idx_security_alerts_severity ON security_alerts(severity);
CREATE INDEX IF NOT EXISTS idx_security_alerts_created ON security_alerts(created_at DESC);

ALTER TABLE security_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY security_alerts_select ON security_alerts
  FOR SELECT USING (is_super_admin());

CREATE POLICY security_alerts_insert ON security_alerts
  FOR INSERT WITH CHECK (true);

CREATE POLICY security_alerts_update ON security_alerts
  FOR UPDATE USING (is_super_admin());

-- 8. SUBSCRIPTION_PLANS — Available subscription plans
CREATE TABLE IF NOT EXISTS subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  display_name TEXT,
  description TEXT,
  price_monthly NUMERIC DEFAULT 0,
  price_yearly NUMERIC DEFAULT 0,
  currency TEXT DEFAULT 'XOF',
  max_students INTEGER,
  max_teachers INTEGER,
  max_staff INTEGER,
  features JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  is_default BOOLEAN DEFAULT false,
  trial_days INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY subscription_plans_select ON subscription_plans
  FOR SELECT USING (is_super_admin() OR is_active = true);

CREATE POLICY subscription_plans_insert ON subscription_plans
  FOR INSERT WITH CHECK (is_super_admin());

CREATE POLICY subscription_plans_update ON subscription_plans
  FOR UPDATE USING (is_super_admin());

CREATE POLICY subscription_plans_delete ON subscription_plans
  FOR DELETE USING (is_super_admin());

-- 9. TECHNICAL_LOGS — System logs for super admin
CREATE TABLE IF NOT EXISTS technical_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service TEXT NOT NULL,
  level TEXT DEFAULT 'INFO' CHECK (level IN ('DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL')),
  message TEXT NOT NULL,
  details JSONB,
  stack_trace TEXT,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  school_id UUID REFERENCES schools(id) ON DELETE SET NULL,
  request_id TEXT,
  ip_address TEXT,
  duration_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tech_logs_service ON technical_logs(service);
CREATE INDEX IF NOT EXISTS idx_tech_logs_level ON technical_logs(level);
CREATE INDEX IF NOT EXISTS idx_tech_logs_created ON technical_logs(created_at DESC);

ALTER TABLE technical_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY tech_logs_select ON technical_logs
  FOR SELECT USING (is_super_admin());

CREATE POLICY tech_logs_insert ON technical_logs
  FOR INSERT WITH CHECK (true);

-- 10. EXAM_PROGRESS — Student exam/quiz progress
CREATE TABLE IF NOT EXISTS exam_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'IN_PROGRESS' CHECK (status IN ('IN_PROGRESS', 'COMPLETED', 'ABANDONED')),
  score NUMERIC,
  max_score NUMERIC,
  answers JSONB DEFAULT '{}',
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_exam_progress_student ON exam_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_exam_progress_school ON exam_progress(school_id);

ALTER TABLE exam_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY exam_progress_select ON exam_progress
  FOR SELECT USING (school_id = get_user_school_id() OR is_super_admin());

CREATE POLICY exam_progress_insert ON exam_progress
  FOR INSERT WITH CHECK (school_id = get_user_school_id() OR is_super_admin());

CREATE POLICY exam_progress_update ON exam_progress
  FOR UPDATE USING (school_id = get_user_school_id() OR is_super_admin());

-- 11. QUIZ_QUESTIONS — Questions for quizzes
CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT DEFAULT 'MULTIPLE_CHOICE' CHECK (question_type IN ('MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER', 'ESSAY')),
  options JSONB DEFAULT '[]',
  correct_answer TEXT,
  points NUMERIC DEFAULT 1,
  explanation TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz ON quiz_questions(quiz_id);

ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY quiz_questions_select ON quiz_questions
  FOR SELECT USING (true);

CREATE POLICY quiz_questions_insert ON quiz_questions
  FOR INSERT WITH CHECK (true);

-- 12. ROOM_ASSIGNMENTS — Classroom/room assignments
CREATE TABLE IF NOT EXISTS room_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  room_name TEXT NOT NULL,
  building TEXT,
  floor INTEGER,
  capacity INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_room_assignments_school ON room_assignments(school_id);
CREATE INDEX IF NOT EXISTS idx_room_assignments_class ON room_assignments(class_id);

ALTER TABLE room_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY room_assignments_select ON room_assignments
  FOR SELECT USING (school_id = get_user_school_id() OR is_super_admin());

CREATE POLICY room_assignments_insert ON room_assignments
  FOR INSERT WITH CHECK (school_id = get_user_school_id() OR is_super_admin());

CREATE POLICY room_assignments_update ON room_assignments
  FOR UPDATE USING (school_id = get_user_school_id() OR is_super_admin());

CREATE POLICY room_assignments_delete ON room_assignments
  FOR DELETE USING (school_id = get_user_school_id() OR is_super_admin());

-- 13. WALLET_TRANSACTIONS — Wallet transaction history
-- Note: wallet_transactions already exists but columns are TEXT, not UUID FK
-- Adding UUID FK columns alongside existing TEXT columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'wallet_transactions' AND column_name = 'invoice_uuid'
  ) THEN
    ALTER TABLE wallet_transactions ADD COLUMN invoice_uuid UUID REFERENCES invoices(id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'wallet_transactions' AND column_name = 'payment_transaction_uuid'
  ) THEN
    ALTER TABLE wallet_transactions ADD COLUMN payment_transaction_uuid UUID REFERENCES payment_transactions(id) ON DELETE SET NULL;
  END IF;
END $$;

-- 14. Add missing updated_at trigger for assignments
CREATE TRIGGER update_assignments_updated_at
  BEFORE UPDATE ON assignments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 15. Add to realtime publication
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'assignments') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE assignments;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'assignment_submissions') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE assignment_submissions;
  END IF;
END $$;

-- 16. Seed default subscription plans
INSERT INTO subscription_plans (name, display_name, description, price_monthly, price_yearly, max_students, max_teachers, max_staff, features, is_active, trial_days, sort_order)
VALUES
  ('FREE_TRIAL', 'Essai Gratuit', '30 jours d''essai gratuit', 0, 0, 50, 10, 5, '["dashboard","students","teachers","grades","attendance"]'::jsonb, true, 30, 0),
  ('STARTER', 'Starter', 'Pour les petites écoles', 15000, 150000, 200, 20, 10, '["dashboard","students","teachers","grades","attendance","payments","messages"]'::jsonb, true, 0, 1),
  ('PROFESSIONAL', 'Professionnel', 'Pour les écoles moyennes', 35000, 350000, 500, 50, 30, '["dashboard","students","teachers","grades","attendance","payments","messages","transport","ai","marketplace"]'::jsonb, true, 0, 2),
  ('ENTERPRISE', 'Enterprise', 'Pour les grands établissements', 75000, 750000, 999999, 999, 999, '["dashboard","students","teachers","grades","attendance","payments","messages","transport","ai","marketplace","analytics","branding"]'::jsonb, true, 0, 3)
ON CONFLICT (name) DO NOTHING;

-- 17. Seed default platform modules
INSERT INTO platform_modules (name, display_name, description, is_active)
VALUES
  ('students', 'Gestion des élèves', 'Module de gestion des élèves', true),
  ('teachers', 'Gestion des enseignants', 'Module de gestion des enseignants', true),
  ('grades', 'Notes et bulletins', 'Module de gestion des notes', true),
  ('attendance', 'Présences', 'Module de pointage et présences', true),
  ('payments', 'Paiements', 'Module de gestion des paiements', true),
  ('transport', 'Transport', 'Module de gestion du transport', true),
  ('messages', 'Messagerie', 'Module de messagerie interne', true),
  ('ai', 'Intelligence Artificielle', 'Module IA éducative', true),
  ('marketplace', 'Marketplace', 'Place de marché éducative', true),
  ('analytics', 'Analytics', 'Module d''analyse et rapports', true),
  ('qr_codes', 'QR Codes', 'Module de gestion des QR codes', true),
  ('documents', 'Documents', 'Module de gestion documentaire', true)
ON CONFLICT (name) DO NOTHING;

-- 18. Seed default platform config
INSERT INTO platform_config (key, value, description, category, is_public)
VALUES
  ('platform_name', '"EduCI"', 'Nom de la plateforme', 'general', true),
  ('platform_version', '"1.0.0"', 'Version de la plateforme', 'general', true),
  ('maintenance_mode', 'false', 'Mode maintenance', 'general', false),
  ('max_upload_size_mb', '50', 'Taille max upload en MB', 'storage', false),
  ('default_currency', '"XOF"', 'Devise par défaut', 'payments', true),
  ('default_language', '"fr"', 'Langue par défaut', 'general', true),
  ('email_from', '"noreply@educi.live"', 'Email expéditeur', 'email', false),
  ('support_email', '"support@educi.live"', 'Email de support', 'general', true)
ON CONFLICT (key) DO NOTHING;
