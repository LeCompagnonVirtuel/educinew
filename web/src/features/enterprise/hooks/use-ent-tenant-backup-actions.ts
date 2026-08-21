'use client';

import { useState, useCallback } from 'react';
import { EntTenantBackupService } from '../services/tenant-backup.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantBackup, TenantBackupCreate } from '@educi/types';

export const useEntTenantBackupActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TenantBackupCreate): Promise<TenantBackup | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantBackupService(supabase);
      return await service.createTenantBackup(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TenantBackupCreate>): Promise<TenantBackup | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantBackupService(supabase);
      return await service.updateTenantBackup(schoolId, id, data);
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
      const service = new EntTenantBackupService(supabase);
      await service.deleteTenantBackup(schoolId, id);
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
