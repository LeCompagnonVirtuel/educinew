'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudPipelineMetricService } from '../services/global-cloud-pipeline-metric.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineMetric } from '@educi/types';

export const useGlobalCloudPipelineMetricList = (schoolId: string) => {
  const [items, setItems] = useState<PipelineMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudPipelineMetricService(supabase);
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