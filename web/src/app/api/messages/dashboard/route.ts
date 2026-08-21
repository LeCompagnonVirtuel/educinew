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

    const { data: totalMessages } = await supabase
      .from('messages')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);

    const { data: unreadMessages } = await supabase
      .from('messages')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId)
      .eq('status', 'SENT');

    const { data: totalConversations } = await supabase
      .from('conversations')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);

    const { data: activeConversations } = await supabase
      .from('conversations')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId)
      .eq('is_archived', false);

    const { data: totalGroups } = await supabase
      .from('conversation_groups')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId);

    const { data: recentMessages } = await supabase
      .from('messages')
      .select('id, content, type, created_at, users!messages_sender_id_fkey(id, first_name, last_name)')
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false })
      .limit(10);

    return NextResponse.json({
      totalMessages: totalMessages?.length || 0,
      unreadMessages: unreadMessages?.length || 0,
      totalConversations: totalConversations?.length || 0,
      activeConversations: activeConversations?.length || 0,
      totalGroups: totalGroups?.length || 0,
      recentMessages: recentMessages || [],
    });
  } catch (error) {
    logger.error('Error fetching message dashboard', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
