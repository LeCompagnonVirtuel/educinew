import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createPromptTemplateSchema } from '@/features/ai/validators/schemas';
import { AiPromptTemplateService } from '@/features/ai/services/ai-prompt-template.service';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });

    const query = {
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 20,
      search: searchParams.get('search') || undefined,
      category: searchParams.get('category') || undefined,
      sortBy: (searchParams.get('sortBy') || 'createdAt') as 'name' | 'createdAt' | 'updatedAt' | 'category',
      sortOrder: (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc',
    };

    const service = new AiPromptTemplateService(supabase);
    const data = await service.listTemplates(schoolId, query);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const validated = createPromptTemplateSchema.parse(body);
    const service = new AiPromptTemplateService(supabase);
    const data = await service.createTemplate(validated.schoolId, validated);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: (error as any).errors }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}