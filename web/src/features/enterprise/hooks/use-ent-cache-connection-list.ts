'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheConnectionService } from '../services/cache-connection.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheConnection } from '@educi/types';

export const useEntCacheConnectionList = (schoolId: string) => {
  const [items, setItems] = useState<CacheConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheConnectionService(supabase);
      const data = await service.listCacheConnections(schoolId);
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
