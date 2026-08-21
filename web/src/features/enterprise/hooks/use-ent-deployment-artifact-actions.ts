'use client';

import { useState, useCallback } from 'react';
import { EntDeploymentArtifactService } from '../services/deployment-artifact.service';
import { createClient } from '@/lib/supabase/client';
import type { DeploymentArtifact, DeploymentArtifactCreate } from '@educi/types';

export const useEntDeploymentArtifactActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DeploymentArtifactCreate): Promise<DeploymentArtifact | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentArtifactService(supabase);
      return await service.createDeploymentArtifact(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DeploymentArtifactCreate>): Promise<DeploymentArtifact | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentArtifactService(supabase);
      return await service.updateDeploymentArtifact(schoolId, id, data);
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
      const service = new EntDeploymentArtifactService(supabase);
      await service.deleteDeploymentArtifact(schoolId, id);
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
