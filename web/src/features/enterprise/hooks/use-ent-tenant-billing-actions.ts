'use client';

import { useState, useCallback } from 'react';
import { EntTenantBillingService } from '../services/tenant-billing.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantBilling, TenantBillingCreate } from '@educi/types';

export const useEntTenantBillingActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TenantBillingCreate): Promise<TenantBilling | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantBillingService(supabase);
      return await service.createTenantBilling(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TenantBillingCreate>): Promise<TenantBilling | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantBillingService(supabase);
      return await service.updateTenantBilling(schoolId, id, data);
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
      const service = new EntTenantBillingService(supabase);
      await service.deleteTenantBilling(schoolId, id);
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
