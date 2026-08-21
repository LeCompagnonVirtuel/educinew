'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPipelineArtifactService } from '../services/pipeline-artifact.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineArtifact } from '@educi/types';

export const useEntPipelineArtifactList = (schoolId: string) => {
  const [items, setItems] = useState<PipelineArtifact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineArtifactService(supabase);
      const data = await service.listPipelineArtifacts(schoolId);
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
