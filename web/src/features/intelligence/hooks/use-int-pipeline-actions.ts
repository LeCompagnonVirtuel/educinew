'use client';

import { useState, useCallback } from 'react';
import { IntPipelineService } from '../services/int-pipeline.service';
import { createClient } from '@/lib/supabase/client';
import type { IntelligencePipeline, IntelligencePipelineCreate } from '@educi/types';

export const useIntPipelineActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IntelligencePipelineCreate): Promise<IntelligencePipeline | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntPipelineService(supabase);
      return await service.createPipeline(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IntelligencePipelineCreate>): Promise<IntelligencePipeline | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntPipelineService(supabase);
      return await service.updatePipeline(schoolId, id, data);
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
      const service = new IntPipelineService(supabase);
      await service.deletePipeline(schoolId, id);
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
