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
    .from('attendance_devices')
    .select('*')
    .eq('id', id)
    .eq('school_id', schoolId)
    .single();

  if (error) return Response.json({ error: 'Appareil non trouvé' }, { status: 404 });
  return Response.json(data);
});
