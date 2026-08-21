'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCacheMetricsService } from '../services/global-cloud-cache-metrics.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheMetrics } from '@educi/types';

export const useGlobalCloudCacheMetricsList = (schoolId: string) => {
  const [items, setItems] = useState<CacheMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCacheMetricsService(supabase);
      const data = await service.list(schoolId);
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