'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPipelineStepService } from '../services/pipeline-step.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineStep } from '@educi/types';

export const useEntPipelineStepList = (schoolId: string) => {
  const [items, setItems] = useState<PipelineStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineStepService(supabase);
      const data = await service.listPipelineSteps(schoolId);
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
