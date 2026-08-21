'use client';

import { useState, useCallback } from 'react';
import { EntMetricThresholdService } from '../services/metric-threshold.service';
import { createClient } from '@/lib/supabase/client';
import type { MetricThreshold, MetricThresholdCreate } from '@educi/types';

export const useEntMetricThresholdActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: MetricThresholdCreate): Promise<MetricThreshold | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntMetricThresholdService(supabase);
      return await service.createMetricThreshold(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MetricThresholdCreate>): Promise<MetricThreshold | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntMetricThresholdService(supabase);
      return await service.updateMetricThreshold(schoolId, id, data);
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
      const service = new EntMetricThresholdService(supabase);
      await service.deleteMetricThreshold(schoolId, id);
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
