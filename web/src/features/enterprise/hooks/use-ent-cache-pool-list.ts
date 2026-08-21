'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCachePoolService } from '../services/cache-pool.service';
import { createClient } from '@/lib/supabase/client';
import type { CachePool } from '@educi/types';

export const useEntCachePoolList = (schoolId: string) => {
  const [items, setItems] = useState<CachePool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCachePoolService(supabase);
      const data = await service.listCachePools(schoolId);
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
