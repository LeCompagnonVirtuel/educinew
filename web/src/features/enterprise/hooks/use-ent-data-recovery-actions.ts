'use client';

import { useState, useCallback } from 'react';
import { EntDataRecoveryService } from '../services/data-recovery.service';
import { createClient } from '@/lib/supabase/client';
import type { DataRecovery, DataRecoveryCreate } from '@educi/types';

export const useEntDataRecoveryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataRecoveryCreate): Promise<DataRecovery | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataRecoveryService(supabase);
      return await service.createDataRecovery(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataRecoveryCreate>): Promise<DataRecovery | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataRecoveryService(supabase);
      return await service.updateDataRecovery(schoolId, id, data);
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
      const service = new EntDataRecoveryService(supabase);
      await service.deleteDataRecovery(schoolId, id);
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
