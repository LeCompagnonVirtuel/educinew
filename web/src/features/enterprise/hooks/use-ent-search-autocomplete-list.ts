'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchAutocompleteService } from '../services/search-autocomplete.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchAutocomplete } from '@educi/types';

export const useEntSearchAutocompleteList = (schoolId: string) => {
  const [items, setItems] = useState<SearchAutocomplete[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchAutocompleteService(supabase);
      const data = await service.listSearchAutocompletes(schoolId);
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
