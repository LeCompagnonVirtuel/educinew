-- Add OTP code column to email_confirmation_tokens
-- This column stores the 6-digit OTP code for email verification
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'email_confirmation_tokens') THEN
    ALTER TABLE email_confirmation_tokens ADD COLUMN IF NOT EXISTS otp_code TEXT;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_email_confirmation_tokens_otp') THEN
      CREATE INDEX idx_email_confirmation_tokens_otp ON email_confirmation_tokens(email, otp_code) WHERE used_at IS NULL;
    END IF;
  END IF;
END $$;
