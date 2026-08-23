import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { logger } from '@educi/logger';
import { searchFilterSchema } from '@/features/messages/validators/schemas';

export async function GET(req: NextRequest) {
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
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());

    const validation = searchFilterSchema.safeParse({
      query: params.query,
      types: params.types ? JSON.parse(params.types) : undefined,
      dateFrom: params.dateFrom || undefined,
      dateTo: params.dateTo || undefined,
      conversationId: params.conversationId || undefined,
      senderId: params.senderId || undefined,
      limit: params.limit ? parseInt(params.limit) : undefined,
      offset: params.offset ? parseInt(params.offset) : undefined,
    });

    if (!validation.success) {
      return NextResponse.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
    }

    const { query: searchQuery, types, dateFrom, dateTo, conversationId, senderId, limit, offset } = validation.data;
    const searchTypes = types || ['CONVERSATION', 'MESSAGE', 'ANNOUNCEMENT', 'BROADCAST'];

    const results: any[] = [];

    if (searchTypes.includes('MESSAGE')) {
      let msgQuery = supabase
        .from('messages')
        .select('*, users(id, first_name, last_name)')
        .eq('school_id', schoolId)
        .ilike('content', `%${searchQuery}%`);

      if (dateFrom) msgQuery = msgQuery.gte('created_at', dateFrom);
      if (dateTo) msgQuery = msgQuery.lte('created_at', dateTo);
      if (conversationId) msgQuery = msgQuery.eq('conversation_id', conversationId);
      if (senderId) msgQuery = msgQuery.eq('sender_id', senderId);

      msgQuery = msgQuery.limit(limit || 10);

      const { data: messages } = await msgQuery;
      if (messages) {
        results.push(...messages.map((m) => ({ ...m, _type: 'MESSAGE' })));
      }
    }

    if (searchTypes.includes('CONVERSATION')) {
      let convQuery = supabase
        .from('conversations')
        .select('*')
        .eq('school_id', schoolId)
        .ilike('title', `%${searchQuery}%`);

      convQuery = convQuery.limit(limit || 10);

      const { data: conversations } = await convQuery;
      if (conversations) {
        results.push(...conversations.map((c) => ({ ...c, _type: 'CONVERSATION' })));
      }
    }

    if (searchTypes.includes('ANNOUNCEMENT')) {
      let annQuery = supabase
        .from('announcements')
        .select('*')
        .eq('school_id', schoolId)
        .ilike('title', `%${searchQuery}%`);

      annQuery = annQuery.limit(limit || 10);

      const { data: announcements } = await annQuery;
      if (announcements) {
        results.push(...announcements.map((a) => ({ ...a, _type: 'ANNOUNCEMENT' })));
      }
    }

    return NextResponse.json({
      data: results.slice(0, limit || 20),
      total: results.length,
      query: searchQuery,
    });
  } catch (error) {
    logger.error('Error performing global search', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
