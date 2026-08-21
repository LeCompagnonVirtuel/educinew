'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSBackgroundTaskService } from '../services/eduos-background-task.service';
import { createClient } from '@/lib/supabase/client';
import type { BackgroundTask } from '@educi/types';

export const useEduOSBackgroundTaskList = (schoolId: string) => {
  const [items, setItems] = useState<BackgroundTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBackgroundTaskService(supabase);
      const data = await service.listBackgroundTasks(schoolId);
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
