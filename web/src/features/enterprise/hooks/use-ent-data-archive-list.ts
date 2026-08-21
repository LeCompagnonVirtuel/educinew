'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDataArchiveService } from '../services/data-archive.service';
import { createClient } from '@/lib/supabase/client';
import type { DataArchive } from '@educi/types';

export const useEntDataArchiveList = (schoolId: string) => {
  const [items, setItems] = useState<DataArchive[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataArchiveService(supabase);
      const data = await service.listDataArchives(schoolId);
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
