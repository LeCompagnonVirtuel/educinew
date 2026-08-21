'use client';

import { useState, useCallback } from 'react';
import { EntTenantComplianceService } from '../services/tenant-compliance.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantCompliance, TenantComplianceCreate } from '@educi/types';

export const useEntTenantComplianceActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TenantComplianceCreate): Promise<TenantCompliance | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantComplianceService(supabase);
      return await service.createTenantCompliance(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TenantComplianceCreate>): Promise<TenantCompliance | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantComplianceService(supabase);
      return await service.updateTenantCompliance(schoolId, id, data);
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
      const service = new EntTenantComplianceService(supabase);
      await service.deleteTenantCompliance(schoolId, id);
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
