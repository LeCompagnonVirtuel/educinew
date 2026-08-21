'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchRelevanceService } from '../services/search-relevance.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchRelevance } from '@educi/types';

export const useEntSearchRelevanceList = (schoolId: string) => {
  const [items, setItems] = useState<SearchRelevance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchRelevanceService(supabase);
      const data = await service.listSearchRelevances(schoolId);
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
