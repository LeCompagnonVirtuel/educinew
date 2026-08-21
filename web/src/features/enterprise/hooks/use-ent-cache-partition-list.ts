'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCachePartitionService } from '../services/cache-partition.service';
import { createClient } from '@/lib/supabase/client';
import type { CachePartition } from '@educi/types';

export const useEntCachePartitionList = (schoolId: string) => {
  const [items, setItems] = useState<CachePartition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCachePartitionService(supabase);
      const data = await service.listCachePartitions(schoolId);
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
