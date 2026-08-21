'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCloudCacheService } from '../services/global-cloud-cloud-cache.service';
import { createClient } from '@/lib/supabase/client';
import type { CloudCache } from '@educi/types';

export const useGlobalCloudCloudCacheList = (schoolId: string) => {
  const [items, setItems] = useState<CloudCache[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCloudCacheService(supabase);
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