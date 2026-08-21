'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntIndexSnapshotService } from '../services/index-snapshot.service';
import { createClient } from '@/lib/supabase/client';
import type { IndexSnapshot } from '@educi/types';

export const useEntIndexSnapshotList = (schoolId: string) => {
  const [items, setItems] = useState<IndexSnapshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexSnapshotService(supabase);
      const data = await service.listIndexSnapshots(schoolId);
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
