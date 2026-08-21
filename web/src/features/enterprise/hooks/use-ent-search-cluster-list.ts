'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchClusterService } from '../services/search-cluster.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchCluster } from '@educi/types';

export const useEntSearchClusterList = (schoolId: string) => {
  const [items, setItems] = useState<SearchCluster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchClusterService(supabase);
      const data = await service.listSearchClusters(schoolId);
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
