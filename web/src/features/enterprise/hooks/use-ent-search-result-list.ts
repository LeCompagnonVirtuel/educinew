'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchResultService } from '../services/search-result.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchResult } from '@educi/types';

export const useEntSearchResultList = (schoolId: string) => {
  const [items, setItems] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchResultService(supabase);
      const data = await service.listSearchResults(schoolId);
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
