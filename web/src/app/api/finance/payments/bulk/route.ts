import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
                const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const supabase = createRouteHandlerClient({ cookies: () => Promise.resolve(req.cookies) });
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { payments } = body;

    const results = [];
    for (const payment of payments) {
      const paymentNumber = `PAY-BULK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const { data, error } = await supabase
        .from('payments')
        .insert({
          payment_number: paymentNumber,
          invoice_id: payment.invoiceId,
          amount: payment.amount,
          payment_method: payment.paymentMethod,
          transaction_id: payment.transactionId,
          status: 'pending',
          created_by: user.id,
        })
        .select()
        .single();

      if (error) {
        results.push({ success: false, error: error.message, payment });
      } else {
        results.push({ success: true, data });
      }
    }

    return NextResponse.json({ data: results, status: 201 });
  } catch (error) {
    logger.error('Error processing bulk payments', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
