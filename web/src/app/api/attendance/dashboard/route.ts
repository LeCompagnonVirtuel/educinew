import { withSupabase } from '@supabase/server';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const today = new Date().toISOString().split('T')[0];

  const { data: todayRecords } = await supabase
    .from('attendance')
    .select('status')
    .eq('school_id', schoolId)
    .eq('date', today);

  const { count: totalStudents } = await supabase
    .from('students')
    .select('id', { count: 'exact', head: true })
    .eq('school_id', schoolId)
    .eq('status', 'ACTIVE');

  const { count: activeAlerts } = await supabase
    .from('attendance_alerts')
    .select('id', { count: 'exact', head: true })
    .eq('school_id', schoolId)
    .eq('status', 'ACTIVE');

  const { count: pendingCorrections } = await supabase
    .from('attendance_corrections')
    .select('id', { count: 'exact', head: true })
    .eq('school_id', schoolId)
    .eq('status', 'PENDING');

  const todayData = todayRecords || [];
  const todayPresent = todayData.filter((r: any) => r.status === 'PRESENT').length;
  const todayAbsent = todayData.filter((r: any) => r.status === 'ABSENT').length;
  const todayLate = todayData.filter((r: any) => r.status === 'LATE').length;
  const todayRate = todayData.length > 0 ? Math.round((todayPresent + todayLate) / todayData.length * 100) : 0;

  return Response.json({
    today: {
      present: todayPresent,
      absent: todayAbsent,
      late: todayLate,
      rate: todayRate,
      total: todayData.length,
    },
    totalStudents: totalStudents || 0,
    activeAlerts: activeAlerts || 0,
    pendingCorrections: pendingCorrections || 0,
  });
});
