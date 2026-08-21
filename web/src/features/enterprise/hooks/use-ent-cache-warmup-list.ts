'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheWarmupService } from '../services/cache-warmup.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheWarmup } from '@educi/types';

export const useEntCacheWarmupList = (schoolId: string) => {
  const [items, setItems] = useState<CacheWarmup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheWarmupService(supabase);
      const data = await service.listCacheWarmups(schoolId);
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
