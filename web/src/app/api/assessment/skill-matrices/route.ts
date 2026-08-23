import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@educi/logger';
import { AssessmentSkillMatrixService } from '@/features/assessment/services/assessment-skill-matrix.service';
import { skillMatrixCreateSchema } from '@/features/assessment/validators/assessment-certification';

export async function GET(req: NextRequest) {
  try {
                const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const service = new AssessmentSkillMatrixService(supabase);
    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());
    const filters: Record<string, unknown> = {};
    if (params.search) filters.search = params.search;
    if (params.page) filters.page = parseInt(params.page);
    if (params.limit) filters.limit = parseInt(params.limit);
    if (params.sortBy) filters.sortBy = params.sortBy;
    if (params.sortOrder) filters.sortOrder = params.sortOrder;

    const data = await service.listSkillMatrices(schoolId, filters);
    return NextResponse.json({ data });
  } catch (error) {
    logger.error('Error fetching skill matrices', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
                const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const role = profile?.role;
    const schoolId = profile?.school_id;

    if (!['ADMIN', 'SUPER_ADMIN', 'TEACHER'].includes(role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const body = await req.json();
    const validation = skillMatrixCreateSchema.safeParse({ ...body, school_id: schoolId });

    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
    }

    const service = new AssessmentSkillMatrixService(supabase);
    const data = await service.createSkillMatrix(schoolId, validation.data);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    logger.error('Error creating skill matrix', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
