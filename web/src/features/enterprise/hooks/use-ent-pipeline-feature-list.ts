'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPipelineFeatureService } from '../services/pipeline-feature.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineFeature } from '@educi/types';

export const useEntPipelineFeatureList = (schoolId: string) => {
  const [items, setItems] = useState<PipelineFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineFeatureService(supabase);
      const data = await service.listPipelineFeatures(schoolId);
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
