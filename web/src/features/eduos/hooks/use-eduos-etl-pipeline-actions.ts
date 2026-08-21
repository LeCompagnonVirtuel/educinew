'use client';

import { useState, useCallback } from 'react';
import { EduOSETLPipelineService } from '../services/eduos-etl-pipeline.service';
import { createClient } from '@/lib/supabase/client';
import type { ETLPipeline } from '@educi/types';

export const useEduOSETLPipelineActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ETLPipeline): Promise<ETLPipeline | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSETLPipelineService(supabase);
      return await service.createETLPipeline(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ETLPipeline>): Promise<ETLPipeline | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSETLPipelineService(supabase);
      return await service.updateETLPipeline(schoolId, id, data);
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
      const service = new EduOSETLPipelineService(supabase);
      await service.deleteETLPipeline(schoolId, id);
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