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
      .from('expenses')
      .select('*, expense_categories(name), users(full_name)')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return NextResponse.json({ error: 'Expense not found' }, { status: 404 });

    return NextResponse.json({ data });
  } catch (error) {
    logger.error('Error fetching expense', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => Promise.resolve(req.cookies) });
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await req.json();

    const { data, error } = await supabase
      .from('expenses')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    logger.error('Error updating expense', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => Promise.resolve(req.cookies) });
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const { error } = await supabase.from('expenses').delete().eq('id', id);
    if (error) throw error;

    return NextResponse.json({ data: { message: 'Expense deleted' } });
  } catch (error) {
    logger.error('Error deleting expense', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
