-- Disable any custom auth hooks that might cause "Database error querying schema"
-- GoTrue auth hooks reference PostgreSQL functions that must be accessible.
-- If these functions have issues, ALL sign-ins fail with 500.

-- Remove any custom_access_token hook function if it exists
DROP FUNCTION IF EXISTS public.custom_access_token_hook(jsonb) CASCADE;

-- Remove any MFA verification hook
DROP FUNCTION IF EXISTS public.mfa_verification_hook(jsonb) CASCADE;

-- Remove any custom auth hook functions that might be configured
DROP FUNCTION IF EXISTS public.auth_hook(jsonb) CASCADE;
DROP FUNCTION IF EXISTS public.custom_access_token(jsonb) CASCADE;

-- Also check for hooks in the auth schema
DROP FUNCTION IF EXISTS auth.custom_access_token_hook(jsonb) CASCADE;
