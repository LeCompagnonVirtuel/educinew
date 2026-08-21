'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudSchedulerJobService } from '../services/global-cloud-scheduler-job.service';
import { createClient } from '@/lib/supabase/client';
import type { SchedulerJob } from '@educi/types';

export const useGlobalCloudSchedulerJobList = (schoolId: string) => {
  const [items, setItems] = useState<SchedulerJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudSchedulerJobService(supabase);
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