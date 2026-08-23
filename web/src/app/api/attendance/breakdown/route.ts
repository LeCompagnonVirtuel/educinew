import { withSupabase } from '@/lib/supabase/server';
import { z } from 'zod';

const BreakdownSchema = z.object({
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

  const validation = BreakdownSchema.safeParse({
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
    .select('status, student_id, students(id, first_name, last_name, matricule)')
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
  const studentStats: Record<string, { name: string; matricule: string; total: number; present: number; late: number; absent: number }> = {};

  for (const record of records) {
    const studentId = record.student_id;
    const student = record.students as any;
    if (!studentStats[studentId]) {
      studentStats[studentId] = {
        name: student ? `${student.first_name} ${student.last_name}` : 'Unknown',
        matricule: student?.matricule || '',
        total: 0,
        present: 0,
        late: 0,
        absent: 0,
      };
    }
    studentStats[studentId].total++;
    studentStats[studentId][record.status.toLowerCase() as keyof typeof studentStats[string]]++;
  }

  const breakdown = Object.entries(studentStats).map(([studentId, stats]) => ({
    student_id: studentId,
    student_name: stats.name,
    matricule: stats.matricule,
    total: stats.total,
    present: stats.present,
    late: stats.late,
    absent: stats.absent,
    rate: stats.total > 0 ? Math.round((stats.present + stats.late) / stats.total * 10000) / 100 : 0,
  }));

  return Response.json({ data: breakdown });
});
