import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const AMOUNT_TOLERANCE_PERCENT = 1;

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function verifyWebhookSignature(rawBody: string, signatureHeader: string | null, secret: string): boolean {
  if (!signatureHeader) return false;
  try {
    const expectedSig = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
    return crypto.timingSafeEqual(
      Buffer.from(signatureHeader, 'hex'),
      Buffer.from(expectedSig, 'hex')
    );
  } catch {
    return false;
  }
}

function isAmountValid(webhookAmount: number | undefined, expectedAmount: number): boolean {
  if (webhookAmount === undefined || webhookAmount === null) return true;
  const tolerance = expectedAmount * (AMOUNT_TOLERANCE_PERCENT / 100);
  return Math.abs(webhookAmount - expectedAmount) <= tolerance;
}

export async function POST(req: NextRequest) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const supabase = getSupabase();

  try {
    const rawBody = await req.text();
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const reference = (body.reference || body.transaction_id || body.token || body.order_id) as string;
    if (!reference) {
      return NextResponse.json({ error: 'Missing reference' }, { status: 400 });
    }

    const { data: transaction } = await supabase
      .from('payment_transactions')
      .select('id, invoice_id, amount, status, school_id')
      .eq('reference', reference)
      .single();

    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    // --- SECURITY: Verify webhook signature ---
    const webhookSecret = process.env.GATEWAY_ENCRYPTION_KEY;
    const signatureHeader = req.headers.get('x-money-fusion-signature')
      || req.headers.get('x-webhook-signature');

    if (webhookSecret && signatureHeader) {
      if (!verifyWebhookSignature(rawBody, signatureHeader, webhookSecret)) {
        await supabase.from('webhook_logs').insert({
          school_id: transaction.school_id,
          gateway: 'MONEY_FUSION',
          payload: body,
          headers: Object.fromEntries(req.headers.entries()),
          status: 'SIGNATURE_INVALID',
        });
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
      }
    }

    await supabase.from('webhook_logs').insert({
      school_id: transaction.school_id,
      gateway: 'MONEY_FUSION',
      payload: body,
      headers: Object.fromEntries(req.headers.entries()),
      status: 'RECEIVED',
    });

    if (transaction.status === 'COMPLETED') {
      return NextResponse.json({ message: 'Already processed' });
    }

    const status = (body.statut || body.status || '').toString().toUpperCase();
    let txStatus: string;
    if (['SUCCESS', 'COMPLETED', 'ACCEPTED', 'PAID'].includes(status)) {
      txStatus = 'COMPLETED';
    } else if (['FAILED', 'REFUSED', 'CANCELLED', 'ERROR', 'REJECTED', 'ANNULE'].includes(status)) {
      txStatus = 'FAILED';
    } else {
      txStatus = 'PENDING';
    }

    // --- SECURITY: Validate amount matches expected transaction amount ---
    if (txStatus === 'COMPLETED') {
      const webhookAmount = Number(body.totalPrice || body.amount || body.montant);
      if (!isAmountValid(webhookAmount, transaction.amount)) {
        await supabase.from('webhook_logs').insert({
          school_id: transaction.school_id,
          gateway: 'MONEY_FUSION',
          payload: { ...body, _rejection_reason: 'AMOUNT_MISMATCH', expected: transaction.amount, received: webhookAmount },
          headers: Object.fromEntries(req.headers.entries()),
          status: 'AMOUNT_MISMATCH',
        });
        await supabase.from('transaction_logs').insert({
          school_id: transaction.school_id,
          transaction_id: transaction.id,
          action: 'WEBHOOK_AMOUNT_MISMATCH',
          status: 'REJECTED',
          amount: webhookAmount,
          reference,
          gateway_response: body,
        });
        return NextResponse.json({ error: 'Amount mismatch' }, { status: 400 });
      }
    }

    const { data: updatedTx, error: updateError } = await supabase
      .from('payment_transactions')
      .update({
        status: txStatus,
        gateway_response: body,
        provider_reference: (body.token || body.transaction_id || '') as string,
        completed_at: txStatus === 'COMPLETED' ? new Date().toISOString() : null,
      })
      .eq('id', transaction.id)
      .neq('status', 'COMPLETED')
      .select('id')
      .single();

    if (updateError || !updatedTx) {
      return NextResponse.json({ message: 'Already processed (concurrent)' });
    }

    await supabase.from('transaction_logs').insert({
      school_id: transaction.school_id,
      transaction_id: transaction.id,
      action: 'WEBHOOK_RECEIVED',
      status: txStatus,
      amount: transaction.amount,
      reference,
      gateway_response: body,
    });

    if (txStatus === 'COMPLETED' && transaction.invoice_id) {
      const { data: invoice } = await supabase
        .from('invoices')
        .select('id, amount, student_id, school_id')
        .eq('id', transaction.invoice_id)
        .single();

      if (invoice) {
        const { data: payments } = await supabase
          .from('payment_transactions')
          .select('amount')
          .eq('invoice_id', invoice.id)
          .eq('status', 'COMPLETED');

        const totalPaid = (payments || []).reduce((sum: number, p: { amount: number }) => sum + (p.amount || 0), 0);
        await supabase
          .from('invoices')
          .update({ status: totalPaid >= invoice.amount ? 'PAID' : 'PARTIAL', paid_amount: totalPaid })
          .eq('id', invoice.id);

        await supabase.from('payments').insert({
          school_id: invoice.school_id,
          student_id: invoice.student_id,
          amount: transaction.amount,
          payment_method: 'MONEY_FUSION',
          status: 'COMPLETED',
          reference,
          invoice_id: invoice.id,
        });

        await supabase.from('notifications').insert({
          school_id: invoice.school_id,
          user_id: invoice.student_id,
          title: 'Paiement confirmé',
          message: `Votre paiement de ${transaction.amount} FCFA a été confirmé. Référence: ${reference}`,
          type: 'payment',
          read: false,
        });
      }
    }

    return NextResponse.json({ status: txStatus, message: 'Webhook Money Fusion traité' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[money-fusion-webhook] Error:', message);
    return NextResponse.json({ error: 'Erreur webhook' }, { status: 500 });
  }
}
