import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  try {
                const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const supabase = createRouteHandlerClient({ cookies: () => Promise.resolve(req.cookies) });
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const period = searchParams.get('period');
    const category = searchParams.get('category');

    let query = supabase
      .from('revenues')
      .select('*, revenue_categories(name)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (period) query = query.eq('period', period);
    if (category) query = query.eq('category_id', category);

    const { data, error, count } = await query;
    if (error) throw error;

    return NextResponse.json({ data, total: count, page, limit });
  } catch (error) {
    logger.error('Error fetching revenues', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

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
    const { description, amount, categoryId, period, source } = body;

    const revenueNumber = `REV-${Date.now()}`;

    const { data, error } = await supabase
      .from('revenues')
      .insert({
        revenue_number: revenueNumber,
        description,
        amount,
        category_id: categoryId,
        period,
        source,
        recorded_by: user.id,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    logger.error('Error creating revenue', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
