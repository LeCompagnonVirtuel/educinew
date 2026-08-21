import { getSupabase, camel } from '../shared';

export const sbDashboard = {
  async getStats(userId: string) {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const role = user.user_metadata?.role;
    const schoolId = user.user_metadata?.school_id;

    if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
      const [students, teachers, classes, payments] = await Promise.all([
        supabase.from('students').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
        supabase.from('teachers').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
        supabase.from('classes').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
        supabase.from('payments').select('amount, status').eq('school_id', schoolId),
      ]);
      const totalRevenue = payments.data?.reduce((s: number, p: any) => s + (p.status === 'COMPLETED' ? p.amount : 0), 0) || 0;
      return {
        studentsCount: students.count || 0,
        teachersCount: teachers.count || 0,
        classesCount: classes.count || 0,
        totalRevenue,
      };
    }

    return { role, schoolId };
  },

  async getStudentStats(studentId: string) {
    const supabase = getSupabase();
    const [grades, attendance] = await Promise.all([
      supabase.from('grades').select('score').eq('student_id', studentId),
      supabase.from('attendance').select('status').eq('student_id', studentId),
    ]);
    const avg = grades.data && grades.data.length > 0
      ? grades.data.reduce((s: number, g: any) => s + g.score, 0) / grades.data.length
      : 0;
    const totalDays = attendance.data?.length || 0;
    const presentDays = attendance.data?.filter((a: any) => a.status === 'PRESENT').length || 0;
    return {
      average: Math.round(avg * 100) / 100,
      totalGrades: grades.data?.length || 0,
      totalDays,
      presentDays,
      attendanceRate: totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 100,
    };
  },

  async getTeacherStats(teacherId: string) {
    const supabase = getSupabase();
    const [classes, checkins] = await Promise.all([
      supabase.from('class_subjects').select('class_id').eq('teacher_id', teacherId),
      supabase.from('teacher_attendance').select('status').eq('teacher_id', teacherId),
    ]);
    const totalDays = checkins.data?.length || 0;
    const presentDays = checkins.data?.filter((c: any) => c.status === 'PRESENT').length || 0;
    return {
      classesCount: classes.data?.length || 0,
      totalDays,
      presentDays,
      attendanceRate: totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 100,
    };
  },

  async getStudentBulletins(studentId: string) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('grades')
      .select('*, subject:subjects(*), period:periods(*)')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return camel(data || []);
  },

  async getPublicStats() {
    const supabase = getSupabase();
    const [schools, students, teachers, parents] = await Promise.all([
      supabase.from('schools').select('id', { count: 'exact', head: true }),
      supabase.from('students').select('id', { count: 'exact', head: true }),
      supabase.from('teachers').select('id', { count: 'exact', head: true }),
      supabase.from('users').select('id', { count: 'exact', head: true }).eq('role', 'PARENT'),
    ]);
    return {
      schools: schools.count || 0,
      students: students.count || 0,
      teachers: teachers.count || 0,
      parents: parents.count || 0,
    };
  },
};
