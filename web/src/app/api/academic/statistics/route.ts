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

  const [levelsResult, sectionsResult, streamsResult, roomsResult, departmentsResult, classesResult, subjectsResult, teachersResult, studentsResult] = await Promise.all([
    supabase.from('levels').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
    supabase.from('sections').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
    supabase.from('streams').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
    supabase.from('rooms').select('id, capacity', { count: 'exact' }).eq('school_id', schoolId),
    supabase.from('departments').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
    supabase.from('classes').select('id, capacity', { count: 'exact' }).eq('school_id', schoolId),
    supabase.from('subjects').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
    supabase.from('teachers').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
    supabase.from('students').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
  ]);

  const classes = classesResult.data || [];
  const totalCapacity = classes.reduce((sum: number, c: any) => sum + (c.capacity || 0), 0);
  const roomCapacity = (roomsResult.data || []).reduce((sum: number, r: any) => sum + (r.capacity || 0), 0);

  return Response.json({
    levels: levelsResult.count || 0,
    sections: sectionsResult.count || 0,
    streams: streamsResult.count || 0,
    rooms: roomsResult.count || 0,
    departments: departmentsResult.count || 0,
    classes: classesResult.count || 0,
    subjects: subjectsResult.count || 0,
    teachers: teachersResult.count || 0,
    students: studentsResult.count || 0,
    totalClassCapacity: totalCapacity,
    totalRoomCapacity: roomCapacity,
    occupancyRate: totalCapacity > 0 ? Math.round(((studentsResult.count || 0) / totalCapacity) * 100) : 0,
  });
});
