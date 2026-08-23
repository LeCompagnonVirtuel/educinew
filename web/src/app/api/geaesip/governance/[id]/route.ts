import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { GeaesipGovernanceService } from '@/features/geaesip/services/governance.service';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
            if (!authCookie) {
      return NextResponse.json({ error: 'Non autoris�' }, { status: 401 });
    }
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autoris�' }, { status: 401 });
    }
    const { id } = await params;
    const service = new GeaesipGovernanceService(supabase);
    const data = await service.getGovernanceById(id);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
            if (!authCookie) {
      return NextResponse.json({ error: 'Non autoris�' }, { status: 401 });
    }
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autoris�' }, { status: 401 });
    }
    const { id } = await params;
    const body = await request.json();
    const service = new GeaesipGovernanceService(supabase);
    const data = await service.updateGovernance(id, body);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
            if (!authCookie) {
      return NextResponse.json({ error: 'Non autoris�' }, { status: 401 });
    }
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autoris�' }, { status: 401 });
    }
    const { id } = await params;
    const service = new GeaesipGovernanceService(supabase);
    const data = await service.deleteGovernance(id);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
