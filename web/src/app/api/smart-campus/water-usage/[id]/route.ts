import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ScWaterUsageService } from '@/features/smart-campus/services/sc-water-usage.service';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const id = request.url.split('/').pop()!;
    const service = new ScWaterUsageService(supabase);
    const data = await service.getWaterUsage(id);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const id = request.url.split('/').pop()!;
    const body = await request.json();
    const service = new ScWaterUsageService(supabase);
    const data = await service.updateWaterUsage(id, body);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const id = request.url.split('/').pop()!;
    const service = new ScWaterUsageService(supabase);
    await service.deleteWaterUsage(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}