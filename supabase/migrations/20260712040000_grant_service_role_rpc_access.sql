-- Fix: service_role was revoked from enterprise RPC functions by 20260712010000
-- These functions are called by API routes using the service_role client
-- Without this grant, /api/registration/verify returns "Erreur lors de l'activation"

GRANT EXECUTE ON FUNCTION public.enterprise_activate_school TO service_role;
GRANT EXECUTE ON FUNCTION public.create_enterprise_user TO service_role;
GRANT EXECUTE ON FUNCTION public.generate_enterprise_school_code TO service_role;
GRANT EXECUTE ON FUNCTION public.register_school_via_activation TO service_role;
GRANT EXECUTE ON FUNCTION public.register_school_with_admin TO service_role;
GRANT EXECUTE ON FUNCTION public.resolve_login_identifier TO service_role;

-- Fix: SECURITY DEFINER functions with SET search_path = public cannot find
-- gen_random_bytes/crypt/gen_salt from pgcrypto (installed in 'extensions' schema).
-- Add 'extensions' to search_path for all functions that use pgcrypto.
ALTER FUNCTION public.enterprise_activate_school SET search_path = public, extensions;
ALTER FUNCTION public.create_enterprise_user SET search_path = public, extensions;
ALTER FUNCTION public.generate_enterprise_school_code SET search_path = public, extensions;
ALTER FUNCTION public.generate_temp_password SET search_path = public, extensions;
ALTER FUNCTION public.generate_user_identifier SET search_path = public, extensions;
ALTER FUNCTION public.register_school_via_activation SET search_path = public, extensions;
ALTER FUNCTION public.register_school_with_admin SET search_path = public, extensions;
ALTER FUNCTION public.generate_invitation_code SET search_path = public, extensions;
ALTER FUNCTION public.generate_staff_qr SET search_path = public, extensions;
ALTER FUNCTION public.generate_student_qr SET search_path = public, extensions;
ALTER FUNCTION public.generate_teacher_qr SET search_path = public, extensions;
