'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheMemoryService } from '../services/cache-memory.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheMemory } from '@educi/types';

export const useEntCacheMemoryList = (schoolId: string) => {
  const [items, setItems] = useState<CacheMemory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheMemoryService(supabase);
      const data = await service.listCacheMemorys(schoolId);
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
