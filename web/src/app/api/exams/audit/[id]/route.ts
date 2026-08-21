import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const { id } = await context.params;

    const { data, error } = await supabase
      .from('exam_audit_logs')
      .select('*, users(id, first_name, last_name), exams(id, name)')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();

    if (error) return NextResponse.json({ error: 'Entrée d\'audit non trouvée' }, { status: 404 });
    return NextResponse.json(data);
  } catch (error) {
    logger.error('Error fetching audit entry', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
