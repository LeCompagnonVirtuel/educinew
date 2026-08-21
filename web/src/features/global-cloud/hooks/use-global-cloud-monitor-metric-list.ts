'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudMonitorMetricService } from '../services/global-cloud-monitor-metric.service';
import { createClient } from '@/lib/supabase/client';
import type { MonitorMetric } from '@educi/types';

export const useGlobalCloudMonitorMetricList = (schoolId: string) => {
  const [items, setItems] = useState<MonitorMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudMonitorMetricService(supabase);
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