import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { InteroperabilitySkillService } from '@/features/gei2p/services/skill.service';
import { updateSkillSchema } from '@/features/gei2p/validators';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const supabase = createRouteHandlerClient({ cookies: () => request.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    if (!profile?.school_id) return NextResponse.json({ error: 'Profil introuvable' }, { status: 404 });

    const service = new InteroperabilitySkillService(supabase);
    const data = await service.getSkill(profile.school_id, id);
    if (!data) return NextResponse.json({ error: 'Compétence introuvable' }, { status: 404 });

    return NextResponse.json({ data });
  } catch (error) {
    logger.error('Erreur GET interoperability/skills/[id]', error);
    const message = error instanceof Error ? error.message : 'Erreur interne du serveur';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const supabase = createRouteHandlerClient({ cookies: () => request.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    if (!profile?.school_id) return NextResponse.json({ error: 'Profil introuvable' }, { status: 404 });
    if (!['ADMIN', 'SUPER_ADMIN', 'DIRECTEUR', 'SECRETAIRE'].includes(profile.role)) {
      return NextResponse.json({ error: 'Accès interdit. Rôle requis : ADMIN, SUPER_ADMIN, DIRECTEUR ou SECRETAIRE.' }, { status: 403 });
    }

    const body = await request.json();
    const validation = updateSkillSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Données invalides', details: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const service = new InteroperabilitySkillService(supabase);
    const data = await service.updateSkill(profile.school_id, id, validation.data);
    return NextResponse.json({ data });
  } catch (error) {
    logger.error('Erreur PUT interoperability/skills/[id]', error);
    const message = error instanceof Error ? error.message : 'Erreur interne du serveur';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const supabase = createRouteHandlerClient({ cookies: () => request.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    if (!profile?.school_id) return NextResponse.json({ error: 'Profil introuvable' }, { status: 404 });
    if (!['ADMIN', 'SUPER_ADMIN', 'DIRECTEUR'].includes(profile.role)) {
      return NextResponse.json({ error: 'Accès interdit. Rôle requis : ADMIN, SUPER_ADMIN ou DIRECTEUR.' }, { status: 403 });
    }

    const service = new InteroperabilitySkillService(supabase);
    await service.deleteSkill(profile.school_id, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Erreur DELETE interoperability/skills/[id]', error);
    const message = error instanceof Error ? error.message : 'Erreur interne du serveur';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
