'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCacheMissService } from '../services/cache-miss.service';
import { createClient } from '@/lib/supabase/client';
import type { CacheMiss } from '@educi/types';

export const useEntCacheMissList = (schoolId: string) => {
  const [items, setItems] = useState<CacheMiss[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCacheMissService(supabase);
      const data = await service.listCacheMisss(schoolId);
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
