'use client';

import { useState, useCallback } from 'react';
import { EntProvisioningAlertService } from '../services/provisioning-alert.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningAlert, ProvisioningAlertCreate } from '@educi/types';

export const useEntProvisioningAlertActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProvisioningAlertCreate): Promise<ProvisioningAlert | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningAlertService(supabase);
      return await service.createProvisioningAlert(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProvisioningAlertCreate>): Promise<ProvisioningAlert | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningAlertService(supabase);
      return await service.updateProvisioningAlert(schoolId, id, data);
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
      const service = new EntProvisioningAlertService(supabase);
      await service.deleteProvisioningAlert(schoolId, id);
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
