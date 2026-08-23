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
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifie' }, { status: 401 });
    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Etablissement requis' }, { status: 403 });
    if (!['SUPER_ADMIN', 'ADMIN'].includes(profile?.role)) return NextResponse.json({ error: 'Non autorise' }, { status: 403 });

    const [providers, resources, deployments, clusters, edges, networks] = await Promise.all([
      supabase.from('cloud_providers').select('id, status').eq('school_id', schoolId).is('deleted_at', null),
      supabase.from('cloud_resources').select('id, status, type').eq('school_id', schoolId).is('deleted_at', null),
      supabase.from('cloud_deployments').select('id, status').eq('school_id', schoolId).is('deleted_at', null),
      supabase.from('container_clusters').select('id, status').eq('school_id', schoolId).is('deleted_at', null),
      supabase.from('edge_nodes').select('id, status').eq('school_id', schoolId).is('deleted_at', null),
      supabase.from('networks').select('id, status').eq('school_id', schoolId).is('deleted_at', null),
    ]);

    const data = {
      providers: {
        total: providers.data?.length || 0,
        active: providers.data?.filter((p) => p.status === 'ACTIVE').length || 0,
      },
      resources: {
        total: resources.data?.length || 0,
        running: resources.data?.filter((r) => r.status === 'RUNNING').length || 0,
        stopped: resources.data?.filter((r) => r.status === 'STOPPED').length || 0,
        byType: resources.data?.reduce<Record<string, number>>((acc, r) => {
          acc[r.type] = (acc[r.type] || 0) + 1;
          return acc;
        }, {}) || {},
      },
      deployments: {
        total: deployments.data?.length || 0,
        completed: deployments.data?.filter((d) => d.status === 'COMPLETED').length || 0,
        inProgress: deployments.data?.filter((d) => d.status === 'IN_PROGRESS').length || 0,
        failed: deployments.data?.filter((d) => d.status === 'FAILED').length || 0,
      },
      clusters: {
        total: clusters.data?.length || 0,
        active: clusters.data?.filter((c) => c.status === 'ACTIVE').length || 0,
      },
      edge: {
        total: edges.data?.length || 0,
        online: edges.data?.filter((e) => e.status === 'ONLINE').length || 0,
        offline: edges.data?.filter((e) => e.status === 'OFFLINE').length || 0,
      },
      networks: {
        total: networks.data?.length || 0,
        active: networks.data?.filter((n) => n.status === 'ACTIVE').length || 0,
      },
    };

    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
