import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { logger } from '@educi/logger';
import { sendMessageSchema, messageFiltersSchema } from '@/features/messages/validators/schemas';

export async function GET(req: NextRequest) {
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

    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());

    const validation = messageFiltersSchema.safeParse({
      conversationId: params.conversationId || undefined,
      senderId: params.senderId || undefined,
      type: params.type || undefined,
      status: params.status || undefined,
      dateFrom: params.dateFrom || undefined,
      dateTo: params.dateTo || undefined,
      hasAttachment: params.hasAttachment === 'true' ? true : params.hasAttachment === 'false' ? false : undefined,
      isArchived: params.isArchived === 'true' ? true : params.isArchived === 'false' ? false : undefined,
      isPinned: params.isPinned === 'true' ? true : params.isPinned === 'false' ? false : undefined,
      search: params.search || undefined,
      limit: params.limit ? parseInt(params.limit) : undefined,
      offset: params.offset ? parseInt(params.offset) : undefined,
      sortBy: params.sortBy || undefined,
      sortOrder: params.sortOrder || undefined,
    });

    if (!validation.success) {
      return NextResponse.json({ error: 'ParamÃ¨tres invalides', details: validation.error.flatten() }, { status: 400 });
    }

    const filters = validation.data;
    let query = supabase
      .from('messages')
      .select('*, users(id, first_name, last_name, avatar_url)', { count: 'exact' })
      .eq('school_id', schoolId);

    if (filters.conversationId) query = query.eq('conversation_id', filters.conversationId);
    if (filters.senderId) query = query.eq('sender_id', filters.senderId);
    if (filters.type) query = query.eq('type', filters.type);
    if (filters.status) query = query.eq('status', filters.status);
    if (filters.dateFrom) query = query.gte('created_at', filters.dateFrom);
    if (filters.dateTo) query = query.lte('created_at', filters.dateTo);
    if (filters.isArchived !== undefined) query = query.eq('is_archived', filters.isArchived);
    if (filters.isPinned !== undefined) query = query.eq('is_pinned', filters.isPinned);

    query = query.order(filters.sortBy || 'created_at', { ascending: filters.sortOrder === 'asc' });
    query = query.range(filters.offset || 0, (filters.offset || 0) + (filters.limit || 20) - 1);

    const { data, error, count } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({
      data: data || [],
      total: count || 0,
      limit: filters.limit || 20,
      offset: filters.offset || 0,
    });
  } catch (error) {
    logger.error('Error fetching messages', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
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

    const body = await req.json();
    const validation = sendMessageSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'DonnÃ©es invalides', errors }, { status: 400 });
    }

    const { conversationId, content, type, replyToId, attachmentIds } = validation.data;

    const { data: message, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
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
    logger.error('Error creating message', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
