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
    const { data: invoice, error: fetchError } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !invoice) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });

    const { data, error } = await supabase
      .from('invoices')
      .update({ status: 'sent', sent_at: new Date().toISOString(), sent_by: user.id })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data, message: 'Invoice sent successfully' });
  } catch (error) {
    logger.error('Error sending invoice', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
