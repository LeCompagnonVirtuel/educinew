'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntIndexRebuildService } from '../services/index-rebuild.service';
import { createClient } from '@/lib/supabase/client';
import type { IndexRebuild } from '@educi/types';

export const useEntIndexRebuildList = (schoolId: string) => {
  const [items, setItems] = useState<IndexRebuild[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexRebuildService(supabase);
      const data = await service.listIndexRebuilds(schoolId);
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
