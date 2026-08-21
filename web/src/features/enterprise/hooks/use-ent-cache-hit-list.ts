'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheHitService } from '../services/cache-hit.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheHit } from '@educi/types';

export const useEntCacheHitList = (schoolId: string) => {
  const [items, setItems] = useState<CacheHit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheHitService(supabase);
      const data = await service.listCacheHits(schoolId);
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
