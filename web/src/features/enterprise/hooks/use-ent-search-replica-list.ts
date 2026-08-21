'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchReplicaService } from '../services/search-replica.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchReplica } from '@educi/types';

export const useEntSearchReplicaList = (schoolId: string) => {
  const [items, setItems] = useState<SearchReplica[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchReplicaService(supabase);
      const data = await service.listSearchReplicas(schoolId);
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
