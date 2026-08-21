'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchShardService } from '../services/search-shard.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchShard } from '@educi/types';

export const useEntSearchShardList = (schoolId: string) => {
  const [items, setItems] = useState<SearchShard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchShardService(supabase);
      const data = await service.listSearchShards(schoolId);
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
