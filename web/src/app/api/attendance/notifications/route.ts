import { withSupabase } from '@supabase/server';
import { z } from 'zod';

const NotificationsSchema = z.object({
  status: z.enum(['READ', 'UNREAD']).optional(),
  type: z.string().optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
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

  const validation = NotificationsSchema.safeParse({
    status: params.status || undefined,
    type: params.type || undefined,
    page: params.page ? parseInt(params.page) : undefined,
    limit: params.limit ? parseInt(params.limit) : undefined,
  });

  if (!validation.success) {
    return Response.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
  }

  const filters = validation.data;
  const page = filters.page || 1;
  const limit = filters.limit || 20;
  const offset = (page - 1) * limit;

  let query = supabase
    .from('attendance_notifications')
    .select('*', { count: 'exact' })
    .eq('school_id', schoolId)
    .eq('user_id', user.id);

  if (filters.status === 'READ') {
    query = query.eq('is_read', true);
  } else if (filters.status === 'UNREAD') {
    query = query.eq('is_read', false);
  }
  if (filters.type) {
    query = query.eq('type', filters.type);
  }

  query = query.order('created_at', { ascending: false });
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({
    data: data || [],
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  });
});
