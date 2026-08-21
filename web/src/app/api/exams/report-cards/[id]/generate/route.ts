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

    const { data: reportCard } = await supabase
      .from('report_cards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();

    if (!reportCard) return NextResponse.json({ error: 'Bulletin non trouvé' }, { status: 404 });

    const { data, error } = await supabase
      .from('report_cards')
      .update({ status: 'GENERATED', generated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    await supabase.from('exam_audit_logs').insert({
      school_id: schoolId,
      user_id: user.id,
      action: 'GENERATE',
      entity_type: 'REPORT_CARD',
      details: JSON.stringify({ reportCardId: id }),
    });

    return NextResponse.json({ success: true, reportCard: data, message: 'Bulletin généré' });
  } catch (error) {
    logger.error('Error generating report card', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
