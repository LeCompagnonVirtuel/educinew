'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchBoostService } from '../services/search-boost.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchBoost } from '@educi/types';

export const useEntSearchBoostList = (schoolId: string) => {
  const [items, setItems] = useState<SearchBoost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchBoostService(supabase);
      const data = await service.listSearchBoosts(schoolId);
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
