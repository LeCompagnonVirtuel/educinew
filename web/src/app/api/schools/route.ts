import { withSupabase } from '@/lib/supabase/server';
import { CreateSchoolSchema, SchoolFiltersSchema } from '@/features/schools/validators';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  if (!['SUPER_ADMIN', 'ADMIN'].includes(profile?.role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const url = new URL(req.url);
  const params = Object.fromEntries(url.searchParams.entries());

  const validation = SchoolFiltersSchema.safeParse({
    search: params.search || undefined,
    status: params.status || undefined,
    plan: params.plan || undefined,
    city: params.city || undefined,
    region: params.region || undefined,
    page: params.page ? parseInt(params.page) : undefined,
    limit: params.limit ? parseInt(params.limit) : undefined,
    sortBy: params.sortBy || undefined,
    sortOrder: params.sortOrder || undefined,
  });

  if (!validation.success) {
    return Response.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
  }

  const filters = validation.data;
  const page = filters.page || 1;
  const limit = filters.limit || 20;
  const offset = (page - 1) * limit;

  let query = supabase.from('schools').select('*', { count: 'exact' });

  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
  }

  if (filters.status && filters.status !== 'ALL') {
    if (filters.status === 'ACTIVE') {
      query = query.eq('is_active', true);
    } else if (filters.status === 'ARCHIVED') {
      query = query.eq('is_active', false);
    }
  }

  if (filters.city) {
    query = query.eq('city', filters.city);
  }

  if (filters.region) {
    query = query.eq('region', filters.region);
  }

  const sortBy = filters.sortBy || 'created_at';
  const sortOrder = filters.sortOrder || 'desc';
  query = query.order(sortBy, { ascending: sortOrder === 'asc' });
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

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

  const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();
  if (!['SUPER_ADMIN'].includes(profile?.role)) {
    return Response.json({ error: 'Seul un SUPER_ADMIN peut créer un établissement' }, { status: 403 });
  }

  const body = await req.json();
  const validation = CreateSchoolSchema.safeParse(body);

  if (!validation.success) {
    return Response.json({ error: 'Données invalides', details: validation.error.flatten() }, { status: 400 });
  }

  const data = validation.data;

  const { data: existing } = await supabase.from('schools').select('id').eq('name', data.name).single();
  if (existing) {
    return Response.json({ error: 'Un établissement avec ce nom existe déjà' }, { status: 409 });
  }

  const { data: school, error } = await supabase
    .from('schools')
    .insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      address: data.address || null,
      city: data.city || null,
      region: data.region || null,
      country: data.country || "Côte d'Ivoire",
      website: data.website || null,
      sigle: data.sigle || null,
      slogan: data.slogan || null,
      description: data.description || null,
      is_active: true,
    })
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json(school, { status: 201 });
});
