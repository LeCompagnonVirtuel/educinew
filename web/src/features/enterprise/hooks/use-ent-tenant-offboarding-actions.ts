'use client';

import { useState, useCallback } from 'react';
import { EntTenantOffboardingService } from '../services/tenant-offboarding.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantOffboarding, TenantOffboardingCreate } from '@educi/types';

export const useEntTenantOffboardingActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TenantOffboardingCreate): Promise<TenantOffboarding | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantOffboardingService(supabase);
      return await service.createTenantOffboarding(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TenantOffboardingCreate>): Promise<TenantOffboarding | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantOffboardingService(supabase);
      return await service.updateTenantOffboarding(schoolId, id, data);
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
      const service = new EntTenantOffboardingService(supabase);
      await service.deleteTenantOffboarding(schoolId, id);
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
