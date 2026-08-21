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
      .from('exam_results')
      .select('*, exams(id, name, type, subject_id, subjects(name)), students(id, first_name, last_name)')
      .eq('school_id', schoolId);

    if (params.classId) query = query.eq('exams.class_id', params.classId);
    if (params.termId) query = query.eq('exams.term_id', params.termId);
    if (params.subjectId) query = query.eq('exams.subject_id', params.subjectId);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const results = data || [];
    const totalResults = results.length;
    const avgMark = totalResults > 0 ? results.reduce((sum: number, r: any) => sum + r.mark, 0) / totalResults : 0;

    const byType = results.reduce((acc: any, r: any) => {
      const type = r.exams?.type || 'UNKNOWN';
      if (!acc[type]) acc[type] = { count: 0, totalMark: 0 };
      acc[type].count++;
      acc[type].totalMark += r.mark;
      return acc;
    }, {});

    Object.keys(byType).forEach((key) => {
      byType[key].average = Math.round((byType[key].totalMark / byType[key].count) * 100) / 100;
    });

    const bySubject = results.reduce((acc: any, r: any) => {
      const subject = r.exams?.subjects?.name || 'UNKNOWN';
      if (!acc[subject]) acc[subject] = { count: 0, totalMark: 0 };
      acc[subject].count++;
      acc[subject].totalMark += r.mark;
      return acc;
    }, {});

    Object.keys(bySubject).forEach((key) => {
      bySubject[key].average = Math.round((bySubject[key].totalMark / bySubject[key].count) * 100) / 100;
    });

    return NextResponse.json({
      totalResults,
      overallAverage: Math.round(avgMark * 100) / 100,
      byType,
      bySubject,
    });
  } catch (error) {
    logger.error('Error fetching exam analytics', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
