import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@educi/logger';
import { EduOSMicrosoft365IntegrationService } from '@/features/eduos/services/eduos-microsoft365-integration.service';
import { microsoft365IntegrationCreateSchema } from '@/features/eduos/validators/eduos-integration-validators';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

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

    const service = new EduOSMicrosoft365IntegrationService(supabase);
    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());
    const filters: Record<string, unknown> = {};
    if (params.search) filters.search = params.search;
    if (params.page) filters.page = parseInt(params.page);
    if (params.limit) filters.limit = parseInt(params.limit);

    const data = await service.listMicrosoft365Integrations(schoolId, filters);
    return NextResponse.json({ data });
  } catch (error) {
    logger.error('Error fetching microsoft 365 integrations', error);
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

    if (!['ADMIN', 'SUPER_ADMIN'].includes(role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const body = await req.json();
    const validation = microsoft365IntegrationCreateSchema.safeParse({ ...body, school_id: schoolId });

    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
    }

    const service = new EduOSMicrosoft365IntegrationService(supabase);
    const data = await service.createMicrosoft365Integration(schoolId, validation.data);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    logger.error('Error creating Microsoft365Integration', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}