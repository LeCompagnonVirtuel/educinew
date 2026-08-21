import { NextRequest, NextResponse } from 'next/server';
import { createCommunicationRepository } from '@/features/communication/repositories/communication.repository';
import { createConversationService } from '@/features/communication/services/conversation.service';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createCommunicationRepository(supabase);
    const service = createConversationService(repo);
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams);
    const data = await service.searchConversations(params);
    return NextResponse.json({ data });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    return NextResponse.json({ error: err.message }, { status: (error as { statusCode?: number }).statusCode || 500 });
  }
}