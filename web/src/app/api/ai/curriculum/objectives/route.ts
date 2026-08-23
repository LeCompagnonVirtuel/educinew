import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { learningObjectiveSchema } from '@/features/ai/validators/schemas';
import { AiCurriculumService } from '@/features/ai/services/ai-curriculum.service';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
    // --- Auth check ---
                const authSupabase = await createClient();
    const { data: { user }, error: authError } = await authSupabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const curriculumId = searchParams.get('curriculumId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });
    // --- School access check ---
    const { data: userSchool } = await authSupabase.from('user_schools').select('school_id').eq('user_id', user.id).eq('school_id', schoolId).single();
    if (!userSchool && user.user_metadata?.role !== 'SUPER_ADMIN' && user.app_metadata?.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Accès interdit' }, { status: 403 });
    }

    const service = new AiCurriculumService(supabase);
    const data = await service.getObjectives(schoolId, curriculumId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
    // --- Auth check ---
                const authSupabase = await createClient();
    const { data: { user }, error: authError } = await authSupabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const validated = learningObjectiveSchema.parse(body);
    const service = new AiCurriculumService(supabase);
    const data = await service.createObjective(validated.curriculumId, validated);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: (error as any).errors }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}