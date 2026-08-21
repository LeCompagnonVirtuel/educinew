'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDataSyncService } from '../services/data-sync.service';
import { createClient } from '@/lib/supabase/client';
import type { DataSync } from '@educi/types';

export const useEntDataSyncList = (schoolId: string) => {
  const [items, setItems] = useState<DataSync[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataSyncService(supabase);
      const data = await service.listDataSyncs(schoolId);
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
