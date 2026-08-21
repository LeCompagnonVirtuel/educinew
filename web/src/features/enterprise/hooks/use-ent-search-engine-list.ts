'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchEngineService } from '../services/search-engine.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchEngine } from '@educi/types';

export const useEntSearchEngineList = (schoolId: string) => {
  const [items, setItems] = useState<SearchEngine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchEngineService(supabase);
      const data = await service.listSearchEngines(schoolId);
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
