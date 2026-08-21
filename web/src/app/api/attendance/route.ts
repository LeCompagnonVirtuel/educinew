import { withSupabase } from '@supabase/server';
import { z } from 'zod';
import { bulkAttendanceSchema } from '@/lib/api/validation';

const AttendanceFiltersSchema = z.object({
  classId: z.string().uuid().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  studentId: z.string().uuid().optional(),
  status: z.enum(['PRESENT', 'ABSENT', 'LATE']).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
});

const CreateAttendanceSchema = z.object({
  student_id: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  status: z.enum(['PRESENT', 'ABSENT', 'LATE']),
  remark: z.string().max(200).nullable().optional(),
  class_id: z.string().uuid().nullable().optional(),
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

  const validation = AttendanceFiltersSchema.safeParse({
    classId: params.classId || undefined,
    date: params.date || undefined,
    studentId: params.studentId || undefined,
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
    .from('attendance')
    .select('*, students(id, first_name, last_name, matricule)', { count: 'exact' })
    .eq('school_id', schoolId);

  if (filters.classId) {
    query = query.eq('class_id', filters.classId);
  }
  if (filters.date) {
    query = query.eq('date', filters.date);
  }
  if (filters.studentId) {
    query = query.eq('student_id', filters.studentId);
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

  if (!['ADMIN', 'SUPER_ADMIN', 'TEACHER'].includes(role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const body = await req.json();

  if (Array.isArray(body)) {
    const validation = bulkAttendanceSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map((issue: any) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return Response.json({ error: 'Données invalides', errors }, { status: 400 });
    }

    const records = validation.data.map((item: any) => ({
      ...item,
      school_id: schoolId,
      created_by: user.id,
    }));

    const { data, error } = await supabase
      .from('attendance')
      .insert(records)
      .select();

    if (error) return Response.json({ error: error.message }, { status: 400 });
    return Response.json(data, { status: 201 });
  }

  const validation = CreateAttendanceSchema.safeParse(body);
  if (!validation.success) {
    const errors = validation.error.issues.map((issue: any) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return Response.json({ error: 'Données invalides', errors }, { status: 400 });
  }

  const data = validation.data;

  const { data: record, error } = await supabase
    .from('attendance')
    .insert({
      student_id: data.student_id,
      date: data.date,
      status: data.status,
      remark: data.remark || null,
      class_id: data.class_id || null,
      school_id: schoolId,
      created_by: user.id,
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json(record, { status: 201 });
});
