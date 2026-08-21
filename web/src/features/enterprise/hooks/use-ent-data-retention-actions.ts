'use client';

import { useState, useCallback } from 'react';
import { EntDataRetentionService } from '../services/data-retention.service';
import { createClient } from '@/lib/supabase/client';
import type { DataRetention, DataRetentionCreate } from '@educi/types';

export const useEntDataRetentionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataRetentionCreate): Promise<DataRetention | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataRetentionService(supabase);
      return await service.createDataRetention(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataRetentionCreate>): Promise<DataRetention | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataRetentionService(supabase);
      return await service.updateDataRetention(schoolId, id, data);
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
      const service = new EntDataRetentionService(supabase);
      await service.deleteDataRetention(schoolId, id);
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
