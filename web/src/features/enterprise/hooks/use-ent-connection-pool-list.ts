'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntConnectionPoolService } from '../services/connection-pool.service';
import { createClient } from '@/lib/supabase/client';
import type { ConnectionPool } from '@educi/types';

export const useEntConnectionPoolList = (schoolId: string) => {
  const [items, setItems] = useState<ConnectionPool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntConnectionPoolService(supabase);
      const data = await service.listConnectionPools(schoolId);
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
