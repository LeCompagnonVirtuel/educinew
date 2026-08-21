import { getSupabase, camel } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';

export const sbAttendance = {
  async list(filters?: { studentId?: string; classId?: string; date?: string }) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();

    let studentIds: string[] = [];
    if (filters?.classId) {
      let classQuery = supabase
        .from('students').select('id').eq('class_id', filters.classId);
      if (schoolId) classQuery = classQuery.eq('school_id', schoolId);
      const { data: classStudents } = await classQuery;
      studentIds = (classStudents || []).map((s: any) => s.id);
      if (studentIds.length === 0) return [];
    }

    let query = supabase
      .from('attendance')
      .select('*, student:students(*, user:users!students_user_id_fkey(*))');
    if (schoolId) query = query.eq('school_id', schoolId);
    if (filters?.studentId) query = query.eq('student_id', filters.studentId);
    if (studentIds.length > 0) query = query.in('student_id', studentIds);
    if (filters?.date) query = query.eq('date', filters.date);
    const { data, error } = await query;
    if (error) throw error;
    return camel(data);
  },

  async create(data: any) {
    const supabase = getSupabase();
    const schoolId = data.schoolId || data.school_id || await getAuthenticatedSchoolId();
    if (!schoolId) throw new Error('Établissement non identifié');
    const insertData = { ...data, school_id: schoolId };
    const { data: record, error } = await supabase
      .from('attendance')
      .insert(insertData)
      .select()
      .single();
    if (error) throw error;
    return record;
  },

  async createBulk(records: any[]) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();

    const mapped = records.map(r => ({
      student_id: r.studentId || r.student_id,
      school_id: r.schoolId || r.school_id || schoolId,
      date: r.date,
      status: r.status,
      remark: r.reason || r.remark || (r.arrivalTime ? `Arrivée: ${r.arrivalTime}` : null),
    }));

    const { data, error } = await supabase
      .from('attendance')
      .upsert(mapped, { onConflict: 'student_id,date' })
      .select();
    if (error) throw error;
    return data;
  },

  async getStats(studentId?: string, classId?: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();

    let studentIds: string[] = [];
    if (classId) {
      let classQuery = supabase
        .from('students').select('id').eq('class_id', classId);
      if (schoolId) classQuery = classQuery.eq('school_id', schoolId);
      const { data: classStudents } = await classQuery;
      studentIds = (classStudents || []).map((s: any) => s.id);
      if (studentIds.length === 0) return { total: 0, present: 0, rate: 0 };
    }

    let query = supabase
      .from('attendance')
      .select('status');
    if (schoolId) query = query.eq('school_id', schoolId);
    if (studentId) query = query.eq('student_id', studentId);
    if (studentIds.length > 0) query = query.in('student_id', studentIds);
    const { data, error } = await query;
    if (error) throw error;
    const total = data.length;
    const present = data.filter((r: any) => r.status === 'PRESENT').length;
    return { total, present, rate: total > 0 ? Math.round((present / total) * 100) : 0 };
  },

  async listByClassAndDate(classId: string, date: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const { data: classStudents } = await supabase
      .from('students').select('id').eq('class_id', classId);
    const studentIds = (classStudents || []).map((s: any) => s.id);
    if (studentIds.length === 0) return [];

    let query = supabase
      .from('attendance')
      .select('*, student:students(*, user:users!students_user_id_fkey(*))')
      .in('student_id', studentIds)
      .eq('date', date);
    if (schoolId) query = query.eq('school_id', schoolId);
    const { data, error } = await query;
    if (error) throw error;
    return camel(data);
  },

  async getToday(teacherId?: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];
    let query = supabase
      .from('teacher_attendance')
      .select('*')
      .eq('date', today);
    if (schoolId) query = query.eq('school_id', schoolId);
    if (teacherId) query = query.eq('teacher_id', teacherId);
    const { data, error } = await query;
    if (error) throw error;
    return camel(data || []);
  },

  async getTeacherStatsBySchool(schoolId?: string) {
    const supabase = getSupabase();
    const sid = schoolId || await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];
    let query = supabase
      .from('teacher_attendance')
      .select('status');
    if (sid) query = query.eq('school_id', sid);
    const { data, error } = await query;
    if (error) throw error;
    const total = data.length;
    const present = data.filter((r: any) => r.status === 'PRESENT').length;
    return { total, present, rate: total > 0 ? Math.round((present / total) * 100) : 0 };
  },

  async scanQR(matricule: string, type: string) {
    const supabase = getSupabase();
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('*, user:users(*)')
      .eq('matricule', matricule)
      .single();
    if (studentError || !student) throw new Error('Élève non trouvé');
    const today = new Date().toISOString().split('T')[0];
    const updateData: any = {
      student_id: student.id,
      school_id: student.school_id,
      date: today,
      status: 'PRESENT',
    };
    if (type === 'ARRIVAL') updateData.remark = `Arrivée: ${new Date().toLocaleTimeString('fr-FR')}`;
    else updateData.remark = `Départ: ${new Date().toLocaleTimeString('fr-FR')}`;
    const { data: record, error } = await supabase
      .from('attendance')
      .upsert(updateData, { onConflict: 'student_id,date' })
      .select()
      .single();
    if (error) throw error;
    return { ...camel(record), student: camel(student) };
  },
};
