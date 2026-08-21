'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheTagService } from '../services/cache-tag.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheTag } from '@educi/types';

export const useEntCacheTagList = (schoolId: string) => {
  const [items, setItems] = useState<CacheTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheTagService(supabase);
      const data = await service.listCacheTags(schoolId);
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
