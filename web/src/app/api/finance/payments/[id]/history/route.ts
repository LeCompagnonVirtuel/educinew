import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => Promise.resolve(req.cookies) });
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const { data, error } = await supabase
      .from('payment_history')
      .select('*')
      .eq('payment_id', id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    logger.error('Error fetching payment history', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
