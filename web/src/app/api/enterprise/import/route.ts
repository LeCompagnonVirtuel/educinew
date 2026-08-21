import { NextRequest, NextResponse } from 'next/server';
import { createEnterpriseRepository } from '@/features/enterprise/repositories/enterprise.repository';
import { createEnterpriseImportService } from '@/features/enterprise/services/enterprise-import.service';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createEnterpriseRepository(supabase);
    const service = createEnterpriseImportService(repo);
    const body = await request.json();
    const data = await service.importData('', body.type, body.data);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 });
  }
}
