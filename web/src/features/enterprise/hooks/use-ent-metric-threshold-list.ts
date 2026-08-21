'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntMetricThresholdService } from '../services/metric-threshold.service';
import { createClient } from '@/lib/supabase/client';
import type { MetricThreshold } from '@educi/types';

export const useEntMetricThresholdList = (schoolId: string) => {
  const [items, setItems] = useState<MetricThreshold[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntMetricThresholdService(supabase);
      const data = await service.listMetricThresholds(schoolId);
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
