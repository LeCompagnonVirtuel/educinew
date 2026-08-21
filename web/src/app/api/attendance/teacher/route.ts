import { withSupabase } from '@supabase/server';
import { z } from 'zod';

const TeacherAttendanceFiltersSchema = z.object({
  teacherId: z.string().uuid().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  status: z.enum(['PRESENT', 'ABSENT', 'LATE']).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
});

const CreateTeacherAttendanceSchema = z.object({
  teacher_id: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  status: z.enum(['PRESENT', 'ABSENT', 'LATE']),
  check_in: z.string().optional(),
  check_out: z.string().optional(),
  remark: z.string().max(200).nullable().optional(),
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

  const validation = TeacherAttendanceFiltersSchema.safeParse({
    teacherId: params.teacherId || undefined,
    date: params.date || undefined,
    status: params.status || undefined,
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
    .from('staff_attendance')
    .select('*', { count: 'exact' })
    .eq('school_id', schoolId);

  if (filters.teacherId) {
    query = query.eq('staff_id', filters.teacherId);
  }
  if (filters.date) {
    query = query.eq('date', filters.date);
  }
  if (filters.status) {
    query = query.eq('status', filters.status);
  }

  query = query.order('date', { ascending: false });
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
  const validation = CreateTeacherAttendanceSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.issues.map((issue: any) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return Response.json({ error: 'Données invalides', errors }, { status: 400 });
  }

  const data = validation.data;

  const { data: record, error } = await supabase
    .from('staff_attendance')
    .insert({
      staff_id: data.teacher_id,
      date: data.date,
      status: data.status,
      check_in: data.check_in || null,
      check_out: data.check_out || null,
      remark: data.remark || null,
      school_id: schoolId,
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json(record, { status: 201 });
});
