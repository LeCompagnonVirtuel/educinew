'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudStorageMetricsService } from '../services/global-cloud-storage-metrics.service';
import { createClient } from '@/lib/supabase/client';
import type { StorageMetrics } from '@educi/types';

export const useGlobalCloudStorageMetricsList = (schoolId: string) => {
  const [items, setItems] = useState<StorageMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudStorageMetricsService(supabase);
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