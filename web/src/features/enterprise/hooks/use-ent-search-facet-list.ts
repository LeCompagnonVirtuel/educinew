'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchFacetService } from '../services/search-facet.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchFacet } from '@educi/types';

export const useEntSearchFacetList = (schoolId: string) => {
  const [items, setItems] = useState<SearchFacet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchFacetService(supabase);
      const data = await service.listSearchFacets(schoolId);
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
