import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { GovDashboardWidgetService } from '@/features/gov/services/gov-dashboard-widget.service';
import { dashboardWidgetCreateSchema, dashboardWidgetUpdateSchema } from '@/features/gov/validators/gov-analytics-funding-identity';

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => request.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    if (!profile?.school_id) return NextResponse.json({ error: 'Profil introuvable' }, { status: 404 });

    const service = new GovDashboardWidgetService(supabase);
    const { searchParams } = new URL(request.url);
    const filters: Record<string, unknown> = {};
    searchParams.forEach((value, key) => { filters[key] = value; });

    const data = await service.listDashboardWidgets(profile.school_id, filters);
    return NextResponse.json({ data });
  } catch (error) {
    logger.error('Erreur GET dashboard-widget', error);
    const message = error instanceof Error ? error.message : 'Erreur interne du serveur';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => request.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    if (!profile?.school_id) return NextResponse.json({ error: 'Profil introuvable' }, { status: 404 });
    if (!['ADMIN', 'SUPER_ADMIN'].includes(profile.role)) {
      return NextResponse.json({ error: 'Accès interdit. Rôle requis : ADMIN ou SUPER_ADMIN.' }, { status: 403 });
    }

    const body = await request.json();
    const validation = dashboardWidgetCreateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Données invalides', details: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const service = new GovDashboardWidgetService(supabase);
    const data = await service.createDashboardWidget(profile.school_id, validation.data);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    logger.error('Erreur POST dashboard-widget', error);
    const message = error instanceof Error ? error.message : 'Erreur interne du serveur';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}