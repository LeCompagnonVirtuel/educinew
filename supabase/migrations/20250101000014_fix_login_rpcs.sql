-- Fix: Restore anon access to resolve_login_identifier for phone/matricule login
GRANT EXECUTE ON FUNCTION resolve_login_identifier(text) TO anon;
