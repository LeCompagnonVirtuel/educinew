-- CHECK constraints and missing indexes
-- Addresses audit findings: missing CHECK on role/status columns, missing composite indexes

-- ============================================================
-- 1. CHECK constraints on critical columns
-- ============================================================

-- users.role must be a valid role
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'chk_users_role'
  ) THEN
    ALTER TABLE public.users
      ADD CONSTRAINT chk_users_role
      CHECK (role IN ('SUPER_ADMIN','ADMIN','COMPTABLE','SECRETAIRE','CENSEUR','SURVEILLANT','TEACHER','PARENT','STUDENT','CHAUFFEUR'));
  END IF;
END $$;

-- users.status
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'chk_users_status'
  ) THEN
    ALTER TABLE public.users
      ADD CONSTRAINT chk_users_status
      CHECK (status IN ('ACTIVE','INACTIVE','SUSPENDED','PENDING'));
  END IF;
END $$;

-- attendance.status
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'chk_attendance_status'
  ) THEN
    ALTER TABLE public.attendance
      ADD CONSTRAINT chk_attendance_status
      CHECK (status IN ('PRESENT','ABSENT','LATE','EXCUSED'));
  END IF;
END $$;

-- grades.grade_type
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'chk_grades_grade_type'
  ) THEN
    ALTER TABLE public.grades
      ADD CONSTRAINT chk_grades_grade_type
      CHECK (grade_type IN ('HOMEWORK','QUIZ','MIDTERM','FINAL','PROJECT','PARTICIPATION'));
  END IF;
END $$;

-- payments.status
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'chk_payments_status'
  ) THEN
    ALTER TABLE public.payments
      ADD CONSTRAINT chk_payments_status
      CHECK (status IN ('PENDING','COMPLETED','FAILED','REFUNDED','CANCELLED'));
  END IF;
END $$;

-- ============================================================
-- 2. Missing composite indexes
-- ============================================================

-- Messages: unread messages per school
CREATE INDEX IF NOT EXISTS idx_messages_school_is_read
  ON public.messages (school_id, is_read)
  WHERE is_read = false;

-- Grades: student grades per period
CREATE INDEX IF NOT EXISTS idx_grades_student_period
  ON public.grades (student_id, period_id);

-- Invoices: student payment status
CREATE INDEX IF NOT EXISTS idx_invoices_student_status
  ON public.invoices (student_id, status);

