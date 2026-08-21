'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudSchedulerRunService } from '../services/global-cloud-scheduler-run.service';
import { createClient } from '@/lib/supabase/client';
import type { SchedulerRun } from '@educi/types';

export const useGlobalCloudSchedulerRunList = (schoolId: string) => {
  const [items, setItems] = useState<SchedulerRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudSchedulerRunService(supabase);
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