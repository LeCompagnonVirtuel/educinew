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
    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());

    let query = supabase
      .from('exam_audit_logs')
      .select('*, users(id, first_name, last_name)')
      .eq('exam_id', id)
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false });

    const limit = params.limit ? parseInt(params.limit) : 50;
    query = query.limit(limit);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ data: data || [], total: data?.length || 0 });
  } catch (error) {
    logger.error('Error fetching exam audit', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
