import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const url = new URL(req.url);
    const lastSync = url.searchParams.get('lastSync');

    let query = supabase
      .from('messages')
      .select('*, users(id, first_name, last_name, avatar_url)')
      .eq('school_id', schoolId);

    if (lastSync) {
      query = query.gte('updated_at', lastSync);
    }

    query = query.order('updated_at', { ascending: false });
    query = query.limit(100);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({
      messages: data || [],
      syncedAt: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error syncing messages', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
