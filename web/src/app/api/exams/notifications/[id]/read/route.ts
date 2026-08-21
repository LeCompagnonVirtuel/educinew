import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';

export async function POST(req: NextRequest, context: { params: { id: string } }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const { id } = await context.params;

    const { data, error } = await supabase
      .from('exam_notifications')
      .update({ read_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .eq('recipient_id', user.id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true, notification: data });
  } catch (error) {
    logger.error('Error marking notification as read', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
