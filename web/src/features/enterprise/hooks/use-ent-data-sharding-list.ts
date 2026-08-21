'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDataShardingService } from '../services/data-sharding.service';
import { createClient } from '@/lib/supabase/client';
import type { DataSharding } from '@educi/types';

export const useEntDataShardingList = (schoolId: string) => {
  const [items, setItems] = useState<DataSharding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataShardingService(supabase);
      const data = await service.listDataShardings(schoolId);
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
