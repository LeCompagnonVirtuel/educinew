'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheBandwidthService } from '../services/cache-bandwidth.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheBandwidth } from '@educi/types';

export const useEntCacheBandwidthList = (schoolId: string) => {
  const [items, setItems] = useState<CacheBandwidth[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheBandwidthService(supabase);
      const data = await service.listCacheBandwidths(schoolId);
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
