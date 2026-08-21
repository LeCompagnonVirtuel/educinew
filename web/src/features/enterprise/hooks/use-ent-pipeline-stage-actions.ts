'use client';

import { useState, useCallback } from 'react';
import { EntPipelineStageService } from '../services/pipeline-stage.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineStage, PipelineStageCreate } from '@educi/types';

export const useEntPipelineStageActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PipelineStageCreate): Promise<PipelineStage | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineStageService(supabase);
      return await service.createPipelineStage(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PipelineStageCreate>): Promise<PipelineStage | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineStageService(supabase);
      return await service.updatePipelineStage(schoolId, id, data);
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
      const service = new EntPipelineStageService(supabase);
      await service.deletePipelineStage(schoolId, id);
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
