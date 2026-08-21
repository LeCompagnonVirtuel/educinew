'use client';

import { useState, useCallback } from 'react';
import { EntPipelineMetricService } from '../services/pipeline-metric.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineMetric, PipelineMetricCreate } from '@educi/types';

export const useEntPipelineMetricActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PipelineMetricCreate): Promise<PipelineMetric | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineMetricService(supabase);
      return await service.createPipelineMetric(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PipelineMetricCreate>): Promise<PipelineMetric | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineMetricService(supabase);
      return await service.updatePipelineMetric(schoolId, id, data);
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
      const service = new EntPipelineMetricService(supabase);
      await service.deletePipelineMetric(schoolId, id);
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
