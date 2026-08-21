'use client';

import { useState, useCallback } from 'react';
import { EntPipelineVariableService } from '../services/pipeline-variable.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineVariable, PipelineVariableCreate } from '@educi/types';

export const useEntPipelineVariableActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PipelineVariableCreate): Promise<PipelineVariable | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineVariableService(supabase);
      return await service.createPipelineVariable(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PipelineVariableCreate>): Promise<PipelineVariable | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineVariableService(supabase);
      return await service.updatePipelineVariable(schoolId, id, data);
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
      const service = new EntPipelineVariableService(supabase);
      await service.deletePipelineVariable(schoolId, id);
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
