'use client';

import { useState, useCallback } from 'react';
import { EntProvisioningCheckService } from '../services/provisioning-check.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningCheck, ProvisioningCheckCreate } from '@educi/types';

export const useEntProvisioningCheckActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProvisioningCheckCreate): Promise<ProvisioningCheck | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningCheckService(supabase);
      return await service.createProvisioningCheck(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProvisioningCheckCreate>): Promise<ProvisioningCheck | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningCheckService(supabase);
      return await service.updateProvisioningCheck(schoolId, id, data);
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
      const service = new EntProvisioningCheckService(supabase);
      await service.deleteProvisioningCheck(schoolId, id);
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
