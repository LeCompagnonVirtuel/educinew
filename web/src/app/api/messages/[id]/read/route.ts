import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';

export async function POST(req: NextRequest, context: { params: { id: string } }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { id } = await context.params;

    const { data, error } = await supabase
      .from('messages')
      .update({ status: 'READ', updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    await supabase
      .from('message_read_receipts')
      .upsert({
        message_id: id,
        user_id: user.id,
        read_at: new Date().toISOString(),
      });

    return NextResponse.json(data);
  } catch (error) {
    logger.error('Error marking message as read', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
