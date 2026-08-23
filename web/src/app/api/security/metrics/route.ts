import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';

export const dynamic = 'force-dynamic';

const MetricsQuerySchema = z.object({
  period: z.enum(['24h', '7d', '30d', '90d']).optional(),
  category: z.string().optional(),
});

export async function GET(request: NextRequest) {
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
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase
      .from('users')
      .select('role, school_id')
      .eq('id', user.id)
      .single();

    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'DIRECTEUR'];
    if (!allowedRoles.includes(profile?.role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams.entries());
    const validation = MetricsQuerySchema.safeParse(params);
    if (!validation.success) {
      return NextResponse.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
    }

    const { period = '30d' } = validation.data;
    const now = new Date();
    let dateFrom: string;

    switch (period) {
      case '24h':
        dateFrom = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
        break;
      case '7d':
        dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        break;
      case '30d':
        dateFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
        break;
      case '90d':
        dateFrom = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString();
        break;
    }

    const [incidentsResult, eventsResult, scansResult, complianceResult] = await Promise.all([
      supabase
        .from('soc_incidents')
        .select('severity, status, created_at')
        .eq('school_id', schoolId)
        .gte('created_at', dateFrom),
      supabase
        .from('siem_events')
        .select('severity, event_type, created_at')
        .eq('school_id', schoolId)
        .gte('created_at', dateFrom),
      supabase
        .from('app_security_scans')
        .select('scan_type, status, created_at')
        .eq('school_id', schoolId)
        .gte('created_at', dateFrom),
      supabase
        .from('compliance_assessments')
        .select('status, score, created_at')
        .eq('school_id', schoolId)
        .gte('created_at', dateFrom),
    ]);

    const incidents = incidentsResult.data || [];
    const events = eventsResult.data || [];
    const scans = scansResult.data || [];
    const assessments = complianceResult.data || [];

    const incidentsBySeverity = {
      LOW: incidents.filter((i) => i.severity === 'LOW').length,
      MEDIUM: incidents.filter((i) => i.severity === 'MEDIUM').length,
      HIGH: incidents.filter((i) => i.severity === 'HIGH').length,
      CRITICAL: incidents.filter((i) => i.severity === 'CRITICAL').length,
    };

    const eventsByType = events.reduce((acc: Record<string, number>, e) => {
      acc[e.event_type] = (acc[e.event_type] || 0) + 1;
      return acc;
    }, {});

    const scansByType = scans.reduce((acc: Record<string, number>, s) => {
      acc[s.scan_type] = (acc[s.scan_type] || 0) + 1;
      return acc;
    }, {});

    const completedAssessments = assessments.filter((a) => a.status === 'COMPLETED');
    const avgScore = completedAssessments.length > 0
      ? completedAssessments.reduce((sum, a) => sum + (a.score || 0), 0) / completedAssessments.length
      : 0;

    return NextResponse.json({
      period,
      dateFrom,
      incidents: {
        total: incidents.length,
        bySeverity: incidentsBySeverity,
      },
      events: {
        total: events.length,
        byType: eventsByType,
      },
      scans: {
        total: scans.length,
        byType: scansByType,
      },
      compliance: {
        total: assessments.length,
        completed: completedAssessments.length,
        avgScore: Math.round(avgScore * 100) / 100,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
