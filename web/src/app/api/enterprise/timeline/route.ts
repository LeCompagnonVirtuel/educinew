import { NextRequest, NextResponse } from 'next/server';
import { createEnterpriseRepository } from '@/features/enterprise/repositories/enterprise.repository';
import { createEnterpriseTimelineService } from '@/features/enterprise/services/enterprise-timeline.service';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createEnterpriseRepository(supabase);
    const service = createEnterpriseTimelineService(repo);
    const data = await service.getTimeline('');
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 });
  }
}
