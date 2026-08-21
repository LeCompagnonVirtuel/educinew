import { NextRequest, NextResponse } from 'next/server';
import { createCommunicationRepository } from '@/features/communication/repositories/communication.repository';
import { createGroupService } from '@/features/communication/services/group.service';
import { createClient } from '@supabase/supabase-js';

export async function PUT(request: NextRequest, { params }: { params: { id: string; userId: string } }) {
  try {
    const body = await request.json();
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createCommunicationRepository(supabase);
    const service = createGroupService(repo);
    const data = await service.updateMemberRole(params.id, params.userId, body);
    return NextResponse.json({ data });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    return NextResponse.json({ error: err.message }, { status: (error as { statusCode?: number }).statusCode || 500 });
  }
}