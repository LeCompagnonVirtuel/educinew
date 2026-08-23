import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createIntegrationRepository } from '@/features/integration/repositories/integration.repository';
import { createEventService } from '@/features/integration/services/event.service';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
                const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const body = await request.json();
    const schoolId = body.schoolId || '';
    const { data: userSchool } = await supabase.from('user_schools').select('school_id').eq('user_id', user.id).eq('school_id', schoolId).single();
    if (!userSchool && user.user_metadata?.role !== 'SUPER_ADMIN' && user.app_metadata?.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Accès interdit' }, { status: 403 });
    }
    const repo = createIntegrationRepository(supabase);
    const service = createEventService(repo);
    const data = await service.publishEvent(body.schoolId, body.userId, body);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    return NextResponse.json({ error: err.message }, { status: (error as { statusCode?: number }).statusCode || 500 });
  }
}
