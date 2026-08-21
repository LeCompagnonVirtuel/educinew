'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchSuggestionService } from '../services/search-suggestion.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchSuggestion } from '@educi/types';

export const useEntSearchSuggestionList = (schoolId: string) => {
  const [items, setItems] = useState<SearchSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchSuggestionService(supabase);
      const data = await service.listSearchSuggestions(schoolId);
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
