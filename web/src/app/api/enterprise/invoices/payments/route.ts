import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { EntInvoicePaymentService } from '@/features/enterprise/services/ent-invoices-payments.service';

export async function GET(request: NextRequest) {
  try {
                const supabaseAuth = await createClient();
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const parentId = searchParams.get('parentId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });
    if (!parentId) return NextResponse.json({ error: 'parentId required' }, { status: 400 });
    const { data: userSchool } = await supabaseAuth.from('user_schools').select('school_id').eq('user_id', user.id).eq('school_id', schoolId).single();
    if (!userSchool && user.user_metadata?.role !== 'SUPER_ADMIN' && user.app_metadata?.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Accès interdit' }, { status: 403 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const service = new EntInvoicePaymentService(supabase);
    const data = await service.listInvoicePayments(schoolId, parentId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
                const supabaseAuth = await createClient();
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const body = await request.json();
    const schoolId = body.schoolId;
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });
    const { data: userSchool } = await supabaseAuth.from('user_schools').select('school_id').eq('user_id', user.id).eq('school_id', schoolId).single();
    if (!userSchool && user.user_metadata?.role !== 'SUPER_ADMIN' && user.app_metadata?.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Accès interdit' }, { status: 403 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const service = new EntInvoicePaymentService(supabase);
    const data = await service.createInvoicePayment(body.schoolId, body.parentId, body);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
