'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheWarmingService } from '../services/cache-warming.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheWarming } from '@educi/types';

export const useEntCacheWarmingList = (schoolId: string) => {
  const [items, setItems] = useState<CacheWarming[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheWarmingService(supabase);
      const data = await service.listCacheWarmings(schoolId);
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
