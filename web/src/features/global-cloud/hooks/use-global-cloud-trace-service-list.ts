'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudTraceServiceService } from '../services/global-cloud-trace-service.service';
import { createClient } from '@/lib/supabase/client';
import type { TraceService } from '@educi/types';

export const useGlobalCloudTraceServiceList = (schoolId: string) => {
  const [items, setItems] = useState<TraceService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudTraceServiceService(supabase);
      const data = await service.list(schoolId);
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