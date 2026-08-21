import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { exportMarksSchema } from '@/features/exams/validators/schemas';

export async function POST(req: NextRequest, context: { params: { id: string } }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const { id } = await context.params;
    const body = await req.json();
    const validation = exportMarksSchema.safeParse({ ...body, schoolId, examId: id });

    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('exam_results')
      .select('*, students(id, first_name, last_name, matricule)')
      .eq('exam_id', id)
      .eq('school_id', schoolId);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await supabase.from('exam_audit_logs').insert({
      school_id: schoolId,
      exam_id: id,
      user_id: user.id,
      action: 'EXPORT',
      entity_type: 'MARKS',
      details: JSON.stringify({ format: validation.data.format }),
    });

    return NextResponse.json({
      success: true,
      format: validation.data.format,
      data: data || [],
      total: data?.length || 0,
    });
  } catch (error) {
    logger.error('Error exporting exam marks', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
