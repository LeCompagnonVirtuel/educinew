'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSJobRunnerService } from '../services/eduos-job-runner.service';
import { createClient } from '@/lib/supabase/client';
import type { JobRunner } from '@educi/types';

export const useEduOSJobRunnerList = (schoolId: string) => {
  const [items, setItems] = useState<JobRunner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSJobRunnerService(supabase);
      const data = await service.listJobRunners(schoolId);
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
