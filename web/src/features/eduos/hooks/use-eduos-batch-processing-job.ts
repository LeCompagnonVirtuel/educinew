'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSBatchProcessingJobService } from '../services/eduos-batch-processing-job.service';
import { createClient } from '@/lib/supabase/client';
import type { BatchProcessingJob } from '@educi/types';

export const useEduOSBatchProcessingJobList = (schoolId: string) => {
  const [items, setItems] = useState<BatchProcessingJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBatchProcessingJobService(supabase);
      const data = await service.listBatchProcessingJobs(schoolId);
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