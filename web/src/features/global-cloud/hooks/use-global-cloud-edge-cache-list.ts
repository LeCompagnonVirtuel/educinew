'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudEdgeCacheService } from '../services/global-cloud-edge-cache.service';
import { createClient } from '@/lib/supabase/client';
import type { EdgeCache } from '@educi/types';

export const useGlobalCloudEdgeCacheList = (schoolId: string) => {
  const [items, setItems] = useState<EdgeCache[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudEdgeCacheService(supabase);
      const data = await service.list(schoolId);
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