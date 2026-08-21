-- =============================================================
-- CRITICAL SCHEMA FIXES - Production Audit 2026-07-13
-- =============================================================

-- 1. Fix get_driver_bus() — b.name does not exist, use b.plate_number
DROP FUNCTION IF EXISTS public.get_driver_bus(UUID);

CREATE OR REPLACE FUNCTION public.get_driver_bus(p_driver_id UUID)
RETURNS TABLE (
  bus_id UUID,
  bus_name TEXT,
  plate_number TEXT,
  route TEXT,
  capacity INTEGER,
  vehicle_model TEXT,
  vehicle_year INTEGER,
  vehicle_color TEXT,
  is_active BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    b.id AS bus_id,
    b.plate_number AS bus_name,  -- FIX: was b.name which doesn't exist
    b.plate_number,
    b.route,
    b.capacity,
    b.vehicle_model,
    b.vehicle_year,
    b.vehicle_color,
    b.is_active
  FROM buses b
  WHERE b.driver_id = p_driver_id
    AND b.is_active = true;
END;
$$;

-- 2. Fix resolve_login_identifier — add SET search_path = public
DROP FUNCTION IF EXISTS public.resolve_login_identifier(TEXT);

CREATE OR REPLACE FUNCTION public.resolve_login_identifier(p_identifier TEXT)
RETURNS TABLE(email TEXT, user_id UUID, role TEXT, school_id UUID)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_email TEXT;
  v_user_id UUID;
  v_role TEXT;
  v_school_id UUID;
BEGIN
  -- Try direct email match
  SELECT u.email, u.id, u.role, u.school_id
  INTO v_email, v_user_id, v_role, v_school_id
  FROM users u
  WHERE u.email = p_identifier
  LIMIT 1;

  IF v_email IS NOT NULL THEN
    RETURN QUERY SELECT v_email, v_user_id, v_role, v_school_id;
    RETURN;
  END IF;

  -- Try identifier (ELV-XXXX-XXXXXX format)
  SELECT u.email, u.id, u.role, u.school_id
  INTO v_email, v_user_id, v_role, v_school_id
  FROM users u
  WHERE u.identifier = p_identifier
  LIMIT 1;

  IF v_email IS NOT NULL THEN
    RETURN QUERY SELECT v_email, v_user_id, v_role, v_school_id;
    RETURN;
  END IF;

  -- Try matricule (student)
  SELECT u.email, u.id, u.role, u.school_id
  INTO v_email, v_user_id, v_role, v_school_id
  FROM students s
  JOIN users u ON u.id = s.user_id
  WHERE s.matricule = p_identifier
  LIMIT 1;

  IF v_email IS NOT NULL THEN
    RETURN QUERY SELECT v_email, v_user_id, v_role, v_school_id;
    RETURN;
  END IF;

  -- Try invitation code
  SELECT u.email, u.id, u.role, u.school_id
  INTO v_email, v_user_id, v_role, v_school_id
  FROM invitations i
  JOIN users u ON u.id = i.used_by
  WHERE i.token = p_identifier AND i.used_at IS NOT NULL
  LIMIT 1;

  IF v_email IS NOT NULL THEN
    RETURN QUERY SELECT v_email, v_user_id, v_role, v_school_id;
    RETURN;
  END IF;

  -- Not found
  RETURN;
END;
$$;

-- 3. Fix subjects.school_id ON DELETE — change from SET NULL to CASCADE
ALTER TABLE subjects
  DROP CONSTRAINT IF EXISTS subjects_school_id_fkey;

ALTER TABLE subjects
  ADD CONSTRAINT subjects_school_id_fkey
  FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE;

-- 4. Add missing composite indexes for performance
CREATE INDEX IF NOT EXISTS idx_attendance_school_date
  ON attendance(school_id, date);

CREATE INDEX IF NOT EXISTS idx_grades_school_period
  ON grades(school_id, period_id);

CREATE INDEX IF NOT EXISTS idx_invoices_school_status_due
  ON invoices(school_id, status, due_date);

CREATE INDEX IF NOT EXISTS idx_notifications_user_created
  ON notifications(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_payments_school_date
  ON payments(school_id, payment_date);

CREATE INDEX IF NOT EXISTS idx_messages_receiver_created
  ON messages(receiver_id, created_at DESC);

-- 5. Fix get_bus_students — add SET search_path
DROP FUNCTION IF EXISTS public.get_bus_students(UUID);

CREATE OR REPLACE FUNCTION public.get_bus_students(p_bus_id UUID)
RETURNS TABLE (
  student_id UUID,
  student_name TEXT,
  stop_name TEXT,
  stop_latitude DOUBLE PRECISION,
  stop_longitude DOUBLE PRECISION,
  pickup_order INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    bs.student_id,
    COALESCE(s.first_name || ' ' || s.last_name, u.name) AS student_name,
    bs.stop_name,
    bs.stop_latitude,
    bs.stop_longitude,
    bs.pickup_order
  FROM bus_students bs
  LEFT JOIN students s ON s.id = bs.student_id
  LEFT JOIN users u ON u.id = s.user_id
  WHERE bs.bus_id = p_bus_id
    AND bs.is_active = true
  ORDER BY bs.pickup_order;
END;
$$;

-- 6. Fix start_trip — add SET search_path
DROP FUNCTION IF EXISTS public.start_trip(UUID, UUID, UUID, TEXT);

CREATE OR REPLACE FUNCTION public.start_trip(
  p_bus_id UUID,
  p_driver_id UUID,
  p_school_id UUID,
  p_trip_type TEXT DEFAULT 'PICKUP'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_trip_id UUID;
BEGIN
  -- Check for existing active trip
  SELECT id INTO v_trip_id
  FROM trips
  WHERE bus_id = p_bus_id AND status = 'IN_PROGRESS'
  LIMIT 1;

  IF v_trip_id IS NOT NULL THEN
    RAISE EXCEPTION 'Active trip already exists for this bus';
  END IF;

  INSERT INTO trips (bus_id, driver_id, school_id, trip_type, status, started_at)
  VALUES (p_bus_id, p_driver_id, p_school_id, p_trip_type, 'IN_PROGRESS', now())
  RETURNING id INTO v_trip_id;

  RETURN v_trip_id;
END;
$$;

-- 7. Fix complete_trip — add SET search_path
DROP FUNCTION IF EXISTS public.complete_trip(UUID);

CREATE OR REPLACE FUNCTION public.complete_trip(p_trip_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE trips
  SET status = 'COMPLETED',
      completed_at = now()
  WHERE id = p_trip_id AND status = 'IN_PROGRESS';

  RETURN FOUND;
END;
$$;

-- 8. Fix record_staff_attendance_by_surveillant — add SET search_path
DROP FUNCTION IF EXISTS public.record_staff_attendance_by_surveillant(UUID, UUID, TEXT, DOUBLE PRECISION, DOUBLE PRECISION, UUID);

CREATE OR REPLACE FUNCTION public.record_staff_attendance_by_surveillant(
  p_staff_id UUID,
  p_school_id UUID,
  p_method TEXT DEFAULT 'MANUAL',
  p_latitude DOUBLE PRECISION DEFAULT NULL,
  p_longitude DOUBLE PRECISION DEFAULT NULL,
  p_recorded_by UUID DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_attendance_id UUID;
  v_today DATE := CURRENT_DATE;
  v_now TIME := CURRENT_TIME;
  v_late_minutes INTEGER := 0;
BEGIN
  -- Check for existing record today
  SELECT id INTO v_attendance_id
  FROM staff_attendance
  WHERE staff_id = p_staff_id AND date = v_today;

  IF v_attendance_id IS NOT NULL THEN
    -- Update check_out_time
    UPDATE staff_attendance
    SET check_out_time = v_now,
        recorded_by = p_recorded_by
    WHERE id = v_attendance_id;
    RETURN v_attendance_id;
  END IF;

  -- Calculate late minutes (assuming 8:00 AM start)
  IF v_now > '08:00:00' THEN
    v_late_minutes := EXTRACT(EPOCH FROM (v_now - '08:00:00')) / 60;
  END IF;

  INSERT INTO staff_attendance (
    staff_id, school_id, date, check_in_time,
    method, latitude, longitude,
    late_minutes, recorded_by, status
  ) VALUES (
    p_staff_id, p_school_id, v_today, v_now,
    p_method, p_latitude, p_longitude,
    v_late_minutes, p_recorded_by,
    CASE WHEN v_late_minutes > 15 THEN 'LATE' ELSE 'PRESENT' END
  )
  RETURNING id INTO v_attendance_id;

  RETURN v_attendance_id;
END;
$$;

-- 9. Fix scan_qr_attendance — add SET search_path
DROP FUNCTION IF EXISTS public.scan_qr_attendance(TEXT, UUID, UUID, DOUBLE PRECISION, DOUBLE PRECISION, TEXT);

CREATE OR REPLACE FUNCTION public.scan_qr_attendance(
  p_qr_data TEXT,
  p_school_id UUID,
  p_scanned_by UUID,
  p_latitude DOUBLE PRECISION DEFAULT NULL,
  p_longitude DOUBLE PRECISION DEFAULT NULL,
  p_device_info TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_qr_record RECORD;
  v_student_id UUID;
  v_event_id UUID;
BEGIN
  -- Find the QR code
  SELECT * INTO v_qr_record
  FROM qr_codes
  WHERE qr_data = p_qr_data
    AND school_id = p_school_id
    AND is_active = true
    AND (expires_at IS NULL OR expires_at > now());

  IF v_qr_record IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'QR code invalide ou expiré');
  END IF;

  -- Get student_id if user is a student
  IF v_qr_record.user_type = 'STUDENT' THEN
    SELECT id INTO v_student_id
    FROM students
    WHERE user_id = v_qr_record.user_id AND school_id = p_school_id;
  END IF;

  -- Create attendance event
  INSERT INTO attendance_events (
    school_id, student_id, user_id, event_type,
    scan_time, scanned_by, qr_code_id,
    latitude, longitude, device_info
  ) VALUES (
    p_school_id, v_student_id, v_qr_record.user_id, 'CHECK_IN',
    now(), p_scanned_by, v_qr_record.id,
    p_latitude, p_longitude, p_device_info
  )
  RETURNING id INTO v_event_id;

  -- Update QR scan count
  UPDATE qr_codes
  SET scan_count = scan_count + 1,
      last_scanned_at = now()
  WHERE id = v_qr_record.id;

  RETURN jsonb_build_object(
    'success', true,
    'event_id', v_event_id,
    'user_type', v_qr_record.user_type,
    'user_id', v_qr_record.user_id
  );
END;
$$;

-- 10. Grant execute on fixed functions
GRANT EXECUTE ON FUNCTION public.resolve_login_identifier(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.get_driver_bus(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_bus_students(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.start_trip(UUID, UUID, UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.complete_trip(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.scan_qr_attendance(TEXT, UUID, UUID, DOUBLE PRECISION, DOUBLE PRECISION, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.record_staff_attendance_by_surveillant(UUID, UUID, TEXT, DOUBLE PRECISION, DOUBLE PRECISION, UUID) TO authenticated;
