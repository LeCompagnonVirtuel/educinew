'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTraceLatencyService } from '../services/trace-latency.service';
import { createClient } from '@/lib/supabase/client';
import type { TraceLatency } from '@educi/types';

export const useEntTraceLatencyList = (schoolId: string) => {
  const [items, setItems] = useState<TraceLatency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceLatencyService(supabase);
      const data = await service.listTraceLatencys(schoolId);
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
