'use client';

import { useState, useCallback } from 'react';
import { EntProvisioningDependencyService } from '../services/provisioning-dependency.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningDependency, ProvisioningDependencyCreate } from '@educi/types';

export const useEntProvisioningDependencyActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProvisioningDependencyCreate): Promise<ProvisioningDependency | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningDependencyService(supabase);
      return await service.createProvisioningDependency(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProvisioningDependencyCreate>): Promise<ProvisioningDependency | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningDependencyService(supabase);
      return await service.updateProvisioningDependency(schoolId, id, data);
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
      const service = new EntProvisioningDependencyService(supabase);
      await service.deleteProvisioningDependency(schoolId, id);
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
