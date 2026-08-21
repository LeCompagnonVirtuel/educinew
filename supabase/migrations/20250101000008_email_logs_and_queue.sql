-- =====================================================
-- EduCI Migration 008 — Email logs + queue tables (idempotent)
-- =====================================================

-- Email logs: tracks every email sent via Resend
CREATE TABLE IF NOT EXISTS email_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  recipient_email text NOT NULL,
  recipient_name text,
  subject text NOT NULL,
  email_type text NOT NULL,
  status text DEFAULT 'PENDING',
  resend_id text,
  error_message text,
  school_id uuid,
  user_id uuid,
  metadata jsonb DEFAULT '{}',
  attempts int DEFAULT 0,
  max_attempts int DEFAULT 3,
  next_retry_at timestamptz,
  created_at timestamptz DEFAULT now(),
  sent_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_recipient ON email_logs(recipient_email);
CREATE INDEX IF NOT EXISTS idx_email_logs_school ON email_logs(school_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_type ON email_logs(email_type);
CREATE INDEX IF NOT EXISTS idx_email_logs_retry ON email_logs(status, next_retry_at) WHERE status = 'RETRY';

ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "email_logs_admin_read" ON email_logs;
CREATE POLICY "email_logs_admin_read" ON email_logs
  FOR SELECT USING (
    is_super_admin()
    OR (
      school_id = get_user_school_id()
      AND get_user_role() IN ('ADMIN', 'COMPTABLE', 'SECRETAIRE')
    )
  );

DROP POLICY IF EXISTS "email_logs_service_insert" ON email_logs;
CREATE POLICY "email_logs_service_insert" ON email_logs
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "email_logs_service_update" ON email_logs;
CREATE POLICY "email_logs_service_update" ON email_logs
  FOR UPDATE USING (auth.role() = 'service_role');

-- Function: log email sent
CREATE OR REPLACE FUNCTION log_email_sent(
  p_recipient_email text,
  p_subject text,
  p_email_type text,
  p_resend_id text,
  p_school_id uuid DEFAULT NULL,
  p_user_id uuid DEFAULT NULL,
  p_metadata jsonb DEFAULT '{}',
  p_recipient_name text DEFAULT NULL
) RETURNS uuid AS $$
DECLARE
  log_id uuid;
BEGIN
  INSERT INTO email_logs (
    recipient_email, recipient_name, subject, email_type,
    status, resend_id, school_id, user_id, metadata,
    attempts, sent_at
  ) VALUES (
    p_recipient_email, p_recipient_name, p_subject, p_email_type,
    'SENT', p_resend_id, p_school_id, p_user_id, p_metadata,
    1, now()
  ) RETURNING id INTO log_id;
  RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: log email failure
CREATE OR REPLACE FUNCTION log_email_failed(
  p_recipient_email text,
  p_subject text,
  p_email_type text,
  p_error_message text,
  p_school_id uuid DEFAULT NULL,
  p_user_id uuid DEFAULT NULL,
  p_metadata jsonb DEFAULT '{}',
  p_recipient_name text DEFAULT NULL
) RETURNS uuid AS $$
DECLARE
  log_id uuid;
BEGIN
  INSERT INTO email_logs (
    recipient_email, recipient_name, subject, email_type,
    status, error_message, school_id, user_id, metadata,
    attempts
  ) VALUES (
    p_recipient_email, p_recipient_name, p_subject, p_email_type,
    'FAILED', p_error_message, p_school_id, p_user_id, p_metadata,
    1
  ) RETURNING id INTO log_id;
  RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: retry failed emails
CREATE OR REPLACE FUNCTION get_retryable_emails(
  p_limit int DEFAULT 10
) RETURNS TABLE (
  id uuid,
  recipient_email text,
  recipient_name text,
  subject text,
  email_type text,
  school_id uuid,
  user_id uuid,
  metadata jsonb,
  attempts int
) AS $$
BEGIN
  RETURN QUERY
  SELECT el.id, el.recipient_email, el.recipient_name, el.subject,
         el.email_type, el.school_id, el.user_id, el.metadata, el.attempts
  FROM email_logs el
  WHERE el.status = 'RETRY'
    AND el.next_retry_at <= now()
    AND el.attempts < el.max_attempts
  ORDER BY el.next_retry_at ASC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: mark email for retry
CREATE OR REPLACE FUNCTION mark_email_retry(
  p_id uuid,
  p_error_message text
) RETURNS void AS $$
BEGIN
  UPDATE email_logs
  SET status = 'RETRY',
      error_message = p_error_message,
      attempts = attempts + 1,
      next_retry_at = now() + (interval '1 minute' * power(2, attempts))
  WHERE id = p_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Cleanup: delete email logs older than 90 days
CREATE OR REPLACE FUNCTION cleanup_email_logs() RETURNS void AS $$
BEGIN
  DELETE FROM email_logs WHERE created_at < now() - interval '90 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
