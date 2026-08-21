import { withSupabase } from '@supabase/server';
import { z } from 'zod';

const LowAttendanceSchema = z.object({
  threshold: z.number().min(0).max(100).default(75),
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

  const validation = LowAttendanceSchema.safeParse({
    threshold: params.threshold ? parseFloat(params.threshold) : undefined,
    classId: params.classId || undefined,
    startDate: params.startDate || undefined,
    endDate: params.endDate || undefined,
  });

  if (!validation.success) {
    return Response.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
  }

  const { threshold, classId, startDate, endDate } = validation.data;

  let query = supabase
    .from('attendance')
    .select('student_id, status')
    .eq('school_id', schoolId);

  if (classId) {
    query = query.eq('class_id', classId);
  }
  if (startDate) {
    query = query.gte('date', startDate);
  }
  if (endDate) {
    query = query.lte('date', endDate);
  }

  const { data, error } = await query;

  if (error) return Response.json({ error: error.message }, { status: 500 });

  const records = data || [];
  const studentStats: Record<string, { total: number; present: number }> = {};

  for (const record of records) {
    if (!studentStats[record.student_id]) {
      studentStats[record.student_id] = { total: 0, present: 0 };
    }
    studentStats[record.student_id].total++;
    if (record.status === 'PRESENT' || record.status === 'LATE') {
      studentStats[record.student_id].present++;
    }
  }

  const alerts: any[] = [];
  for (const [studentId, stats] of Object.entries(studentStats)) {
    const rate = stats.total > 0 ? (stats.present / stats.total * 100) : 0;
    if (rate < threshold) {
      alerts.push({ student_id: studentId, rate: Math.round(rate * 100) / 100, total: stats.total, present: stats.present });
    }
  }

  return Response.json({ alerts, count: alerts.length, threshold });
});
