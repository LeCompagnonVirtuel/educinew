'use client';

import { useState, useCallback } from 'react';
import { EntMetricConfigService } from '../services/metric-config.service';
import { createClient } from '@/lib/supabase/client';
import type { MetricConfig, MetricConfigCreate } from '@educi/types';

export const useEntMetricConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: MetricConfigCreate): Promise<MetricConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntMetricConfigService(supabase);
      return await service.createMetricConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MetricConfigCreate>): Promise<MetricConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntMetricConfigService(supabase);
      return await service.updateMetricConfig(schoolId, id, data);
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
      const service = new EntMetricConfigService(supabase);
      await service.deleteMetricConfig(schoolId, id);
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
