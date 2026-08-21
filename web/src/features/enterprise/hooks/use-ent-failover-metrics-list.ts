'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntFailoverMetricsService } from '../services/failover-metrics.service';
import { createClient } from '@/lib/supabase/client';
import type { FailoverMetrics } from '@educi/types';

export const useEntFailoverMetricsList = (schoolId: string) => {
  const [items, setItems] = useState<FailoverMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverMetricsService(supabase);
      const data = await service.listFailoverMetricss(schoolId);
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
