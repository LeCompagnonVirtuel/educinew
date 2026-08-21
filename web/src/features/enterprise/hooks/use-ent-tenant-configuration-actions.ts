'use client';

import { useState, useCallback } from 'react';
import { EntTenantConfigurationService } from '../services/tenant-configuration.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantConfiguration, TenantConfigurationCreate } from '@educi/types';

export const useEntTenantConfigurationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TenantConfigurationCreate): Promise<TenantConfiguration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantConfigurationService(supabase);
      return await service.createTenantConfiguration(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TenantConfigurationCreate>): Promise<TenantConfiguration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantConfigurationService(supabase);
      return await service.updateTenantConfiguration(schoolId, id, data);
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
      const service = new EntTenantConfigurationService(supabase);
      await service.deleteTenantConfiguration(schoolId, id);
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
