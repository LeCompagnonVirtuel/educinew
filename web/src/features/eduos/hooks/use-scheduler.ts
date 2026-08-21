'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSSchedulerService } from '../services/eduos-scheduler.service';
import { createClient } from '@/lib/supabase/client';
import type { Scheduler } from '@educi/types';

export const useEduOSSchedulerList = (schoolId: string) => {
  const [items, setItems] = useState<Scheduler[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSchedulerService(supabase);
      const data = await service.listSchedulers(schoolId);
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
