import { getSupabase, camel, createUserWithoutSessionSwitch, generateSecurePassword } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';
import { generateMatricule, isValidMatricule, normalizeMatricule } from '../../matricule';

export const sbStudents = {
  async list(schoolId?: string) {
    const supabase = getSupabase();
    const sid = schoolId || await getAuthenticatedSchoolId();
    let query = supabase
      .from('students')
      .select('*, user:users!students_user_id_fkey(*), class:classes(*)');
    if (sid) query = query.eq('school_id', sid);
    const { data, error } = await query;
    if (error) throw error;
    return camel(data);
  },

  async get(id: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const { data, error } = await supabase
      .from('students')
      .select('*, user:users(*), class:classes(*), parent:users!students_parent_id_fkey(*)')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw error;
    return camel(data);
  },

  async create(data: any) {
    const supabase = getSupabase();
    const schoolId = data.schoolId || data.school_id || await getAuthenticatedSchoolId();
    if (!schoolId) throw new Error('Établissement non identifié');
    if (!data.name) throw new Error('Le nom est requis');

    const email = data.email || `eleve_${Date.now()}@educi.local`;
    const tempPassword = generateSecurePassword(data.name);
    const rawMatricule = data.matricule || generateMatricule();
    const matricule = normalizeMatricule(rawMatricule);

    if (!isValidMatricule(matricule)) {
      throw new Error('Format de matricule invalide. Exemple: 16137807D (8 chiffres + 1 lettre majuscule)');
    }

    const { authData, authError, accessKit } = await createUserWithoutSessionSwitch(supabase, email, tempPassword, {
      name: data.name,
      role: 'STUDENT',
      school_id: schoolId,
      is_first_login: true,
      phone: data.phone || null,
    }, 'STUDENT', {
      classId: data.classId || data.class_id || null,
      matricule,
      dateOfBirth: data.dateOfBirth || data.date_of_birth || null,
      gender: data.gender || null,
      address: data.address || null,
    });
    if (authError) throw new Error(`Erreur création compte: ${authError.message}`);
    if (!authData?.user) throw new Error('Échec de la création du compte utilisateur');

    const userId = authData.user.id;

    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('*, user:users!students_user_id_fkey(*), class:classes(*)')
      .eq('user_id', userId)
      .single();
    if (studentError) throw new Error(`Erreur inscription élève: ${studentError.message}`);

    return {
      ...camel(student),
      credentials: {
        matricule,
        email,
        tempPassword: accessKit?.initial_password || tempPassword,
        identifier: accessKit?.identifier || authData.user.identifier,
      },
    };
  },

  async update(id: string, data: any) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const updateData: any = {};
    if ('classId' in data || 'class_id' in data) updateData.class_id = data.classId ?? data.class_id ?? null;
    if ('matricule' in data) updateData.matricule = data.matricule;
    if ('dateOfBirth' in data || 'date_of_birth' in data) updateData.date_of_birth = data.dateOfBirth ?? data.date_of_birth ?? null;
    if ('gender' in data) updateData.gender = data.gender || null;
    if ('address' in data) updateData.address = data.address || null;
    if ('phone' in data) updateData.phone = data.phone || null;
    if (typeof data.is_active === 'boolean') updateData.is_active = data.is_active;

    if (data.name || data.phone) {
      const { data: currentStudent } = await supabase
        .from('students')
        .select('user_id')
        .eq('id', id)
        .eq('school_id', schoolId)
        .single();
      if (currentStudent?.user_id) {
        const userUpdate: any = {};
        if (data.name) userUpdate.name = data.name;
        if ('phone' in data) userUpdate.phone = data.phone || null;
        await supabase.from('users').update(userUpdate).eq('id', currentStudent.user_id);
      }
    }

    const { data: student, error } = await supabase
      .from('students')
      .update(updateData)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select('*, user:users!students_user_id_fkey(*), class:classes(*)')
      .single();
    if (error) throw error;

    return camel(student);
  },

  async remove(id: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const { data: student } = await supabase
      .from('students')
      .select('user_id')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (!student) throw new Error('Élève introuvable dans votre établissement');
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
    if (student?.user_id) {
      await supabase.from('users').update({ is_active: false, deleted_at: new Date().toISOString() }).eq('id', student.user_id);
    }
  },

  async getPerformance(id: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    // SECURITY: Verify student belongs to caller's school before returning grades
    const { data: student } = await supabase
      .from('students')
      .select('id')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (!student) throw new Error('Élève introuvable dans votre établissement');
    const { data, error } = await supabase
      .from('grades')
      .select('*, subject:subjects(*), period:periods(*)')
      .eq('student_id', id);
    if (error) throw error;
    return data;
  },

  async listPaginated(schoolId?: string, page = 0, pageSize = 25) {
    const supabase = getSupabase();
    const sid = schoolId || await getAuthenticatedSchoolId();
    let query = supabase
      .from('students')
      .select('*, user:users!students_user_id_fkey(*), class:classes(*)', { count: 'exact' });
    if (sid) query = query.eq('school_id', sid);
    query = query.range(page * pageSize, (page + 1) * pageSize - 1);
    const { data, count, error } = await query;
    if (error) throw error;
    return { data: camel(data), count: count ?? 0 };
  },

  async listWithPagination() {
    return sbStudents.list();
  },

  async getAnalytics(schoolId?: string) {
    const supabase = getSupabase();
    const sid = schoolId || await getAuthenticatedSchoolId();
    let query = supabase.from('students').select('id, gender, class:classes(name)');
    if (sid) query = query.eq('school_id', sid);
    const { data, error } = await query;
    if (error) throw error;
    const total = data.length;
    const male = data.filter((s: any) => s.gender === 'M').length;
    const byClass: Record<string, number> = {};
    data.forEach((s: any) => { const cn = s.class?.name || 'N/A'; byClass[cn] = (byClass[cn] || 0) + 1; });
    return { totalStudents: total, activeStudents: total, genderDistribution: { M: male, F: total - male }, byClass: Object.entries(byClass).map(([className, count]) => ({ className, count })) };
  },

  getById(id: string) {
    return sbStudents.get(id);
  },
};
