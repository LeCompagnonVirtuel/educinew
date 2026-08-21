'use client';

import { useState, useCallback } from 'react';
import { EntPipelineArtifactService } from '../services/pipeline-artifact.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineArtifact, PipelineArtifactCreate } from '@educi/types';

export const useEntPipelineArtifactActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PipelineArtifactCreate): Promise<PipelineArtifact | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineArtifactService(supabase);
      return await service.createPipelineArtifact(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PipelineArtifactCreate>): Promise<PipelineArtifact | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineArtifactService(supabase);
      return await service.updatePipelineArtifact(schoolId, id, data);
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
      const service = new EntPipelineArtifactService(supabase);
      await service.deletePipelineArtifact(schoolId, id);
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
