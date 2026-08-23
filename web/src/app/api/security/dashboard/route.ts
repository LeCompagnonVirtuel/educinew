import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';


export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('sb-')?.value || cookieStore.get('supabase-auth-token')?.value;
    if (!authCookie) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifiÃ©' }, { status: 401 });

    const { data: profile } = await supabase
      .from('users')
      .select('role, school_id')
      .eq('id', user.id)
      .single();

    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Ã‰tablissement requis' }, { status: 403 });

    const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'DIRECTEUR'];
    if (!allowedRoles.includes(profile?.role)) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 403 });
    }

    const [
      socIncidentsResult,
      zeroTrustResult,
      complianceResult,
      threatsResult,
      vulnerabilitiesResult,
      devicesResult,
    ] = await Promise.all([
      supabase
        .from('soc_incidents')
        .select('severity, status')
        .eq('school_id', schoolId),
      supabase
        .from('zero_trust_policies')
        .select('status')
        .eq('school_id', schoolId),
      supabase
        .from('compliance_assessments')
        .select('status, score')
        .eq('school_id', schoolId),
      supabase
        .from('threat_indicators')
        .select('severity, status')
        .eq('school_id', schoolId),
      supabase
        .from('app_security_vulnerabilities')
        .select('severity, status')
        .eq('school_id', schoolId),
      supabase
        .from('device_inventory')
        .select('status')
        .eq('school_id', schoolId),
    ]);

    const socIncidents = socIncidentsResult.data || [];
    const zeroTrustPolicies = zeroTrustResult.data || [];
    const complianceAssessments = complianceResult.data || [];
    const threatIndicators = threatsResult.data || [];
    const vulnerabilities = vulnerabilitiesResult.data || [];
    const devices = devicesResult.data || [];

    const openIncidents = socIncidents.filter((i) => i.status === 'OPEN').length;
    const criticalIncidents = socIncidents.filter((i) => i.severity === 'CRITICAL').length;
    const activeZeroTrustPolicies = zeroTrustPolicies.filter((p) => p.status === 'ACTIVE').length;
    const completedAssessments = complianceAssessments.filter((a) => a.status === 'COMPLETED');
    const avgComplianceScore = completedAssessments.length > 0
      ? completedAssessments.reduce((sum, a) => sum + (a.score || 0), 0) / completedAssessments.length
      : 0;
    const activeThreats = threatIndicators.filter((t) => t.status === 'ACTIVE').length;
    const openVulnerabilities = vulnerabilities.filter((v) => v.status === 'OPEN').length;
    const activeDevices = devices.filter((d) => d.status === 'ACTIVE').length;

    return NextResponse.json({
      securityScore: Math.round(avgComplianceScore * 100) / 100,
      incidents: {
        total: socIncidents.length,
        open: openIncidents,
        critical: criticalIncidents,
      },
      zeroTrust: {
        totalPolicies: zeroTrustPolicies.length,
        activePolicies: activeZeroTrustPolicies,
      },
      compliance: {
        totalAssessments: complianceAssessments.length,
        completed: completedAssessments.length,
        avgScore: Math.round(avgComplianceScore * 100) / 100,
      },
      threats: {
        totalIndicators: threatIndicators.length,
        active: activeThreats,
      },
      vulnerabilities: {
        total: vulnerabilities.length,
        open: openVulnerabilities,
      },
      devices: {
        total: devices.length,
        active: activeDevices,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
