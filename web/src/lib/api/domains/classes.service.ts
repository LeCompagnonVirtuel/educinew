import { getSupabase, camel } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';

export const sbClasses = {
  async list(schoolId?: string) {
    const supabase = getSupabase();
    const sid = schoolId || await getAuthenticatedSchoolId();
    let query = supabase
      .from('classes')
      .select('*');
    if (sid) query = query.eq('school_id', sid);
    const { data, error } = await query;
    if (error) throw error;
    return camel(data);
  },

  async get(id: string) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('classes')
      .select('*, students(*, user:users!students_user_id_fkey(*)), class_subjects(*, subject:subjects(*), teacher:teachers(*, user:users(*)))')
      .eq('id', id)
      .single();
    if (error) throw error;
    return camel(data);
  },

  async create(data: any) {
    const supabase = getSupabase();
    const schoolId = data.schoolId || data.school_id || await getAuthenticatedSchoolId();
    if (!schoolId) throw new Error('Établissement non identifié');
    if (!data.name) throw new Error('Le nom de la classe est requis');

    const insertData: any = {
      name: data.name,
      school_id: schoolId,
      level: data.level || null,
      capacity: data.capacity || 50,
      academic_year_id: data.academicYearId || data.academic_year_id || null,
    };

    const { data: cls, error } = await supabase
      .from('classes')
      .insert(insertData)
      .select()
      .single();
    if (error) {
      if (error.message.includes('duplicate') || error.code === '23505') {
        throw new Error('Une classe avec ce nom existe déjà pour cette année scolaire');
      }
      throw new Error(`Erreur création classe: ${error.message}`);
    }
    return cls;
  },

  async update(id: string, data: any) {
    const supabase = getSupabase();
    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.level) updateData.level = data.level;
    if (data.capacity) updateData.capacity = data.capacity;
    if (data.academicYearId || data.academic_year_id) updateData.academic_year_id = data.academicYearId || data.academic_year_id;

    const { data: cls, error } = await supabase
      .from('classes')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return cls;
  },

  async remove(id: string) {
    const supabase = getSupabase();
    const { data: students } = await supabase.from('students').select('id', { count: 'exact', head: true }).eq('class_id', id);
    if (students && (students as any).count > 0) {
      throw new Error('Impossible de supprimer cette classe : des élèves y sont encore inscrits');
    }
    const { error } = await supabase
      .from('classes')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async listWithPagination(search?: string, filters?: { level?: string; stream?: string }, page = 1, limit = 20) {
    const supabase = getSupabase();
    const sid = await getAuthenticatedSchoolId();
    let query = supabase
      .from('classes')
      .select('*, students(id), class_subjects(*)');
    if (sid) query = query.eq('school_id', sid);
    if (search) query = query.ilike('name', `%${search}%`);
    if (filters?.level) query = query.eq('level', filters.level);
    if (filters?.stream) query = query.eq('stream', filters.stream);
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, error, count } = await query.range(from, to);
    if (error) throw error;
    const rows = (data || []).map((row: any) => ({
      ...row,
      studentCount: row.students?.length || 0,
    }));
    return { data: camel(rows), total: count || rows.length, totalPages: Math.ceil((count || rows.length) / limit) };
  },

  async getAnalytics(schoolId?: string) {
    const supabase = getSupabase();
    const sid = schoolId || await getAuthenticatedSchoolId();
    const { data: classes, error } = await supabase
      .from('classes')
      .select('*, students(*)');
    if (error) throw error;
    const filtered = sid ? classes.filter((c: any) => c.school_id === sid) : classes;
    const totalClasses = filtered.length;
    const totalStudents = filtered.reduce((sum: number, c: any) => sum + (c.students?.length || 0), 0);
    const avgClassSize = totalClasses > 0 ? Math.round(totalStudents / totalClasses) : 0;
    const byLevel = Object.entries(
      filtered.reduce((acc: Record<string, number>, c: any) => {
        const level = c.level || 'Autre';
        acc[level] = (acc[level] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).map(([level, count]) => ({ level, count }));
    const byStream = Object.entries(
      filtered.reduce((acc: Record<string, number>, c: any) => {
        const stream = c.stream || 'Autre';
        acc[stream] = (acc[stream] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).map(([stream, count]) => ({ stream, count }));
    return { totalClasses, totalStudents, avgClassSize, byLevel, byStream, performanceByClass: [] };
  },
};
