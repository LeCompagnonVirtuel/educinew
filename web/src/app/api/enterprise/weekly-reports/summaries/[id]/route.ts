import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { EntWeeklySummaryService } from '@/features/enterprise/services/ent-weekly-reports-summaries.service';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const parentId = searchParams.get('parentId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });
    if (!parentId) return NextResponse.json({ error: 'parentId required' }, { status: 400 });
    const service = new EntWeeklySummaryService(supabase);
    const data = await service.getWeeklySummary(schoolId, parentId, params.id);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const body = await request.json();
    const service = new EntWeeklySummaryService(supabase);
    const data = await service.updateWeeklySummary(body.schoolId, body.parentId, params.id, body);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const parentId = searchParams.get('parentId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });
    if (!parentId) return NextResponse.json({ error: 'parentId required' }, { status: 400 });
    const service = new EntWeeklySummaryService(supabase);
    const data = await service.deleteWeeklySummary(schoolId, parentId, params.id);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
