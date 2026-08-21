import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { examDashboardSchema } from '@/features/exams/validators/schemas';

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());

    const validation = examDashboardSchema.safeParse({
      schoolId,
      academicYearId: params.academicYearId || undefined,
      termId: params.termId || undefined,
      classId: params.classId || undefined,
      includeUpcoming: params.includeUpcoming !== 'false',
      includeRecent: params.includeRecent !== 'false',
      includeStatistics: params.includeStatistics !== 'false',
    });

    if (!validation.success) {
      return NextResponse.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
    }

    const filters = validation.data;
    const now = new Date().toISOString();

    let baseQuery = supabase.from('exams').select('*, subjects(id, name), classes(id, name)').eq('school_id', schoolId);
    if (filters.academicYearId) baseQuery = baseQuery.eq('academic_year_id', filters.academicYearId);
    if (filters.termId) baseQuery = baseQuery.eq('term_id', filters.termId);
    if (filters.classId) baseQuery = baseQuery.eq('class_id', filters.classId);

    const dashboard: any = {};

    if (filters.includeUpcoming) {
      const { data } = await baseQuery.clone().gte('date', now).order('date', { ascending: true }).limit(10);
      dashboard.upcoming = data || [];
    }

    if (filters.includeRecent) {
      const { data } = await baseQuery.clone().lt('date', now).order('date', { ascending: false }).limit(10);
      dashboard.recent = data || [];
    }

    if (filters.includeStatistics) {
      const { data: allExams } = await supabase
        .from('exams')
        .select('id, status, type')
        .eq('school_id', schoolId);

      const exams = allExams || [];
      dashboard.statistics = {
        total: exams.length,
        draft: exams.filter((e: any) => e.status === 'DRAFT').length,
        published: exams.filter((e: any) => e.status === 'PUBLISHED').length,
        locked: exams.filter((e: any) => e.status === 'LOCKED').length,
        archived: exams.filter((e: any) => e.status === 'ARCHIVED').length,
      };
    }

    return NextResponse.json(dashboard);
  } catch (error) {
    logger.error('Error fetching exam dashboard', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
