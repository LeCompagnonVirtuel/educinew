'use client';

import { useState, useCallback } from 'react';
import { EntProvisioningTaskService } from '../services/provisioning-task.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningTask, ProvisioningTaskCreate } from '@educi/types';

export const useEntProvisioningTaskActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProvisioningTaskCreate): Promise<ProvisioningTask | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningTaskService(supabase);
      return await service.createProvisioningTask(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProvisioningTaskCreate>): Promise<ProvisioningTask | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningTaskService(supabase);
      return await service.updateProvisioningTask(schoolId, id, data);
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
      const service = new EntProvisioningTaskService(supabase);
      await service.deleteProvisioningTask(schoolId, id);
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
