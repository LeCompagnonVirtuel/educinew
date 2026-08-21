import { NextRequest, NextResponse } from 'next/server';
import { createIntegrationRepository } from '@/features/integration/repositories/integration.repository';
import { createAlertService } from '@/features/integration/services/alert.service';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createIntegrationRepository(supabase);
    const service = createAlertService(repo);
    const data = await service.silenceAlert(body.schoolId, body.userId, params.id, body.duration);
    return NextResponse.json({ data });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    return NextResponse.json({ error: err.message }, { status: (error as { statusCode?: number }).statusCode || 500 });
  }
}
