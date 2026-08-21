import { withSupabase } from '@supabase/server';
import { z } from 'zod';

const TimelineSchema = z.object({
  classId: z.string().uuid().optional(),
  studentId: z.string().uuid().optional(),
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

  const validation = TimelineSchema.safeParse({
    classId: params.classId || undefined,
    studentId: params.studentId || undefined,
    startDate: params.startDate || undefined,
    endDate: params.endDate || undefined,
  });

  if (!validation.success) {
    return Response.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
  }

  const filters = validation.data;

  let query = supabase
    .from('attendance')
    .select('*, students(id, first_name, last_name)')
    .eq('school_id', schoolId);

  if (filters.classId) {
    query = query.eq('class_id', filters.classId);
  }
  if (filters.studentId) {
    query = query.eq('student_id', filters.studentId);
  }
  if (filters.startDate) {
    query = query.gte('date', filters.startDate);
  }
  if (filters.endDate) {
    query = query.lte('date', filters.endDate);
  }

  query = query.order('date', { ascending: false });
  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ data: data || [] });
});
