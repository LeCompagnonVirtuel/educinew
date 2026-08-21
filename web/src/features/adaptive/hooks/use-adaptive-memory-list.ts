'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveMemoryService } from '../services/adaptive-memory.service';
import { createClient } from '@/lib/supabase/client';
import type { MemoryRetention } from '@educi/types';

export const useAdaptiveMemoryList = (schoolId: string) => {
  const [items, setItems] = useState<MemoryRetention[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveMemoryService(supabase);
      const data = await service.listMemoryRetentions(schoolId);
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
