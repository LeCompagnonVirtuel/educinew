'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntIndexOptimizationService } from '../services/index-optimization.service';
import { createClient } from '@/lib/supabase/client';
import type { IndexOptimization } from '@educi/types';

export const useEntIndexOptimizationList = (schoolId: string) => {
  const [items, setItems] = useState<IndexOptimization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexOptimizationService(supabase);
      const data = await service.listIndexOptimizations(schoolId);
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
