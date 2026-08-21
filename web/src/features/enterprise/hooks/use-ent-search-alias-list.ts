'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchAliasService } from '../services/search-alias.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchAlias } from '@educi/types';

export const useEntSearchAliasList = (schoolId: string) => {
  const [items, setItems] = useState<SearchAlias[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchAliasService(supabase);
      const data = await service.listSearchAliass(schoolId);
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
