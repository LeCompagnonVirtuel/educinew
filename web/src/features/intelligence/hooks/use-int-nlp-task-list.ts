'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntNlpTaskService } from '../services/int-nlp-task.service';
import { createClient } from '@/lib/supabase/client';
import type { NLPTask } from '@educi/types';

export const useIntNlpTaskList = (schoolId: string) => {
  const [items, setItems] = useState<NLPTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntNlpTaskService(supabase);
      const data = await service.listNLPTasks(schoolId);
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