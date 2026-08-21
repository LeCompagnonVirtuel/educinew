import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('user_id', user.id)
      .eq('is_read', false)
      .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ marked: data?.length || 0 });
  } catch (error) {
    logger.error('Error marking all notifications as read', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
