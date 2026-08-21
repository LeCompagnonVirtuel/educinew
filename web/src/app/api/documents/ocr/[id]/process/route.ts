import { NextRequest, NextResponse } from 'next/server';
import { createDocumentRepository } from '@/features/documents/repositories/document.repository';
import { createOcrService } from '@/features/documents/services/ocr.service';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createDocumentRepository(supabase);
    const service = createOcrService(repo);
    const data = await service.processOcrJob(id, body);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    return NextResponse.json({ error: err.message }, { status: (error as { statusCode?: number }).statusCode || 500 });
  }
}