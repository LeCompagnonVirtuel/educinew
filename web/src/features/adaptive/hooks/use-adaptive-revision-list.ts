'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveRevisionService } from '../services/adaptive-revision.service';
import { createClient } from '@/lib/supabase/client';
import type { SmartRevision } from '@educi/types';

export const useAdaptiveRevisionList = (schoolId: string) => {
  const [items, setItems] = useState<SmartRevision[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveRevisionService(supabase);
      const data = await service.listSmartRevisions(schoolId);
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
