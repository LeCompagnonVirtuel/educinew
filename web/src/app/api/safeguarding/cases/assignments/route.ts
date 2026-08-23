import { withSupabase } from '@/lib/supabase/server';
import { z } from 'zod';

const CreateSchema = z.object({
  studentId: z.string().uuid('ID élève invalide'),
  title: z.string().min(1, 'Titre requis').max(255, 'Titre trop long'),
  description: z.string().max(2000, 'Description trop longue').optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING']).optional().default('ACTIVE'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional().default('MEDIUM'),
  metadata: z.record(z.unknown()).optional(),
});

const FiltersSchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  studentId: z.string().uuid().optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional().default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
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

  const validation = FiltersSchema.safeParse(params);
  if (!validation.success) {
    return Response.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
  }

  const filters = validation.data;
  const page = filters.page;
  const limit = filters.limit;
  const offset = (page - 1) * limit;

  let query = supabase
    .from('assignments')
    .select('*, student:students(id, first_name, last_name, matricule)', { count: 'exact' })
    .eq('school_id', schoolId);

  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  if (filters.status && filters.status !== 'ALL') {
    query = query.eq('status', filters.status);
  }

  if (filters.priority && filters.priority !== 'ALL') {
    query = query.eq('priority', filters.priority);
  }

  if (filters.studentId) {
    query = query.eq('student_id', filters.studentId);
  }

  const sortBy = filters.sortBy;
  const sortOrder = filters.sortOrder;
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

  if (!['SURVEILLANT', 'ADMIN', 'SUPER_ADMIN', 'DIRECTEUR', 'SECRETAIRE'].includes(role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const body = await req.json();
  const validation = CreateSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.issues.map((issue: any) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return Response.json({ error: 'Données invalides', errors }, { status: 400 });
  }

  const data = validation.data;

  const { data: record, error } = await supabase
    .from('assignments')
    .insert({
      school_id: schoolId,
      student_id: data.studentId,
      title: data.title,
      description: data.description || null,
      status: data.status,
      priority: data.priority,
      metadata: data.metadata || {},
      created_by: user.id,
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json(record, { status: 201 });
});
