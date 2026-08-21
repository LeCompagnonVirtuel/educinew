-- =====================================================
-- EduCI RLS Policies
-- Multi-tenant security via Row Level Security
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE bulletins ENABLE ROW LEVEL SECURITY;
ALTER TABLE bulletin_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE timetable_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_gateway_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE buses ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_attendance_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE behavior_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE tuition_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_reminders ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- Helper function: Get current user's school_id
-- =====================================================
CREATE OR REPLACE FUNCTION get_user_school_id()
RETURNS UUID AS $$
  SELECT school_id FROM users WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- =====================================================
-- Helper function: Get current user's role
-- =====================================================
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM users WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- =====================================================
-- Helper function: Check if user is SUPER_ADMIN
-- =====================================================
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
  SELECT get_user_role() = 'SUPER_ADMIN';
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- =====================================================
-- SCHOOLS Policies
-- =====================================================
CREATE POLICY "schools_select" ON schools
  FOR SELECT USING (
    is_super_admin() OR id = get_user_school_id()
  );

CREATE POLICY "schools_insert" ON schools
  FOR INSERT WITH CHECK (true);

CREATE POLICY "schools_update" ON schools
  FOR UPDATE USING (
    is_super_admin() OR id = get_user_school_id()
  );

CREATE POLICY "schools_delete" ON schools
  FOR DELETE USING (is_super_admin());

-- =====================================================
-- USERS Policies
-- =====================================================
CREATE POLICY "users_select" ON users
  FOR SELECT USING (
    is_super_admin()
    OR id = auth.uid()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "users_insert" ON users
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "users_update" ON users
  FOR UPDATE USING (
    is_super_admin()
    OR id = auth.uid()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "users_delete" ON users
  FOR DELETE USING (is_super_admin());

-- =====================================================
-- STUDENTS Policies
-- =====================================================
CREATE POLICY "students_select" ON students
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "students_insert" ON students
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "students_update" ON students
  FOR UPDATE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "students_delete" ON students
  FOR DELETE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- =====================================================
-- TEACHERS Policies
-- =====================================================
CREATE POLICY "teachers_select" ON teachers
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "teachers_insert" ON teachers
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "teachers_update" ON teachers
  FOR UPDATE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "teachers_delete" ON teachers
  FOR DELETE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- =====================================================
-- CLASSES Policies
-- =====================================================
CREATE POLICY "classes_select" ON classes
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "classes_insert" ON classes
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "classes_update" ON classes
  FOR UPDATE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "classes_delete" ON classes
  FOR DELETE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- =====================================================
-- SUBJECTS Policies
-- =====================================================
CREATE POLICY "subjects_select" ON subjects
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
    OR school_id IS NULL
  );

CREATE POLICY "subjects_insert" ON subjects
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "subjects_update" ON subjects
  FOR UPDATE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "subjects_delete" ON subjects
  FOR DELETE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- =====================================================
-- GRADES Policies
-- =====================================================
CREATE POLICY "grades_select" ON grades
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "grades_insert" ON grades
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "grades_update" ON grades
  FOR UPDATE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "grades_delete" ON grades
  FOR DELETE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- =====================================================
-- ATTENDANCE Policies
-- =====================================================
CREATE POLICY "attendance_select" ON attendance
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "attendance_insert" ON attendance
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "attendance_update" ON attendance
  FOR UPDATE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "attendance_delete" ON attendance
  FOR DELETE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- =====================================================
-- BULLETINS Policies
-- =====================================================
CREATE POLICY "bulletins_select" ON bulletins
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "bulletins_insert" ON bulletins
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "bulletins_update" ON bulletins
  FOR UPDATE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "bulletins_delete" ON bulletins
  FOR DELETE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- =====================================================
-- BULLETIN ENTRIES Policies
-- =====================================================
CREATE POLICY "bulletin_entries_select" ON bulletin_entries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM bulletins b
      WHERE b.id = bulletin_entries.bulletin_id
      AND (is_super_admin() OR b.school_id = get_user_school_id())
    )
  );

CREATE POLICY "bulletin_entries_insert" ON bulletin_entries
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM bulletins b
      WHERE b.id = bulletin_entries.bulletin_id
      AND (is_super_admin() OR b.school_id = get_user_school_id())
    )
  );

CREATE POLICY "bulletin_entries_delete" ON bulletin_entries
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM bulletins b
      WHERE b.id = bulletin_entries.bulletin_id
      AND (is_super_admin() OR b.school_id = get_user_school_id())
    )
  );

-- =====================================================
-- PERIODS Policies
-- =====================================================
CREATE POLICY "periods_select" ON periods
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "periods_insert" ON periods
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "periods_update" ON periods
  FOR UPDATE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "periods_delete" ON periods
  FOR DELETE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- =====================================================
-- ACADEMIC YEARS Policies
-- =====================================================
CREATE POLICY "academic_years_select" ON academic_years
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "academic_years_insert" ON academic_years
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "academic_years_update" ON academic_years
  FOR UPDATE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "academic_years_delete" ON academic_years
  FOR DELETE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- =====================================================
-- CLASS SUBJECTS Policies
-- =====================================================
CREATE POLICY "class_subjects_select" ON class_subjects
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM classes c
      WHERE c.id = class_subjects.class_id
      AND (is_super_admin() OR c.school_id = get_user_school_id())
    )
  );

CREATE POLICY "class_subjects_insert" ON class_subjects
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM classes c
      WHERE c.id = class_subjects.class_id
      AND (is_super_admin() OR c.school_id = get_user_school_id())
    )
  );

CREATE POLICY "class_subjects_delete" ON class_subjects
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM classes c
      WHERE c.id = class_subjects.class_id
      AND (is_super_admin() OR c.school_id = get_user_school_id())
    )
  );

-- =====================================================
-- TIMETABLE SLOTS Policies
-- =====================================================
CREATE POLICY "timetable_slots_select" ON timetable_slots
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM classes c
      WHERE c.id = timetable_slots.class_id
      AND (is_super_admin() OR c.school_id = get_user_school_id())
    )
  );

CREATE POLICY "timetable_slots_insert" ON timetable_slots
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM classes c
      WHERE c.id = timetable_slots.class_id
      AND (is_super_admin() OR c.school_id = get_user_school_id())
    )
  );

CREATE POLICY "timetable_slots_delete" ON timetable_slots
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM classes c
      WHERE c.id = timetable_slots.class_id
      AND (is_super_admin() OR c.school_id = get_user_school_id())
    )
  );

-- =====================================================
-- INVOICES Policies
-- =====================================================
CREATE POLICY "invoices_select" ON invoices
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "invoices_insert" ON invoices
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "invoices_update" ON invoices
  FOR UPDATE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- =====================================================
-- PAYMENTS Policies
-- =====================================================
CREATE POLICY "payments_select" ON payments
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "payments_insert" ON payments
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "payments_update" ON payments
  FOR UPDATE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- =====================================================
-- PAYMENT TRANSACTIONS Policies
-- =====================================================
CREATE POLICY "payment_transactions_select" ON payment_transactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM invoices i
      WHERE i.id = payment_transactions.invoice_id
      AND (is_super_admin() OR i.school_id = get_user_school_id())
    )
  );

-- =====================================================
-- PAYMENT GATEWAY CONFIGS Policies
-- =====================================================
CREATE POLICY "payment_gateway_configs_select" ON payment_gateway_configs
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "payment_gateway_configs_insert" ON payment_gateway_configs
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "payment_gateway_configs_update" ON payment_gateway_configs
  FOR UPDATE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "payment_gateway_configs_delete" ON payment_gateway_configs
  FOR DELETE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- =====================================================
-- FEE CATEGORIES Policies
-- =====================================================
CREATE POLICY "fee_categories_select" ON fee_categories
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "fee_categories_insert" ON fee_categories
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "fee_categories_update" ON fee_categories
  FOR UPDATE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "fee_categories_delete" ON fee_categories
  FOR DELETE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- =====================================================
-- SUBSCRIPTIONS Policies
-- =====================================================
CREATE POLICY "subscriptions_select" ON subscriptions
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "subscriptions_insert" ON subscriptions
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "subscriptions_update" ON subscriptions
  FOR UPDATE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- =====================================================
-- MESSAGES Policies
-- =====================================================
CREATE POLICY "messages_select" ON messages
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
    OR sender_id = auth.uid()
    OR receiver_id = auth.uid()
  );

CREATE POLICY "messages_insert" ON messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid()
    AND (is_super_admin() OR school_id = get_user_school_id())
  );

CREATE POLICY "messages_update" ON messages
  FOR UPDATE USING (
    is_super_admin()
    OR sender_id = auth.uid()
    OR receiver_id = auth.uid()
  );

-- =====================================================
-- ANNOUNCEMENTS Policies
-- =====================================================
CREATE POLICY "announcements_select" ON announcements
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "announcements_insert" ON announcements
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "announcements_delete" ON announcements
  FOR DELETE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- =====================================================
-- NOTIFICATIONS Policies
-- =====================================================
CREATE POLICY "notifications_select" ON notifications
  FOR SELECT USING (
    user_id = auth.uid()
  );

CREATE POLICY "notifications_insert" ON notifications
  FOR INSERT WITH CHECK (
    user_id = auth.uid()
    OR is_super_admin()
    OR EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = notifications.user_id
      AND u.school_id = get_user_school_id()
    )
  );

CREATE POLICY "notifications_update" ON notifications
  FOR UPDATE USING (
    user_id = auth.uid()
  );

CREATE POLICY "notifications_delete" ON notifications
  FOR DELETE USING (
    user_id = auth.uid()
  );

-- =====================================================
-- BUSES Policies
-- =====================================================
CREATE POLICY "buses_select" ON buses
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "buses_insert" ON buses
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "buses_update" ON buses
  FOR UPDATE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "buses_delete" ON buses
  FOR DELETE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- =====================================================
-- BUS TRACKING Policies
-- =====================================================
CREATE POLICY "bus_tracking_select" ON bus_tracking
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM buses b
      WHERE b.id = bus_tracking.bus_id
      AND (is_super_admin() OR b.school_id = get_user_school_id())
    )
  );

CREATE POLICY "bus_tracking_insert" ON bus_tracking
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM buses b
      WHERE b.id = bus_tracking.bus_id
      AND (is_super_admin() OR b.school_id = get_user_school_id())
    )
  );

-- =====================================================
-- INVITATIONS Policies
-- =====================================================
CREATE POLICY "invitations_select" ON invitations
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "invitations_insert" ON invitations
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "invitations_update" ON invitations
  FOR UPDATE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- =====================================================
-- AUDIT LOGS Policies
-- =====================================================
CREATE POLICY "audit_logs_select" ON audit_logs
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "audit_logs_insert" ON audit_logs
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- =====================================================
-- MARKETPLACE LISTINGS Policies
-- =====================================================
CREATE POLICY "marketplace_listings_select" ON marketplace_listings
  FOR SELECT USING (true);

CREATE POLICY "marketplace_listings_insert" ON marketplace_listings
  FOR INSERT WITH CHECK (
    seller_id = auth.uid()
  );

CREATE POLICY "marketplace_listings_update" ON marketplace_listings
  FOR UPDATE USING (
    seller_id = auth.uid()
  );

CREATE POLICY "marketplace_listings_delete" ON marketplace_listings
  FOR DELETE USING (
    seller_id = auth.uid()
  );

-- =====================================================
-- MARKETPLACE PURCHASES Policies
-- =====================================================
CREATE POLICY "marketplace_purchases_select" ON marketplace_purchases
  FOR SELECT USING (
    buyer_id = auth.uid()
  );

CREATE POLICY "marketplace_purchases_insert" ON marketplace_purchases
  FOR INSERT WITH CHECK (
    buyer_id = auth.uid()
  );

-- =====================================================
-- WALLETS Policies
-- =====================================================
CREATE POLICY "wallets_select" ON wallets
  FOR SELECT USING (
    user_id = auth.uid()
  );

CREATE POLICY "wallets_insert" ON wallets
  FOR INSERT WITH CHECK (
    user_id = auth.uid()
  );

CREATE POLICY "wallets_update" ON wallets
  FOR UPDATE USING (
    user_id = auth.uid()
  );

-- =====================================================
-- WALLET TRANSACTIONS Policies
-- =====================================================
CREATE POLICY "wallet_transactions_select" ON wallet_transactions
  FOR SELECT USING (
    user_id = auth.uid()
  );

CREATE POLICY "wallet_transactions_insert" ON wallet_transactions
  FOR INSERT WITH CHECK (
    user_id = auth.uid()
  );

-- =====================================================
-- TEACHER ATTENDANCE Policies
-- =====================================================
CREATE POLICY "teacher_attendance_select" ON teacher_attendance
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "teacher_attendance_insert" ON teacher_attendance
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "teacher_attendance_update" ON teacher_attendance
  FOR UPDATE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- =====================================================
-- TEACHER ATTENDANCE STATS Policies
-- =====================================================
CREATE POLICY "teacher_attendance_stats_select" ON teacher_attendance_stats
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- =====================================================
-- TEACHER BADGES Policies
-- =====================================================
CREATE POLICY "teacher_badges_select" ON teacher_badges
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM teachers t
      WHERE t.id = teacher_badges.teacher_id
      AND (is_super_admin() OR t.school_id = get_user_school_id())
    )
  );

CREATE POLICY "teacher_badges_insert" ON teacher_badges
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM teachers t
      WHERE t.id = teacher_badges.teacher_id
      AND (is_super_admin() OR t.school_id = get_user_school_id())
    )
  );

-- =====================================================
-- BEHAVIOR REPORTS Policies
-- =====================================================
CREATE POLICY "behavior_reports_select" ON behavior_reports
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "behavior_reports_insert" ON behavior_reports
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- =====================================================
-- TUITION PLANS Policies
-- =====================================================
CREATE POLICY "tuition_plans_select" ON tuition_plans
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "tuition_plans_insert" ON tuition_plans
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "tuition_plans_update" ON tuition_plans
  FOR UPDATE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "tuition_plans_delete" ON tuition_plans
  FOR DELETE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- =====================================================
-- EXAM CATEGORIES Policies
-- =====================================================
CREATE POLICY "exam_categories_select" ON exam_categories
  FOR SELECT USING (true);

-- =====================================================
-- EXAMS Policies
-- =====================================================
CREATE POLICY "exams_select" ON exams
  FOR SELECT USING (true);

-- =====================================================
-- QUIZZES Policies
-- =====================================================
CREATE POLICY "quizzes_select" ON quizzes
  FOR SELECT USING (true);

-- =====================================================
-- QUIZ RESULTS Policies
-- =====================================================
CREATE POLICY "quiz_results_select" ON quiz_results
  FOR SELECT USING (
    student_id IN (
      SELECT id FROM students WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "quiz_results_insert" ON quiz_results
  FOR INSERT WITH CHECK (
    student_id IN (
      SELECT id FROM students WHERE user_id = auth.uid()
    )
  );

-- =====================================================
-- PAYMENT REMINDERS Policies
-- =====================================================
CREATE POLICY "payment_reminders_select" ON payment_reminders
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

CREATE POLICY "payment_reminders_insert" ON payment_reminders
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

-- =====================================================
-- Enable Realtime for key tables
-- =====================================================
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE attendance;
ALTER PUBLICATION supabase_realtime ADD TABLE grades;
ALTER PUBLICATION supabase_realtime ADD TABLE payments;
ALTER PUBLICATION supabase_realtime ADD TABLE bus_tracking;
ALTER PUBLICATION supabase_realtime ADD TABLE teacher_attendance;
