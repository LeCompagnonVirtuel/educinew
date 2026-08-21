'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudDatabaseMetricsService } from '../services/global-cloud-database-metrics.service';
import { createClient } from '@/lib/supabase/client';
import type { DatabaseMetrics } from '@educi/types';

export const useGlobalCloudDatabaseMetricsList = (schoolId: string) => {
  const [items, setItems] = useState<DatabaseMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudDatabaseMetricsService(supabase);
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