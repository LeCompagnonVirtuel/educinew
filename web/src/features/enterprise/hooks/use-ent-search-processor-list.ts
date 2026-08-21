'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchProcessorService } from '../services/search-processor.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchProcessor } from '@educi/types';

export const useEntSearchProcessorList = (schoolId: string) => {
  const [items, setItems] = useState<SearchProcessor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchProcessorService(supabase);
      const data = await service.listSearchProcessors(schoolId);
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
