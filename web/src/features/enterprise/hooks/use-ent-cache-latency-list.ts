'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheLatencyService } from '../services/cache-latency.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheLatency } from '@educi/types';

export const useEntCacheLatencyList = (schoolId: string) => {
  const [items, setItems] = useState<CacheLatency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheLatencyService(supabase);
      const data = await service.listCacheLatencys(schoolId);
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
