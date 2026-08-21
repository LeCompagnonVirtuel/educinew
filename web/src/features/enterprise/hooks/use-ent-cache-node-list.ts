'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheNodeService } from '../services/cache-node.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheNode } from '@educi/types';

export const useEntCacheNodeList = (schoolId: string) => {
  const [items, setItems] = useState<CacheNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheNodeService(supabase);
      const data = await service.listCacheNodes(schoolId);
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
