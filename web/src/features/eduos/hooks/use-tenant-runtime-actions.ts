'use client';

import { useState, useCallback } from 'react';
import { EduOSTenantRuntimeService } from '../services/eduos-tenant-runtime.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantRuntime } from '@educi/types';

export const useEduOSTenantRuntimeActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<TenantRuntime>): Promise<TenantRuntime | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSTenantRuntimeService(supabase);
      return await service.createTenantRuntime(schoolId, data as TenantRuntime);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TenantRuntime>): Promise<TenantRuntime | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSTenantRuntimeService(supabase);
      return await service.updateTenantRuntime(schoolId, id, data);
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
      const service = new EduOSTenantRuntimeService(supabase);
      await service.deleteTenantRuntime(schoolId, id);
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
