'use client';

import { useState, useCallback } from 'react';
import { EntPipelineChangelogService } from '../services/pipeline-changelog.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineChangelog, PipelineChangelogCreate } from '@educi/types';

export const useEntPipelineChangelogActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PipelineChangelogCreate): Promise<PipelineChangelog | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineChangelogService(supabase);
      return await service.createPipelineChangelog(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PipelineChangelogCreate>): Promise<PipelineChangelog | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineChangelogService(supabase);
      return await service.updatePipelineChangelog(schoolId, id, data);
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
      const service = new EntPipelineChangelogService(supabase);
      await service.deletePipelineChangelog(schoolId, id);
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
