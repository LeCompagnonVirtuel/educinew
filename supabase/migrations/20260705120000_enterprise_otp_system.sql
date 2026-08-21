-- Enterprise OTP System Migration
-- Adds hashed OTP storage, attempt tracking, rate limiting

-- Add OTP enterprise columns to email_confirmation_tokens
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'email_confirmation_tokens') THEN
    -- Add columns if they don't exist
    ALTER TABLE email_confirmation_tokens ADD COLUMN IF NOT EXISTS otp_hashed TEXT;
    ALTER TABLE email_confirmation_tokens ADD COLUMN IF NOT EXISTS otp_attempts INTEGER DEFAULT 0;
    ALTER TABLE email_confirmation_tokens ADD COLUMN IF NOT EXISTS otp_locked_until TIMESTAMPTZ;
    
    -- Drop old plaintext otp_code column if it exists (we only store hashed)
    -- Keep otp_code for backward compatibility during migration
    -- ALTER TABLE email_confirmation_tokens DROP COLUMN IF EXISTS otp_code;
    
    -- Index for fast OTP lookup (email + hash, only unused)
    DROP INDEX IF EXISTS idx_otp_lookup;
    CREATE INDEX idx_otp_lookup 
      ON email_confirmation_tokens(email, otp_hashed) 
      WHERE used_at IS NULL;
  END IF;
END $$;

-- Rate limiting table (persistent across serverless restarts)
CREATE TABLE IF NOT EXISTS otp_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  action TEXT NOT NULL DEFAULT 'send',
  attempts INTEGER DEFAULT 1,
  window_start TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for rate limit lookups
CREATE INDEX IF NOT EXISTS idx_otp_rate_limits_email_action 
  ON otp_rate_limits(email, action, window_start);

-- Cleanup function for expired tokens and rate limits
CREATE OR REPLACE FUNCTION cleanup_expired_otp_data()
RETURNS void AS $$
BEGIN
  -- Delete expired OTP tokens (older than 1 hour)
  DELETE FROM email_confirmation_tokens 
  WHERE expires_at < now() - interval '1 hour';
  
  -- Delete old rate limit entries (older than 1 hour)
  DELETE FROM otp_rate_limits 
  WHERE window_start < now() - interval '1 hour';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
