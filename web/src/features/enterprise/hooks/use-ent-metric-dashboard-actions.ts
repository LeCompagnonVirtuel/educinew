'use client';

import { useState, useCallback } from 'react';
import { EntMetricDashboardService } from '../services/metric-dashboard.service';
import { createClient } from '@/lib/supabase/client';
import type { MetricDashboard, MetricDashboardCreate } from '@educi/types';

export const useEntMetricDashboardActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: MetricDashboardCreate): Promise<MetricDashboard | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntMetricDashboardService(supabase);
      return await service.createMetricDashboard(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MetricDashboardCreate>): Promise<MetricDashboard | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntMetricDashboardService(supabase);
      return await service.updateMetricDashboard(schoolId, id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntMetricDashboardService(supabase);
      await service.deleteMetricDashboard(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, update, remove };
};
