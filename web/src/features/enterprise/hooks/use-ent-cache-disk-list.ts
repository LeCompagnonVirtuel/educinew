'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheDiskService } from '../services/cache-disk.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheDisk } from '@educi/types';

export const useEntCacheDiskList = (schoolId: string) => {
  const [items, setItems] = useState<CacheDisk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheDiskService(supabase);
      const data = await service.listCacheDisks(schoolId);
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
