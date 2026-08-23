import { withSupabase } from '@/lib/supabase/server';
import { SearchSchema } from '@/features/students/validators';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const url = new URL(req.url);
  const query = url.searchParams.get('query') || '';
  const limit = parseInt(url.searchParams.get('limit') || '20');

  const validation = SearchSchema.safeParse({ query, limit });
  if (!validation.success) {
    return Response.json({ error: 'Paramètres invalides' }, { status: 400 });
  }

  const { data: students, error } = await supabase
    .from('students')
    .select('*')
    .eq('school_id', schoolId)
    .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,matricule.ilike.%${query}%`)
    .limit(limit);

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json(students || []);
});
