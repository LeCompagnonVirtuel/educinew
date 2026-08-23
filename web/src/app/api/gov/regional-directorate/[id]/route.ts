import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@educi/logger';
import { GovRegionalDirectorateService } from '@/features/gov/services/gov-regional-directorate.service';
import { regionalDirectorateUpdateSchema } from '@/features/gov/validators/gov-ministry-region';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
            if (!authCookie) {
      return NextResponse.json({ error: 'Non autoris�' }, { status: 401 });
    }
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autoris�' }, { status: 401 });
    }

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    if (!profile?.school_id) return NextResponse.json({ error: 'Profil introuvable' }, { status: 404 });

    const service = new GovRegionalDirectorateService(supabase);
    const data = await service.getRegionalDirectorate(profile.school_id, id);
    return NextResponse.json({ data });
  } catch (error) {
    logger.error('Erreur GET regional-directorate/[id]', error);
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
            if (!authCookie) {
      return NextResponse.json({ error: 'Non autoris�' }, { status: 401 });
    }
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autoris�' }, { status: 401 });
    }

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    if (!profile?.school_id) return NextResponse.json({ error: 'Profil introuvable' }, { status: 404 });
    if (!['ADMIN', 'SUPER_ADMIN'].includes(profile.role)) {
      return NextResponse.json({ error: 'Accès interdit. Rôle requis : ADMIN ou SUPER_ADMIN.' }, { status: 403 });
    }

    const body = await request.json();
    const validation = regionalDirectorateUpdateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Données invalides', details: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const service = new GovRegionalDirectorateService(supabase);
    const data = await service.updateRegionalDirectorate(profile.school_id, id, validation.data);
    return NextResponse.json({ data });
  } catch (error) {
    logger.error('Erreur PUT regional-directorate/[id]', error);
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
            if (!authCookie) {
      return NextResponse.json({ error: 'Non autoris�' }, { status: 401 });
    }
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autoris�' }, { status: 401 });
    }

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    if (!profile?.school_id) return NextResponse.json({ error: 'Profil introuvable' }, { status: 404 });
    if (!['ADMIN', 'SUPER_ADMIN'].includes(profile.role)) {
      return NextResponse.json({ error: 'Accès interdit. Rôle requis : ADMIN ou SUPER_ADMIN.' }, { status: 403 });
    }

    const service = new GovRegionalDirectorateService(supabase);
    await service.deleteRegionalDirectorate(profile.school_id, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Erreur DELETE regional-directorate/[id]', error);
    const message = error instanceof Error ? error.message : 'Erreur interne du serveur';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}