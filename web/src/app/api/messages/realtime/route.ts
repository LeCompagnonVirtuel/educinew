import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const { data: conversations, error } = await supabase
      .from('conversation_members')
      .select('conversation_id')
      .eq('user_id', user.id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const conversationIds = (conversations || []).map((c) => c.conversation_id);

    return NextResponse.json({
      channels: conversationIds.map((id) => `conversation:${id}`),
      userId: user.id,
      schoolId,
    });
  } catch (error) {
    logger.error('Error fetching realtime channels', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
