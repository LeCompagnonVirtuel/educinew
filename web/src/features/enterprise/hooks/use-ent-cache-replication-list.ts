'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheReplicationService } from '../services/cache-replication.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheReplication } from '@educi/types';

export const useEntCacheReplicationList = (schoolId: string) => {
  const [items, setItems] = useState<CacheReplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheReplicationService(supabase);
      const data = await service.listCacheReplications(schoolId);
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
