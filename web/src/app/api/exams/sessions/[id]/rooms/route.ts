import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';

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
      .from('exam_rooms')
      .select('*')
      .eq('session_id', id)
      .eq('school_id', schoolId);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ data: data || [], total: data?.length || 0 });
  } catch (error) {
    logger.error('Error fetching session rooms', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, context: { params: { id: string } }) {
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

    const { data: room, error } = await supabase
      .from('exam_rooms')
      .insert({ ...body, session_id: id, school_id: schoolId, created_by: user.id })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    logger.error('Error creating session room', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
