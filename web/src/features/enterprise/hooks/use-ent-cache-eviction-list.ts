'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheEvictionService } from '../services/cache-eviction.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheEviction } from '@educi/types';

export const useEntCacheEvictionList = (schoolId: string) => {
  const [items, setItems] = useState<CacheEviction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheEvictionService(supabase);
      const data = await service.listCacheEvictions(schoolId);
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
