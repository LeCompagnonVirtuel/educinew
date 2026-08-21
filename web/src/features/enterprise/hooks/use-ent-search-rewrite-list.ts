'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchRewriteService } from '../services/search-rewrite.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchRewrite } from '@educi/types';

export const useEntSearchRewriteList = (schoolId: string) => {
  const [items, setItems] = useState<SearchRewrite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchRewriteService(supabase);
      const data = await service.listSearchRewrites(schoolId);
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
