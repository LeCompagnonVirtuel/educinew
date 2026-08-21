import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';

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
      .from('student_averages')
      .select('*, students(id, first_name, last_name, matricule), classes(id, name)')
      .eq('school_id', schoolId);

    if (params.classId) query = query.eq('class_id', params.classId);
    if (params.termId) query = query.eq('term_id', params.termId);
    if (params.academicYearId) query = query.eq('academic_year_id', params.academicYearId);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ data: data || [], total: data?.length || 0 });
  } catch (error) {
    logger.error('Error fetching averages', error);
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

    if (!['ADMIN', 'SUPER_ADMIN'].includes(role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const body = await req.json();

    const { data, error } = await supabase
      .from('student_averages')
      .upsert({ ...body, school_id: schoolId, calculated_at: new Date().toISOString() }, { onConflict: 'student_id,class_id,term_id,academic_year_id' })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    logger.error('Error creating average', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
