-- Performance: Add missing indexes on FK columns
CREATE INDEX IF NOT EXISTS idx_behavior_reports_student_id ON public.behavior_reports(student_id);
CREATE INDEX IF NOT EXISTS idx_exams_category_id ON public.exams(category_id);
CREATE INDEX IF NOT EXISTS idx_grades_academic_year_id ON public.grades(academic_year_id);
CREATE INDEX IF NOT EXISTS idx_grades_teacher_id ON public.grades(teacher_id);
CREATE INDEX IF NOT EXISTS idx_students_class_id ON public.students(class_id);
CREATE INDEX IF NOT EXISTS idx_students_school_id ON public.students(school_id);

-- Cleanup: Remove duplicate/redundant RLS policies

-- gateway_test_results: 3 SELECT policies doing the same thing
-- Keep gateway_test_results_select (canonical), drop duplicates
DROP POLICY IF EXISTS "gateway_test_results_school_read" ON public.gateway_test_results;
DROP POLICY IF EXISTS "gateway_test_school_read" ON public.gateway_test_results;

-- notifications: 2 INSERT policies with overlapping logic
-- Keep notifications_insert (more comprehensive), drop the older one
DROP POLICY IF EXISTS "notifications_insert_policy" ON public.notifications;

-- onboarding_drafts: duplicate policies for same operations across public/authenticated
-- The authenticated-scoped ones are more restrictive, keep those + service_role
DROP POLICY IF EXISTS "onboarding_drafts_delete" ON public.onboarding_drafts;
DROP POLICY IF EXISTS "onboarding_drafts_insert_auth" ON public.onboarding_drafts;
DROP POLICY IF EXISTS "onboarding_drafts_update_own" ON public.onboarding_drafts;

-- registration_drafts_v2: redundant service_role policy (already has "Service role full access")
DROP POLICY IF EXISTS "registration_drafts_v2_service_role_only" ON public.registration_drafts_v2;
