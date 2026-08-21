'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSCredentialWalletService } from '../services/eduos-credential-wallet.service';
import { createClient } from '@/lib/supabase/client';
import type { CredentialWallet } from '@educi/types';

export const useEduOSCredentialWalletList = (schoolId: string) => {
  const [items, setItems] = useState<CredentialWallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCredentialWalletService(supabase);
      const data = await service.listCredentialWallets(schoolId);
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
