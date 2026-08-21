'use client';

import { useState, useCallback } from 'react';
import { EntTenantRecoveryService } from '../services/tenant-recovery.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantRecovery, TenantRecoveryCreate } from '@educi/types';

export const useEntTenantRecoveryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TenantRecoveryCreate): Promise<TenantRecovery | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantRecoveryService(supabase);
      return await service.createTenantRecovery(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TenantRecoveryCreate>): Promise<TenantRecovery | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantRecoveryService(supabase);
      return await service.updateTenantRecovery(schoolId, id, data);
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
      const service = new EntTenantRecoveryService(supabase);
      await service.deleteTenantRecovery(schoolId, id);
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
