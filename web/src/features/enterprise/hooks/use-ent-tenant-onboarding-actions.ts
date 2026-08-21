'use client';

import { useState, useCallback } from 'react';
import { EntTenantOnboardingService } from '../services/tenant-onboarding.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantOnboarding, TenantOnboardingCreate } from '@educi/types';

export const useEntTenantOnboardingActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TenantOnboardingCreate): Promise<TenantOnboarding | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantOnboardingService(supabase);
      return await service.createTenantOnboarding(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TenantOnboardingCreate>): Promise<TenantOnboarding | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantOnboardingService(supabase);
      return await service.updateTenantOnboarding(schoolId, id, data);
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
      const service = new EntTenantOnboardingService(supabase);
      await service.deleteTenantOnboarding(schoolId, id);
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
