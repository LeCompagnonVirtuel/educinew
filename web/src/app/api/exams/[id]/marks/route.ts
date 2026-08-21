import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { markEntrySchema, bulkMarkEntrySchema } from '@/features/exams/validators/schemas';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const { id } = await context.params;

    const { data, error } = await supabase
      .from('exam_results')
      .select('*, students(id, first_name, last_name, matricule)')
      .eq('exam_id', id)
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ data: data || [], total: data?.length || 0 });
  } catch (error) {
    logger.error('Error fetching exam marks', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, context: { params: { id: string } }) {
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

    const { id } = await context.params;
    const body = await req.json();

    if (Array.isArray(body.entries)) {
      const validation = bulkMarkEntrySchema.safeParse({ ...body, examId: id });
      if (!validation.success) {
        const errors = validation.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));
        return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
      }

      const results = validation.data.entries.map((entry) => ({
        exam_id: id,
        student_id: entry.studentId,
        mark: entry.marks[0]?.mark || 0,
        max_mark: entry.marks[0]?.maxMark || 20,
        school_id: schoolId,
        status: validation.data.status || 'DRAFT',
        created_by: user.id,
      }));

      const { data, error } = await supabase.from('exam_results').insert(results).select();
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      return NextResponse.json(data, { status: 201 });
    }

    const validation = markEntrySchema.safeParse({ ...body, examId: id });
    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
    }

    const { data: result, error } = await supabase
      .from('exam_results')
      .insert({
        exam_id: id,
        student_id: validation.data.studentId,
        mark: validation.data.marks[0]?.mark || 0,
        max_mark: validation.data.marks[0]?.maxMark || 20,
        school_id: schoolId,
        status: validation.data.status || 'DRAFT',
        created_by: user.id,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    logger.error('Error creating exam mark', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
