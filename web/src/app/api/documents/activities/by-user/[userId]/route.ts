import { NextRequest, NextResponse } from 'next/server';
import { createDocumentRepository } from '@/features/documents/repositories/document.repository';
import { createActivityService } from '@/features/documents/services/activity.service';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const { userId } = await params;
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createDocumentRepository(supabase);
    const service = createActivityService(repo);
    const data = await service.getActivitiesByUser(userId);
    return NextResponse.json({ data });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    return NextResponse.json({ error: err.message }, { status: (error as { statusCode?: number }).statusCode || 500 });
  }
}