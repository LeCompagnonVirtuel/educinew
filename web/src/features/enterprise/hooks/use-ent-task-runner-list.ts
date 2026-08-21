'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTaskRunnerService } from '../services/task-runner.service';
import { createClient } from '@/lib/supabase/client';
import type { TaskRunner } from '@educi/types';

export const useEntTaskRunnerList = (schoolId: string) => {
  const [items, setItems] = useState<TaskRunner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTaskRunnerService(supabase);
      const data = await service.listTaskRunners(schoolId);
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
