'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntQualityMetricService } from '../services/quality-metric.service';
import { createClient } from '@/lib/supabase/client';
import type { QualityMetric } from '@educi/types';

export const useEntQualityMetricList = (schoolId: string) => {
  const [items, setItems] = useState<QualityMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntQualityMetricService(supabase);
      const data = await service.listQualityMetrics(schoolId);
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
