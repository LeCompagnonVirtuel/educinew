'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntPipelineService } from '../services/int-pipeline.service';
import { createClient } from '@/lib/supabase/client';
import type { IntelligencePipeline } from '@educi/types';

export const useIntPipelineList = (schoolId: string) => {
  const [items, setItems] = useState<IntelligencePipeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntPipelineService(supabase);
      const data = await service.listPipelines(schoolId);
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
