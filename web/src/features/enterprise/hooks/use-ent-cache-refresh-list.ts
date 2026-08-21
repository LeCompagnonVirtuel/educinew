'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheRefreshService } from '../services/cache-refresh.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheRefresh } from '@educi/types';

export const useEntCacheRefreshList = (schoolId: string) => {
  const [items, setItems] = useState<CacheRefresh[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheRefreshService(supabase);
      const data = await service.listCacheRefreshs(schoolId);
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
