import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { markEntrySchema, bulkMarkEntrySchema } from '@/features/exams/validators/schemas';

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

    let query = supabase
      .from('exam_results')
      .select('*, exams(id, name), students(id, first_name, last_name, matricule)')
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false });

    if (params.examId) query = query.eq('exam_id', params.examId);
    if (params.studentId) query = query.eq('student_id', params.studentId);
    if (params.status) query = query.eq('status', params.status);

    const page = params.page ? parseInt(params.page) : 1;
    const limit = params.limit ? parseInt(params.limit) : 50;
    const offset = (page - 1) * limit;
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
    logger.error('Error fetching marks', error);
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

    if (Array.isArray(body.entries)) {
      const validation = bulkMarkEntrySchema.safeParse(body);
      if (!validation.success) {
        const errors = validation.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));
        return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
      }

      const { examId, entries, status } = validation.data;
      const results = entries.map((entry) => ({
        exam_id: examId,
        student_id: entry.studentId,
        mark: entry.marks[0]?.mark || 0,
        max_mark: entry.marks[0]?.maxMark || 20,
        school_id: schoolId,
        status: status || 'DRAFT',
        created_by: user.id,
      }));

      const { data, error } = await supabase
        .from('exam_results')
        .insert(results)
        .select();

      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      return NextResponse.json(data, { status: 201 });
    }

    const validation = markEntrySchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
    }

    const { examId, studentId, marks, status } = validation.data;
    const { data: record, error } = await supabase
      .from('exam_results')
      .insert({
        exam_id: examId,
        student_id: studentId,
        mark: marks[0]?.mark || 0,
        max_mark: marks[0]?.maxMark || 20,
        school_id: schoolId,
        status: status || 'DRAFT',
        created_by: user.id,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    logger.error('Error creating marks', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
