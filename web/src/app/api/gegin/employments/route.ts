import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { CreateEmploymentSchema } from '@/features/gegin/validators/employment-validators';
import { createCrudRepository } from '@/features/gegin/repositories/gegin-base.repository';

const TABLE = 'gegin_employments';

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const userId = searchParams.get('userId') || undefined;
    const status = searchParams.get('status') || undefined;
    const department = searchParams.get('department') || undefined;

    const repo = createCrudRepository(supabase, TABLE);
    const filters: Record<string, unknown> = {};
    if (userId) filters.user_id = userId;
    if (status) filters.status = status;
    if (department) filters.department = department;

    const data = await repo.list(schoolId, filters);
    const offset = (page - 1) * limit;
    const paginated = data.slice(offset, offset + limit);

    return NextResponse.json({
      data: paginated,
      total: data.length,
      page,
      limit,
      totalPages: Math.ceil(data.length / limit),
    });
  } catch (error) {
    logger.error('Erreur lors de la liste des employments:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
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

    if (!['ADMIN', 'SUPER_ADMIN', 'RH'].includes(role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const body = await req.json();
    const validation = CreateEmploymentSchema.safeParse({ ...body, school_id: schoolId });
    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
    }

    const { school_id: _, ...createData } = validation.data;
    const repo = createCrudRepository(supabase, TABLE);
    const result = await repo.create({ ...createData, school_id: schoolId } as never);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    logger.error('Erreur lors de la création de l\'employment:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
