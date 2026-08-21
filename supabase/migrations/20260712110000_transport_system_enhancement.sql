-- =====================================================
-- TRANSPORT SYSTEM ENHANCEMENT
-- Driver assignment, student-bus linking, trip sessions
-- =====================================================

-- 1. Add driver_id to buses (link driver to a user account)
ALTER TABLE buses ADD COLUMN IF NOT EXISTS driver_id UUID REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE buses ADD COLUMN IF NOT EXISTS vehicle_model TEXT;
ALTER TABLE buses ADD COLUMN IF NOT EXISTS vehicle_year INTEGER;
ALTER TABLE buses ADD COLUMN IF NOT EXISTS vehicle_color TEXT;
ALTER TABLE buses ADD COLUMN IF NOT EXISTS insurance_expiry DATE;
ALTER TABLE buses ADD COLUMN IF NOT EXISTS technical_check_expiry DATE;
ALTER TABLE buses ADD COLUMN IF NOT EXISTS photo_url TEXT;
ALTER TABLE buses ADD COLUMN IF NOT EXISTS notes TEXT;

CREATE INDEX IF NOT EXISTS idx_buses_driver_id ON buses(driver_id);

-- 2. Bus students (assign students to a bus)
CREATE TABLE IF NOT EXISTS bus_students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bus_id UUID NOT NULL REFERENCES buses(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  stop_name TEXT,
  stop_latitude REAL,
  stop_longitude REAL,
  pickup_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(bus_id, student_id)
);

CREATE INDEX IF NOT EXISTS idx_bus_students_bus_id ON bus_students(bus_id);
CREATE INDEX IF NOT EXISTS idx_bus_students_student_id ON bus_students(student_id);
CREATE INDEX IF NOT EXISTS idx_bus_students_school_id ON bus_students(school_id);

-- 3. Trips (trip sessions)
CREATE TABLE IF NOT EXISTS trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bus_id UUID NOT NULL REFERENCES buses(id) ON DELETE CASCADE,
  driver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  trip_type TEXT NOT NULL DEFAULT 'MORNING' CHECK (trip_type IN ('MORNING', 'AFTERNOON', 'SPECIAL')),
  status TEXT NOT NULL DEFAULT 'SCHEDULED' CHECK (status IN ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  total_distance_km REAL DEFAULT 0,
  total_students INTEGER DEFAULT 0,
  students_picked_up INTEGER DEFAULT 0,
  students_dropped_off INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_trips_bus_id ON trips(bus_id);
CREATE INDEX IF NOT EXISTS idx_trips_driver_id ON trips(driver_id);
CREATE INDEX IF NOT EXISTS idx_trips_school_id ON trips(school_id);
CREATE INDEX IF NOT EXISTS idx_trips_status ON trips(status);
CREATE INDEX IF NOT EXISTS idx_trips_started_at ON trips(started_at);

-- 4. Trip events (student boarding/alighting, GPS points, incidents)
CREATE TABLE IF NOT EXISTS trip_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  bus_id UUID NOT NULL REFERENCES buses(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN (
    'GPS_UPDATE', 'STUDENT_BOARDED', 'STUDENT_ALIGHTED',
    'STOP_ARRIVED', 'STOP_DEPARTED', 'INCIDENT', 'TRIP_STARTED', 'TRIP_COMPLETED'
  )),
  student_id UUID REFERENCES students(id) ON DELETE SET NULL,
  latitude REAL,
  longitude REAL,
  speed_kmh REAL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_trip_events_trip_id ON trip_events(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_events_bus_id ON trip_events(bus_id);
CREATE INDEX IF NOT EXISTS idx_trip_events_event_type ON trip_events(event_type);
CREATE INDEX IF NOT EXISTS idx_trip_events_created_at ON trip_events(created_at);

-- 5. Add speed and accuracy to bus_tracking
ALTER TABLE bus_tracking ADD COLUMN IF NOT EXISTS speed_kmh REAL;
ALTER TABLE bus_tracking ADD COLUMN IF NOT EXISTS accuracy REAL;
ALTER TABLE bus_tracking ADD COLUMN IF NOT EXISTS trip_id UUID REFERENCES trips(id) ON DELETE SET NULL;
ALTER TABLE bus_tracking ADD COLUMN IF NOT EXISTS driver_id UUID REFERENCES users(id) ON DELETE SET NULL;

-- 6. RLS Policies for new tables

-- bus_students
ALTER TABLE bus_students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "bus_students_select_school" ON bus_students
  FOR SELECT USING (school_id = get_user_school_id() OR is_super_admin());

CREATE POLICY "bus_students_insert_school" ON bus_students
  FOR INSERT WITH CHECK (school_id = get_user_school_id() OR is_super_admin());

CREATE POLICY "bus_students_update_school" ON bus_students
  FOR UPDATE USING (school_id = get_user_school_id() OR is_super_admin());

CREATE POLICY "bus_students_delete_school" ON bus_students
  FOR DELETE USING (school_id = get_user_school_id() OR is_super_admin());

-- trips
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "trips_select_school" ON trips
  FOR SELECT USING (school_id = get_user_school_id() OR is_super_admin());

CREATE POLICY "trips_insert_school" ON trips
  FOR INSERT WITH CHECK (school_id = get_user_school_id() OR is_super_admin());

CREATE POLICY "trips_update_school" ON trips
  FOR UPDATE USING (school_id = get_user_school_id() OR is_super_admin());

-- trip_events
ALTER TABLE trip_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "trip_events_select_school" ON trip_events
  FOR SELECT USING (school_id = get_user_school_id() OR is_super_admin());

CREATE POLICY "trip_events_insert_school" ON trip_events
  FOR INSERT WITH CHECK (school_id = get_user_school_id() OR is_super_admin());

-- Allow drivers to insert their own bus_tracking
CREATE POLICY "bus_tracking_insert_driver" ON bus_tracking
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM buses b
      WHERE b.id = bus_tracking.bus_id
      AND b.driver_id = auth.uid()
    )
  );

-- Allow drivers to read their own bus tracking
CREATE POLICY "bus_tracking_select_driver" ON bus_tracking
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM buses b
      WHERE b.id = bus_tracking.bus_id
      AND b.driver_id = auth.uid()
    )
    OR bus_tracking.bus_id IN (
      SELECT b.id FROM buses b WHERE b.school_id = get_user_school_id()
    )
    OR is_super_admin()
  );

-- 7. Enable realtime for new tables
ALTER PUBLICATION supabase_realtime ADD TABLE trips;
ALTER PUBLICATION supabase_realtime ADD TABLE trip_events;
ALTER PUBLICATION supabase_realtime ADD TABLE bus_students;

-- 8. RPC: Get driver's assigned bus
CREATE OR REPLACE FUNCTION get_driver_bus(p_driver_id UUID)
RETURNS TABLE (
  bus_id UUID,
  bus_name TEXT,
  plate_number TEXT,
  route TEXT,
  capacity INTEGER,
  vehicle_model TEXT,
  vehicle_year INTEGER,
  vehicle_color TEXT,
  photo_url TEXT,
  student_count BIGINT,
  school_name TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    b.id AS bus_id,
    b.name AS bus_name,
    b.plate_number,
    b.route,
    b.capacity,
    b.vehicle_model,
    b.vehicle_year,
    b.vehicle_color,
    b.photo_url,
    (SELECT COUNT(*) FROM bus_students bs WHERE bs.bus_id = b.id AND bs.is_active = true) AS student_count,
    s.name AS school_name
  FROM buses b
  JOIN schools s ON s.id = b.school_id
  WHERE b.driver_id = p_driver_id
  AND b.is_active = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. RPC: Get bus students with parent info
CREATE OR REPLACE FUNCTION get_bus_students(p_bus_id UUID)
RETURNS TABLE (
  student_id UUID,
  student_name TEXT,
  matricule TEXT,
  class_name TEXT,
  stop_name TEXT,
  stop_latitude REAL,
  stop_longitude REAL,
  pickup_order INTEGER,
  parent_name TEXT,
  parent_phone TEXT,
  parent_user_id UUID
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    st.id AS student_id,
    u.name AS student_name,
    st.matricule,
    c.name AS class_name,
    bs.stop_name,
    bs.stop_latitude,
    bs.stop_longitude,
    bs.pickup_order,
    pu.name AS parent_name,
    pu.phone AS parent_phone,
    pu.id AS parent_user_id
  FROM bus_students bs
  JOIN students st ON st.id = bs.student_id
  JOIN users u ON u.id = st.user_id
  LEFT JOIN classes c ON c.id = st.class_id
  LEFT JOIN users pu ON pu.id = st.parent_id
  WHERE bs.bus_id = p_bus_id
  AND bs.is_active = true
  ORDER BY bs.pickup_order;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. RPC: Create trip and return ID
CREATE OR REPLACE FUNCTION start_trip(
  p_bus_id UUID,
  p_driver_id UUID,
  p_school_id UUID,
  p_trip_type TEXT DEFAULT 'MORNING'
) RETURNS UUID AS $$
DECLARE
  v_trip_id UUID;
  v_student_count INTEGER;
BEGIN
  -- Count active students for this bus
  SELECT COUNT(*) INTO v_student_count
  FROM bus_students WHERE bus_id = p_bus_id AND is_active = true;

  INSERT INTO trips (bus_id, driver_id, school_id, trip_type, status, started_at, total_students)
  VALUES (p_bus_id, p_driver_id, p_school_id, p_trip_type, 'IN_PROGRESS', now(), v_student_count)
  RETURNING id INTO v_trip_id;

  -- Log trip start event
  INSERT INTO trip_events (trip_id, bus_id, school_id, event_type)
  VALUES (v_trip_id, p_bus_id, p_school_id, 'TRIP_STARTED');

  RETURN v_trip_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. RPC: Complete trip
CREATE OR REPLACE FUNCTION complete_trip(p_trip_id UUID)
RETURNS VOID AS $$
DECLARE
  v_trip RECORD;
BEGIN
  SELECT * INTO v_trip FROM trips WHERE id = p_trip_id;

  UPDATE trips
  SET status = 'COMPLETED', completed_at = now()
  WHERE id = p_trip_id;

  INSERT INTO trip_events (trip_id, bus_id, school_id, event_type)
  VALUES (p_trip_id, v_trip.bus_id, v_trip.school_id, 'TRIP_COMPLETED');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
