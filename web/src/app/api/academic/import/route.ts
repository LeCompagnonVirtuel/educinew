import { withSupabase } from '@/lib/supabase/server';
import { z } from 'zod';

const ImportSchema = z.object({
  type: z.enum(['students', 'teachers', 'classes', 'subjects', 'rooms', 'departments', 'sections', 'streams']),
  data: z.array(z.record(z.string(), z.any())).min(1, 'Données requises'),
  academicYearId: z.string().uuid().optional(),
});

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const role = profile?.role;
  const schoolId = profile?.school_id;

  if (!['ADMIN', 'SUPER_ADMIN'].includes(role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const body = await req.json();
  const validation = ImportSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.issues.map((issue: any) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return Response.json({ error: 'Données invalides', errors }, { status: 400 });
  }

  const { type, data: importData, academicYearId } = validation.data;

  const tableMap: Record<string, string> = {
    students: 'students',
    teachers: 'teachers',
    classes: 'classes',
    subjects: 'subjects',
    rooms: 'rooms',
    departments: 'departments',
    sections: 'sections',
    streams: 'streams',
  };

  const table = tableMap[type];
  if (!table) {
    return Response.json({ error: 'Type invalide' }, { status: 400 });
  }

  const records = importData.map((item: any) => ({
    ...item,
    school_id: schoolId,
    academic_year_id: academicYearId || item.academic_year_id || null,
    status: 'ACTIVE',
  }));

  const { data: inserted, error } = await supabase
    .from(table)
    .insert(records)
    .select();

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json({
    success: true,
    imported: inserted?.length || 0,
    type,
  }, { status: 201 });
});
