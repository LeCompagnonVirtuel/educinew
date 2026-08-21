'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCloudSearchService } from '../services/global-cloud-cloud-search.service';
import { createClient } from '@/lib/supabase/client';
import type { CloudSearch } from '@educi/types';

export const useGlobalCloudCloudSearchList = (schoolId: string) => {
  const [items, setItems] = useState<CloudSearch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCloudSearchService(supabase);
      const data = await service.list(schoolId);
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