import { withSupabase } from '@/lib/supabase/server';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).at(-2);

  const { data: teacher } = await supabase.from('teachers').select('id').eq('id', id).single();
  if (!teacher) return Response.json({ error: 'Enseignant introuvable' }, { status: 404 });

  const { data: assignments, error } = await supabase
    .from('teacher_assignments')
    .select('*, class:classes(id, name, level), subject:teacher_subjects(id, name)')
    .eq('teacher_id', id)
    .eq('is_active', true);

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json(assignments || []);
});
