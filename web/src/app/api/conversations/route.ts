import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { createConversationSchema } from '@/features/messages/validators/schemas';

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const type = url.searchParams.get('type');

    let query = supabase
      .from('conversation_members')
      .select('conversations(*, users(id, first_name, last_name, avatar_url))', { count: 'exact' })
      .eq('user_id', user.id);

    if (type) {
      query = query.eq('conversations.type', type);
    }

    query = query.order('conversations.created_at', { ascending: false });
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({
      data: data?.map((m) => m.conversations) || [],
      total: count || 0,
    });
  } catch (error) {
    logger.error('Error fetching conversations', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const body = await req.json();
    const validation = createConversationSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
    }

    const { type, title, description, memberIds } = validation.data;

    const { data: conversation, error } = await supabase
      .from('conversations')
      .insert({
        type,
        title,
        description: description || null,
        school_id: schoolId,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    const members = [
      { conversation_id: conversation.id, user_id: user.id },
      ...memberIds.filter((id) => id !== user.id).map((userId) => ({
        conversation_id: conversation.id,
        user_id: userId,
      })),
    ];

    await supabase.from('conversation_members').insert(members);

    return NextResponse.json(conversation, { status: 201 });
  } catch (error) {
    logger.error('Error creating conversation', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
