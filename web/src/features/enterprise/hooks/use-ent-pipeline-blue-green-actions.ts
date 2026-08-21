'use client';

import { useState, useCallback } from 'react';
import { EntPipelineBlueGreenService } from '../services/pipeline-blue-green.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineBlueGreen, PipelineBlueGreenCreate } from '@educi/types';

export const useEntPipelineBlueGreenActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PipelineBlueGreenCreate): Promise<PipelineBlueGreen | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineBlueGreenService(supabase);
      return await service.createPipelineBlueGreen(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PipelineBlueGreenCreate>): Promise<PipelineBlueGreen | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineBlueGreenService(supabase);
      return await service.updatePipelineBlueGreen(schoolId, id, data);
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
      const service = new EntPipelineBlueGreenService(supabase);
      await service.deletePipelineBlueGreen(schoolId, id);
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
