'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPerformanceBenchmarkService } from '../services/performance-benchmark.service';
import { createClient } from '@/lib/supabase/client';
import type { PerformanceBenchmark } from '@educi/types';

export const useEntPerformanceBenchmarkList = (schoolId: string) => {
  const [items, setItems] = useState<PerformanceBenchmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPerformanceBenchmarkService(supabase);
      const data = await service.listPerformanceBenchmarks(schoolId);
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
