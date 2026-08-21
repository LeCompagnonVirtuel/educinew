import { NextRequest, NextResponse } from 'next/server';
import { createCommunicationRepository } from '@/features/communication/repositories/communication.repository';
import { createNotificationService } from '@/features/communication/services/notification.service';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createCommunicationRepository(supabase);
    const service = createNotificationService(repo);
    const data = await service.sendBatch(body);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    return NextResponse.json({ error: err.message }, { status: (error as { statusCode?: number }).statusCode || 500 });
  }
}