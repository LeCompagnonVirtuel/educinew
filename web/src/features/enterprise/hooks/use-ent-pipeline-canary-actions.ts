'use client';

import { useState, useCallback } from 'react';
import { EntPipelineCanaryService } from '../services/pipeline-canary.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineCanary, PipelineCanaryCreate } from '@educi/types';

export const useEntPipelineCanaryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PipelineCanaryCreate): Promise<PipelineCanary | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineCanaryService(supabase);
      return await service.createPipelineCanary(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PipelineCanaryCreate>): Promise<PipelineCanary | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineCanaryService(supabase);
      return await service.updatePipelineCanary(schoolId, id, data);
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
      const service = new EntPipelineCanaryService(supabase);
      await service.deletePipelineCanary(schoolId, id);
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
