'use client';

import { useState, useCallback } from 'react';
import { EntPipelineRollbackService } from '../services/pipeline-rollback.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineRollback, PipelineRollbackCreate } from '@educi/types';

export const useEntPipelineRollbackActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PipelineRollbackCreate): Promise<PipelineRollback | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineRollbackService(supabase);
      return await service.createPipelineRollback(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PipelineRollbackCreate>): Promise<PipelineRollback | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineRollbackService(supabase);
      return await service.updatePipelineRollback(schoolId, id, data);
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
      const service = new EntPipelineRollbackService(supabase);
      await service.deletePipelineRollback(schoolId, id);
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
