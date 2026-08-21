'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDataPipelineService } from '../services/data-pipeline.service';
import { createClient } from '@/lib/supabase/client';
import type { DataPipeline } from '@educi/types';

export const useEntDataPipelineList = (schoolId: string) => {
  const [items, setItems] = useState<DataPipeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataPipelineService(supabase);
      const data = await service.listDataPipelines(schoolId);
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
