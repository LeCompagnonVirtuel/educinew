'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheInvalidationService } from '../services/cache-invalidation.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheInvalidation } from '@educi/types';

export const useEntCacheInvalidationList = (schoolId: string) => {
  const [items, setItems] = useState<CacheInvalidation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheInvalidationService(supabase);
      const data = await service.listCacheInvalidations(schoolId);
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
