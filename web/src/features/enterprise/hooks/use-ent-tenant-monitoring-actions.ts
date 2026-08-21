'use client';

import { useState, useCallback } from 'react';
import { EntTenantMonitoringService } from '../services/tenant-monitoring.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantMonitoring, TenantMonitoringCreate } from '@educi/types';

export const useEntTenantMonitoringActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TenantMonitoringCreate): Promise<TenantMonitoring | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantMonitoringService(supabase);
      return await service.createTenantMonitoring(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TenantMonitoringCreate>): Promise<TenantMonitoring | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantMonitoringService(supabase);
      return await service.updateTenantMonitoring(schoolId, id, data);
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
      const service = new EntTenantMonitoringService(supabase);
      await service.deleteTenantMonitoring(schoolId, id);
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
