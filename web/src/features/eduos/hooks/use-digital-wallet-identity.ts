'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSDigitalWalletIdentityService } from '../services/eduos-digital-wallet-identity.service';
import { createClient } from '@/lib/supabase/client';
import type { DigitalWalletIdentity } from '@educi/types';

export const useEduOSDigitalWalletIdentityList = (schoolId: string) => {
  const [items, setItems] = useState<DigitalWalletIdentity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDigitalWalletIdentityService(supabase);
      const data = await service.listDigitalWalletIdentitys(schoolId);
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
