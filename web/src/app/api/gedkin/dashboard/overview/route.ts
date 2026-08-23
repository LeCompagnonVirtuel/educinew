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
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifie' }, { status: 401 });
    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Etablissement requis' }, { status: 403 });
    const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'DIRECTEUR'];
    if (!allowedRoles.includes(profile?.role)) return NextResponse.json({ error: 'Non autorise' }, { status: 403 });

    const [domainsResult, productsResult, entitiesResult, experimentsResult, indicatorsResult] = await Promise.all([
      supabase.from('gedkin_domains').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null),
      supabase.from('gedkin_products').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null),
      supabase.from('gedkin_entities').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null),
      supabase.from('gedkin_experiments').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null),
      supabase.from('gedkin_indicators').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null),
    ]);

    return NextResponse.json({
      domains: domainsResult.count || 0,
      products: productsResult.count || 0,
      entities: entitiesResult.count || 0,
      experiments: experimentsResult.count || 0,
      indicators: indicatorsResult.count || 0,
      generated_at: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
