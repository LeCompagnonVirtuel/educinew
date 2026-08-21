'use client';

import { useState, useCallback } from 'react';
import { EntTenantMigrationService } from '../services/tenant-migration.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantMigration, TenantMigrationCreate } from '@educi/types';

export const useEntTenantMigrationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TenantMigrationCreate): Promise<TenantMigration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantMigrationService(supabase);
      return await service.createTenantMigration(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TenantMigrationCreate>): Promise<TenantMigration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantMigrationService(supabase);
      return await service.updateTenantMigration(schoolId, id, data);
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
      const service = new EntTenantMigrationService(supabase);
      await service.deleteTenantMigration(schoolId, id);
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
