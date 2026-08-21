'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntAPIChangelogService } from '../services/api-changelog.service';
import { createClient } from '@/lib/supabase/client';
import type { APIChangelog } from '@educi/types';

export const useEntAPIChangelogList = (schoolId: string) => {
  const [items, setItems] = useState<APIChangelog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIChangelogService(supabase);
      const data = await service.listAPIChangelogs(schoolId);
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
