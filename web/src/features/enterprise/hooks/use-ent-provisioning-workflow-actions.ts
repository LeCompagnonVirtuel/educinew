'use client';

import { useState, useCallback } from 'react';
import { EntProvisioningWorkflowService } from '../services/provisioning-workflow.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningWorkflow, ProvisioningWorkflowCreate } from '@educi/types';

export const useEntProvisioningWorkflowActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProvisioningWorkflowCreate): Promise<ProvisioningWorkflow | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningWorkflowService(supabase);
      return await service.createProvisioningWorkflow(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProvisioningWorkflowCreate>): Promise<ProvisioningWorkflow | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningWorkflowService(supabase);
      return await service.updateProvisioningWorkflow(schoolId, id, data);
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
      const service = new EntProvisioningWorkflowService(supabase);
      await service.deleteProvisioningWorkflow(schoolId, id);
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
