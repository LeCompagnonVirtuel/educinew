'use client';

import { useState, useCallback } from 'react';
import { EntPipelineRunService } from '../services/pipeline-run.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineRun, PipelineRunCreate } from '@educi/types';

export const useEntPipelineRunActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PipelineRunCreate): Promise<PipelineRun | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineRunService(supabase);
      return await service.createPipelineRun(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PipelineRunCreate>): Promise<PipelineRun | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineRunService(supabase);
      return await service.updatePipelineRun(schoolId, id, data);
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
      const service = new EntPipelineRunService(supabase);
      await service.deletePipelineRun(schoolId, id);
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
