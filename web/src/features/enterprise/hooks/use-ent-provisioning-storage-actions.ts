'use client';

import { useState, useCallback } from 'react';
import { EntProvisioningStorageService } from '../services/provisioning-storage.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningStorage, ProvisioningStorageCreate } from '@educi/types';

export const useEntProvisioningStorageActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProvisioningStorageCreate): Promise<ProvisioningStorage | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningStorageService(supabase);
      return await service.createProvisioningStorage(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProvisioningStorageCreate>): Promise<ProvisioningStorage | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningStorageService(supabase);
      return await service.updateProvisioningStorage(schoolId, id, data);
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
      const service = new EntProvisioningStorageService(supabase);
      await service.deleteProvisioningStorage(schoolId, id);
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
