import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { InteroperabilityConsentRecordService } from '@/features/gei2p/services/consent-record.service';
import { updateConsentRecordSchema } from '@/features/gei2p/validators';

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

    const service = new InteroperabilityConsentRecordService(supabase);
    const data = await service.getConsentRecord(profile.school_id, id);
    if (!data) return NextResponse.json({ error: 'Registre de consentement introuvable' }, { status: 404 });

    return NextResponse.json({ data });
  } catch (error) {
    logger.error('Erreur GET interoperability/consent-records/[id]', error);
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
    if (!['ADMIN', 'SUPER_ADMIN', 'DIRECTEUR'].includes(profile.role)) {
      return NextResponse.json({ error: 'Accès interdit. Rôle requis : ADMIN, SUPER_ADMIN ou DIRECTEUR.' }, { status: 403 });
    }

    const body = await request.json();
    const validation = updateConsentRecordSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Données invalides', details: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const service = new InteroperabilityConsentRecordService(supabase);
    const data = await service.updateConsentRecord(profile.school_id, id, validation.data);
    return NextResponse.json({ data });
  } catch (error) {
    logger.error('Erreur PUT interoperability/consent-records/[id]', error);
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
    if (!['ADMIN', 'SUPER_ADMIN'].includes(profile.role)) {
      return NextResponse.json({ error: 'Accès interdit. Rôle requis : ADMIN ou SUPER_ADMIN.' }, { status: 403 });
    }

    const service = new InteroperabilityConsentRecordService(supabase);
    await service.deleteConsentRecord(profile.school_id, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Erreur DELETE interoperability/consent-records/[id]', error);
    const message = error instanceof Error ? error.message : 'Erreur interne du serveur';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
