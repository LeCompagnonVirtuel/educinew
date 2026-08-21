import { withSupabase } from '@supabase/server';

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', ctx.user.id).single();
  const role = profile?.role;
  const schoolId = profile?.school_id;

  if (!['ADMIN', 'SUPER_ADMIN', 'TEACHER'].includes(role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const pathParts = req.nextUrl.pathname.split('/').filter(Boolean);
  const id = pathParts[pathParts.length - 2];

  const { data, error } = await supabase
    .from('attendance_sessions')
    .update({
      status: 'ENDED',
      end_time: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('school_id', schoolId)
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json(data);
});
