'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntRequestQueueService } from '../services/request-queue.service';
import { createClient } from '@/lib/supabase/client';
import type { RequestQueue } from '@educi/types';

export const useEntRequestQueueList = (schoolId: string) => {
  const [items, setItems] = useState<RequestQueue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntRequestQueueService(supabase);
      const data = await service.listRequestQueues(schoolId);
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
