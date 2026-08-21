'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntFailoverTestService } from '../services/failover-test.service';
import { createClient } from '@/lib/supabase/client';
import type { FailoverTest } from '@educi/types';

export const useEntFailoverTestList = (schoolId: string) => {
  const [items, setItems] = useState<FailoverTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverTestService(supabase);
      const data = await service.listFailoverTests(schoolId);
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
