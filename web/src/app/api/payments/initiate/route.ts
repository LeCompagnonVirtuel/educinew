import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { initiatePaymentForSchool } from '@/lib/payments/orchestrator';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    if (!profile?.school_id) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const body = await request.json();
    const { invoiceId, amount, studentId, description } = body;

    if (!invoiceId || !amount) return NextResponse.json({ error: 'invoiceId et amount requis' }, { status: 400 });
    if (typeof amount !== 'number' || amount <= 0 || !isFinite(amount)) {
      return NextResponse.json({ error: 'amount doit être un nombre positif' }, { status: 400 });
    }

    const reference = `EDUCI-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://educi.live';

    const result = await initiatePaymentForSchool(profile.school_id, {
      amount,
      currency: 'XOF',
      reference,
      description: description || `Paiement EduCI - ${reference}`,
      customerEmail: user.email || '',
      customerName: user.user_metadata?.name || '',
      customerPhone: user.user_metadata?.phone || '',
      returnUrl: `${siteUrl}/payment-receipt?ref=${reference}`,
      cancelUrl: `${siteUrl}/parent/payments?cancelled=true`,
      metadata: { invoice_id: invoiceId, student_id: studentId || '', school_id: profile.school_id },
    });

    return NextResponse.json({
      success: result.success,
      reference: result.reference,
      paymentUrl: result.paymentUrl,
      transactionId: result.transactionId,
      provider: 'MONEY_FUSION',
      error: result.error,
    });
  } catch (error: any) {
    console.error('[payments/initiate] Error:', error);
    return NextResponse.json({ error: error.message || 'Erreur serveur' }, { status: 500 });
  }
}
