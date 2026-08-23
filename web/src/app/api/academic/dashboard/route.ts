import { withSupabase } from '@/lib/supabase/server';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const [studentsResult, teachersResult, classesResult, subjectsResult, recentActivityResult] = await Promise.all([
    supabase.from('students').select('id, status', { count: 'exact' }).eq('school_id', schoolId),
    supabase.from('teachers').select('id, status', { count: 'exact' }).eq('school_id', schoolId),
    supabase.from('classes').select('id, status', { count: 'exact' }).eq('school_id', schoolId),
    supabase.from('subjects').select('id, status', { count: 'exact' }).eq('school_id', schoolId),
    supabase.from('audit_logs').select('*').eq('school_id', schoolId).order('created_at', { ascending: false }).limit(10),
  ]);

  const students = studentsResult.data || [];
  const teachers = teachersResult.data || [];
  const classes = classesResult.data || [];

  return Response.json({
    students: {
      total: studentsResult.count || 0,
      active: students.filter((s: any) => s.status === 'ACTIVE').length,
    },
    teachers: {
      total: teachersResult.count || 0,
      active: teachers.filter((t: any) => t.status === 'ACTIVE').length,
    },
    classes: {
      total: classesResult.count || 0,
      active: classes.filter((c: any) => c.status === 'ACTIVE').length,
    },
    subjects: {
      total: subjectsResult.count || 0,
      active: subjectsResult.data?.filter((s: any) => s.status === 'ACTIVE').length || 0,
    },
    recentActivity: recentActivityResult.data || [],
  });
});
