import { withSupabase } from '@/lib/supabase/server';

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  if (!['SUPER_ADMIN', 'ADMIN'].includes(profile?.role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).at(-2);

  const { data: cls } = await supabase.from('classes').select('id, school_id').eq('id', id).eq('school_id', ctx.schoolId).single();
  if (!cls) return Response.json({ error: 'Classe introuvable' }, { status: 404 });
  if (cls.school_id !== profile?.school_id) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const { error } = await supabase
    .from('classes')
    .update({ status: 'ACTIVE', is_active: true, archived_at: null, archived_by: null, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json({ success: true });
});
