'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCDNCacheService } from '../services/global-cloud-cdn-cache.service';
import { createClient } from '@/lib/supabase/client';
import type { CDNCache } from '@educi/types';

export const useGlobalCloudCDNCacheList = (schoolId: string) => {
  const [items, setItems] = useState<CDNCache[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCDNCacheService(supabase);
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