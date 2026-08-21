'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntIndexShardService } from '../services/index-shard.service';
import { createClient } from '@/lib/supabase/client';
import type { IndexShard } from '@educi/types';

export const useEntIndexShardList = (schoolId: string) => {
  const [items, setItems] = useState<IndexShard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexShardService(supabase);
      const data = await service.listIndexShards(schoolId);
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
