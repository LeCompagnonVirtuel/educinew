'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDataPartitionService } from '../services/data-partition.service';
import { createClient } from '@/lib/supabase/client';
import type { DataPartition } from '@educi/types';

export const useEntDataPartitionList = (schoolId: string) => {
  const [items, setItems] = useState<DataPartition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataPartitionService(supabase);
      const data = await service.listDataPartitions(schoolId);
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
