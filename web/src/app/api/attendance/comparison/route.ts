import { withSupabase } from '@/lib/supabase/server';
import { z } from 'zod';

const ComparisonSchema = z.object({
  classIds: z.string().optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const url = new URL(req.url);
  const params = Object.fromEntries(url.searchParams.entries());

  const validation = ComparisonSchema.safeParse({
    classIds: params.classIds || undefined,
    startDate: params.startDate || undefined,
    endDate: params.endDate || undefined,
  });

  if (!validation.success) {
    return Response.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
  }

  const filters = validation.data;

  let query = supabase
    .from('attendance')
    .select('status, class_id, classes(id, name)')
    .eq('school_id', schoolId);

  if (filters.classIds) {
    const ids = filters.classIds.split(',');
    query = query.in('class_id', ids);
  }
  if (filters.startDate) {
    query = query.gte('date', filters.startDate);
  }
  if (filters.endDate) {
    query = query.lte('date', filters.endDate);
  }

  const { data, error } = await query;

  if (error) return Response.json({ error: error.message }, { status: 500 });

  const records = data || [];
  const classStats: Record<string, { name: string; total: number; present: number; late: number; absent: number }> = {};

  for (const record of records) {
    const classId = record.class_id;
    const className = (record.classes as any)?.name || 'Unknown';
    if (!classStats[classId]) {
      classStats[classId] = { name: className, total: 0, present: 0, late: 0, absent: 0 };
    }
    classStats[classId].total++;
    classStats[classId][record.status.toLowerCase() as keyof typeof classStats[string]]++;
  }

  const comparison = Object.entries(classStats).map(([classId, stats]) => ({
    class_id: classId,
    class_name: stats.name,
    total: stats.total,
    present: stats.present,
    late: stats.late,
    absent: stats.absent,
    rate: stats.total > 0 ? Math.round((stats.present + stats.late) / stats.total * 10000) / 100 : 0,
  }));

  return Response.json({ data: comparison });
});
