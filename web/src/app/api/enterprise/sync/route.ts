import { NextRequest, NextResponse } from 'next/server';
import { createEnterpriseRepository } from '@/features/enterprise/repositories/enterprise.repository';
import { createEnterpriseSyncService } from '@/features/enterprise/services/enterprise-sync.service';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
            if (!authCookie) {
      return NextResponse.json({ error: 'Non autoris\u00e9' }, { status: 401 });
    }
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autoris\u00e9' }, { status: 401 });
    }
    const body = await request.json();
    const schoolId = body.schoolId || body.school_id;
    const { data: userSchool } = await supabase.from('user_schools').select('school_id').eq('user_id', user.id).eq('school_id', schoolId).single();
    if (!userSchool && user.user_metadata?.role !== 'SUPER_ADMIN' && user.app_metadata?.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Acc\u00e8s interdit' }, { status: 403 });
    }
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createEnterpriseRepository(supabase);
    const service = createEnterpriseSyncService(repo);
    const body = await request.json();
    const data = await service.sync('', body.type, body.options);
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 });
  }
}
