'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudWorkflowMetricsService } from '../services/global-cloud-workflow-metrics.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowMetrics } from '@educi/types';

export const useGlobalCloudWorkflowMetricsList = (schoolId: string) => {
  const [items, setItems] = useState<WorkflowMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudWorkflowMetricsService(supabase);
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