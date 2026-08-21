'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntLogArchiveService } from '../services/log-archive.service';
import { createClient } from '@/lib/supabase/client';
import type { LogArchive } from '@educi/types';

export const useEntLogArchiveList = (schoolId: string) => {
  const [items, setItems] = useState<LogArchive[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogArchiveService(supabase);
      const data = await service.listLogArchives(schoolId);
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
