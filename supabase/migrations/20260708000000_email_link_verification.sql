-- Migration: Switch from OTP to email link verification
-- Adds verification_token columns to users table

-- Add verification token columns
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS verification_token TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS verification_sent_at TIMESTAMPTZ;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS verification_expires_at TIMESTAMPTZ;

-- Index for fast token lookup (partial index for performance)
CREATE INDEX IF NOT EXISTS idx_users_verification_token
  ON public.users(verification_token)
  WHERE verification_token IS NOT NULL;

-- Clean up old OTP-related columns that are no longer needed
-- (Keep otp_verified/otp_verified_at for backward compatibility)
