import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { AeipAiDecisionExecutionService } from '@/features/aeip/services/aeip-ai-decision-execution.service';
import { DecisionExecutionCreateSchema } from '@/features/aeip/validators/ai-decision-validators';

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifie' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Etablissement requis' }, { status: 403 });

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const modelId = searchParams.get('modelId') || undefined;
    const status = searchParams.get('status') || undefined;

    const service = new AeipAiDecisionExecutionService(supabase);
    const result = await service.findAll(schoolId, { page, limit, modelId, status });

    return NextResponse.json(result);
  } catch (error) {
    logger.error('Erreur lors de la liste des executions de decision:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifie' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const role = profile?.role;
    const schoolId = profile?.school_id;

    if (!['ADMIN', 'SUPER_ADMIN'].includes(role)) {
      return NextResponse.json({ error: 'Non autorise' }, { status: 403 });
    }
    if (!schoolId) return NextResponse.json({ error: 'Etablissement requis' }, { status: 403 });

    const body = await req.json();
    const validation = DecisionExecutionCreateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Donnees invalides', details: validation.error.flatten() }, { status: 400 });
    }

    const service = new AeipAiDecisionExecutionService(supabase);
    const result = await service.create(schoolId, validation.data);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    logger.error('Erreur lors de la creation de l\'execution de decision:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
