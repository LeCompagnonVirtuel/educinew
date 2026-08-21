import { getSupabase, camel } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';

export const sbVisitors = {
  async list(filters?: { status?: string; date?: string }) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    let query = supabase
      .from('visitors')
      .select('*')
      .eq('school_id', schoolId);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.date) {
      query = query.gte('entry_time', `${filters.date}T00:00:00`)
        .lt('entry_time', `${filters.date}T23:59:59`);
    }
    const { data, error } = await query.order('entry_time', { ascending: false });
    if (error) throw error;
    return camel(data || []);
  },

  async getActive() {
    return this.list({ status: 'INSIDE' });
  },

  async register(data: {
    visitorName: string;
    visitorPhone?: string;
    visitorIdType?: string;
    visitorIdNumber?: string;
    purpose: string;
    personToVisit: string;
    personRole?: string;
  }) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: visitor, error } = await supabase
      .from('visitors')
      .insert({
        school_id: schoolId,
        visitor_name: data.visitorName,
        visitor_phone: data.visitorPhone || null,
        visitor_id_type: data.visitorIdType || 'CNI',
        visitor_id_number: data.visitorIdNumber || null,
        purpose: data.purpose,
        person_to_visit: data.personToVisit,
        person_role: data.personRole || null,
        status: 'INSIDE',
        created_by: user?.id,
      })
      .select()
      .single();
    if (error) throw error;
    return camel(visitor);
  },

  async checkout(visitorId: string) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('visitors')
      .update({
        exit_time: new Date().toISOString(),
        status: 'EXITED',
      })
      .eq('id', visitorId)
      .select()
      .single();
    if (error) throw error;
    return camel(data);
  },

  async getTodayStats() {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('visitors')
      .select('status')
      .eq('school_id', schoolId)
      .gte('entry_time', `${today}T00:00:00`)
      .lt('entry_time', `${today}T23:59:59`);
    if (error) throw error;

    const total = data.length;
    const inside = data.filter((r: any) => r.status === 'INSIDE').length;
    const exited = data.filter((r: any) => r.status === 'EXITED').length;

    return { total, inside, exited };
  },

  async getHistory(filters?: { startDate?: string; endDate?: string; search?: string }) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    let query = supabase
      .from('visitors')
      .select('*')
      .eq('school_id', schoolId);
    if (filters?.startDate) query = query.gte('entry_time', filters.startDate);
    if (filters?.endDate) query = query.lte('entry_time', filters.endDate);
    if (filters?.search) {
      query = query.or(`visitor_name.ilike.%${filters.search}%,person_to_visit.ilike.%${filters.search}%`);
    }
    const { data, error } = await query.order('entry_time', { ascending: false });
    if (error) throw error;
    return camel(data || []);
  },
};
