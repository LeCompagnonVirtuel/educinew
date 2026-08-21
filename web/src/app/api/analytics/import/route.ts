import { NextRequest, NextResponse } from 'next/server';
import { createAnalyticsRepository } from '@/features/analytics/repositories/analytics.repository';
import { createImportService } from '@/features/analytics/services/import.service';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createAnalyticsRepository(supabase);
    const service = createImportService(repo);
    const body = await request.json();
    const data = await service.importData(body);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 });
  }
}
