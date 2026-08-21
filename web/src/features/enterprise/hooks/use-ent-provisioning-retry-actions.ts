'use client';

import { useState, useCallback } from 'react';
import { EntProvisioningRetryService } from '../services/provisioning-retry.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningRetry, ProvisioningRetryCreate } from '@educi/types';

export const useEntProvisioningRetryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProvisioningRetryCreate): Promise<ProvisioningRetry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningRetryService(supabase);
      return await service.createProvisioningRetry(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProvisioningRetryCreate>): Promise<ProvisioningRetry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningRetryService(supabase);
      return await service.updateProvisioningRetry(schoolId, id, data);
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
      const service = new EntProvisioningRetryService(supabase);
      await service.deleteProvisioningRetry(schoolId, id);
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
