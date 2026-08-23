import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';


export const dynamic = 'force-dynamic';

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
    if (!schoolId) return NextResponse.json({ error: 'Ã‰tablissement requis' }, { status: 403 });

    const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'DIRECTEUR'];
    if (!allowedRoles.includes(profile?.role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const [incidentsResult, indicatorsResult, assessmentsResult] = await Promise.all([
      supabase
        .from('soc_incidents')
        .select('severity, status')
        .eq('school_id', schoolId),
      supabase
        .from('soc_indicators')
        .select('type, severity, status')
        .eq('school_id', schoolId),
      supabase
        .from('zero_trust_assessments')
        .select('status, score')
        .eq('school_id', schoolId),
    ]);

    const incidents = incidentsResult.data || [];
    const indicators = indicatorsResult.data || [];
    const assessments = assessmentsResult.data || [];

    const incidentsBySeverity = {
      LOW: incidents.filter((i) => i.severity === 'LOW').length,
      MEDIUM: incidents.filter((i) => i.severity === 'MEDIUM').length,
      HIGH: incidents.filter((i) => i.severity === 'HIGH').length,
      CRITICAL: incidents.filter((i) => i.severity === 'CRITICAL').length,
    };

    const incidentsByStatus = {
      OPEN: incidents.filter((i) => i.status === 'OPEN').length,
      IN_PROGRESS: incidents.filter((i) => i.status === 'IN_PROGRESS').length,
      RESOLVED: incidents.filter((i) => i.status === 'RESOLVED').length,
      CLOSED: incidents.filter((i) => i.status === 'CLOSED').length,
    };

    const indicatorsByType = indicators.reduce((acc: Record<string, number>, ind) => {
      acc[ind.type] = (acc[ind.type] || 0) + 1;
      return acc;
    }, {});

    const activeAssessments = assessments.filter((a) => a.status === 'COMPLETED');
    const avgScore = activeAssessments.length > 0
      ? activeAssessments.reduce((sum, a) => sum + (a.score || 0), 0) / activeAssessments.length
      : 0;

    return NextResponse.json({
      summary: {
        totalIncidents: incidents.length,
        openIncidents: incidentsByStatus.OPEN,
        criticalIncidents: incidentsBySeverity.CRITICAL,
        totalIndicators: indicators.length,
        avgAssessmentScore: Math.round(avgScore * 100) / 100,
      },
      incidentsBySeverity,
      incidentsByStatus,
      indicatorsByType,
      recentAssessments: assessments.slice(0, 5),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
