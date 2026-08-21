'use client';

import { useState, useCallback } from 'react';
import { EntQualityMetricService } from '../services/quality-metric.service';
import { createClient } from '@/lib/supabase/client';
import type { QualityMetric, QualityMetricCreate } from '@educi/types';

export const useEntQualityMetricActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: QualityMetricCreate): Promise<QualityMetric | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntQualityMetricService(supabase);
      return await service.createQualityMetric(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<QualityMetricCreate>): Promise<QualityMetric | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntQualityMetricService(supabase);
      return await service.updateQualityMetric(schoolId, id, data);
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
      const service = new EntQualityMetricService(supabase);
      await service.deleteQualityMetric(schoolId, id);
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
