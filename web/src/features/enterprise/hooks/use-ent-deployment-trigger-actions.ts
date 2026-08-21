'use client';

import { useState, useCallback } from 'react';
import { EntDeploymentTriggerService } from '../services/deployment-trigger.service';
import { createClient } from '@/lib/supabase/client';
import type { DeploymentTrigger, DeploymentTriggerCreate } from '@educi/types';

export const useEntDeploymentTriggerActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DeploymentTriggerCreate): Promise<DeploymentTrigger | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentTriggerService(supabase);
      return await service.createDeploymentTrigger(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DeploymentTriggerCreate>): Promise<DeploymentTrigger | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentTriggerService(supabase);
      return await service.updateDeploymentTrigger(schoolId, id, data);
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
      const service = new EntDeploymentTriggerService(supabase);
      await service.deleteDeploymentTrigger(schoolId, id);
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
