'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSCredentialBlockchainService } from '../services/eduos-credential-blockchain.service';
import { createClient } from '@/lib/supabase/client';
import type { CredentialBlockchain } from '@educi/types';

export const useEduOSCredentialBlockchainList = (schoolId: string) => {
  const [items, setItems] = useState<CredentialBlockchain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCredentialBlockchainService(supabase);
      const data = await service.listCredentialBlockchains(schoolId);
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
