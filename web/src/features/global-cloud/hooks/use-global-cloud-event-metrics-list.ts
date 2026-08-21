'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudEventMetricsService } from '../services/global-cloud-event-metrics.service';
import { createClient } from '@/lib/supabase/client';
import type { EventMetrics } from '@educi/types';

export const useGlobalCloudEventMetricsList = (schoolId: string) => {
  const [items, setItems] = useState<EventMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudEventMetricsService(supabase);
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