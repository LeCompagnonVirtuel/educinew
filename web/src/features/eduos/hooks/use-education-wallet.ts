'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSEducationWalletService } from '../services/eduos-education-wallet.service';
import { createClient } from '@/lib/supabase/client';
import type { EducationWallet } from '@educi/types';

export const useEduOSEducationWalletList = (schoolId: string) => {
  const [items, setItems] = useState<EducationWallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSEducationWalletService(supabase);
      const data = await service.listEducationWallets(schoolId);
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
