'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheMetricsService } from '../services/cache-metrics.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheMetrics } from '@educi/types';

export const useEntCacheMetricsList = (schoolId: string) => {
  const [items, setItems] = useState<CacheMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheMetricsService(supabase);
      const data = await service.listCacheMetricss(schoolId);
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
