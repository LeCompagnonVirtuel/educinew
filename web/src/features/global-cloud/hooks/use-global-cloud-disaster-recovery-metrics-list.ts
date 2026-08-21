'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudDisasterRecoveryMetricsService } from '../services/global-cloud-disaster-recovery-metrics.service';
import { createClient } from '@/lib/supabase/client';
import type { DisasterRecoveryMetrics } from '@educi/types';

export const useGlobalCloudDisasterRecoveryMetricsList = (schoolId: string) => {
  const [items, setItems] = useState<DisasterRecoveryMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudDisasterRecoveryMetricsService(supabase);
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