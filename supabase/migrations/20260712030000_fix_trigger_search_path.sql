-- Fix search_path on remaining trigger functions (non-SECURITY DEFINER)
-- Low risk but resolves linter warnings and prevents potential path manipulation

ALTER FUNCTION public.create_school_branding SET search_path = public;
ALTER FUNCTION public.set_teacher_attendance_school_id SET search_path = public;
ALTER FUNCTION public.update_onboarding_draft_updated_at SET search_path = public;
ALTER FUNCTION public.update_registration_drafts_v2_updated_at SET search_path = public;
ALTER FUNCTION public.update_school_branding_timestamp SET search_path = public;
