'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudProxyMetricsService } from '../services/global-cloud-proxy-metrics.service';
import { createClient } from '@/lib/supabase/client';
import type { ProxyMetrics } from '@educi/types';

export const useGlobalCloudProxyMetricsList = (schoolId: string) => {
  const [items, setItems] = useState<ProxyMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudProxyMetricsService(supabase);
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