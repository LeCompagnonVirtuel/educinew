'use client';

import { useState, useCallback } from 'react';
import { EntProvisioningRollbackService } from '../services/provisioning-rollback.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningRollback, ProvisioningRollbackCreate } from '@educi/types';

export const useEntProvisioningRollbackActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProvisioningRollbackCreate): Promise<ProvisioningRollback | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningRollbackService(supabase);
      return await service.createProvisioningRollback(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProvisioningRollbackCreate>): Promise<ProvisioningRollback | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningRollbackService(supabase);
      return await service.updateProvisioningRollback(schoolId, id, data);
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
      const service = new EntProvisioningRollbackService(supabase);
      await service.deleteProvisioningRollback(schoolId, id);
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
