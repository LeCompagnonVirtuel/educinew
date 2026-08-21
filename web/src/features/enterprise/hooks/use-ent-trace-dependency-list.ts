'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTraceDependencyService } from '../services/trace-dependency.service';
import { createClient } from '@/lib/supabase/client';
import type { TraceDependency } from '@educi/types';

export const useEntTraceDependencyList = (schoolId: string) => {
  const [items, setItems] = useState<TraceDependency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceDependencyService(supabase);
      const data = await service.listTraceDependencys(schoolId);
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
