import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { imageAnalysisimageAnalysisSchema } from '@/features/ai/validators/imageAnalysisSchemas';
import { AiVisionProcessingService } from '@/features/ai/services/ai-vision-processing.service';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    const validated = imageAnalysisSchema.parse(body);
    const service = new AiVisionProcessingService(supabase);
    const data = await service.analyzeImage(validated);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: (error as any).errors }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}