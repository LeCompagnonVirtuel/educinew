'use client';

import { useState, useCallback } from 'react';
import { EntTenantScalingService } from '../services/tenant-scaling.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantScaling, TenantScalingCreate } from '@educi/types';

export const useEntTenantScalingActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TenantScalingCreate): Promise<TenantScaling | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantScalingService(supabase);
      return await service.createTenantScaling(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TenantScalingCreate>): Promise<TenantScaling | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantScalingService(supabase);
      return await service.updateTenantScaling(schoolId, id, data);
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
      const service = new EntTenantScalingService(supabase);
      await service.deleteTenantScaling(schoolId, id);
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
