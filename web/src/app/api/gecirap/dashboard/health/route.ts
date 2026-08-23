import { createClient } from '@/utils/supabase/server';
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
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifie' }, { status: 401 });
    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Etablissement requis' }, { status: 403 });
    if (!['SUPER_ADMIN', 'ADMIN'].includes(profile?.role)) return NextResponse.json({ error: 'Non autorise' }, { status: 403 });

    const [regionHealth, networkHealth, aiopsEvents] = await Promise.all([
      supabase.from('region_health').select('*, region:geo_regions(id, name, code)').eq('school_id', schoolId).order('checked_at', { ascending: false }).limit(20),
      supabase.from('network_health').select('*').eq('school_id', schoolId).order('checked_at', { ascending: false }).limit(20),
      supabase.from('aiops_events').select('id, severity, status').eq('school_id', schoolId).order('created_at', { ascending: false }).limit(20),
    ]);

    const data = {
      regions: {
        healthy: regionHealth.data?.filter((r) => r.status === 'HEALTHY').length || 0,
        degraded: regionHealth.data?.filter((r) => r.status === 'DEGRADED').length || 0,
        down: regionHealth.data?.filter((r) => r.status === 'DOWN').length || 0,
        checks: regionHealth.data || [],
      },
      network: {
        healthy: networkHealth.data?.filter((n) => n.status === 'HEALTHY').length || 0,
        degraded: networkHealth.data?.filter((n) => n.status === 'DEGRADED').length || 0,
        down: networkHealth.data?.filter((n) => n.status === 'DOWN').length || 0,
        checks: networkHealth.data || [],
      },
      alerts: {
        critical: aiopsEvents.data?.filter((e) => e.severity === 'CRITICAL' && e.status === 'OPEN').length || 0,
        high: aiopsEvents.data?.filter((e) => e.severity === 'HIGH' && e.status === 'OPEN').length || 0,
        medium: aiopsEvents.data?.filter((e) => e.severity === 'MEDIUM' && e.status === 'OPEN').length || 0,
        recent: aiopsEvents.data || [],
      },
    };

    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
