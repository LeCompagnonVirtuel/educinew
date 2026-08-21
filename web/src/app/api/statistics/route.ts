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

    const url = new URL(req.url);
    const dateFrom = url.searchParams.get('dateFrom');
    const dateTo = url.searchParams.get('dateTo');

    let msgQuery = supabase
      .from('messages')
      .select('id, type, status, created_at, sender_id')
      .eq('school_id', schoolId);

    if (dateFrom) msgQuery = msgQuery.gte('created_at', dateFrom);
    if (dateTo) msgQuery = msgQuery.lte('created_at', dateTo);

    const { data: messages } = await msgQuery;

    let convQuery = supabase
      .from('conversations')
      .select('id, type, is_archived')
      .eq('school_id', schoolId);

    const { data: conversations } = await convQuery;

    let annQuery = supabase
      .from('announcements')
      .select('id, priority')
      .eq('school_id', schoolId);

    const { data: announcements } = await annQuery;

    const msgRecords = messages || [];
    const convRecords = conversations || [];
    const annRecords = announcements || [];

    return NextResponse.json({
      messages: {
        total: msgRecords.length,
        byType: msgRecords.reduce((acc: Record<string, number>, m: any) => {
          acc[m.type] = (acc[m.type] || 0) + 1;
          return acc;
        }, {}),
        byStatus: msgRecords.reduce((acc: Record<string, number>, m: any) => {
          acc[m.status] = (acc[m.status] || 0) + 1;
          return acc;
        }, {}),
        uniqueSenders: new Set(msgRecords.map((m: any) => m.sender_id)).size,
      },
      conversations: {
        total: convRecords.length,
        active: convRecords.filter((c: any) => !c.is_archived).length,
        archived: convRecords.filter((c: any) => c.is_archived).length,
      },
      announcements: {
        total: annRecords.length,
        byPriority: annRecords.reduce((acc: Record<string, number>, a: any) => {
          acc[a.priority] = (acc[a.priority] || 0) + 1;
          return acc;
        }, {}),
      },
    });
  } catch (error) {
    logger.error('Error fetching statistics', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
