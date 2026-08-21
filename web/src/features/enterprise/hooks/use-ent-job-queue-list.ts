'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntJobQueueService } from '../services/job-queue.service';
import { createClient } from '@/lib/supabase/client';
import type { JobQueue } from '@educi/types';

export const useEntJobQueueList = (schoolId: string) => {
  const [items, setItems] = useState<JobQueue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntJobQueueService(supabase);
      const data = await service.listJobQueues(schoolId);
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
