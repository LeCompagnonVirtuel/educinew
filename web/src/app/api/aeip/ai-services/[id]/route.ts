import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { AeipAiOsServiceService } from '@/features/aeip/services/aeip-ai-os-service.service';
import { AIServiceUpdateSchema } from '@/features/aeip/validators/ai-os-validators';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const { id } = await context.params;
    const service = new AeipAiOsServiceService(supabase);
    const result = await service.findById(schoolId, id);

    if (!result) return NextResponse.json({ error: 'Service IA introuvable' }, { status: 404 });

    return NextResponse.json(result);
  } catch (error) {
    logger.error('Erreur lors de la récupération du service IA:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const role = profile?.role;
    const schoolId = profile?.school_id;

    if (!['ADMIN', 'SUPER_ADMIN'].includes(role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const { id } = await context.params;
    const body = await req.json();
    const validation = AIServiceUpdateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Données invalides', details: validation.error.flatten() }, { status: 400 });
    }

    const service = new AeipAiOsServiceService(supabase);
    const result = await service.update(schoolId, id, validation.data);

    if (!result) return NextResponse.json({ error: 'Service IA introuvable' }, { status: 404 });

    return NextResponse.json(result);
  } catch (error) {
    logger.error('Erreur lors de la mise à jour du service IA:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const role = profile?.role;
    const schoolId = profile?.school_id;

    if (!['ADMIN', 'SUPER_ADMIN'].includes(role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const { id } = await context.params;
    const service = new AeipAiOsServiceService(supabase);
    const result = await service.delete(schoolId, id);

    if (!result) return NextResponse.json({ error: 'Service IA introuvable' }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Erreur lors de la suppression du service IA:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
