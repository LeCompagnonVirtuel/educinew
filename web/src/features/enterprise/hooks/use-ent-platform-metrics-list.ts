'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPlatformMetricsService } from '../services/platform-metrics.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformMetrics } from '@educi/types';

export const useEntPlatformMetricsList = (schoolId: string) => {
  const [items, setItems] = useState<PlatformMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformMetricsService(supabase);
      const data = await service.listPlatformMetricss(schoolId);
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
