'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchPipelineService } from '../services/search-pipeline.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchPipeline } from '@educi/types';

export const useEntSearchPipelineList = (schoolId: string) => {
  const [items, setItems] = useState<SearchPipeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchPipelineService(supabase);
      const data = await service.listSearchPipelines(schoolId);
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
