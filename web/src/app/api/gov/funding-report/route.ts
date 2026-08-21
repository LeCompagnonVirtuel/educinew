import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { GovFundingReportService } from '@/features/gov/services/gov-funding-report.service';
import { fundingReportCreateSchema, fundingReportUpdateSchema } from '@/features/gov/validators/gov-analytics-funding-identity';

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => request.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    if (!profile?.school_id) return NextResponse.json({ error: 'Profil introuvable' }, { status: 404 });

    const service = new GovFundingReportService(supabase);
    const { searchParams } = new URL(request.url);
    const filters: Record<string, unknown> = {};
    searchParams.forEach((value, key) => { filters[key] = value; });

    const data = await service.listFundingReports(profile.school_id, filters);
    return NextResponse.json({ data });
  } catch (error) {
    logger.error('Erreur GET funding-report', error);
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
    const validation = fundingReportCreateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Données invalides', details: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const service = new GovFundingReportService(supabase);
    const data = await service.createFundingReport(profile.school_id, validation.data);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    logger.error('Erreur POST funding-report', error);
    const message = error instanceof Error ? error.message : 'Erreur interne du serveur';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}