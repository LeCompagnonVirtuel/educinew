import { withSupabase } from '@supabase/server';

export const GET = withSupabase({ auth: 'user' }, async (req, { params }) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const { id } = await params;

  const { data, error } = await supabase
    .from('attendance_sessions')
    .select('*')
    .eq('id', id)
    .eq('school_id', schoolId)
    .single();

  if (error) return Response.json({ error: 'Session non trouvée' }, { status: 404 });
  return Response.json(data);
});

export const DELETE = withSupabase({ auth: 'user' }, async (req, { params }) => {
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

  const { id } = await params;

  const { error } = await supabase
    .from('attendance_sessions')
    .delete()
    .eq('id', id)
    .eq('school_id', schoolId);

  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json({ success: true });
});
