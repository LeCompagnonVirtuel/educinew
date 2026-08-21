import { getSupabase, camel, createUserWithoutSessionSwitch, generateSecurePassword } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';

export const sbTeachers = {
  async list(schoolId?: string) {
    const supabase = getSupabase();
    const sid = schoolId || await getAuthenticatedSchoolId();
    let query = supabase
      .from('teachers')
      .select('*, user:users(*)');
    if (sid) query = query.eq('school_id', sid);
    const { data, error } = await query;
    if (error) throw error;
    return camel(data);
  },

  async get(id: string) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('teachers')
      .select('*, user:users(*), subject:subjects(*)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return camel(data);
  },

  async create(data: any) {
    const supabase = getSupabase();
    const schoolId = data.schoolId || data.school_id || await getAuthenticatedSchoolId();
    if (!schoolId) throw new Error('Établissement non identifié');
    if (!data.name) throw new Error('Le nom est requis');
    if (!data.email) throw new Error('L\'email est requis');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) throw new Error('Format d\'email invalide');

    const tempPassword = generateSecurePassword(data.name);

    const { authData, authError, accessKit } = await createUserWithoutSessionSwitch(supabase, data.email, tempPassword, {
      name: data.name,
      role: 'TEACHER',
      school_id: schoolId,
      is_first_login: true,
      phone: data.phone || null,
    }, 'TEACHER', {
      subjectId: data.subjectId || data.subject_id || null,
    });
    if (authError) {
      if (authError.message.includes('already registered') || authError.message.includes('déjà utilisé')) {
        throw new Error('Cet email est déjà utilisé par un autre compte');
      }
      throw new Error(`Erreur création compte: ${authError.message}`);
    }
    if (!authData?.user) throw new Error('Échec de la création du compte enseignant');

    const userId = authData.user.id;

    const { data: teacher, error: teacherError } = await supabase
      .from('teachers')
      .select('*, user:users(*), subject:subjects(*)')
      .eq('user_id', userId)
      .single();
    if (teacherError) throw new Error(`Erreur inscription enseignant: ${teacherError.message}`);

    return {
      ...camel(teacher),
      identifier: accessKit?.identifier || authData.user.identifier,
      invitationCode: accessKit?.invitation_code || authData.user.invitation_code,
      credentials: {
        email: data.email,
        tempPassword: accessKit?.initial_password || tempPassword,
        identifier: accessKit?.identifier || authData.user.identifier,
        invitationCode: accessKit?.invitation_code || authData.user.invitation_code,
      },
    };
  },

  async update(id: string, data: any) {
    const supabase = getSupabase();
    const updateData: any = {};
    if (data.subjectId || data.subject_id) updateData.subject_id = data.subjectId || data.subject_id;
    if (data.phone) updateData.phone = data.phone;

    if (data.name || data.phone) {
      const { data: currentTeacher } = await supabase.from('teachers').select('user_id').eq('id', id).single();
      if (currentTeacher?.user_id) {
        const userUpdate: any = {};
        if (data.name) userUpdate.name = data.name;
        if (data.phone) userUpdate.phone = data.phone;
        await supabase.from('users').update(userUpdate).eq('id', currentTeacher.user_id);
      }
    }

    const { data: teacher, error } = await supabase
      .from('teachers')
      .update(updateData)
      .eq('id', id)
      .select('*, user:users(*), subject:subjects(*)')
      .single();
    if (error) throw error;

    return camel(teacher);
  },

  async remove(id: string) {
    const supabase = getSupabase();
    const { data: teacher } = await supabase.from('teachers').select('user_id').eq('id', id).single();
    const { error } = await supabase
      .from('teachers')
      .delete()
      .eq('id', id);
    if (error) throw error;
    if (teacher?.user_id) {
      await supabase.from('users').update({ is_active: false, deleted_at: new Date().toISOString() }).eq('id', teacher.user_id);
    }
  },

  async getPerformance(id: string) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('teacher_attendance')
      .select('*')
      .eq('teacher_id', id);
    if (error) throw error;
    return data;
  },

  async getCheckinStats(id: string) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('teacher_attendance')
      .select('status, date')
      .eq('teacher_id', id);
    if (error) throw error;
    const total = data.length;
    const present = data.filter((r: any) => r.status === 'PRESENT').length;
    return { total, present, rate: total > 0 ? Math.round((present / total) * 100) : 0 };
  },

  async listPaginated(schoolId?: string, page = 0, pageSize = 25) {
    const supabase = getSupabase();
    const sid = schoolId || await getAuthenticatedSchoolId();
    let query = supabase
      .from('teachers')
      .select('*, user:users(*)', { count: 'exact' });
    if (sid) query = query.eq('school_id', sid);
    query = query.range(page * pageSize, (page + 1) * pageSize - 1);
    const { data, count, error } = await query;
    if (error) throw error;
    return { data: camel(data), count: count ?? 0 };
  },

  async listWithPagination() {
    return sbTeachers.list();
  },

  async getAnalytics(schoolId?: string) {
    const supabase = getSupabase();
    const sid = schoolId || await getAuthenticatedSchoolId();
    let query = supabase.from('teachers').select('id, subject:subjects(name)');
    if (sid) query = query.eq('school_id', sid);
    const { data, error } = await query;
    if (error) throw error;
    const total = data.length;
    const bySubject: Record<string, number> = {};
    data.forEach((t: any) => { const sn = t.subject?.name || 'N/A'; bySubject[sn] = (bySubject[sn] || 0) + 1; });
    return { totalTeachers: total, activeTeachers: total, bySubject: Object.entries(bySubject).map(([subjectName, count]) => ({ subjectName, count })) };
  },

  getById(id: string) {
    return sbTeachers.get(id);
  },
};
