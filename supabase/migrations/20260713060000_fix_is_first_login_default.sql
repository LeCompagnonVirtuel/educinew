-- =============================================================
-- FIX: is_first_login DEFAULT was set to TRUE in migration 20260702230017
-- This caused ALL existing users (including self-registered admins) to be
-- forced to /first-login page. Only enterprise-created users (with activation_token)
-- should have is_first_login = true.
-- =============================================================

-- Fix the default to false (new self-registered users should NOT be forced to change password)
ALTER TABLE users ALTER COLUMN is_first_login SET DEFAULT false;

-- Reset is_first_login for all users who were NOT created via enterprise API
-- Enterprise-created users have an activation_token set
UPDATE users SET is_first_login = false
WHERE is_first_login = true
  AND (activation_token IS NULL OR activation_token = '');

-- Users created via enterprise API who already changed their password should also be reset
UPDATE users SET is_first_login = false
WHERE is_first_login = true
  AND last_password_change IS NOT NULL;
