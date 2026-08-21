import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { editMessageSchema, deleteMessageSchema } from '@/features/messages/validators/schemas';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const { id } = await context.params;

    const { data, error } = await supabase
      .from('messages')
      .select('*, users(id, first_name, last_name, avatar_url), message_attachments(*)')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();

    if (error) return NextResponse.json({ error: 'Message non trouvé' }, { status: 404 });
    return NextResponse.json(data);
  } catch (error) {
    logger.error('Error fetching message', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const { id } = await context.params;
    const body = await req.json();
    const validation = editMessageSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
    }

    const { data: existing } = await supabase
      .from('messages')
      .select('sender_id')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();

    if (!existing) return NextResponse.json({ error: 'Message non trouvé' }, { status: 404 });
    if (existing.sender_id !== user.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const { data, error } = await supabase
      .from('messages')
      .update({ content: validation.data.content, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (error) {
    logger.error('Error updating message', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const { id } = await context.params;
    const url = new URL(req.url);
    const permanent = url.searchParams.get('permanent') === 'true';

    if (permanent) {
      const role = profile?.role;
      if (!['ADMIN', 'SUPER_ADMIN'].includes(role)) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
      }
    }

    if (permanent) {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id)
        .eq('school_id', schoolId);

      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      const { data: existing } = await supabase
        .from('messages')
        .select('sender_id')
        .eq('id', id)
        .eq('school_id', schoolId)
        .single();

      if (!existing) return NextResponse.json({ error: 'Message non trouvé' }, { status: 404 });
      if (existing.sender_id !== user.id && !['ADMIN', 'SUPER_ADMIN'].includes(profile?.role)) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
      }

      const { error } = await supabase
        .from('messages')
        .update({ status: 'DELETED', updated_at: new Date().toISOString() })
        .eq('id', id)
        .eq('school_id', schoolId);

      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Error deleting message', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
