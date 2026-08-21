import { withSupabase } from '@supabase/server';
import { z } from 'zod';

const HistorySchema = z.object({
  entityType: z.string().min(1),
  entityId: z.string().uuid(),
});

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const url = new URL(req.url);
  const params = Object.fromEntries(url.searchParams.entries());

  const validation = HistorySchema.safeParse({
    entityType: params.entityType || undefined,
    entityId: params.entityId || undefined,
  });

  if (!validation.success) {
    return Response.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
  }

  const { entityType, entityId } = validation.data;

  const { data, error } = await supabase
    .from('attendance_audit_log')
    .select('*, users(id, email)')
    .eq('school_id', schoolId)
    .eq('entity_type', entityType)
    .eq('entity_id', entityId)
    .order('created_at', { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ data: data || [] });
});
