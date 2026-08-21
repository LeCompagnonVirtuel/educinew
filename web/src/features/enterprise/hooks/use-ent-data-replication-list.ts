'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDataReplicationService } from '../services/data-replication.service';
import { createClient } from '@/lib/supabase/client';
import type { DataReplication } from '@educi/types';

export const useEntDataReplicationList = (schoolId: string) => {
  const [items, setItems] = useState<DataReplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataReplicationService(supabase);
      const data = await service.listDataReplications(schoolId);
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
