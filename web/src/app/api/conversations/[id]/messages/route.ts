import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { sendMessageSchema } from '@/features/messages/validators/schemas';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
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
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    const { data, error, count } = await supabase
      .from('messages')
      .select('*, users(id, first_name, last_name, avatar_url), message_attachments(*)', { count: 'exact' })
      .eq('conversation_id', id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({
      data: data || [],
      total: count || 0,
    });
  } catch (error) {
    logger.error('Error fetching conversation messages', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}

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

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Ã‰tablissement requis' }, { status: 403 });

    const { id } = await context.params;
    const body = await req.json();
    const validation = sendMessageSchema.safeParse({ ...body, conversationId: id });

    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'DonnÃ©es invalides', errors }, { status: 400 });
    }

    const { content, type, replyToId, attachmentIds } = validation.data;

    const { data: message, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: id,
        sender_id: user.id,
        content,
        type: type || 'TEXT',
        reply_to_id: replyToId || null,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    if (attachmentIds && attachmentIds.length > 0) {
      await supabase
        .from('message_attachments')
        .update({ message_id: message.id })
        .in('id', attachmentIds);
    }

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    logger.error('Error sending message to conversation', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}