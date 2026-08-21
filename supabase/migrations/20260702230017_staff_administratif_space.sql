-- =====================================================
-- MIGRATION: ESPACE PERSONNEL ADMINISTRATIF
-- Date: 2026-07-02
-- Description: Tables staff_attendance, visitors,
--   staff_invitations + modifications users +
--   RLS, triggers, functions, permissions
-- =====================================================

-- =====================================================
-- 1. MODIFICATIONS TABLE USERS
-- =====================================================
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_first_login BOOLEAN DEFAULT true;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_password_change TIMESTAMPTZ;

-- =====================================================
-- 2. TABLE STAFF_ATTENDANCE (pointage personnel)
-- =====================================================
CREATE TABLE IF NOT EXISTS staff_attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  check_in_time TIMESTAMPTZ,
  check_out_time TIMESTAMPTZ,
  break_start TIMESTAMPTZ,
  break_end TIMESTAMPTZ,
  service_start TIMESTAMPTZ,
  reprise_time TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'ABSENT'
    CHECK (status IN ('PRESENT', 'LATE', 'ABSENT', 'DEPARTED', 'ON_BREAK')),
  method TEXT DEFAULT 'MANUAL'
    CHECK (method IN ('QR', 'GPS', 'NFC', 'BIOMETRIC', 'BLUETOOTH', 'MANUAL')),
  latitude REAL,
  longitude REAL,
  qr_verified BOOLEAN DEFAULT false,
  late_minutes INTEGER DEFAULT 0,
  total_work_minutes INTEGER DEFAULT 0,
  break_minutes INTEGER DEFAULT 0,
  recorded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  recorded_by_type TEXT DEFAULT 'SELF'
    CHECK (recorded_by_type IN ('SELF', 'SURVEILLANT', 'ADMIN')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(staff_id, date)
);

CREATE INDEX IF NOT EXISTS idx_staff_attendance_school_id ON staff_attendance(school_id);
CREATE INDEX IF NOT EXISTS idx_staff_attendance_staff_id ON staff_attendance(staff_id);
CREATE INDEX IF NOT EXISTS idx_staff_attendance_user_id ON staff_attendance(user_id);
CREATE INDEX IF NOT EXISTS idx_staff_attendance_date ON staff_attendance(date);
CREATE INDEX IF NOT EXISTS idx_staff_attendance_status ON staff_attendance(status);

ALTER TABLE staff_attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "staff_attendance_select" ON staff_attendance FOR SELECT
  USING (school_id = get_user_school_id() OR is_super_admin());
CREATE POLICY "staff_attendance_insert" ON staff_attendance FOR INSERT
  WITH CHECK (school_id = get_user_school_id() OR is_super_admin());
CREATE POLICY "staff_attendance_update" ON staff_attendance FOR UPDATE
  USING (school_id = get_user_school_id() OR is_super_admin());
CREATE POLICY "staff_attendance_delete" ON staff_attendance FOR DELETE
  USING (is_super_admin() OR (school_id = get_user_school_id() AND get_user_role() = 'ADMIN'));

COMMENT ON TABLE staff_attendance IS 'Pointage du personnel administratif: arrival, breaks, service, departure';

-- =====================================================
-- 3. TABLE VISITORS (registre visiteurs)
-- =====================================================
CREATE TABLE IF NOT EXISTS visitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  visitor_name TEXT NOT NULL,
  visitor_phone TEXT,
  visitor_id_type TEXT DEFAULT 'CNI'
    CHECK (visitor_id_type IN ('CNI', 'PASSPORT', 'PERMIS', 'AUTRE')),
  visitor_id_number TEXT,
  photo_url TEXT,
  purpose TEXT NOT NULL,
  person_to_visit TEXT NOT NULL,
  person_role TEXT,
  badge_number TEXT,
  badge_qr_code TEXT,
  entry_time TIMESTAMPTZ DEFAULT now(),
  exit_time TIMESTAMPTZ,
  status TEXT DEFAULT 'INSIDE'
    CHECK (status IN ('INSIDE', 'EXITED', 'CANCELLED')),
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_visitors_school_id ON visitors(school_id);
CREATE INDEX IF NOT EXISTS idx_visitors_status ON visitors(status);
CREATE INDEX IF NOT EXISTS idx_visitors_entry_time ON visitors(entry_time);

ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "visitors_select" ON visitors FOR SELECT
  USING (school_id = get_user_school_id() OR is_super_admin());
CREATE POLICY "visitors_insert" ON visitors FOR INSERT
  WITH CHECK (school_id = get_user_school_id() OR is_super_admin());
CREATE POLICY "visitors_update" ON visitors FOR UPDATE
  USING (school_id = get_user_school_id() OR is_super_admin());
CREATE POLICY "visitors_delete" ON visitors FOR DELETE
  USING (is_super_admin() OR (school_id = get_user_school_id() AND get_user_role() = 'ADMIN'));

COMMENT ON TABLE visitors IS 'Registre numerique des visiteurs avec badge QR temporaire';

-- =====================================================
-- 4. TABLE STAFF_INVITATIONS (invitations personnel)
-- =====================================================
CREATE TABLE IF NOT EXISTS staff_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  position TEXT NOT NULL,
  department TEXT,
  invitation_token TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'PENDING'
    CHECK (status IN ('PENDING', 'ACCEPTED', 'EXPIRED', 'CANCELLED')),
  invited_by UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '7 days'),
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_staff_invitations_school_id ON staff_invitations(school_id);
CREATE INDEX IF NOT EXISTS idx_staff_invitations_token ON staff_invitations(invitation_token);
CREATE INDEX IF NOT EXISTS idx_staff_invitations_status ON staff_invitations(status);

ALTER TABLE staff_invitations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "staff_invitations_select" ON staff_invitations FOR SELECT
  USING (school_id = get_user_school_id() OR is_super_admin());
CREATE POLICY "staff_invitations_insert" ON staff_invitations FOR INSERT
  WITH CHECK (school_id = get_user_school_id() OR is_super_admin());
CREATE POLICY "staff_invitations_update" ON staff_invitations FOR UPDATE
  USING (school_id = get_user_school_id() OR is_super_admin());

COMMENT ON TABLE staff_invitations IS 'Invitations envoyees aux membres du personnel via Resend';

-- =====================================================
-- 5. FONCTIONS UTILITAIRES
-- =====================================================

-- Verifier les conflits de pointage (double pointage, horaires incoherents)
CREATE OR REPLACE FUNCTION check_staff_attendance_conflicts(
  p_staff_id UUID,
  p_action TEXT,
  p_timestamp TIMESTAMPTZ DEFAULT now()
)
RETURNS TABLE(has_conflict BOOLEAN, message TEXT) AS $$
DECLARE
  v_today DATE := p_timestamp::date;
  v_existing RECORD;
BEGIN
  SELECT * INTO v_existing
  FROM staff_attendance
  WHERE staff_id = p_staff_id AND date = v_today;

  IF NOT FOUND THEN
    -- Pas d'enregistrement aujourd'hui
    IF p_action = 'CHECK_OUT' OR p_action = 'BREAK_START' OR p_action = 'BREAK_END' OR p_action = 'REPRISE' THEN
      RETURN QUERY SELECT true, 'Aucun pointage dadjournee. Veuillez dabord enregistrer votre arrivee.'::TEXT;
      RETURN;
    END IF;
    RETURN QUERY SELECT false, ''::TEXT;
    RETURN;
  END IF;

  -- Verifier double arrivee
  IF p_action = 'CHECK_IN' AND v_existing.check_in_time IS NOT NULL THEN
    RETURN QUERY SELECT true, 'Pointage deja effectue pour aujourd hui.'::TEXT;
    RETURN;
  END IF;

  -- Verifier depart sans arrivee
  IF p_action = 'CHECK_OUT' AND v_existing.check_in_time IS NULL THEN
    RETURN QUERY SELECT true, 'Impossible de pointer le depart sans arrivee.'::TEXT;
    RETURN;
  END IF;

  -- Verifier depart deja effectue
  IF p_action = 'CHECK_OUT' AND v_existing.check_out_time IS NOT NULL THEN
    RETURN QUERY SELECT true, 'Depart deja enregistre pour aujourd hui.'::TEXT;
    RETURN;
  END IF;

  -- Verifier pause deja commencee
  IF p_action = 'BREAK_START' AND v_existing.break_start IS NOT NULL THEN
    RETURN QUERY SELECT true, 'Pause deja commencee.'::TEXT;
    RETURN;
  END IF;

  -- Verifier fin de pause sans debut
  IF p_action = 'BREAK_END' AND v_existing.break_start IS NULL THEN
    RETURN QUERY SELECT true, 'Aucune pause en cours.'::TEXT;
    RETURN;
  END IF;

  -- Verifier fin de pause deja effectuee
  IF p_action = 'BREAK_END' AND v_existing.break_end IS NOT NULL THEN
    RETURN QUERY SELECT true, 'Pause deja terminee.'::TEXT;
    RETURN;
  END IF;

  -- Verifier reprise sans pause
  IF p_action = 'REPRISE' AND v_existing.break_start IS NULL THEN
    RETURN QUERY SELECT true, 'Aucune pause en cours pour la reprise.'::TEXT;
    RETURN;
  END IF;

  -- Verifier horaires incoherents: fin de pause avant debut de pause
  IF p_action = 'BREAK_END' AND v_existing.break_start IS NOT NULL
     AND p_timestamp < v_existing.break_start THEN
    RETURN QUERY SELECT true, 'La fin de pause ne peut etre avant le debut de pause.'::TEXT;
    RETURN;
  END IF;

  RETURN QUERY SELECT false, ''::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Calculer la duree totale de travail
CREATE OR REPLACE FUNCTION calculate_work_duration()
RETURNS TRIGGER AS $$
DECLARE
  v_work_minutes INTEGER := 0;
  v_break_minutes INTEGER := 0;
BEGIN
  IF NEW.check_in_time IS NOT NULL AND NEW.check_out_time IS NOT NULL THEN
    v_work_minutes := EXTRACT(EPOCH FROM (NEW.check_out_time - NEW.check_in_time)) / 60;

    IF NEW.break_start IS NOT NULL AND NEW.break_end IS NOT NULL THEN
      v_break_minutes := EXTRACT(EPOCH FROM (NEW.break_end - NEW.break_start)) / 60;
      v_work_minutes := v_work_minutes - v_break_minutes;
    END IF;

    NEW.total_work_minutes := GREATEST(v_work_minutes, 0);
    NEW.break_minutes := v_break_minutes;
  END IF;

  -- Calculer les minutes de retard (seuil: 07:30)
  IF NEW.check_in_time IS NOT NULL AND NEW.late_minutes = 0 THEN
    IF EXTRACT(HOUR FROM NEW.check_in_time) > 7
       OR (EXTRACT(HOUR FROM NEW.check_in_time) = 7 AND EXTRACT(MINUTE FROM NEW.check_in_time) > 30) THEN
      NEW.late_minutes := (EXTRACT(HOUR FROM NEW.check_in_time) - 7) * 60
                          + EXTRACT(MINUTE FROM NEW.check_in_time) - 30;
    END IF;
  END IF;

  -- Mettre a jour le statut
  IF NEW.check_out_time IS NOT NULL THEN
    NEW.status := 'DEPARTED';
  ELSIF NEW.break_start IS NOT NULL AND NEW.break_end IS NULL THEN
    NEW.status := 'ON_BREAK';
  ELSIF NEW.check_in_time IS NOT NULL THEN
    IF NEW.late_minutes > 0 THEN
      NEW.status := 'LATE';
    ELSE
      NEW.status := 'PRESENT';
    END IF;
  END IF;

  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Generer un badge visiteur
CREATE OR REPLACE FUNCTION generate_visitor_badge()
RETURNS TRIGGER AS $$
DECLARE
  v_badge_num TEXT;
BEGIN
  v_badge_num := 'VIS-' || TO_CHAR(now(), 'YYYYMMDD') || '-' || LEFT(REPLACE(NEW.id::text, '-', ''), 8);
  NEW.badge_number := v_badge_num;
  NEW.badge_qr_code := 'EDUCI:V:' || NEW.id::text || ':' || NEW.school_id::text;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 6. TRIGGERS
-- =====================================================

-- Trigger: calculer duree de travail avant update
DROP TRIGGER IF EXISTS calculate_staff_work_duration ON staff_attendance;
CREATE TRIGGER calculate_staff_work_duration
  BEFORE UPDATE ON staff_attendance
  FOR EACH ROW EXECUTE FUNCTION calculate_work_duration();

-- Trigger: generer badge visiteur avant insert
DROP TRIGGER IF EXISTS generate_visitor_badge_trigger ON visitors;
CREATE TRIGGER generate_visitor_badge_trigger
  BEFORE INSERT ON visitors
  FOR EACH ROW EXECUTE FUNCTION generate_visitor_badge();

-- Trigger: updated_at pour staff_attendance
DROP TRIGGER IF EXISTS update_staff_attendance_updated_at ON staff_attendance;
CREATE TRIGGER update_staff_attendance_updated_at
  BEFORE UPDATE ON staff_attendance
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger: updated_at pour visitors
DROP TRIGGER IF EXISTS update_visitors_updated_at ON visitors;
CREATE TRIGGER update_visitors_updated_at
  BEFORE UPDATE ON visitors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger: updated_at pour staff_invitations
DROP TRIGGER IF EXISTS update_staff_invitations_updated_at ON staff_invitations;
CREATE TRIGGER update_staff_invitations_updated_at
  BEFORE UPDATE ON staff_invitations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 7. PERMISSIONS SUPPLEMENTAIRES
-- =====================================================
-- Ajouter les nouvelles ressources dans les permissions par defaut
-- (sera applique aux prochaines ecoles via create_default_permissions)

-- Permissions pour SURVEILLANT: lecture pointage + gestion visiteurs
DO $$
DECLARE
  v_school RECORD;
BEGIN
  FOR v_school IN SELECT id FROM schools LOOP
    -- staff_management
    INSERT INTO permissions (school_id, role, resource, can_create, can_read, can_update, can_delete, can_export)
    VALUES (v_school.id, 'ADMIN', 'staff_management', true, true, true, true, true)
    ON CONFLICT (school_id, role, resource) DO NOTHING;

    INSERT INTO permissions (school_id, role, resource, can_create, can_read, can_update, can_delete, can_export)
    VALUES (v_school.id, 'SECRETAIRE', 'staff_management', false, true, false, false, false)
    ON CONFLICT (school_id, role, resource) DO NOTHING;

    -- visitors
    INSERT INTO permissions (school_id, role, resource, can_create, can_read, can_update, can_delete, can_export)
    VALUES (v_school.id, 'ADMIN', 'visitors', true, true, true, true, true)
    ON CONFLICT (school_id, role, resource) DO NOTHING;

    INSERT INTO permissions (school_id, role, resource, can_create, can_read, can_update, can_delete, can_export)
    VALUES (v_school.id, 'SURVEILLANT', 'visitors', true, true, true, false, false)
    ON CONFLICT (school_id, role, resource) DO NOTHING;

    INSERT INTO permissions (school_id, role, resource, can_create, can_read, can_update, can_delete, can_export)
    VALUES (v_school.id, 'SECRETAIRE', 'visitors', true, true, false, false, false)
    ON CONFLICT (school_id, role, resource) DO NOTHING;

    INSERT INTO permissions (school_id, role, resource, can_create, can_read, can_update, can_delete, can_export)
    VALUES (v_school.id, 'COMPTABLE', 'visitors', false, true, false, false, false)
    ON CONFLICT (school_id, role, resource) DO NOTHING;

    INSERT INTO permissions (school_id, role, resource, can_create, can_read, can_update, can_delete, can_export)
    VALUES (v_school.id, 'CENSEUR', 'visitors', true, true, false, false, false)
    ON CONFLICT (school_id, role, resource) DO NOTHING;

    INSERT INTO permissions (school_id, role, resource, can_create, can_read, can_update, can_delete, can_export)
    VALUES (v_school.id, 'TEACHER', 'visitors', false, true, false, false, false)
    ON CONFLICT (school_id, role, resource) DO NOTHING;

    -- staff_attendance
    INSERT INTO permissions (school_id, role, resource, can_create, can_read, can_update, can_delete, can_export)
    VALUES (v_school.id, 'ADMIN', 'staff_attendance', true, true, true, true, true)
    ON CONFLICT (school_id, role, resource) DO NOTHING;

    INSERT INTO permissions (school_id, role, resource, can_create, can_read, can_update, can_delete, can_export)
    VALUES (v_school.id, 'SURVEILLANT', 'staff_attendance', true, true, false, false, false)
    ON CONFLICT (school_id, role, resource) DO NOTHING;

    INSERT INTO permissions (school_id, role, resource, can_create, can_read, can_update, can_delete, can_export)
    VALUES (v_school.id, 'SECRETAIRE', 'staff_attendance', false, true, false, false, false)
    ON CONFLICT (school_id, role, resource) DO NOTHING;

    INSERT INTO permissions (school_id, role, resource, can_create, can_read, can_update, can_delete, can_export)
    VALUES (v_school.id, 'COMPTABLE', 'staff_attendance', false, true, false, false, false)
    ON CONFLICT (school_id, role, resource) DO NOTHING;
  END LOOP;
END $$;

-- =====================================================
-- 8. MISE A JOUR FONCTION create_default_permissions
-- =====================================================
-- Ajoute les nouvelles ressources pour les futures ecoles
CREATE OR REPLACE FUNCTION create_default_permissions()
RETURNS TRIGGER AS $$
DECLARE
  v_roles TEXT[] := ARRAY['ADMIN', 'TEACHER', 'STUDENT', 'PARENT', 'COMPTABLE', 'SECRETAIRE', 'CENSEUR', 'SURVEILLANT'];
  v_resources TEXT[] := ARRAY['students', 'teachers', 'classes', 'grades', 'attendance', 'payments', 'bulletins', 'messages', 'documents', 'settings', 'staff_management', 'visitors', 'staff_attendance'];
  v_role TEXT;
  v_resource TEXT;
BEGIN
  FOREACH v_role IN ARRAY v_roles LOOP
    FOREACH v_resource IN ARRAY v_resources LOOP
      INSERT INTO permissions (school_id, role, resource, can_create, can_read, can_update, can_delete, can_export)
      VALUES (
        NEW.id, v_role, v_resource,
        -- can_create: ADMIN, SECRETAIRE + SURVEILLANT pour visitors/staff_attendance
        (v_role IN ('ADMIN', 'SECRETAIRE')
         OR (v_role = 'SURVEILLANT' AND v_resource IN ('visitors', 'staff_attendance'))),
        -- can_read: toujours true
        true,
        -- can_update: ADMIN, TEACHER, COMPTABLE, SECRETAIRE + SURVEILLANT pour visitors
        (v_role IN ('ADMIN', 'TEACHER', 'COMPTABLE', 'SECRETAIRE')
         OR (v_role = 'SURVEILLANT' AND v_resource = 'visitors')),
        -- can_delete: ADMIN uniquement
        v_role = 'ADMIN',
        -- can_export: ADMIN, COMPTABLE, SECRETAIRE
        v_role IN ('ADMIN', 'COMPTABLE', 'SECRETAIRE')
      )
      ON CONFLICT (school_id, role, resource) DO NOTHING;
    END LOOP;
  END LOOP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 9. ENABLE REALTIME
-- =====================================================
ALTER PUBLICATION supabase_realtime ADD TABLE staff_attendance;
ALTER PUBLICATION supabase_realtime ADD TABLE visitors;

-- =====================================================
-- 10. FONCTION: pointage staff par surveillant
-- =====================================================
CREATE OR REPLACE FUNCTION record_staff_attendance_by_surveillant(
  p_staff_id UUID,
  p_action TEXT,
  p_operator_id UUID
)
RETURNS TABLE(success BOOLEAN, message TEXT, attendance_id UUID) AS $$
DECLARE
  v_today DATE := CURRENT_DATE;
  v_existing RECORD;
  v_staff RECORD;
  v_result RECORD;
BEGIN
  -- Verifier que l operateur est un surveillant ou admin
  IF NOT EXISTS (
    SELECT 1 FROM users
    WHERE id = p_operator_id
    AND role IN ('SURVEILLANT', 'ADMIN')
    AND is_active = true
  ) THEN
    RETURN QUERY SELECT false, 'Non autorise. Seuls les surveillants et admins peuvent effectuer cette operation.'::TEXT, NULL::UUID;
    RETURN;
  END IF;

  -- Verifier que le staff existe et est actif
  SELECT s.*, u.role as user_role INTO v_staff
  FROM staff s
  JOIN users u ON u.id = s.user_id
  WHERE s.id = p_staff_id AND s.is_active = true;

  IF NOT FOUND THEN
    RETURN QUERY SELECT false, 'Membre du personnel non trouve ou inactif.'::TEXT, NULL::UUID;
    RETURN;
  END IF;

  -- Recuperer l enregistrement existant
  SELECT * INTO v_existing
  FROM staff_attendance
  WHERE staff_id = p_staff_id AND date = v_today;

  IF p_action = 'ARRIVAL' THEN
    IF FOUND AND v_existing.check_in_time IS NOT NULL THEN
      RETURN QUERY SELECT false, 'Arrivee deja enregistree pour ce jour.'::TEXT, v_existing.id;
      RETURN;
    END IF;

    IF FOUND THEN
      UPDATE staff_attendance SET
        check_in_time = now(),
        recorded_by = p_operator_id,
        recorded_by_type = 'SURVEILLANT'
      WHERE id = v_existing.id
      RETURNING id INTO v_result;
    ELSE
      INSERT INTO staff_attendance (staff_id, user_id, school_id, date, check_in_time, status, method, recorded_by, recorded_by_type)
      VALUES (p_staff_id, v_staff.user_id, v_staff.school_id, v_today, now(), 'PRESENT', 'MANUAL', p_operator_id, 'SURVEILLANT')
      RETURNING id INTO v_result;
    END IF;

    RETURN QUERY SELECT true, 'Arrivee enregistree avec succes.'::TEXT, v_result.id;

  ELSIF p_action = 'DEPARTURE' THEN
    IF NOT FOUND OR v_existing.check_in_time IS NULL THEN
      RETURN QUERY SELECT false, 'Aucune arrivee enregistree. Impossible d enregistrer le depart.'::TEXT, NULL::UUID;
      RETURN;
    END IF;
    IF v_existing.check_out_time IS NOT NULL THEN
      RETURN QUERY SELECT false, 'Depart deja enregistre pour ce jour.'::TEXT, v_existing.id;
      RETURN;
    END IF;

    UPDATE staff_attendance SET
      check_out_time = now(),
      recorded_by = p_operator_id,
      recorded_by_type = 'SURVEILLANT'
    WHERE id = v_existing.id
    RETURNING id INTO v_result;

    RETURN QUERY SELECT true, 'Depart enregistre avec succes.'::TEXT, v_result.id;

  ELSIF p_action = 'ABSENCE' THEN
    IF NOT FOUND THEN
      INSERT INTO staff_attendance (staff_id, user_id, school_id, date, status, recorded_by, recorded_by_type, notes)
      VALUES (p_staff_id, v_staff.user_id, v_staff.school_id, v_today, 'ABSENT', p_operator_id, 'SURVEILLANT', 'Absence signalee par surveillant')
      RETURNING id INTO v_result;
    ELSIF v_existing.status != 'ABSENT' THEN
      RETURN QUERY SELECT false, 'Ce membre du personnel est deja marque present/late.'::TEXT, v_existing.id;
      RETURN;
    ELSE
      v_result.id := v_existing.id;
    END IF;

    RETURN QUERY SELECT true, 'Absence enregistree.'::TEXT, v_result.id;

  ELSE
    RETURN QUERY SELECT false, 'Action non reconnue. Utilisez: ARRIVAL, DEPARTURE, ABSENCE.'::TEXT, NULL::UUID;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
