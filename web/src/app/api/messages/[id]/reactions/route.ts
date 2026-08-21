import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { addReactionSchema } from '@/features/messages/validators/schemas';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { id } = await context.params;

    const { data, error } = await supabase
      .from('message_reactions')
      .select('*, users(id, first_name, last_name, avatar_url)')
      .eq('message_id', id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data || []);
  } catch (error) {
    logger.error('Error fetching message reactions', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, context: { params: { id: string } }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { id } = await context.params;
    const body = await req.json();
    const validation = addReactionSchema.safeParse({ ...body, messageId: id });

    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
    }

    const { type } = validation.data;

    const { data: existing } = await supabase
      .from('message_reactions')
      .select('id')
      .eq('message_id', id)
      .eq('user_id', user.id)
      .eq('type', type)
      .single();

    if (existing) {
      await supabase.from('message_reactions').delete().eq('id', existing.id);
      return NextResponse.json({ removed: true });
    }

    const { data, error } = await supabase
      .from('message_reactions')
      .insert({ message_id: id, user_id: user.id, type })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    logger.error('Error adding reaction to message', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
