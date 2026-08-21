'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPipelineRollbackService } from '../services/pipeline-rollback.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineRollback } from '@educi/types';

export const useEntPipelineRollbackList = (schoolId: string) => {
  const [items, setItems] = useState<PipelineRollback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineRollbackService(supabase);
      const data = await service.listPipelineRollbacks(schoolId);
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
