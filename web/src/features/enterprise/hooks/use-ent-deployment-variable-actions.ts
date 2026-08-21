'use client';

import { useState, useCallback } from 'react';
import { EntDeploymentVariableService } from '../services/deployment-variable.service';
import { createClient } from '@/lib/supabase/client';
import type { DeploymentVariable, DeploymentVariableCreate } from '@educi/types';

export const useEntDeploymentVariableActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DeploymentVariableCreate): Promise<DeploymentVariable | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentVariableService(supabase);
      return await service.createDeploymentVariable(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DeploymentVariableCreate>): Promise<DeploymentVariable | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentVariableService(supabase);
      return await service.updateDeploymentVariable(schoolId, id, data);
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
      const service = new EntDeploymentVariableService(supabase);
      await service.deleteDeploymentVariable(schoolId, id);
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
