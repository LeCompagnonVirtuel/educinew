import { NextRequest, NextResponse } from 'next/server';
import { createEnterpriseRepository } from '@/features/enterprise/repositories/enterprise.repository';
import { createEnterpriseExportService } from '@/features/enterprise/services/enterprise-export.service';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createEnterpriseRepository(supabase);
    const service = createEnterpriseExportService(repo);
    const body = await request.json();
    const data = await service.exportData('', body.type, body.filters);
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 });
  }
}
