'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudServiceMetricsService } from '../services/global-cloud-service-metrics.service';
import { createClient } from '@/lib/supabase/client';
import type { ServiceMetrics } from '@educi/types';

export const useGlobalCloudServiceMetricsList = (schoolId: string) => {
  const [items, setItems] = useState<ServiceMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudServiceMetricsService(supabase);
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