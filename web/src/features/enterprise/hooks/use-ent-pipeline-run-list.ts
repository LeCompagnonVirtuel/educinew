'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPipelineRunService } from '../services/pipeline-run.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineRun } from '@educi/types';

export const useEntPipelineRunList = (schoolId: string) => {
  const [items, setItems] = useState<PipelineRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineRunService(supabase);
      const data = await service.listPipelineRuns(schoolId);
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
