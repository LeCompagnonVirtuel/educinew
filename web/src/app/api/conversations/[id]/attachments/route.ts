import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('sb-')?.value || cookieStore.get('supabase-auth-token')?.value;
    if (!authCookie) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifiÃ©' }, { status: 401 });

    const { id } = await context.params;
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const type = url.searchParams.get('type');

    const { data: messages } = await supabase
      .from('messages')
      .select('id')
      .eq('conversation_id', id);

    if (!messages || messages.length === 0) {
      return NextResponse.json({ data: [], total: 0 });
    }

    const messageIds = messages.map((m) => m.id);

    let query = supabase
      .from('message_attachments')
      .select('*, users(id, first_name, last_name)', { count: 'exact' })
      .in('message_id', messageIds);

    if (type) query = query.eq('type', type);

    query = query.order('created_at', { ascending: false });
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({
      data: data || [],
      total: count || 0,
    });
  } catch (error) {
    logger.error('Error fetching conversation attachments', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}