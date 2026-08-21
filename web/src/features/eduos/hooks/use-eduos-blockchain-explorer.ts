'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSBlockchainExplorerService } from '../services/eduos-blockchain-explorer.service';
import { createClient } from '@/lib/supabase/client';
import type { BlockchainExplorer } from '@educi/types';

export const useEduOSBlockchainExplorerList = (schoolId: string) => {
  const [items, setItems] = useState<BlockchainExplorer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBlockchainExplorerService(supabase);
      const data = await service.listBlockchainExplorers(schoolId);
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
