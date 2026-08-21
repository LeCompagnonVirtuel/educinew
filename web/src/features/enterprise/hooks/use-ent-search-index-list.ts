'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchIndexService } from '../services/search-index.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchIndex } from '@educi/types';

export const useEntSearchIndexList = (schoolId: string) => {
  const [items, setItems] = useState<SearchIndex[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchIndexService(supabase);
      const data = await service.listSearchIndexs(schoolId);
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
