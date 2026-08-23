import { withSupabase } from '@/lib/supabase/server';
import { z } from 'zod';

const ClassFiltersSchema = z.object({
  search: z.string().optional(),
  levelId: z.string().uuid().optional(),
  sectionId: z.string().uuid().optional(),
  streamId: z.string().uuid().optional(),
  academicYearId: z.string().uuid().optional(),
  status: z.string().optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

const CreateClassSchema = z.object({
  name: z.string().min(1, 'Nom requis'),
  code: z.string().optional(),
  levelId: z.string().uuid().optional(),
  sectionId: z.string().uuid().optional(),
  streamId: z.string().uuid().optional(),
  academicYearId: z.string().uuid().optional(),
  roomId: z.string().uuid().optional(),
  capacity: z.number().int().positive().optional(),
  description: z.string().optional(),
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

  const validation = ClassFiltersSchema.safeParse({
    search: params.search || undefined,
    levelId: params.levelId || undefined,
    sectionId: params.sectionId || undefined,
    streamId: params.streamId || undefined,
    academicYearId: params.academicYearId || undefined,
    status: params.status || undefined,
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

  let query = supabase
    .from('classes')
    .select('*', { count: 'exact' })
    .eq('school_id', schoolId);

  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }
  if (filters.levelId) {
    query = query.eq('level_id', filters.levelId);
  }
  if (filters.sectionId) {
    query = query.eq('section_id', filters.sectionId);
  }
  if (filters.streamId) {
    query = query.eq('stream_id', filters.streamId);
  }
  if (filters.academicYearId) {
    query = query.eq('academic_year_id', filters.academicYearId);
  }
  if (filters.status && filters.status !== 'ALL') {
    query = query.eq('status', filters.status);
  }

  const sortBy = filters.sortBy || 'created_at';
  const sortOrder = filters.sortOrder || 'desc';
  query = query.order(sortBy, { ascending: sortOrder === 'asc' });
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

  if (!['ADMIN', 'SUPER_ADMIN'].includes(role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const body = await req.json();
  const validation = CreateClassSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.issues.map((issue: any) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return Response.json({ error: 'Données invalides', errors }, { status: 400 });
  }

  const data = validation.data;

  const { data: cls, error } = await supabase
    .from('classes')
    .insert({
      school_id: schoolId,
      name: data.name,
      code: data.code || null,
      level_id: data.levelId || null,
      section_id: data.sectionId || null,
      stream_id: data.streamId || null,
      academic_year_id: data.academicYearId || null,
      room_id: data.roomId || null,
      capacity: data.capacity || null,
      description: data.description || null,
      status: 'ACTIVE',
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json(cls, { status: 201 });
});
