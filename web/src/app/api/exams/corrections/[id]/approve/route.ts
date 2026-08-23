import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export async function POST(req: NextRequest, context: { params: { id: string } }) {
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

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const role = profile?.role;
    const schoolId = profile?.school_id;

    if (!['ADMIN', 'SUPER_ADMIN'].includes(role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const { id } = await context.params;

    const { data: correction } = await supabase
      .from('mark_corrections')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();

    if (!correction) return NextResponse.json({ error: 'Correction non trouvée' }, { status: 404 });

    const { error } = await supabase
      .from('mark_corrections')
      .update({ status: 'APPROVED', approved_at: new Date().toISOString(), approved_by: user.id })
      .eq('id', id)
      .eq('school_id', schoolId);

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    if (correction.corrected_mark !== undefined) {
      await supabase
        .from('exam_results')
        .update({ mark: correction.corrected_mark, updated_at: new Date().toISOString() })
        .eq('exam_id', correction.exam_id)
        .eq('student_id', correction.student_id)
        .eq('school_id', schoolId);
    }

    await supabase.from('exam_audit_logs').insert({
      school_id: schoolId,
      exam_id: correction.exam_id,
      user_id: user.id,
      action: 'APPROVE',
      entity_type: 'CORRECTION',
      details: JSON.stringify({ correctionId: id }),
    });

    return NextResponse.json({ success: true, message: 'Correction approuvée' });
  } catch (error) {
    logger.error('Error approving correction', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
