import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { id } = await context.params;
    const url = new URL(req.url);
    const query = url.searchParams.get('query');

    if (!query || query.length < 2) {
      return NextResponse.json({ error: 'Requête trop courte' }, { status: 400 });
    }

    const limit = parseInt(url.searchParams.get('limit') || '20');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    const { data, error, count } = await supabase
      .from('messages')
      .select('*, users(id, first_name, last_name, avatar_url)', { count: 'exact' })
      .eq('conversation_id', id)
      .ilike('content', `%${query}%`)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({
      data: data || [],
      total: count || 0,
      query,
    });
  } catch (error) {
    logger.error('Error searching in conversation', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
