import { withSupabase } from '@supabase/server';
import { z } from 'zod';

const AssignmentFiltersSchema = z.object({
  search: z.string().optional(),
  teacherId: z.string().uuid().optional(),
  subjectId: z.string().uuid().optional(),
  classId: z.string().uuid().optional(),
  academicYearId: z.string().uuid().optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

const CreateAssignmentSchema = z.object({
  teacherId: z.string().uuid('ID enseignant requis'),
  subjectId: z.string().uuid('ID matière requis'),
  classId: z.string().uuid('ID classe requis'),
  academicYearId: z.string().uuid().optional(),
  hoursPerWeek: z.number().int().positive().optional(),
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

  const validation = AssignmentFiltersSchema.safeParse({
    search: params.search || undefined,
    teacherId: params.teacherId || undefined,
    subjectId: params.subjectId || undefined,
    classId: params.classId || undefined,
    academicYearId: params.academicYearId || undefined,
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
    .from('assignments')
    .select('*, teachers(*), subjects(*), classes(*)', { count: 'exact' })
    .eq('school_id', schoolId);

  if (filters.teacherId) {
    query = query.eq('teacher_id', filters.teacherId);
  }
  if (filters.subjectId) {
    query = query.eq('subject_id', filters.subjectId);
  }
  if (filters.classId) {
    query = query.eq('class_id', filters.classId);
  }
  if (filters.academicYearId) {
    query = query.eq('academic_year_id', filters.academicYearId);
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
  const validation = CreateAssignmentSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.issues.map((issue: any) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return Response.json({ error: 'Données invalides', errors }, { status: 400 });
  }

  const data = validation.data;

  const { data: existing } = await supabase
    .from('assignments')
    .select('id')
    .eq('school_id', schoolId)
    .eq('teacher_id', data.teacherId)
    .eq('subject_id', data.subjectId)
    .eq('class_id', data.classId)
    .maybeSingle();

  if (existing) {
    return Response.json({ error: 'Cette affectation existe déjà' }, { status: 409 });
  }

  const { data: assignment, error } = await supabase
    .from('assignments')
    .insert({
      school_id: schoolId,
      teacher_id: data.teacherId,
      subject_id: data.subjectId,
      class_id: data.classId,
      academic_year_id: data.academicYearId || null,
      hours_per_week: data.hoursPerWeek || null,
    })
    .select('*, teachers(*), subjects(*), classes(*)')
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json(assignment, { status: 201 });
});
