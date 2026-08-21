import { NextRequest, NextResponse } from 'next/server';
import { createEnterpriseRepository } from '@/features/enterprise/repositories/enterprise.repository';
import { createEnterpriseAnalyticsService } from '@/features/enterprise/services/enterprise-analytics.service';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createEnterpriseRepository(supabase);
    const service = createEnterpriseAnalyticsService(repo);
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate') || '';
    const endDate = searchParams.get('endDate') || '';
    const data = await service.getRange('', startDate, endDate);
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 });
  }
}
