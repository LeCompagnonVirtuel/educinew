'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntLogAggregationService } from '../services/log-aggregation.service';
import { createClient } from '@/lib/supabase/client';
import type { LogAggregation } from '@educi/types';

export const useEntLogAggregationList = (schoolId: string) => {
  const [items, setItems] = useState<LogAggregation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogAggregationService(supabase);
      const data = await service.listLogAggregations(schoolId);
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
