-- =====================================================
-- EduCI Migration 007 — Rate limits table + RLS fixes
-- =====================================================

-- Rate limits table for Edge Function rate limiting
CREATE TABLE IF NOT EXISTS rate_limits (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_user_created ON rate_limits(user_id, created_at);

ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "rate_limits_service_only" ON rate_limits
  FOR ALL USING (auth.role() = 'service_role');

-- Auto-cleanup: delete entries older than 5 minutes (run via pg_cron or periodic cleanup)
-- For now, ensure old entries don't accumulate indefinitely
CREATE OR REPLACE FUNCTION cleanup_rate_limits() RETURNS void AS $$
BEGIN
  DELETE FROM rate_limits WHERE created_at < now() - interval '5 minutes';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- Fix: schools_update policy — restrict to ADMIN roles only
-- =====================================================
DROP POLICY IF EXISTS "schools_update" ON schools;
CREATE POLICY "schools_update" ON schools
  FOR UPDATE USING (
    is_super_admin()
    OR (
      id = get_user_school_id()
      AND get_user_role() IN ('ADMIN')
    )
  );

-- =====================================================
-- Fix: Ensure unique constraint on attendance for upsert
-- =====================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'attendance_student_id_date_key'
  ) THEN
    ALTER TABLE attendance ADD CONSTRAINT attendance_student_id_date_key UNIQUE (student_id, date);
  END IF;
END $$;
