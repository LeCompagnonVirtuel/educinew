'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCloudSchedulerService } from '../services/global-cloud-cloud-scheduler.service';
import { createClient } from '@/lib/supabase/client';
import type { CloudScheduler } from '@educi/types';

export const useGlobalCloudCloudSchedulerList = (schoolId: string) => {
  const [items, setItems] = useState<CloudScheduler[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCloudSchedulerService(supabase);
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