'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntBenchmarkService } from '../services/int-benchmark.service';
import { createClient } from '@/lib/supabase/client';
import type { Benchmark } from '@educi/types';

export const useIntBenchmarkList = (schoolId: string) => {
  const [items, setItems] = useState<Benchmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntBenchmarkService(supabase);
      const data = await service.listBenchmarks(schoolId);
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