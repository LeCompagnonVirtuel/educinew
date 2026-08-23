import { withSupabase } from '@/lib/supabase/server';
import { bulkAttendanceSchema } from '@/lib/api/validation';

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const role = profile?.role;
  const schoolId = profile?.school_id;

  if (!['ADMIN', 'SUPER_ADMIN', 'TEACHER'].includes(role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const body = await req.json();
  const validation = bulkAttendanceSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.issues.map((issue: any) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return Response.json({ error: 'Données invalides', errors }, { status: 400 });
  }

  const records = validation.data.map((item: any) => ({
    ...item,
    school_id: schoolId,
    created_by: user.id,
  }));

  const { data, error } = await supabase
    .from('attendance')
    .insert(records)
    .select();

  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json({ data, count: data?.length || 0 }, { status: 201 });
});
