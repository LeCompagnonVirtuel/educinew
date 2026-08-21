import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { AssessmentEssayEvaluationService } from '@/features/assessment/services/assessment-essay-evaluation.service';
import { essayEvaluationAICreateSchema } from '@/features/assessment/validators/assessment-core';

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const service = new AssessmentEssayEvaluationService(supabase);
    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());
    const filters: Record<string, unknown> = {};
    if (params.search) filters.search = params.search;
    if (params.page) filters.page = parseInt(params.page);
    if (params.limit) filters.limit = parseInt(params.limit);
    if (params.sortBy) filters.sortBy = params.sortBy;
    if (params.sortOrder) filters.sortOrder = params.sortOrder;

    const data = await service.listEssayEvaluations(schoolId, filters);
    return NextResponse.json({ data });
  } catch (error) {
    logger.error('Error fetching essay evaluations', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const role = profile?.role;
    const schoolId = profile?.school_id;

    if (!['ADMIN', 'SUPER_ADMIN', 'TEACHER'].includes(role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const body = await req.json();
    const validation = essayEvaluationAICreateSchema.safeParse({ ...body, school_id: schoolId });

    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
    }

    const service = new AssessmentEssayEvaluationService(supabase);
    const data = await service.createEssayEvaluation(schoolId, validation.data);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    logger.error('Error creating essay evaluation', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
