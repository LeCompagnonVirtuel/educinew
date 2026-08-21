import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { muteConversationSchema } from '@/features/messages/validators/schemas';

export async function POST(req: NextRequest, context: { params: { id: string } }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { id } = await context.params;
    const body = await req.json();
    const validation = muteConversationSchema.safeParse({ ...body, conversationId: id });

    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
    }

    const { muted } = validation.data;

    const { data, error } = await supabase
      .from('conversation_members')
      .update({ is_muted: muted })
      .eq('conversation_id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (error) {
    logger.error('Error muting conversation', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
