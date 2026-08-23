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
    const body = await req.json();
    const { verified, notes } = body;

    const { data, error } = await supabase
      .from('payments')
      .update({
        verified,
        verified_at: new Date().toISOString(),
        verified_by: user.id,
        verification_notes: notes,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data, message: verified ? 'Payment verified' : 'Payment verification rejected' });
  } catch (error) {
    logger.error('Error verifying payment', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
