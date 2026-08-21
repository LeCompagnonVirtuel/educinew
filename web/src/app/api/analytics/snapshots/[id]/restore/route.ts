import { NextRequest, NextResponse } from 'next/server';
import { createAnalyticsRepository } from '@/features/analytics/repositories/analytics.repository';
import { createSnapshotsService } from '@/features/analytics/services/snapshots.service';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createAnalyticsRepository(supabase);
    const service = createSnapshotsService(repo);
    const data = await service.restoreSnapshot(params.id);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 });
  }
}
