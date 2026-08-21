'use client';

import { useState, useCallback } from 'react';
import { EntTenantOptimizationService } from '../services/tenant-optimization.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantOptimization, TenantOptimizationCreate } from '@educi/types';

export const useEntTenantOptimizationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TenantOptimizationCreate): Promise<TenantOptimization | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantOptimizationService(supabase);
      return await service.createTenantOptimization(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TenantOptimizationCreate>): Promise<TenantOptimization | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantOptimizationService(supabase);
      return await service.updateTenantOptimization(schoolId, id, data);
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
      const service = new EntTenantOptimizationService(supabase);
      await service.deleteTenantOptimization(schoolId, id);
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
