import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { EntProcurementItemService } from '@/features/enterprise/services/ent-procurement-items.service';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const parentId = searchParams.get('parentId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });
    if (!parentId) return NextResponse.json({ error: 'parentId required' }, { status: 400 });
    const service = new EntProcurementItemService(supabase);
    const data = await service.getProcurementItem(schoolId, parentId, params.id);
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
    const service = new EntProcurementItemService(supabase);
    const data = await service.updateProcurementItem(body.schoolId, body.parentId, params.id, body);
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
    const service = new EntProcurementItemService(supabase);
    const data = await service.deleteProcurementItem(schoolId, parentId, params.id);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
