'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheSizeService } from '../services/cache-size.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheSize } from '@educi/types';

export const useEntCacheSizeList = (schoolId: string) => {
  const [items, setItems] = useState<CacheSize[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheSizeService(supabase);
      const data = await service.listCacheSizes(schoolId);
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
