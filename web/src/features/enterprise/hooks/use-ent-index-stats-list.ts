'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntIndexStatsService } from '../services/index-stats.service';
import { createClient } from '@/lib/supabase/client';
import type { IndexStats } from '@educi/types';

export const useEntIndexStatsList = (schoolId: string) => {
  const [items, setItems] = useState<IndexStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexStatsService(supabase);
      const data = await service.listIndexStatss(schoolId);
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
