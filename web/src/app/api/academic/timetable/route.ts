import { withSupabase } from '@supabase/server';
import { z } from 'zod';

const TimetableFiltersSchema = z.object({
  classId: z.string().uuid().optional(),
  teacherId: z.string().uuid().optional(),
  subjectId: z.string().uuid().optional(),
  roomId: z.string().uuid().optional(),
  dayOfWeek: z.string().optional(),
  academicYearId: z.string().uuid().optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

const CreateTimetableSchema = z.object({
  classId: z.string().uuid('ID classe requis'),
  subjectId: z.string().uuid('ID matière requis'),
  teacherId: z.string().uuid().optional(),
  roomId: z.string().uuid().optional(),
  dayOfWeek: z.number().int().min(0).max(6, 'Jour invalide'),
  startTime: z.string().min(1, 'Heure de début requise'),
  endTime: z.string().min(1, 'Heure de fin requise'),
  academicYearId: z.string().uuid().optional(),
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

  const validation = TimetableFiltersSchema.safeParse({
    classId: params.classId || undefined,
    teacherId: params.teacherId || undefined,
    subjectId: params.subjectId || undefined,
    roomId: params.roomId || undefined,
    dayOfWeek: params.dayOfWeek || undefined,
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
  const limit = filters.limit || 50;
  const offset = (page - 1) * limit;

  let query = supabase
    .from('timetable')
    .select('*, classes(name), subjects(name), teachers(first_name, last_name), rooms(name)', { count: 'exact' })
    .eq('school_id', schoolId);

  if (filters.classId) {
    query = query.eq('class_id', filters.classId);
  }
  if (filters.teacherId) {
    query = query.eq('teacher_id', filters.teacherId);
  }
  if (filters.subjectId) {
    query = query.eq('subject_id', filters.subjectId);
  }
  if (filters.roomId) {
    query = query.eq('room_id', filters.roomId);
  }
  if (filters.dayOfWeek) {
    query = query.eq('day_of_week', parseInt(filters.dayOfWeek));
  }
  if (filters.academicYearId) {
    query = query.eq('academic_year_id', filters.academicYearId);
  }

  const sortBy = filters.sortBy || 'day_of_week';
  const sortOrder = filters.sortOrder || 'asc';
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
  const validation = CreateTimetableSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.issues.map((issue: any) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return Response.json({ error: 'Données invalides', errors }, { status: 400 });
  }

  const data = validation.data;

  if (data.teacherId && data.roomId) {
    const { data: conflict } = await supabase
      .from('timetable')
      .select('id')
      .eq('school_id', schoolId)
      .eq('day_of_week', data.dayOfWeek)
      .eq('room_id', data.roomId)
      .neq('start_time', data.endTime)
      .neq('end_time', data.startTime)
      .lte('start_time', data.endTime)
      .gte('end_time', data.startTime)
      .maybeSingle();

    if (conflict) {
      return Response.json({ error: 'Conflit de salle à cet horaire' }, { status: 409 });
    }
  }

  const { data: entry, error } = await supabase
    .from('timetable')
    .insert({
      school_id: schoolId,
      class_id: data.classId,
      subject_id: data.subjectId,
      teacher_id: data.teacherId || null,
      room_id: data.roomId || null,
      day_of_week: data.dayOfWeek,
      start_time: data.startTime,
      end_time: data.endTime,
      academic_year_id: data.academicYearId || null,
    })
    .select('*, classes(name), subjects(name), teachers(first_name, last_name), rooms(name)')
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json(entry, { status: 201 });
});
