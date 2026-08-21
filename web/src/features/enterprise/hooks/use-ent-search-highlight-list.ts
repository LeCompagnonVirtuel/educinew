'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchHighlightService } from '../services/search-highlight.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchHighlight } from '@educi/types';

export const useEntSearchHighlightList = (schoolId: string) => {
  const [items, setItems] = useState<SearchHighlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchHighlightService(supabase);
      const data = await service.listSearchHighlights(schoolId);
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
