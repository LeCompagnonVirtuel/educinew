import { withSupabase } from '@supabase/server';
import { z } from 'zod';

const MapSchema = z.object({
  classId: z.string().uuid().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
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

  const validation = MapSchema.safeParse({
    classId: params.classId || undefined,
    date: params.date || undefined,
  });

  if (!validation.success) {
    return Response.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
  }

  const filters = validation.data;

  let query = supabase
    .from('attendance')
    .select('student_id, status, latitude, longitude, students(id, first_name, last_name)')
    .eq('school_id', schoolId);

  if (filters.classId) {
    query = query.eq('class_id', filters.classId);
  }
  if (filters.date) {
    query = query.eq('date', filters.date);
  }

  const { data, error } = await query;

  if (error) return Response.json({ error: error.message }, { status: 500 });

  const points = (data || [])
    .filter((r: any) => r.latitude && r.longitude)
    .map((r: any) => ({
      student_id: r.student_id,
      status: r.status,
      latitude: r.latitude,
      longitude: r.longitude,
      student: r.students,
    }));

  return Response.json({ data: points });
});
