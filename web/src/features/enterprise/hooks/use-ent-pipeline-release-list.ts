'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPipelineReleaseService } from '../services/pipeline-release.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineRelease } from '@educi/types';

export const useEntPipelineReleaseList = (schoolId: string) => {
  const [items, setItems] = useState<PipelineRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineReleaseService(supabase);
      const data = await service.listPipelineReleases(schoolId);
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
