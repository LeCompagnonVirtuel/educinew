'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudQueueMessageService } from '../services/global-cloud-queue-message.service';
import { createClient } from '@/lib/supabase/client';
import type { QueueMessage } from '@educi/types';

export const useGlobalCloudQueueMessageList = (schoolId: string) => {
  const [items, setItems] = useState<QueueMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudQueueMessageService(supabase);
      const data = await service.list(schoolId);
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