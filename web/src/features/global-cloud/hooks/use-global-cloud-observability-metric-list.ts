'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudObservabilityMetricService } from '../services/global-cloud-observability-metric.service';
import { createClient } from '@/lib/supabase/client';
import type { ObservabilityMetric } from '@educi/types';

export const useGlobalCloudObservabilityMetricList = (schoolId: string) => {
  const [items, setItems] = useState<ObservabilityMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudObservabilityMetricService(supabase);
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