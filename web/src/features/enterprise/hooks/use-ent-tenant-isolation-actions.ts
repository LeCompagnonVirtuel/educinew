'use client';

import { useState, useCallback } from 'react';
import { EntTenantIsolationService } from '../services/tenant-isolation.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantIsolation, TenantIsolationCreate } from '@educi/types';

export const useEntTenantIsolationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TenantIsolationCreate): Promise<TenantIsolation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantIsolationService(supabase);
      return await service.createTenantIsolation(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TenantIsolationCreate>): Promise<TenantIsolation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantIsolationService(supabase);
      return await service.updateTenantIsolation(schoolId, id, data);
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
      const service = new EntTenantIsolationService(supabase);
      await service.deleteTenantIsolation(schoolId, id);
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
