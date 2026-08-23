import { withSupabase } from '@/lib/supabase/server';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).at(-2);
  const limit = parseInt(url.searchParams.get('limit') || '50');

  const { data: student } = await supabase.from('students').select('id').eq('id', id).eq('school_id', ctx.schoolId).single();
  if (!student) return Response.json({ error: 'Élève introuvable' }, { status: 404 });

  const { data: events, error } = await supabase
    .from('student_timeline')
    .select('*')
    .eq('student_id', id).eq('school_id', ctx.schoolId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json(events || []);
});
