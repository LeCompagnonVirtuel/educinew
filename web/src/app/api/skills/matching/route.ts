import { withSupabase } from '@supabase/server';
import { z } from 'zod';
import { validateRequest } from '@/lib/api/validation';

const filtersSchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
});

const createSchema = z.object({
  name: z.string().min(1, 'Nom requis').max(200),
  description: z.string().max(1000).nullable().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED']).default('ACTIVE'),
  school_id: z.string().uuid().nullable().optional(),
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

  const validation = filtersSchema.safeParse({
    search: params.search || undefined,
    status: params.status || undefined,
    page: params.page ? parseInt(params.page) : undefined,
    limit: params.limit ? parseInt(params.limit) : undefined,
  });

  if (!validation.success) {
    return Response.json({ error: 'Paramètres invalides' }, { status: 400 });
  }

  const filters = validation.data;
  const page = filters.page || 1;
  const limit = filters.limit || 20;
  const offset = (page - 1) * limit;

  let query = supabase
    .from('skill_matching')
    .select('*', { count: 'exact' })
    .eq('school_id', schoolId)
    .is('deleted_at', null);

  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }
  if (filters.status && filters.status !== 'ALL') {
    query = query.eq('status', filters.status);
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

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const role = profile?.role;
  const schoolId = profile?.school_id;

  if (!['ADMIN', 'SUPER_ADMIN', 'DIRECTEUR'].includes(role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const body = await req.json();
  const validation = validateRequest(createSchema, { ...body, school_id: schoolId });
  if (!validation.success) {
    return Response.json({ error: validation.error }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('skill_matching')
    .insert({
      school_id: schoolId,
      name: validation.data.name,
      description: validation.data.description || null,
      status: validation.data.status,
      created_by: user.id,
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data, { status: 201 });
});
