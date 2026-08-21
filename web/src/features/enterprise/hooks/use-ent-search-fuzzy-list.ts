'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchFuzzyService } from '../services/search-fuzzy.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchFuzzy } from '@educi/types';

export const useEntSearchFuzzyList = (schoolId: string) => {
  const [items, setItems] = useState<SearchFuzzy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchFuzzyService(supabase);
      const data = await service.listSearchFuzzys(schoolId);
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
