'use client';

import { useState, useCallback } from 'react';
import { EntTenantProvisioningService } from '../services/tenant-provisioning.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantProvisioning, TenantProvisioningCreate } from '@educi/types';

export const useEntTenantProvisioningActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TenantProvisioningCreate): Promise<TenantProvisioning | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantProvisioningService(supabase);
      return await service.createTenantProvisioning(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TenantProvisioningCreate>): Promise<TenantProvisioning | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantProvisioningService(supabase);
      return await service.updateTenantProvisioning(schoolId, id, data);
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
      const service = new EntTenantProvisioningService(supabase);
      await service.deleteTenantProvisioning(schoolId, id);
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
