'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntFailoverSecondaryService } from '../services/failover-secondary.service';
import { createClient } from '@/lib/supabase/client';
import type { FailoverSecondary } from '@educi/types';

export const useEntFailoverSecondaryList = (schoolId: string) => {
  const [items, setItems] = useState<FailoverSecondary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverSecondaryService(supabase);
      const data = await service.listFailoverSecondarys(schoolId);
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
