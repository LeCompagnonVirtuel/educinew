'use client';

import { useState, useCallback } from 'react';
import { EntDataMigrationService } from '../services/data-migration.service';
import { createClient } from '@/lib/supabase/client';
import type { DataMigration, DataMigrationCreate } from '@educi/types';

export const useEntDataMigrationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataMigrationCreate): Promise<DataMigration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataMigrationService(supabase);
      return await service.createDataMigration(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataMigrationCreate>): Promise<DataMigration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataMigrationService(supabase);
      return await service.updateDataMigration(schoolId, id, data);
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
      const service = new EntDataMigrationService(supabase);
      await service.deleteDataMigration(schoolId, id);
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
