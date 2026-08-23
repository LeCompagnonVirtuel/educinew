import { withSupabase } from '@/lib/supabase/server';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).pop();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: entry, error } = await supabase
    .from('timetable')
    .select('*, classes(name), subjects(name), teachers(first_name, last_name), rooms(name)')
    .eq('id', id)
    .eq('school_id', ctx.schoolId)
    .single();

  if (error || !entry) return Response.json({ error: 'Entrée introuvable' }, { status: 404 });

  return Response.json(entry);
});

export const DELETE = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).pop();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  if (!['SUPER_ADMIN', 'ADMIN'].includes(profile?.role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const { data: entry } = await supabase.from('timetable').select('id, school_id').eq('id', id).single();
  if (!entry) return Response.json({ error: 'Entrée introuvable' }, { status: 404 });
  if (entry.school_id !== profile?.school_id) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const { error } = await supabase.from('timetable').delete().eq('id', id);

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json({ success: true });
});
