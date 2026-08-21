'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudReplicationMetricsService } from '../services/global-cloud-replication-metrics.service';
import { createClient } from '@/lib/supabase/client';
import type { ReplicationMetrics } from '@educi/types';

export const useGlobalCloudReplicationMetricsList = (schoolId: string) => {
  const [items, setItems] = useState<ReplicationMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudReplicationMetricsService(supabase);
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