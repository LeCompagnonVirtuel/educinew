-- Grant anon access to resolve_login_identifier
-- Required for mobile login flow: the app needs to resolve a matricule/phone
-- to an email address BEFORE authentication, so the RPC must be callable
-- by the anonymous role.
GRANT EXECUTE ON FUNCTION public.resolve_login_identifier(text) TO anon;

-- Cleanup: drop temp_password column from users if it exists (legacy artifact)
ALTER TABLE public.users DROP COLUMN IF EXISTS temp_password;
