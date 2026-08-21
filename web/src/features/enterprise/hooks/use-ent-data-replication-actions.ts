'use client';

import { useState, useCallback } from 'react';
import { EntDataReplicationService } from '../services/data-replication.service';
import { createClient } from '@/lib/supabase/client';
import type { DataReplication, DataReplicationCreate } from '@educi/types';

export const useEntDataReplicationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataReplicationCreate): Promise<DataReplication | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataReplicationService(supabase);
      return await service.createDataReplication(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataReplicationCreate>): Promise<DataReplication | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataReplicationService(supabase);
      return await service.updateDataReplication(schoolId, id, data);
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
      const service = new EntDataReplicationService(supabase);
      await service.deleteDataReplication(schoolId, id);
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
