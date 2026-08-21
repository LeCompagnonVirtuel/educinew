'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntFailoverPrimaryService } from '../services/failover-primary.service';
import { createClient } from '@/lib/supabase/client';
import type { FailoverPrimary } from '@educi/types';

export const useEntFailoverPrimaryList = (schoolId: string) => {
  const [items, setItems] = useState<FailoverPrimary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverPrimaryService(supabase);
      const data = await service.listFailoverPrimarys(schoolId);
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
