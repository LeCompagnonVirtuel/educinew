-- =============================================================
-- UNIFIED QR CODE SYSTEM — Production Migration
-- Date: 2026-07-13
-- Purpose: Consolidate all QR code generation into a single
--          unified, secure, multi-tenant system.
-- =============================================================

-- 0. Ensure UNIQUE constraint on user_id (needed for ON CONFLICT in triggers)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'qr_codes_user_id_unique'
      AND conrelid = 'qr_codes'::regclass
  ) THEN
    -- Clean up duplicates first (keep most recent, delete older)
    DELETE FROM qr_codes
    WHERE id IN (
      SELECT id FROM (
        SELECT id, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY generated_at DESC, created_at DESC) AS rn
        FROM qr_codes
        WHERE user_id IS NOT NULL
      ) ranked
      WHERE ranked.rn > 1
    );
    ALTER TABLE qr_codes ADD CONSTRAINT qr_codes_user_id_unique UNIQUE (user_id);
  END IF;
END $$;

-- 1. Add qr_type column to distinguish QR code purposes
ALTER TABLE qr_codes ADD COLUMN IF NOT EXISTS qr_type TEXT NOT NULL DEFAULT 'ATTENDANCE'
  CHECK (qr_type IN ('ATTENDANCE', 'DOCUMENT', 'VISITOR', 'TRANSPORT', 'LOGIN', 'CLASS'));

-- 2. Add document reference columns
ALTER TABLE qr_codes ADD COLUMN IF NOT EXISTS document_type TEXT;
ALTER TABLE qr_codes ADD COLUMN IF NOT EXISTS document_id UUID;
ALTER TABLE qr_codes ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';

-- 3. Add signed token column (HMAC-SHA256 signed JWT-like token)
ALTER TABLE qr_codes ADD COLUMN IF NOT EXISTS signed_token TEXT;

-- 4. Create index on qr_type for fast filtering
CREATE INDEX IF NOT EXISTS idx_qr_codes_type ON qr_codes(qr_type);
CREATE INDEX IF NOT EXISTS idx_qr_codes_signed_token ON qr_codes(signed_token) WHERE signed_token IS NOT NULL;

-- 5. Create document_qr_codes table for document verification
CREATE TABLE IF NOT EXISTS document_qr_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN (
    'BULLETIN', 'CERTIFICAT', 'ATTESTATION', 'DIPLOME',
    'RECUS', 'FACTURE', 'CONVOCATION', 'CARTE_SCOLAIRE',
    'BADGE_ENSEIGNANT', 'BADGE_PERSONNEL', 'BADGE_VISITEUR',
    'BADGE_CONDUCTEUR', 'RELEVE_NOTES'
  )),
  document_id UUID NOT NULL,
  student_id UUID REFERENCES students(id) ON DELETE SET NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  qr_data TEXT NOT NULL UNIQUE,
  signed_token TEXT NOT NULL,
  qr_url TEXT,
  is_active BOOLEAN DEFAULT true,
  generated_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,
  verified_count INTEGER DEFAULT 0,
  last_verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for document_qr_codes
CREATE INDEX IF NOT EXISTS idx_doc_qr_school ON document_qr_codes(school_id);
CREATE INDEX IF NOT EXISTS idx_doc_qr_document ON document_qr_codes(document_type, document_id);
CREATE INDEX IF NOT EXISTS idx_doc_qr_student ON document_qr_codes(student_id) WHERE student_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_doc_qr_data ON document_qr_codes(qr_data);
CREATE INDEX IF NOT EXISTS idx_doc_qr_active ON document_qr_codes(is_active) WHERE is_active = true;

-- RLS for document_qr_codes
ALTER TABLE document_qr_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY doc_qr_select ON document_qr_codes
  FOR SELECT USING (
    school_id = get_user_school_id()
    OR user_id = auth.uid()
    OR is_super_admin()
  );

CREATE POLICY doc_qr_insert ON document_qr_codes
  FOR INSERT WITH CHECK (
    school_id = get_user_school_id()
    OR is_super_admin()
  );

CREATE POLICY doc_qr_update ON document_qr_codes
  FOR UPDATE USING (
    school_id = get_user_school_id()
    OR is_super_admin()
  );

CREATE POLICY doc_qr_delete ON document_qr_codes
  FOR DELETE USING (
    school_id = get_user_school_id()
    OR is_super_admin()
  );

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE document_qr_codes;

-- 6. Unified QR generation function for ALL user types
CREATE OR REPLACE FUNCTION generate_unified_qr()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role_prefix TEXT;
  v_identifier TEXT;
  v_qr_data TEXT;
  v_barcode TEXT;
  v_user_id UUID;
  v_user_type TEXT;
BEGIN
  -- Determine role prefix and identifier based on trigger source
  IF TG_TABLE_NAME = 'students' THEN
    v_role_prefix := 'S';
    v_identifier := COALESCE(NEW.matricule, NEW.id::text);
    v_user_id := NEW.user_id;
    v_user_type := 'STUDENT';
  ELSIF TG_TABLE_NAME = 'teachers' THEN
    v_role_prefix := 'T';
    v_identifier := COALESCE(NEW.employee_code, NEW.matricule, NEW.id::text);
    v_user_id := NEW.user_id;
    v_user_type := 'TEACHER';
  ELSIF TG_TABLE_NAME = 'staff' THEN
    v_role_prefix := 'P';
    v_identifier := COALESCE(NEW.employee_code, NEW.id::text);
    v_user_id := NEW.user_id;
    v_user_type := 'STAFF';
  ELSIF TG_TABLE_NAME = 'parents' THEN
    v_role_prefix := 'R';
    v_identifier := NEW.user_id::text;
    v_user_id := NEW.user_id;
    v_user_type := 'PARENT';
  ELSE
    -- Unknown table, skip
    RETURN NEW;
  END IF;

  -- Build unified QR data format: EDUCI:{PREFIX}:{identifier}:{user_id}
  v_qr_data := 'EDUCI:' || v_role_prefix || ':' || v_identifier || ':' || v_user_id;
  v_barcode := 'EDUCI' || v_role_prefix || REPLACE(LEFT(v_identifier, 12), '-', '');

  -- Insert or update QR code record
  INSERT INTO qr_codes (
    school_id, user_id, user_type, qr_type,
    qr_data, barcode_data, is_active,
    generated_at, metadata
  ) VALUES (
    NEW.school_id, v_user_id, v_user_type, 'ATTENDANCE',
    v_qr_data, v_barcode, true,
    now(), jsonb_build_object('source', 'auto_trigger', 'table', TG_TABLE_NAME)
  )
  ON CONFLICT (user_id) DO UPDATE SET
    qr_data = EXCLUDED.qr_data,
    barcode_data = EXCLUDED.barcode_data,
    is_active = true,
    generated_at = now(),
    metadata = EXCLUDED.metadata
  WHERE qr_codes.user_id = EXCLUDED.user_id;

  RETURN NEW;
END;
$$;

-- 7. Create triggers for ALL user types
-- Students
DROP TRIGGER IF EXISTS on_student_created ON students;
CREATE TRIGGER on_student_created
  AFTER INSERT ON students
  FOR EACH ROW
  WHEN (NEW.user_id IS NOT NULL)
  EXECUTE FUNCTION generate_unified_qr();

-- Teachers
DROP TRIGGER IF EXISTS on_teacher_created ON teachers;
CREATE TRIGGER on_teacher_created
  AFTER INSERT ON teachers
  FOR EACH ROW
  WHEN (NEW.user_id IS NOT NULL)
  EXECUTE FUNCTION generate_unified_qr();

-- Staff
DROP TRIGGER IF EXISTS on_staff_created ON staff;
CREATE TRIGGER on_staff_created
  AFTER INSERT ON staff
  FOR EACH ROW
  WHEN (NEW.user_id IS NOT NULL)
  EXECUTE FUNCTION generate_unified_qr();

-- Parents
DROP TRIGGER IF EXISTS on_parent_created ON parents;
CREATE TRIGGER on_parent_created
  AFTER INSERT ON parents
  FOR EACH ROW
  WHEN (NEW.user_id IS NOT NULL)
  EXECUTE FUNCTION generate_unified_qr();

-- 8. Generate QR for existing users who don't have one
-- Students without QR
INSERT INTO qr_codes (school_id, user_id, user_type, qr_type, qr_data, barcode_data, is_active, generated_at, metadata)
SELECT
  s.school_id,
  s.user_id,
  'STUDENT',
  'ATTENDANCE',
  'EDUCI:S:' || COALESCE(s.matricule, s.id::text) || ':' || s.user_id,
  'EDUCIS' || REPLACE(LEFT(COALESCE(s.matricule, s.id::text), 12), '-', ''),
  true,
  now(),
  '{"source": "migration_backfill"}'::jsonb
FROM students s
WHERE s.user_id IS NOT NULL
  AND s.is_active = true
  AND NOT EXISTS (SELECT 1 FROM qr_codes q WHERE q.user_id = s.user_id)
ON CONFLICT (user_id) DO NOTHING;

-- Teachers without QR
INSERT INTO qr_codes (school_id, user_id, user_type, qr_type, qr_data, barcode_data, is_active, generated_at, metadata)
SELECT
  t.school_id,
  t.user_id,
  'TEACHER',
  'ATTENDANCE',
  'EDUCI:T:' || t.user_id::text || ':' || t.user_id,
  'EDUCIT' || REPLACE(LEFT(t.user_id::text, 12), '-', ''),
  true,
  now(),
  '{"source": "migration_backfill"}'::jsonb
FROM teachers t
WHERE t.user_id IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM qr_codes q WHERE q.user_id = t.user_id)
ON CONFLICT (user_id) DO NOTHING;

-- Staff without QR
INSERT INTO qr_codes (school_id, user_id, user_type, qr_type, qr_data, barcode_data, is_active, generated_at, metadata)
SELECT
  st.school_id,
  st.user_id,
  'STAFF',
  'ATTENDANCE',
  'EDUCI:P:' || st.user_id::text || ':' || st.user_id,
  'EDUCIP' || REPLACE(LEFT(st.user_id::text, 12), '-', ''),
  true,
  now(),
  '{"source": "migration_backfill"}'::jsonb
FROM staff st
WHERE st.user_id IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM qr_codes q WHERE q.user_id = st.user_id)
ON CONFLICT (user_id) DO NOTHING;

-- Parents without QR
INSERT INTO qr_codes (school_id, user_id, user_type, qr_type, qr_data, barcode_data, is_active, generated_at, metadata)
SELECT
  p.school_id,
  p.user_id,
  'PARENT',
  'ATTENDANCE',
  'EDUCI:R:' || p.user_id::text || ':' || p.user_id,
  'EDUCIR' || REPLACE(LEFT(p.user_id::text, 12), '-', ''),
  true,
  now(),
  '{"source": "migration_backfill"}'::jsonb
FROM parents p
WHERE p.user_id IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM qr_codes q WHERE q.user_id = p.user_id)
ON CONFLICT (user_id) DO NOTHING;

-- 9. Create QR monitoring view for Super Admin dashboard
CREATE OR REPLACE VIEW qr_code_stats AS
SELECT
  s.id AS school_id,
  s.name AS school_name,
  COUNT(*) AS total_qr_codes,
  COUNT(*) FILTER (WHERE q.is_active = true) AS active_qr_codes,
  COUNT(*) FILTER (WHERE q.is_active = false) AS revoked_qr_codes,
  COUNT(*) FILTER (WHERE q.user_type = 'STUDENT') AS student_qr_codes,
  COUNT(*) FILTER (WHERE q.user_type = 'TEACHER') AS teacher_qr_codes,
  COUNT(*) FILTER (WHERE q.user_type = 'STAFF') AS staff_qr_codes,
  COUNT(*) FILTER (WHERE q.user_type = 'PARENT') AS parent_qr_codes,
  COALESCE(SUM(q.scan_count), 0) AS total_scans,
  MAX(q.last_scanned_at) AS last_scan_at,
  COUNT(*) FILTER (WHERE q.generated_at > now() - interval '24 hours') AS generated_last_24h,
  COUNT(*) FILTER (WHERE q.last_scanned_at > now() - interval '24 hours') AS scanned_last_24h
FROM schools s
LEFT JOIN qr_codes q ON q.school_id = s.id
WHERE s.is_active = true
GROUP BY s.id, s.name;

-- Grant access to the view
GRANT SELECT ON qr_code_stats TO authenticated;

-- 10. Create function to verify document QR codes
CREATE OR REPLACE FUNCTION verify_document_qr(p_qr_data TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_doc RECORD;
  v_school_id UUID;
BEGIN
  -- Get caller's school
  SELECT school_id INTO v_school_id FROM users WHERE id = auth.uid();
  IF v_school_id IS NULL THEN
    RETURN jsonb_build_object('valid', false, 'error', 'Non autorisé');
  END IF;

  -- Look up document QR
  SELECT * INTO v_doc
  FROM document_qr_codes
  WHERE qr_data = p_qr_data
    AND is_active = true
    AND (expires_at IS NULL OR expires_at > now());

  IF v_doc IS NULL THEN
    RETURN jsonb_build_object('valid', false, 'error', 'QR code invalide ou expiré');
  END IF;

  -- School isolation check
  IF v_doc.school_id != v_school_id THEN
    RETURN jsonb_build_object('valid', false, 'error', 'QR code d''un autre établissement');
  END IF;

  -- Update verification count
  UPDATE document_qr_codes
  SET verified_count = verified_count + 1,
      last_verified_at = now()
  WHERE id = v_doc.id;

  RETURN jsonb_build_object(
    'valid', true,
    'document_type', v_doc.document_type,
    'document_id', v_doc.document_id,
    'school_id', v_doc.school_id,
    'generated_at', v_doc.generated_at,
    'verified_count', v_doc.verified_count + 1
  );
END;
$$;

GRANT EXECUTE ON FUNCTION verify_document_qr(TEXT) TO authenticated;

-- 11. Create function to get QR stats for a school
CREATE OR REPLACE FUNCTION get_qr_stats(p_school_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_stats JSONB;
BEGIN
  SELECT jsonb_build_object(
    'total', COUNT(*),
    'active', COUNT(*) FILTER (WHERE is_active = true),
    'revoked', COUNT(*) FILTER (WHERE is_active = false),
    'students', COUNT(*) FILTER (WHERE user_type = 'STUDENT'),
    'teachers', COUNT(*) FILTER (WHERE user_type = 'TEACHER'),
    'staff', COUNT(*) FILTER (WHERE user_type = 'STAFF'),
    'parents', COUNT(*) FILTER (WHERE user_type = 'PARENT'),
    'total_scans', COALESCE(SUM(scan_count), 0),
    'scanned_today', COUNT(*) FILTER (WHERE last_scanned_at::date = CURRENT_DATE),
    'generated_today', COUNT(*) FILTER (WHERE generated_at::date = CURRENT_DATE)
  ) INTO v_stats
  FROM qr_codes
  WHERE school_id = p_school_id;

  RETURN v_stats;
END;
$$;

GRANT EXECUTE ON FUNCTION get_qr_stats(UUID) TO authenticated;
