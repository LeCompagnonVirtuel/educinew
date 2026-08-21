'use client';

import { useState, useCallback } from 'react';
import { EntDeploymentConfigService } from '../services/deployment-config.service';
import { createClient } from '@/lib/supabase/client';
import type { DeploymentConfig, DeploymentConfigCreate } from '@educi/types';

export const useEntDeploymentConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DeploymentConfigCreate): Promise<DeploymentConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentConfigService(supabase);
      return await service.createDeploymentConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DeploymentConfigCreate>): Promise<DeploymentConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentConfigService(supabase);
      return await service.updateDeploymentConfig(schoolId, id, data);
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
      const service = new EntDeploymentConfigService(supabase);
      await service.deleteDeploymentConfig(schoolId, id);
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
