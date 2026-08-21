'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchStemmerService } from '../services/search-stemmer.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchStemmer } from '@educi/types';

export const useEntSearchStemmerList = (schoolId: string) => {
  const [items, setItems] = useState<SearchStemmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchStemmerService(supabase);
      const data = await service.listSearchStemmers(schoolId);
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
