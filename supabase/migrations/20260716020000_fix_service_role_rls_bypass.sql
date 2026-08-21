-- Fix: service_role must bypass RLS on users, students, teachers, staff, parents tables
-- The admin create-user route uses service_role to upsert users after
-- handle_new_user trigger has already inserted the row.
-- Without explicit service_role policies, the UPDATE part of upsert fails
-- with "new row violates row-level security policy (USING expression)"

-- ============================================================
-- USERS table — service_role full access
-- ============================================================
DROP POLICY IF EXISTS "service_role_users_all" ON public.users;
CREATE POLICY "service_role_users_all" ON public.users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- STUDENTS table — service_role full access
-- ============================================================
DROP POLICY IF EXISTS "service_role_students_all" ON public.students;
CREATE POLICY "service_role_students_all" ON public.students
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- TEACHERS table — service_role full access
-- ============================================================
DROP POLICY IF EXISTS "service_role_teachers_all" ON public.teachers;
CREATE POLICY "service_role_teachers_all" ON public.teachers
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- STAFF table — service_role full access
-- ============================================================
DROP POLICY IF EXISTS "service_role_staff_all" ON public.staff;
CREATE POLICY "service_role_staff_all" ON public.staff
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- PARENTS table — service_role full access
-- ============================================================
DROP POLICY IF EXISTS "service_role_parents_all" ON public.parents;
CREATE POLICY "service_role_parents_all" ON public.parents
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- QR_CODES table — service_role full access (create-user generates QR)
-- ============================================================
DROP POLICY IF EXISTS "service_role_qr_codes_all" ON public.qr_codes;
CREATE POLICY "service_role_qr_codes_all" ON public.qr_codes
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- AUDIT_LOGS table — service_role full access
-- ============================================================
DROP POLICY IF EXISTS "service_role_audit_logs_all" ON public.audit_logs;
CREATE POLICY "service_role_audit_logs_all" ON public.audit_logs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
