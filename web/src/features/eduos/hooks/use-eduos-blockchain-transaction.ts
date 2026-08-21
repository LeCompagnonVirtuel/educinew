'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSBlockchainTransactionService } from '../services/eduos-blockchain-transaction.service';
import { createClient } from '@/lib/supabase/client';
import type { BlockchainTransaction } from '@educi/types';

export const useEduOSBlockchainTransactionList = (schoolId: string) => {
  const [items, setItems] = useState<BlockchainTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBlockchainTransactionService(supabase);
      const data = await service.listBlockchainTransactions(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
