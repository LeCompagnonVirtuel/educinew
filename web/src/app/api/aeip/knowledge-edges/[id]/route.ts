import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { AeipKnowledgeEdgeService } from '@/features/aeip/services/aeip-knowledge-edge.service';
import { KnowledgeEdgeUpdateSchema } from '@/features/aeip/validators/digital-brain-validators';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
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
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifie' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Etablissement requis' }, { status: 403 });

    const { id } = await context.params;
    const service = new AeipKnowledgeEdgeService(supabase);
    const result = await service.findById(schoolId, id);

    if (!result) return NextResponse.json({ error: 'Edge de connaissance introuvable' }, { status: 404 });

    return NextResponse.json(result);
  } catch (error) {
    logger.error('Erreur lors de la recuperation de l\'edge de connaissance:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
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

    const { id } = await context.params;
    const body = await req.json();
    const validation = KnowledgeEdgeUpdateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Donnees invalides', details: validation.error.flatten() }, { status: 400 });
    }

    const service = new AeipKnowledgeEdgeService(supabase);
    const result = await service.update(schoolId, id, validation.data);

    if (!result) return NextResponse.json({ error: 'Edge de connaissance introuvable' }, { status: 404 });

    return NextResponse.json(result);
  } catch (error) {
    logger.error('Erreur lors de la mise a jour de l\'edge de connaissance:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
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

    const { id } = await context.params;
    const service = new AeipKnowledgeEdgeService(supabase);
    const result = await service.delete(schoolId, id);

    if (!result) return NextResponse.json({ error: 'Edge de connaissance introuvable' }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Erreur lors de la suppression de l\'edge de connaissance:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}