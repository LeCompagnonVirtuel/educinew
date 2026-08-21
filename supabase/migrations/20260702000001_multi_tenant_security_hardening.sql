-- =====================================================
-- MIGRATION: Multi-Tenant Security Hardening
-- Priority: P0 - CRITICAL
-- Date: 2026-07-02
-- =====================================================

-- =====================================================
-- 1. FIX handle_new_user() TRIGGER - Restore P0 security
-- =====================================================
-- VULN-01: Trigger trusts raw_user_meta_data for role/school_id
-- Migration 015 fixed this, Migration 024 reverted it.
-- Restore the hardened version.

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, name, email, role, school_id, is_active, status)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    'STUDENT',
    NULL,
    CASE WHEN NEW.email_confirmed_at IS NOT NULL THEN true ELSE false END,
    'ACTIVE'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 2. REVOKE dangerous function grants to anon
-- =====================================================
-- VULN-02: resolve_login_identifier granted to anon (email enumeration)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'resolve_login_identifier') THEN
    REVOKE EXECUTE ON FUNCTION resolve_login_identifier(text) FROM anon;
  END IF;
END $$;

-- VULN-03: validate_confirmation_token granted to anon
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'validate_confirmation_token') THEN
    REVOKE EXECUTE ON FUNCTION validate_confirmation_token(text) FROM anon;
    REVOKE EXECUTE ON FUNCTION validate_confirmation_token(text) FROM authenticated;
  END IF;
END $$;

-- =====================================================
-- 3. FIX financial RPC functions - Add authorization guards
-- =====================================================
-- VULN-05: get_financial_dashboard, get_payment_method_breakdown, get_monthly_revenue_trend
-- accept arbitrary p_school_id without checking caller authorization

CREATE OR REPLACE FUNCTION get_financial_dashboard(p_school_id UUID)
RETURNS JSONB AS $$
DECLARE
  caller_school_id UUID;
BEGIN
  -- Authorization check
  SELECT school_id INTO caller_school_id FROM users WHERE id = auth.uid();
  IF caller_school_id IS DISTINCT FROM p_school_id AND NOT is_super_admin() THEN
    RAISE EXCEPTION 'Unauthorized: cannot access other school financial data';
  END IF;

  RETURN (
    SELECT jsonb_build_object(
      'today_revenue', COALESCE(SUM(amount) FILTER (WHERE payment_date = CURRENT_DATE), 0),
      'month_revenue', COALESCE(SUM(amount) FILTER (WHERE payment_date >= date_trunc('month', CURRENT_DATE)), 0),
      'total_revenue', COALESCE(SUM(amount), 0),
      'pending_count', COUNT(*) FILTER (WHERE status = 'PENDING'),
      'completed_count', COUNT(*) FILTER (WHERE status = 'COMPLETED'),
      'today_count', COUNT(*) FILTER (WHERE payment_date = CURRENT_DATE)
    )
    FROM payments WHERE school_id = p_school_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_payment_method_breakdown(p_school_id UUID)
RETURNS JSONB AS $$
DECLARE
  caller_school_id UUID;
BEGIN
  SELECT school_id INTO caller_school_id FROM users WHERE id = auth.uid();
  IF caller_school_id IS DISTINCT FROM p_school_id AND NOT is_super_admin() THEN
    RAISE EXCEPTION 'Unauthorized: cannot access other school financial data';
  END IF;

  RETURN (
    SELECT COALESCE(jsonb_agg(jsonb_build_object('method', payment_method, 'count', cnt, 'total', total)), '[]'::jsonb)
    FROM (
      SELECT payment_method, COUNT(*) as cnt, SUM(amount) as total
      FROM payments WHERE school_id = p_school_id AND status = 'COMPLETED'
      GROUP BY payment_method
    ) sub
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_monthly_revenue_trend(p_school_id UUID, p_months INTEGER DEFAULT 12)
RETURNS JSONB AS $$
DECLARE
  caller_school_id UUID;
BEGIN
  SELECT school_id INTO caller_school_id FROM users WHERE id = auth.uid();
  IF caller_school_id IS DISTINCT FROM p_school_id AND NOT is_super_admin() THEN
    RAISE EXCEPTION 'Unauthorized: cannot access other school financial data';
  END IF;

  RETURN (
    SELECT COALESCE(jsonb_agg(jsonb_build_object('month', month, 'revenue', revenue)), '[]'::jsonb)
    FROM (
      SELECT date_trunc('month', payment_date)::date as month, SUM(amount) as revenue
      FROM payments WHERE school_id = p_school_id AND status = 'COMPLETED'
        AND payment_date >= CURRENT_DATE - (p_months || ' months')::interval
      GROUP BY 1 ORDER BY 1
    ) sub
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 4. FIX transaction_logs / webhook_logs / gateway_test_results INSERT
-- =====================================================
-- VULN-04: INSERT policies use WITH CHECK (true) - any user can insert

DROP POLICY IF EXISTS "transaction_logs_service_insert" ON transaction_logs;
CREATE POLICY "transaction_logs_service_insert" ON transaction_logs
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "webhook_logs_service_insert" ON webhook_logs;
CREATE POLICY "webhook_logs_service_insert" ON webhook_logs
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "gateway_test_service_insert" ON gateway_test_results;
CREATE POLICY "gateway_test_service_insert" ON gateway_test_results
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- =====================================================
-- 5. FIX SELECT policies for payment logs to use get_user_school_id()
-- =====================================================
-- VULN-06: SELECT uses JWT claim instead of get_user_school_id()

DROP POLICY IF EXISTS "transaction_logs_school_read" ON transaction_logs;
CREATE POLICY "transaction_logs_school_read" ON transaction_logs
  FOR SELECT USING (school_id = get_user_school_id() OR is_super_admin());

DROP POLICY IF EXISTS "webhook_logs_school_read" ON webhook_logs;
CREATE POLICY "webhook_logs_school_read" ON webhook_logs
  FOR SELECT USING (school_id = get_user_school_id() OR is_super_admin());

DROP POLICY IF EXISTS "gateway_test_results_school_read" ON gateway_test_results;
CREATE POLICY "gateway_test_results_school_read" ON gateway_test_results
  FOR SELECT USING (school_id = get_user_school_id() OR is_super_admin());

-- =====================================================
-- 6. FIX subjects SELECT - Remove school_id IS NULL leak
-- =====================================================
-- VULN-07: subjects with school_id NULL visible to all tenants

DROP POLICY IF EXISTS "subjects_select" ON subjects;
CREATE POLICY "subjects_select" ON subjects
  FOR SELECT USING (
    is_super_admin() OR school_id = get_user_school_id()
  );

-- =====================================================
-- 7. FIX school_holidays / school_events / class_qr_codes
-- =====================================================
-- VULN-08: Missing is_super_admin() check

DROP POLICY IF EXISTS "school_holidays_school_isolation" ON school_holidays;
CREATE POLICY "school_holidays_school_isolation" ON school_holidays
  FOR ALL USING (school_id = get_user_school_id() OR is_super_admin());

DROP POLICY IF EXISTS "school_events_school_isolation" ON school_events;
CREATE POLICY "school_events_school_isolation" ON school_events
  FOR ALL USING (school_id = get_user_school_id() OR is_super_admin());

DROP POLICY IF EXISTS "class_qr_codes_school_isolation" ON class_qr_codes;
CREATE POLICY "class_qr_codes_school_isolation" ON class_qr_codes
  FOR ALL USING (school_id = get_user_school_id() OR is_super_admin());

-- =====================================================
-- 8. FIX marketplace_listings INSERT - Add school_id scope
-- =====================================================
-- VULN-12: INSERT has no school_id scope check
-- marketplace_listings has no school_id column; derive it from seller_id → users

DROP POLICY IF EXISTS "marketplace_listings_insert" ON marketplace_listings;
CREATE POLICY "marketplace_listings_insert" ON marketplace_listings
  FOR INSERT WITH CHECK (
    seller_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid()
      AND school_id = get_user_school_id()
    )
  );

-- =====================================================
-- 9. FIX storage policies - school-logos bucket
-- =====================================================
-- CRITICAL: Any authenticated user can overwrite/delete any school's logo

-- Remove overly permissive policies
DROP POLICY IF EXISTS "school_logos_insert" ON storage.objects;
DROP POLICY IF EXISTS "school_logos_update" ON storage.objects;
DROP POLICY IF EXISTS "school_logos_delete" ON storage.objects;

-- School-scoped INSERT
CREATE POLICY "school_logos_insert_scoped" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'school-logos'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

-- School-scoped UPDATE
CREATE POLICY "school_logos_update_scoped" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'school-logos'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

-- School-scoped DELETE
CREATE POLICY "school_logos_delete_scoped" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'school-logos'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

-- =====================================================
-- 10. FIX storage policies - logos bucket
-- =====================================================
-- CRITICAL: Any authenticated user can upload to any path

DROP POLICY IF EXISTS "logos_insert" ON storage.objects;
DROP POLICY IF EXISTS "logos_update" ON storage.objects;
DROP POLICY IF EXISTS "logos_delete" ON storage.objects;

CREATE POLICY "logos_insert_scoped" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'logos'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "logos_update_scoped" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'logos'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "logos_delete_scoped" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'logos'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

-- =====================================================
-- 11. FIX storage policies - qr-codes bucket
-- =====================================================
-- HIGH: Any authenticated user can upload QR codes to any school's folder

DROP POLICY IF EXISTS "qr_codes_insert" ON storage.objects;

CREATE POLICY "qr_codes_insert_scoped" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'qr-codes'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] IN (
      SELECT school_id::text FROM users WHERE id = auth.uid()
    )
  );

-- =====================================================
-- 12. CREATE exam_categories / exams / quizzes INSERT/UPDATE/DELETE
-- =====================================================
-- VULN-09: Tables are effectively read-only
-- exam_categories has no school_id; scope via exams → subjects → school_id

CREATE POLICY "exam_categories_insert" ON exam_categories
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM exams e
      JOIN subjects s ON s.id = e.subject_id
      WHERE e.category_id = exam_categories.id
      AND (s.school_id = get_user_school_id() OR is_super_admin())
    )
  );

CREATE POLICY "exam_categories_update" ON exam_categories
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM exams e
      JOIN subjects s ON s.id = e.subject_id
      WHERE e.category_id = exam_categories.id
      AND (s.school_id = get_user_school_id() OR is_super_admin())
    )
  );

CREATE POLICY "exam_categories_delete" ON exam_categories
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM exams e
      JOIN subjects s ON s.id = e.subject_id
      WHERE e.category_id = exam_categories.id
      AND (s.school_id = get_user_school_id() OR is_super_admin())
    )
  );

CREATE POLICY "exams_insert" ON exams
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM subjects WHERE id = exams.subject_id AND (school_id = get_user_school_id() OR is_super_admin()))
  );

CREATE POLICY "exams_update" ON exams
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM subjects WHERE id = exams.subject_id AND (school_id = get_user_school_id() OR is_super_admin()))
  );

CREATE POLICY "exams_delete" ON exams
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM subjects WHERE id = exams.subject_id AND (school_id = get_user_school_id() OR is_super_admin()))
  );

CREATE POLICY "quizzes_insert" ON quizzes
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM subjects WHERE id = quizzes.subject_id AND (school_id = get_user_school_id() OR is_super_admin()))
  );

CREATE POLICY "quizzes_update" ON quizzes
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM subjects WHERE id = quizzes.subject_id AND (school_id = get_user_school_id() OR is_super_admin()))
  );

CREATE POLICY "quizzes_delete" ON quizzes
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM subjects WHERE id = quizzes.subject_id AND (school_id = get_user_school_id() OR is_super_admin()))
  );
