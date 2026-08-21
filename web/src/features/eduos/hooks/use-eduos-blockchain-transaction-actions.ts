'use client';

import { useState, useCallback } from 'react';
import { EduOSBlockchainTransactionService } from '../services/eduos-blockchain-transaction.service';
import { createClient } from '@/lib/supabase/client';
import type { BlockchainTransaction } from '@educi/types';

export const useEduOSBlockchainTransactionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<BlockchainTransaction>): Promise<BlockchainTransaction | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBlockchainTransactionService(supabase);
      return await service.createBlockchainTransaction(schoolId, data as BlockchainTransaction);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<BlockchainTransaction>): Promise<BlockchainTransaction | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBlockchainTransactionService(supabase);
      return await service.updateBlockchainTransaction(schoolId, id, data);
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
      const service = new EduOSBlockchainTransactionService(supabase);
      await service.deleteBlockchainTransaction(schoolId, id);
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
