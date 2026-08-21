'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntFailoverTriggerService } from '../services/failover-trigger.service';
import { createClient } from '@/lib/supabase/client';
import type { FailoverTrigger } from '@educi/types';

export const useEntFailoverTriggerList = (schoolId: string) => {
  const [items, setItems] = useState<FailoverTrigger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverTriggerService(supabase);
      const data = await service.listFailoverTriggers(schoolId);
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
