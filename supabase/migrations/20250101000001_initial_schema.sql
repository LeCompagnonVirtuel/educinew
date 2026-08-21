-- =====================================================
-- EduCI Supabase Migration
-- Converted from Prisma schema
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- SCHOLES
-- =====================================================
CREATE TABLE IF NOT EXISTS schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  sigle TEXT,
  slogan TEXT,
  description TEXT,
  address TEXT,
  city TEXT,
  region TEXT,
  country TEXT DEFAULT 'Côte d''Ivoire',
  phone TEXT,
  email TEXT UNIQUE,
  website TEXT,
  logo_url TEXT,
  logo TEXT,
  favicon_url TEXT,
  primary_color TEXT DEFAULT '#1B4D8E',
  secondary_color TEXT DEFAULT '#4CAF50',
  accent_color TEXT DEFAULT '#F5A623',
  academic_year TEXT DEFAULT '2025-2026',
  grading_system TEXT DEFAULT '20',
  passing_grade REAL DEFAULT 10,
  timezone TEXT DEFAULT 'Africa/Abidjan',
  language TEXT DEFAULT 'fr',
  currency TEXT DEFAULT 'XOF',
  notifications JSONB,
  payment_settings JSONB,
  academic_settings JSONB,
  theme JSONB,
  ai_settings JSONB,
  latitude REAL,
  longitude REAL,
  checkin_radius INTEGER DEFAULT 100,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- USERS (Supabase Auth compatible)
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'STUDENT',
  school_id UUID REFERENCES schools(id) ON DELETE SET NULL,
  phone TEXT,
  photo_url TEXT,
  is_active BOOLEAN DEFAULT false,
  two_factor_secret TEXT,
  two_factor_enabled BOOLEAN DEFAULT false,
  failed_login_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMPTZ,
  last_login_at TIMESTAMPTZ,
  last_login_ip TEXT,
  deleted_at TIMESTAMPTZ,
  deleted_by TEXT,
  status TEXT DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_users_school_id ON users(school_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);

-- =====================================================
-- ACADEMIC YEARS
-- =====================================================
CREATE TABLE IF NOT EXISTS academic_years (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(school_id, name)
);

-- =====================================================
-- PERIODS
-- =====================================================
CREATE TABLE IF NOT EXISTS periods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  period_type TEXT NOT NULL,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(school_id, name, academic_year_id)
);

CREATE INDEX IF NOT EXISTS idx_periods_school_id ON periods(school_id);
CREATE INDEX IF NOT EXISTS idx_periods_academic_year_id ON periods(academic_year_id);
CREATE INDEX IF NOT EXISTS idx_periods_period_type ON periods(period_type);

-- =====================================================
-- SUBJECTS
-- =====================================================
CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  coefficient REAL DEFAULT 1,
  school_id UUID REFERENCES schools(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_subjects_school_id ON subjects(school_id);

-- =====================================================
-- CLASSES
-- =====================================================
CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level TEXT NOT NULL,
  academic_year_id UUID REFERENCES academic_years(id) ON DELETE SET NULL,
  capacity INTEGER DEFAULT 50,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(school_id, name, academic_year_id)
);

CREATE INDEX IF NOT EXISTS idx_classes_school_id ON classes(school_id);

-- =====================================================
-- CLASS SUBJECTS
-- =====================================================
CREATE TABLE IF NOT EXISTS class_subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  teacher_id UUID,
  UNIQUE(class_id, subject_id)
);

CREATE INDEX IF NOT EXISTS idx_class_subjects_class_id ON class_subjects(class_id);
CREATE INDEX IF NOT EXISTS idx_class_subjects_subject_id ON class_subjects(subject_id);

-- =====================================================
-- STUDENTS
-- =====================================================
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
  matricule TEXT UNIQUE NOT NULL,
  date_of_birth TIMESTAMPTZ NOT NULL,
  gender TEXT,
  address TEXT,
  photo_url TEXT,
  enrollment_date TIMESTAMPTZ DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_students_school_id ON students(school_id);
CREATE INDEX IF NOT EXISTS idx_students_class_id ON students(class_id);
CREATE INDEX IF NOT EXISTS idx_students_matricule ON students(matricule);

-- =====================================================
-- TEACHERS
-- =====================================================
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE SET NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_teachers_school_id ON teachers(school_id);
CREATE INDEX IF NOT EXISTS idx_teachers_subject_id ON teachers(subject_id);

-- Update class_subjects teacher FK
ALTER TABLE class_subjects ADD CONSTRAINT fk_class_subjects_teacher
  FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE SET NULL;

-- =====================================================
-- GRADES
-- =====================================================
CREATE TABLE IF NOT EXISTS grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES teachers(id) ON DELETE SET NULL,
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  score REAL NOT NULL,
  max_score REAL DEFAULT 20,
  grade_type TEXT DEFAULT 'DEVOIR',
  coefficient REAL DEFAULT 1,
  bonus REAL DEFAULT 0,
  is_optional BOOLEAN DEFAULT false,
  term TEXT NOT NULL,
  period_id UUID REFERENCES periods(id) ON DELETE SET NULL,
  academic_year_id UUID REFERENCES academic_years(id) ON DELETE SET NULL,
  is_validated BOOLEAN DEFAULT false,
  validated_at TIMESTAMPTZ,
  validated_by TEXT,
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_grades_school_id ON grades(school_id);
CREATE INDEX IF NOT EXISTS idx_grades_student_id ON grades(student_id);
CREATE INDEX IF NOT EXISTS idx_grades_subject_id ON grades(subject_id);
CREATE INDEX IF NOT EXISTS idx_grades_teacher_id ON grades(teacher_id);
CREATE INDEX IF NOT EXISTS idx_grades_academic_year_id ON grades(academic_year_id);
CREATE INDEX IF NOT EXISTS idx_grades_period_id ON grades(period_id);
CREATE INDEX IF NOT EXISTS idx_grades_grade_type ON grades(grade_type);

-- =====================================================
-- BULLETINS
-- =====================================================
CREATE TABLE IF NOT EXISTS bulletins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  period_id UUID NOT NULL REFERENCES periods(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  general_average REAL DEFAULT 0,
  total_coefficient REAL DEFAULT 0,
  total_score REAL DEFAULT 0,
  rank INTEGER,
  class_size INTEGER DEFAULT 0,
  mention TEXT,
  status TEXT DEFAULT 'DRAFT',
  validated_at TIMESTAMPTZ,
  validated_by TEXT,
  teacher_comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(student_id, period_id)
);

CREATE INDEX IF NOT EXISTS idx_bulletins_school_id ON bulletins(school_id);
CREATE INDEX IF NOT EXISTS idx_bulletins_class_id ON bulletins(class_id);
CREATE INDEX IF NOT EXISTS idx_bulletins_period_id ON bulletins(period_id);
CREATE INDEX IF NOT EXISTS idx_bulletins_academic_year_id ON bulletins(academic_year_id);
CREATE INDEX IF NOT EXISTS idx_bulletins_status ON bulletins(status);

-- =====================================================
-- BULLETIN ENTRIES
-- =====================================================
CREATE TABLE IF NOT EXISTS bulletin_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bulletin_id UUID NOT NULL REFERENCES bulletins(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  subject_name TEXT NOT NULL,
  coefficient REAL NOT NULL,
  average REAL DEFAULT 0,
  score_total REAL DEFAULT 0,
  coeff_total REAL DEFAULT 0,
  rank INTEGER,
  teacher_comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(bulletin_id, subject_id)
);

CREATE INDEX IF NOT EXISTS idx_bulletin_entries_bulletin_id ON bulletin_entries(bulletin_id);
CREATE INDEX IF NOT EXISTS idx_bulletin_entries_subject_id ON bulletin_entries(subject_id);

-- =====================================================
-- ATTENDANCE
-- =====================================================
CREATE TABLE IF NOT EXISTS attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  date TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL,
  remark TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(student_id, date)
);

CREATE INDEX IF NOT EXISTS idx_attendance_school_id ON attendance(school_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student_id ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);

-- =====================================================
-- BEHAVIOR REPORTS
-- =====================================================
CREATE TABLE IF NOT EXISTS behavior_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_behavior_reports_school_id ON behavior_reports(school_id);
CREATE INDEX IF NOT EXISTS idx_behavior_reports_student_id ON behavior_reports(student_id);

-- =====================================================
-- TIMETABLE SLOTS
-- =====================================================
CREATE TABLE IF NOT EXISTS timetable_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  room TEXT
);

CREATE INDEX IF NOT EXISTS idx_timetable_slots_class_id ON timetable_slots(class_id);
CREATE INDEX IF NOT EXISTS idx_timetable_slots_subject_id ON timetable_slots(subject_id);

-- =====================================================
-- TUITION PLANS
-- =====================================================
CREATE TABLE IF NOT EXISTS tuition_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  amount REAL NOT NULL,
  frequency TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- INVOICES
-- =====================================================
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  tuition_plan_id UUID REFERENCES tuition_plans(id) ON DELETE SET NULL,
  type TEXT NOT NULL,
  fee_category_id UUID,
  amount REAL NOT NULL,
  discount_amount REAL DEFAULT 0,
  final_amount REAL NOT NULL,
  due_date TIMESTAMPTZ NOT NULL,
  paid_amount REAL DEFAULT 0,
  status TEXT DEFAULT 'UNPAID',
  description TEXT,
  academic_year TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_invoices_school_id ON invoices(school_id);
CREATE INDEX IF NOT EXISTS idx_invoices_student_id ON invoices(student_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON invoices(due_date);

-- =====================================================
-- PAYMENTS
-- =====================================================
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  tuition_plan_id UUID REFERENCES tuition_plans(id) ON DELETE SET NULL,
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  amount REAL NOT NULL,
  payment_method TEXT NOT NULL,
  payment_date TIMESTAMPTZ DEFAULT now(),
  reference TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'PENDING',
  receipt_url TEXT,
  invoice_id UUID REFERENCES invoices(id) ON DELETE SET NULL,
  subscription_id UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payments_school_id ON payments(school_id);
CREATE INDEX IF NOT EXISTS idx_payments_student_id ON payments(student_id);
CREATE INDEX IF NOT EXISTS idx_payments_invoice_id ON payments(invoice_id);

-- =====================================================
-- PAYMENT TRANSACTIONS
-- =====================================================
CREATE TABLE IF NOT EXISTS payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  gateway_id UUID,
  flutterwave_id TEXT UNIQUE,
  amount REAL NOT NULL,
  payment_method TEXT NOT NULL,
  payment_type TEXT NOT NULL,
  status TEXT DEFAULT 'PENDING',
  reference TEXT UNIQUE NOT NULL,
  flw_reference TEXT UNIQUE,
  transaction_id TEXT UNIQUE,
  tx_ref TEXT UNIQUE,
  currency TEXT DEFAULT 'XOF',
  narration TEXT,
  ip_address TEXT,
  gateway_response JSONB,
  payment_date TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payment_transactions_invoice_id ON payment_transactions(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_status ON payment_transactions(status);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_flw_reference ON payment_transactions(flw_reference);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_gateway_id ON payment_transactions(gateway_id);

-- =====================================================
-- PAYMENT GATEWAY CONFIGS
-- =====================================================
CREATE TABLE IF NOT EXISTS payment_gateway_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  gateway TEXT NOT NULL,
  is_active BOOLEAN DEFAULT false,
  config TEXT NOT NULL,
  last_tested_at TIMESTAMPTZ,
  last_test_status TEXT,
  last_test_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(school_id, gateway)
);

CREATE INDEX IF NOT EXISTS idx_payment_gateway_configs_school_id ON payment_gateway_configs(school_id);
CREATE INDEX IF NOT EXISTS idx_payment_gateway_configs_gateway ON payment_gateway_configs(gateway);

-- =====================================================
-- FEE CATEGORIES
-- =====================================================
CREATE TABLE IF NOT EXISTS fee_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  amount REAL,
  is_required BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(school_id, name)
);

CREATE INDEX IF NOT EXISTS idx_fee_categories_school_id ON fee_categories(school_id);

-- Update invoices fee_category FK
ALTER TABLE invoices ADD CONSTRAINT fk_invoices_fee_category
  FOREIGN KEY (fee_category_id) REFERENCES fee_categories(id) ON DELETE SET NULL;

-- =====================================================
-- SUBSCRIPTIONS
-- =====================================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID UNIQUE NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  plan TEXT NOT NULL,
  status TEXT DEFAULT 'ACTIVE',
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  monthly_amount REAL NOT NULL,
  yearly_amount REAL,
  payment_frequency TEXT DEFAULT 'MONTHLY',
  auto_renew BOOLEAN DEFAULT true,
  last_payment_date TIMESTAMPTZ,
  next_payment_date TIMESTAMPTZ,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- MESSAGES
-- =====================================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_messages_school_id ON messages(school_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_receiver ON messages(sender_id, receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages(receiver_id);

-- =====================================================
-- ANNOUNCEMENTS
-- =====================================================
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  target_role TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_announcements_school_id ON announcements(school_id);

-- =====================================================
-- NOTIFICATIONS
-- =====================================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  type TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  data TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, is_read);

-- =====================================================
-- BUSES
-- =====================================================
CREATE TABLE IF NOT EXISTS buses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  driver_name TEXT NOT NULL,
  plate_number TEXT UNIQUE NOT NULL,
  route TEXT,
  capacity INTEGER DEFAULT 30,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_buses_school_id ON buses(school_id);

-- =====================================================
-- BUS TRACKING
-- =====================================================
CREATE TABLE IF NOT EXISTS bus_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bus_id UUID NOT NULL REFERENCES buses(id) ON DELETE CASCADE,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bus_tracking_bus_id ON bus_tracking(bus_id);

-- =====================================================
-- INVITATIONS
-- =====================================================
CREATE TABLE IF NOT EXISTS invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  matricule TEXT,
  student_id UUID REFERENCES students(id) ON DELETE SET NULL,
  invited_by_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(school_id, email, role)
);

CREATE INDEX IF NOT EXISTS idx_invitations_token ON invitations(token);
CREATE INDEX IF NOT EXISTS idx_invitations_email ON invitations(email);

-- =====================================================
-- AUDIT LOGS
-- =====================================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT,
  details TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_school_id ON audit_logs(school_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- =====================================================
-- MARKETPLACE LISTINGS
-- =====================================================
CREATE TABLE IF NOT EXISTS marketplace_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price REAL NOT NULL,
  type TEXT NOT NULL,
  thumbnail_url TEXT,
  status TEXT DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_marketplace_listings_category ON marketplace_listings(category);
CREATE INDEX IF NOT EXISTS idx_marketplace_listings_status ON marketplace_listings(status);
CREATE INDEX IF NOT EXISTS idx_marketplace_listings_seller_id ON marketplace_listings(seller_id);

-- =====================================================
-- MARKETPLACE PURCHASES
-- =====================================================
CREATE TABLE IF NOT EXISTS marketplace_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES marketplace_listings(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'COMPLETED',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_marketplace_purchases_buyer_id ON marketplace_purchases(buyer_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_purchases_listing_id ON marketplace_purchases(listing_id);

-- =====================================================
-- WALLETS
-- =====================================================
CREATE TABLE IF NOT EXISTS wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  balance REAL DEFAULT 0,
  currency TEXT DEFAULT 'XOF',
  bonus_balance REAL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- WALLET TRANSACTIONS
-- =====================================================
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  amount REAL NOT NULL,
  balance_before REAL NOT NULL,
  balance_after REAL NOT NULL,
  reference TEXT UNIQUE NOT NULL,
  description TEXT,
  invoice_id TEXT,
  payment_transaction_id TEXT,
  status TEXT DEFAULT 'COMPLETED',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wallet_transactions_wallet_id ON wallet_transactions(wallet_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_status ON wallet_transactions(status);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_user_id ON wallet_transactions(user_id);

-- =====================================================
-- TEACHER ATTENDANCE
-- =====================================================
CREATE TABLE IF NOT EXISTS teacher_attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  date TIMESTAMPTZ NOT NULL,
  check_in_time TIMESTAMPTZ NOT NULL,
  check_out_time TIMESTAMPTZ,
  method TEXT NOT NULL,
  latitude REAL,
  longitude REAL,
  distance_meters REAL,
  qr_verified BOOLEAN DEFAULT false,
  face_match_score REAL,
  verified BOOLEAN DEFAULT false,
  late_minutes INTEGER DEFAULT 0,
  remark TEXT,
  gps_validated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(teacher_id, date)
);

CREATE INDEX IF NOT EXISTS idx_teacher_attendance_school_id ON teacher_attendance(school_id);

-- =====================================================
-- TEACHER ATTENDANCE STATS
-- =====================================================
CREATE TABLE IF NOT EXISTS teacher_attendance_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  total_days INTEGER DEFAULT 0,
  present_days INTEGER DEFAULT 0,
  absent_days INTEGER DEFAULT 0,
  late_days INTEGER DEFAULT 0,
  punctuality_score REAL DEFAULT 0,
  UNIQUE(teacher_id, month, year)
);

CREATE INDEX IF NOT EXISTS idx_teacher_attendance_stats_school_id ON teacher_attendance_stats(school_id);

-- =====================================================
-- TEACHER BADGES
-- =====================================================
CREATE TABLE IF NOT EXISTS teacher_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT now(),
  description TEXT
);

-- =====================================================
-- EXAM CATEGORIES
-- =====================================================
CREATE TABLE IF NOT EXISTS exam_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  level TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- EXAMS
-- =====================================================
CREATE TABLE IF NOT EXISTS exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES exam_categories(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  year INTEGER,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_exams_category_id ON exams(category_id);
CREATE INDEX IF NOT EXISTS idx_exams_subject_id ON exams(subject_id);

-- =====================================================
-- QUIZZES
-- =====================================================
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  questions TEXT NOT NULL,
  level TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_quizzes_subject_id ON quizzes(subject_id);

-- =====================================================
-- QUIZ RESULTS
-- =====================================================
CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  score REAL NOT NULL,
  total REAL NOT NULL,
  answers TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_quiz_results_quiz_id ON quiz_results(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_student_id ON quiz_results(student_id);

-- =====================================================
-- PAYMENT REMINDERS
-- =====================================================
CREATE TABLE IF NOT EXISTS payment_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  channel TEXT NOT NULL,
  status TEXT DEFAULT 'PENDING',
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payment_reminders_invoice_id ON payment_reminders(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payment_reminders_school_id ON payment_reminders(school_id);
CREATE INDEX IF NOT EXISTS idx_payment_reminders_student_id ON payment_reminders(student_id);
CREATE INDEX IF NOT EXISTS idx_payment_reminders_status ON payment_reminders(status);
CREATE INDEX IF NOT EXISTS idx_payment_reminders_type ON payment_reminders(type);

-- =====================================================
-- TRIGGER: Auto-update updated_at
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_grades_updated_at BEFORE UPDATE ON grades FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_periods_updated_at BEFORE UPDATE ON periods FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_bulletins_updated_at BEFORE UPDATE ON bulletins FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_payment_gateway_configs_updated_at BEFORE UPDATE ON payment_gateway_configs FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_fee_categories_updated_at BEFORE UPDATE ON fee_categories FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON wallets FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_marketplace_listings_updated_at BEFORE UPDATE ON marketplace_listings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON teachers FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
