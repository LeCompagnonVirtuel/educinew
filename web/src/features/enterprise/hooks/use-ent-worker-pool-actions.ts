'use client';

import { useState, useCallback } from 'react';
import { EntWorkerPoolService } from '../services/worker-pool.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkerPool, WorkerPoolCreate } from '@educi/types';

export const useEntWorkerPoolActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: WorkerPoolCreate): Promise<WorkerPool | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntWorkerPoolService(supabase);
      return await service.createWorkerPool(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<WorkerPoolCreate>): Promise<WorkerPool | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntWorkerPoolService(supabase);
      return await service.updateWorkerPool(schoolId, id, data);
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
      const service = new EntWorkerPoolService(supabase);
      await service.deleteWorkerPool(schoolId, id);
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
