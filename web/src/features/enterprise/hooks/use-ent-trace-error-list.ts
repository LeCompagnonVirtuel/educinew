'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTraceErrorService } from '../services/trace-error.service';
import { createClient } from '@/lib/supabase/client';
import type { TraceError } from '@educi/types';

export const useEntTraceErrorList = (schoolId: string) => {
  const [items, setItems] = useState<TraceError[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceErrorService(supabase);
      const data = await service.listTraceErrors(schoolId);
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
