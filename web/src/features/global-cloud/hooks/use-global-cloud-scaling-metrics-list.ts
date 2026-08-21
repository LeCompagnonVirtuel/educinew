'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudScalingMetricsService } from '../services/global-cloud-scaling-metrics.service';
import { createClient } from '@/lib/supabase/client';
import type { ScalingMetrics } from '@educi/types';

export const useGlobalCloudScalingMetricsList = (schoolId: string) => {
  const [items, setItems] = useState<ScalingMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudScalingMetricsService(supabase);
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