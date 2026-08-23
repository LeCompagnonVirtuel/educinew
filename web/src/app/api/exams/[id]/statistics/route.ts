import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@educi/logger';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
                const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const { id } = await context.params;

    const { data: results, error: resultsError } = await supabase
      .from('exam_results')
      .select('mark, max_mark')
      .eq('exam_id', id)
      .eq('school_id', schoolId);

    if (resultsError) return NextResponse.json({ error: resultsError.message }, { status: 500 });

    const records = results || [];
    const total = records.length;
    const marks = records.map((r: any) => r.mark);
    const average = total > 0 ? marks.reduce((a: number, b: number) => a + b, 0) / total : 0;
    const min = total > 0 ? Math.min(...marks) : 0;
    const max = total > 0 ? Math.max(...marks) : 0;
    const sorted = [...marks].sort((a: number, b: number) => a - b);
    const median = total > 0 ? sorted[Math.floor(total / 2)] : 0;

    const { data: exam } = await supabase.from('exams').select('pass_mark, max_mark').eq('id', id).single();
    const passMark = exam?.pass_mark || 0;
    const passed = marks.filter((m: number) => m >= passMark).length;

    return NextResponse.json({
      total,
      average: Math.round(average * 100) / 100,
      min,
      max,
      median,
      passed,
      failed: total - passed,
      passRate: total > 0 ? Math.round((passed / total) * 10000) / 100 : 0,
    });
  } catch (error) {
    logger.error('Error fetching exam statistics', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
