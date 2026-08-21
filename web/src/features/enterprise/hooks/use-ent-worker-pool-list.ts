'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntWorkerPoolService } from '../services/worker-pool.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkerPool } from '@educi/types';

export const useEntWorkerPoolList = (schoolId: string) => {
  const [items, setItems] = useState<WorkerPool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntWorkerPoolService(supabase);
      const data = await service.listWorkerPools(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
