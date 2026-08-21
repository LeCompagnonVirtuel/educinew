'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPipelineTagService } from '../services/pipeline-tag.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineTag } from '@educi/types';

export const useEntPipelineTagList = (schoolId: string) => {
  const [items, setItems] = useState<PipelineTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineTagService(supabase);
      const data = await service.listPipelineTags(schoolId);
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
