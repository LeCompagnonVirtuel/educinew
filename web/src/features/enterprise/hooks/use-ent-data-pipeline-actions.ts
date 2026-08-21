'use client';

import { useState, useCallback } from 'react';
import { EntDataPipelineService } from '../services/data-pipeline.service';
import { createClient } from '@/lib/supabase/client';
import type { DataPipeline, DataPipelineCreate } from '@educi/types';

export const useEntDataPipelineActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataPipelineCreate): Promise<DataPipeline | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataPipelineService(supabase);
      return await service.createDataPipeline(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataPipelineCreate>): Promise<DataPipeline | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataPipelineService(supabase);
      return await service.updateDataPipeline(schoolId, id, data);
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
      const service = new EntDataPipelineService(supabase);
      await service.deleteDataPipeline(schoolId, id);
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
