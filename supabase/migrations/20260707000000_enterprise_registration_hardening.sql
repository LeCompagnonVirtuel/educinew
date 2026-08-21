-- Migration: Enterprise registration hardening
-- Adds missing columns, triggers, and security fixes for the OTP flow

-- 1. Add verification tracking columns to users
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMPTZ;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS otp_verified BOOLEAN DEFAULT false;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS otp_verified_at TIMESTAMPTZ;

-- 2. Trigger: propagate email_confirmed_at from auth.users to public.users
CREATE OR REPLACE FUNCTION public.propagate_email_verification()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL AND OLD.email_confirmed_at IS NULL THEN
    UPDATE public.users
    SET is_active = true,
        email_verified = true,
        email_verified_at = now(),
        status = 'ACTIVE'
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_email_confirmed ON auth.users;
CREATE TRIGGER on_email_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (NEW.email_confirmed_at IS NOT NULL AND OLD.email_confirmed_at IS NULL)
  EXECUTE FUNCTION public.propagate_email_verification();

-- 3. Backfill existing confirmed users
UPDATE public.users u
SET email_verified = true,
    email_verified_at = au.email_confirmed_at,
    is_active = true,
    status = 'ACTIVE'
FROM auth.users au
WHERE u.id = au.id
  AND au.email_confirmed_at IS NOT NULL
  AND u.email_verified = false;

-- 4. Performance index for OTP lookup
CREATE INDEX IF NOT EXISTS idx_email_confirmation_tokens_email_used
  ON public.email_confirmation_tokens(email, used_at)
  WHERE used_at IS NULL;

-- 5. Drop the insecure otp_code column (plaintext OTP storage)
-- Keep otp_hashed which is the secure version
ALTER TABLE public.email_confirmation_tokens DROP COLUMN IF EXISTS otp_code;

-- 6. Add RLS policy for onboarding_drafts INSERT (was missing - anyone could insert)
DROP POLICY IF EXISTS "onboarding_drafts_insert_auth" ON public.onboarding_drafts;
CREATE POLICY "onboarding_drafts_insert_auth" ON public.onboarding_drafts
  FOR INSERT WITH CHECK (auth.uid() = user_id OR public.is_super_admin());

-- 7. Ensure onboarding_drafts has proper UPDATE policy
DROP POLICY IF EXISTS "onboarding_drafts_update_own" ON public.onboarding_drafts;
CREATE POLICY "onboarding_drafts_update_own" ON public.onboarding_drafts
  FOR UPDATE USING (auth.uid() = user_id OR public.is_super_admin());
