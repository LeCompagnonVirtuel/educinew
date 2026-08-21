import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { examStatisticsSchema } from '@/features/exams/validators/schemas';

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

    const validation = examStatisticsSchema.safeParse({
      examId: params.examId || undefined,
      schoolId,
      includeDistribution: params.includeDistribution === 'true',
      includePercentiles: params.includePercentiles === 'true',
      includePassRate: params.includePassRate === 'true',
      includeSubjectComparison: params.includeSubjectComparison === 'true',
    });

    if (!validation.success) {
      return NextResponse.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
    }

    const filters = validation.data;

    let query = supabase
      .from('exam_results')
      .select('*, exams(id, name, pass_mark, max_mark), students(id, first_name, last_name)')
      .eq('school_id', schoolId);

    if (filters.examId) query = query.eq('exam_id', filters.examId);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const results = data || [];
    const total = results.length;
    const passed = results.filter((r: any) => r.mark >= (r.exams?.pass_mark || 0)).length;
    const failed = total - passed;

    const marks = results.map((r: any) => r.mark);
    const average = total > 0 ? marks.reduce((a: number, b: number) => a + b, 0) / total : 0;
    const min = total > 0 ? Math.min(...marks) : 0;
    const max = total > 0 ? Math.max(...marks) : 0;
    const median = total > 0 ? marks.sort((a: number, b: number) => a - b)[Math.floor(total / 2)] : 0;

    const statistics: any = {
      total,
      passed,
      failed,
      passRate: total > 0 ? Math.round((passed / total) * 10000) / 100 : 0,
      average: Math.round(average * 100) / 100,
      min,
      max,
      median,
    };

    if (filters.includeDistribution) {
      const ranges = [
        { label: '0-5', min: 0, max: 5 },
        { label: '5-10', min: 5, max: 10 },
        { label: '10-15', min: 10, max: 15 },
        { label: '15-20', min: 15, max: 20 },
      ];
      statistics.distribution = ranges.map((r) => ({
        label: r.label,
        count: marks.filter((m: number) => m >= r.min && m < r.max).length,
      }));
    }

    return NextResponse.json(statistics);
  } catch (error) {
    logger.error('Error fetching exam statistics', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
