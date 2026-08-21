import { supabase, camel, getUserProfile } from './supabase';
import { cached } from './base';

export async function getDashboardStats(_userId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return cached(`dashboard_${user.id}`, 180000, async () => {
    const profile = await getUserProfile();
    const role = profile?.role || user.user_metadata?.role;
    const schoolId = profile?.school_id || user.user_metadata?.school_id;
    if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
      const [s, t, c] = await Promise.all([
        supabase.from('students').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
        supabase.from('teachers').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
        supabase.from('classes').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
      ]);
      return { studentsCount: s.count || 0, teachersCount: t.count || 0, classesCount: c.count || 0 };
    }
    if (role === 'STUDENT') {
      const { data: studentRow } = await supabase.from('students').select('id').eq('user_id', user.id).single();
      if (!studentRow) return { average: 0, rank: 0, attendance: 0, progress: 0 };
      const studentId = studentRow.id;
      const [gradesResult, attTotalResult, attPresentResult] = await Promise.all([
        supabase.from('grades').select('score').eq('student_id', studentId),
        supabase.from('attendance').select('id', { count: 'exact', head: true }).eq('student_id', studentId),
        supabase.from('attendance').select('id', { count: 'exact', head: true }).eq('student_id', studentId).eq('status', 'PRESENT'),
      ]);
      const grades = gradesResult.data;
      const avg = grades && grades.length > 0 ? Math.round(grades.reduce((s: number, g: any) => s + (g.score || 0), 0) / grades.length) : 0;
      const attTotal = attTotalResult.count || 0;
      const attPresent = attPresentResult.count || 0;
      const attRate = attTotal > 0 ? Math.round((attPresent / attTotal) * 100) : 0;
      return { average: avg, rank: 0, attendance: attRate, progress: avg };
    }
    return { role, schoolId, average: 0, rank: 0, attendance: 0, progress: 0 };
  });
}

export async function getQuickActions(role: string) {
  const actions: Record<string, any[]> = {
    STUDENT: [
      { icon: 'school-outline', label: 'Notes', color: '#E8F0FE', iconColor: '#1B4D8E', screen: 'Learning' },
      { icon: 'calendar-outline', label: 'Emploi du temps', color: '#E0F2FE', iconColor: '#0284C7', screen: 'StudentSchedule' },
      { icon: 'qr-code-outline', label: 'Mon Badge', color: '#F3E8FF', iconColor: '#7C3AED', screen: 'QRBadge' },
      { icon: 'document-text-outline', label: 'Devoirs', color: '#FEF3C7', iconColor: '#D97706', screen: 'StudentAssignments' },
      { icon: 'chatbubble-outline', label: 'Messages', color: '#F0F4FF', iconColor: '#3525cd', screen: 'Messages' },
      { icon: 'sparkles-outline', label: 'EduCI AI', color: '#E8F0FE', iconColor: '#1B4D8E', screen: 'AI' },
    ],
    TEACHER: [
      { icon: 'people-outline', label: 'Mes classes', color: '#E8F0FE', iconColor: '#1B4D8E', screen: 'TeacherClasses' },
      { icon: 'checkmark-circle-outline', label: 'Présences', color: '#ECFDF5', iconColor: '#059669', screen: 'TeacherAttendance' },
      { icon: 'create-outline', label: 'Saisir Notes', color: '#F0F4FF', iconColor: '#3525cd', screen: 'TeacherGrades' },
      { icon: 'calendar-outline', label: 'Emploi du temps', color: '#FFF8E1', iconColor: '#F5A623', screen: 'TeacherSchedule' },
    ],
    PARENT: [
      { icon: 'people-outline', label: 'Mes enfants', color: '#E8F0FE', iconColor: '#1B4D8E', screen: 'ChildProfile' },
      { icon: 'card-outline', label: 'Paiements', color: '#ECFDF5', iconColor: '#059669', screen: 'Payments' },
      { icon: 'chatbubble-outline', label: 'Messages', color: '#F0F4FF', iconColor: '#3525cd', screen: 'Messages' },
    ],
  };
  return actions[role] || actions.STUDENT;
}

export async function getUserTasks(userId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const profile = await getUserProfile();
  const role = profile?.role || user.user_metadata?.role;
  if (role !== 'STUDENT') return [];
  const { data: student } = await supabase.from('students').select('id, class_id').eq('user_id', userId).single();
  if (!student) return [];

  const today = new Date().toISOString().split('T')[0];
  const [invoicesRes, assignmentsRes] = await Promise.all([
    supabase.from('invoices').select('id, type, due_date, final_amount').eq('student_id', student.id).eq('status', 'UNPAID').limit(3),
    student.class_id
      ? supabase.from('assignments').select('id, title, due_date, subject:subjects(name)').eq('class_id', student.class_id).gte('due_date', today).order('due_date', { ascending: true }).limit(3)
      : Promise.resolve({ data: [] }),
  ]);

  const tasks: any[] = [];
  for (const a of (assignmentsRes.data || [])) {
    tasks.push({
      subject: (a as any).subject?.name ? `${(a as any).subject.name}: ${a.title}` : a.title,
      due: a.due_date ? new Date(a.due_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : 'Bientôt',
      urgent: a.due_date ? new Date(a.due_date) <= new Date(Date.now() + 2 * 86400000) : false,
      screen: 'StudentAssignments',
    });
  }
  for (const inv of (invoicesRes.data || [])) {
    tasks.push({
      subject: `Frais: ${inv.type || 'Scolarité'}`,
      due: inv.due_date ? new Date(inv.due_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : 'Bientôt',
      urgent: inv.due_date ? new Date(inv.due_date) <= new Date(Date.now() + 3 * 86400000) : false,
      screen: 'Payments',
    });
  }
  return tasks;
}

export async function getSchoolStats(id: string) {
  const [s, t, c] = await Promise.all([
    supabase.from('students').select('id', { count: 'exact', head: true }).eq('school_id', id),
    supabase.from('teachers').select('id', { count: 'exact', head: true }).eq('school_id', id),
    supabase.from('classes').select('id', { count: 'exact', head: true }).eq('school_id', id),
  ]);
  return { studentsCount: s.count || 0, teachersCount: t.count || 0, classesCount: c.count || 0 };
}

export async function getParentDashboard(studentId: string) {
  const today = new Date().toISOString().split('T')[0];
  const { data: student } = await supabase.from('students').select('school_id, class_id').eq('id', studentId).single();
  const schoolId = student?.school_id;
  let announcementsQ = supabase.from('announcements').select('id, title, created_at').order('created_at', { ascending: false }).limit(5);
  if (schoolId) announcementsQ = announcementsQ.eq('school_id', schoolId);
  let assignmentsQ = student?.class_id
    ? supabase.from('assignments').select('*, subject:subjects(name)').eq('class_id', student.class_id).gte('due_date', today).order('due_date', { ascending: true }).limit(5)
    : Promise.resolve({ data: [] });
  const [attendanceRes, gradesRes, paymentsRes, announcementsRes, assignmentsRes] = await Promise.all([
    supabase.from('attendance').select('*').eq('student_id', studentId).eq('date', today).maybeSingle(),
    supabase.from('grades').select('*, subject:subjects(name)').eq('student_id', studentId).order('created_at', { ascending: false }).limit(5),
    supabase.from('invoices').select('id').eq('student_id', studentId).eq('status', 'UNPAID'),
    announcementsQ,
    assignmentsQ,
  ]);

  const grades = camel(gradesRes.data || []);
  const avg = grades.length > 0 ? grades.reduce((s: number, g: any) => s + (g.score || 0), 0) / grades.length : 0;

  return {
    attendance: attendanceRes.data ? { present: attendanceRes.data.status === 'present', time: attendanceRes.data.check_in_time } : null,
    recentGrades: grades.map((g: any) => ({ subject: g.subject?.name || 'Matière', grade: g.score || 0, max: g.maxScore || 20, date: g.createdAt || g.created_at })),
    average: avg,
    pendingPayments: paymentsRes.data?.length || 0,
    unreadMessages: 0,
    upcomingEvents: [],
    announcements: (announcementsRes.data || []).map((a: any) => ({ title: a.title, date: a.created_at })),
    nextAssignments: (assignmentsRes.data || []).map((a: any) => ({ subject: a.subject?.name || '', title: a.title || '', dueDate: a.due_date })),
  };
}
