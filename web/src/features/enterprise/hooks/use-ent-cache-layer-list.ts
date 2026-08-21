'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheLayerService } from '../services/cache-layer.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheLayer } from '@educi/types';

export const useEntCacheLayerList = (schoolId: string) => {
  const [items, setItems] = useState<CacheLayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheLayerService(supabase);
      const data = await service.listCacheLayers(schoolId);
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
