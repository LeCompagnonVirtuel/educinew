'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPlatformBenchmarkService } from '../services/platform-benchmark.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformBenchmark } from '@educi/types';

export const useEntPlatformBenchmarkList = (schoolId: string) => {
  const [items, setItems] = useState<PlatformBenchmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformBenchmarkService(supabase);
      const data = await service.listPlatformBenchmarks(schoolId);
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
