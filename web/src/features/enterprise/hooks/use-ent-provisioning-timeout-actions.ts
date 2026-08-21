'use client';

import { useState, useCallback } from 'react';
import { EntProvisioningTimeoutService } from '../services/provisioning-timeout.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningTimeout, ProvisioningTimeoutCreate } from '@educi/types';

export const useEntProvisioningTimeoutActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProvisioningTimeoutCreate): Promise<ProvisioningTimeout | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningTimeoutService(supabase);
      return await service.createProvisioningTimeout(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProvisioningTimeoutCreate>): Promise<ProvisioningTimeout | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningTimeoutService(supabase);
      return await service.updateProvisioningTimeout(schoolId, id, data);
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
      const service = new EntProvisioningTimeoutService(supabase);
      await service.deleteProvisioningTimeout(schoolId, id);
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
