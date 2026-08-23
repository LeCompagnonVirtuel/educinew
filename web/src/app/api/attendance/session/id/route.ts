import { withSupabase } from '@/lib/supabase/server';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;

  const { data: profile } = await supabase.from('users').select('school_id').eq('id', ctx.user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const params = await req.nextUrl.pathname.split('/').filter(Boolean);
  const id = params[params.length - 1];

  const { data, error } = await supabase
    .from('attendance_sessions')
    .select('*')
    .eq('id', id)
    .eq('school_id', schoolId)
    .single();

  if (error) return Response.json({ error: 'Session non trouvée' }, { status: 404 });
  return Response.json(data);
});

export const DELETE = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', ctx.user.id).single();
  const role = profile?.role;
  const schoolId = profile?.school_id;

  if (!['ADMIN', 'SUPER_ADMIN'].includes(role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const params = await req.nextUrl.pathname.split('/').filter(Boolean);
  const id = params[params.length - 2];

  const { error } = await supabase
    .from('attendance_sessions')
    .delete()
    .eq('id', id)
    .eq('school_id', schoolId);

  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json({ success: true });
});
