'use client';

import { useState, useCallback } from 'react';
import { EntPipelineStepService } from '../services/pipeline-step.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineStep, PipelineStepCreate } from '@educi/types';

export const useEntPipelineStepActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PipelineStepCreate): Promise<PipelineStep | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineStepService(supabase);
      return await service.createPipelineStep(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PipelineStepCreate>): Promise<PipelineStep | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineStepService(supabase);
      return await service.updatePipelineStep(schoolId, id, data);
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
      const service = new EntPipelineStepService(supabase);
      await service.deletePipelineStep(schoolId, id);
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
