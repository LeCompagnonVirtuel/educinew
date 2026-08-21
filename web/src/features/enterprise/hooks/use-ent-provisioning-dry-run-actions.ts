'use client';

import { useState, useCallback } from 'react';
import { EntProvisioningDryRunService } from '../services/provisioning-dry-run.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningDryRun, ProvisioningDryRunCreate } from '@educi/types';

export const useEntProvisioningDryRunActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProvisioningDryRunCreate): Promise<ProvisioningDryRun | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningDryRunService(supabase);
      return await service.createProvisioningDryRun(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProvisioningDryRunCreate>): Promise<ProvisioningDryRun | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningDryRunService(supabase);
      return await service.updateProvisioningDryRun(schoolId, id, data);
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
      const service = new EntProvisioningDryRunService(supabase);
      await service.deleteProvisioningDryRun(schoolId, id);
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
