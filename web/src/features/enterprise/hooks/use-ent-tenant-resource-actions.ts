'use client';

import { useState, useCallback } from 'react';
import { EntTenantResourceService } from '../services/tenant-resource.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantResource, TenantResourceCreate } from '@educi/types';

export const useEntTenantResourceActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TenantResourceCreate): Promise<TenantResource | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantResourceService(supabase);
      return await service.createTenantResource(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TenantResourceCreate>): Promise<TenantResource | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantResourceService(supabase);
      return await service.updateTenantResource(schoolId, id, data);
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
      const service = new EntTenantResourceService(supabase);
      await service.deleteTenantResource(schoolId, id);
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
