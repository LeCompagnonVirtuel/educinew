import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { logger } from '@educi/logger';
import { messageSearchSchema } from '@/features/messages/validators/schemas';

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

    const validation = messageSearchSchema.safeParse({
      query: params.query,
      conversationId: params.conversationId || undefined,
      senderId: params.senderId || undefined,
      type: params.type || undefined,
      dateFrom: params.dateFrom || undefined,
      dateTo: params.dateTo || undefined,
      hasAttachment: params.hasAttachment === 'true' ? true : params.hasAttachment === 'false' ? false : undefined,
      limit: params.limit ? parseInt(params.limit) : undefined,
      offset: params.offset ? parseInt(params.offset) : undefined,
    });

    if (!validation.success) {
      return NextResponse.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
    }

    const { query: searchQuery, conversationId, senderId, type, dateFrom, dateTo, limit, offset } = validation.data;

    let dbQuery = supabase
      .from('messages')
      .select('*, users(id, first_name, last_name, avatar_url)', { count: 'exact' })
      .eq('school_id', schoolId)
      .ilike('content', `%${searchQuery}%`);

    if (conversationId) dbQuery = dbQuery.eq('conversation_id', conversationId);
    if (senderId) dbQuery = dbQuery.eq('sender_id', senderId);
    if (type) dbQuery = dbQuery.eq('type', type);
    if (dateFrom) dbQuery = dbQuery.gte('created_at', dateFrom);
    if (dateTo) dbQuery = dbQuery.lte('created_at', dateTo);

    dbQuery = dbQuery.order('created_at', { ascending: false });
    dbQuery = dbQuery.range(offset || 0, (offset || 0) + (limit || 20) - 1);

    const { data, error, count } = await dbQuery;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({
      data: data || [],
      total: count || 0,
      query: searchQuery,
    });
  } catch (error) {
    logger.error('Error searching messages', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
