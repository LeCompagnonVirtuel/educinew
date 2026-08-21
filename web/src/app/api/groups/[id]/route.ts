import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { updateGroupSchema } from '@/features/messages/validators/schemas';

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
      .from('conversation_groups')
      .select('*, conversation_group_members(*, users(id, first_name, last_name, avatar_url))')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();

    if (error) return NextResponse.json({ error: 'Groupe non trouvé' }, { status: 404 });
    return NextResponse.json(data);
  } catch (error) {
    logger.error('Error fetching group', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const role = profile?.role;
    const schoolId = profile?.school_id;

    if (!['ADMIN', 'SUPER_ADMIN'].includes(role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const { id } = await context.params;
    const body = await req.json();
    const validation = updateGroupSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('conversation_groups')
      .update({ ...validation.data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (error) {
    logger.error('Error updating group', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const role = profile?.role;
    const schoolId = profile?.school_id;

    if (!['ADMIN', 'SUPER_ADMIN'].includes(role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const { id } = await context.params;

    const { error } = await supabase
      .from('conversation_groups')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Error deleting group', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
