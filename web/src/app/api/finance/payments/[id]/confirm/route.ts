import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@educi/logger';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
                const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { id } = await params;

    const { data: payment, error: fetchError } = await supabase
      .from('payments')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !payment) return NextResponse.json({ error: 'Payment not found' }, { status: 404 });

    const { data, error } = await supabase
      .from('payments')
      .update({
        status: 'confirmed',
        confirmed_at: new Date().toISOString(),
        confirmed_by: user.id,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (payment.invoice_id) {
      await supabase.rpc('update_invoice_payment_status', { p_invoice_id: payment.invoice_id });
    }

    return NextResponse.json({ data, message: 'Payment confirmed successfully' });
  } catch (error) {
    logger.error('Error confirming payment', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
