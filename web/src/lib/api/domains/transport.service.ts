import { getSupabase, camel } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';

export const sbTransport = {
  async list(schoolId?: string) {
    const supabase = getSupabase();
    const sid = schoolId || await getAuthenticatedSchoolId();
    let query = supabase.from('buses').select('*');
    if (sid) query = query.eq('school_id', sid);
    const { data, error } = await query;
    if (error) throw error;
    return camel(data);
  },

  async get(id: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    let query = supabase
      .from('buses')
      .select('*, bus_tracking(*)')
      .eq('id', id);
    if (schoolId) query = query.eq('school_id', schoolId);
    const { data, error } = await query.single();
    if (error) throw error;
    return camel(data);
  },

  async create(data: any) {
    const supabase = getSupabase();
    const schoolId = data.schoolId || data.school_id || await getAuthenticatedSchoolId();
    if (!schoolId) throw new Error('Établissement non identifié');
    if (!data.plate_number && !data.plateNumber) throw new Error('Le numéro d\'immatriculation est requis');

    const { data: bus, error } = await supabase
      .from('buses')
      .insert({
        school_id: schoolId,
        driver_name: data.driver_name || data.driverName || null,
        driver_id: data.driver_id || data.driverId || null,
        plate_number: data.plate_number || data.plateNumber,
        route: data.route || null,
        capacity: data.capacity || 30,
        vehicle_model: data.vehicle_model || data.vehicleModel || null,
        vehicle_year: data.vehicle_year || data.vehicleYear || null,
        vehicle_color: data.vehicle_color || data.vehicleColor || null,
        insurance_expiry: data.insurance_expiry || data.insuranceExpiry || null,
        technical_check_expiry: data.technical_check_expiry || data.technicalCheckExpiry || null,
        is_active: true,
      })
      .select()
      .single();
    if (error) {
      if (error.message.includes('duplicate') || error.code === '23505') {
        throw new Error('Un véhicule avec cette immatriculation existe déjà');
      }
      throw new Error(`Erreur création véhicule: ${error.message}`);
    }
    return bus;
  },

  async update(id: string, data: any) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    if (schoolId) {
      const { data: existing } = await supabase.from('buses').select('school_id').eq('id', id).single();
      if (existing && existing.school_id !== schoolId) throw new Error('Accès non autorisé à ce véhicule');
    }
    const updateData: any = {};
    if (data.driver_name || data.driverName) updateData.driver_name = data.driver_name || data.driverName;
    if (data.driver_id || data.driverId) updateData.driver_id = data.driver_id || data.driverId;
    if (data.plate_number || data.plateNumber) updateData.plate_number = data.plate_number || data.plateNumber;
    if (data.route) updateData.route = data.route;
    if (data.capacity) updateData.capacity = data.capacity;
    if (typeof data.is_active === 'boolean') updateData.is_active = data.is_active;
    if (data.vehicle_model || data.vehicleModel) updateData.vehicle_model = data.vehicle_model || data.vehicleModel;
    if (data.vehicle_year || data.vehicleYear) updateData.vehicle_year = data.vehicle_year || data.vehicleYear;
    if (data.vehicle_color || data.vehicleColor) updateData.vehicle_color = data.vehicle_color || data.vehicleColor;

    const { data: bus, error } = await supabase
      .from('buses')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return bus;
  },

  async remove(id: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    if (schoolId) {
      const { data: existing } = await supabase.from('buses').select('school_id').eq('id', id).single();
      if (existing && existing.school_id !== schoolId) throw new Error('Accès non autorisé à ce véhicule');
    }
    const { error } = await supabase.from('buses').delete().eq('id', id);
    if (error) throw error;
  },

  async getTracking(busId: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    let busQuery = supabase.from('buses').select('school_id').eq('id', busId).single();
    const { data: bus } = await busQuery;
    if (schoolId && bus && bus.school_id !== schoolId) throw new Error('Accès non autorisé à ce suivi');
    const { data, error } = await supabase
      .from('bus_tracking')
      .select('*')
      .eq('bus_id', busId)
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) throw error;
    return data;
  },

  async getLatestPosition(busId: string) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('bus_tracking')
      .select('latitude, longitude, speed_kmh, accuracy, timestamp')
      .eq('bus_id', busId)
      .order('timestamp', { ascending: false })
      .limit(1)
      .single();
    if (error || !data) return null;
    return camel(data);
  },

  async getBusStudents(busId: string) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('bus_students')
      .select(`
        id, stop_name, stop_latitude, stop_longitude, pickup_order,
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
    return camel(data);
  },

  async assignStudent(busId: string, studentId: string, schoolId: string, stopName?: string, stopLat?: number, stopLng?: number) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('bus_students')
      .insert({
        bus_id: busId,
        student_id: studentId,
        school_id: schoolId,
        stop_name: stopName || null,
        stop_latitude: stopLat || null,
        stop_longitude: stopLng || null,
        is_active: true,
      })
      .select()
      .single();
    if (error) {
      if (error.code === '23505') throw new Error('Cet élève est déjà assigné à ce bus');
      throw error;
    }
    return data;
  },

  async unassignStudent(id: string) {
    const supabase = getSupabase();
    const { error } = await supabase.from('bus_students').delete().eq('id', id);
    if (error) throw error;
  },

  async getActiveTrips(busId?: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    let query = supabase
      .from('trips')
      .select('*, bus:buses(plate_number, driver_name), driver:users!trips_driver_id_fkey(name)')
      .eq('status', 'IN_PROGRESS');
    if (schoolId) query = query.eq('school_id', schoolId);
    if (busId) query = query.eq('bus_id', busId);
    const { data, error } = await query.order('started_at', { ascending: false });
    if (error) throw error;
    return camel(data);
  },

  async getTodayTrips(busId?: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];
    let query = supabase
      .from('trips')
      .select('*, bus:buses(plate_number, driver_name), driver:users!trips_driver_id_fkey(name)')
      .gte('started_at', `${today}T00:00:00`);
    if (schoolId) query = query.eq('school_id', schoolId);
    if (busId) query = query.eq('bus_id', busId);
    const { data, error } = await query.order('started_at', { ascending: false });
    if (error) throw error;
    return camel(data);
  },

  async getDrivers(schoolId?: string) {
    const supabase = getSupabase();
    const sid = schoolId || await getAuthenticatedSchoolId();
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, phone')
      .eq('school_id', sid)
      .eq('role', 'CHAUFFEUR')
      .eq('is_active', true);
    if (error) throw error;
    return data;
  },
};
