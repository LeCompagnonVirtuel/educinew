import { NextRequest, NextResponse } from 'next/server';
import { createAnalyticsRepository } from '@/features/analytics/repositories/analytics.repository';
import { createSegmentService } from '@/features/analytics/services/segment.service';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createAnalyticsRepository(supabase);
    const service = createSegmentService(repo);
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams);
    const data = await service.getSegments(params);
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createAnalyticsRepository(supabase);
    const service = createSegmentService(repo);
    const body = await request.json();
    const data = await service.createSegment(body);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 });
  }
}
