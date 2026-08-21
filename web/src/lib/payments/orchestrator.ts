import { createClient } from '@supabase/supabase-js';
import { createProvider, type ProviderName } from './registry';
import { decryptCredentials } from './crypto';
import type { PaymentInitParams, PaymentInitResult, ConnectionTestResult } from './types';

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}

export async function getActiveProvider(schoolId: string, providerName?: string) {
  const supabase = getSupabase();
  const { data: configs } = await supabase
    .from('payment_gateway_configs')
    .select('*')
    .eq('school_id', schoolId)
    .eq('is_active', true);

  if (!configs || configs.length === 0) throw new Error('Aucun fournisseur de paiement configuré');

  const config = providerName ? configs.find(c => c.gateway_name === providerName) : configs[0];
  if (!config) throw new Error(`Fournisseur ${providerName} non configuré`);

  const credentials = decryptCredentials(config.credentials || {});

  return createProvider(config.gateway_name as ProviderName, {
    schoolId,
    provider: config.gateway_name,
    credentials,
    sandbox: config.sandbox || false,
    currency: config.currency || 'XOF',
    country: config.country || 'CI',
  });
}

export async function initiatePaymentForSchool(schoolId: string, params: Omit<PaymentInitParams, 'webhookUrl'>, providerName?: string): Promise<PaymentInitResult> {
  const provider = await getActiveProvider(schoolId, providerName);
  const supabase = getSupabase();

  const { data: school } = await supabase.from('schools').select('code').eq('id', schoolId).single();
  const webhookUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/payment-webhook`;

  const result = await provider.initiatePayment({ ...params, webhookUrl });

  const reference = result.reference || params.reference;

  await supabase.from('payment_transactions').insert({
    school_id: schoolId,
    invoice_id: params.metadata?.invoice_id || null,
    amount: params.amount,
    currency: provider.config.currency,
    payment_method: provider.name,
    status: result.success ? 'PENDING' : 'FAILED',
    reference,
    provider_reference: result.transactionId,
    payment_url: result.paymentUrl || null,
    gateway_response: result.rawResponse || null,
    student_id: params.metadata?.student_id || null,
  });

  return { ...result, reference, currency: result.success ? (await getActiveProvider(schoolId, providerName)).config.currency : undefined };
}

export async function testProviderConnection(schoolId: string, providerName: string): Promise<ConnectionTestResult> {
  const supabase = getSupabase();
  const { data: config } = await supabase
    .from('payment_gateway_configs')
    .select('*')
    .eq('school_id', schoolId)
    .eq('gateway_name', providerName)
    .single();

  if (!config) return { success: false, provider: providerName, message: 'Configuration non trouvée', error: 'NOT_FOUND' };

  const credentials = decryptCredentials(config.credentials || {});
  const provider = createProvider(providerName as ProviderName, {
    schoolId, provider: providerName, credentials, sandbox: config.sandbox || false, currency: config.currency || 'XOF', country: config.country || 'CI',
  });

  const result = await provider.testConnection();

  await supabase.from('payment_gateway_configs')
    .update({ last_test_at: new Date().toISOString(), last_test_result: result.success ? 'SUCCESS' : 'FAILED', last_test_error: result.error || null })
    .eq('id', config.id);

  return result;
}
