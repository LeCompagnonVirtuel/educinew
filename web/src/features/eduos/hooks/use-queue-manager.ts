'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSQueueManagerService } from '../services/eduos-queue-manager.service';
import { createClient } from '@/lib/supabase/client';
import type { QueueManager } from '@educi/types';

export const useEduOSQueueManagerList = (schoolId: string) => {
  const [items, setItems] = useState<QueueManager[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSQueueManagerService(supabase);
      const data = await service.listQueueManagers(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
