-- =====================================================
-- Migration: Fix missing columns + broken index
-- =====================================================

-- 1. teacher_attendance: add missing status column
ALTER TABLE teacher_attendance ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'PRESENT';

-- 2. classes: add missing stream column
ALTER TABLE classes ADD COLUMN IF NOT EXISTS stream TEXT;

-- 3. Fix broken index: grades has no class_id column
--    The index in migration 004 references a non-existent column
DROP INDEX IF EXISTS idx_grades_class_id;
