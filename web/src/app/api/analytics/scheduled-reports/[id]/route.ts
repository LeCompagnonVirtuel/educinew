import { NextRequest, NextResponse } from 'next/server';
import { createAnalyticsRepository } from '@/features/analytics/repositories/analytics.repository';
import { createScheduledReportsService } from '@/features/analytics/services/scheduled-reports.service';
import { createClient } from '@supabase/supabase-js';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createAnalyticsRepository(supabase);
    const service = createScheduledReportsService(repo);
    const body = await request.json();
    const data = await service.updateScheduledReport(params.id, body);
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createAnalyticsRepository(supabase);
    const service = createScheduledReportsService(repo);
    await service.deleteScheduledReport(params.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 });
  }
}
