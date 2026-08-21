'use client';

import { useState, useCallback } from 'react';
import { EntCICDPipelineService } from '../services/cicd-pipeline.service';
import { createClient } from '@/lib/supabase/client';
import type { CICDPipeline, CICDPipelineCreate } from '@educi/types';

export const useEntCICDPipelineActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CICDPipelineCreate): Promise<CICDPipeline | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCICDPipelineService(supabase);
      return await service.createCICDPipeline(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CICDPipelineCreate>): Promise<CICDPipeline | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCICDPipelineService(supabase);
      return await service.updateCICDPipeline(schoolId, id, data);
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
      const service = new EntCICDPipelineService(supabase);
      await service.deleteCICDPipeline(schoolId, id);
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
