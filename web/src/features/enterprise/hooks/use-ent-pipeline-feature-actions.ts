'use client';

import { useState, useCallback } from 'react';
import { EntPipelineFeatureService } from '../services/pipeline-feature.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineFeature, PipelineFeatureCreate } from '@educi/types';

export const useEntPipelineFeatureActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PipelineFeatureCreate): Promise<PipelineFeature | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineFeatureService(supabase);
      return await service.createPipelineFeature(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PipelineFeatureCreate>): Promise<PipelineFeature | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineFeatureService(supabase);
      return await service.updatePipelineFeature(schoolId, id, data);
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
      const service = new EntPipelineFeatureService(supabase);
      await service.deletePipelineFeature(schoolId, id);
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
