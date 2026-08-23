import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getFinancialSummary } from '@/lib/payments/fee-manager';
import { cookies } from 'next/headers';
export const runtime = 'nodejs';

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
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    if (!['ADMIN', 'SUPER_ADMIN', 'COMPTABLE'].includes(profile?.role)) {
      return NextResponse.json({ error: 'Accès réservé aux administrateurs et comptables' }, { status: 403 });
    }
    if (!profile?.school_id) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('start') || undefined;
    const endDate = searchParams.get('end') || undefined;

    const summary = await getFinancialSummary(profile.school_id, startDate, endDate);
    return NextResponse.json(summary);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
