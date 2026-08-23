import { withSupabase } from '@/lib/supabase/server';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const url = new URL(req.url);
  const academicYearId = url.searchParams.get('academicYearId') || undefined;

  let query = supabase
    .from('classes')
    .select('id, name, capacity, status, level_id, section_id, stream_id, academic_year_id')
    .eq('school_id', schoolId);

  if (academicYearId) {
    query = query.eq('academic_year_id', academicYearId);
  }

  const { data: classes, error } = await query;

  if (error) return Response.json({ error: error.message }, { status: 500 });

  const totalClasses = classes?.length || 0;
  const activeClasses = classes?.filter((c: any) => c.status === 'ACTIVE').length || 0;
  const totalCapacity = classes?.reduce((sum: number, c: any) => sum + (c.capacity || 0), 0) || 0;

  let studentCount = 0;
  if (classes && classes.length > 0) {
    const classIds = classes.map((c: any) => c.id);
    const { count } = await supabase
      .from('students')
      .select('id', { count: 'exact', head: true })
      .in('class_id', classIds)
      .eq('status', 'ACTIVE');
    studentCount = count || 0;
  }

  return Response.json({
    totalClasses,
    activeClasses,
    totalCapacity,
    studentCount,
    averageStudentsPerClass: totalClasses > 0 ? Math.round(studentCount / totalClasses) : 0,
  });
});
