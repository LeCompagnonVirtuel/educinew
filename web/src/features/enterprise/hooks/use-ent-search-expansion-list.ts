'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchExpansionService } from '../services/search-expansion.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchExpansion } from '@educi/types';

export const useEntSearchExpansionList = (schoolId: string) => {
  const [items, setItems] = useState<SearchExpansion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchExpansionService(supabase);
      const data = await service.listSearchExpansions(schoolId);
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
