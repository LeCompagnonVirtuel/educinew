import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => Promise.resolve(req.cookies) });
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const { data, error, count } = await supabase
      .from('receipts')
      .select('*, payments(payment_number, amount), students(first_name, last_name)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (error) throw error;

    return NextResponse.json({ data, total: count, page, limit });
  } catch (error) {
    logger.error('Error fetching receipts', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => Promise.resolve(req.cookies) });
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { paymentId, notes } = body;

    const receiptNumber = `RCT-${Date.now()}`;

    const { data, error } = await supabase
      .from('receipts')
      .insert({
        receipt_number: receiptNumber,
        payment_id: paymentId,
        notes,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    logger.error('Error creating receipt', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
