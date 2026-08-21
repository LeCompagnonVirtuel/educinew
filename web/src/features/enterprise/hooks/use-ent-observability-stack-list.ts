'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntObservabilityStackService } from '../services/observability-stack.service';
import { createClient } from '@/lib/supabase/client';
import type { ObservabilityStack } from '@educi/types';

export const useEntObservabilityStackList = (schoolId: string) => {
  const [items, setItems] = useState<ObservabilityStack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntObservabilityStackService(supabase);
      const data = await service.listObservabilityStacks(schoolId);
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
