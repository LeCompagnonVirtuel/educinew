'use client';

import { useState, useCallback } from 'react';
import { EntFailoverMetricsService } from '../services/failover-metrics.service';
import { createClient } from '@/lib/supabase/client';
import type { FailoverMetrics, FailoverMetricsCreate } from '@educi/types';

export const useEntFailoverMetricsActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: FailoverMetricsCreate): Promise<FailoverMetrics | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverMetricsService(supabase);
      return await service.createFailoverMetrics(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<FailoverMetricsCreate>): Promise<FailoverMetrics | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverMetricsService(supabase);
      return await service.updateFailoverMetrics(schoolId, id, data);
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
      const service = new EntFailoverMetricsService(supabase);
      await service.deleteFailoverMetrics(schoolId, id);
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
