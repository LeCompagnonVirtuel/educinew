import { withSupabase } from '@/lib/supabase/server';
import { z } from 'zod';

const CalendarEventFiltersSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  type: z.string().optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
});

const CreateCalendarEventSchema = z.object({
  title: z.string().min(1, 'Titre requis'),
  description: z.string().optional(),
  startDate: z.string().min(1, 'Date de début requise'),
  endDate: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  type: z.string().optional(),
  isAllDay: z.boolean().optional(),
  classId: z.string().uuid().optional(),
  recurring: z.boolean().optional(),
});

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const url = new URL(req.url);
  const params = Object.fromEntries(url.searchParams.entries());

  const validation = CalendarEventFiltersSchema.safeParse({
    startDate: params.startDate || undefined,
    endDate: params.endDate || undefined,
    type: params.type || undefined,
    page: params.page ? parseInt(params.page) : undefined,
    limit: params.limit ? parseInt(params.limit) : undefined,
  });

  if (!validation.success) {
    return Response.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
  }

  const filters = validation.data;
  const page = filters.page || 1;
  const limit = filters.limit || 50;
  const offset = (page - 1) * limit;

  let query = supabase
    .from('calendar_events')
    .select('*', { count: 'exact' })
    .eq('school_id', schoolId);

  if (filters.startDate) {
    query = query.gte('start_date', filters.startDate);
  }
  if (filters.endDate) {
    query = query.lte('start_date', filters.endDate);
  }
  if (filters.type && filters.type !== 'ALL') {
    query = query.eq('type', filters.type);
  }

  query = query.order('start_date', { ascending: true });
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
  const validation = CreateCalendarEventSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.issues.map((issue: any) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return Response.json({ error: 'Données invalides', errors }, { status: 400 });
  }

  const data = validation.data;

  const { data: event, error } = await supabase
    .from('calendar_events')
    .insert({
      school_id: schoolId,
      created_by: user.id,
      title: data.title,
      description: data.description || null,
      start_date: data.startDate,
      end_date: data.endDate || null,
      start_time: data.startTime || null,
      end_time: data.endTime || null,
      type: data.type || 'EVENT',
      is_all_day: data.isAllDay || false,
      class_id: data.classId || null,
      recurring: data.recurring || false,
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json(event, { status: 201 });
});
