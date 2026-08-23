import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { rateLimitConfigrateLimitConfigSchema } from '@/features/ai/validators/rateLimitConfigSchemas';
import { AiRateLimitService } from '@/features/ai/services/ai-rate-limit.service';
import { cookies } from 'next/headers';

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
    const validated = rateLimitConfigSchema.parse(body);
    const service = new AiRateLimitService(supabase);
    const data = await service.createOverride(validated);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: (error as any).errors }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}