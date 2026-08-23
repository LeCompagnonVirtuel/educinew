import { withSupabase } from '@/lib/supabase/server';
import { z } from 'zod';

const LevelRateSchema = z.object({
  levelId: z.string().uuid().optional(),
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

  const validation = LevelRateSchema.safeParse({
    levelId: params.levelId || undefined,
    startDate: params.startDate || undefined,
    endDate: params.endDate || undefined,
  });

  if (!validation.success) {
    return Response.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
  }

  const filters = validation.data;

  let query = supabase
    .from('attendance')
    .select('status, class_id, classes(id, level)')
    .eq('school_id', schoolId);

  if (filters.startDate) {
    query = query.gte('date', filters.startDate);
  }
  if (filters.endDate) {
    query = query.lte('date', filters.endDate);
  }

  const { data, error } = await query;

  if (error) return Response.json({ error: error.message }, { status: 500 });

  const records = data || [];
  const levelStats: Record<string, { total: number; present: number; late: number; absent: number }> = {};

  for (const record of records) {
    const level = (record.classes as any)?.level || 'unknown';
    if (!levelStats[level]) {
      levelStats[level] = { total: 0, present: 0, late: 0, absent: 0 };
    }
    levelStats[level].total++;
    levelStats[level][record.status.toLowerCase() as keyof typeof levelStats[string]]++;
  }

  const rates = Object.entries(levelStats).map(([level, stats]) => ({
    level,
    total: stats.total,
    present: stats.present,
    late: stats.late,
    absent: stats.absent,
    rate: stats.total > 0 ? Math.round((stats.present + stats.late) / stats.total * 10000) / 100 : 0,
  }));

  return Response.json({ rates });
});
