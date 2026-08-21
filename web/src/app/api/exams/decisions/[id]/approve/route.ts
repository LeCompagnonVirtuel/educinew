import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';

export async function POST(req: NextRequest, context: { params: { id: string } }) {
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

    const { id } = await context.params;

    const { data, error } = await supabase
      .from('student_decisions')
      .update({ status: 'APPROVED', approved_at: new Date().toISOString(), approved_by: user.id })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    await supabase.from('exam_audit_logs').insert({
      school_id: schoolId,
      user_id: user.id,
      action: 'APPROVE',
      entity_type: 'DECISION',
      details: JSON.stringify({ decisionId: id }),
    });

    return NextResponse.json({ success: true, message: 'Décision approuvée' });
  } catch (error) {
    logger.error('Error approving decision', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
