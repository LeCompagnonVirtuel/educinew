import { withSupabase } from '@/lib/supabase/server';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const { data: students } = await supabase
    .from('students')
    .select('status, gender, level, created_at')
    .eq('school_id', schoolId);

  const list = students || [];
  const active = list.filter((s: any) => s.status === 'ACTIVE');
  const now = new Date();
  const thisMonth = list.filter((s: any) => {
    const d = new Date(s.created_at);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  return Response.json({
    schoolId,
    totalStudents: list.length,
    activeStudents: active.length,
    inactiveStudents: list.length - active.length,
    newStudents: thisMonth.length,
    boys: list.filter((s: any) => s.gender === 'M').length,
    girls: list.filter((s: any) => s.gender === 'F').length,
    byLevel: list.reduce((acc: Record<string, number>, s: any) => {
      const level = s.level || 'Non défini';
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {}),
    byStatus: list.reduce((acc: Record<string, number>, s: any) => {
      const status = s.status || 'ACTIVE';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {}),
  });
});
