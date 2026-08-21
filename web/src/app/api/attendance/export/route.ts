import { withSupabase } from '@supabase/server';
import { z } from 'zod';

const ExportSchema = z.object({
  classId: z.string().uuid().optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  format: z.enum(['csv', 'json', 'xlsx']).default('csv'),
  studentId: z.string().uuid().optional(),
  status: z.enum(['PRESENT', 'ABSENT', 'LATE']).optional(),
});

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const body = await req.json();
  const validation = ExportSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.issues.map((issue: any) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return Response.json({ error: 'Paramètres invalides', errors }, { status: 400 });
  }

  const filters = validation.data;

  let query = supabase
    .from('attendance')
    .select('*, students(id, first_name, last_name, matricule, class_id)')
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
  if (filters.status) {
    query = query.eq('status', filters.status);
  }

  query = query.order('date', { ascending: false });

  const { data, error } = await query;

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ data: data || [], format: filters.format, count: data?.length || 0 });
});
