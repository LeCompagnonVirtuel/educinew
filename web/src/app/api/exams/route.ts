import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { examFiltersSchema, createExamSchema } from '@/features/exams/validators/schemas';

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());

    const validation = examFiltersSchema.safeParse({
      schoolId,
      academicYearId: params.academicYearId || undefined,
      termId: params.termId || undefined,
      classId: params.classId || undefined,
      subjectId: params.subjectId || undefined,
      type: params.type || undefined,
      status: params.status || undefined,
      search: params.search || undefined,
      dateFrom: params.dateFrom || undefined,
      dateTo: params.dateTo || undefined,
      page: params.page ? parseInt(params.page) : undefined,
      limit: params.limit ? parseInt(params.limit) : undefined,
      sortBy: params.sortBy || undefined,
      sortOrder: params.sortOrder || undefined,
    });

    if (!validation.success) {
      return NextResponse.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
    }

    const filters = validation.data;
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('exams')
      .select('*, subjects(id, name), classes(id, name)', { count: 'exact' })
      .eq('school_id', schoolId);

    if (filters.academicYearId) query = query.eq('academic_year_id', filters.academicYearId);
    if (filters.termId) query = query.eq('term_id', filters.termId);
    if (filters.classId) query = query.eq('class_id', filters.classId);
    if (filters.subjectId) query = query.eq('subject_id', filters.subjectId);
    if (filters.type) query = query.eq('type', filters.type);
    if (filters.status) query = query.eq('status', filters.status);
    if (filters.search) query = query.ilike('name', `%${filters.search}%`);
    if (filters.dateFrom) query = query.gte('date', filters.dateFrom);
    if (filters.dateTo) query = query.lte('date', filters.dateTo);

    const sortBy = filters.sortBy || 'date';
    const sortOrder = filters.sortOrder === 'asc';
    query = query.order(sortBy, { ascending: sortOrder });
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({
      data: data || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    logger.error('Error fetching exams', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const role = profile?.role;
    const schoolId = profile?.school_id;

    if (!['ADMIN', 'SUPER_ADMIN', 'TEACHER'].includes(role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const body = await req.json();
    const validation = createExamSchema.safeParse({ ...body, schoolId });

    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
    }

    const { data: exam, error } = await supabase
      .from('exams')
      .insert({ ...validation.data, created_by: user.id })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(exam, { status: 201 });
  } catch (error) {
    logger.error('Error creating exam', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
