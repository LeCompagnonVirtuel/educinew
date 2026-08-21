'use client';

import { useState, useCallback } from 'react';
import { EntDeploymentSecretService } from '../services/deployment-secret.service';
import { createClient } from '@/lib/supabase/client';
import type { DeploymentSecret, DeploymentSecretCreate } from '@educi/types';

export const useEntDeploymentSecretActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DeploymentSecretCreate): Promise<DeploymentSecret | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentSecretService(supabase);
      return await service.createDeploymentSecret(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DeploymentSecretCreate>): Promise<DeploymentSecret | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentSecretService(supabase);
      return await service.updateDeploymentSecret(schoolId, id, data);
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
      const service = new EntDeploymentSecretService(supabase);
      await service.deleteDeploymentSecret(schoolId, id);
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
