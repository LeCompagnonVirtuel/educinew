'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSWalletLedgerService } from '../services/eduos-wallet-ledger.service';
import { createClient } from '@/lib/supabase/client';
import type { WalletLedger } from '@educi/types';

export const useEduOSWalletLedgerList = (schoolId: string) => {
  const [items, setItems] = useState<WalletLedger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWalletLedgerService(supabase);
      const data = await service.listWalletLedgers(schoolId);
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
