import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest, context: { params: { id: string } }) {
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

    const { data: messages } = await supabase
      .from('messages')
      .select('id')
      .eq('conversation_id', id)
      .neq('sender_id', user.id)
      .neq('status', 'READ');

    if (messages && messages.length > 0) {
      const messageIds = messages.map((m) => m.id);

      await supabase
        .from('messages')
        .update({ status: 'READ' })
        .in('id', messageIds);

      await supabase
        .from('message_read_receipts')
        .upsert(
          messageIds.map((messageId) => ({
            message_id: messageId,
            user_id: user.id,
            read_at: new Date().toISOString(),
          }))
        );
    }

    return NextResponse.json({ marked: messages?.length || 0 });
  } catch (error) {
    logger.error('Error marking conversation as read', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}