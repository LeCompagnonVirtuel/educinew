'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudLogQueryService } from '../services/global-cloud-log-query.service';
import { createClient } from '@/lib/supabase/client';
import type { LogQuery } from '@educi/types';

export const useGlobalCloudLogQueryList = (schoolId: string) => {
  const [items, setItems] = useState<LogQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudLogQueryService(supabase);
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