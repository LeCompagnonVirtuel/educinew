'use client';

import { useState, useCallback } from 'react';
import { EntDeploymentApprovalService } from '../services/deployment-approval.service';
import { createClient } from '@/lib/supabase/client';
import type { DeploymentApproval, DeploymentApprovalCreate } from '@educi/types';

export const useEntDeploymentApprovalActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DeploymentApprovalCreate): Promise<DeploymentApproval | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentApprovalService(supabase);
      return await service.createDeploymentApproval(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DeploymentApprovalCreate>): Promise<DeploymentApproval | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentApprovalService(supabase);
      return await service.updateDeploymentApproval(schoolId, id, data);
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
      const service = new EntDeploymentApprovalService(supabase);
      await service.deleteDeploymentApproval(schoolId, id);
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
