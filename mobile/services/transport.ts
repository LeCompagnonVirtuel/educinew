import { supabase, camel, getUserSchoolId } from './supabase';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

export interface BusInfo {
  id: string;
  name: string;
  plateNumber: string;
  route: string;
  capacity: number;
  vehicleModel?: string;
  vehicleYear?: number;
  vehicleColor?: string;
  photoUrl?: string;
  driverId?: string;
  driverName: string;
  schoolName?: string;
  studentCount: number;
  isActive: boolean;
}

export interface BusStudent {
  studentId: string;
  studentName: string;
  matricule: string;
  className: string;
  stopName?: string;
  stopLatitude?: number;
  stopLongitude?: number;
  pickupOrder: number;
  parentName?: string;
  parentPhone?: string;
  parentUserId?: string;
  boarded?: boolean;
}

export interface Trip {
  id: string;
  busId: string;
  driverId: string;
  schoolId: string;
  tripType: 'MORNING' | 'AFTERNOON' | 'SPECIAL';
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  startedAt?: string;
  completedAt?: string;
  totalDistanceKm: number;
  totalStudents: number;
  studentsPickedUp: number;
  studentsDroppedOff: number;
  notes?: string;
  createdAt: string;
}

export interface TripEvent {
  id: string;
  tripId: string;
  busId: string;
  eventType: string;
  studentId?: string;
  latitude?: number;
  longitude?: number;
  speedKmh?: number;
  metadata?: any;
  createdAt: string;
}

export interface GpsPoint {
  latitude: number;
  longitude: number;
  speed?: number;
  accuracy?: number;
  timestamp: string;
}

// ─────────────────────────────────────────────────────────────
// BUS
// ─────────────────────────────────────────────────────────────

export async function getBuses(schoolId?: string) {
  const sid = schoolId || await getUserSchoolId();
  let q = supabase.from('buses').select('*');
  if (sid) q = q.eq('school_id', sid);
  const { data, error } = await q;
  if (error) throw error;
  return camel(data) as BusInfo[];
}

export async function getDriverBus(driverId: string): Promise<BusInfo | null> {
  const { data, error } = await supabase
    .from('buses')
    .select('*, school:schools(name)')
    .eq('driver_id', driverId)
    .eq('is_active', true)
    .single();

  if (error || !data) return null;

  const { count } = await supabase
    .from('bus_students')
    .select('id', { count: 'exact', head: true })
    .eq('bus_id', data.id)
    .eq('is_active', true);

  return {
    id: data.id,
    name: data.name || 'Bus',
    plateNumber: data.plate_number || '—',
    route: data.route || '—',
    capacity: data.capacity || 0,
    vehicleModel: data.vehicle_model,
    vehicleYear: data.vehicle_year,
    vehicleColor: data.vehicle_color,
    photoUrl: data.photo_url,
    driverId: data.driver_id,
    driverName: data.driver_name || '—',
    schoolName: data.school?.name || '—',
    studentCount: count || 0,
    isActive: data.is_active,
  };
}

export async function getBus(id: string) {
  const { data, error } = await supabase
    .from('buses')
    .select('*, bus_tracking(*)')
    .eq('id', id)
    .single();
  if (error) throw error;
  return camel(data);
}

// ─────────────────────────────────────────────────────────────
// BUS STUDENTS
// ─────────────────────────────────────────────────────────────

export async function getBusStudents(busId: string): Promise<BusStudent[]> {
  const { data, error } = await supabase
    .from('bus_students')
    .select(`
      stop_name, stop_latitude, stop_longitude, pickup_order,
      student:students(
        id, matricule,
        user:users!students_user_id_fkey(name),
        class:classes(name),
        parent:users!students_parent_id_fkey(id, name, phone)
      )
    `)
    .eq('bus_id', busId)
    .eq('is_active', true)
    .order('pickup_order');

  if (error) throw error;

  return (data || []).map((row: any) => ({
    studentId: row.student?.id || '',
    studentName: row.student?.user?.name || 'Élève',
    matricule: row.student?.matricule || '',
    className: row.student?.class?.name || '',
    stopName: row.stop_name,
    stopLatitude: row.stop_latitude,
    stopLongitude: row.stop_longitude,
    pickupOrder: row.pickup_order || 0,
    parentName: row.student?.parent?.name,
    parentPhone: row.student?.parent?.phone,
    parentUserId: row.student?.parent?.id,
    boarded: false,
  }));
}

// ─────────────────────────────────────────────────────────────
// TRIPS
// ─────────────────────────────────────────────────────────────

export async function getActiveTrip(busId: string): Promise<Trip | null> {
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('bus_id', busId)
    .eq('status', 'IN_PROGRESS')
    .order('started_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) return null;
  return camel(data) as Trip;
}

export async function getTodayTrips(busId: string): Promise<Trip[]> {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('bus_id', busId)
    .gte('started_at', `${today}T00:00:00`)
    .order('started_at', { ascending: false });

  if (error) throw error;
  return (data || []) as Trip[];
}

export async function startTrip(
  busId: string,
  driverId: string,
  schoolId: string,
  tripType: 'MORNING' | 'AFTERNOON' | 'SPECIAL' = 'MORNING'
): Promise<string> {
  const { data, error } = await supabase.rpc('start_trip', {
    p_bus_id: busId,
    p_driver_id: driverId,
    p_school_id: schoolId,
    p_trip_type: tripType,
  });

  if (error) throw error;
  return data as string;
}

export async function completeTrip(tripId: string): Promise<void> {
  const { error } = await supabase.rpc('complete_trip', { p_trip_id: tripId });
  if (error) throw error;
}

export async function cancelTrip(tripId: string): Promise<void> {
  const { error } = await supabase
    .from('trips')
    .update({ status: 'CANCELLED', completed_at: new Date().toISOString() })
    .eq('id', tripId);
  if (error) throw error;
}

// ─────────────────────────────────────────────────────────────
// TRIP EVENTS
// ─────────────────────────────────────────────────────────────

export async function logTripEvent(
  tripId: string,
  busId: string,
  schoolId: string,
  eventType: string,
  latitude?: number,
  longitude?: number,
  studentId?: string,
  metadata?: any
): Promise<void> {
  const { error } = await supabase.from('trip_events').insert({
    trip_id: tripId,
    bus_id: busId,
    school_id: schoolId,
    event_type: eventType,
    student_id: studentId || null,
    latitude: latitude || null,
    longitude: longitude || null,
    metadata: metadata || null,
  });
  if (error) throw error;
}

export async function getTripEvents(tripId: string): Promise<TripEvent[]> {
  const { data, error } = await supabase
    .from('trip_events')
    .select('*')
    .eq('trip_id', tripId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return (data || []) as TripEvent[];
}

// ─────────────────────────────────────────────────────────────
// GPS TRACKING
// ─────────────────────────────────────────────────────────────

export async function writeGpsPoint(
  busId: string,
  latitude: number,
  longitude: number,
  speed?: number,
  accuracy?: number,
  tripId?: string,
  driverId?: string
): Promise<void> {
  const { error } = await supabase.from('bus_tracking').insert({
    bus_id: busId,
    latitude,
    longitude,
    speed_kmh: speed || null,
    accuracy: accuracy || null,
    trip_id: tripId || null,
    driver_id: driverId || null,
  });
  if (error) throw error;
}

export async function getLatestBusPosition(busId: string): Promise<GpsPoint | null> {
  const { data, error } = await supabase
    .from('bus_tracking')
    .select('latitude, longitude, speed_kmh, accuracy, timestamp')
    .eq('bus_id', busId)
    .order('timestamp', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) return null;
  return {
    latitude: data.latitude,
    longitude: data.longitude,
    speed: data.speed_kmh,
    accuracy: data.accuracy,
    timestamp: data.timestamp,
  };
}

export async function getTrackingHistory(busId: string, limit = 100) {
  const { data, error } = await supabase
    .from('bus_tracking')
    .select('*')
    .eq('bus_id', busId)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

// ─────────────────────────────────────────────────────────────
// STUDENT BOARDING (QR SCAN)
// ─────────────────────────────────────────────────────────────

export async function scanStudentBoarding(
  matricule: string,
  busId: string,
  tripId: string,
  schoolId: string,
  latitude?: number,
  longitude?: number
): Promise<{ success: boolean; student?: any; message: string }> {
  // Find student by matricule
  const { data: studentData, error: studentError } = await supabase
    .from('students')
    .select('id, matricule, user_id, parent_id')
    .eq('matricule', matricule.toUpperCase())
    .eq('school_id', schoolId)
    .single();

  if (studentError || !studentData) {
    return { success: false, message: 'Élève non trouvé avec ce matricule' };
  }

  // Get student name
  const { data: userData } = await supabase
    .from('users')
    .select('name')
    .eq('id', studentData.user_id)
    .single();

  const studentName = userData?.name || 'Élève';

  // Check if student is assigned to this bus
  const { data: assignment } = await supabase
    .from('bus_students')
    .select('id')
    .eq('bus_id', busId)
    .eq('student_id', studentData.id)
    .eq('is_active', true)
    .single();

  if (!assignment) {
    return { success: false, message: 'Cet élève n\'est pas assigné à ce véhicule' };
  }

  // Check last event to determine if boarding or alighting
  const { data: lastEvent } = await supabase
    .from('trip_events')
    .select('event_type')
    .eq('trip_id', tripId)
    .eq('student_id', studentData.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  const eventType = lastEvent?.event_type === 'STUDENT_BOARDED' ? 'STUDENT_ALIGHTED' : 'STUDENT_BOARDED';

  // Log event
  await logTripEvent(tripId, busId, schoolId, eventType, latitude, longitude, studentData.id);

  // Notify parent
  const parentId = studentData.parent_id;
  if (parentId) {
    try {
      await supabase.from('notifications').insert({
        user_id: parentId,
        title: eventType === 'STUDENT_BOARDED' ? 'Montée du bus' : 'Descente du bus',
        body: eventType === 'STUDENT_BOARDED'
          ? `${studentName} est monté(e) dans le bus.`
          : `${studentName} est descendu(e) du bus.`,
        type: 'TRANSPORT',
        school_id: schoolId,
      });
    } catch { /* best effort */ }
  }

  return {
    success: true,
    student: {
      id: studentData.id,
      name: studentName,
      matricule: studentData.matricule,
    },
    message: eventType === 'STUDENT_BOARDED'
      ? `${studentName} monté(e) dans le bus`
      : `${studentName} descendu(e) du bus`,
  };
}

// ─────────────────────────────────────────────────────────────
// NOTIFICATIONS
// ─────────────────────────────────────────────────────────────

export async function notifyTripStarted(busId: string, schoolId: string): Promise<void> {
  // Get all parents of students on this bus
  const { data: students } = await supabase
    .from('bus_students')
    .select('student:students(user:users!students_parent_id_fkey(id))')
    .eq('bus_id', busId)
    .eq('is_active', true);

  const parentIds = (students || [])
    .map((s: any) => s.student?.user?.id)
    .filter(Boolean);

  if (parentIds.length === 0) return;

  const notifications = parentIds.map(userId => ({
    user_id: userId,
    title: 'Bus en route',
    body: 'Le bus scolaire a commencé sa tournée.',
    type: 'TRANSPORT',
    school_id: schoolId,
  }));

  await supabase.from('notifications').insert(notifications);
}

export async function notifyApproaching(
  busId: string,
  schoolId: string,
  stopName: string
): Promise<void> {
  const { data: students } = await supabase
    .from('bus_students')
    .select('student:students(user:users!students_parent_id_fkey(id))')
    .eq('bus_id', busId)
    .eq('stop_name', stopName)
    .eq('is_active', true);

  const parentIds = (students || [])
    .map((s: any) => s.student?.user?.id)
    .filter(Boolean);

  if (parentIds.length === 0) return;

  const notifications = parentIds.map(userId => ({
    user_id: userId,
    title: 'Bus à proximité',
    body: `Le bus approche de l'arrêt "${stopName}". Préparez votre enfant.`,
    type: 'TRANSPORT',
    school_id: schoolId,
  }));

  await supabase.from('notifications').insert(notifications);
}
