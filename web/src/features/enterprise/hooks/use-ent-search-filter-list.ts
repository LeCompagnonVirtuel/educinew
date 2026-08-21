'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchFilterService } from '../services/search-filter.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchFilter } from '@educi/types';

export const useEntSearchFilterList = (schoolId: string) => {
  const [items, setItems] = useState<SearchFilter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchFilterService(supabase);
      const data = await service.listSearchFilters(schoolId);
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
