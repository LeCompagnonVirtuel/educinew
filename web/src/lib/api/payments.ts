import { getSupabase } from './supabase-client';

export const paymentsApi = {
  async initiatePayment(invoiceId: string, paymentMethod: string) {
    const supabase = getSupabase();
    const { data, error } = await supabase.functions.invoke('payment-initiate', {
      body: { invoiceId, paymentMethod },
    });
    if (error) throw error;
    return data;
  },
};