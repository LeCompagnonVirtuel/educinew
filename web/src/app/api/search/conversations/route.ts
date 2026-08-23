import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { logger } from '@educi/logger';
import { conversationSearchSchema } from '@/features/messages/validators/schemas';

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

    const validation = conversationSearchSchema.safeParse({
      query: params.query,
      type: params.type || undefined,
      isArchived: params.isArchived === 'true' ? true : params.isArchived === 'false' ? false : undefined,
      limit: params.limit ? parseInt(params.limit) : undefined,
    });

    if (!validation.success) {
      return NextResponse.json({ error: 'ParamÃ¨tres invalides', details: validation.error.flatten() }, { status: 400 });
    }

    const { query: searchQuery, type, isArchived, limit } = validation.data;

    let dbQuery = supabase
      .from('conversations')
      .select('*')
      .eq('school_id', schoolId)
      .ilike('title', `%${searchQuery}%`);

    if (type) dbQuery = dbQuery.eq('type', type);
    if (isArchived !== undefined) dbQuery = dbQuery.eq('is_archived', isArchived);

    dbQuery = dbQuery.order('created_at', { ascending: false });
    dbQuery = dbQuery.limit(limit || 20);

    const { data, error } = await dbQuery;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({
      data: data || [],
      total: data?.length || 0,
      query: searchQuery,
    });
  } catch (error) {
    logger.error('Error searching conversations', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
