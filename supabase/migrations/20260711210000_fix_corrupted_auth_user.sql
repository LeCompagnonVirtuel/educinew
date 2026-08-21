-- Fix corrupted auth user that causes "Database error querying schema"
-- This happens when auth.users has rows with malformed metadata or
-- corrupted MFA factors/sessions.

-- Clean up any corrupted sessions for all users
DELETE FROM auth.sessions WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE auth.users.id = auth.sessions.user_id
);

-- Clean up any corrupted MFA factors
DELETE FROM auth.mfa_factors WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE auth.users.id = auth.mfa_factors.user_id
);

-- Clean up any corrupted MFA challenges
DELETE FROM auth.mfa_challenges WHERE NOT EXISTS (
  SELECT 1 FROM auth.mfa_factors WHERE auth.mfa_factors.id = auth.mfa_challenges.factor_id
);

-- Fix potentially corrupted identities
DELETE FROM auth.identities WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE auth.users.id = auth.identities.user_id
);

-- Ensure all auth users have valid raw_user_meta_data (fix NULL or invalid JSON)
UPDATE auth.users
SET raw_user_meta_data = '{}'::jsonb
WHERE raw_user_meta_data IS NULL;

-- Ensure email_confirmed_at is set for users created via admin API
-- (These users were created with email_confirm: false but the activation
-- RPC should have set it)
UPDATE auth.users
SET email_confirmed_at = now()
WHERE email = 'plateformeeduci@gmail.com'
  AND email_confirmed_at IS NULL;
