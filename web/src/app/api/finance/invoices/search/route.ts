import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('sb-')?.value || cookieStore.get('supabase-auth-token')?.value;
    if (!authCookie) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const supabase = createRouteHandlerClient({ cookies: () => Promise.resolve(req.cookies) });
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');
    const status = searchParams.get('status');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');

    let dbQuery = supabase
      .from('invoices')
      .select('*, students(first_name, last_name, email)')
      .order('created_at', { ascending: false })
      .limit(50);

    if (query) {
      dbQuery = dbQuery.or(`invoice_number.ilike.%${query}%,notes.ilike.%${query}%`);
    }
    if (status) dbQuery = dbQuery.eq('status', status);
    if (dateFrom) dbQuery = dbQuery.gte('created_at', dateFrom);
    if (dateTo) dbQuery = dbQuery.lte('created_at', dateTo);

    const { data, error } = await dbQuery;
    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    logger.error('Error searching invoices', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
