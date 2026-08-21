'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntIndexHealthService } from '../services/index-health.service';
import { createClient } from '@/lib/supabase/client';
import type { IndexHealth } from '@educi/types';

export const useEntIndexHealthList = (schoolId: string) => {
  const [items, setItems] = useState<IndexHealth[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexHealthService(supabase);
      const data = await service.listIndexHealths(schoolId);
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
