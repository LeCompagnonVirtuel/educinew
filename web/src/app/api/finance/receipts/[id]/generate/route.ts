import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => Promise.resolve(req.cookies) });
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const { data: receipt, error: fetchError } = await supabase
      .from('receipts')
      .select('*, payments(*, invoices(*, invoice_items(*))), students(*)')
      .eq('id', id)
      .single();

    if (fetchError || !receipt) return NextResponse.json({ error: 'Receipt not found' }, { status: 404 });

    const { data, error } = await supabase
      .from('receipts')
      .update({
        generated_at: new Date().toISOString(),
        generated_by: user.id,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data, receiptData: receipt, message: 'Receipt generated successfully' });
  } catch (error) {
    logger.error('Error generating receipt', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
