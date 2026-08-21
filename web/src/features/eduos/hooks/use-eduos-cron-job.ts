'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSCronJobService } from '../services/eduos-cron-job.service';
import { createClient } from '@/lib/supabase/client';
import type { CronJob } from '@educi/types';

export const useEduOSCronJobList = (schoolId: string) => {
  const [items, setItems] = useState<CronJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCronJobService(supabase);
      const data = await service.listCronJobs(schoolId);
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