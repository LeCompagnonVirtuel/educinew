'use client';

import { useState, useCallback } from 'react';
import { EntTenantSupportService } from '../services/tenant-support.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantSupport, TenantSupportCreate } from '@educi/types';

export const useEntTenantSupportActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TenantSupportCreate): Promise<TenantSupport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantSupportService(supabase);
      return await service.createTenantSupport(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TenantSupportCreate>): Promise<TenantSupport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantSupportService(supabase);
      return await service.updateTenantSupport(schoolId, id, data);
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
      const service = new EntTenantSupportService(supabase);
      await service.deleteTenantSupport(schoolId, id);
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
