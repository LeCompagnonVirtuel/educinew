import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => Promise.resolve(req.cookies) });
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const { reason } = body;

    const { data, error } = await supabase
      .from('payments')
      .update({
        status: 'cancelled',
        cancelled_at: new Date().toISOString(),
        cancelled_by: user.id,
        cancellation_reason: reason,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data, message: 'Payment cancelled successfully' });
  } catch (error) {
    logger.error('Error cancelling payment', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
