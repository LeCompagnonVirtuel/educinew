'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPipelineBlueGreenService } from '../services/pipeline-blue-green.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineBlueGreen } from '@educi/types';

export const useEntPipelineBlueGreenList = (schoolId: string) => {
  const [items, setItems] = useState<PipelineBlueGreen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineBlueGreenService(supabase);
      const data = await service.listPipelineBlueGreens(schoolId);
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
