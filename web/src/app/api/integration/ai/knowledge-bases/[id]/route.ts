import { NextRequest, NextResponse } from 'next/server';
import { createIntegrationRepository } from '@/features/integration/repositories/integration.repository';
import { createAiKnowledgeBaseService } from '@/features/integration/services/ai-knowledge-base.service';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId') || '';
    const userId = searchParams.get('userId') || '';
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createIntegrationRepository(supabase);
    const service = createAiKnowledgeBaseService(repo);
    const data = await service.getKnowledgeBase(schoolId, userId, params.id);
    return NextResponse.json({ data });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    return NextResponse.json({ error: err.message }, { status: (error as { statusCode?: number }).statusCode || 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createIntegrationRepository(supabase);
    const service = createAiKnowledgeBaseService(repo);
    const data = await service.updateKnowledgeBase(body.schoolId, body.userId, params.id, body);
    return NextResponse.json({ data });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    return NextResponse.json({ error: err.message }, { status: (error as { statusCode?: number }).statusCode || 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId') || '';
    const userId = searchParams.get('userId') || '';
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createIntegrationRepository(supabase);
    const service = createAiKnowledgeBaseService(repo);
    await service.deleteKnowledgeBase(schoolId, userId, params.id);
    return NextResponse.json({ data: { deleted: true } });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    return NextResponse.json({ error: err.message }, { status: (error as { statusCode?: number }).statusCode || 500 });
  }
}
