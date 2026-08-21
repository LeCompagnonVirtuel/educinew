'use client';

import { useState, useCallback } from 'react';
import { EntSearchPipelineService } from '../services/search-pipeline.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchPipeline, SearchPipelineCreate } from '@educi/types';

export const useEntSearchPipelineActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchPipelineCreate): Promise<SearchPipeline | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchPipelineService(supabase);
      return await service.createSearchPipeline(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchPipelineCreate>): Promise<SearchPipeline | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchPipelineService(supabase);
      return await service.updateSearchPipeline(schoolId, id, data);
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
      const service = new EntSearchPipelineService(supabase);
      await service.deleteSearchPipeline(schoolId, id);
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
