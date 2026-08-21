'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPipelineCanaryService } from '../services/pipeline-canary.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineCanary } from '@educi/types';

export const useEntPipelineCanaryList = (schoolId: string) => {
  const [items, setItems] = useState<PipelineCanary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineCanaryService(supabase);
      const data = await service.listPipelineCanarys(schoolId);
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
