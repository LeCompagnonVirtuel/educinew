-- Fix: resolve_login_identifier must be callable by anon role
-- because it's invoked BEFORE authentication (user types matricule/phone to log in)
-- The function is SECURITY DEFINER so it executes with the definer's privileges,
-- while only returning an email address (no sensitive data leak).

GRANT EXECUTE ON FUNCTION public.resolve_login_identifier(text) TO anon;
GRANT EXECUTE ON FUNCTION public.resolve_login_identifier(text) TO authenticated;
