'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntFailoverActionService } from '../services/failover-action.service';
import { createClient } from '@/lib/supabase/client';
import type { FailoverAction } from '@educi/types';

export const useEntFailoverActionList = (schoolId: string) => {
  const [items, setItems] = useState<FailoverAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverActionService(supabase);
      const data = await service.listFailoverActions(schoolId);
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
