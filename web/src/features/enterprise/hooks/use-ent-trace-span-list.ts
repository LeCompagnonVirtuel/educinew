'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTraceSpanService } from '../services/trace-span.service';
import { createClient } from '@/lib/supabase/client';
import type { TraceSpan } from '@educi/types';

export const useEntTraceSpanList = (schoolId: string) => {
  const [items, setItems] = useState<TraceSpan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceSpanService(supabase);
      const data = await service.listTraceSpans(schoolId);
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
