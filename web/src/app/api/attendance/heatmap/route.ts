import { withSupabase } from '@supabase/server';
import { z } from 'zod';

const HeatmapSchema = z.object({
  classId: z.string().uuid().optional(),
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

  const validation = HeatmapSchema.safeParse({
    classId: params.classId || undefined,
    startDate: params.startDate || undefined,
    endDate: params.endDate || undefined,
  });

  if (!validation.success) {
    return Response.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
  }

  const filters = validation.data;

  let query = supabase
    .from('attendance')
    .select('date, status')
    .eq('school_id', schoolId);

  if (filters.classId) {
    query = query.eq('class_id', filters.classId);
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
  const heatmapData: Record<string, { present: number; absent: number; late: number; total: number }> = {};

  for (const record of records) {
    if (!heatmapData[record.date]) {
      heatmapData[record.date] = { present: 0, absent: 0, late: 0, total: 0 };
    }
    heatmapData[record.date].total++;
    heatmapData[record.date][record.status.toLowerCase() as keyof typeof heatmapData[string]]++;
  }

  const heatmap = Object.entries(heatmapData).map(([date, stats]) => ({
    date,
    ...stats,
    rate: stats.total > 0 ? Math.round((stats.present + stats.late) / stats.total * 100) : 0,
  }));

  return Response.json({ data: heatmap });
});
