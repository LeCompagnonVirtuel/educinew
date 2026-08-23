import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createIntegrationRepository } from '@/features/integration/repositories/integration.repository';
import { createAiAgentService } from '@/features/integration/services/ai-agent.service';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
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
    const service = createAiAgentService(repo);
    const data = await service.executeAiAgent(body.schoolId, body.userId, params.id, body);
    return NextResponse.json({ data });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    return NextResponse.json({ error: err.message }, { status: (error as { statusCode?: number }).statusCode || 500 });
  }
}
