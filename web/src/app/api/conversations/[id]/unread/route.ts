import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { id } = await context.params;

    const { count, error } = await supabase
      .from('messages')
      .select('id', { count: 'exact', head: true })
      .eq('conversation_id', id)
      .neq('sender_id', user.id)
      .neq('status', 'READ');

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ unreadCount: count || 0 });
  } catch (error) {
    logger.error('Error fetching unread count', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
