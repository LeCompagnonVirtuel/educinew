import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { exportMarksSchema } from '@/features/exams/validators/schemas';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('sb-')?.value || cookieStore.get('supabase-auth-token')?.value;
    if (!authCookie) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const body = await req.json();
    const validation = exportMarksSchema.safeParse({ ...body, schoolId });

    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
    }

    const { examId, classId, format, includeComments, includeStatistics, includeRankings } = validation.data;

    let query = supabase
      .from('exam_results')
      .select('*, exams(id, name, type, max_mark, pass_mark, coefficient), students(id, first_name, last_name, matricule)')
      .eq('school_id', schoolId);

    if (examId) query = query.eq('exam_id', examId);
    if (classId) query = query.eq('exams.class_id', classId);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await supabase.from('exam_audit_logs').insert({
      school_id: schoolId,
      exam_id: examId || null,
      user_id: user.id,
      action: 'EXPORT',
      entity_type: 'MARKS',
      details: JSON.stringify({ format, classId }),
    });

    return NextResponse.json({
      success: true,
      format,
      data: data || [],
      total: data?.length || 0,
    });
  } catch (error) {
    logger.error('Error exporting marks', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
