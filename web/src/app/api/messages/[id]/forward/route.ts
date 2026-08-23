import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { forwardMessageSchema } from '@/features/messages/validators/schemas';

export async function POST(req: NextRequest, context: { params: { id: string } }) {
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

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Ã‰tablissement requis' }, { status: 403 });

    const { id } = await context.params;
    const body = await req.json();
    const validation = forwardMessageSchema.safeParse({ ...body, messageId: id });

    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'DonnÃ©es invalides', errors }, { status: 400 });
    }

    const { targetConversationIds } = validation.data;

    const { data: originalMessage, error: fetchError } = await supabase
      .from('messages')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();

    if (fetchError || !originalMessage) {
      return NextResponse.json({ error: 'Message non trouvÃ©' }, { status: 404 });
    }

    const forwardedMessages = targetConversationIds.map((conversationId) => ({
      conversation_id: conversationId,
      sender_id: user.id,
      content: originalMessage.content,
      type: originalMessage.type,
      reply_to_id: null,
      is_forwarded: true,
      forwarded_from_id: id,
      school_id: schoolId,
    }));

    const { data, error } = await supabase
      .from('messages')
      .insert(forwardedMessages)
      .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ forwarded: data?.length || 0 });
  } catch (error) {
    logger.error('Error forwarding message', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}