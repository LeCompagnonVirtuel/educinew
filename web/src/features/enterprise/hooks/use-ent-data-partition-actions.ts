'use client';

import { useState, useCallback } from 'react';
import { EntDataPartitionService } from '../services/data-partition.service';
import { createClient } from '@/lib/supabase/client';
import type { DataPartition, DataPartitionCreate } from '@educi/types';

export const useEntDataPartitionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataPartitionCreate): Promise<DataPartition | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataPartitionService(supabase);
      return await service.createDataPartition(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataPartitionCreate>): Promise<DataPartition | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataPartitionService(supabase);
      return await service.updateDataPartition(schoolId, id, data);
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
      const service = new EntDataPartitionService(supabase);
      await service.deleteDataPartition(schoolId, id);
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
