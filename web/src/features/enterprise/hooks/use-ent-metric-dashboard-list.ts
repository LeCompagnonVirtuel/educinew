'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntMetricDashboardService } from '../services/metric-dashboard.service';
import { createClient } from '@/lib/supabase/client';
import type { MetricDashboard } from '@educi/types';

export const useEntMetricDashboardList = (schoolId: string) => {
  const [items, setItems] = useState<MetricDashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntMetricDashboardService(supabase);
      const data = await service.listMetricDashboards(schoolId);
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
