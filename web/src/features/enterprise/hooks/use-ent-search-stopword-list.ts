'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchStopwordService } from '../services/search-stopword.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchStopword } from '@educi/types';

export const useEntSearchStopwordList = (schoolId: string) => {
  const [items, setItems] = useState<SearchStopword[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchStopwordService(supabase);
      const data = await service.listSearchStopwords(schoolId);
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
