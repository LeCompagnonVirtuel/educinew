import { withSupabase } from '@/lib/supabase/server';
import { z } from 'zod';

const ExportSchema = z.object({
  type: z.enum(['students', 'teachers', 'classes', 'subjects', 'rooms', 'departments', 'sections', 'streams', 'assignments', 'timetable']),
  academicYearId: z.string().uuid().optional(),
  format: z.enum(['json', 'csv']).optional(),
});

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const url = new URL(req.url);
  const params = Object.fromEntries(url.searchParams.entries());

  const validation = ExportSchema.safeParse({
    type: params.type || undefined,
    academicYearId: params.academicYearId || undefined,
    format: params.format || undefined,
  });

  if (!validation.success) {
    return Response.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
  }

  const { type, academicYearId, format } = validation.data;

  const tableMap: Record<string, string> = {
    students: 'students',
    teachers: 'teachers',
    classes: 'classes',
    subjects: 'subjects',
    rooms: 'rooms',
    departments: 'departments',
    sections: 'sections',
    streams: 'streams',
    assignments: 'assignments',
    timetable: 'timetable',
  };

  const table = tableMap[type];
  if (!table) {
    return Response.json({ error: 'Type invalide' }, { status: 400 });
  }

  let query = supabase
    .from(table)
    .select('*')
    .eq('school_id', schoolId);

  if (academicYearId) {
    query = query.eq('academic_year_id', academicYearId);
  }

  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;

  if (error) return Response.json({ error: error.message }, { status: 500 });

  if (format === 'csv' && data && data.length > 0) {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map((row: any) =>
      Object.values(row).map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')
    );
    const csv = [headers, ...rows].join('\n');

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${type}_export.csv"`,
      },
    });
  }

  return Response.json({
    type,
    count: data?.length || 0,
    data: data || [],
  });
});
