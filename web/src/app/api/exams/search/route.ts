import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { examSearchSchema } from '@/features/exams/validators/schemas';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('sb-')?.value || cookieStore.get('supabase-auth-token')?.value;
    if (!authCookie) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());

    const validation = examSearchSchema.safeParse({
      schoolId,
      query: params.query || '',
      types: params.types ? params.types.split(',') : undefined,
      statuses: params.statuses ? params.statuses.split(',') : undefined,
      classIds: params.classIds ? params.classIds.split(',') : undefined,
      subjectIds: params.subjectIds ? params.subjectIds.split(',') : undefined,
      dateFrom: params.dateFrom || undefined,
      dateTo: params.dateTo || undefined,
      limit: params.limit ? parseInt(params.limit) : undefined,
    });

    if (!validation.success) {
      return NextResponse.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
    }

    const { query, types, statuses, classIds, subjectIds, dateFrom, dateTo, limit } = validation.data;
    const maxResults = limit || 50;

    let dbQuery = supabase
      .from('exams')
      .select('*, subjects(id, name), classes(id, name)')
      .eq('school_id', schoolId)
      .ilike('name', `%${query}%`)
      .limit(maxResults);

    if (types?.length) dbQuery = dbQuery.in('type', types);
    if (statuses?.length) dbQuery = dbQuery.in('status', statuses);
    if (classIds?.length) dbQuery = dbQuery.in('class_id', classIds);
    if (subjectIds?.length) dbQuery = dbQuery.in('subject_id', subjectIds);
    if (dateFrom) dbQuery = dbQuery.gte('date', dateFrom);
    if (dateTo) dbQuery = dbQuery.lte('date', dateTo);

    const { data, error } = await dbQuery;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ data: data || [], total: data?.length || 0 });
  } catch (error) {
    logger.error('Error searching exams', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
