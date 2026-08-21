'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPipelineNotificationService } from '../services/pipeline-notification.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineNotification } from '@educi/types';

export const useEntPipelineNotificationList = (schoolId: string) => {
  const [items, setItems] = useState<PipelineNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineNotificationService(supabase);
      const data = await service.listPipelineNotifications(schoolId);
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
