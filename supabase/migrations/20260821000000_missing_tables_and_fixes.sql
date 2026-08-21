-- =============================================================
-- MISSING TABLES — Referenced in code but not in migrations
-- Date: 2026-08-21
-- =============================================================

-- 1. STUDENT_GUARDIANS — Parent/guardian info for students (phone, email, etc.)
CREATE TABLE IF NOT EXISTS student_guardians (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relationship TEXT NOT NULL DEFAULT 'parent' CHECK (relationship IN ('parent', 'tuteur', 'autre')),
  phone TEXT,
  email TEXT,
  address TEXT,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  is_emergency_contact BOOLEAN NOT NULL DEFAULT false,
  occupation TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_student_guardians_school ON student_guardians(school_id);
CREATE INDEX IF NOT EXISTS idx_student_guardians_student ON student_guardians(student_id);
CREATE INDEX IF NOT EXISTS idx_student_guardians_phone ON student_guardians(phone) WHERE phone IS NOT NULL;

ALTER TABLE student_guardians ENABLE ROW LEVEL SECURITY;

CREATE POLICY student_guardians_school_isolation ON student_guardians
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

-- 2. ATTENDANCE_SETTINGS — Per-school attendance configuration
CREATE TABLE IF NOT EXISTS attendance_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE UNIQUE,
  qr_enabled BOOLEAN NOT NULL DEFAULT true,
  gps_enabled BOOLEAN NOT NULL DEFAULT false,
  nfc_enabled BOOLEAN NOT NULL DEFAULT false,
  face_enabled BOOLEAN NOT NULL DEFAULT false,
  gps_radius_meters INTEGER NOT NULL DEFAULT 100,
  late_threshold_minutes INTEGER NOT NULL DEFAULT 15,
  auto_absent_after_minutes INTEGER NOT NULL DEFAULT 60,
  allow_self_check_in BOOLEAN NOT NULL DEFAULT false,
  require_justification BOOLEAN NOT NULL DEFAULT true,
  notification_parent_absent BOOLEAN NOT NULL DEFAULT false,
  notification_parent_late BOOLEAN NOT NULL DEFAULT false,
  sms_provider TEXT DEFAULT 'mtn_momo',
  sms_enabled BOOLEAN NOT NULL DEFAULT false,
  config JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_attendance_settings_school ON attendance_settings(school_id);

ALTER TABLE attendance_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY attendance_settings_school_isolation ON attendance_settings
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

-- 3. ATTENDANCE_POLICIES — Rules for attendance (auto-absent, late policies, etc.)
CREATE TABLE IF NOT EXISTS attendance_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  late_threshold_minutes INTEGER NOT NULL DEFAULT 15,
  absent_threshold_minutes INTEGER NOT NULL DEFAULT 60,
  max_lates_per_month INTEGER,
  penalty_after_lates TEXT,
  auto_absent_enabled BOOLEAN NOT NULL DEFAULT false,
  weekend_penalty BOOLEAN NOT NULL DEFAULT false,
  holiday_penalty BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_attendance_policies_school ON attendance_policies(school_id);

ALTER TABLE attendance_policies ENABLE ROW LEVEL SECURITY;

CREATE POLICY attendance_policies_school_isolation ON attendance_policies
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

-- 4. NFC_TAGS — NFC cards/devices for attendance scanning
CREATE TABLE IF NOT EXISTS nfc_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  tag_uid TEXT NOT NULL,
  tag_type TEXT NOT NULL DEFAULT 'CARD' CHECK (tag_type IN ('CARD', 'WRISTBAND', 'BADGE', 'STICKER')),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  student_id UUID REFERENCES students(id) ON DELETE SET NULL,
  teacher_id UUID REFERENCES teachers(id) ON DELETE SET NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  assigned_at TIMESTAMPTZ,
  last_scanned_at TIMESTAMPTZ,
  scan_count INTEGER NOT NULL DEFAULT 0,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_nfc_tags_uid_school ON nfc_tags(tag_uid, school_id);
CREATE INDEX IF NOT EXISTS idx_nfc_tags_school ON nfc_tags(school_id);
CREATE INDEX IF NOT EXISTS idx_nfc_tags_user ON nfc_tags(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_nfc_tags_student ON nfc_tags(student_id) WHERE student_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_nfc_tags_active ON nfc_tags(is_active) WHERE is_active = true;

ALTER TABLE nfc_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY nfc_tags_school_isolation ON nfc_tags
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

-- 5. FACE_TEMPLATES — Face recognition data for students/teachers
CREATE TABLE IF NOT EXISTS face_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE SET NULL,
  teacher_id UUID REFERENCES teachers(id) ON DELETE SET NULL,
  template_data TEXT NOT NULL,
  embedding JSONB,
  quality_score NUMERIC DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_recognized_at TIMESTAMPTZ,
  recognition_count INTEGER NOT NULL DEFAULT 0,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_face_templates_school ON face_templates(school_id);
CREATE INDEX IF NOT EXISTS idx_face_templates_user ON face_templates(user_id);
CREATE INDEX IF NOT EXISTS idx_face_templates_student ON face_templates(student_id) WHERE student_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_face_templates_active ON face_templates(is_active) WHERE is_active = true;

ALTER TABLE face_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY face_templates_school_isolation ON face_templates
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

-- 6. SCHOOL_LOCATIONS — GPS geofence points for attendance
CREATE TABLE IF NOT EXISTS school_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'École principale',
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL,
  radius_meters INTEGER NOT NULL DEFAULT 100,
  description TEXT,
  location_type TEXT NOT NULL DEFAULT 'SCHOOL' CHECK (location_type IN ('SCHOOL', 'CLASSROOM', 'SPORTS_FIELD', 'ENTRANCE', 'PARKING', 'OTHER')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_school_locations_school ON school_locations(school_id);
CREATE INDEX IF NOT EXISTS idx_school_locations_active ON school_locations(is_active) WHERE is_active = true;

ALTER TABLE school_locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY school_locations_school_isolation ON school_locations
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

-- 7. ATTENDANCE_DEVICES — Registered devices for attendance
CREATE TABLE IF NOT EXISTS attendance_devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  device_name TEXT NOT NULL,
  device_type TEXT NOT NULL DEFAULT 'TABLET' CHECK (device_type IN ('TABLET', 'PHONE', 'KIOSK', 'DESKTOP', 'NFC_READER', 'QR_SCANNER')),
  device_id TEXT NOT NULL,
  location_id UUID REFERENCES school_locations(id) ON DELETE SET NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_seen_at TIMESTAMPTZ,
  ip_address TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_attendance_devices_id_school ON attendance_devices(device_id, school_id);
CREATE INDEX IF NOT EXISTS idx_attendance_devices_school ON attendance_devices(school_id);

ALTER TABLE attendance_devices ENABLE ROW LEVEL SECURITY;

CREATE POLICY attendance_devices_school_isolation ON attendance_devices
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

-- 8. ATTENDANCE_CORRECTIONS — Correction requests from teachers/directors
CREATE TABLE IF NOT EXISTS attendance_corrections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  attendance_id UUID REFERENCES attendance(id) ON DELETE SET NULL,
  requested_by UUID NOT NULL REFERENCES users(id),
  approved_by UUID REFERENCES users(id),
  original_status TEXT NOT NULL,
  corrected_status TEXT NOT NULL CHECK (corrected_status IN ('PRESENT', 'ABSENT', 'LATE', 'EXCUSED')),
  reason TEXT NOT NULL,
  evidence_url TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
  reviewed_at TIMESTAMPTZ,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_attendance_corrections_school ON attendance_corrections(school_id);
CREATE INDEX IF NOT EXISTS idx_attendance_corrections_student ON attendance_corrections(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_corrections_status ON attendance_corrections(status);

ALTER TABLE attendance_corrections ENABLE ROW LEVEL SECURITY;

CREATE POLICY attendance_corrections_school_isolation ON attendance_corrections
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

-- 9. ATTENDANCE_ALERTS — Absence/late alerts for parents/admin
CREATE TABLE IF NOT EXISTS attendance_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('ABSENT', 'LATE', 'MISSING', 'EARLY_DEPARTURE', 'UNEXCUSED')),
  severity TEXT NOT NULL DEFAULT 'LOW' CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
  message TEXT,
  notified_parent BOOLEAN NOT NULL DEFAULT false,
  notified_at TIMESTAMPTZ,
  acknowledged_at TIMESTAMPTZ,
  acknowledged_by UUID REFERENCES users(id),
  is_resolved BOOLEAN NOT NULL DEFAULT false,
  resolved_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_attendance_alerts_school ON attendance_alerts(school_id);
CREATE INDEX IF NOT EXISTS idx_attendance_alerts_student ON attendance_alerts(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_alerts_unresolved ON attendance_alerts(is_resolved) WHERE is_resolved = false;

ALTER TABLE attendance_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY attendance_alerts_school_isolation ON attendance_alerts
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

-- 10. ATTENDANCE_JUSTIFICATIONS — Justifications from parents for absences
CREATE TABLE IF NOT EXISTS attendance_justifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES users(id),
  absence_date DATE NOT NULL,
  reason TEXT NOT NULL,
  document_url TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_attendance_justifications_school ON attendance_justifications(school_id);
CREATE INDEX IF NOT EXISTS idx_attendance_justifications_student ON attendance_justifications(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_justifications_status ON attendance_justifications(status);

ALTER TABLE attendance_justifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY attendance_justifications_school_isolation ON attendance_justifications
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

-- 11. ATTENDANCE_NOTIFICATIONS — In-app notifications for attendance events
CREATE TABLE IF NOT EXISTS attendance_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('ABSENT', 'LATE', 'JUSTIFICATION_APPROVED', 'JUSTIFICATION_REJECTED', 'ALERT')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  read_at TIMESTAMPTZ,
  related_student_id UUID REFERENCES students(id) ON DELETE SET NULL,
  related_attendance_id UUID REFERENCES attendance(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_attendance_notifications_user ON attendance_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_attendance_notifications_unread ON attendance_notifications(user_id, is_read) WHERE is_read = false;

ALTER TABLE attendance_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY attendance_notifications_user_isolation ON attendance_notifications
  FOR ALL USING (user_id = auth.uid());

-- 12. ATTENDANCE_REPORTS — Saved/generated attendance reports
CREATE TABLE IF NOT EXISTS attendance_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  report_type TEXT NOT NULL CHECK (report_type IN ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY', 'CLASS', 'CUSTOM')),
  title TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  filters JSONB DEFAULT '{}'::jsonb,
  data JSONB NOT NULL,
  generated_by UUID REFERENCES users(id),
  file_url TEXT,
  status TEXT NOT NULL DEFAULT 'GENERATED' CHECK (status IN ('PENDING', 'GENERATED', 'SENT', 'FAILED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_attendance_reports_school ON attendance_reports(school_id);
CREATE INDEX IF NOT EXISTS idx_attendance_reports_type ON attendance_reports(report_type);

ALTER TABLE attendance_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY attendance_reports_school_isolation ON attendance_reports
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

-- 13. ATTENDANCE_SYNC — Sync queue for offline attendance data
CREATE TABLE IF NOT EXISTS attendance_sync (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  device_id UUID REFERENCES attendance_devices(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES users(id),
  action TEXT NOT NULL CHECK (action IN ('CHECK_IN', 'CHECK_OUT', 'UPDATE', 'DELETE')),
  payload JSONB NOT NULL,
  sync_status TEXT NOT NULL DEFAULT 'PENDING' CHECK (sync_status IN ('PENDING', 'SYNCED', 'FAILED', 'CONFLICT')),
  synced_at TIMESTAMPTZ,
  error_message TEXT,
  retry_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_attendance_sync_pending ON attendance_sync(sync_status) WHERE sync_status = 'PENDING';
CREATE INDEX IF NOT EXISTS idx_attendance_sync_school ON attendance_sync(school_id);

ALTER TABLE attendance_sync ENABLE ROW LEVEL SECURITY;

CREATE POLICY attendance_sync_school_isolation ON attendance_sync
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

-- 14. ATTENDANCE_AUDIT_LOG — Audit trail for attendance modifications
CREATE TABLE IF NOT EXISTS attendance_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  attendance_id UUID REFERENCES attendance(id) ON DELETE SET NULL,
  student_id UUID REFERENCES students(id) ON DELETE SET NULL,
  action TEXT NOT NULL CHECK (action IN ('CREATE', 'UPDATE', 'DELETE', 'CORRECTION', 'EXPORT', 'BULK_UPDATE')),
  performed_by UUID NOT NULL REFERENCES users(id),
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_attendance_audit_log_school ON attendance_audit_log(school_id);
CREATE INDEX IF NOT EXISTS idx_attendance_audit_log_attendance ON attendance_audit_log(attendance_id);
CREATE INDEX IF NOT EXISTS idx_attendance_audit_log_created ON attendance_audit_log(created_at DESC);

ALTER TABLE attendance_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY attendance_audit_log_school_isolation ON attendance_audit_log
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

-- 15. ATTENDANCE_SESSIONS — Active attendance sessions (teacher opens a session, students check in)
CREATE TABLE IF NOT EXISTS attendance_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
  subject_id UUID REFERENCES subjects(id) ON DELETE SET NULL,
  session_type TEXT NOT NULL DEFAULT 'CLASS' CHECK (session_type IN ('CLASS', 'EXAM', 'EVENT', 'ACTIVITY')),
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'ENDED', 'CANCELLED')),
  qr_code TEXT,
  qr_expires_at TIMESTAMPTZ,
  location_id UUID REFERENCES school_locations(id) ON DELETE SET NULL,
  total_students INTEGER NOT NULL DEFAULT 0,
  present_count INTEGER NOT NULL DEFAULT 0,
  absent_count INTEGER NOT NULL DEFAULT 0,
  late_count INTEGER NOT NULL DEFAULT 0,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_attendance_sessions_school ON attendance_sessions(school_id);
CREATE INDEX IF NOT EXISTS idx_attendance_sessions_teacher ON attendance_sessions(teacher_id);
CREATE INDEX IF NOT EXISTS idx_attendance_sessions_active ON attendance_sessions(status) WHERE status = 'ACTIVE';

ALTER TABLE attendance_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY attendance_sessions_school_isolation ON attendance_sessions
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

-- 16. ATTENDANCE_QR_TOKENS — Secure tokens for QR-based check-in
CREATE TABLE IF NOT EXISTS attendance_qr_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES attendance_sessions(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_by UUID REFERENCES users(id),
  used_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_attendance_qr_tokens_session ON attendance_qr_tokens(session_id);
CREATE INDEX IF NOT EXISTS idx_attendance_qr_tokens_active ON attendance_qr_tokens(is_active, expires_at) WHERE is_active = true;

ALTER TABLE attendance_qr_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY attendance_qr_tokens_school_isolation ON attendance_qr_tokens
  FOR ALL USING (school_id = (current_setting('app.current_school_id', true))::uuid);

-- =============================================================
-- UPDATED_AT TRIGGERS
-- =============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all new tables
DO $$
DECLARE
  t TEXT;
BEGIN
  FOR t IN SELECT unnest(ARRAY[
    'student_guardians', 'attendance_settings', 'attendance_policies',
    'nfc_tags', 'face_templates', 'school_locations', 'attendance_devices',
    'attendance_corrections', 'attendance_justifications',
    'attendance_sync'
  ]) LOOP
    EXECUTE format(
      'CREATE TRIGGER update_%s_updated_at BEFORE UPDATE ON %s FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()',
      t, t
    );
  END LOOP;
END $$;

-- =============================================================
-- COMMENTS
-- =============================================================

COMMENT ON TABLE student_guardians IS 'Parent/guardian contact info for students — isolated by school_id';
COMMENT ON TABLE attendance_settings IS 'Per-school attendance configuration (QR, GPS, NFC, face toggles) — isolated by school_id';
COMMENT ON TABLE attendance_policies IS 'Attendance rules and penalty policies — isolated by school_id';
COMMENT ON TABLE nfc_tags IS 'NFC cards/devices assigned to users for attendance scanning — isolated by school_id';
COMMENT ON TABLE face_templates IS 'Face recognition enrollment data — isolated by school_id';
COMMENT ON TABLE school_locations IS 'GPS geofence points for location-based attendance — isolated by school_id';
COMMENT ON TABLE attendance_devices IS 'Registered devices for attendance capture — isolated by school_id';
COMMENT ON TABLE attendance_corrections IS 'Correction requests for attendance records — isolated by school_id';
COMMENT ON TABLE attendance_alerts IS 'Absence/late alerts for parents and admins — isolated by school_id';
COMMENT ON TABLE attendance_justifications IS 'Parent-submitted absence justifications — isolated by school_id';
COMMENT ON TABLE attendance_notifications IS 'In-app attendance notifications per user — isolated by user_id';
COMMENT ON TABLE attendance_reports IS 'Generated attendance reports — isolated by school_id';
COMMENT ON TABLE attendance_sync IS 'Offline attendance sync queue — isolated by school_id';
COMMENT ON TABLE attendance_audit_log IS 'Audit trail for all attendance modifications — isolated by school_id';
COMMENT ON TABLE attendance_sessions IS 'Active teacher-led attendance sessions — isolated by school_id';
COMMENT ON TABLE attendance_qr_tokens IS 'Secure QR tokens for session-based check-in — isolated by school_id';
