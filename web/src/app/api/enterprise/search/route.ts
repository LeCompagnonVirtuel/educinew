import { NextRequest, NextResponse } from 'next/server';
import { createEnterpriseRepository } from '@/features/enterprise/repositories/enterprise.repository';
import { createEnterpriseSearchService } from '@/features/enterprise/services/enterprise-search.service';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createEnterpriseRepository(supabase);
    const service = createEnterpriseSearchService(repo);
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const data = await service.searchSchools('', query);
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 });
  }
}
