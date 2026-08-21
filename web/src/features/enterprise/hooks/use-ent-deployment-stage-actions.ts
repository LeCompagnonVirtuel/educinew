'use client';

import { useState, useCallback } from 'react';
import { EntDeploymentStageService } from '../services/deployment-stage.service';
import { createClient } from '@/lib/supabase/client';
import type { DeploymentStage, DeploymentStageCreate } from '@educi/types';

export const useEntDeploymentStageActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DeploymentStageCreate): Promise<DeploymentStage | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentStageService(supabase);
      return await service.createDeploymentStage(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DeploymentStageCreate>): Promise<DeploymentStage | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentStageService(supabase);
      return await service.updateDeploymentStage(schoolId, id, data);
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
      const service = new EntDeploymentStageService(supabase);
      await service.deleteDeploymentStage(schoolId, id);
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
