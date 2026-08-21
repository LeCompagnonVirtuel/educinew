'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntIndexMappingService } from '../services/index-mapping.service';
import { createClient } from '@/lib/supabase/client';
import type { IndexMapping } from '@educi/types';

export const useEntIndexMappingList = (schoolId: string) => {
  const [items, setItems] = useState<IndexMapping[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexMappingService(supabase);
      const data = await service.listIndexMappings(schoolId);
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
