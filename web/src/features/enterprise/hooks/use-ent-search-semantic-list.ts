'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchSemanticService } from '../services/search-semantic.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchSemantic } from '@educi/types';

export const useEntSearchSemanticList = (schoolId: string) => {
  const [items, setItems] = useState<SearchSemantic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchSemanticService(supabase);
      const data = await service.listSearchSemantics(schoolId);
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
