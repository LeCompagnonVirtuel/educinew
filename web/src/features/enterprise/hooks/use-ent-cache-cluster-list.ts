'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheClusterService } from '../services/cache-cluster.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheCluster } from '@educi/types';

export const useEntCacheClusterList = (schoolId: string) => {
  const [items, setItems] = useState<CacheCluster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheClusterService(supabase);
      const data = await service.listCacheClusters(schoolId);
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
