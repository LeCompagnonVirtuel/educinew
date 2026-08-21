'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPipelineJobService } from '../services/pipeline-job.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineJob } from '@educi/types';

export const useEntPipelineJobList = (schoolId: string) => {
  const [items, setItems] = useState<PipelineJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineJobService(supabase);
      const data = await service.listPipelineJobs(schoolId);
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
