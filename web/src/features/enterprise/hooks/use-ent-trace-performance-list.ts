'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTracePerformanceService } from '../services/trace-performance.service';
import { createClient } from '@/lib/supabase/client';
import type { TracePerformance } from '@educi/types';

export const useEntTracePerformanceList = (schoolId: string) => {
  const [items, setItems] = useState<TracePerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTracePerformanceService(supabase);
      const data = await service.listTracePerformances(schoolId);
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
