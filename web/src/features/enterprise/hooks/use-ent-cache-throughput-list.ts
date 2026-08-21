'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheThroughputService } from '../services/cache-throughput.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheThroughput } from '@educi/types';

export const useEntCacheThroughputList = (schoolId: string) => {
  const [items, setItems] = useState<CacheThroughput[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheThroughputService(supabase);
      const data = await service.listCacheThroughputs(schoolId);
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
