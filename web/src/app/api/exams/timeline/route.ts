import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { examTimelineSchema } from '@/features/exams/validators/schemas';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  try {
                const supabase = await createClient();
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

    const validation = examTimelineSchema.safeParse({
      schoolId,
      classId: params.classId || undefined,
      subjectId: params.subjectId || undefined,
      startDate: params.startDate || undefined,
      endDate: params.endDate || undefined,
      limit: params.limit ? parseInt(params.limit) : undefined,
    });

    if (!validation.success) {
      return NextResponse.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
    }

    const filters = validation.data;
    const limit = filters.limit || 50;

    let query = supabase
      .from('exams')
      .select('*, subjects(id, name), classes(id, name)')
      .eq('school_id', schoolId)
      .order('date', { ascending: true })
      .limit(limit);

    if (filters.classId) query = query.eq('class_id', filters.classId);
    if (filters.subjectId) query = query.eq('subject_id', filters.subjectId);
    if (filters.startDate) query = query.gte('date', filters.startDate);
    if (filters.endDate) query = query.lte('date', filters.endDate);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ data: data || [], total: data?.length || 0 });
  } catch (error) {
    logger.error('Error fetching exam timeline', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
