'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheNetworkService } from '../services/cache-network.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheNetwork } from '@educi/types';

export const useEntCacheNetworkList = (schoolId: string) => {
  const [items, setItems] = useState<CacheNetwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheNetworkService(supabase);
      const data = await service.listCacheNetworks(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
