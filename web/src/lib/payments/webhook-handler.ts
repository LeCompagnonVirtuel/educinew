import { createClient } from '@supabase/supabase-js';
import { createProvider, type ProviderName } from './registry';
import { decryptCredentials } from './crypto';
import type { WebhookVerifyResult } from './types';

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}

export async function processWebhook(
  providerName: string,
  payload: string,
  headers: Record<string, string>,
  schoolId?: string
): Promise<{ success: boolean; message: string; status?: string }> {
  const supabase = getSupabase();

  const parsedBody = JSON.parse(payload);
  const reference = parsedBody.reference || parsedBody.transaction_id || parsedBody.data?.reference || parsedBody.data?.tx_ref || '';

  if (!schoolId && reference) {
    const { data: tx } = await supabase.from('payment_transactions').select('school_id').eq('reference', reference).single();
    schoolId = tx?.school_id;
  }

  if (!schoolId) return { success: false, message: 'School ID not found' };

  const { data: config } = await supabase.from('payment_gateway_configs').select('*').eq('school_id', schoolId).eq('gateway_name', providerName).single();
  if (!config) return { success: false, message: 'Gateway config not found' };

  const credentials = decryptCredentials(config.credentials || {});
  const provider = createProvider(providerName as ProviderName, {
    schoolId, provider: providerName, credentials, sandbox: config.sandbox || false, currency: config.currency || 'XOF', country: config.country || 'CI',
  });

  const result = provider.verifyWebhook(payload, headers);
  if (!result.valid) return { success: false, message: result.error || 'Invalid webhook' };

  const { data: existingTx } = await supabase.from('payment_transactions').select('id, status').eq('reference', result.reference).single();
  if (!existingTx) return { success: false, message: 'Transaction not found' };
  if (existingTx.status === 'COMPLETED') return { success: true, message: 'Already processed', status: 'COMPLETED' };

  // Atomic UPDATE with WHERE status guard to prevent TOCTOU race on duplicate webhooks
  const { data: updatedTx, error: updateError } = await supabase
    .from('payment_transactions')
    .update({
      status: result.status,
      provider_reference: result.providerTransactionId || null,
      gateway_response: parsedBody,
      completed_at: result.status === 'COMPLETED' ? new Date().toISOString() : null,
    })
    .eq('id', existingTx.id)
    .neq('status', 'COMPLETED')
    .select('id')
    .single();

  if (updateError || !updatedTx) {
    return { success: true, message: 'Already processed (concurrent)', status: 'COMPLETED' };
  }

  await supabase.from('transaction_logs').insert({
    school_id: schoolId,
    transaction_id: existingTx.id,
    action: 'WEBHOOK_RECEIVED',
    status: result.status,
    amount: result.amount,
    reference: result.reference,
    gateway_response: parsedBody,
  });

  if (result.status === 'COMPLETED') {
    // Use the transaction's stored amount, not the webhook-provided amount
    const { data: completedTx } = await supabase.from('payment_transactions').select('amount').eq('id', updatedTx.id).single();
    await confirmPayment(supabase, schoolId, updatedTx.id, result.reference, completedTx?.amount || 0);
  }

  return { success: true, message: `Webhook processed: ${result.status}`, status: result.status };
}

async function confirmPayment(supabase: any, schoolId: string, transactionId: string, reference: string, amount: number) {
  const { data: tx } = await supabase.from('payment_transactions').select('invoice_id, student_id, amount').eq('id', transactionId).single();
  if (!tx?.invoice_id) return;

  const { data: invoice } = await supabase.from('invoices').select('id, amount, student_id, school_id').eq('id', tx.invoice_id).single();
  if (!invoice) return;

  const { data: completedPayments } = await supabase.from('payment_transactions').select('amount').eq('invoice_id', invoice.id).eq('status', 'COMPLETED');
  const totalPaid = (completedPayments || []).reduce((sum: number, p: any) => sum + (p.amount || 0), 0);

  const newStatus = totalPaid >= invoice.amount ? 'PAID' : totalPaid > 0 ? 'PARTIAL' : 'PENDING';
  await supabase.from('invoices').update({ status: newStatus, paid_amount: totalPaid }).eq('id', invoice.id);

  await supabase.from('payments').insert({
    school_id: schoolId,
    student_id: invoice.student_id || tx.student_id,
    amount: tx.amount,
    payment_method: 'ONLINE',
    status: 'COMPLETED',
    reference,
    invoice_id: invoice.id,
  });

  await supabase.from('notifications').insert({
    school_id: schoolId,
    user_id: invoice.student_id,
    title: 'Paiement confirmé',
    message: `Votre paiement de ${tx.amount} a été confirmé. Référence: ${reference}`,
    type: 'payment',
    read: false,
  });
}
