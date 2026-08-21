'use client';

import { useState, useCallback } from 'react';
import { EntMetricQueryService } from '../services/metric-query.service';
import { createClient } from '@/lib/supabase/client';
import type { MetricQuery, MetricQueryCreate } from '@educi/types';

export const useEntMetricQueryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: MetricQueryCreate): Promise<MetricQuery | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntMetricQueryService(supabase);
      return await service.createMetricQuery(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MetricQueryCreate>): Promise<MetricQuery | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntMetricQueryService(supabase);
      return await service.updateMetricQuery(schoolId, id, data);
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
      const service = new EntMetricQueryService(supabase);
      await service.deleteMetricQuery(schoolId, id);
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
