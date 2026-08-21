'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPipelineVariableService } from '../services/pipeline-variable.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineVariable } from '@educi/types';

export const useEntPipelineVariableList = (schoolId: string) => {
  const [items, setItems] = useState<PipelineVariable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineVariableService(supabase);
      const data = await service.listPipelineVariables(schoolId);
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
