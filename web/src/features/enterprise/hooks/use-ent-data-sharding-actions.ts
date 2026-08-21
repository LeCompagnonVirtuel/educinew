'use client';

import { useState, useCallback } from 'react';
import { EntDataShardingService } from '../services/data-sharding.service';
import { createClient } from '@/lib/supabase/client';
import type { DataSharding, DataShardingCreate } from '@educi/types';

export const useEntDataShardingActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataShardingCreate): Promise<DataSharding | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataShardingService(supabase);
      return await service.createDataSharding(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataShardingCreate>): Promise<DataSharding | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataShardingService(supabase);
      return await service.updateDataSharding(schoolId, id, data);
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
      const service = new EntDataShardingService(supabase);
      await service.deleteDataSharding(schoolId, id);
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
