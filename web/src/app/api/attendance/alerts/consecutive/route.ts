import { withSupabase } from '@supabase/server';
import { z } from 'zod';

const ConsecutiveSchema = z.object({
  threshold: z.number().int().min(1).max(30).default(3),
  classId: z.string().uuid().optional(),
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

  const validation = ConsecutiveSchema.safeParse({
    threshold: params.threshold ? parseInt(params.threshold) : undefined,
    classId: params.classId || undefined,
  });

  if (!validation.success) {
    return Response.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
  }

  const { threshold, classId } = validation.data;

  let query = supabase
    .from('attendance')
    .select('student_id, date, status')
    .eq('school_id', schoolId)
    .eq('status', 'ABSENT')
    .order('date', { ascending: false });

  if (classId) {
    query = query.eq('class_id', classId);
  }

  const { data, error } = await query;

  if (error) return Response.json({ error: error.message }, { status: 500 });

  const records = data || [];
  const studentAbsences: Record<string, string[]> = {};

  for (const record of records) {
    if (!studentAbsences[record.student_id]) {
      studentAbsences[record.student_id] = [];
    }
    studentAbsences[record.student_id].push(record.date);
  }

  const alerts: any[] = [];
  for (const [studentId, dates] of Object.entries(studentAbsences)) {
    const sorted = dates.sort().reverse();
    let consecutive = 1;
    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i - 1]);
      const curr = new Date(sorted[i]);
      const diff = (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);
      if (diff <= 1) {
        consecutive++;
      } else {
        break;
      }
    }
    if (consecutive >= threshold) {
      alerts.push({ student_id: studentId, consecutive_absences: consecutive, last_date: sorted[0] });
    }
  }

  return Response.json({ alerts, count: alerts.length, threshold });
});
