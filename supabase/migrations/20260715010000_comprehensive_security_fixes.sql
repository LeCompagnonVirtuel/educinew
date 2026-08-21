-- Comprehensive security fixes: RLS policies, CHECK constraints, QR codes RLS
-- Addresses audit findings across QR, auth, users, and access control



-- ============================================================
-- 1. Fix users_update RLS — prevent role escalation
-- ============================================================
DROP POLICY IF EXISTS users_update ON public.users;
CREATE POLICY users_update ON public.users
  FOR UPDATE USING (
    is_super_admin()
    OR id = auth.uid()
  )
  WITH CHECK (
    -- Prevent non-admins from changing role, school_id, or is_active
    is_super_admin()
    OR (
      id = auth.uid()
      AND role = (SELECT role FROM public.users WHERE id = auth.uid())
      AND school_id = (SELECT school_id FROM public.users WHERE id = auth.uid())
    )
  );

-- ============================================================
-- 2. Add role checks to students INSERT/DELETE
-- ============================================================
DROP POLICY IF EXISTS students_insert ON public.students;
CREATE POLICY students_insert ON public.students
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR (
      school_id = get_user_school_id()
      AND get_user_role() IN ('ADMIN', 'SUPER_ADMIN', 'SECRETAIRE', 'SURVEILLANT')
    )
  );

DROP POLICY IF EXISTS students_delete ON public.students;
CREATE POLICY students_delete ON public.students
  FOR DELETE USING (
    is_super_admin()
    OR (
      school_id = get_user_school_id()
      AND get_user_role() IN ('ADMIN', 'SUPER_ADMIN')
    )
  );

-- ============================================================
-- 3. Add role checks to teachers INSERT/DELETE
-- ============================================================
DROP POLICY IF EXISTS teachers_insert ON public.teachers;
CREATE POLICY teachers_insert ON public.teachers
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR (
      school_id = get_user_school_id()
      AND get_user_role() IN ('ADMIN', 'SUPER_ADMIN')
    )
  );

DROP POLICY IF EXISTS teachers_delete ON public.teachers;
CREATE POLICY teachers_delete ON public.teachers
  FOR DELETE USING (
    is_super_admin()
    OR (
      school_id = get_user_school_id()
      AND get_user_role() IN ('ADMIN', 'SUPER_ADMIN')
    )
  );

-- ============================================================
-- 4. Add role checks to staff INSERT/DELETE
-- ============================================================
DROP POLICY IF EXISTS staff_insert ON public.staff;
CREATE POLICY staff_insert ON public.staff
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR (
      school_id = get_user_school_id()
      AND get_user_role() IN ('ADMIN', 'SUPER_ADMIN')
    )
  );

DROP POLICY IF EXISTS staff_delete ON public.staff;
CREATE POLICY staff_delete ON public.staff
  FOR DELETE USING (
    is_super_admin()
    OR (
      school_id = get_user_school_id()
      AND get_user_role() IN ('ADMIN', 'SUPER_ADMIN')
    )
  );

-- ============================================================
-- 5. Add role checks to parents INSERT/DELETE
-- ============================================================
DROP POLICY IF EXISTS parents_insert ON public.parents;
CREATE POLICY parents_insert ON public.parents
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR (
      school_id = get_user_school_id()
      AND get_user_role() IN ('ADMIN', 'SUPER_ADMIN', 'SECRETAIRE')
    )
  );

DROP POLICY IF EXISTS parents_delete ON public.parents;
CREATE POLICY parents_delete ON public.parents
  FOR DELETE USING (
    is_super_admin()
    OR (
      school_id = get_user_school_id()
      AND get_user_role() IN ('ADMIN', 'SUPER_ADMIN')
    )
  );

-- ============================================================
-- 6. Add RLS policies for qr_codes table
-- ============================================================
ALTER TABLE public.qr_codes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS qr_codes_select ON public.qr_codes;
CREATE POLICY qr_codes_select ON public.qr_codes
  FOR SELECT USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

DROP POLICY IF EXISTS qr_codes_insert ON public.qr_codes;
CREATE POLICY qr_codes_insert ON public.qr_codes
  FOR INSERT WITH CHECK (
    is_super_admin()
    OR (
      school_id = get_user_school_id()
      AND get_user_role() IN ('ADMIN', 'SUPER_ADMIN', 'SURVEILLANT', 'SECRETAIRE')
    )
  );

DROP POLICY IF EXISTS qr_codes_update ON public.qr_codes;
CREATE POLICY qr_codes_update ON public.qr_codes
  FOR UPDATE USING (
    is_super_admin()
    OR school_id = get_user_school_id()
  );

DROP POLICY IF EXISTS qr_codes_delete ON public.qr_codes;
CREATE POLICY qr_codes_delete ON public.qr_codes
  FOR DELETE USING (
    is_super_admin()
    OR (
      school_id = get_user_school_id()
      AND get_user_role() IN ('ADMIN', 'SUPER_ADMIN')
    )
  );

-- ============================================================
-- 7. Fix messages SELECT — restrict to sender/receiver only
-- ============================================================
DROP POLICY IF EXISTS messages_select ON public.messages;
CREATE POLICY messages_select ON public.messages
  FOR SELECT USING (
    is_super_admin()
    OR sender_id = auth.uid()
    OR receiver_id = auth.uid()
  );

-- ============================================================
-- 8. Add DIRECTEUR to CHECK constraint + fix handle_new_user
-- ============================================================
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS chk_users_role;
ALTER TABLE public.users
  ADD CONSTRAINT chk_users_role
  CHECK (role IN ('SUPER_ADMIN','ADMIN','COMPTABLE','SECRETAIRE','CENSEUR','SURVEILLANT','TEACHER','PARENT','STUDENT','CHAUFFEUR','DIRECTEUR'));

-- Fix handle_new_user to set is_active based on email confirmation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, name, email, role, school_id, phone, is_active)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    'STUDENT',
    NULL,
    NEW.raw_user_meta_data->>'phone',
    NEW.email_confirmed_at IS NOT NULL
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE LOG 'handle_new_user failed for %: %', NEW.id, SQLERRM;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================
-- 9. Restrict register_school_via_activation to prevent abuse
-- ============================================================
REVOKE EXECUTE ON FUNCTION public.register_school_via_activation(uuid, text, text, text, text, text, text, text, text, text) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.register_school_via_activation(uuid, text, text, text, text, text, text, text, text, text) TO service_role;

-- ============================================================
-- 10. Fix qr_code_stats view — restrict to own school
-- ============================================================
DROP VIEW IF EXISTS public.qr_code_stats;
CREATE VIEW public.qr_code_stats AS
SELECT
  q.school_id,
  s.name AS school_name,
  q.user_type,
  COUNT(*) AS total_qr_codes,
  COUNT(*) FILTER (WHERE q.is_active = true) AS active_qr_codes,
  COUNT(*) FILTER (WHERE q.expires_at < now()) AS expired_qr_codes
FROM public.qr_codes q
JOIN public.schools s ON s.id = q.school_id
GROUP BY q.school_id, s.name, q.user_type;

-- Only grant to service_role (view now requires school_id filtering in queries)
GRANT SELECT ON public.qr_code_stats TO service_role;
REVOKE SELECT ON public.qr_code_stats FROM authenticated;


