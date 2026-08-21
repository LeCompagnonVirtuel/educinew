'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheRegionService } from '../services/cache-region.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheRegion } from '@educi/types';

export const useEntCacheRegionList = (schoolId: string) => {
  const [items, setItems] = useState<CacheRegion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheRegionService(supabase);
      const data = await service.listCacheRegions(schoolId);
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
