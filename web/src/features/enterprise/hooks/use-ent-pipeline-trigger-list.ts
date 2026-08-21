'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPipelineTriggerService } from '../services/pipeline-trigger.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineTrigger } from '@educi/types';

export const useEntPipelineTriggerList = (schoolId: string) => {
  const [items, setItems] = useState<PipelineTrigger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineTriggerService(supabase);
      const data = await service.listPipelineTriggers(schoolId);
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
