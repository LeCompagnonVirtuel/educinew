'use client';

import { useState, useCallback } from 'react';
import { EntDeploymentPipelineService } from '../services/deployment-pipeline.service';
import { createClient } from '@/lib/supabase/client';
import type { DeploymentPipeline, DeploymentPipelineCreate } from '@educi/types';

export const useEntDeploymentPipelineActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DeploymentPipelineCreate): Promise<DeploymentPipeline | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentPipelineService(supabase);
      return await service.createDeploymentPipeline(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DeploymentPipelineCreate>): Promise<DeploymentPipeline | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentPipelineService(supabase);
      return await service.updateDeploymentPipeline(schoolId, id, data);
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
      const service = new EntDeploymentPipelineService(supabase);
      await service.deleteDeploymentPipeline(schoolId, id);
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
