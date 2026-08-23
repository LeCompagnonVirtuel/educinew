import { withSupabase } from '@/lib/supabase/server';

export const GET = withSupabase({ auth: 'user' }, async (_req, ctx) => {
  const userId = ctx.userClaims?.id;
  if (!userId) {
    return Response.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const { data, error } = await (ctx.supabase as any)
    .from('users')
    .select('id, name, email, role, school_id, phone, photo_url, is_active, status, created_at, two_factor_enabled')
    .eq('id', userId)
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 404 });
  }

  return Response.json(data);
});

export const PATCH = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const userId = ctx.userClaims?.id;
  if (!userId) {
    return Response.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const body = await req.json();
  const ALLOWED_FIELDS = ['name', 'phone', 'photo_url', 'two_factor_enabled'];
  const sanitized: Record<string, any> = {};
  for (const key of ALLOWED_FIELDS) {
    if (key in body) sanitized[key] = body[key];
  }

  if (Object.keys(sanitized).length === 0) {
    return Response.json({ error: 'Aucun champ modifiable fourni' }, { status: 400 });
  }

  const { data, error } = await (ctx.supabase as any)
    .from('users')
    .update(sanitized)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json(data);
});
