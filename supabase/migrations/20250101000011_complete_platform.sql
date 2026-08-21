-- =====================================================
-- EduCI Migration 011 - Complete Platform
-- Tables manquantes + triggers auto + Realtime
-- =====================================================

-- =====================================================
-- 1. TABLE PARENTS + RELATION PARENT-ENFANTS
-- =====================================================
CREATE TABLE IF NOT EXISTS parents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  profession TEXT,
  employer TEXT,
  relationship TEXT DEFAULT 'PARENT',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_parents_school_id ON parents(school_id);
CREATE INDEX IF NOT EXISTS idx_parents_user_id ON parents(user_id);

CREATE TABLE IF NOT EXISTS parent_students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  relationship TEXT DEFAULT 'PARENT',
  is_primary_contact BOOLEAN DEFAULT false,
  can_pickup BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(parent_id, student_id)
);

CREATE INDEX IF NOT EXISTS idx_parent_students_parent ON parent_students(parent_id);
CREATE INDEX IF NOT EXISTS idx_parent_students_student ON parent_students(student_id);

ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "parents_school_select" ON parents FOR SELECT
  USING (school_id = get_user_school_id() OR is_super_admin());
CREATE POLICY "parents_school_insert" ON parents FOR INSERT
  WITH CHECK (school_id = get_user_school_id() OR is_super_admin());
CREATE POLICY "parents_school_update" ON parents FOR UPDATE
  USING (school_id = get_user_school_id() OR is_super_admin());
CREATE POLICY "parents_school_delete" ON parents FOR DELETE
  USING (school_id = get_user_school_id() OR is_super_admin());

CREATE POLICY "parent_students_select" ON parent_students FOR SELECT
  USING (EXISTS (SELECT 1 FROM parents p WHERE p.id = parent_id AND p.school_id = get_user_school_id()) OR is_super_admin());
CREATE POLICY "parent_students_insert" ON parent_students FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM parents p WHERE p.id = parent_id AND p.school_id = get_user_school_id()) OR is_super_admin());
CREATE POLICY "parent_students_update" ON parent_students FOR UPDATE
  USING (EXISTS (SELECT 1 FROM parents p WHERE p.id = parent_id AND p.school_id = get_user_school_id()) OR is_super_admin());
CREATE POLICY "parent_students_delete" ON parent_students FOR DELETE
  USING (EXISTS (SELECT 1 FROM parents p WHERE p.id = parent_id AND p.school_id = get_user_school_id()) OR is_super_admin());

-- =====================================================
-- 2. TABLE STAFF / PERSONNEL ADMINISTRATIF
-- =====================================================
CREATE TABLE IF NOT EXISTS staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  position TEXT NOT NULL,
  department TEXT,
  hire_date TIMESTAMPTZ DEFAULT now(),
  contract_type TEXT DEFAULT 'CDI',
  salary REAL,
  phone TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_staff_school_id ON staff(school_id);
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;

CREATE POLICY "staff_school_select" ON staff FOR SELECT
  USING (school_id = get_user_school_id() OR is_super_admin());
CREATE POLICY "staff_school_insert" ON staff FOR INSERT
  WITH CHECK (school_id = get_user_school_id() OR is_super_admin());
CREATE POLICY "staff_school_update" ON staff FOR UPDATE
  USING (school_id = get_user_school_id() OR is_super_admin());
CREATE POLICY "staff_school_delete" ON staff FOR DELETE
  USING (school_id = get_user_school_id() OR is_super_admin());

-- =====================================================
-- 3. TABLE QR CODES (métadonnées persistées)
-- =====================================================
CREATE TABLE IF NOT EXISTS qr_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user_type TEXT NOT NULL,
  qr_data TEXT UNIQUE NOT NULL,
  qr_url TEXT,
  barcode_data TEXT UNIQUE,
  is_active BOOLEAN DEFAULT true,
  generated_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,
  last_scanned_at TIMESTAMPTZ,
  scan_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_qr_codes_user ON qr_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_qr_codes_school ON qr_codes(school_id);
CREATE INDEX IF NOT EXISTS idx_qr_codes_data ON qr_codes(qr_data);

ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "qr_codes_select" ON qr_codes FOR SELECT
  USING (school_id = get_user_school_id() OR user_id = auth.uid() OR is_super_admin());
CREATE POLICY "qr_codes_insert" ON qr_codes FOR INSERT
  WITH CHECK (school_id = get_user_school_id() OR is_super_admin());
CREATE POLICY "qr_codes_update" ON qr_codes FOR UPDATE
  USING (school_id = get_user_school_id() OR is_super_admin());

-- =====================================================
-- 4. CHAMPS ÉLÈVE MANQUANTS
-- =====================================================
ALTER TABLE students ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS place_of_birth TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS nationality TEXT DEFAULT 'Ivoirienne';
ALTER TABLE students ADD COLUMN IF NOT EXISTS blood_group TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS allergies TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS emergency_contact_name TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS emergency_contact_phone TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS emergency_contact_relation TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS series TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS level TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS documents JSONB DEFAULT '[]'::jsonb;
ALTER TABLE students ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'ACTIVE';

-- =====================================================
-- 5. ATTENDANCE MULTI-ÉVÉNEMENT
-- =====================================================
CREATE TABLE IF NOT EXISTS attendance_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  scan_time TIMESTAMPTZ DEFAULT now(),
  scanned_by UUID REFERENCES users(id) ON DELETE SET NULL,
  qr_code_id UUID REFERENCES qr_codes(id) ON DELETE SET NULL,
  latitude REAL,
  longitude REAL,
  device_info TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_attendance_events_school ON attendance_events(school_id);
CREATE INDEX IF NOT EXISTS idx_attendance_events_student ON attendance_events(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_events_type ON attendance_events(event_type);
CREATE INDEX IF NOT EXISTS idx_attendance_events_time ON attendance_events(scan_time);

ALTER TABLE attendance_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "attendance_events_select" ON attendance_events FOR SELECT
  USING (school_id = get_user_school_id() OR is_super_admin());
CREATE POLICY "attendance_events_insert" ON attendance_events FOR INSERT
  WITH CHECK (school_id = get_user_school_id() OR is_super_admin());

COMMENT ON TABLE attendance_events IS 'Multi-event attendance: ARRIVAL, DEPARTURE, CANTEEN, LIBRARY, EXAM, EVENT';

-- =====================================================
-- 6. TABLE DOCUMENTS (métadonnées fichiers générés)
-- =====================================================
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  student_id UUID REFERENCES students(id) ON DELETE SET NULL,
  document_type TEXT NOT NULL,
  title TEXT NOT NULL,
  file_url TEXT,
  file_path TEXT,
  file_size INTEGER,
  mime_type TEXT DEFAULT 'application/pdf',
  status TEXT DEFAULT 'GENERATED',
  metadata JSONB DEFAULT '{}'::jsonb,
  generated_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_documents_school ON documents(school_id);
CREATE INDEX IF NOT EXISTS idx_documents_user ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_student ON documents(student_id);
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(document_type);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "documents_select" ON documents FOR SELECT
  USING (school_id = get_user_school_id() OR user_id = auth.uid() OR is_super_admin());
CREATE POLICY "documents_insert" ON documents FOR INSERT
  WITH CHECK (school_id = get_user_school_id() OR is_super_admin());
CREATE POLICY "documents_delete" ON documents FOR DELETE
  USING (school_id = get_user_school_id() OR is_super_admin());

COMMENT ON TABLE documents IS 'Types: STUDENT_CARD, TEACHER_BADGE, STAFF_BADGE, PARENT_CARD, ENROLLMENT_FORM, RECEIPT, INVOICE, CERTIFICATE, ATTESTATION, BULLETIN';

-- =====================================================
-- 7. TABLE PERMISSIONS (matrice granulaire)
-- =====================================================
CREATE TABLE IF NOT EXISTS permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  resource TEXT NOT NULL,
  can_create BOOLEAN DEFAULT false,
  can_read BOOLEAN DEFAULT true,
  can_update BOOLEAN DEFAULT false,
  can_delete BOOLEAN DEFAULT false,
  can_export BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(school_id, role, resource)
);

ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "permissions_select" ON permissions FOR SELECT
  USING (school_id = get_user_school_id() OR is_super_admin());
CREATE POLICY "permissions_manage" ON permissions FOR ALL
  USING (is_super_admin() OR (school_id = get_user_school_id() AND get_user_role() = 'ADMIN'));

-- =====================================================
-- 8. TABLE CYCLES / NIVEAUX
-- =====================================================
CREATE TABLE IF NOT EXISTS cycles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(school_id, name)
);

CREATE TABLE IF NOT EXISTS levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  cycle_id UUID REFERENCES cycles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(school_id, name)
);

ALTER TABLE cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE levels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cycles_school" ON cycles FOR ALL
  USING (school_id = get_user_school_id() OR is_super_admin());
CREATE POLICY "levels_school" ON levels FOR ALL
  USING (school_id = get_user_school_id() OR is_super_admin());

-- =====================================================
-- 9. AMÉLIORER AUDIT_LOGS (before/after snapshots)
-- =====================================================
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS before_data JSONB;
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS after_data JSONB;
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS device_info TEXT;
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS request_id TEXT;

-- =====================================================
-- 10. NOTIFICATIONS.DATA → JSONB
-- =====================================================
ALTER TABLE notifications ALTER COLUMN data TYPE JSONB USING data::jsonb;

-- =====================================================
-- 11. CHAMPS ENSEIGNANT MANQUANTS
-- =====================================================
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS signature_url TEXT;
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS badge_url TEXT;
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS hire_date TIMESTAMPTZ;
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS contract_type TEXT DEFAULT 'CDI';
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS salary REAL;
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS specialization TEXT;

-- =====================================================
-- 12. TRIGGER AUTO-CRÉATION PROFIL SUR AUTH SIGNUP
-- =====================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, name, email, role, school_id, is_active, status)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'STUDENT'),
    (NEW.raw_user_meta_data->>'school_id')::uuid,
    CASE WHEN NEW.email_confirmed_at IS NOT NULL THEN true ELSE false END,
    'ACTIVE'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =====================================================
-- 13. TRIGGER AUTO-GÉNÉRATION QR CODE À LA CRÉATION ÉLÈVE
-- =====================================================
CREATE OR REPLACE FUNCTION generate_student_qr()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.qr_codes (school_id, user_id, user_type, qr_data, barcode_data)
  VALUES (
    NEW.school_id,
    NEW.user_id,
    'STUDENT',
    'EDUCI:S:' || NEW.matricule || ':' || NEW.id::text,
    'EDUCI' || REPLACE(NEW.matricule, '-', '')
  )
  ON CONFLICT (qr_data) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_student_created ON students;
CREATE TRIGGER on_student_created
  AFTER INSERT ON students
  FOR EACH ROW EXECUTE FUNCTION generate_student_qr();

-- =====================================================
-- 14. TRIGGER AUTO-GÉNÉRATION QR CODE ENSEIGNANT
-- =====================================================
CREATE OR REPLACE FUNCTION generate_teacher_qr()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.qr_codes (school_id, user_id, user_type, qr_data, barcode_data)
  VALUES (
    NEW.school_id,
    NEW.user_id,
    'TEACHER',
    'EDUCI:T:' || NEW.id::text || ':' || NEW.user_id::text,
    'EDUCIT' || LEFT(REPLACE(NEW.id::text, '-', ''), 12)
  )
  ON CONFLICT (qr_data) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_teacher_created ON teachers;
CREATE TRIGGER on_teacher_created
  AFTER INSERT ON teachers
  FOR EACH ROW EXECUTE FUNCTION generate_teacher_qr();

-- =====================================================
-- 15. TRIGGER AUTO-GÉNÉRATION QR CODE STAFF
-- =====================================================
CREATE OR REPLACE FUNCTION generate_staff_qr()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.qr_codes (school_id, user_id, user_type, qr_data, barcode_data)
  VALUES (
    NEW.school_id,
    NEW.user_id,
    'STAFF',
    'EDUCI:P:' || NEW.id::text || ':' || NEW.user_id::text,
    'EDUCIP' || LEFT(REPLACE(NEW.id::text, '-', ''), 12)
  )
  ON CONFLICT (qr_data) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_staff_created ON staff;
CREATE TRIGGER on_staff_created
  AFTER INSERT ON staff
  FOR EACH ROW EXECUTE FUNCTION generate_staff_qr();

-- =====================================================
-- 16. TRIGGER NOTIFICATION PARENT SUR SCAN PRÉSENCE
-- =====================================================
CREATE OR REPLACE FUNCTION notify_parent_on_attendance()
RETURNS TRIGGER AS $$
DECLARE
  v_student_name TEXT;
  v_parent_user_id UUID;
BEGIN
  SELECT u.name INTO v_student_name
  FROM students s JOIN users u ON s.user_id = u.id
  WHERE s.id = NEW.student_id;

  FOR v_parent_user_id IN
    SELECT p.user_id FROM parents p
    JOIN parent_students ps ON ps.parent_id = p.id
    WHERE ps.student_id = NEW.student_id
  LOOP
    INSERT INTO notifications (user_id, title, body, type, data)
    VALUES (
      v_parent_user_id,
      CASE NEW.event_type
        WHEN 'ARRIVAL' THEN 'Arrivée confirmée'
        WHEN 'DEPARTURE' THEN 'Départ confirmé'
        WHEN 'CANTEEN' THEN 'Cantine'
        WHEN 'LIBRARY' THEN 'Bibliothèque'
        ELSE 'Pointage'
      END,
      v_student_name || ' - ' || NEW.event_type || ' à ' || to_char(NEW.scan_time, 'HH24:MI'),
      'ATTENDANCE',
      jsonb_build_object('student_id', NEW.student_id, 'event_type', NEW.event_type, 'scan_time', NEW.scan_time)
    );
  END LOOP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_attendance_event ON attendance_events;
CREATE TRIGGER on_attendance_event
  AFTER INSERT ON attendance_events
  FOR EACH ROW EXECUTE FUNCTION notify_parent_on_attendance();

-- =====================================================
-- 17. FONCTION SCAN QR COMPLET
-- =====================================================
CREATE OR REPLACE FUNCTION scan_qr_attendance(
  p_qr_data TEXT,
  p_event_type TEXT,
  p_scanned_by UUID,
  p_latitude REAL DEFAULT NULL,
  p_longitude REAL DEFAULT NULL,
  p_device_info TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  v_qr qr_codes%ROWTYPE;
  v_student students%ROWTYPE;
  v_event_id UUID;
BEGIN
  SELECT * INTO v_qr FROM qr_codes WHERE qr_data = p_qr_data AND is_active = true;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'QR code invalide ou désactivé');
  END IF;

  UPDATE qr_codes SET last_scanned_at = now(), scan_count = scan_count + 1 WHERE id = v_qr.id;

  IF v_qr.user_type = 'STUDENT' THEN
    SELECT * INTO v_student FROM students WHERE user_id = v_qr.user_id;
    IF NOT FOUND THEN
      RETURN jsonb_build_object('success', false, 'error', 'Élève non trouvé');
    END IF;

    INSERT INTO attendance_events (school_id, student_id, user_id, event_type, scanned_by, qr_code_id, latitude, longitude, device_info)
    VALUES (v_qr.school_id, v_student.id, v_qr.user_id, p_event_type, p_scanned_by, v_qr.id, p_latitude, p_longitude, p_device_info)
    RETURNING id INTO v_event_id;

    RETURN jsonb_build_object(
      'success', true,
      'event_id', v_event_id,
      'student_name', (SELECT name FROM users WHERE id = v_qr.user_id),
      'event_type', p_event_type,
      'time', now()
    );
  ELSE
    RETURN jsonb_build_object('success', true, 'user_type', v_qr.user_type, 'message', 'Pointage enregistré');
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 18. ACTIVER REALTIME SUR NOUVELLES TABLES
-- =====================================================
ALTER PUBLICATION supabase_realtime ADD TABLE attendance_events;
ALTER PUBLICATION supabase_realtime ADD TABLE qr_codes;
ALTER PUBLICATION supabase_realtime ADD TABLE parent_students;
ALTER PUBLICATION supabase_realtime ADD TABLE documents;

-- =====================================================
-- 19. PERMISSIONS PAR DÉFAUT POUR NOUVEAU SCHOOL
-- =====================================================
CREATE OR REPLACE FUNCTION create_default_permissions()
RETURNS TRIGGER AS $$
DECLARE
  v_roles TEXT[] := ARRAY['ADMIN', 'TEACHER', 'STUDENT', 'PARENT', 'COMPTABLE', 'SECRETAIRE', 'CENSEUR', 'SURVEILLANT'];
  v_resources TEXT[] := ARRAY['students', 'teachers', 'classes', 'grades', 'attendance', 'payments', 'bulletins', 'messages', 'documents', 'settings'];
  v_role TEXT;
  v_resource TEXT;
BEGIN
  FOREACH v_role IN ARRAY v_roles LOOP
    FOREACH v_resource IN ARRAY v_resources LOOP
      INSERT INTO permissions (school_id, role, resource, can_create, can_read, can_update, can_delete, can_export)
      VALUES (
        NEW.id, v_role, v_resource,
        v_role IN ('ADMIN', 'SECRETAIRE'),
        true,
        v_role IN ('ADMIN', 'TEACHER', 'COMPTABLE', 'SECRETAIRE'),
        v_role = 'ADMIN',
        v_role IN ('ADMIN', 'COMPTABLE', 'SECRETAIRE')
      )
      ON CONFLICT (school_id, role, resource) DO NOTHING;
    END LOOP;
  END LOOP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_school_created_permissions ON schools;
CREATE TRIGGER on_school_created_permissions
  AFTER INSERT ON schools
  FOR EACH ROW EXECUTE FUNCTION create_default_permissions();
