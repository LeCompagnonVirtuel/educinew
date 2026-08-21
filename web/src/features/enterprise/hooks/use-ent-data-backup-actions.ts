'use client';

import { useState, useCallback } from 'react';
import { EntDataBackupService } from '../services/data-backup.service';
import { createClient } from '@/lib/supabase/client';
import type { DataBackup, DataBackupCreate } from '@educi/types';

export const useEntDataBackupActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataBackupCreate): Promise<DataBackup | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataBackupService(supabase);
      return await service.createDataBackup(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataBackupCreate>): Promise<DataBackup | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataBackupService(supabase);
      return await service.updateDataBackup(schoolId, id, data);
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
      const service = new EntDataBackupService(supabase);
      await service.deleteDataBackup(schoolId, id);
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
