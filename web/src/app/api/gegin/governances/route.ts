import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { CreateGovernanceSchema } from '@/features/gegin/validators/governance-validators';
import { createCrudRepository } from '@/features/gegin/repositories/gegin-base.repository';

const TABLE = 'gegin_governance_bodies';

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
    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') || undefined;

    const repo = createCrudRepository(supabase, TABLE);
    const filters: Record<string, unknown> = {};
    if (status) filters.status = status;

    const data = await repo.list(schoolId, filters);
    const filtered = search
      ? data.filter((item: Record<string, unknown>) =>
          (item.name as string)?.toLowerCase().includes(search.toLowerCase()))
      : data;

    const offset = (page - 1) * limit;
    const paginated = filtered.slice(offset, offset + limit);

    return NextResponse.json({
      data: paginated,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
    });
  } catch (error) {
    logger.error('Erreur lors de la liste des corps de gouvernance:', error);
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

    if (!['ADMIN', 'SUPER_ADMIN', 'DIRECTEUR'].includes(role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const body = await req.json();
    const validation = CreateGovernanceSchema.safeParse({ ...body, school_id: schoolId });
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
    logger.error('Erreur lors de la création du corps de gouvernance:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
