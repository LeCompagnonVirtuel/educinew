'use client';

import { useState, useCallback } from 'react';
import { EduOSPaymentWalletService } from '../services/eduos-payment-wallet.service';
import { createClient } from '@/lib/supabase/client';
import type { PaymentWallet } from '@educi/types';

export const useEduOSPaymentWalletActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<PaymentWallet>): Promise<PaymentWallet | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSPaymentWalletService(supabase);
      return await service.createPaymentWallet(schoolId, data as PaymentWallet);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PaymentWallet>): Promise<PaymentWallet | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSPaymentWalletService(supabase);
      return await service.updatePaymentWallet(schoolId, id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSPaymentWalletService(supabase);
      await service.deletePaymentWallet(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, update, remove };
};
