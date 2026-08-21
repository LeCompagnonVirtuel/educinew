'use client';

import { useState, useCallback } from 'react';
import { EntDeploymentRollbackService } from '../services/deployment-rollback.service';
import { createClient } from '@/lib/supabase/client';
import type { DeploymentRollback, DeploymentRollbackCreate } from '@educi/types';

export const useEntDeploymentRollbackActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DeploymentRollbackCreate): Promise<DeploymentRollback | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentRollbackService(supabase);
      return await service.createDeploymentRollback(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DeploymentRollbackCreate>): Promise<DeploymentRollback | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentRollbackService(supabase);
      return await service.updateDeploymentRollback(schoolId, id, data);
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
      const service = new EntDeploymentRollbackService(supabase);
      await service.deleteDeploymentRollback(schoolId, id);
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
