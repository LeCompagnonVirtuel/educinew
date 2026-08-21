import { getSupabase } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';

export const sbSchools = {
  async list() {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    let query = supabase
      .from('schools')
      .select('*');
    if (schoolId) query = query.eq('id', schoolId);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async get(id: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    let query = supabase
      .from('schools')
      .select('*')
      .eq('id', id);
    if (schoolId) query = query.eq('id', schoolId);
    const { data, error } = await query.single();
    if (error) throw error;
    return data;
  },

  async getStats(id: string) {
    const supabase = getSupabase();
    const [students, teachers, classes] = await Promise.all([
      supabase.from('students').select('id', { count: 'exact', head: true }).eq('school_id', id),
      supabase.from('teachers').select('id', { count: 'exact', head: true }).eq('school_id', id),
      supabase.from('classes').select('id', { count: 'exact', head: true }).eq('school_id', id),
    ]);
    return {
      studentsCount: students.count || 0,
      teachersCount: teachers.count || 0,
      classesCount: classes.count || 0,
    };
  },

  async create(data: any) {
    const supabase = getSupabase();
    const { data: school, error } = await supabase
      .from('schools')
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return school;
  },

  async update(id: string, data: any) {
    const supabase = getSupabase();
    const { data: school, error } = await supabase
      .from('schools')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return school;
  },
};
