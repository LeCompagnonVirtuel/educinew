import { withSupabase } from '@supabase/server';
import { z } from 'zod';

const TrendSchema = z.object({
  classId: z.string().uuid().optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  interval: z.enum(['day', 'week', 'month']).default('day'),
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

  const validation = TrendSchema.safeParse({
    classId: params.classId || undefined,
    startDate: params.startDate || undefined,
    endDate: params.endDate || undefined,
    interval: params.interval || undefined,
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

  query = query.order('date', { ascending: true });

  const { data, error } = await query;

  if (error) return Response.json({ error: error.message }, { status: 500 });

  const records = data || [];
  const grouped: Record<string, { present: number; absent: number; late: number; total: number }> = {};

  for (const record of records) {
    let key = record.date;
    if (filters.interval === 'week') {
      const d = new Date(record.date);
      const weekStart = new Date(d);
      weekStart.setDate(d.getDate() - d.getDay());
      key = weekStart.toISOString().split('T')[0];
    } else if (filters.interval === 'month') {
      key = record.date.substring(0, 7);
    }

    if (!grouped[key]) {
      grouped[key] = { present: 0, absent: 0, late: 0, total: 0 };
    }
    grouped[key].total++;
    grouped[key][record.status.toLowerCase() as keyof typeof grouped[string]]++;
  }

  const trend = Object.entries(grouped).map(([period, stats]) => ({
    period,
    ...stats,
    rate: stats.total > 0 ? Math.round((stats.present + stats.late) / stats.total * 10000) / 100 : 0,
  }));

  return Response.json({ data: trend, interval: filters.interval });
});
