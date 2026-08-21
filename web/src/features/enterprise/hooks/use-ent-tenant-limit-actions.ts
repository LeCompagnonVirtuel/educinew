'use client';

import { useState, useCallback } from 'react';
import { EntTenantLimitService } from '../services/tenant-limit.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantLimit, TenantLimitCreate } from '@educi/types';

export const useEntTenantLimitActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TenantLimitCreate): Promise<TenantLimit | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantLimitService(supabase);
      return await service.createTenantLimit(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TenantLimitCreate>): Promise<TenantLimit | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantLimitService(supabase);
      return await service.updateTenantLimit(schoolId, id, data);
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
      const service = new EntTenantLimitService(supabase);
      await service.deleteTenantLimit(schoolId, id);
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
