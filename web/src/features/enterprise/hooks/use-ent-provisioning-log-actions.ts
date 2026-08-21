'use client';

import { useState, useCallback } from 'react';
import { EntProvisioningLogService } from '../services/provisioning-log.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningLog, ProvisioningLogCreate } from '@educi/types';

export const useEntProvisioningLogActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProvisioningLogCreate): Promise<ProvisioningLog | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningLogService(supabase);
      return await service.createProvisioningLog(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProvisioningLogCreate>): Promise<ProvisioningLog | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningLogService(supabase);
      return await service.updateProvisioningLog(schoolId, id, data);
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
      const service = new EntProvisioningLogService(supabase);
      await service.deleteProvisioningLog(schoolId, id);
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
