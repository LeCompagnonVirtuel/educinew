import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@educi/logger';
import { EduOSTriggerConditionService } from '@/features/eduos/services/eduos-trigger-condition.service';
import { triggerConditionCreateSchema } from '@/features/eduos/validators/eduos-data-validators';
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

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const service = new EduOSTriggerConditionService(supabase);
    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());
    const filters: Record<string, unknown> = {};
    if (params.search) filters.search = params.search;
    if (params.page) filters.page = parseInt(params.page);
    if (params.limit) filters.limit = parseInt(params.limit);
    if (params.sortBy) filters.sortBy = params.sortBy;
    if (params.sortOrder) filters.sortOrder = params.sortOrder;

    const data = await service.listTriggerConditions(schoolId, filters);
    return NextResponse.json({ data });
  } catch (error) {
    logger.error('Error fetching trigger conditions', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
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

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const role = profile?.role;
    const schoolId = profile?.school_id;

    if (!['ADMIN', 'SUPER_ADMIN'].includes(role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const body = await req.json();
    const validation = triggerConditionCreateSchema.safeParse({ ...body, school_id: schoolId });

    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
    }

    const service = new EduOSTriggerConditionService(supabase);
    const data = await service.createTriggerCondition(schoolId, validation.data);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    logger.error('Error creating trigger condition', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
