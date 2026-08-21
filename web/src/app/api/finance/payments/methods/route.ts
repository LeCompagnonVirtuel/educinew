import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => Promise.resolve(req.cookies) });
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data, error } = await supabase
      .from('payment_methods')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    logger.error('Error fetching payment methods', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => Promise.resolve(req.cookies) });
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { methods } = body;

    const results = [];
    for (const method of methods) {
      const { data, error } = await supabase
        .from('payment_methods')
        .update({ ...method, updated_at: new Date().toISOString() })
        .eq('id', method.id)
        .select()
        .single();

      if (error) {
        results.push({ success: false, error: error.message });
      } else {
        results.push({ success: true, data });
      }
    }

    return NextResponse.json({ data: results });
  } catch (error) {
    logger.error('Error updating payment methods', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
