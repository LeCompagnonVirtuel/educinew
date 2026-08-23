import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET /api/payments/financial — financial dashboard data
export async function GET(req: NextRequest) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

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
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    if (!['ADMIN', 'SUPER_ADMIN', 'COMPTABLE'].includes(profile?.role)) {
      return NextResponse.json({ error: 'Accès réservé aux administrateurs et comptables' }, { status: 403 });
    }
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const [dashboardRes, breakdownRes, trendRes, gatewayStatsRes] = await Promise.all([
      supabase.rpc('get_financial_dashboard', { p_school_id: schoolId }),
      supabase.rpc('get_payment_method_breakdown', { p_school_id: schoolId }),
      supabase.rpc('get_monthly_revenue_trend', { p_school_id: schoolId, p_months: 12 }),
      supabase.from('payment_gateway_configs')
        .select('gateway, display_name, is_active, last_test_status')
        .eq('school_id', schoolId),
    ]);

    const dashboard = dashboardRes.data || {
      today_revenue: 0,
      month_revenue: 0,
      total_transactions: 0,
      successful_transactions: 0,
      failed_transactions: 0,
      success_rate: 0,
      avg_amount: 0,
    };

    const methodBreakdown = breakdownRes.data || [];
    const revenueTrend = trendRes.data || [];
    const gatewayStats = gatewayStatsRes.data || [];
    const activeGateways = gatewayStats.filter((g: any) => g.is_active).length;

    return NextResponse.json({
      dashboard,
      methodBreakdown,
      revenueTrend,
      gatewayStats,
      activeGateways,
      totalGateways: gatewayStats.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
