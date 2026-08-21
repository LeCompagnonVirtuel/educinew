'use client';

import { useState, useCallback } from 'react';
import { EduOSWalletTransactionService } from '../services/eduos-wallet-transaction.service';
import { createClient } from '@/lib/supabase/client';
import type { WalletTransaction } from '@educi/types';

export const useEduOSWalletTransactionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<WalletTransaction>): Promise<WalletTransaction | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWalletTransactionService(supabase);
      return await service.createWalletTransaction(schoolId, data as WalletTransaction);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<WalletTransaction>): Promise<WalletTransaction | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWalletTransactionService(supabase);
      return await service.updateWalletTransaction(schoolId, id, data);
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
      const service = new EduOSWalletTransactionService(supabase);
      await service.deleteWalletTransaction(schoolId, id);
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
