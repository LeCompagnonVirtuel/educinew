'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntLogIndexingService } from '../services/log-indexing.service';
import { createClient } from '@/lib/supabase/client';
import type { LogIndexing } from '@educi/types';

export const useEntLogIndexingList = (schoolId: string) => {
  const [items, setItems] = useState<LogIndexing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogIndexingService(supabase);
      const data = await service.listLogIndexings(schoolId);
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
