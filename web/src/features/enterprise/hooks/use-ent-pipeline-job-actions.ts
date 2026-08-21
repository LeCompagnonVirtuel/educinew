'use client';

import { useState, useCallback } from 'react';
import { EntPipelineJobService } from '../services/pipeline-job.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineJob, PipelineJobCreate } from '@educi/types';

export const useEntPipelineJobActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PipelineJobCreate): Promise<PipelineJob | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineJobService(supabase);
      return await service.createPipelineJob(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PipelineJobCreate>): Promise<PipelineJob | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineJobService(supabase);
      return await service.updatePipelineJob(schoolId, id, data);
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
      const service = new EntPipelineJobService(supabase);
      await service.deletePipelineJob(schoolId, id);
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
