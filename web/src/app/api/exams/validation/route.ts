import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { markValidationSchema } from '@/features/exams/validators/schemas';

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
    const validation = markValidationSchema.safeParse({ ...body, schoolId, validatedBy: user.id });

    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
    }

    const { examId, marks } = validation.data;

    for (const mark of marks) {
      const newStatus = mark.approved ? 'VALIDATED' : 'DRAFT';
      await supabase
        .from('exam_results')
        .update({ status: newStatus, validated_at: new Date().toISOString(), validated_by: user.id })
        .eq('id', mark.markEntryId)
        .eq('school_id', schoolId);
    }

    await supabase.from('exam_audit_logs').insert({
      school_id: schoolId,
      exam_id: examId,
      user_id: user.id,
      action: 'VALIDATE',
      entity_type: 'MARKS',
      details: JSON.stringify({ count: marks.length }),
    });

    return NextResponse.json({ success: true, validated: marks.length });
  } catch (error) {
    logger.error('Error validating marks', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
