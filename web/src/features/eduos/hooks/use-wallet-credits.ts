'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSWalletCreditsService } from '../services/eduos-wallet-credits.service';
import { createClient } from '@/lib/supabase/client';
import type { WalletCredits } from '@educi/types';

export const useEduOSWalletCreditsList = (schoolId: string) => {
  const [items, setItems] = useState<WalletCredits[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWalletCreditsService(supabase);
      const data = await service.listWalletCreditss(schoolId);
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
