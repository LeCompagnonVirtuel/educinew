'use client';

import { useState, useCallback } from 'react';
import { EntProvisioningComputeService } from '../services/provisioning-compute.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningCompute, ProvisioningComputeCreate } from '@educi/types';

export const useEntProvisioningComputeActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProvisioningComputeCreate): Promise<ProvisioningCompute | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningComputeService(supabase);
      return await service.createProvisioningCompute(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProvisioningComputeCreate>): Promise<ProvisioningCompute | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningComputeService(supabase);
      return await service.updateProvisioningCompute(schoolId, id, data);
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
      const service = new EntProvisioningComputeService(supabase);
      await service.deleteProvisioningCompute(schoolId, id);
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
