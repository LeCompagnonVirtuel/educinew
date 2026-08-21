import { NextRequest, NextResponse } from 'next/server';
import { createAnalyticsRepository } from '@/features/analytics/repositories/analytics.repository';
import { createRevenueKpiService } from '@/features/analytics/services/revenue-kpi.service';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createAnalyticsRepository(supabase);
    const service = createRevenueKpiService(repo);
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams);
    const data = await service.getRevenueKpi(params);
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 });
  }
}
