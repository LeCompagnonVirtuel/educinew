-- Fix RLS policies that were too restrictive or broken

-- 1. Fix notifications INSERT: allow ADMIN to create notifications for users in their school
DROP POLICY IF EXISTS "notifications_insert" ON public.notifications;
CREATE POLICY "notifications_insert" ON public.notifications
  FOR INSERT WITH CHECK (
    user_id = auth.uid()
    OR public.is_super_admin()
    OR EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = notifications.user_id
      AND u.school_id = public.get_user_school_id()
    )
  );

-- 2. Fix notifications SELECT: allow ADMIN to see notifications of users in their school
DROP POLICY IF EXISTS "notifications_select" ON public.notifications;
CREATE POLICY "notifications_select" ON public.notifications
  FOR SELECT USING (
    user_id = auth.uid()
    OR public.is_super_admin()
    OR EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = notifications.user_id
      AND u.school_id = public.get_user_school_id()
    )
  );

-- 3. Fix notifications UPDATE: allow ADMIN to mark notifications as read for their school
DROP POLICY IF EXISTS "notifications_update" ON public.notifications;
CREATE POLICY "notifications_update" ON public.notifications
  FOR UPDATE USING (
    user_id = auth.uid()
    OR public.is_super_admin()
    OR EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = notifications.user_id
      AND u.school_id = public.get_user_school_id()
    )
  );

-- 4. Add missing DELETE policies for financial tables
DROP POLICY IF EXISTS "invoices_delete" ON public.invoices;
CREATE POLICY "invoices_delete" ON public.invoices
  FOR DELETE USING (public.is_super_admin() OR school_id = public.get_user_school_id());

DROP POLICY IF EXISTS "payments_delete" ON public.payments;
CREATE POLICY "payments_delete" ON public.payments
  FOR DELETE USING (public.is_super_admin() OR school_id = public.get_user_school_id());

-- 5. Add missing DELETE policies for invitations
DROP POLICY IF EXISTS "invitations_delete" ON public.invitations;
CREATE POLICY "invitations_delete" ON public.invitations
  FOR DELETE USING (public.is_super_admin() OR school_id = public.get_user_school_id());

DROP POLICY IF EXISTS "staff_invitations_delete" ON public.staff_invitations;
CREATE POLICY "staff_invitations_delete" ON public.staff_invitations
  FOR DELETE USING (public.is_super_admin() OR school_id = public.get_user_school_id());

-- 6. Add missing DELETE policy for subscriptions
DROP POLICY IF EXISTS "subscriptions_delete" ON public.subscriptions;
CREATE POLICY "subscriptions_delete" ON public.subscriptions
  FOR DELETE USING (public.is_super_admin() OR school_id = public.get_user_school_id());

-- 7. Add missing DELETE policy for teacher_attendance
DROP POLICY IF EXISTS "teacher_attendance_delete" ON public.teacher_attendance;
CREATE POLICY "teacher_attendance_delete" ON public.teacher_attendance
  FOR DELETE USING (public.is_super_admin() OR school_id = public.get_user_school_id());
