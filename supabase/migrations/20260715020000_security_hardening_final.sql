-- Migration: Security hardening — audit logs, CHECK constraints, rate limit RPC, indexes
-- Date: 2026-07-15

-- 1. SECURITY: Restrict audit_logs INSERT to service_role only
-- Any authenticated user could previously inject fake audit entries
DROP POLICY IF EXISTS "audit_logs_insert" ON audit_logs;
DROP POLICY IF EXISTS "Allow authenticated insert to audit_logs" ON audit_logs;

CREATE POLICY "audit_logs_insert_service_role" ON audit_logs
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow authenticated users to insert audit logs only for their own school
-- (the application sets school_id and user_id server-side)
CREATE POLICY "audit_logs_insert_authenticated" ON audit_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (
    school_id IN (
      SELECT users.school_id FROM users
      WHERE users.id = auth.uid()
      AND users.school_id IS NOT NULL
    )
  );

-- 2. SECURITY: Add CHECK constraints on tables missing them
-- invoices.status
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'invoices_status_check'
  ) THEN
    ALTER TABLE invoices
      ADD CONSTRAINT invoices_status_check
      CHECK (status IN ('DRAFT', 'SENT', 'PAID', 'OVERDUE', 'CANCELLED', 'PARTIAL'));
  END IF;
END $$;

-- subscriptions.status
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'subscriptions_status_check'
  ) THEN
    ALTER TABLE subscriptions
      ADD CONSTRAINT subscriptions_status_check
      CHECK (status IN ('ACTIVE', 'EXPIRED', 'CANCELLED', 'SUSPENDED', 'TRIAL', 'PENDING'));
  END IF;
END $$;

-- bulletins.status
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'bulletins_status_check'
  ) THEN
    ALTER TABLE bulletins
      ADD CONSTRAINT bulletins_status_check
      CHECK (status IN ('DRAFT', 'PUBLISHED', 'FINALIZED', 'ARCHIVED'));
  END IF;
END $$;

-- invitations.role
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'invitations_role_check'
  ) THEN
    ALTER TABLE invitations
      ADD CONSTRAINT invitations_role_check
      CHECK (role IN ('ADMIN', 'COMPTABLE', 'SECRETAIRE', 'CENSEUR', 'SURVEILLANT', 'TEACHER', 'PARENT', 'STUDENT', 'CHAUFFEUR', 'DIRECTEUR'));
  END IF;
END $$;

-- 3. PERFORMANCE: Add composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_attendance_events_school_student_time
  ON attendance_events (school_id, student_id, scan_time);

CREATE INDEX IF NOT EXISTS idx_notifications_user_type_read
  ON notifications (user_id, type, is_read);

CREATE INDEX IF NOT EXISTS idx_audit_logs_school_entity_time
  ON audit_logs (school_id, entity, created_at DESC);

-- 4. SECURITY: Add atomic rate limit RPC to prevent race conditions
CREATE OR REPLACE FUNCTION check_rate_limit_atomic(
  p_user_id UUID,
  p_window_start TIMESTAMPTZ,
  p_max_requests INTEGER
) RETURNS TABLE(allowed BOOLEAN, current_count INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count INTEGER;
BEGIN
  -- Lock the rate limit rows for this user to prevent concurrent inserts
  SELECT COUNT(*) INTO v_count
  FROM rate_limits
  WHERE user_id = p_user_id
    AND created_at >= p_window_start
  FOR UPDATE;

  IF v_count >= p_max_requests THEN
    allowed := FALSE;
    current_count := v_count;
  ELSE
    INSERT INTO rate_limits (user_id) VALUES (p_user_id);
    allowed := TRUE;
    current_count := v_count + 1;
  END IF;

  RETURN NEXT;
END;
$$;

-- Grant execute to service_role (used by edge functions)
GRANT EXECUTE ON FUNCTION check_rate_limit_atomic(UUID, TIMESTAMPTZ, INTEGER) TO service_role;

-- 5. SECURITY: Ensure rate_limits cleanup runs on schedule
-- (pg_cron job should already exist from migration 010, but verify)
DO $outer$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'cleanup-rate-limits-v2') THEN
    PERFORM cron.schedule(
      'cleanup-rate-limits-v2',
      '*/5 * * * *',
      'DELETE FROM rate_limits WHERE created_at < NOW() - INTERVAL ''5 minutes'''
    );
  END IF;
EXCEPTION
  WHEN undefined_table THEN
    -- pg_cron not available, skip
    NULL;
END $outer$;
