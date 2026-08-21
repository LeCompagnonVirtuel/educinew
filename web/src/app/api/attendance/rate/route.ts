import { withSupabase } from '@supabase/server';
import { z } from 'zod';

const RateSchema = z.object({
  studentId: z.string().uuid().optional(),
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

  const validation = RateSchema.safeParse({
    studentId: params.studentId || undefined,
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
    .select('status')
    .eq('school_id', schoolId);

  if (filters.studentId) {
    query = query.eq('student_id', filters.studentId);
  }
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
  const total = records.length;
  const present = records.filter((r: any) => r.status === 'PRESENT').length;
  const late = records.filter((r: any) => r.status === 'LATE').length;
  const absent = records.filter((r: any) => r.status === 'ABSENT').length;

  const rate = total > 0 ? Math.round((present + late) / total * 10000) / 100 : 0;

  return Response.json({ total, present, late, absent, rate });
});
