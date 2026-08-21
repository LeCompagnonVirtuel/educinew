'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudEdgeFunctionService } from '../services/global-cloud-edge-function.service';
import { createClient } from '@/lib/supabase/client';
import type { EdgeFunction } from '@educi/types';

export const useGlobalCloudEdgeFunctionList = (schoolId: string) => {
  const [items, setItems] = useState<EdgeFunction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudEdgeFunctionService(supabase);
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