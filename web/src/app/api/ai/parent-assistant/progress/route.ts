import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { AiParentAssistantService } from '@/features/ai/services/ai-parent-assistant.service';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const parentId = searchParams.get('parentId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const service = new AiParentAssistantService(supabase);
    const data = await service.getProgress(schoolId, parentId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}