-- Enable pg_cron extension (wrapped so it doesn't block if unavailable)
DO $$
BEGIN
  CREATE EXTENSION IF NOT EXISTS pg_cron;
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'pg_cron extension not available, skipping: %', SQLERRM;
END $$;

-- Schedule cron jobs (only if pg_cron is available)
DO $$
BEGIN
  PERFORM cron.schedule('cleanup-rate-limits', '*/5 * * * *', 'SELECT cleanup_rate_limits()');
  PERFORM cron.schedule('cleanup-email-logs', '0 3 * * *', 'SELECT cleanup_email_logs(30)');
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Could not schedule cron jobs (pg_cron may not be available): %', SQLERRM;
END $$;

-- Revoke anon access to resolve_login_identifier (security hardening)
REVOKE EXECUTE ON FUNCTION resolve_login_identifier(text) FROM anon;
GRANT EXECUTE ON FUNCTION resolve_login_identifier(text) TO authenticated;
