'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheTTLService } from '../services/cache-ttl.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheTTL } from '@educi/types';

export const useEntCacheTTLList = (schoolId: string) => {
  const [items, setItems] = useState<CacheTTL[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheTTLService(supabase);
      const data = await service.listCacheTTLs(schoolId);
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
